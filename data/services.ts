export interface ServiceRelevantProject {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  tech: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  heroTagline: string;
  badge: string;
  iconName: string;
  businessProblems: string[];
  proposedSolutions: string[];
  capabilities: string[];
  deliverables: string[];
  techStack: string[];
  relevantProjects: ServiceRelevantProject[];
  processSteps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  engagementModels: { name: string; description: string; turnaround: string }[];
}

export const services: ServiceItem[] = [
  {
    id: 'custom-web-dev',
    slug: 'custom-web-development',
    title: 'Custom Web Development',
    badge: 'Core Specialty',
    iconName: 'Globe',
    shortDescription:
      'High-performance web applications, SaaS platforms, customer portals, and admin dashboards built with Next.js App Router, React 19, and Node.js. Fast, SEO-optimized, and built for scale.',
    heroTagline: 'Custom web software engineered for speed, search visibility, and seamless user conversion.',
    businessProblems: [
      'Outdated legacy websites with slow load times that increase bounce rates and harm search rankings.',
      'Rigid CMS platforms (WordPress/Shopify) that cannot support custom workflows, complex data models, or unique business logic.',
      'Bloated frontends filled with technical debt that are difficult and expensive for in-house teams to maintain.',
    ],
    proposedSolutions: [
      'Next.js 16 App Router architecture utilizing Server Components for sub-second page loads and optimal Core Web Vitals.',
      'Modular React 19 component design systems built with Tailwind CSS for clean, brand-tailored user interfaces.',
      'Strict TypeScript codebases with centralized API layers and automated query caching via TanStack Query.',
    ],
    capabilities: [
      'Business websites & high-converting product landing pages',
      'SaaS applications with multi-tenant architecture',
      'Admin dashboards with data visualization & analytics',
      'Customer portals with secure authentication & role-based access',
      'Full-stack web applications with server-side rendering (SSR)',
    ],
    deliverables: [
      'Production-ready Next.js web application built with TypeScript and Tailwind CSS',
      'Secure user authentication (JWT, OAuth) and role-based permissions (RBAC)',
      'Custom admin dashboard with filterable data tables and status monitors',
      'Optimized MongoDB or SQL database schema with indexing and validations',
      'Zero-downtime deployment setup on Vercel or AWS with SSL & CI/CD',
    ],
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'TanStack Query'],
    relevantProjects: [
      {
        id: 'nilescart',
        title: 'NilesCart E-Commerce Platform',
        slug: 'nilescart-ecommerce-ecosystem',
        tagline: 'Modern multi-platform storefront with responsive Next.js web client and synchronized cart.',
        tech: ['Next.js 16', 'TypeScript', 'TanStack Query', 'Tailwind CSS'],
      },
      {
        id: 'w3dev-saas',
        title: 'AI Voice & Full-Stack SaaS',
        slug: 'ai-voice-fullstack-saas',
        tagline: 'Commercial SaaS platforms featuring 25+ REST APIs, Stripe billing, and Twilio voice AI.',
        tech: ['Next.js', 'Express.js', 'MongoDB', 'Stripe API'],
      },
      {
        id: 'pwev',
        title: 'Pwev Learning & Mentorship Portal',
        slug: 'pwev-learning-community-platform',
        tagline: 'Interactive course progression, mentor reviews, and freelance job discovery workflows.',
        tech: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      },
    ],
    processSteps: [
      {
        title: '1. Architecture & Scope Discovery',
        description: 'Deep dive into your product requirements, user journeys, data models, and technical constraints to establish a watertight sprint roadmap.',
      },
      {
        title: '2. API & Data Modeling',
        description: 'Design RESTful endpoints, secure authentication schemes, and database schemas with strict validation and indexing.',
      },
      {
        title: '3. Component & UI Implementation',
        description: 'Develop accessible, mobile-first responsive interfaces in Next.js and Tailwind CSS with client/server component separation.',
      },
      {
        title: '4. Testing, Optimization & Handover',
        description: 'End-to-end testing, Core Web Vitals optimization, cloud deployment, and complete source code and documentation transfer.',
      },
    ],
    faqs: [
      {
        question: 'Do you work with international clients across timezones?',
        answer: 'Yes. I am based in India (UTC+5:30) and regularly coordinate working hours with teams in North America (EST/PST) and Europe (GMT/CET) with 4-6 hours of daily overlap.',
      },
      {
        question: 'What is the typical timeline for a web MVP?',
        answer: 'A standard production MVP typically takes 3 to 6 weeks from initial scope specification to production deployment.',
      },
      {
        question: 'Will I own 100% of the intellectual property?',
        answer: 'Yes, full intellectual property and code ownership are transferred to you upon milestone completion and final payment.',
      },
    ],
    engagementModels: [
      {
        name: 'Fixed-Price MVP Sprint',
        description: 'Clear scope, fixed budget, and guaranteed milestone delivery for new product builds.',
        turnaround: '3 - 6 Weeks',
      },
      {
        name: 'Monthly Dedicated Retainer',
        description: 'Dedicated weekly hours embedded into your team for ongoing feature engineering and releases.',
        turnaround: 'Flexible Monthly Commitment',
      },
    ],
  },
  {
    id: 'mobile-app-dev',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    badge: 'High Impact',
    iconName: 'Smartphone',
    shortDescription:
      'Native-grade iOS and Android mobile apps engineered with React Native. Single-codebase architecture delivering 60 FPS performance, offline persistence, and seamless hardware access.',
    heroTagline: 'Single-codebase mobile applications that look, feel, and perform like native software.',
    businessProblems: [
      'Building separate iOS and Android native apps doubles your initial development budget and doubles ongoing maintenance costs.',
      'Inconsistent user experiences between platforms leading to feature parity delays and customer confusion.',
      'Battery drain and performance lags caused by poorly architected background GPS polling and heavy mobile rendering.',
    ],
    proposedSolutions: [
      'Unified React Native codebase compiling to native platform widgets for both Apple App Store and Google Play.',
      'Battery-efficient geolocation smoothing and background state synchronization for real-time mobile features.',
      'Shopify FlashList list virtualization for buttery 60 FPS scrolling on heavy product catalogs and feeds.',
    ],
    capabilities: [
      'Android & iOS cross-platform applications',
      'React Native & Expo ecosystem development',
      'Real-time WebSocket and REST API integrations',
      'Mobile payment gateways & deep-linked checkout',
      'Hardware integrations: Geolocation, camera, push notifications',
    ],
    deliverables: [
      'Production-ready React Native app for both iOS and Android platforms',
      'Responsive, tactile UI with smooth animations and native gesture handling',
      'Background geolocation, push notification setup, and offline caching',
      'Clean state architecture (Zustand or Redux Toolkit) with offline sync',
      'Assistance with App Store and Google Play publishing and release management',
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Redux Toolkit', 'Zustand', 'Shopify FlashList', 'Postman'],
    relevantProjects: [
      {
        id: 'nilescart-mobile',
        title: 'NilesCart Native Mobile Shopping App',
        slug: 'nilescart-ecommerce-ecosystem',
        tagline: 'React Native Expo mobile client with deep-linked checkout and instant query caching.',
        tech: ['React Native', 'Expo', 'Shopify FlashList', 'TanStack Query'],
      },
      {
        id: 'dwive',
        title: 'Dwive Mobility Booking Platform',
        slug: 'dwive-mobility-booking-platform',
        tagline: 'Cross-platform mobile travel app with live GPS bus tracking and multi-modal bookings.',
        tech: ['React Native', 'TypeScript', 'Geo-Location', 'REST APIs'],
      },
      {
        id: 'convoo',
        title: 'Convoo Real-Time Mobile Chat',
        slug: 'convoo-realtime-chat',
        tagline: 'Cross-platform duplex messaging with persistent sessions across Web and Mobile.',
        tech: ['React Native', 'Socket.io', 'Node.js', 'JWT'],
      },
    ],
    processSteps: [
      {
        title: '1. UI/UX Workflow Mapping',
        description: 'Define mobile screen transitions, navigation hierarchies, and responsive layouts tailored to all device dimensions.',
      },
      {
        title: '2. Native Modules & State Core',
        description: 'Build native integration bridges, persistent storage layers, and resilient offline synchronization.',
      },
      {
        title: '3. Feature Sprints & Real-Device Testing',
        description: 'Implement booking flows, chat, or geo-tracking with daily testing across physical iOS and Android test hardware.',
      },
      {
        title: '4. Store Submission & Launch',
        description: 'Prepare production release builds, configure certificates/signing, and guide store approval guidelines.',
      },
    ],
    faqs: [
      {
        question: 'Do you build for both iOS and Android?',
        answer: 'Yes. React Native compiles to native components for both iOS and Android from a unified TypeScript codebase, saving up to 40% in engineering and maintenance costs.',
      },
      {
        question: 'Have you built complex features like live tracking?',
        answer: 'Yes, in platforms like Dwive (travel/mobility), I engineered live tracking interfaces, route visualization, and booking workflows.',
      },
    ],
    engagementModels: [
      {
        name: 'Mobile Product Build',
        description: 'Complete cross-platform app development from design mocks to App Store and Google Play submission.',
        turnaround: '4 - 8 Weeks',
      },
      {
        name: 'Feature Contract',
        description: 'Implement complex modules (live tracking, real-time messaging, checkout) into an existing codebase.',
        turnaround: '1 - 3 Weeks',
      },
    ],
  },
  {
    id: 'desktop-app-dev',
    slug: 'desktop-application-development',
    title: 'Desktop Application Development',
    badge: 'Security-First',
    iconName: 'Monitor',
    shortDescription:
      'Cross-platform desktop software for macOS, Windows, and Linux built with Electron, React, and TypeScript. Ideal for offline data processing, security compliance, and internal business tools.',
    heroTagline: 'Secure, offline-first desktop tools built for heavy data workflows and total data privacy.',
    businessProblems: [
      'Strict corporate privacy, GDPR, or compliance rules preventing sensitive datasets from being uploaded to third-party cloud SaaS platforms.',
      'Web browser memory limits causing tabs to crash when processing multi-megabyte CSV/Excel files.',
      'Reliance on fragmented legacy desktop scripts or spreadsheets that lack user-friendly interfaces.',
    ],
    proposedSolutions: [
      '100% offline desktop execution running on local workstation hardware with zero external cloud transmission.',
      'High-performance local data parsing and statistical profiling algorithms running in native background processes.',
      'Strict two-tier Electron architecture with a sandboxed IPC bridge separating the main process from the UI.',
    ],
    capabilities: [
      'Electron-based cross-platform desktop applications',
      'Cross-platform desktop software (macOS, Windows, Linux)',
      'Data processing, anomaly detection, and visualization tools',
      'Internal business software and local administrative utilities',
      'Sandboxed IPC architecture ensuring maximum operating system security',
    ],
    deliverables: [
      'Installers compiled via Electron Builder for macOS (.dmg), Windows (.exe), and Linux (.AppImage/.deb)',
      '100% offline data processing ensuring complete data privacy and GDPR compliance',
      'Native desktop window menus, keyboard shortcuts, and native file system dialogs',
      'Reactive state management combining Zustand and TanStack Query',
      'Complete TypeScript codebase with automated build scripts',
    ],
    techStack: ['Electron', 'Electron Vite', 'React', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind CSS', 'Electron Builder'],
    relevantProjects: [
      {
        id: 'edacleaner',
        title: 'edaCleaner Desktop Application',
        slug: 'edacleaner-desktop-data-cleansing',
        tagline: 'Production-ready Electron desktop app for automated exploratory data analysis and data cleansing.',
        tech: ['Electron', 'React', 'TypeScript', 'Zustand', 'Tailwind CSS'],
      },
    ],
    processSteps: [
      {
        title: '1. Architecture & IPC Interface Design',
        description: 'Define the strict IPC boundary between the Electron main process and the React renderer to ensure complete security.',
      },
      {
        title: '2. Local Data Processing Engine',
        description: 'Build high-performance algorithms for file parsing, data transformations, and statistical summaries.',
      },
      {
        title: '3. Desktop UI & Native Integration',
        description: 'Create responsive, intuitive desktop interfaces with window menus, theme toggling, and file dialogs.',
      },
      {
        title: '4. Multi-Platform Packaging & Distribution',
        description: 'Configure Electron Builder for multi-platform binaries, codesigning, and update mechanisms.',
      },
    ],
    faqs: [
      {
        question: 'Does the desktop app send any data over the internet?',
        answer: 'No. As demonstrated in edaCleaner, the application can be engineered to run 100% locally and offline, ensuring sensitive datasets never touch external cloud servers.',
      },
      {
        question: 'Can you generate installers for all operating systems?',
        answer: 'Yes. Electron Builder produces native installers for macOS (.dmg, .zip), Windows (.exe, .msi), and Linux (.AppImage, .deb).',
      },
    ],
    engagementModels: [
      {
        name: 'Desktop Software Sprint',
        description: 'End-to-end desktop software build from initial UI mocks to packaged desktop installers.',
        turnaround: '3 - 6 Weeks',
      },
    ],
  },
  {
    id: 'ai-agent-dev',
    slug: 'ai-agent-development',
    title: 'AI Agent Development',
    badge: 'Intelligent Workflows',
    iconName: 'Bot',
    shortDescription:
      'Custom AI agents, customer support chatbots, and telephone voice assistants powered by OpenAI LLMs, Whisper Speech-to-Text, and Twilio SDK.',
    heroTagline: 'Intelligent AI agents and voice pipelines that automate customer interactions and business operations.',
    businessProblems: [
      'Customer support teams overwhelmed by repetitive inquiries, resulting in long response times and high operational staffing costs.',
      'Missed inbound telephone leads and booking inquiries outside normal business operating hours.',
      'Generic off-the-shelf chatbots that hallucinate or fail to connect with business databases and CRM records.',
    ],
    proposedSolutions: [
      'Bi-directional audio streaming pipelines bridging real telephone calls to OpenAI speech models with sub-second turnaround.',
      'Strictly bounded system prompts and tool-calling functions to guarantee accurate business information and zero hallucinations.',
      'Automated transcription, intent extraction, and seamless escalation to human team members with full context.',
    ],
    capabilities: [
      'AI chatbots for websites and customer communication channels',
      'Customer support agents with automated triage and FAQ resolution',
      'AI voice assistants handling telephone calls via Twilio SDK',
      'LLM integration and custom prompt engineering with guardrails',
      'Knowledge-base assistants with context retrieval (RAG)',
      'Intelligent business workflows connecting tools to AI decision logic',
    ],
    deliverables: [
      'Configured Twilio voice streaming pipeline or web chat agent',
      'Secure OpenAI API integration with structured prompt guardrails and function calling',
      'Call transcript storage, intent tagging, and automated webhook notifications',
      'Admin dashboard for reviewing conversation logs, latency, and success metrics',
      'Complete documentation and testing guidelines',
    ],
    techStack: ['OpenAI API', 'Twilio Voice SDK', 'Whisper STT', 'Text-to-Speech (TTS)', 'Node.js', 'Express.js', 'Next.js'],
    relevantProjects: [
      {
        id: 'w3dev-ai',
        title: 'AI Voice Communication Pipeline',
        slug: 'ai-voice-fullstack-saas',
        tagline: 'Real telephone audio streaming with Twilio and OpenAI LLMs for sub-second voice interactions.',
        tech: ['Twilio SDK', 'OpenAI API', 'Whisper STT', 'Node.js'],
      },
    ],
    processSteps: [
      {
        title: '1. Conversational Flow & Persona Definition',
        description: 'Map out conversation branches, business domain constraints, required tool-calling actions, and fallback triggers.',
      },
      {
        title: '2. Streaming Audio & Pipeline Integration',
        description: 'Connect Twilio media streams or WebSocket audio feeds directly to Whisper and low-latency speech synthesis models.',
      },
      {
        title: '3. Guardrails & Knowledge Base Grounding',
        description: 'Implement validation layers to prevent hallucinations and ground responses in verified business documentation.',
      },
      {
        title: '4. Production Deployment & Telemetry',
        description: 'Deploy real-time logging, latency monitoring, and call analytics dashboards.',
      },
    ],
    faqs: [
      {
        question: 'How fast is the voice turnaround on telephone calls?',
        answer: 'By chaining streaming audio chunks directly from Twilio to fast speech models, voice interactions achieve sub-second conversational turnarounds (typically 600-800ms).',
      },
      {
        question: 'How do you prevent the AI from giving incorrect information?',
        answer: 'I use strict prompt constraints, role-based system prompts, and tool-calling validation so the model only references verified business data.',
      },
    ],
    engagementModels: [
      {
        name: 'AI Voice Pipeline Implementation',
        description: 'Complete integration of Twilio + OpenAI voice agent for phone or web interfaces.',
        turnaround: '3 - 5 Weeks',
      },
    ],
  },
  {
    id: 'n8n-automation',
    slug: 'n8n-business-automation',
    title: 'n8n and Business Automation',
    badge: 'Automation Engineering',
    iconName: 'Workflow',
    shortDescription:
      'End-to-end business process automation using self-hosted n8n and custom webhook pipelines. Connect your CRM, email, notifications, databases, and AI models into automated workflows.',
    heroTagline: 'Eliminate manual data entry and repetitive busywork with reliable, self-hosted workflow automation.',
    businessProblems: [
      'Expensive monthly subscription fees and strict execution limits from multi-tenant automation platforms like Zapier or Make.',
      'Manual copy-pasting across disparate tools (CRMs, email, spreadsheets, invoicing) leading to human error and dropped leads.',
      'Privacy compliance concerns when customer data travels through third-party multi-tenant cloud automation servers.',
    ],
    proposedSolutions: [
      'Self-hosted n8n deployment on your own cloud VM with unlimited workflow executions and zero per-run fees.',
      'Automated webhook pipelines that validate, transform, and sync data instantly across platforms with error alerting.',
      'AI-powered workflow steps for automatic lead qualification, sentiment analysis, and intelligent routing.',
    ],
    capabilities: [
      'Workflow setup and multi-tool integration',
      'Self-hosted n8n deployment on private cloud servers (Docker)',
      'CRM automation and lead management synchronization',
      'Email, Slack, SMS, and WhatsApp notification workflows',
      'API and AI-powered workflow integration (OpenAI + n8n)',
    ],
    deliverables: [
      'Production self-hosted n8n installation on your private server (Docker / Cloud VM)',
      'Automated workflows configured with error handling, retries, and execution logging',
      'Secure webhook endpoints with cryptographic signature verification',
      'Automated alerting (Slack / Email) when external APIs fail or return errors',
      'Full documentation and handover for easy in-house workflow modification',
    ],
    techStack: ['n8n', 'Docker', 'Webhooks', 'REST APIs', 'PostgreSQL', 'Node.js', 'OpenAI API'],
    relevantProjects: [
      {
        id: 'w3dev-webhooks',
        title: 'Automated Event & Webhook Pipeline',
        slug: 'ai-voice-fullstack-saas',
        tagline: 'Cryptographic webhook verification and automated transactional event processing.',
        tech: ['Node.js', 'Express', 'Webhooks', 'MongoDB'],
      },
    ],
    processSteps: [
      {
        title: '1. Workflow & Tool Audit',
        description: 'Map out existing manual tasks, data sources, destinations, and business triggers that can be automated.',
      },
      {
        title: '2. Infrastructure & n8n Deployment',
        description: 'Set up self-hosted n8n via Docker on your cloud infrastructure with SSL, persistence, and automated backups.',
      },
      {
        title: '3. Workflow Construction & Testing',
        description: 'Build multi-node automations, integrate API credentials, add error-handling branches, and test with real payloads.',
      },
      {
        title: '4. Production Monitoring & Handover',
        description: 'Enable failure notification alerts and conduct a video walkthrough so your team can maintain or modify workflows.',
      },
    ],
    faqs: [
      {
        question: 'Why choose self-hosted n8n over Zapier or Make?',
        answer: 'Self-hosted n8n runs on your own server with no per-task pricing, giving you unlimited executions, complete data privacy, and full control over your customer information.',
      },
      {
        question: 'Can n8n connect with custom internal APIs?',
        answer: 'Yes! n8n includes generic HTTP Request nodes, webhook receivers, and custom JavaScript/TypeScript code nodes to integrate with any proprietary API.',
      },
    ],
    engagementModels: [
      {
        name: 'Workflow Automation Sprint',
        description: 'Self-hosted n8n server setup and implementation of up to 5 core business automation workflows.',
        turnaround: '2 - 3 Weeks',
      },
    ],
  },
  {
    id: 'ecommerce-dev',
    slug: 'ecommerce-development',
    title: 'E-commerce Development',
    badge: 'Digital Commerce',
    iconName: 'ShoppingBag',
    shortDescription:
      'High-conversion online stores, marketplace platforms, and cross-platform mobile shopping applications with fast catalogs, synchronized carts, and secure checkout.',
    heroTagline: 'Modern, high-converting e-commerce software engineered for speed, retention, and frictionless checkout.',
    businessProblems: [
      'Slow, bloated e-commerce storefronts that reduce mobile checkout conversion rates and increase cart abandonment.',
      'Expensive platform transaction fees and rigid plugin systems that limit custom discounts, bundles, or multi-vendor workflows.',
      'Disconnected shopping experiences where user carts and order histories fail to sync between web and native mobile apps.',
    ],
    proposedSolutions: [
      'Next.js 16 headless web storefront paired with a native React Native mobile app sharing a unified backend API.',
      'Instant screen navigation and client-side cart updates using TanStack Query caching for zero lag.',
      'Secure payment gateway checkout with deep-linked mobile callbacks and server-side verification to stop fraudulent orders.',
    ],
    capabilities: [
      'Custom online stores with responsive product discovery',
      'Marketplace platforms with multi-vendor support',
      'Seller and admin dashboards for orders, inventory, and analytics',
      'Inventory and order management with real-time stock sync',
      'Payment gateway integrations (Stripe, Flutterwave, credit cards)',
    ],
    deliverables: [
      'Responsive Next.js web storefront optimized for maximum mobile conversion',
      'Native React Native mobile app with Shopify FlashList catalog virtualization',
      'Admin and seller portal for inventory updates, order tracking, and sales analytics',
      'Secure payment checkout integration with automated receipts and refund handling',
      'Full source code ownership with zero recurring platform revenue-share fees',
    ],
    techStack: ['Next.js 16', 'React Native (Expo)', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Stripe', 'MongoDB', 'TanStack Query'],
    relevantProjects: [
      {
        id: 'nilescart',
        title: 'NilesCart E-Commerce Platform',
        slug: 'nilescart-ecommerce-ecosystem',
        tagline: 'Multi-platform e-commerce ecosystem: Next.js web storefront and React Native Expo mobile app.',
        tech: ['Next.js 16', 'React Native', 'Shopify FlashList', 'TanStack Query'],
      },
      {
        id: 'w3dev-billing',
        title: 'Stripe Payment & Checkout Engine',
        slug: 'ai-voice-fullstack-saas',
        tagline: 'Recurring subscription checkout, customer billing portal, and automated invoice delivery.',
        tech: ['Stripe API', 'Express.js', 'Node.js', 'MongoDB'],
      },
    ],
    processSteps: [
      {
        title: '1. Catalog & Checkout Architecture',
        description: 'Define product variations, categories, inventory data models, and frictionless checkout user flows.',
      },
      {
        title: '2. Storefront UI & Fast Navigation',
        description: 'Build responsive product listing and detail views with search filtering, optimistic cart updates, and instant caching.',
      },
      {
        title: '3. Payment Gateway & Webhook Security',
        description: 'Integrate secure payment processing with server-side validation and automated receipt dispatch.',
      },
      {
        title: '4. Admin Management & Production Launch',
        description: 'Deploy inventory management dashboards and launch on live domains with full order monitoring.',
      },
    ],
    faqs: [
      {
        question: 'Can customers use the same cart across web and mobile?',
        answer: 'Yes. In NilesCart, both the Next.js web client and React Native mobile client consume the same backend API, ensuring carts, addresses, and order histories stay synchronized.',
      },
      {
        question: 'Do you charge a monthly fee on my sales?',
        answer: 'No. You own 100% of your software and code. There are zero platform cuts, revenue sharing, or proprietary vendor lock-in fees.',
      },
    ],
    engagementModels: [
      {
        name: 'E-Commerce Platform Build',
        description: 'Complete web storefront and mobile shopping application build with payment checkout.',
        turnaround: '4 - 8 Weeks',
      },
    ],
  },
  {
    id: 'backend-api-dev',
    slug: 'backend-api-development',
    title: 'Backend and API Development',
    badge: 'Infrastructure & APIs',
    iconName: 'Server',
    shortDescription:
      'Scalable RESTful APIs, microservices, secure authentication, database architecture, and real-time communication systems built with Node.js, Express, and MongoDB/SQL.',
    heroTagline: 'Rock-solid backend architectures and APIs designed for high concurrency, security, and uptime.',
    businessProblems: [
      'Brittle backend architectures that crash under sudden traffic spikes or suffer from slow, unindexed database queries.',
      'Weak API security, unprotected endpoints, and vulnerability to replay attacks or unauthorized data access.',
      'Unmaintainable spaghetti codebases lacking modular separation, schema validation, and API documentation.',
    ],
    proposedSolutions: [
      'Strictly typed Node.js and Express backend adhering to clean MVC architecture and modular service layers.',
      'Tokenized JWT authentication verifying permissions on every request and during WebSocket handshakes.',
      'Indexed MongoDB / PostgreSQL query structures guaranteeing sub-50ms query responses at scale.',
    ],
    capabilities: [
      'REST APIs designed for high throughput and clean client consumption',
      'Authentication and authorization: JWT, OAuth, session stores, and RBAC',
      'Database architecture, normalization, schema validation, and indexing',
      'Real-time communication with Socket.io duplex connection pools',
      'Third-party integrations: payment gateways, messaging SDKs, and cloud storage',
    ],
    deliverables: [
      'Modular RESTful API service with centralized validation and structured error handling',
      'Secure authentication and role-based access control layer',
      'Optimized database schemas with automated migration scripts and indexes',
      'Postman API collection and comprehensive endpoint documentation',
      'Automated health check endpoints and server monitoring configuration',
    ],
    techStack: ['Node.js', 'Express.js', 'Socket.io', 'MongoDB', 'PostgreSQL', 'TypeScript', 'JWT', 'Postman'],
    relevantProjects: [
      {
        id: 'w3dev-apis',
        title: 'W3 Dev Production Backend Services',
        slug: 'ai-voice-fullstack-saas',
        tagline: 'Designed and deployed 25+ production RESTful APIs for authentication, billing, and transactional workflows.',
        tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Postman'],
      },
      {
        id: 'convoo-backend',
        title: 'Convoo WebSocket Duplex Backend',
        slug: 'convoo-realtime-chat',
        tagline: 'Authenticated Socket.io connection pools with room isolation and sub-80ms message delivery.',
        tech: ['Socket.io', 'Node.js', 'Express.js', 'MongoDB'],
      },
    ],
    processSteps: [
      {
        title: '1. API Specification & Data Schema Design',
        description: 'Map out endpoints, HTTP methods, request/response JSON schemas, database collections, and index strategies.',
      },
      {
        title: '2. Authentication & Core Logic Implementation',
        description: 'Implement JWT token generation, password hashing, role-based middleware, and transactional service functions.',
      },
      {
        title: '3. Security Auditing & Concurrency Testing',
        description: 'Validate rate limiting, sanitize input against injection attacks, and test endpoints under simulated high load.',
      },
      {
        title: '4. Documentation & Deployment',
        description: 'Export complete Postman API collections and deploy to containerized or serverless cloud environments.',
      },
    ],
    faqs: [
      {
        question: 'How do you handle API documentation for frontend teams?',
        answer: 'I deliver complete, organized Postman collections with saved examples and environment variables, along with clear Markdown endpoint documentation.',
      },
      {
        question: 'Have you built real-time WebSocket systems at scale?',
        answer: 'Yes. In Convoo, I architected duplex Socket.io clusters verifying JWT authentication during initial handshake, achieving sub-80ms message delivery.',
      },
    ],
    engagementModels: [
      {
        name: 'Backend & API Sprint',
        description: 'Design, build, and document production REST APIs and database architecture.',
        turnaround: '2 - 4 Weeks',
      },
    ],
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-deployment-maintenance',
    title: 'Cloud Deployment and Maintenance',
    badge: 'DevOps & Reliability',
    iconName: 'Cloud',
    shortDescription:
      'Cloud infrastructure setup on AWS, Docker containerization, CI/CD automated deployment pipelines, ongoing application maintenance, and performance optimization.',
    heroTagline: 'Reliable cloud deployments, automated CI/CD pipelines, and proactive software maintenance.',
    businessProblems: [
      'Downtime during updates, manual error-prone deployment steps, and unmonitored production servers.',
      'Sluggish application performance caused by unoptimized assets, memory leaks, or unindexed database queries.',
      'Abandoned codebases with obsolete dependencies and unpatched security vulnerabilities.',
    ],
    proposedSolutions: [
      'Containerized environments using Docker to guarantee consistency between staging and production.',
      'Automated continuous integration and deployment (CI/CD) pipelines triggered directly on Git push.',
      'Systematic performance auditing, asset compression, and database query tuning.',
    ],
    capabilities: [
      'AWS deployment (S3, SES, IAM, Lambda, EC2)',
      'Docker containerization for consistent local and production environments',
      'CI/CD pipelines with automated GitHub Actions and Vercel workflows',
      'Existing application maintenance and legacy codebase refactoring',
      'Bug fixing, Core Web Vitals audits, and database query optimization',
    ],
    deliverables: [
      'Configured cloud hosting with custom domain and automatic SSL certificates',
      'Production Dockerfile and container orchestration configuration',
      'Automated GitHub Actions CI/CD deployment workflow',
      'Performance audit report with asset caching and database index tuning',
      'Uptime monitoring and error alert notifications setup',
    ],
    techStack: ['AWS (S3, SES, IAM, Lambda)', 'Docker', 'GitHub Actions', 'Vercel', 'Linux', 'Node.js', 'Postman'],
    relevantProjects: [
      {
        id: 'w3dev-cloud',
        title: 'W3 Dev Production Cloud Infrastructure',
        slug: 'ai-voice-fullstack-saas',
        tagline: 'Continuous deployment pipelines for full-stack SaaS apps with AWS S3 and database backups.',
        tech: ['AWS', 'Docker', 'Vercel', 'CI/CD'],
      },
      {
        id: 'edacleaner-build',
        title: 'edaCleaner Automated Multi-Platform CI/CD',
        slug: 'edacleaner-desktop-data-cleansing',
        tagline: 'Automated multi-platform desktop release builds compiled via Electron Builder.',
        tech: ['Electron Builder', 'TypeScript', 'Node.js'],
      },
    ],
    processSteps: [
      {
        title: '1. Infrastructure & Environment Audit',
        description: 'Review existing servers, hosting accounts, environment secrets, and current deployment bottlenecks.',
      },
      {
        title: '2. Dockerization & Pipeline Configuration',
        description: 'Create multi-stage Dockerfiles and write automated GitHub Actions workflows for automated testing and deployment.',
      },
      {
        title: '3. Cloud Hosting & SSL Provisioning',
        description: 'Deploy to AWS or Vercel, configure DNS records, enable SSL certificates, and set up database backups.',
      },
      {
        title: '4. Monitoring & Ongoing Maintenance',
        description: 'Configure uptime health checks, error logging alerts, and establish routine dependency patch schedules.',
      },
    ],
    faqs: [
      {
        question: 'Which cloud platforms do you support?',
        answer: 'I regularly deploy and configure applications on AWS (S3, SES, IAM, Lambda, EC2), Vercel, Railway, and digital cloud virtual private servers (VPS).',
      },
      {
        question: 'Can you help maintain and fix bugs in an existing application?',
        answer: 'Yes. I offer ongoing contractual retainers and maintenance packages to audit, patch, optimize, and upgrade existing codebases.',
      },
    ],
    engagementModels: [
      {
        name: 'DevOps & Deployment Sprint',
        description: 'Set up Docker, CI/CD pipelines, cloud servers, domain, and SSL configuration.',
        turnaround: '1 - 2 Weeks',
      },
      {
        name: 'Ongoing Maintenance Retainer',
        description: 'Dedicated monthly hours for security patches, bug fixes, performance monitoring, and updates.',
        turnaround: 'Flexible Monthly Commitment',
      },
    ],
  },
];
