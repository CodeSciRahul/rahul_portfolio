export interface ProjectScreenshot {
  title: string;
  caption: string;
  imagePath: string;
  type: 'brand-asset' | 'screenshot' | 'interface-mockup';
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectDraftField {
  label: string;
  status: 'Private Staging' | 'Client Confidential' | 'Pending Production Release';
  note: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  client?: string;
  category: 'Web' | 'Mobile' | 'Desktop' | 'E-commerce' | 'AI';
  subCategories?: string[];
  status: 'Production' | 'Live' | 'Featured Case Study';
  period: string;
  role: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  summary: string;
  projectObjectives: string[];
  roleAndResponsibilities: string[];
  problem: string;
  solution: string;
  keyFeatures: string[];
  technicalArchitecture: string[];
  techStack: string[];
  technicalChallengesAndSolutions: ProjectChallenge[];
  actualScreenshots: ProjectScreenshot[];
  desktopMockup?: {
    title: string;
    url: string;
    statusBadge: string;
    highlights: string[];
  };
  mobileMockup?: {
    appName: string;
    platform: string;
    highlights: string[];
  };
  verifiedOutcomes: string[];
  relatedServices: {
    title: string;
    slug: string;
  }[];
  links?: {
    github?: string;
    liveDemo?: string;
  };
  draftFields?: ProjectDraftField[];
}

export const projects: ProjectItem[] = [
  {
    id: 'nilescart',
    slug: 'nilescart-ecommerce-ecosystem',
    title: 'NilesCart — Modern Digital Commerce Ecosystem',
    tagline: 'High-performance web storefront and cross-platform native iOS & Android shopping applications',
    client: 'Aluma',
    category: 'E-commerce',
    subCategories: ['Web', 'Mobile', 'E-commerce'],
    status: 'Production',
    period: '2025',
    role: 'Lead Full-Stack & Mobile Engineer',
    featured: true,
    metrics: [
      { label: 'Platforms', value: 'Web & Native Mobile' },
      { label: 'Mobile Frame', value: '60 FPS Scrolling' },
      { label: 'Checkout', value: 'Deep-Linked Payment' },
    ],
    summary:
      'A complete multi-platform digital commerce solution for client Aluma, comprising a high-converting Next.js web storefront and native React Native (Expo) mobile shopping applications for both iOS and Android. Built with a unified backend API, real-time cart synchronization, faceted product discovery, and deep-linked mobile payment verification.',
    projectObjectives: [
      'Deliver an omnichannel digital commerce experience with feature parity across web browsers, iOS, and Android.',
      'Eliminate checkout drop-off by implementing a frictionless multi-step bag and payment callback flow.',
      'Ensure sub-100ms catalog navigation and buttery 60 FPS scrolling on mobile product feeds.',
      'Provide comprehensive store administration, address management, and seller store profiles.',
    ],
    roleAndResponsibilities: [
      'Architected the Next.js App Router web storefront with Server Components for optimal Core Web Vitals.',
      'Engineered the cross-platform React Native Expo mobile application supporting both iOS and Android platforms.',
      'Designed and integrated the centralized REST API data contracts shared between web and mobile clients.',
      'Implemented deep-linked mobile payment integration with mandatory server-side callback verification.',
      'Constructed the accessible component library using Radix UI primitives and Tailwind CSS.',
    ],
    problem:
      'Growing retail brands face fragmented customer journeys when web and mobile channels operate on disconnected backends. Customers experience stale cart states, slow product feeds, and clunky mobile checkout redirects that drastically lower mobile conversion rates.',
    solution:
      'Engineered a cohesive digital commerce platform powered by Next.js on the web and React Native on mobile, consuming a single central REST API. Employed TanStack Query caching for optimistic cart updates, Shopify FlashList on mobile for 60fps virtualization, and deep-linked payment callbacks verifying transactions server-side.',
    keyFeatures: [
      'Storefront & Merchandising: Curated collections, lookbook sections, promotional hero carousels, and banner campaigns.',
      'Product Discovery: Faceted category filtering, slug-based product routing, color/size variant selection, and live inventory badges.',
      'Shopping Bag & Checkout: Persistent synchronized cart, coupon code application, address book management, and order placement.',
      'Cross-Platform Mobile App: Native iOS and Android application built with React Native Expo, supporting pull-to-refresh and gestures.',
      'Customer & Seller Management: User profile editing, order history tracking, return status, and seller storefront profiles (/store/[slug]).',
      'Payment Verification: Deep-linked mobile payment callback session verifying transaction authenticity directly on the server.',
    ],
    technicalArchitecture: [
      'Unified REST API layer serving both Next.js web client and React Native Expo mobile clients.',
      'Client-side state management pairing TanStack React Query for cached server data and optimistic cart mutations.',
      'Mobile catalog virtualization utilizing Shopify FlashList to recycle cell views during rapid scrolling on iOS and Android.',
      'Deep-linking scheme (nilescart://) allowing external browser payment sessions to auto-close and return users to verified confirmation screens.',
    ],
    techStack: [
      'Next.js 16',
      'React 19',
      'React Native (Expo)',
      'TypeScript',
      'TanStack Query',
      'Tailwind CSS',
      'Radix UI',
      'Shopify FlashList',
      'Axios',
      'REST APIs',
    ],
    technicalChallengesAndSolutions: [
      {
        challenge: 'Preventing fraudulent or corrupted order states during mobile payment redirects.',
        solution:
          'Constructed a two-step payment verification architecture. After the mobile client opens the payment session via WebBrowser.openAuthSessionAsync, it deep-links back to /checkout/payment/callback and triggers a mandatory server-side verification request (GET /payments/verify) before confirming order fulfillment.',
      },
      {
        challenge: 'Maintaining 60 FPS mobile performance on catalog pages with hundreds of high-resolution product cards.',
        solution:
          'Replaced standard React Native FlatList with Shopify FlashList, leveraging native cell recycling and estimated item sizes to eliminate blank scroll frames on budget Android devices.',
      },
    ],
    actualScreenshots: [
      {
        title: 'NilesCart Official Brand Identity',
        caption: 'Production SVG vector brand mark and logotype designed for the multi-platform storefront.',
        imagePath: '/images/projects/nilescart/nilescart_full_dark.svg',
        type: 'brand-asset',
      },
      {
        title: 'NilesCart Monogram Mark',
        caption: 'Verified brand monogram used across native mobile app icons and favicons.',
        imagePath: '/images/projects/nilescart/nilescart_mark.png',
        type: 'brand-asset',
      },
      {
        title: 'Mobile App Icon Asset',
        caption: 'High-resolution application icon asset deployed to iOS and Android builds.',
        imagePath: '/images/projects/nilescart/nilescart_icon_light.png',
        type: 'brand-asset',
      },
    ],
    desktopMockup: {
      title: 'NilesCart Storefront Web Portal',
      url: 'https://nilescart.store/shop',
      statusBadge: 'Production Build • 200 OK',
      highlights: [
        'Responsive Next.js 16 App Router interface',
        'Instant search with category filtering',
        'Cart synchronization across browser tabs',
      ],
    },
    mobileMockup: {
      appName: 'NilesCart Mobile',
      platform: 'iOS & Android (Expo)',
      highlights: [
        'Shopify FlashList 60 FPS product grid',
        'Deep-linked payment verification callback',
        'Persistent cart synchronized with web account',
      ],
    },
    verifiedOutcomes: [
      'Unified web and mobile client codebases sharing 100% of REST API endpoint contracts.',
      'Achieved sub-100ms screen transitions on mobile via TanStack Query client caching.',
      'Successfully deployed mobile payment deep-linking with zero untrusted client confirmations.',
    ],
    relatedServices: [
      { title: 'E-commerce Development', slug: 'ecommerce-development' },
      { title: 'Custom Web Development', slug: 'custom-web-development' },
      { title: 'Mobile App Development', slug: 'mobile-app-development' },
    ],
    links: {
      github: 'https://github.com/codescirahul',
    },
    draftFields: [
      {
        label: 'Production Web Storefront URL',
        status: 'Private Staging',
        note: 'Live deployment URL is currently restricted to client Aluma internal review team pending commercial rollout.',
      },
      {
        label: 'App Store / Play Store Public Listing',
        status: 'Pending Production Release',
        note: 'Binary packages compiled (.aab for Google Play, .ipa for TestFlight); public store publishing scheduled upon client marketing campaign launch.',
      },
    ],
  },
  {
    id: 'edacleaner',
    slug: 'edacleaner-desktop-data-cleansing',
    title: 'edaCleaner — Desktop Data Processing & Analysis Application',
    tagline: 'Cross-platform desktop application for automated exploratory data analysis, dataset validation, and cleansing',
    client: 'Aluma',
    category: 'Desktop',
    subCategories: ['Desktop', 'Web'],
    status: 'Production',
    period: '2025',
    role: 'Desktop Application Architect',
    featured: true,
    metrics: [
      { label: 'Execution', value: '100% Local / Offline' },
      { label: 'Security', value: 'Sandboxed IPC Bridge' },
      { label: 'Platform', value: 'macOS, Windows, Linux' },
    ],
    summary:
      'A production-ready cross-platform desktop application engineered for client Aluma using Electron, React, TypeScript, and Vite. Designed to perform automated exploratory data analysis (EDA), statistical profiling, anomaly detection, storage analysis, and dataset cleansing locally on workstation hardware without sending confidential business data to external servers.',
    projectObjectives: [
      'Build an offline-first desktop tool capable of processing large tabular datasets without cloud transmission.',
      'Provide automated data health diagnostics: missing value detection, outlier filtering, and type consistency checks.',
      'Deliver real-time workstation resource monitoring: CPU live snapshots, startup apps, and background process impact.',
      'Implement a modular, sandboxed Electron architecture ensuring strict operating system security.',
    ],
    roleAndResponsibilities: [
      'Architected the Electron main process, preload IPC bridge, and React renderer separation.',
      'Implemented local data parsing and statistical profiling algorithms for tabular datasets.',
      'Engineered the reactive state management system utilizing Zustand for window state and TanStack Query for data streaming.',
      'Created the desktop user interface adhering to modern dark/light system aesthetics using Tailwind CSS.',
      'Configured multi-platform desktop packaging workflows via Electron Builder for macOS, Windows, and Linux.',
    ],
    problem:
      'Data analysts, engineers, and enterprise teams frequently handle sensitive proprietary datasets subject to strict confidentiality, GDPR, and trade-secret compliance rules. Uploading these files to web-based SaaS tools poses severe data leakage risks, while browser-based memory constraints crash when opening multi-megabyte files.',
    solution:
      'Architected edaCleaner as an offline-first desktop application with a strictly isolated two-tier structure. The React frontend interacts with operating system APIs exclusively through a context-isolated preload IPC bridge, allowing users to cleanse datasets and monitor system health entirely on local hardware.',
    keyFeatures: [
      'Smart Scan Diagnostics: Automated health evaluation identifying missing values, statistical anomalies, and storage waste.',
      'Storage & Data Hygiene: Categorized storage analysis detailing file duplicates, caches, and cleanup opportunities.',
      'System & Process Monitoring: Real-time CPU and memory load snapshots, startup application managers, and background process controls.',
      'Sandboxed IPC Bridge: Security model where renderer code never touches raw Node.js primitives directly.',
      'Multi-Platform Packaging: Automated installers generated for macOS (.dmg, .zip), Windows (.exe, .msi), and Linux (.AppImage, .deb).',
      'Reporting & Export: Clean dataset generation and diagnostic summary export formatted for downstream ML pipelines.',
    ],
    technicalArchitecture: [
      'Electron multi-process model: Main process handles native system APIs, file dialogs, and background workers.',
      'Preload layer (contextBridge) exposes strictly typed window.electron APIs with zero direct Node.js renderer exposure.',
      'React 19 renderer utilizing Zustand for client desktop state and TanStack React Query for asynchronous data operations.',
      'Electron Builder configuration with codesigning targets for Apple Silicon, Intel macOS, and Windows 64-bit systems.',
    ],
    techStack: [
      'Electron',
      'Electron Vite',
      'React',
      'TypeScript',
      'Zustand',
      'TanStack Query',
      'Tailwind CSS',
      'Electron Builder',
      'IPC Bridge',
    ],
    technicalChallengesAndSolutions: [
      {
        challenge: 'Preventing the desktop user interface from freezing during intensive statistical data processing.',
        solution:
          'Offloaded compute-heavy file parsing and anomaly calculations from the main UI thread to dedicated Electron main process workers, transmitting structured summary payloads across the IPC bridge to maintain a responsive 60 FPS UI.',
      },
      {
        challenge: 'Enforcing strict enterprise security without sacrificing access to native OS file pickers and dialogs.',
        solution:
          'Enabled contextIsolation and sandbox flags in the webPreferences configuration. All native file system requests (showOpenDialog, readFile) are executed in the main process and exposed to the renderer solely via ipcRenderer.invoke wrapper functions in preload.ts.',
      },
    ],
    actualScreenshots: [
      {
        title: 'edaCleaner Desktop Application Icon',
        caption: 'High-resolution application icon deployed in native desktop dock and taskbar packages.',
        imagePath: '/images/projects/edacleaner/icon.png',
        type: 'brand-asset',
      },
      {
        title: 'System Diagnostics & Onboarding Interface',
        caption: 'Verified desktop interface visual asset from the edaCleaner onboarding and readiness suite.',
        imagePath: '/images/projects/edacleaner/onboarding-ready.png',
        type: 'screenshot',
      },
      {
        title: 'Storage & Data Analysis Dashboard',
        caption: 'Verified desktop workspace graphic used in edaCleaner storage and dataset cleaning modules.',
        imagePath: '/images/projects/edacleaner/storage-hero-bg-dark.png',
        type: 'screenshot',
      },
      {
        title: 'Authentication & License Verification',
        caption: 'Verified desktop authentication and entitlement validation visual from the application codebase.',
        imagePath: '/images/projects/edacleaner/auth.png',
        type: 'screenshot',
      },
    ],
    desktopMockup: {
      title: 'edaCleaner — Desktop Data Processing Suite',
      url: 'electron://eda-cleaner.local/smart-scan',
      statusBadge: '100% Offline • Sandboxed IPC',
      highlights: [
        'Local dataset parsing with zero cloud transmission',
        'Smart Scan diagnostics and anomaly detection',
        'Cross-platform desktop packaging via Electron Builder',
      ],
    },
    verifiedOutcomes: [
      'Zero cloud dependency: 100% of dataset transformations and storage analytics execute locally.',
      'Achieved strict context isolation preventing arbitrary code execution vulnerabilities.',
      'Configured multi-platform build pipelines producing tested binaries for macOS and Windows.',
    ],
    relatedServices: [
      { title: 'Desktop Application Development', slug: 'desktop-application-development' },
      { title: 'Custom Web Development', slug: 'custom-web-development' },
      { title: 'Cloud Deployment and Maintenance', slug: 'cloud-deployment-maintenance' },
    ],
    links: {
      github: 'https://github.com/codescirahul',
    },
    draftFields: [
      {
        label: 'Commercial Desktop Installer Download',
        status: 'Client Confidential',
        note: 'Desktop distribution packages (.dmg / .exe) are distributed through client Aluma internal customer license portal.',
      },
      {
        label: 'Source Code Repository Access',
        status: 'Client Confidential',
        note: 'Source code is managed under private client repository under commercial non-disclosure agreement.',
      },
    ],
  },
  {
    id: 'convoo',
    slug: 'convoo-realtime-chat',
    title: 'Convoo — Cross-Platform Real-Time Chat Platform',
    tagline: 'Instant bidirectional messaging with persistent sessions across Web and Mobile',
    client: 'Independent Project',
    category: 'Web',
    subCategories: ['Web', 'Mobile'],
    status: 'Featured Case Study',
    period: '2025',
    role: 'Lead Architect & Full-Stack Developer',
    featured: true,
    metrics: [
      { label: 'Latency', value: '< 80ms' },
      { label: 'Platforms', value: 'Web & Mobile' },
      { label: 'Security', value: 'JWT Handshake' },
    ],
    summary:
      'A cross-platform real-time messaging application engineered with React.js, React Native, Express.js, MongoDB, and Socket.io. Features instant multi-device message delivery, JWT-secured WebSocket handshakes, and persistent chat sessions.',
    projectObjectives: [
      'Build a cohesive real-time messaging engine with synchronized state between desktop browsers and mobile devices.',
      'Eliminate expensive per-message vendor lock-in by designing a self-hosted Socket.io cluster.',
      'Enforce room-level data isolation and tokenized authentication on initial duplex connection handshake.',
    ],
    roleAndResponsibilities: [
      'Designed and deployed the Socket.io WebSocket cluster on Node.js and Express.',
      'Built matching web (React) and mobile (React Native) clients with shared TypeScript event interfaces.',
      'Optimized MongoDB indexes on conversation IDs and timestamps for sub-50ms message pagination.',
    ],
    problem:
      'Modern users expect seamless communication across desktop browsers and mobile devices. Delivering real-time chat with instantaneous state synchronization, room isolation, reliable offline message queueing, and secure authorization required an integrated architecture without relying on expensive third-party messaging vendors.',
    solution:
      'Designed and built a cohesive backend using Express and Socket.io that verifies JWT authentication directly during the WebSocket handshake. Engineered shared data contracts between the React web client and React Native mobile client to guarantee identical real-time behavior, typing indicators, and message history pagination.',
    keyFeatures: [
      'Instant real-time messaging with sub-80ms delivery confirmation',
      'Cross-platform synchronization between Web and Mobile clients',
      'Persistent chat history with cursor-based MongoDB pagination',
      'User presence detection (online, offline, last seen status)',
      'Room-based isolation for private one-on-one and group threads',
    ],
    technicalArchitecture: [
      'Socket.io cluster verifying JWT credentials on the initial handshake before establishing duplex connection pools.',
      'MongoDB schemas indexing conversation IDs and timestamps for sub-50ms message history retrieval.',
      'Shared data models between React web and React Native mobile clients for unified event payloads.',
    ],
    techStack: [
      'React.js',
      'React Native',
      'Express.js',
      'Node.js',
      'MongoDB',
      'Socket.io',
      'Tailwind CSS',
      'JWT Authentication',
    ],
    technicalChallengesAndSolutions: [
      {
        challenge: 'Handling spotty mobile network reconnections without dropping queued messages.',
        solution:
          'Implemented client-side message queueing with optimistic status flags and an exponential backoff reconnection listener that reconciles message acknowledgments upon socket re-establishment.',
      },
    ],
    actualScreenshots: [],
    desktopMockup: {
      title: 'Convoo Live Messenger Client',
      url: 'wss://socket.convoo.app/channels/dev-chat',
      statusBadge: 'Connected • 38ms',
      highlights: [
        'Duplex event streaming with sub-80ms sync',
        'JWT token handshake authentication',
        'Room-based conversation partition',
      ],
    },
    verifiedOutcomes: [
      'Demonstrated cross-platform real-time synchronization between web and mobile clients.',
      'Sub-80ms message delivery verified across live WebSocket duplex connection pools.',
    ],
    relatedServices: [
      { title: 'Backend and API Development', slug: 'backend-api-development' },
      { title: 'Custom Web Development', slug: 'custom-web-development' },
      { title: 'Mobile App Development', slug: 'mobile-app-development' },
    ],
    links: {
      github: 'https://github.com/codescirahul',
    },
  },
  {
    id: 'dwive',
    slug: 'dwive-mobility-booking-platform',
    title: 'Dwive — Travel & Mobility Booking Platform',
    tagline: 'Cross-platform mobile mobility platform with live bus tracking and multi-modal bookings',
    client: 'Spirehubs (Client Project)',
    category: 'Mobile',
    subCategories: ['Mobile'],
    status: 'Production',
    period: '2026',
    role: 'Jr. React Native Developer (Spirehubs)',
    featured: true,
    metrics: [
      { label: 'Tracking', value: 'Live Telemetry' },
      { label: 'Booking Types', value: 'Rides, Buses, Flights' },
      { label: 'Platform', value: 'iOS & Android' },
    ],
    summary:
      'A comprehensive travel and mobility application engineered in React Native for discovering and booking rides, buses, and flights. Developed critical user-facing workflows including live bus tracking and multi-modal travel discovery.',
    projectObjectives: [
      'Create a fluid, cross-platform travel booking workflow for rides, buses, and commercial flights.',
      'Implement real-time bus tracking with route visualization on mobile maps without excessive battery drain.',
      'Standardize responsive UI components across varying Android and iOS hardware profiles.',
    ],
    roleAndResponsibilities: [
      'Developed and maintained core React Native screens for trip discovery, vehicle selection, and seat booking.',
      'Integrated live geo-tracking APIs and smoothed GPS coordinate telemetry on map interfaces.',
      'Collaborated within an Agile engineering team through daily standups, code reviews, and Postman API validations.',
    ],
    problem:
      'Travelers frequently face fragmented booking systems and unreliable transit information. The challenge was to deliver a responsive, intuitive mobile application that smoothly integrates different travel modalities (rides, buses, flights) while displaying real-time vehicle movement on map interfaces without draining device battery.',
    solution:
      'Contributed to the React Native codebase focusing on high-performance map rendering, location telemetry synchronization, and intuitive booking checkout flows. Standardized component architectures to ensure frictionless performance across varying Android and iOS hardware configurations.',
    keyFeatures: [
      'Multi-modal booking discovery for rides, long-distance buses, and commercial flights',
      'Live bus tracking with real-time route visualization and ETA calculation',
      'Interactive seat selection and passenger detail management',
      'Digital boarding pass and booking history storage',
    ],
    technicalArchitecture: [
      'Battery-efficient geo-location polling and telemetry smoothing for real-time bus tracking on mobile maps.',
      'Modular screen components with state preservation across complex multi-step reservation flows.',
      'Extensive REST API integration tested and validated with Postman for rock-solid error recovery.',
    ],
    techStack: [
      'React Native',
      'JavaScript',
      'TypeScript',
      'REST APIs',
      'Geo-Location',
      'State Management',
      'Postman',
    ],
    technicalChallengesAndSolutions: [
      {
        challenge: 'Smoothing live GPS coordinates on map overlays without jitter or device overheating.',
        solution:
          'Applied coordinate interpolation and dead-reckoning algorithms to render smooth vehicle movement between intermittent telemetry packets.',
      },
    ],
    actualScreenshots: [],
    mobileMockup: {
      appName: 'Dwive Mobility',
      platform: 'React Native (iOS & Android)',
      highlights: [
        'Live GPS telemetry tracking with ETA',
        'Multi-modal booking for rides, buses, and flights',
        'Interactive seat reservation and digital passes',
      ],
    },
    verifiedOutcomes: [
      'Shipped real-time bus tracking interface in production React Native mobile app.',
      'Integrated multi-modal travel discovery workflows validated through Postman test collections.',
    ],
    relatedServices: [
      { title: 'Mobile App Development', slug: 'mobile-app-development' },
      { title: 'Backend and API Development', slug: 'backend-api-development' },
    ],
    links: {
      github: 'https://github.com/codescirahul',
    },
  },
  {
    id: 'pwev',
    slug: 'pwev-learning-community-platform',
    title: 'Pwev — Learning, Mentorship & Freelance Platform',
    tagline: 'Professional development ecosystem combining course assessments, mentoring, and freelance job discovery',
    client: 'Spirehubs (Client Project)',
    category: 'Mobile',
    subCategories: ['Mobile', 'Web'],
    status: 'Production',
    period: '2026',
    role: 'Jr. React Native Developer (Spirehubs)',
    featured: true,
    metrics: [
      { label: 'Ecosystem', value: 'Learn + Work' },
      { label: 'Features', value: 'Assessments & Jobs' },
      { label: 'Community', value: 'Peer Feeds' },
    ],
    summary:
      'A multifaceted professional development and learning platform where learners can access courses, connect with mentors, take interactive assessments, discover freelance opportunities, and participate in a vibrant professional community.',
    projectObjectives: [
      'Build an integrated mobile platform bridging structured technical assessments with professional mentor consultations.',
      'Create an interactive freelance job discovery board with proposal submissions.',
      'Ensure 60 FPS community discussion feed scrolling on mobile devices.',
    ],
    roleAndResponsibilities: [
      'Engineered interactive course assessment modules with client-side timers and automated score validation.',
      'Implemented community discussion feeds utilizing optimized list virtualization.',
      'Collaborated on RESTful API consumption and state management in React Native.',
    ],
    problem:
      'Learners typically study in isolation without direct pathways to professional mentors or real-world freelance projects. Pwev required an all-in-one mobile experience that seamlessly unites structured course assessments, mentor chats, freelance engagement listings, and a community feed.',
    solution:
      'Built core user workflows for course consumption, interactive quiz/assessment engines, and community interaction. Implemented clean state management ensuring users can transition between learning modules and freelance job boards effortlessly.',
    keyFeatures: [
      'Course video and lesson progression tracking',
      'Skill assessment modules with automated scoring and feedback',
      'Mentor matching and consultation scheduling interface',
      'Freelance job discovery and direct project inquiry',
      'Community feed for knowledge sharing and peer discussions',
    ],
    technicalArchitecture: [
      'Multi-question assessment engine with timer countdowns and client-side score computation.',
      'Virtual list rendering for community discussion feeds ensuring smooth 60fps scrolling.',
      'Freelance project discovery interface with tag filtering, search, and proposal workflows.',
    ],
    techStack: [
      'React Native',
      'TypeScript',
      'RESTful APIs',
      'Redux / Zustand',
      'Mobile UI/UX',
    ],
    technicalChallengesAndSolutions: [
      {
        challenge: 'Preventing state loss if a user accidentally navigates away during a timed assessment.',
        solution:
          'Implemented persistent client-side session caching with automatic timestamp recovery so users can resume assessments seamlessly.',
      },
    ],
    actualScreenshots: [],
    desktopMockup: {
      title: 'Pwev Learning Portal',
      url: 'https://app.pwev.org/assessment',
      statusBadge: 'Active Cohort • Production',
      highlights: [
        'Interactive assessment progression with live timer',
        'Mentor code review feedback integration',
        'Freelance job discovery and verified bids',
      ],
    },
    verifiedOutcomes: [
      'Delivered interactive assessment engine and mentor consultation workflows in production.',
      'Constructed virtualized community feeds supporting fast media preview scrolling.',
    ],
    relatedServices: [
      { title: 'Mobile App Development', slug: 'mobile-app-development' },
      { title: 'Custom Web Development', slug: 'custom-web-development' },
    ],
    links: {
      github: 'https://github.com/codescirahul',
    },
  },
  {
    id: 'w3dev-ai-saas',
    slug: 'ai-voice-fullstack-saas',
    title: 'AI Voice Communication & Full-Stack SaaS Platforms',
    tagline: 'Production full-stack web applications featuring 25+ REST APIs, Stripe billing, and Twilio/OpenAI voice AI',
    client: 'W3 Dev (Client Project)',
    category: 'AI',
    subCategories: ['AI', 'Web'],
    status: 'Production',
    period: '2025',
    role: 'Full Stack Developer Intern (W3 Dev)',
    featured: true,
    metrics: [
      { label: 'REST APIs', value: '25+ Built' },
      { label: 'Payments', value: 'Stripe Gateway' },
      { label: 'Voice AI', value: 'Twilio + OpenAI' },
    ],
    summary:
      'Engineered and maintained two production full-stack web applications at W3 Dev. Implemented 25+ RESTful APIs, end-to-end Stripe subscription payment integration, and an innovative AI-powered voice communication pipeline combining Twilio SDK, OpenAI APIs, Speech-to-Text (STT), and Text-to-Speech (TTS).',
    projectObjectives: [
      'Design, build, and deploy 25+ secure RESTful endpoints adhering strictly to MVC architecture.',
      'Integrate Stripe Payment Gateway for recurring subscriptions, billing portals, and idempotent webhook listeners.',
      'Construct a real-time telephone voice agent connecting live phone calls to OpenAI speech models with sub-second turnaround.',
    ],
    roleAndResponsibilities: [
      'Designed and deployed 25+ RESTful endpoints handling authentication, user accounts, and billing.',
      'Configured cryptographic Stripe webhook validation preventing double-billing on recurring payments.',
      'Architected the bidirectional voice streaming pipeline bridging Twilio Media Streams to OpenAI LLM inference.',
      'Collaborated within an Agile engineering team through code reviews, Postman validations, and CI/CD releases.',
    ],
    problem:
      'The client needed production-ready SaaS platforms capable of processing recurring customer payments securely and conducting automated, intelligent voice phone interactions to reduce support overhead and qualify inbound leads.',
    solution:
      'Designed a resilient architecture in Next.js and Express. Deployed Stripe Payment Gateway for subscription lifecycle handling with webhook listeners. Connected Twilio voice streams to OpenAI speech recognition, language models, and text-to-speech audio outputs for real-time voice conversations.',
    keyFeatures: [
      'Production subscription management with customer billing portal and recurring checkout',
      'AI voice agent capable of handling live telephone conversations via Twilio & OpenAI',
      'Automated speech-to-text transcription and structured LLM response generation',
      'Role-based access control (RBAC) and JWT-secured admin dashboards',
      'Centralized REST API documentation and Postman collections for 25+ endpoints',
    ],
    technicalArchitecture: [
      'Automated Stripe webhook processing with cryptographic HMAC verification and idempotency keys to prevent double-billing.',
      'Low-latency voice pipeline chaining Twilio Media Streams with OpenAI speech models for fluid dialogue.',
      'Built 25+ modular REST endpoints adhering strictly to MVC architecture with centralized validation.',
      'High-performance data fetching and client caching utilizing TanStack Query for instant UI updates.',
    ],
    techStack: [
      'Next.js',
      'React.js',
      'Express.js',
      'MongoDB',
      'TanStack Query',
      'Tailwind CSS',
      'Stripe Payment Gateway',
      'Twilio SDK',
      'OpenAI API (STT/TTS/LLM)',
      'Postman',
    ],
    technicalChallengesAndSolutions: [
      {
        challenge: 'Maintaining natural conversational cadence during live telephone voice interactions.',
        solution:
          'Utilized audio packet streaming so that text-to-speech synthesis begins playing over the Twilio call before the complete LLM response finishes generating, reducing turnaround latency to under 700ms.',
      },
      {
        challenge: 'Protecting recurring billing from duplicate charges when Stripe retries webhook delivery.',
        solution:
          'Implemented database-level idempotency checking against Stripe event IDs before triggering any account provisioning or fulfillment logic.',
      },
    ],
    actualScreenshots: [],
    desktopMockup: {
      title: 'W3 Dev Full-Stack SaaS & Voice AI Dashboard',
      url: 'https://saas.w3dev.io/dashboard/billing',
      statusBadge: 'Production Live • 200 OK',
      highlights: [
        '25+ RESTful APIs with centralized validation',
        'Stripe customer billing portal & webhook idempotency',
        'Twilio + OpenAI real-time voice streaming pipeline',
      ],
    },
    verifiedOutcomes: [
      'Designed and deployed 25+ production RESTful APIs in an Agile team of 6+ engineers.',
      'Successfully handled Stripe subscription checkouts and automated webhook verification in production.',
      'Engineered live telephone voice pipeline achieving sub-second audio turnarounds.',
    ],
    relatedServices: [
      { title: 'AI Agent Development', slug: 'ai-agent-development' },
      { title: 'Backend and API Development', slug: 'backend-api-development' },
      { title: 'Custom Web Development', slug: 'custom-web-development' },
    ],
    links: {
      github: 'https://github.com/codescirahul',
    },
  },
];
