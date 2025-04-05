/**
 * Frank Goortani CV MCP Server
 * This MCP server connects to the CV SSE endpoint and provides tools for AI assistants
 */

const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');
const axios = require('axios');

class CVServer {
  constructor() {
    this.server = new Server(
      {
        name: 'frank-cv-server',
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
    // Use direct Cloudflare Worker URL - this is what's working now
    const sseUrl = `https://frank-cv-sse.frank-b2a.workers.dev/sse/${path}`;

    console.error(`Fetching from: ${sseUrl}`);

    try {
      // Use a simple HTTP request instead of SSE streaming for MCP integration
      const response = await axios.get(sseUrl, {
        headers: {
          'Accept': 'text/event-stream',
        },
        timeout: 10000 // 10 second timeout
      });

      console.error(`Received response status: ${response.status}`);

      // Parse the SSE response
      const lines = response.data.split('\n\n');
      const dataLines = lines.filter(line => line.startsWith('data: '));

      console.error(`Found ${dataLines.length} data lines in response`);

      // Extract the text from the first data line (excluding [DONE])
      if (dataLines.length > 0) {
        const dataLine = dataLines[0].replace('data: ', '');
        console.error(`Parsing data line: ${dataLine}`);

        try {
          const data = JSON.parse(dataLine);
          return data.text;
        } catch (parseError) {
          console.error(`Error parsing JSON: ${parseError.message}`);
          return `Error parsing response: ${dataLine}`;
        }
      }

      return 'No data received in response';
    } catch (error) {
      console.error(`Request error: ${error.message}`);
      if (error.response) {
        console.error(`Response status: ${error.response.status}`);
        console.error(`Response data: ${JSON.stringify(error.response.data)}`);
      }
      throw new Error(`Failed to fetch from SSE endpoint: ${error.message}`);
    }
  }

  async run() {
    try {
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
      console.error('CV MCP server running on stdio');
    } catch (error) {
      console.error(`Error starting server: ${error.message}`);
    }
  }
}

// Create and run the server
const server = new CVServer();
server.run().catch(console.error);
