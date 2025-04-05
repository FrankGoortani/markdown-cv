/**
 * Frank Goortani CV MCP Server (Static JSON Version)
 * This MCP server connects to the static JSON files in the GitHub Pages repository
 */

const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');
const axios = require('axios');

class CVServer {
  constructor() {
    this.server = new Server(
      {
        name: 'frank-static-cv-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Base URL for the static JSON files
    this.baseUrl = 'https://goortani.com/static-json/';

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
      ],
    }));

    this.server.setRequestHandler('CallToolRequest', async (request) => {
      try {
        let responseText;

        switch (request.params.name) {
          case 'get_profile':
            responseText = await this.fetchFromJson('profile.json');
            break;
          case 'get_skills':
            responseText = await this.fetchFromJson('skills.json');
            break;
          case 'get_interests':
            responseText = await this.fetchFromJson('interests.json');
            break;
          case 'search_cv':
            const searchTerm = request.params.arguments.query.toLowerCase();
            // Only JavaScript is supported for now as a demo
            if (searchTerm === 'javascript') {
              responseText = await this.fetchFromJson('search-javascript.json');
            } else {
              responseText = `Search for "${searchTerm}" is not available in the pre-generated data. Try "javascript" as a demonstration.`;
            }
            break;
          case 'get_company_experience':
            const companyName = request.params.arguments.company.toLowerCase();
            // Only Uber and Home Depot are supported for now as demos
            if (companyName.includes('uber')) {
              responseText = await this.fetchFromJson('company-uber.json');
            } else if (companyName.includes('home') && companyName.includes('depot')) {
              responseText = await this.fetchFromJson('company-home-depot.json');
            } else {
              responseText = `Experience at "${request.params.arguments.company}" is not available in the pre-generated data. Try "Uber" or "Home Depot" as a demonstration.`;
            }
            break;
          case 'get_resume_link':
            const resumeData = await this.fetchFromJson('resume.json');
            responseText = `Frank's resume is available at: https://goortani.com/${resumeData}`;
            break;
          case 'get_profile_picture':
            const pictureData = await this.fetchFromJson('picture.json');
            responseText = `Frank's profile picture is available at: https://goortani.com/${pictureData}`;
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
        console.error(`Tool error: ${error.message}`);
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

  // Helper method to fetch data from static JSON files
  async fetchFromJson(filename) {
    console.error(`Fetching from: ${this.baseUrl}${filename}`);

    try {
      const response = await axios.get(`${this.baseUrl}${filename}`);
      console.error(`Received response status: ${response.status}`);

      if (response.data && response.data.text) {
        return response.data.text;
      } else {
        throw new Error('Invalid JSON response format');
      }
    } catch (error) {
      console.error(`Request error: ${error.message}`);
      if (error.response) {
        console.error(`Response status: ${error.response.status}`);
      }
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  async run() {
    try {
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
      console.error('CV Static MCP server running on stdio');
    } catch (error) {
      console.error(`Error starting server: ${error.message}`);
    }
  }
}

// Create and run the server
const server = new CVServer();
server.run().catch(console.error);
