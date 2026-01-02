/**
 * DateTime Tool
 * Provides current date, time, and timezone information
 */

import type { Tool } from '../types';
import { ToolCategory } from '../types';
import { toolRegistry } from '../registry';

interface DateTimeArgs {
  format?: 'full' | 'date' | 'time' | 'iso' | 'unix' | 'relative';
  timezone?: string;
}

const definition: Tool = {
  type: 'function',
  function: {
    name: 'get_current_datetime',
    description: 'Get the current date and time. Useful for answering questions about today\'s date, current time, or performing date-related calculations.',
    parameters: {
      type: 'object',
      properties: {
        format: {
          type: 'string',
          description: 'Output format: "full" (default, includes date, time, timezone), "date" (date only), "time" (time only), "iso" (ISO 8601), "unix" (Unix timestamp), "relative" (relative to now)',
          enum: ['full', 'date', 'time', 'iso', 'unix', 'relative']
        },
        timezone: {
          type: 'string',
          description: 'Timezone to use (e.g., "America/New_York", "Europe/London", "Asia/Tokyo"). Defaults to device timezone.'
        }
      },
      required: []
    }
  }
};

function formatDateTime(date: Date, format: string, timezone?: string): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone
  };

  try {
    switch (format) {
      case 'date':
        return date.toLocaleDateString('en-US', {
          ...options,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

      case 'time':
        return date.toLocaleTimeString('en-US', {
          ...options,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });

      case 'iso':
        if (timezone) {
          // Create a formatter that outputs ISO-like format
          const isoFormatter = new Intl.DateTimeFormat('sv-SE', {
            ...options,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });
          return isoFormatter.format(date).replace(' ', 'T');
        }
        return date.toISOString();

      case 'unix':
        return Math.floor(date.getTime() / 1000).toString();

      case 'relative':
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSecs = Math.abs(Math.floor(diffMs / 1000));

        if (diffSecs < 60) return 'just now';
        if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)} minutes ago`;
        if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)} hours ago`;
        return `${Math.floor(diffSecs / 86400)} days ago`;

      case 'full':
      default:
        const dateStr = date.toLocaleDateString('en-US', {
          ...options,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const timeStr = date.toLocaleTimeString('en-US', {
          ...options,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZoneName: 'short'
        });
        return `${dateStr} at ${timeStr}`;
    }
  } catch (error) {
    // Fallback if timezone is invalid
    return date.toString();
  }
}

async function handler(args: DateTimeArgs): Promise<string> {
  const { format = 'full', timezone } = args;
  const now = new Date();

  const result: Record<string, string> = {
    formatted: formatDateTime(now, format, timezone)
  };

  // Add extra context for 'full' format
  if (format === 'full') {
    result.iso = now.toISOString();
    result.unix = Math.floor(now.getTime() / 1000).toString();
    result.timezone = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    result.dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
    result.dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000).toString();
    result.weekNumber = Math.ceil((((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000) + new Date(now.getFullYear(), 0, 1).getDay() + 1) / 7).toString();
  }

  return JSON.stringify(result, null, 2);
}

export function registerDateTimeTool(): void {
  toolRegistry.register(definition, handler as any, ToolCategory.UTILITY, 'Clock');
}

export { definition as datetimeDefinition };
