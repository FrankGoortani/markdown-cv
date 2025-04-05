# CV MCP Server Implementation Guide

This guide explains how to implement a Model Context Protocol (MCP) server that connects to your CV Server-Sent Events (SSE) endpoint, allowing Claude and other AI assistants to access your portfolio information.

## What is MCP?

The Model Context Protocol (MCP) is a standardized way for AI assistants like Claude to communicate with external systems and tools. By implementing an MCP server for your CV, you enable AI assistants to:

1. Answer questions about your skills, experience, and portfolio
2. Retrieve your resume or profile picture
3. Search for specific terms in your CV
4. Get information about your experience at specific companies

## Implementation Overview

We'll create an MCP server that connects to the Cloudflare Worker SSE endpoint, translating MCP tool calls to SSE queries.

### 1. Server Structure

Create a simple Node.js MCP server:

```javascript
const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');
const axios = require('axios');

class CVServer {
  constructor() {
    this.server = new Server(
      {
        name: 'cv-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Set up tool handlers
    this.setupToolHandlers();

    // Handle errors
    this.server.onerror = (error) => console.error('[MCP Error]', error);
  }

  setupToolHandlers() {
    // Implement tool handlers here
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('CV MCP Server running on stdio');
  }
}

const server = new CVServer();
server.run().catch(console.error);
```

### 2. Define MCP Tools

Add the following tools to map to your SSE endpoint:

