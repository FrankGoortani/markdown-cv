/**
 * Frank Goortani CV SSE Worker
 * This worker implements a Server-Sent Events (SSE) endpoint to provide CV data
 * in real-time to the chat interface and serves as an MCP server for AI assistants.
 */

// Define CV data
const cvData = {
  profile: {
    text: "Senior solution architect with extensive experience in generative AI, data-driven systems, cloud, and mobile technologies. Over 20 years of expertise in designing and implementing enterprise-grade applications across startups and large enterprises. Skilled in generative AI technologies, including LLMs, AI agents, and automation. Proven leadership in guiding cross-functional teams, driving architectural strategies, and delivering impactful results."
  },
  skills: {
    text: "Technical Skills:\n• Distributed Systems, API platforms, Microservices, integrations, Workflow systems\n• Generative AI, Large Language Models (LLMs), AI agents, AI automation, Machine Learning\n• Reactive and Functional Programming in Go, Python, Java, Swift, Typescript and JavaScript\n• Full-stack Development, DevOps, Product Management, Agile Project Management\n• Mobile application development, Mobile architecture, Hybrid/Cross-Platform apps\n• Requirement Analysis, Change Management, Stakeholder Communications, Technology Evangelism\n• Business Presentations, Architectural Documentation, Research, POCs\n• Data Modeling, Business Intelligence (BI), Data Warehouse Design, ETL tools\n• Data Governance, Data Streams, Master Data Management (MDM), Reporting, Dashboards\n• Automation, Data Science, Data Visualizations, Infographics"
  },
  interests: {
    text: "Professional Interests:\n• Startups\n• GoLang\n• Python\n• Typescript\n• LangChain\n• LLMs\n• Microservices"
  },
  resume: {
    text: "media/Frank Goortani Resume--solution-architect-2024.pdf"
  },
  picture: {
    text: "media/frankgoortani.png"
  },
  experience: {
    "Uber": {
      timeframe: "2021-now",
      title: "Solution Architect",
      details: [
        "Worked on UDE (User Data Extraction) and DSAR (Data Subject Access Request) Automation as mandates for Security and Privacy teams. The stack included Piper (similar to Airflow), Cadence (similar to Temporal), Python, Go, Microservices, Reactjs, FusionJS, GraphQL, gRPC, Kafka, MySQL, and Docstore.",
        "As part of EngSec, worked on an AI Decision Engine called ELLE that helped automate triaging and reviewing Engineering Review Documents in the context of Privacy and Security. The project won several internal recognition awards and was used across multiple sub-disciplines.",
        "Worked on the end-to-end design, implementation and maintenance of multiple MVP products including Uber Charter, Uber Park, and Uber Concierge.",
        "Implemented Golang BE code following Uber Microservices MVCS design patterns, implementing APIs in gRPC, GraphQL and Rest protocols.",
        "Worked with extensive Uber tech stack including MySQL, DocStore, Kafka, Up, USecret, Cadence, uMonitor, Edge, Geofence, Geoproxy, Populous, Rosetta, Terrablob, Texter/Pusher/PostMaster, Nava, BlackBox tests, Bliss, Flipr, Grafana, Kibana, Hive, HDFS.",
        "Worked on FE MonoRepo projects utilizing GraphQL, React, Fusion.",
        "Provided technical interviews for GoLang BE and React FE candidates."
      ]
    },
    "VisionZLab": {
      timeframe: "2010-2023",
      title: "Tech Lead – Part Time",
      details: [
        "FasterOutcomes: AI Startup in legal industry. Lead the Architecture and development. Stack: React, NextJS, Tailwind CSS, Python, n8n, LangChain, FastAPI, OpenAI LLMs, OCR, AI Agents, Firebase, Google Cloud.",
        "Counta AI: AI Startup in Accounting industry. Stack: python, LangChain, FastAPI, CrewAI, AI Agents, Minio, Open Source LLMs, OCR.",
        "MirrorMe3D: Mobile Startup in medical industry. Worked on the iOS mobile app that scans the user's face and sends the 3D model to the backend for processing special surgery prosthetics. Stack: iOS Swift.",
        "Migrating local solutions to Azure and AWS Cloud platforms.",
        "Developed several SAAS applications and marketplaces using modern tech stacks including Node.JS, AngularJS, Firebase, AWS, Azure.",
        "Created AI chatbot solutions and hybrid apps for various platforms using cutting-edge technologies."
      ]
    },
    "Canada Life": {
      timeframe: "2019-2021",
      title: "Solution Architect",
      details: [
        "Established and led an in-house mobile development and architecture team, overseeing everything from conducting technical interviews to coaching developers and implementing automation for DevOps operations.",
        "Collaborated with the Front-End team on the NEST project - a comprehensive, automated component library for React and VueJs components.",
        "Devised systems for collecting e-signatures and AODA-compliant PDF generation, integrating with Azure blockchain services.",
        "Optimized automation within Azure and GCP stacks, improving efficiency and reducing potential error.",
        "Contributed to Salesforce solutions using Angular, Lightning system, and Vlocity tools.",
        "Oversaw the architecture, implementation, and automation of API platforms and microservices utilizing Kubernetes, Java Spring Boot, and Apigee.",
        "Designed and implemented maturity tools to enhance Kubernetes architecture and DevOps functionality."
      ]
    },
    "The Home Depot": {
      timeframe: "2017-2019",
      title: "Software Consultant",
      details: [
        "Steered a team of 10+ onshore and 50+ offshore Developers for the homedepot.ca website, employing various technologies including Angular, NgRx, React.js, Redux, TypeScript.",
        "Led migration to Google Cloud and microservices architecture using Kubernetes, implementing Angular Universal Server-Side Rendering.",
        "Contributed to numerous projects including Order Tracking, Product Information, and Installation Services.",
        "Led the Front-End Mono Repo project implementing Nrwl on Angular 9.",
        "Designed and implemented custom Analytics solution EVT for monitoring Angular web performance.",
        "Built the onshore mobile app team from scratch, managing technical hiring, coaching, and architecting native mobile features."
      ]
    },
    "The Judge Group": {
      timeframe: "2017-2019",
      title: "International Instructor",
      details: [
        "Conducted hands-on courses on \"Migration to Cloud\" covering various cloud platforms including AWS, Azure, GCP, and Pivotal Cloud Foundry."
      ]
    },
    "Xocial, IOU Concepts, Human Code": {
      timeframe: "2016-2017",
      title: "Software Consultant",
      details: [
        "Developed full-stack applications and components using technologies like AWS, MongoDB, Meteor, React, Node, Vagrant, Bamboo, and Git, including the FeedABillion Leaderboard.",
        "Enhanced a hybrid mobile and web application, including video features, by extending open-source Cordova plugin libraries. Worked with Swift, Java, Javascript, Cordova, Android, iOS, and Github.",
        "Optimized DevOps workflows and automation with tools such as Bamboo, Circle CI, Jenkins, and Bitbucket. Also, developed test automation for mobile applications using AWS Device Farm.",
        "Created a Chrome extension to integrate toolset with third-party platforms, and developed CRON jobs for data extraction from APIs. Optimized MongoDB usage for web and mobile applications.",
        "Utilized AWS services extensively, designing a reporting platform using AWS Redshift and managing services like EC2, Elastic Beanstalk, S3, Redshift, CodePipeline, CloudWatch, CloudFormation, IAM, and Device Farm. Executed migrations to utilize AWS best practices."
      ]
    }
  },
  keywords: [
    "Linux", "Mac", "Windows", "XCode", "Android Studio", "IntelliJ", "Gladle", "JIRA", "Virtualbox",
    "Bamboo", "Jenkins", "Circle CI", "GIT", "SourceTree", "n8n", "Cadence",
    "Azure", "AWS", "DevOps", "Temporal", "CA Erwin", "PowerDesigner", "Jupiter", "iPython",
    "OpenRefine", "Tesseract OCR", "markdown", "LangChain", "LLMs", "Ollama",
    "Langgraph", "CrewAI", "Agentic", "AI Crawlers", "pydantic", "Uvicorn", "StreamLit",
    "Google Gemini", "OpenAI LLMs", "Meta LLMs", "Firestore", "Firebase functions",
    "Nginx", "GCP Cloud Run", "GCP IAM", "Spring", "Hibernate", "Swagger", "JBOSS", "JSP",
    "Helm", "Jetty", "Istio Selenium", "Cucumber", "Grafana", "Spring Boot", "Chef", "Puppet",
    "JavaScript", "TypeScript", "Python", "GoLang", "Java", "Swift", "React", "Angular", "Node.js",
    "Kubernetes", "Docker", "Microservices", "API", "REST", "GraphQL", "gRPC", "MongoDB", "MySQL",
    "PostgreSQL", "Firebase", "AWS Lambda", "Serverless", "CI/CD", "DevOps", "Agile", "Scrum"
  ]
};

