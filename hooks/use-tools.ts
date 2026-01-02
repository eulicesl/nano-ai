/**
 * useTools Hook
 * Manages tool initialization and execution
 */

import { useEffect, useMemo, useCallback } from 'react';

import {
  toolRegistry,
  parseToolCall,
  registerAllBuiltinTools,
  BUILTIN_TOOL_NAMES
} from '@/lib/tools';
import type { Tool, ToolResult, ToolCall, ParsedToolCall } from '@/lib/tools/types';
import { useSettingsValue } from '@/store/settings';

// Track if tools have been registered
let toolsRegistered = false;

/**
 * Initialize all built-in tools (call once at app startup)
 */
export function initializeTools(): void {
  if (!toolsRegistered) {
    registerAllBuiltinTools();
    toolsRegistered = true;
  }
}

/**
 * Hook for using tools in components
 */
export function useTools() {
  const { tools: toolSettings } = useSettingsValue();

  // Ensure tools are registered
  useEffect(() => {
    initializeTools();
  }, []);

  // Get enabled tool definitions for API calls
  const enabledToolDefinitions = useMemo((): Tool[] => {
    if (!toolSettings?.enabled) {
      return [];
    }
    return toolRegistry.getToolDefinitions(toolSettings.enabledTools);
  }, [toolSettings?.enabled, toolSettings?.enabledTools]);

  // Check if tools are available
  const hasTools = useMemo(() => {
    return toolSettings?.enabled && enabledToolDefinitions.length > 0;
  }, [toolSettings?.enabled, enabledToolDefinitions.length]);

  // Execute a single tool call
  const executeTool = useCallback(async (toolCall: ToolCall): Promise<ToolResult> => {
    const parsed = parseToolCall(toolCall);
    return toolRegistry.execute(parsed);
  }, []);

  // Execute multiple tool calls
  const executeTools = useCallback(async (toolCalls: ToolCall[]): Promise<ToolResult[]> => {
    const parsed = toolCalls.map(parseToolCall);
    return toolRegistry.executeAll(parsed);
  }, []);

  // Get all registered tools with their status
  const allTools = useMemo(() => {
    return toolRegistry.getAll().map(tool => ({
      ...tool,
      enabled: toolSettings?.enabledTools?.includes(tool.definition.function.name) ?? true
    }));
  }, [toolSettings?.enabledTools]);

  return {
    // Tool definitions for API calls
    toolDefinitions: enabledToolDefinitions,

    // Check if tools feature is enabled
    toolsEnabled: toolSettings?.enabled ?? true,

    // Check if any tools are available
    hasTools,

    // Execute tools
    executeTool,
    executeTools,

    // All registered tools
    allTools,

    // List of enabled tool names
    enabledToolNames: toolSettings?.enabledTools ?? BUILTIN_TOOL_NAMES
  };
}

/**
 * Format tool results for display
 */
export function formatToolResultForDisplay(result: ToolResult): string {
  if (!result.success) {
    return `Error: ${result.error}`;
  }
  return result.result;
}

/**
 * Get tool icon name
 */
export function getToolIcon(toolName: string): string {
  const iconMap: Record<string, string> = {
    calculator: 'Calculator',
    get_current_datetime: 'Clock',
    web_search: 'Search',
    fetch_url: 'Globe',
    run_javascript: 'Code'
  };
  return iconMap[toolName] || 'Wrench';
}

/**
 * Get tool display name
 */
export function getToolDisplayName(toolName: string): string {
  const nameMap: Record<string, string> = {
    calculator: 'Calculator',
    get_current_datetime: 'Date & Time',
    web_search: 'Web Search',
    fetch_url: 'URL Fetcher',
    run_javascript: 'Code Runner'
  };
  return nameMap[toolName] || toolName;
}