```javascript
setupToolHandlers() {
  this.server.setRequestHandler('ListToolsRequest', async () => ({
    tools: [
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
        description: 'Search for terms within Frank\'s CV',
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
        description: 'Get Frank\'s experience at a specific company',
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
    ],
  }));

  this.server.setRequestHandler('CallToolRequest', async (request) => {
    try {
      let sseEndpoint;
      let responseText;

      switch (request.params.name) {
        case 'get_profile':
          responseText = await this.fetchFromSSE('profile');
          break;
        case 'get_skills':
          responseText = await this.fetchFromSSE('skills');
          break;
        case 'get_interests':
          responseText = await this.fetchFromSSE('interests');
          break;
        case 'search_cv':
          responseText = await this.fetchFromSSE(`search?q=${encodeURIComponent(request.params.arguments.query)}`);
          break;
        case 'get_company_experience':
          responseText = await this.fetchFromSSE(`company?name=${encodeURIComponent(request.params.arguments.company)}`);
          break;
        case 'get_resume_link':
          responseText = await this.fetchFromSSE('resume');
          break;
        case 'get_profile_picture':
          responseText = await this.fetchFromSSE('picture');
          break;
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: responseText,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  });
}

// Helper method to fetch data from SSE endpoint
async fetchFromSSE(path) {
  // First try the custom domain path, then fall back to the direct worker URL if that fails
  let sseUrl = `https://frank-cv-sse.frank-b2a.workers.dev/sse/${path}`;

  try {
    // We'll use a simple HTTP request instead of SSE streaming for MCP integration
    const response = await axios.get(sseUrl, {
      headers: {
        'Accept': 'text/event-stream',
      },
      timeout: 10000 // 10 second timeout
    });
# CV MCP Server Implementation Guide

This guide explains how to implement a Model Context Protocol (MCP) server that connects to your CV Server-Sent Events (SSE) endpoint, allowing Claude and other AI assistants to access your portfolio information.

## What is MCP?

The Model Context Protocol (MCP) is a standardized way for AI assistants like Claude to communicate with external systems and tools. By implementing an MCP server for your CV, you enable AI assistants to:

1. Answer questions about your skills, experience, and portfolio
2. Retrieve your resume or profile picture
3. Search for specific terms in your CV
4. Get information about your experience at specific companies

## Implementation Overview

We'll create an MCP server that connects to the Cloudflare Worker SSE endpoint, translating MCP tool calls to SSE queries.

### 1. Server Structure

Create a simple Node.js MCP server:

```javascript
const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');
const axios = require('axios');

class CVServer {
  constructor() {
    this.server = new Server(
      {
        name: 'cv-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Set up tool handlers
    this.setupToolHandlers();

    // Handle errors
    this.server.onerror = (error) => console.error('[MCP Error]', error);
  }

  setupToolHandlers() {
    // Implement tool handlers here
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('CV MCP Server running on stdio');
  }
}

const server = new CVServer();
server.run().catch(console.error);
```

### 2. Define MCP Tools

Add the following tools to map to your SSE endpoint:

```javascript
setupToolHandlers() {
  this.server.setRequestHandler('ListToolsRequest', async () => ({
    tools: [
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
        description: 'Search for terms within Frank\'s CV',
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
        description: 'Get Frank\'s experience at a specific company',
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
    ],
  }));

  this.server.setRequestHandler('CallToolRequest', async (request) => {
    try {
      let sseEndpoint;
      let responseText;

      switch (request.params.name) {
        case 'get_profile':
          responseText = await this.fetchFromSSE('profile');
          break;
        case 'get_skills':
          responseText = await this.fetchFromSSE('skills');
          break;
        case 'get_interests':
          responseText = await this.fetchFromSSE('interests');
          break;
        case 'search_cv':
          responseText = await this.fetchFromSSE(`search?q=${encodeURIComponent(request.params.arguments.query)}`);
          break;
        case 'get_company_experience':
          responseText = await this.fetchFromSSE(`company?name=${encodeURIComponent(request.params.arguments.company)}`);
          break;
        case 'get_resume_link':
          responseText = await this.fetchFromSSE('resume');
          break;
        case 'get_profile_picture':
          responseText = await this.fetchFromSSE('picture');
          break;
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: responseText,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  });
}

// Helper method to fetch data from SSE endpoint
# CV MCP Server Implementation Guide

This guide explains how to implement a Model Context Protocol (MCP) server that connects to your CV Server-Sent Events (SSE) endpoint, allowing Claude and other AI assistants to access your portfolio information.

## What is MCP?

The Model Context Protocol (MCP) is a standardized way for AI assistants like Claude to communicate with external systems and tools. By implementing an MCP server for your CV, you enable AI assistants to:

1. Answer questions about your skills, experience, and portfolio
2. Retrieve your resume or profile picture
3. Search for specific terms in your CV
4. Get information about your experience at specific companies

## Implementation Overview

We'll create an MCP server that connects to the Cloudflare Worker SSE endpoint, translating MCP tool calls to SSE queries.

### 1. Server Structure

Create a simple Node.js MCP server:

```javascript
const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');
const axios = require('axios');

class CVServer {
  constructor() {
    this.server = new Server(
      {
        name: 'cv-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Set up tool handlers
    this.setupToolHandlers();

    // Handle errors
    this.server.onerror = (error) => console.error('[MCP Error]', error);
  }

  setupToolHandlers() {
    // Implement tool handlers here
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('CV MCP Server running on stdio');
  }
}

const server = new CVServer();
server.run().catch(console.error);
```

### 2. Define MCP Tools

Add the following tools to map to your SSE endpoint:

```javascript
setupToolHandlers() {
  this.server.setRequestHandler('ListToolsRequest', async () => ({
    tools: [
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
        description: 'Search for terms within Frank\'s CV',
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
        description: 'Get Frank\'s experience at a specific company',
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
    ],
  }));

  this.server.setRequestHandler('CallToolRequest', async (request) => {
    try {
      let sseEndpoint;
      let responseText;

      switch (request.params.name) {
        case 'get_profile':
          responseText = await this.fetchFromSSE('profile');
          break;
        case 'get_skills':
          responseText = await this.fetchFromSSE('skills');
          break;
        case 'get_interests':
          responseText = await this.fetchFromSSE('interests');
          break;
        case 'search_cv':
          responseText = await this.fetchFromSSE(`search?q=${encodeURIComponent(request.params.arguments.query)}`);
          break;
        case 'get_company_experience':
          responseText = await this.fetchFromSSE(`company?name=${encodeURIComponent(request.params.arguments.company)}`);
          break;
        case 'get_resume_link':
          responseText = await this.fetchFromSSE('resume');
          break;
        case 'get_profile_picture':
          responseText = await this.fetchFromSSE('picture');
          break;
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: responseText,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  });
}

// Helper method to fetch data from SSE endpoint
async fetchFromSSE(path) {
  // Using the deployed Cloudflare Worker URL
  const sseUrl = `https://frank-cv-sse.frank-b2a.workers.dev/sse/${path}`;

  // We'll use a simple HTTP request instead of SSE streaming for MCP integration
  const response = await axios.get(sseUrl, {
    headers: {
      'Accept': 'text/event-stream',
    }
  });

  // Parse the SSE response
  const lines = response.data.split('\n\n');
  const dataLines = lines.filter(line => line.startsWith('data: '));

  // Extract the text from the first data line (excluding [DONE])
  if (dataLines.length > 0) {
    const data = JSON.parse(dataLines[0].replace('data: ', ''));
    return data.text;
  }

  return 'No data received';
}
```

### 3. Installation and Setup

1. Create a new directory for your MCP server:
   ```
   mkdir cv-mcp-server
   cd cv-mcp-server
   ```

2. Initialize a Node.js project and install dependencies:
   ```
   npm init -y
   npm install @modelcontextprotocol/sdk axios
   ```

3. Create an `index.js` file with the code above

4. Update the `package.json` scripts:
   ```json
   "scripts": {
     "start": "node index.js"
   }
   ```

5. The SSE URL in the code is already set to your Cloudflare Worker URL:
   `https://frank-cv-sse.frank-b2a.workers.dev/sse/`

### 4. Configure with Claude

To use this MCP server with Claude, add it to the MCP settings configuration in your Claude interface:

```json
{
  "mcpServers": {
    "cv": {
      "command": "node",
      "args": ["/path/to/cv-mcp-server/index.js"],
      "disabled": false
    }
  }
}
```

## Usage Examples

Once your MCP server is connected, you can ask Claude to use it:

- "What are Frank's skills?"
- "Tell me about Frank's experience at Uber."
- "Can you search Frank's CV for 'JavaScript'?"
- "Show me Frank's profile picture."
- "Get me a link to Frank's resume."

## Troubleshooting

### Connection Issues

- Ensure your Cloudflare Worker is deployed and accessible
- Verify the Worker URL in your MCP server code is correct
- Check that your MCP server's Node.js dependencies are installed

### Response Formatting

- If responses look incorrect, verify the SSE endpoint is returning the expected data format
- You may need to adjust the parsing logic in the `fetchFromSSE` method

### Rate Limiting

- Be aware of Cloudflare Workers' free tier limitations (100,000 requests per day)
- Consider adding rate limiting to your MCP server if needed

## Benefits of Using MCP

By implementing your CV as an MCP server:

1. AI assistants can directly access your professional information
2. You maintain control over the data and can update it at any time
3. The structured tools provide a clear interface for querying specific information