// MCP Protocol version and constants
const MCP_VERSION = '0.1';
const MCP_CONTENT_TYPE = 'application/vnd.mcp.v1+json';
const JSONRPC_VERSION = '2.0';

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
          description: 'Company name (e.g., Uber, Home Depot, Canada Life, etc.)'
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

// Simple search function for CV content
function searchCV(term) {
  if (!term) return 'Please provide a search term';

  const results = [];
  const lowerTerm = term.toLowerCase();

  // Search in skills
  cvData.skills.text.split('\n').forEach(skill => {
    if (skill.toLowerCase().includes(lowerTerm)) {
      results.push(`Skill: ${skill.replace('• ', '')}`);
    }
  });

  // Search in keywords
  cvData.keywords.forEach(keyword => {
    if (keyword.toLowerCase().includes(lowerTerm)) {
      results.push(`Keyword: ${keyword}`);
    }
  });

  // Search in companies and experiences
  Object.keys(cvData.experience).forEach(company => {
    if (company.toLowerCase().includes(lowerTerm)) {
      results.push(`Company: ${company} (${cvData.experience[company].timeframe})`);
    }

    // Also search in job details
    cvData.experience[company].details.forEach(detail => {
      if (detail.toLowerCase().includes(lowerTerm)) {
        results.push(`Experience at ${company}: ${detail}`);
      }
    });
  });

  // Return formatted results or a message if nothing found
  return results.length > 0 ?
    `Found ${results.length} matches for "${term}":\n\n${results.join('\n\n')}` :
    `No matches found for "${term}".`;
}

