/**
 * URL Fetch Tool
 * Fetches and extracts content from web URLs
 */

import { fetch } from 'expo/fetch';

import type { Tool } from '../types';
import { ToolCategory } from '../types';
import { toolRegistry } from '../registry';

interface UrlFetchArgs {
  url: string;
  maxLength?: number;
}

const definition: Tool = {
  type: 'function',
  function: {
    name: 'fetch_url',
    description: 'Fetch and read content from a URL. Extracts text content from web pages. Use this when you need to read a specific webpage, article, or document.',
    parameters: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'The URL to fetch. Must be a valid HTTP or HTTPS URL.'
        },
        maxLength: {
          type: 'number',
          description: 'Maximum length of content to return in characters (default: 8000, max: 20000)'
        }
      },
      required: ['url']
    }
  }
};

/**
 * Simple HTML to text converter
 * Strips HTML tags and extracts readable text content
 */
function htmlToText(html: string): string {
  let text = html;

  // Remove script and style elements entirely
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');

  // Remove comments
  text = text.replace(/<!--[\s\S]*?-->/g, '');

  // Convert common block elements to newlines
  text = text.replace(/<\/?(p|div|br|h[1-6]|li|tr|td|th|blockquote|pre|hr)[^>]*>/gi, '\n');

  // Convert lists
  text = text.replace(/<li[^>]*>/gi, '\n• ');

  // Remove remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode common HTML entities
  const entities: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&mdash;': '—',
    '&ndash;': '–',
    '&hellip;': '...',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™'
  };

  for (const [entity, char] of Object.entries(entities)) {
    text = text.replace(new RegExp(entity, 'gi'), char);
  }

  // Decode numeric entities
  text = text.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
  text = text.replace(/&#x([a-fA-F0-9]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));

  // Clean up whitespace
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
  text = text.trim();

  return text;
}

/**
 * Extract metadata from HTML
 */
function extractMetadata(html: string): Record<string, string> {
  const metadata: Record<string, string> = {};

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }

  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
  if (descMatch) {
    metadata.description = descMatch[1].trim();
  }

  // Extract OG title/description as fallback
  if (!metadata.title) {
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
    if (ogTitleMatch) metadata.title = ogTitleMatch[1].trim();
  }

  if (!metadata.description) {
    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    if (ogDescMatch) metadata.description = ogDescMatch[1].trim();
  }

  return metadata;
}

async function handler(args: UrlFetchArgs): Promise<string> {
  const { url, maxLength = 8000 } = args;

  if (!url || typeof url !== 'string') {
    throw new Error('URL is required');
  }

  // Validate URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Only HTTP and HTTPS URLs are supported');
    }
  } catch {
    throw new Error('Invalid URL format');
  }

  const clampedMaxLength = Math.min(Math.max(1000, maxLength), 20000);

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (compatible; NanoAI/1.0; +https://github.com/user/nano-ai)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || '';
    const isHtml = contentType.includes('text/html') || contentType.includes('application/xhtml');
    const isText = contentType.includes('text/') || contentType.includes('application/json');

    if (!isHtml && !isText) {
      return `Unable to read content from ${url}. Content type "${contentType}" is not supported. Only HTML and text content can be processed.`;
    }

    let content = await response.text();
    let metadata: Record<string, string> = {};

    if (isHtml) {
      metadata = extractMetadata(content);
      content = htmlToText(content);
    }

    // Truncate if needed
    let truncated = false;
    if (content.length > clampedMaxLength) {
      content = content.slice(0, clampedMaxLength);
      // Try to truncate at a sentence boundary
      const lastPeriod = content.lastIndexOf('.');
      const lastNewline = content.lastIndexOf('\n');
      const cutPoint = Math.max(lastPeriod, lastNewline);
      if (cutPoint > clampedMaxLength * 0.8) {
        content = content.slice(0, cutPoint + 1);
      }
      truncated = true;
    }

    const result: string[] = [];
    result.push(`**URL:** ${url}`);

    if (metadata.title) {
      result.push(`**Title:** ${metadata.title}`);
    }

    if (metadata.description) {
      result.push(`**Description:** ${metadata.description}`);
    }

    result.push('');
    result.push('**Content:**');
    result.push(content);

    if (truncated) {
      result.push('');
      result.push(`[Content truncated at ${clampedMaxLength} characters]`);
    }

    return result.join('\n');
  } catch (error) {
    throw new Error(`Failed to fetch URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function registerUrlFetchTool(): void {
  toolRegistry.register(definition, handler as any, ToolCategory.WEB, 'Globe');
}

export { definition as urlFetchDefinition };
