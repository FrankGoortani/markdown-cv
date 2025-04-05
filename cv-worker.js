/**
 * Frank Goortani CV Server-Sent Events (SSE) Worker
 * This Cloudflare Worker handles queries about Frank's CV and returns results via SSE
 */

// CV data extracted from your markdown files
const cvData = {
  profile: "Senior solution architect with extensive experience in generative AI, data-driven systems, cloud, and mobile technologies. Over 20 years of expertise in designing and implementing enterprise-grade applications across startups and large enterprises. Skilled in generative AI technologies, including LLMs, AI agents, and automation. Proven leadership in guiding cross-functional teams, driving architectural strategies, and delivering impactful results.",

  skills: [
    "Distributed Systems, API platforms, Microservices, integrations, Workflow systems",
    "Generative AI, Large Language Models (LLMs), AI agents, AI automation, Machine Learning",
    "Reactive and Functional Programming in Go, Python, Java, Swift, Typescript and JavaScript",
    "Full-stack Development, DevOps, Product Management, Agile Project Management",
    "Mobile application development, Mobile architecture, Hybrid/Cross-Platform apps",
    "Requirement Analysis, Change Management, Stakeholder Communications, Technology Evangelism",
    "Business Presentations, Architectural Documentation, Research, POCs",
    "Data Modeling, Business Intelligence (BI), Data Warehouse Design, ETL tools",
    "Data Governance, Data Streams, Master Data Management (MDM), Reporting, Dashboards",
    "Automation, Data Science, Data Visualizations, Infographics"
  ],

  interests: ["Startups", "GoLang", "Python", "Typescript", "LangChain", "LLMs", "Microservices"],

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
  ],

  resumeUrl: "media/Frank Goortani Resume--solution-architect-2024.pdf",
  pictureUrl: "media/frankgoortani.png"
};

// Simple search function for CV content
function searchCV(term) {
  if (!term) return 'Please provide a search term';

  const results = [];
  const lowerTerm = term.toLowerCase();

  // Search in skills
  cvData.skills.forEach(skill => {
    if (skill.toLowerCase().includes(lowerTerm)) {
      results.push(`Skill: ${skill}`);
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

// Main event handler for the Worker
addEventListener('fetch', event => {
  // Handle CORS preflight requests
  if (event.request.method === 'OPTIONS') {
    return event.respondWith(handleCORS(event.request));
  }

  // Handle SSE connections
  if (event.request.headers.get('Accept') === 'text/event-stream') {
    return event.respondWith(handleSSE(event.request));
  }

  // All other requests get a simple response explaining the API
  return event.respondWith(new Response(
    'This endpoint supports SSE connections for Frank Goortani\'s CV queries. ' +
    'Connect with an EventSource and append a query path (profile, skills, interests, search, company, resume, picture).',
    { status: 200 }
  ));
});

// Handle CORS preflight requests
function handleCORS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Handle SSE connections and queries
async function handleSSE(request) {
  const url = new URL(request.url);
  const path = url.pathname.split('/').pop() || '';
  const queryParam = url.searchParams.get('q') || '';
  const companyParam = url.searchParams.get('name') || '';

  // Create response headers for SSE
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  };

  const stream = new ReadableStream({
    start(controller) {
      // Handle different query types
      let response;

      switch(path) {
        case 'profile':
          response = cvData.profile;
          break;
        case 'skills':
          response = `Skills:\n• ${cvData.skills.join('\n• ')}`;
          break;
        case 'interests':
          response = `Interests: ${cvData.interests.join(', ')}`;
          break;
        case 'search':
          response = searchCV(queryParam);
          break;
        case 'company':
          response = getCompanyExperience(companyParam);
          break;
        case 'resume':
          response = cvData.resumeUrl;
          break;
        case 'picture':
          response = cvData.pictureUrl;
          break;
        default:
          response = 'Welcome to Frank Goortani\'s CV API.\n\nAvailable queries:\n• profile\n• skills\n• interests\n• search?q=term\n• company?name=companyName\n• resume\n• picture';
      }

      // Send the response as an SSE message
      const message = `data: ${JSON.stringify({ text: response })}\n\n`;
      controller.enqueue(new TextEncoder().encode(message));

      // End the stream
      controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
      controller.close();
    }
  });

  return new Response(stream, { headers });
}
