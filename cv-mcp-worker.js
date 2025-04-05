/**
 * Frank Goortani CV MCP Server - Cloudflare Worker
 * This worker implements a remote MCP server via SSE protocol
 * to provide CV data to Claude and other AI assistants
 */

// MCP Protocol version and constants
const MCP_VERSION = '0.1';
const MCP_CONTENT_TYPE = 'application/vnd.mcp.v1+json';

// Base URL for the static JSON files on GitHub Pages
const STATIC_JSON_BASE_URL = 'https://goortani.com/sse/';

// Define the tools available in this MCP server
const TOOLS = [
  {
    name: 'get_profile',
    description: 'Get Frank Goortani\'s professional profile information',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_skills',
    description: 'Get Frank Goortani\'s skills',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_interests',
    description: 'Get Frank Goortani\'s professional interests',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'search_cv',
    description: 'Search for terms within Frank\'s CV (currently only "javascript" is supported)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search term to look for in skills, keywords, companies, and project details'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'get_company_experience',
    description: 'Get Frank\'s experience at a specific company (currently "Uber" and "Home Depot" are supported)',
    inputSchema: {
      type: 'object',
      properties: {
        company: {
          type: 'string',
          description: 'Company name (e.g., Uber, Home Depot)'
        }
      },
      required: ['company']
    }
  },
  {
    name: 'get_resume_link',
    description: 'Get a link to Frank\'s latest resume PDF',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_profile_picture',
    description: 'Get a link to Frank\'s profile picture',
    inputSchema: { type: 'object', properties: {} }
  }
];

// Helper function to fetch JSON data from static files
async function fetchJsonData(filename) {
  const url = `${STATIC_JSON_BASE_URL}${filename}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

// Process MCP tool calls
async function processToolCall(toolName, args) {
  try {
    let data;

    switch (toolName) {
      case 'get_profile':
        data = await fetchJsonData('profile.json');
        return { text: data.text };

      case 'get_skills':
        data = await fetchJsonData('skills.json');
        return { text: data.text };

      case 'get_interests':
        data = await fetchJsonData('interests.json');
        return { text: data.text };

      case 'search_cv':
        const searchTerm = args.query.toLowerCase();
        // Only JavaScript is supported for now as a demo
        if (searchTerm === 'javascript') {
          data = await fetchJsonData('search-javascript.json');
          return { text: data.text };
        } else {
          return {
            text: `Search for "${searchTerm}" is not available in the pre-generated data. Try "javascript" as a demonstration.`
          };
        }

      case 'get_company_experience':
        const companyName = args.company.toLowerCase();
        // Only Uber and Home Depot are supported for now as demos
        if (companyName.includes('uber')) {
          data = await fetchJsonData('company-uber.json');
          return { text: data.text };
        } else if (companyName.includes('home') && companyName.includes('depot')) {
          data = await fetchJsonData('company-home-depot.json');
          return { text: data.text };
        } else {
          return {
            text: `Experience at "${args.company}" is not available in the pre-generated data. Try "Uber" or "Home Depot" as a demonstration.`
          };
        }

      case 'get_resume_link':
        data = await fetchJsonData('resume.json');
        return { text: `Frank's resume is available at: https://goortani.com/${data.text}` };

      case 'get_profile_picture':
        data = await fetchJsonData('picture.json');
        return { text: `Frank's profile picture is available at: https://goortani.com/${data.text}` };

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error) {
    return { error: error.message };
  }
}

// Handle different MCP request types
async function handleMcpRequest(requestId, method, params) {
  switch (method) {
    case 'mcp.list_tools':
      return {
        jsonrpc: '2.0',
        id: requestId,
        result: { tools: TOOLS }
      };

    case 'mcp.call_tool':
      const toolName = params.name;
      const args = params.arguments || {};
      const toolResult = await processToolCall(toolName, args);

      if (toolResult.error) {
        return {
          jsonrpc: '2.0',
          id: requestId,
          error: {
            code: -32603,
            message: toolResult.error
          }
        };
      }

      return {
        jsonrpc: '2.0',
        id: requestId,
        result: {
          content: [
            {
              type: 'text',
              text: toolResult.text
            }
          ]
        }
      };

    default:
      return {
        jsonrpc: '2.0',
        id: requestId,
        error: {
          code: -32601,
          message: `Method not found: ${method}`
        }
      };
  }
}

// Format the response for SSE
function formatSseMessage(data) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

// Main worker handler
export default {
  async fetch(request, env, ctx) {
    // Set up CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // Only POST requests are supported for MCP
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({
        error: 'This endpoint only accepts POST requests for MCP protocol'
      }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    try {
      // Parse the request body
      const data = await request.json();
      const { id, method, params } = data;

      // Process the MCP request
      const responseData = await handleMcpRequest(id, method, params);

      // Send the response with appropriate headers for MCP
      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          'Content-Type': MCP_CONTENT_TYPE,
          ...corsHeaders
        }
      });
    } catch (error) {
      // Handle any errors
      return new Response(JSON.stringify({
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32700,
          message: `Parse error: ${error.message}`
        }
      }), {
        status: 400,
        headers: {
          'Content-Type': MCP_CONTENT_TYPE,
          ...corsHeaders
        }
      });
    }
  }
};
