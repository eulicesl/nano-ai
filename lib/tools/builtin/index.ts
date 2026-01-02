/**
 * Built-in Tools Index
 * Exports all built-in tools and provides registration
 */

export { registerCalculatorTool, calculatorDefinition } from './calculator';
export { registerDateTimeTool, datetimeDefinition } from './datetime';
export { registerWebSearchTool, webSearchDefinition } from './web-search';
export { registerUrlFetchTool, urlFetchDefinition } from './url-fetch';
export { registerCodeRunnerTool, codeRunnerDefinition } from './code-runner';

import { registerCalculatorTool } from './calculator';
import { registerDateTimeTool } from './datetime';
import { registerWebSearchTool } from './web-search';
import { registerUrlFetchTool } from './url-fetch';
import { registerCodeRunnerTool } from './code-runner';

/**
 * Register all built-in tools with the registry
 */
export function registerAllBuiltinTools(): void {
  registerCalculatorTool();
  registerDateTimeTool();
  registerWebSearchTool();
  registerUrlFetchTool();
  registerCodeRunnerTool();
}

/**
 * List of all built-in tool names
 */
export const BUILTIN_TOOL_NAMES = [
  'calculator',
  'get_current_datetime',
  'web_search',
  'fetch_url',
  'run_javascript'
] as const;

export type BuiltinToolName = typeof BUILTIN_TOOL_NAMES[number];
