import { Calculator, Clock, Code, Globe, Search, Wrench, Check, X, Loader2 } from 'lucide-react-native';
import { useMemo } from 'react';
import { View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import type { ToolCall, ToolResult } from '@/lib/tools/types';

import { Markdown } from './markdown';
import { Icon } from './ui/icon';
import { Text } from './ui/text';

interface ToolCallDisplayProps {
  toolCalls: ToolCall[];
  toolResults?: ToolResult[];
  isExecuting?: boolean;
}

const TOOL_ICONS: Record<string, typeof Wrench> = {
  calculator: Calculator,
  get_current_datetime: Clock,
  web_search: Search,
  fetch_url: Globe,
  run_javascript: Code
};

const TOOL_NAMES: Record<string, string> = {
  calculator: 'Calculator',
  get_current_datetime: 'Date & Time',
  web_search: 'Web Search',
  fetch_url: 'URL Fetch',
  run_javascript: 'Code Runner'
};

function ToolCallItem({
  toolCall,
  result,
  isExecuting
}: {
  toolCall: ToolCall;
  result?: ToolResult;
  isExecuting?: boolean;
}) {
  const { muted, mutedForeground, accent } = useThemeColor();
  const toolName = toolCall.function.name;
  const IconComponent = TOOL_ICONS[toolName] || Wrench;
  const displayName = TOOL_NAMES[toolName] || toolName;

  const args = useMemo(() => {
    try {
      return JSON.parse(toolCall.function.arguments);
    } catch {
      return { raw: toolCall.function.arguments };
    }
  }, [toolCall.function.arguments]);

  const isRunning = isExecuting && !result;
  const isSuccess = result?.success === true;
  const isError = result?.success === false;

  return (
    <View
      className="my-2 overflow-hidden rounded-xl"
      style={{ backgroundColor: muted }}>
      {/* Header */}
      <View className="flex flex-row items-center gap-x-2 px-3 py-2">
        <Icon as={IconComponent} size={16} style={{ color: mutedForeground }} />
        <Text className="flex-1 text-sm font-medium">{displayName}</Text>
        {isRunning && (
          <View className="flex flex-row items-center gap-x-1">
            <Icon as={Loader2} size={14} style={{ color: mutedForeground }} className="animate-spin" />
            <Text className="text-xs text-muted-foreground">Running...</Text>
          </View>
        )}
        {isSuccess && (
          <View className="flex flex-row items-center gap-x-1">
            <Icon as={Check} size={14} style={{ color: '#22c55e' }} />
            <Text className="text-xs" style={{ color: '#22c55e' }}>
              {result.duration ? `${result.duration}ms` : 'Done'}
            </Text>
          </View>
        )}
        {isError && (
          <View className="flex flex-row items-center gap-x-1">
            <Icon as={X} size={14} style={{ color: '#ef4444' }} />
            <Text className="text-xs" style={{ color: '#ef4444' }}>Error</Text>
          </View>
        )}
      </View>

      {/* Arguments */}
      {Object.keys(args).length > 0 && (
        <View className="border-t px-3 py-2" style={{ borderColor: accent }}>
          <Text className="mb-1 text-xs text-muted-foreground">Input:</Text>
          {Object.entries(args).map(([key, value]) => (
            <View key={key} className="flex flex-row">
              <Text className="text-xs text-muted-foreground">{key}: </Text>
              <Text className="flex-1 text-xs" numberOfLines={3}>
                {typeof value === 'string' ? value : JSON.stringify(value)}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Result */}
      {result && (
        <View className="border-t px-3 py-2" style={{ borderColor: accent }}>
          <Text className="mb-1 text-xs text-muted-foreground">
            {isSuccess ? 'Output:' : 'Error:'}
          </Text>
          {isSuccess ? (
            <View className="max-h-48 overflow-hidden">
              <Markdown
                content={result.result.slice(0, 1000) + (result.result.length > 1000 ? '\n\n...(truncated)' : '')}
                style={{ fontSize: 12, lineHeight: 18 }}
              />
            </View>
          ) : (
            <Text className="text-xs" style={{ color: '#ef4444' }}>
              {result.error}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

export function ToolCallDisplay({ toolCalls, toolResults, isExecuting }: ToolCallDisplayProps) {
  if (!toolCalls || toolCalls.length === 0) {
    return null;
  }

  // Create a map of results by tool call ID
  const resultMap = useMemo(() => {
    const map = new Map<string, ToolResult>();
    toolResults?.forEach(result => {
      map.set(result.toolCallId, result);
    });
    return map;
  }, [toolResults]);

  return (
    <View className="my-2">
      <View className="mb-1 flex flex-row items-center gap-x-1">
        <Icon as={Wrench} size={14} className="text-muted-foreground" />
        <Text className="text-xs text-muted-foreground">
          {isExecuting ? 'Using tools...' : `Used ${toolCalls.length} tool${toolCalls.length > 1 ? 's' : ''}`}
        </Text>
      </View>
      {toolCalls.map(toolCall => (
        <ToolCallItem
          key={toolCall.id}
          toolCall={toolCall}
          result={resultMap.get(toolCall.id)}
          isExecuting={isExecuting}
        />
      ))}
    </View>
  );
}
