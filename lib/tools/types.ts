/**
 * Tool/Function Calling System Types
 * Provides type definitions for the tool calling infrastructure
 */

/**
 * JSON Schema type for tool parameters
 */
export interface ToolParameterSchema {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description?: string;
  enum?: string[];
  items?: ToolParameterSchema;
  properties?: Record<string, ToolParameterSchema>;
  required?: string[];
  default?: unknown;
}

/**
 * Tool function definition compatible with Ollama's tool format
 */
export interface ToolFunction {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, ToolParameterSchema>;
    required?: string[];
  };
}

/**
 * Complete tool definition
 */
export interface Tool {
  type: 'function';
  function: ToolFunction;
}

/**
 * Tool call from the model
 */
export interface ToolCall {
  id: string;
  function: {
    name: string;
    arguments: string; // JSON string of arguments
  };
}

/**
 * Parsed tool call with typed arguments
 */
export interface ParsedToolCall<T = Record<string, unknown>> {
  id: string;
  name: string;
  arguments: T;
}

/**
 * Result of executing a tool
 */
export interface ToolResult {
  toolCallId: string;
  name: string;
  result: string;
  success: boolean;
  error?: string;
  duration?: number;
}

/**
 * Tool execution status
 */
export enum ToolStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  ERROR = 'error'
}

/**
 * Tool handler function type
 */
export type ToolHandler<TArgs = Record<string, unknown>, TResult = unknown> = (
  args: TArgs
) => Promise<TResult>;

/**
 * Registered tool with handler
 */
export interface RegisteredTool {
  definition: Tool;
  handler: ToolHandler;
  enabled: boolean;
  category: ToolCategory;
  icon?: string;
}

/**
 * Tool categories for organization
 */
export enum ToolCategory {
  UTILITY = 'utility',
  WEB = 'web',
  CODE = 'code',
  DATA = 'data'
}

/**
 * Tool settings for persistence
 */
export interface ToolSettings {
  enabled: boolean;
  enabledTools: string[];
}
