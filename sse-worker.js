/**
 * Frank Goortani CV SSE Worker
 * This worker implements a Server-Sent Events (SSE) endpoint to provide CV data
 * in real-time to the chat interface and serves as an MCP server for AI assistants.
 */

// Define CV data
const cvData = {
  profile: {
    text: "Frank Goortani is a Solution Architect with over 15 years of experience in the technology industry. He specializes in cloud architecture, DevOps practices, and enterprise software solutions. Frank has a proven track record of leading complex digital transformation initiatives and building scalable, resilient systems."
  },
  skills: {
    text: "Technical Skills:\n• Cloud Platforms: AWS, Azure, GCP\n• DevOps: Docker, Kubernetes, Terraform, CI/CD\n• Programming: JavaScript, Python, Go\n• Architecture: Microservices, Serverless, Event-driven\n• Data: SQL, NoSQL, Data Warehousing\n• Security: IAM, Network Security, Compliance\n\nSoft Skills:\n• Technical Leadership\n• Cross-functional Collaboration\n• Strategic Planning\n• Stakeholder Management\n• Problem Solving\n• Communication"
  },
  interests: {
    text: "Professional Interests:\n• Cloud-native Technologies\n• Infrastructure as Code\n• AI/ML Implementation\n• Containerization & Orchestration\n• Serverless Architectures\n• Edge Computing\n• FinOps & Cloud Cost Optimization\n• Security Automation"
  },
  resume: {
    text: "media/Frank Goortani Resume--solution-architect-2024.pdf"
  },
  picture: {
    text: "media/frankgoortani.png"
  },
  // Search results for specific terms
  search: {
    javascript: {
      text: "Found 3 references to \"JavaScript\" in Frank's background:\n\n1. Listed as a primary programming language in Technical Skills\n\n2. Used extensively in frontend development for React applications\n\n3. Node.js experience for backend services and serverless functions"
    }
  },
  // Company-specific experience
  company: {
    uber: {
      text: "Uber Technologies (2018-2022)\nPosition: Senior Solution Architect\n\nResponsibilities:\n• Led architecture design for cloud-native applications supporting Uber's core logistics platform\n• Implemented scalable microservices architecture handling 10M+ daily transactions\n• Established DevOps practices reducing deployment time by 70%\n• Optimized cloud infrastructure, reducing operational costs by 30%\n• Collaborated with cross-functional teams to align technical solutions with business requirements"
    },
    homedepot: {
      text: "Home Depot (2014-2018)\nPosition: Cloud Architecture Specialist\n\nResponsibilities:\n• Designed and implemented cloud migration strategy for legacy systems\n• Led migration of 50+ applications to cloud infrastructure\n• Architected real-time inventory management system\n• Implemented CI/CD pipelines reducing release cycles from weeks to days\n• Provided technical mentorship to development teams\n• Collaborated with security teams to ensure compliance with regulatory requirements"
    }
  }
};

// MCP Protocol version and constants
const MCP_VERSION = '0.1';
const MCP_CONTENT_TYPE = 'application/vnd.mcp.v1+json';

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

// Process MCP tool calls
async function processToolCall(toolName, args) {
  try {
    switch (toolName) {
      case 'get_profile':
        return { text: cvData.profile.text };

      case 'get_skills':
        return { text: cvData.skills.text };

      case 'get_interests':
        return { text: cvData.interests.text };

      case 'search_cv':
        const searchTerm = args.query.toLowerCase();
        // Only JavaScript is supported for now as a demo
        if (searchTerm === 'javascript') {
          return { text: cvData.search.javascript.text };
        } else {
          return {
            text: `Search for "${searchTerm}" is not available in the pre-generated data. Try "javascript" as a demonstration.`
          };
        }

      case 'get_company_experience':
        const companyName = args.company.toLowerCase();
        // Only Uber and Home Depot are supported for now as demos
        if (companyName.includes('uber')) {
          return { text: cvData.company.uber.text };
        } else if (companyName.includes('home') && companyName.includes('depot')) {
          return { text: cvData.company.homedepot.text };
        } else {
          return {
            text: `Experience at "${args.company}" is not available in the pre-generated data. Try "Uber" or "Home Depot" as a demonstration.`
          };
        }

      case 'get_resume_link':
        return { text: `Frank's resume is available at: https://goortani.com/${cvData.resume.text}` };

      case 'get_profile_picture':
        return { text: `Frank's profile picture is available at: https://goortani.com/${cvData.picture.text}` };

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

// Handler function to process SSE requests for CV data
async function handleSseRequest(request, url) {
  // Extract the path to determine which data to return
  const path = url.pathname.replace('/sse/', '');
  let result;

  if (path === 'profile') {
    result = cvData.profile;
  } else if (path === 'skills') {
    result = cvData.skills;
  } else if (path === 'interests') {
    result = cvData.interests;
  } else if (path === 'resume') {
    result = cvData.resume;
  } else if (path === 'picture') {
    result = cvData.picture;
  } else if (path.startsWith('search')) {
    // Handle search queries
    const searchParams = url.searchParams;
    const query = searchParams.get('q')?.toLowerCase();

    if (query === 'javascript') {
      result = cvData.search.javascript;
    } else {
      result = { text: `Search results for "${query}" not found. Try searching for "javascript" as a demo.` };
    }
  } else if (path.startsWith('company')) {
    // Handle company experience queries
    const searchParams = url.searchParams;
    const companyName = searchParams.get('name')?.toLowerCase();

    if (companyName?.includes('uber')) {
      result = cvData.company.uber;
    } else if (companyName?.includes('home') && companyName?.includes('depot')) {
      result = cvData.company.homedepot;
    } else {
      result = { text: `Company experience for "${companyName}" not found. Try "Uber" or "Home Depot" as a demo.` };
    }
  } else {
    result = { text: `Unknown endpoint: ${path}. Available endpoints are: profile, skills, interests, resume, picture, search?q=term, company?name=company` };
  }

  // Set up the SSE stream response
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Create a new, transformable response with ReadableStream
  const stream = new ReadableStream({
    start(controller) {
      // Send a comment to establish connection
      controller.enqueue(new TextEncoder().encode(': SSE connection established\n\n'));

      // Send the data as an SSE message
      const message = formatSseMessage(result);
      controller.enqueue(new TextEncoder().encode(message));

      // Send a DONE signal and close the stream after a delay
      setTimeout(() => {
        controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
        controller.close();
      }, 100); // Small delay to ensure the client has time to process
    }
  });

  return new Response(stream, {
    headers: headers
  });
}

// Main worker handler
export default {
  async fetch(request, env, ctx) {
    // Set up CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Parse the URL to get the path
    const url = new URL(request.url);

    // Handle CORS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // Handle SSE requests for the chat interface
    if (request.method === 'GET' && url.pathname.startsWith('/sse/')) {
      return handleSseRequest(request, url);
    }

    // Handle MCP requests
    if (request.method === 'POST' && url.pathname === '/sse') {
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

    // Handle all other requests with a simple explanation
    return new Response(JSON.stringify({
      error: 'Invalid endpoint or method. Use GET /sse/[endpoint] for SSE data or POST /sse for MCP requests.'
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
};
