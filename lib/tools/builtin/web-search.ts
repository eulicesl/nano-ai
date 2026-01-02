/**
 * Web Search Tool
 * Performs web searches using DuckDuckGo Instant Answer API
 */

import { fetch } from 'expo/fetch';

import type { Tool } from '../types';
import { ToolCategory } from '../types';
import { toolRegistry } from '../registry';

interface WebSearchArgs {
  query: string;
  maxResults?: number;
}

interface DuckDuckGoResponse {
  Abstract?: string;
  AbstractText?: string;
  AbstractSource?: string;
  AbstractURL?: string;
  Answer?: string;
  AnswerType?: string;
  Definition?: string;
  DefinitionSource?: string;
  DefinitionURL?: string;
  Heading?: string;
  Image?: string;
  Redirect?: string;
  RelatedTopics?: Array<{
    Text?: string;
    FirstURL?: string;
    Icon?: { URL?: string };
    Result?: string;
  }>;
  Results?: Array<{
    Text?: string;
    FirstURL?: string;
    Result?: string;
  }>;
  Type?: string;
  Infobox?: {
    content?: Array<{
      label?: string;
      value?: string;
    }>;
  };
}

const definition: Tool = {
  type: 'function',
  function: {
    name: 'web_search',
    description: 'Search the web for current information. Use this when you need up-to-date information, facts, news, or when the user asks about something you\'re not certain about.',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The search query. Be specific and include relevant keywords.'
        },
        maxResults: {
          type: 'number',
          description: 'Maximum number of results to return (1-10, default: 5)'
        }
      },
      required: ['query']
    }
  }
};

async function handler(args: WebSearchArgs): Promise<string> {
  const { query, maxResults = 5 } = args;

  if (!query || typeof query !== 'string') {
    throw new Error('Search query is required');
  }

  const clampedMaxResults = Math.min(Math.max(1, maxResults), 10);

  try {
    // Use DuckDuckGo Instant Answer API
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.duckduckgo.com/?q=${encodedQuery}&format=json&no_html=1&skip_disambig=1`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Search request failed: ${response.status}`);
    }

    const data: DuckDuckGoResponse = await response.json();

    const results: string[] = [];

    // Add main answer if available
    if (data.Answer) {
      results.push(`**Direct Answer:** ${data.Answer}`);
    }

    // Add abstract/summary
    if (data.AbstractText) {
      results.push(`**Summary (${data.AbstractSource || 'Source'}):** ${data.AbstractText}`);
      if (data.AbstractURL) {
        results.push(`Source: ${data.AbstractURL}`);
      }
    }

    // Add definition if available
    if (data.Definition) {
      results.push(`**Definition (${data.DefinitionSource || 'Source'}):** ${data.Definition}`);
    }

    // Add infobox data if available
    if (data.Infobox?.content && data.Infobox.content.length > 0) {
      const infoboxItems = data.Infobox.content
        .slice(0, 5)
        .map(item => `  - ${item.label}: ${item.value}`)
        .join('\n');
      results.push(`**Quick Facts:**\n${infoboxItems}`);
    }

    // Add related topics
    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      const topics = data.RelatedTopics
        .filter(topic => topic.Text && topic.FirstURL)
        .slice(0, clampedMaxResults)
        .map((topic, i) => `${i + 1}. ${topic.Text}\n   URL: ${topic.FirstURL}`)
        .join('\n\n');

      if (topics) {
        results.push(`**Related Results:**\n${topics}`);
      }
    }

    // Add direct results if available
    if (data.Results && data.Results.length > 0) {
      const directResults = data.Results
        .filter(r => r.Text && r.FirstURL)
        .slice(0, clampedMaxResults)
        .map((r, i) => `${i + 1}. ${r.Text}\n   URL: ${r.FirstURL}`)
        .join('\n\n');

      if (directResults) {
        results.push(`**Results:**\n${directResults}`);
      }
    }

    // Handle redirect (e.g., for !bang searches)
    if (data.Redirect) {
      results.push(`**Redirect:** ${data.Redirect}`);
    }

    if (results.length === 0) {
      return `No results found for "${query}". Try rephrasing your search query or being more specific.`;
    }

    return `**Search results for "${query}":**\n\n${results.join('\n\n')}`;
  } catch (error) {
    throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function registerWebSearchTool(): void {
  toolRegistry.register(definition, handler as any, ToolCategory.WEB, 'Search');
}

export { definition as webSearchDefinition };