// Get company experience
function getCompanyExperience(companyName) {
  if (!companyName) return 'Please provide a company name';

  // Try exact match first
  if (cvData.experience[companyName]) {
    const exp = cvData.experience[companyName];
    return `${companyName} (${exp.timeframe})\nPosition: ${exp.title}\n\nResponsibilities:\n• ${exp.details.join('\n• ')}`;
  }

  // Try case-insensitive partial match
  const lowerCompany = companyName.toLowerCase();
  for (const company of Object.keys(cvData.experience)) {
    if (company.toLowerCase().includes(lowerCompany)) {
      const exp = cvData.experience[company];
      return `${company} (${exp.timeframe})\nPosition: ${exp.title}\n\nResponsibilities:\n• ${exp.details.join('\n• ')}`;
    }
  }

  return `No experience found for company "${companyName}".`;
}

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
        return { text: searchCV(searchTerm) };

      case 'get_company_experience':
        const companyName = args.company;
        return { text: getCompanyExperience(companyName) };

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

// Handle CORS preflight requests
function handleCORS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Handler function to process SSE requests for CV data
async function handleSseRequest(request, url) {
  const path = url.pathname.replace('/sse/', '');
  const searchParams = url.searchParams;
  const queryParam = searchParams.get('q') || '';
  const companyParam = searchParams.get('name') || '';

  let result;

  switch(path) {
    case 'profile':
      result = cvData.profile;
      break;
    case 'skills':
      result = cvData.skills;
      break;
    case 'interests':
      result = cvData.interests;
      break;
    case 'search':
      result = { text: searchCV(queryParam) };
      break;
    case 'company':
      result = { text: getCompanyExperience(companyParam) };
      break;
    case 'resume':
      result = cvData.resume;
      break;
    case 'picture':
      result = cvData.picture;
      break;
    default:
      result = { text: 'Welcome to Frank Goortani\'s CV API.\n\nAvailable queries:\n• profile\n• skills\n• interests\n• search?q=term\n• company?name=companyName\n• resume\n• picture' };
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
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // Set up CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    };

    // Parse the URL to get the path
    const url = new URL(request.url);

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

    // For testing purposes, allow direct URL queries without EventSource
    const path = url.pathname.split('/').pop() || '';
    const queryParam = url.searchParams.get('q') || '';
    const companyParam = url.searchParams.get('name') || '';

    // Handle all other requests with a simple explanation
    return new Response(
      'This endpoint supports SSE connections for Frank Goortani\'s CV queries. ' +
      'Connect with an EventSource and append a query path (profile, skills, interests, search, company, resume, picture).',
      {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          ...corsHeaders
        }
      }
    );
  }
};
