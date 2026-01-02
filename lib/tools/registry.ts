/**
 * Tool Registry
 * Central registry for managing all available tools
 */

import type { RegisteredTool, Tool, ToolHandler, ToolResult, ParsedToolCall, ToolCategory } from './types';
import { ToolStatus } from './types';

class ToolRegistry {
  private tools: Map<string, RegisteredTool> = new Map();

  /**
   * Register a new tool
   */
  register(
    definition: Tool,
    handler: ToolHandler,
    category: ToolCategory,
    icon?: string
  ): void {
    const name = definition.function.name;
    this.tools.set(name, {
      definition,
      handler,
      enabled: true,
      category,
      icon
    });
  }

  /**
   * Get a tool by name
   */
  get(name: string): RegisteredTool | undefined {
    return this.tools.get(name);
  }

  /**
   * Get all registered tools
   */
  getAll(): RegisteredTool[] {
    return Array.from(this.tools.values());
  }

  /**
   * Get all enabled tools
   */
  getEnabled(): RegisteredTool[] {
    return this.getAll().filter(tool => tool.enabled);
  }

  /**
   * Get tool definitions for API calls (only enabled tools)
   */
  getToolDefinitions(enabledToolNames?: string[]): Tool[] {
    return this.getAll()
      .filter(tool => {
        if (enabledToolNames) {
          return enabledToolNames.includes(tool.definition.function.name);
        }
        return tool.enabled;
      })
      .map(tool => tool.definition);
  }

  /**
   * Enable or disable a tool
   */
  setEnabled(name: string, enabled: boolean): void {
    const tool = this.tools.get(name);
    if (tool) {
      tool.enabled = enabled;
    }
  }

  /**
   * Execute a tool by name
   */
  async execute(toolCall: ParsedToolCall): Promise<ToolResult> {
    const startTime = Date.now();
    const tool = this.tools.get(toolCall.name);

    if (!tool) {
      return {
        toolCallId: toolCall.id,
        name: toolCall.name,
        result: '',
        success: false,
        error: `Tool "${toolCall.name}" not found`,
        duration: Date.now() - startTime
      };
    }

    if (!tool.enabled) {
      return {
        toolCallId: toolCall.id,
        name: toolCall.name,
        result: '',
        success: false,
        error: `Tool "${toolCall.name}" is disabled`,
        duration: Date.now() - startTime
      };
    }

    try {
      const result = await tool.handler(toolCall.arguments);
      return {
        toolCallId: toolCall.id,
        name: toolCall.name,
        result: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
        success: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        toolCallId: toolCall.id,
        name: toolCall.name,
        result: '',
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime
      };
    }
  }

  /**
   * Execute multiple tool calls
   */
  async executeAll(toolCalls: ParsedToolCall[]): Promise<ToolResult[]> {
    return Promise.all(toolCalls.map(call => this.execute(call)));
  }

  /**
   * Get tools by category
   */
  getByCategory(category: ToolCategory): RegisteredTool[] {
    return this.getAll().filter(tool => tool.category === category);
  }

  /**
   * Check if a tool exists
   */
  has(name: string): boolean {
    return this.tools.has(name);
  }

  /**
   * Get tool count
   */
  get count(): number {
    return this.tools.size;
  }
}

// Singleton instance
export const toolRegistry = new ToolRegistry();

/**
 * Helper to parse tool call arguments
 */
export function parseToolCall(toolCall: { id?: string; function: { name: string; arguments: string } }): ParsedToolCall {
  let args: Record<string, unknown> = {};

  try {
    args = JSON.parse(toolCall.function.arguments || '{}');
  } catch {
    // If parsing fails, try to extract simple values
    args = { raw: toolCall.function.arguments };
  }

  return {
    id: toolCall.id || `call_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    name: toolCall.function.name,
    arguments: args
  };
}

/**
 * Format tool results for sending back to the model
 */
export function formatToolResultsForModel(results: ToolResult[]): Array<{ role: 'tool'; content: string; tool_call_id?: string }> {
  return results.map(result => ({
    role: 'tool' as const,
    content: result.success ? result.result : `Error: ${result.error}`,
    tool_call_id: result.toolCallId
  }));
}
