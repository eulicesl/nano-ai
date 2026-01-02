import { useRef } from 'react';

import { Ollama } from '@/lib/ai-client/ollama';
import { toolRegistry, parseToolCall, formatToolResultsForModel } from '@/lib/tools';
import type { ToolCall, ToolResult } from '@/lib/tools/types';
import { ConnectStatus, useSettingsValue } from '@/store/settings';

import { useMessage } from './use-message';
import { useModel } from './use-model';
import { useToast } from './use-toast';
import { useTools } from './use-tools';

const MAX_TOOL_ITERATIONS = 10; // Prevent infinite tool loops

export function useOllama() {
  const isAbortedRef = useRef(false);
  const abortFnRef = useRef<() => void>(null);
  const [, { get, set, push }] = useMessage();
  const [model] = useModel();
  const { ollama, tools: toolSettings } = useSettingsValue();
  const { host, apiKey } = ollama;
  const toast = useToast();
  const { toolDefinitions, hasTools } = useTools();

  const request = async (input: string, think = false) => {
    isAbortedRef.current = false;
    if (!model || ollama.connectStatus !== ConnectStatus.SUCCESSFUL) return;

    try {
      const { name, canThink } = model;
      const ollamaApi = new Ollama(host, apiKey);

      const createAt = +new Date();
      const newUserMessage = { role: 'user', content: input, createAt };
      const newAssistantMessage = {
        role: 'assistant',
        content: '',
        createAt,
        thinkingContent: '',
        isPending: true,
        isStreaming: false,
        isExecutingTools: false,
        toolCalls: [] as ToolCall[],
        toolResults: [] as ToolResult[]
      };

      push(newUserMessage, newAssistantMessage);
      const [, messages] = get();

      // Build messages for API call
      let conversationMessages = [...messages, newUserMessage].map(({ role, content, toolCalls, toolResults }) => {
        const msg: any = { role, content };
        if (toolCalls && toolCalls.length > 0) {
          msg.tool_calls = toolCalls;
        }
        return msg;
      });

      // Add tool results as separate messages if present
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.toolResults && lastMsg.toolResults.length > 0) {
        const toolResultMsgs = formatToolResultsForModel(lastMsg.toolResults);
        conversationMessages = [...conversationMessages.slice(0, -1), ...toolResultMsgs, conversationMessages[conversationMessages.length - 1]];
      }

      // Prepare tools for API call
      const toolsForApi = hasTools && toolSettings?.enabled ? toolDefinitions : undefined;

      let toolIteration = 0;
      let continueLoop = true;

      while (continueLoop && toolIteration < MAX_TOOL_ITERATIONS) {
        if (isAbortedRef.current) break;

        const stream = await ollamaApi.chat({
          model: name,
          messages: conversationMessages.map(({ role, content }) => ({ role, content })),
          think: canThink ? think : false,
          stream: true,
          ...(toolsForApi && toolIteration === 0 ? { tools: toolsForApi } : {})
        } as any);

        if (isAbortedRef.current) {
          stream.abort();
          break;
        }

        abortFnRef.current = () => stream.abort();
        set('isPending', false);

        let inThinking = false;
        const startThinkingTime = +new Date();
        let accumulatedToolCalls: any[] = [];
        let hasToolCalls = false;

        for await (const chunk of stream) {
          if (isAbortedRef.current) break;

          // Handle thinking content
          if (chunk.message.thinking) {
            if (!inThinking) {
              inThinking = true;
              set('isThinking', true);
            }
            set(msg => (msg.thinkingContent! += chunk.message.thinking));
          }
          // Handle regular content
          else if (chunk.message.content) {
            set('isStreaming', true);
            if (inThinking) {
              inThinking = false;
              set({ isThinking: false, thinkingDuration: +new Date() - startThinkingTime });
            }
            set(msg => (msg.content += chunk.message.content));
          }

          // Handle tool calls from the model
          if ((chunk.message as any).tool_calls) {
            hasToolCalls = true;
            accumulatedToolCalls = (chunk.message as any).tool_calls;
          }
        }

        set('isStreaming', false);

        // If model requested tool calls, execute them
        if (hasToolCalls && accumulatedToolCalls.length > 0 && !isAbortedRef.current) {
          set('isExecutingTools', true);

          // Store tool calls in message
          const formattedToolCalls: ToolCall[] = accumulatedToolCalls.map((tc: any, index: number) => ({
            id: tc.id || `call_${Date.now()}_${index}`,
            function: {
              name: tc.function?.name || tc.name,
              arguments: typeof tc.function?.arguments === 'string'
                ? tc.function.arguments
                : JSON.stringify(tc.function?.arguments || tc.arguments || {})
            }
          }));

          set('toolCalls', formattedToolCalls);

          // Execute all tool calls
          const toolResults: ToolResult[] = [];
          for (const toolCall of formattedToolCalls) {
            if (isAbortedRef.current) break;

            try {
              const parsed = parseToolCall(toolCall);
              const result = await toolRegistry.execute(parsed);
              toolResults.push(result);
            } catch (error) {
              toolResults.push({
                toolCallId: toolCall.id,
                name: toolCall.function.name,
                result: '',
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
              });
            }
          }

          set('toolResults', toolResults);
          set('isExecutingTools', false);

          // Add tool results to conversation for next iteration
          const [, currentMessages] = get();
          const currentAssistantMsg = currentMessages[currentMessages.length - 1];

          // Add assistant message with tool calls
          conversationMessages.push({
            role: 'assistant',
            content: currentAssistantMsg.content || '',
            tool_calls: formattedToolCalls
          });

          // Add tool result messages
          for (const result of toolResults) {
            conversationMessages.push({
              role: 'tool',
              content: result.success ? result.result : `Error: ${result.error}`,
              tool_call_id: result.toolCallId
            } as any);
          }

          toolIteration++;
          // Continue loop to get model's response to tool results
        } else {
          // No tool calls, we're done
          continueLoop = false;
        }
      }

      if (toolIteration >= MAX_TOOL_ITERATIONS) {
        toast.error('Too many tool iterations', { description: 'The model made too many consecutive tool calls.' });
      }

    } catch (error) {
      set('isAborted', true);
      set('isExecutingTools', false);
      if (!isAbortedRef.current) {
        toast.error(`${error}`, { description: 'Please check your Ollama API endpoint and try again' });
      }
    }
  };

  const abort = () => {
    set({ isPending: false, isAborted: true, isExecutingTools: false });
    isAbortedRef.current = true;
    abortFnRef.current?.();
  };

  return { request, abort };
}
