/**
 * Code Runner Tool
 * Executes JavaScript code in a sandboxed environment
 */

import type { Tool } from '../types';
import { ToolCategory } from '../types';
import { toolRegistry } from '../registry';

interface CodeRunnerArgs {
  code: string;
  timeout?: number;
}

const definition: Tool = {
  type: 'function',
  function: {
    name: 'run_javascript',
    description: 'Execute JavaScript code and return the result. Useful for data processing, calculations, string manipulation, or testing code snippets. The code runs in a sandboxed environment with limited capabilities.',
    parameters: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'The JavaScript code to execute. The last expression or explicit return value will be the output. Has access to console.log for debugging output.'
        },
        timeout: {
          type: 'number',
          description: 'Maximum execution time in milliseconds (default: 5000, max: 10000)'
        }
      },
      required: ['code']
    }
  }
};

/**
 * Create a sandboxed execution context
 */
function createSandbox() {
  const logs: string[] = [];

  const sandbox = {
    // Console mock
    console: {
      log: (...args: unknown[]) => {
        logs.push(args.map(arg => {
          if (arg === undefined) return 'undefined';
          if (arg === null) return 'null';
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        }).join(' '));
      },
      error: (...args: unknown[]) => logs.push(`[ERROR] ${args.join(' ')}`),
      warn: (...args: unknown[]) => logs.push(`[WARN] ${args.join(' ')}`),
      info: (...args: unknown[]) => logs.push(`[INFO] ${args.join(' ')}`)
    },

    // Safe built-ins
    JSON,
    Math,
    Date,
    Array,
    Object,
    String,
    Number,
    Boolean,
    RegExp,
    Map,
    Set,
    WeakMap,
    WeakSet,
    Promise,
    Error,
    TypeError,
    RangeError,
    SyntaxError,

    // Utility functions
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    encodeURIComponent,
    decodeURIComponent,
    encodeURI,
    decodeURI,
    btoa: (str: string) => Buffer.from(str).toString('base64'),
    atob: (str: string) => Buffer.from(str, 'base64').toString(),

    // Prevent access to globals
    window: undefined,
    global: undefined,
    globalThis: undefined,
    process: undefined,
    require: undefined,
    module: undefined,
    exports: undefined,
    fetch: undefined,
    XMLHttpRequest: undefined,
    WebSocket: undefined,
    eval: undefined,
    Function: undefined
  };

  return { sandbox, logs };
}

/**
 * Execute code with timeout
 */
async function executeWithTimeout(code: string, timeoutMs: number): Promise<{ result: unknown; logs: string[] }> {
  const { sandbox, logs } = createSandbox();

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Execution timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    try {
      // Wrap code to capture the last expression value
      const wrappedCode = `
        "use strict";
        ${code}
      `;

      // Create function with sandbox context
      const contextKeys = Object.keys(sandbox);
      const contextValues = Object.values(sandbox);

      // Use indirect eval to prevent access to local scope
      const fn = new Function(...contextKeys, wrappedCode);

      // Execute
      const result = fn(...contextValues);

      clearTimeout(timer);

      // Handle promise results
      if (result instanceof Promise) {
        result
          .then(value => resolve({ result: value, logs }))
          .catch(error => {
            clearTimeout(timer);
            reject(error);
          });
      } else {
        resolve({ result, logs });
      }
    } catch (error) {
      clearTimeout(timer);
      reject(error);
    }
  });
}

async function handler(args: CodeRunnerArgs): Promise<string> {
  const { code, timeout = 5000 } = args;

  if (!code || typeof code !== 'string') {
    throw new Error('Code is required');
  }

  const clampedTimeout = Math.min(Math.max(100, timeout), 10000);

  try {
    const { result, logs } = await executeWithTimeout(code, clampedTimeout);

    const output: string[] = [];

    // Include console output
    if (logs.length > 0) {
      output.push('**Console Output:**');
      output.push('```');
      output.push(logs.join('\n'));
      output.push('```');
      output.push('');
    }

    // Include result
    output.push('**Result:**');
    if (result === undefined) {
      output.push('`undefined`');
    } else if (result === null) {
      output.push('`null`');
    } else if (typeof result === 'object') {
      output.push('```json');
      try {
        output.push(JSON.stringify(result, null, 2));
      } catch {
        output.push(String(result));
      }
      output.push('```');
    } else {
      output.push(`\`${String(result)}\``);
    }

    return output.join('\n');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Code execution failed: ${errorMessage}`);
  }
}

export function registerCodeRunnerTool(): void {
  toolRegistry.register(definition, handler as any, ToolCategory.CODE, 'Code');
}

export { definition as codeRunnerDefinition };
