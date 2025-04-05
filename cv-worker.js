/**
 * Frank Goortani CV Server-Sent Events (SSE) Worker
 * This Cloudflare Worker handles queries about Frank's CV and returns results via SSE
 */

// CV data extracted from your markdown files
const cvData = {
  profile: "Senior solution architect with extensive experience in generative AI, data-driven systems, cloud, and mobile technologies. Over 20 years of expertise in designing and implementing enterprise-grade applications across startups and large enterprises. Skilled in generative AI technologies, including LLMs, AI agents, and automation. Proven leadership in guiding cross-functional teams, driving architectural strategies, and delivering impactful results.",

  skills: [
    // Architecture & Solution Design
    "Enterprise Architecture, TOGAF, Solution Design, Reference Architectures, Design Patterns",
    "Distributed Systems, API Platforms, API Gateway, Microservices, Service Mesh, Event-Driven Architecture",
    "Integration Patterns, ESB, Workflow Systems, Temporal, Cadence, Serverless Architecture",
    "Infrastructure as Code, IaaS, PaaS, SaaS, Cloud Architecture, Multi-Cloud Strategy",

    // AI & Machine Learning
    "Generative AI, Large Language Models (LLMs), AI Agents, AI Automation, RAG (Retrieval-Augmented Generation)",
    "Prompt Engineering, Vector Databases, Embeddings, AI-Driven Decision Systems, OpenAI, Gemini",
    "Machine Learning, AI Crawlers, Semantic Search, Natural Language Processing, Computer Vision",
    "LangChain, LangGraph, CrewAI, Multimodal AI Systems, Fine-Tuning, Agentic AI Systems",

    // Programming & Development
    "Reactive Programming, Functional Programming, Object-Oriented Programming, SOLID Principles",
    "Go/Golang, Python, Java, Swift, TypeScript, JavaScript, C#, Ruby, HTML5, CSS3, XML, YAML, JSON",
    "Full-Stack Development, MERN Stack, MEAN Stack, JAMstack, Isomorphic Applications",
    "Web Development, UI/UX Design, Responsive Design, Progressive Web Apps (PWAs)",

    // Mobile Development
    "Mobile Application Architecture, Native Mobile Development (iOS, Android), Hybrid Mobile Apps",
    "Cross-Platform Development, React Native, Ionic, Swift, Objective-C, Java for Android, Kotlin",
    "Mobile DevOps, App Store Optimization, Mobile Testing, Mobile Security, Mobile Analytics",

    // DevOps & CI/CD
    "DevOps, CI/CD Pipelines, Continuous Integration, Continuous Deployment, GitOps",
    "Infrastructure Automation, Configuration Management, Container Orchestration, Kubernetes",
    "Docker, Helm, Istio, Service Mesh, Infrastructure Monitoring, Application Performance Monitoring",
    "Jenkins, Bamboo, CircleCI, GitLab CI, GitHub Actions, Spinnaker, ArgoCD, FluxCD",

    // Cloud Platforms & Technologies
    "AWS (Amazon Web Services), Azure, GCP (Google Cloud Platform), Pivotal Cloud Foundry",
    "Serverless Computing, AWS Lambda, Azure Functions, Google Cloud Functions, Cloud Run",
    "Container Services, EKS, AKS, GKE, Fargate, Cloud Storage Solutions, CDN Integration",
    "Cloud Security, IAM, VPC Configuration, Network Design, Cloud Cost Optimization",

    // Data Engineering & Analytics
    "Data Modeling, Database Design, Dimensional Modeling, Star Schema, Snowflake Schema",
    "Business Intelligence (BI), Data Warehouse Design, ETL/ELT Processes, Data Lakes",
    "Data Governance, Data Quality, Master Data Management (MDM), Data Catalogs",
    "Data Streaming, Real-time Analytics, Batch Processing, Lambda Architecture, Kappa Architecture",
    "Big Data Technologies, Hadoop Ecosystem, Spark, Hive, Pig, Kafka, HBASE",
    "SQL and NoSQL Databases, Data Visualization, Dashboards, Reporting Solutions",

    // Project & Product Management
    "Agile Methodologies, Scrum, Kanban, SAFe, Lean Software Development, XP",
    "Product Management, Product Strategy, Roadmap Planning, Feature Prioritization",
    "Project Management, PMP, Risk Management, Resource Allocation, Budget Management",
    "Stakeholder Management, Requirements Gathering, User Stories, Acceptance Criteria",

    // Security & Compliance
    "Security Architecture, Authentication & Authorization, OAuth 2.0, OpenID Connect",
    "Data Privacy, GDPR, CCPA, HIPAA, PCI-DSS Compliance, Security by Design",
    "Threat Modeling, Security Testing, Penetration Testing, Security Code Reviews",
    "Zero Trust Architecture, Identity Management, Secure API Design, Security Automation",

    // Team Leadership & People Management
    "Technical Team Leadership, Mentoring, Technical Coaching, Team Building",
    "Recruiting Technical Talent, Interview Processes, Onboarding, Performance Management",
    "Cross-functional Team Collaboration, Offshore Team Management, Distributed Teams",
    "Technical Communication, Technology Evangelism, Knowledge Sharing, Community Building",

    // Soft Skills & Business Acumen
    "Business Presentations, Technical Documentation, Whiteboarding, Architecture Review",
    "Change Management, Digital Transformation, Technology Strategy, Innovation Management",
    "ROI Analysis, TCO Calculation, Business Case Development, Value Stream Mapping",
    "Vendor Management, Technology Evaluation, Technical Due Diligence, Technology Roadmapping"
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
    // Operating Systems & Development Environments
    "Linux", "Mac", "Windows", "Ubuntu", "CentOS", "RedHat", "iOS", "Android",
    "XCode", "Android Studio", "IntelliJ", "Visual Studio", "VS Code", "Eclipse", "Vim", "Emacs",
    "Gradle", "Maven", "npm", "yarn", "Webpack", "Babel", "ESLint", "TSLint", "Prettier",

    // Project Management & Collaboration Tools
    "JIRA", "Confluence", "Trello", "Asana", "Monday.com", "ClickUp", "Notion",
    "Slack", "Microsoft Teams", "Zoom", "GitHub", "GitLab", "BitBucket", "SourceTree",
    "Miro", "Figma", "Zeplin", "InVision", "Sketch", "Adobe XD", "Lucidchart",

    // DevOps & CI/CD Tools
    "Jenkins", "Bamboo", "CircleCI", "GitHub Actions", "GitLab CI", "Travis CI",
    "Docker", "Kubernetes", "Helm", "Istio", "Rancher", "OpenShift", "Mesos", "Marathon",
    "Terraform", "Ansible", "Chef", "Puppet", "Salt", "Vagrant", "Packer", "Consul", "Vault",
    "Spinnaker", "ArgoCD", "FluxCD", "Harness", "GitOps", "Datadog", "New Relic",

    // Cloud Platforms & Services
    "AWS EC2", "AWS S3", "AWS Lambda", "AWS Cognito", "AWS SNS", "AWS SQS", "AWS CloudFront",
    "AWS CloudFormation", "AWS CloudWatch", "AWS RDS", "AWS DynamoDB", "AWS Redshift",
    "Azure VMs", "Azure App Service", "Azure Functions", "Azure Storage", "Azure DevOps",
    "Azure CosmosDB", "Azure SQL", "Azure Active Directory", "Azure Kubernetes Service",
    "GCP Compute Engine", "GCP Cloud Run", "GCP Cloud Functions", "GCP Storage", "GCP IAM",
    "GCP BigQuery", "GCP Dataflow", "GCP Pub/Sub", "GCP Firestore", "GCP Cloud Spanner",
    "Firebase", "Firebase Auth", "Firebase Functions", "Firebase Storage", "Firestore",
    "Heroku", "Digital Ocean", "Linode", "Cloudflare", "Akamai", "Fastly", "Netlify", "Vercel",

    // Virtualization & Containerization
    "VirtualBox", "VMware", "Hyper-V", "KVM", "Docker", "Docker Compose", "Docker Swarm",
    "Kubernetes", "K8s", "Minikube", "MiniShift", "EKS", "AKS", "GKE", "OpenShift",
    "Containers", "Microservices", "Service Mesh", "Linkerd", "Envoy", "Kong", "Ambassador",

    // Workflow & Task Automation
    "Airflow", "Temporal", "Cadence", "n8n", "Zapier", "IFTTT", "Power Automate",
    "Celery", "RabbitMQ", "Kafka", "ActiveMQ", "Cron", "Systemd", "Windows Task Scheduler",

    // Programming Languages & Frameworks
    "JavaScript", "TypeScript", "Python", "GoLang", "Java", "C#", "Swift", "Objective-C",
    "Ruby", "PHP", "Scala", "Kotlin", "Dart", "Rust", "C++", "C", "Bash", "PowerShell",
    "React", "Angular", "Vue.js", "Next.js", "Nuxt.js", "Svelte", "Ember.js", "jQuery",
    "Redux", "NgRx", "Vuex", "MobX", "React Query", "SWR", "Apollo Client", "Relay",
    "Node.js", "Express", "NestJS", "Spring Boot", "Spring Framework", "Django", "Flask",
    "Rails", "Laravel", "ASP.NET Core", "FastAPI", "Gin", "Echo", "Fiber", "Rocket",
    "Bootstrap", "Material UI", "Tailwind CSS", "Chakra UI", "Ant Design", "Bulma", "Foundation",

    // Data & Databases
    "SQL", "MySQL", "PostgreSQL", "SQL Server", "Oracle", "SQLite", "MariaDB",
    "MongoDB", "Cassandra", "CouchDB", "Redis", "Neo4j", "Elasticsearch", "DynamoDB",
    "Firebase Realtime DB", "Firestore", "FaunaDB", "Supabase", "Datomic", "InfluxDB",
    "GraphQL", "REST", "gRPC", "SOAP", "WebSockets", "WebRTC", "Server-Sent Events",
    "Prisma", "SQLAlchemy", "Hibernate", "Entity Framework", "Sequelize", "TypeORM",
    "ETL", "ELT", "SSIS", "SSAS", "SSRS", "PowerBI", "Tableau", "Looker", "Metabase",

    // AI & Machine Learning
    "LangChain", "LLMs", "Ollama", "LangGraph", "CrewAI", "Agentic", "AI Crawlers",
    "Pydantic", "Uvicorn", "StreamLit", "FastAPI", "Gradio", "HuggingFace", "Transformers",
    "Google Gemini", "OpenAI", "GPT", "Claude", "Meta LLMs", "Mistral", "Llama", "Vicuna",
    "Prompt Engineering", "RAG", "Vector Databases", "Pinecone", "Weaviate", "Chroma",
    "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "ONNX", "MXNet", "JAX", "SpaCy",

    // Web Servers & Middleware
    "Nginx", "Apache", "IIS", "Tomcat", "Jetty", "JBOSS", "WildFly",
    "Express", "Koa", "Fastify", "Hapi", "Spring WebFlux", "WSGI", "ASGI", "Gunicorn",
    "HTTP", "HTTPS", "HTTP/2", "HTTP/3", "TLS", "SSL", "Web Security", "CORS", "XSS", "CSRF",

    // Testing & Quality Assurance
    "Jest", "Mocha", "Jasmine", "Karma", "Cypress", "Selenium", "Puppeteer", "Playwright",
    "JUnit", "TestNG", "NUnit", "xUnit", "PyTest", "Nose", "RSpec", "PHPUnit",
    "Cucumber", "Gherkin", "BDD", "TDD", "ATDD", "Postman", "Insomnia", "SoapUI",
    "JMeter", "Locust", "Gatling", "K6", "LoadRunner", "BlazeMeter", "Lighthouse",
    "SonarQube", "ESLint", "Prettier", "Black", "Flake8", "JSLint", "JSHint", "Checkstyle",

    // Monitoring & Observability
    "Grafana", "Prometheus", "ELK Stack", "Elasticsearch", "Logstash", "Kibana",
    "Datadog", "New Relic", "Dynatrace", "AppDynamics", "Sentry", "Rollbar", "LogRocket",
    "Jaeger", "Zipkin", "OpenTracing", "OpenTelemetry", "Splunk", "Graylog", "Loki",

    // Security & Identity
    "OAuth 2.0", "OpenID Connect", "SAML", "JWT", "Keycloak", "Auth0", "Okta",
    "Azure AD", "AWS Cognito", "Firebase Auth", "Google Identity Platform", "LDAP",
    "SSO", "MFA", "2FA", "RBAC", "ABAC", "Zero Trust", "Biometrics", "Encryption",
    "TLS", "SSL", "HTTPS", "VPN", "Firewall", "WAF", "OWASP", "Penetration Testing",

    // Methodologies & Practices
    "Agile", "Scrum", "Kanban", "SAFe", "LeSS", "XP", "Lean", "DevOps", "DataOps", "MLOps",
    "GitOps", "Trunk-Based Development", "Feature Flags", "Blue-Green Deployment",
    "Canary Deployment", "A/B Testing", "Chaos Engineering", "Site Reliability Engineering",
    "BDD", "TDD", "DDD", "Event Storming", "CQRS", "Event Sourcing", "Hexagonal Architecture",

    // Industry-Specific
    "FinTech", "HealthTech", "EdTech", "PropTech", "InsurTech", "LegalTech", "RetailTech",
    "Mobility", "Smart Cities", "IoT", "Blockchain", "Cryptocurrency", "NFT", "DeFi",
    "GDPR", "CCPA", "HIPAA", "SOX", "PCI-DSS", "ISO 27001", "SOC 2", "NIST", "FedRAMP"
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

// Export a default object for Cloudflare Workers
export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // For testing purposes, allow direct URL queries without EventSource
    const url = new URL(request.url);
    const path = url.pathname.split('/').pop() || '';
    const queryParam = url.searchParams.get('q') || '';
    const companyParam = url.searchParams.get('name') || '';

    // Check if the path contains 'sse'
    if (url.pathname.includes('/sse/')) {
      // Special headers for SSE
      const headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      };

      return handleSSERequest(request, path, queryParam, companyParam, headers);
    }

    // All other requests get a simple response explaining the API
    return new Response(
      'This endpoint supports SSE connections for Frank Goortani\'s CV queries. ' +
      'Connect with an EventSource and append a query path (profile, skills, interests, search, company, resume, picture).',
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        }
      }
    );
  }
};

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

// Handle SSE requests
async function handleSSERequest(request, path, queryParam, companyParam, headers) {
  try {
    // For simplicity and debugging, let's create a basic response without streaming
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

    // Create a properly formatted SSE response
    // Each event must be prefixed with "data: " and end with "\n\n"
    const encoder = new TextEncoder();
    const responseData = encoder.encode(`data: ${JSON.stringify({ text: response })}\n\n`);
    const doneData = encoder.encode(`data: {"text":"[DONE]"}\n\n`);

    // Use a ReadableStream but with proper encoding
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(responseData);
        controller.enqueue(doneData);
        controller.close();
      }
    });

    return new Response(stream, { headers });
  } catch (error) {
    // Return a more detailed error message
    return new Response(`Error processing request: ${error.message}`, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      }
    });
  }
}
