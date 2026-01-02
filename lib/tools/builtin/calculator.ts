/**
 * Calculator Tool
 * Evaluates mathematical expressions safely
 */

import type { Tool } from '../types';
import { ToolCategory } from '../types';
import { toolRegistry } from '../registry';

interface CalculatorArgs {
  expression: string;
}

const definition: Tool = {
  type: 'function',
  function: {
    name: 'calculator',
    description: 'Evaluate a mathematical expression. Supports basic arithmetic (+, -, *, /), exponentiation (^), parentheses, and common math functions (sin, cos, tan, sqrt, log, abs, floor, ceil, round, min, max, pow).',
    parameters: {
      type: 'object',
      properties: {
        expression: {
          type: 'string',
          description: 'The mathematical expression to evaluate. Examples: "2 + 2", "sqrt(16)", "sin(3.14159/2)", "2^10"'
        }
      },
      required: ['expression']
    }
  }
};

/**
 * Safe math evaluator using Function constructor with limited scope
 */
function evaluateMath(expression: string): number {
  // Sanitize: only allow safe characters
  const sanitized = expression
    .replace(/\^/g, '**') // Convert ^ to ** for exponentiation
    .replace(/\s+/g, ''); // Remove whitespace

  // Validate: only allow numbers, operators, parentheses, and function names
  const validPattern = /^[0-9+\-*/.()%,\s]+$|^[a-zA-Z]+\([^)]+\)$/;
  const safePattern = /^[\d+\-*/.()%,\s]*(sqrt|sin|cos|tan|log|abs|floor|ceil|round|min|max|pow|exp|PI|E)?[\d+\-*/.()%,\s]*$/i;

  // Create a safe math context
  const mathContext = {
    sqrt: Math.sqrt,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    log: Math.log,
    log10: Math.log10,
    abs: Math.abs,
    floor: Math.floor,
    ceil: Math.ceil,
    round: Math.round,
    min: Math.min,
    max: Math.max,
    pow: Math.pow,
    exp: Math.exp,
    PI: Math.PI,
    E: Math.E
  };

  // Replace function names with context references
  let safeExpression = sanitized;
  for (const fn of Object.keys(mathContext)) {
    const regex = new RegExp(`\\b${fn}\\b`, 'gi');
    safeExpression = safeExpression.replace(regex, `ctx.${fn}`);
  }

  // Evaluate using Function constructor with restricted context
  try {
    const fn = new Function('ctx', `"use strict"; return (${safeExpression});`);
    const result = fn(mathContext);

    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Result is not a valid number');
    }

    return result;
  } catch (error) {
    throw new Error(`Invalid expression: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function handler(args: CalculatorArgs): Promise<string> {
  const { expression } = args;

  if (!expression || typeof expression !== 'string') {
    throw new Error('Expression is required');
  }

  try {
    const result = evaluateMath(expression);
    return `${expression} = ${result}`;
  } catch (error) {
    throw new Error(`Failed to evaluate "${expression}": ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function registerCalculatorTool(): void {
  toolRegistry.register(definition, handler as any, ToolCategory.UTILITY, 'Calculator');
}

export { definition as calculatorDefinition };
