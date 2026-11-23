import { Track, Session, Speaker, Codelab, HackathonTrack, Sponsor, JobListing, VenueZone, TriviaQuestion } from '../types';

export const TRACKS: Track[] = [
  {
    id: 'ai',
    name: 'Autonomous AI & Multi-Agent Systems',
    shortName: 'AI & Agents',
    color: '#34A853',
    gradient: 'from-emerald-500 to-teal-400',
    borderClass: '',
    bgGlow: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    badgeClass: 'bg-emerald-500/15 text-emerald-300',
    lead: 'Dr. Kavya Krishnan (GDE Machine Learning)',
    hall: 'Hall A // Neural Arena',
    description: 'Architect stateful agent loops, deterministic eval harnesses, multimodal RAG pipelines, and tool-calling sandboxes.',
    topics: ['Gemini 2.5 Agents', 'Stateful Graph Workflows', 'Sandbox Code Execution', 'Deterministic Evals', 'Vector + Graph RAG'],
    distribution: { beginner: 25, intermediate: 45, advanced: 30 }
  },
  {
    id: 'cloud',
    name: 'Cloud Native, Kubernetes & Edge Infra',
    shortName: 'Cloud & Infra',
    color: '#4285F4',
    gradient: 'from-blue-500 to-indigo-500',
    borderClass: '',
    bgGlow: 'from-blue-500/20 via-blue-500/5 to-transparent',
    badgeClass: 'bg-blue-500/15 text-blue-300',
    lead: 'Arjun Mehta (Principal Cloud Architect)',
    hall: 'Hall B // Borg Theater',
    description: 'Scale zero-downtime distributed clusters, serverless GPU inference, eBPF observability, and automated FinOps.',
    topics: ['GKE Autopilot', 'Serverless vLLM', 'OpenTelemetry + eBPF', 'Multi-Region Mesh', 'Zero-Trust IAM'],
    distribution: { beginner: 20, intermediate: 50, advanced: 30 }
  },
  {
    id: 'web',
    name: 'Modern Web, Glass UI & Local-First Apps',
    shortName: 'Web & Glass UI',
    color: '#FBBC05',
    gradient: 'from-amber-500 to-yellow-400',
    borderClass: '',
    bgGlow: 'from-amber-500/20 via-amber-500/5 to-transparent',
    badgeClass: 'bg-amber-500/15 text-amber-300',
    lead: 'Riya Sharma (Staff Design Systems Eng)',
    hall: 'Hall C // Chromium Studio',
    description: 'Craft 60fps glassmorphic token architectures, React 19 concurrent UIs, WebGPU shaders, and sync engines.',
    topics: ['React 19 Server Actions', 'WebGPU Shaders', 'Neon-Glass Design Tokens', 'CRDT Sync Engines', 'Core Web Vitals'],
    distribution: { beginner: 35, intermediate: 45, advanced: 20 }
  },
  {
    id: 'systems',
    name: 'Systems Engineering, Rust & Autonomous DX',
    shortName: 'Systems & DX',
    color: '#EA4335',
    gradient: 'from-rose-500 to-red-500',
    borderClass: '',
    bgGlow: 'from-rose-500/20 via-rose-500/5 to-transparent',
    badgeClass: 'bg-rose-500/15 text-rose-300',
    lead: 'Vikramaditya Rao (Core Systems Maintainer)',
    hall: 'Hall D // Kernel Foundry',
    description: 'Build ultra-low-latency compilers, stateful bug-to-test synthesizers, WebAssembly runtimes, and pre-commit verifiers.',
    topics: ['Rust + Wasmtime', 'Bug-to-Test Synthesis', 'AST Codemods', 'Autonomous CI Loops', 'Memory-Safe Concurrency'],
    distribution: { beginner: 15, intermediate: 40, advanced: 45 }
  }
];

export const SPEAKERS: Speaker[] = [
  {
    id: 'spk-1',
    name: 'Dr. Kavya Krishnan',
    role: 'Principal AI Scientist & GDE',
    company: 'DeepMind Ecosystem',
    track: 'ai',
    badge: 'GDE AI/ML',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    initials: 'KK',
    bio: 'Leads research on deterministic multi-agent orchestration and automated code synthesis loops for enterprise workspaces. Key contributor to open-source agent frameworks.',
    tags: ['Multi-Agent Systems', 'Gemini API', 'Neuro-Symbolic AI'],
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    gde: true
  },
  {
    id: 'spk-2',
    name: 'Siddharth Verma',
    role: 'Staff Autonomous Systems Architect',
    company: 'Vyron Labs',
    track: 'systems',
    badge: 'Keynote Speaker',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    initials: 'SV',
    bio: 'Creator of stateful bug-to-test reproduction pipelines and zero-drift autonomous engineering loops. Author of popular developer testing tools.',
    tags: ['Stateful Triage', 'Playwright Synthesis', 'AST Verification'],
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    gde: false
  },
  {
    id: 'spk-3',
    name: 'Arjun Mehta',
    role: 'Distinguished Cloud Engineer',
    company: 'Google Cloud Platform',
    track: 'cloud',
    badge: 'Googler',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    initials: 'AM',
    bio: 'Architects high-density Kubernetes clusters serving 40M+ daily active inference requests across APAC regions. Active contributor to Kubernetes SIG-Node.',
    tags: ['Kubernetes', 'eBPF', 'TPU/GPU Scheduling'],
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    gde: true
  },
  {
    id: 'spk-4',
    name: 'Riya Sharma',
    role: 'Design Systems & WebGPU Lead',
    company: 'PixelGlass Studio',
    track: 'web',
    badge: 'GDE Web',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    initials: 'RS',
    bio: 'Specializes in multi-layered glassmorphic design token systems, hardware-accelerated CSS, and accessible command interfaces with zero layout shift.',
    tags: ['Design Tokens', 'React 19', 'WebGPU'],
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    gde: true
  },
  {
    id: 'spk-5',
    name: 'Nandini Natarajan',
    role: 'VP of Infrastructure',
    company: 'ScaleMesh',
    track: 'cloud',
    badge: 'CNCF Ambassador',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    initials: 'NN',
    bio: 'Pioneered multi-cloud service mesh topologies and automated chaos engineering pipelines for high-throughput fintech platforms.',
    tags: ['Service Mesh', 'Chaos Eng', 'FinOps'],
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    gde: false
  },
  {
    id: 'spk-6',
    name: 'Rohan Deshmukh',
    role: 'Core Maintainer & Compiler Eng',
    company: 'OxideForge',
    track: 'systems',
    badge: 'OSS Maintainer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    initials: 'RD',
    bio: 'Builds sub-millisecond Rust static analyzers and WebAssembly plugin sandboxes for modern IDEs and developer command palettes.',
    tags: ['Rust', 'WebAssembly', 'Compilers'],
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    gde: false
  },
  {
    id: 'spk-7',
    name: 'Ananya Iyer',
    role: 'Lead Applied AI Engineer',
    company: 'AgenticStack',
    track: 'ai',
    badge: 'GDE Cloud & AI',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    initials: 'AI',
    bio: 'Focuses on real-time voice/vision multimodal agents, context caching strategies, and low-latency function calling protocols.',
    tags: ['Multimodal RAG', 'Context Caching', 'Eval Harnesses'],
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    gde: true
  },
  {
    id: 'spk-8',
    name: 'Karthik Subramanian',
    role: 'Principal Frontend Architect',
    company: 'HyperCanvas',
    track: 'web',
    badge: 'Web Perf Expert',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    initials: 'KS',
    bio: 'Engineered local-first collaborative canvas engines handling 100,000+ DOM/Canvas nodes at a locked 120Hz refresh rate.',
    tags: ['Local-First CRDTs', 'HTML5 Canvas', 'OffscreenCanvas'],
    github: 'https://github.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    gde: false
  }
];

export const SESSIONS: Session[] = [
  {
    id: 'ses-101',
    title: 'Opening Keynote: Cognitive Engineering & The Autonomous Builder Era',
    day: 1,
    startTime: '09:30',
    endTime: '10:30',
    slotId: 'd1-s1',
    track: 'ai',
    format: 'Keynote',
    level: '100 - Beginner',
    room: 'Main Arena // Grand Ballroom',
    speakerIds: ['spk-1', 'spk-2'],
    abstract: 'Explore how multi-layered AI workspaces, deterministic verification loops, and Gemini 2.5 agentic architectures are transforming single developers into full-scale engineering teams.',
    takeaways: [
      'Structuring tri-agent architectures (Planner, Synthesizer, Verifier)',
      'Eliminating hallucination drift with live localhost & AST assertions',
      'Designing 100-layer modular SaaS stacks with autonomous guardrails'
    ],
    prerequisites: ['Open to all builders, architects, and technical leaders'],
    slideUrl: 'https://devfest.gdgchennai.com/slides/keynote',
    repoUrl: 'https://github.com/aigeeks-devfest/keynote-autonomous-era',
    capacityPct: 94,
    isLive: true
  },
  {
    id: 'ses-102',
    title: 'Stateful Bug-to-Test Synthesis: Turning Issue Reports into Executable Specs',
    day: 1,
    startTime: '10:45',
    endTime: '11:30',
    slotId: 'd1-s2',
    track: 'systems',
    format: 'Deep Dive',
    level: '300 - Advanced',
    room: 'Hall D // Kernel Foundry',
    speakerIds: ['spk-2'],
    abstract: 'Learn how to build an automated triage pipeline that ingests natural-language bug reports, reconstructs DOM/network state in an isolated sandbox, and synthesizes deterministic Playwright & Vitest reproduction scripts.',
    takeaways: [
      'DOM snapshot serialization and deterministic state hydration',
      'Sandboxed headless browser execution with zero flaky timers',
      'Automated fault localization using stack-trace + AST mapping'
    ],
    prerequisites: ['TypeScript', 'Playwright or Vitest basics', 'AST fundamentals'],
    slideUrl: 'https://devfest.gdgchennai.com/slides/reprostate',
    repoUrl: 'https://github.com/aigeeks-devfest/reprostate-synthesizer',
    capacityPct: 88
  },
  {
    id: 'ses-103',
    title: 'Scaling Serverless GPU Inference on GKE with Zero Cold-Start',
    day: 1,
    startTime: '10:45',
    endTime: '11:30',
    slotId: 'd1-s2',
    track: 'cloud',
    format: 'Deep Dive',
    level: '200 - Intermediate',
    room: 'Hall B // Borg Theater',
    speakerIds: ['spk-3'],
    abstract: 'Runs parallel to Slot D1-S2. Discover how to cut LLM serving costs by 62% using dynamic KV-cache snapshotting, GKE node auto-provisioning, and custom Envoy load balancing.',
    takeaways: [
      'Pre-warming container layers for 14B+ parameter weights',
      'Token-aware routing and backpressure shedding',
      'Real-time Prometheus + eBPF GPU telemetry'
    ],
    prerequisites: ['Docker & Kubernetes fundamentals'],
    slideUrl: 'https://devfest.gdgchennai.com/slides/gke-gpu',
    repoUrl: 'https://github.com/aigeeks-devfest/gke-gpu-inference',
    capacityPct: 79
  },
  {
    id: 'ses-104',
    title: 'Architecting Neon-Glass Design Systems with Zero Runtime Overhead',
    day: 1,
    startTime: '11:45',
    endTime: '12:30',
    slotId: 'd1-s3',
    track: 'web',
    format: 'Deep Dive',
    level: '200 - Intermediate',
    room: 'Hall C // Chromium Studio',
    speakerIds: ['spk-4'],
    abstract: 'A practical breakdown of building multi-theme glassmorphic token pipelines in Tailwind CSS—balancing specular borders, backdrop-filter GPU budgets, and WCAG AA contrast compliance.',
    takeaways: [
      'Extracting semantic CSS custom variables from color palettes',
      'Avoiding compositor layer explosion on mobile viewports',
      'Automated contrast verification in pre-commit hooks'
    ],
    prerequisites: ['CSS Grid/Flexbox', 'Tailwind CSS', 'React'],
    slideUrl: 'https://devfest.gdgchennai.com/slides/neon-glass',
    repoUrl: 'https://github.com/aigeeks-devfest/neon-glass-tokens',
    capacityPct: 91
  },
  {
    id: 'ses-105',
    title: 'Multimodal RAG & Context Caching: Sub-300ms Enterprise Memory',
    day: 1,
    startTime: '11:45',
    endTime: '12:30',
    slotId: 'd1-s3',
    track: 'ai',
    format: 'Deep Dive',
    level: '200 - Intermediate',
    room: 'Hall A // Neural Arena',
    speakerIds: ['spk-7'],
    abstract: 'Combine hybrid dense/sparse vector retrieval with Gemini Context Caching to query million-token technical repositories, architecture diagrams, and live telemetry logs.',
    takeaways: [
      'Chunking AST trees instead of naive character windows',
      'Invalidating cached context prefixes incrementally',
      'Benchmarking precision@K with synthetic golden datasets'
    ],
    prerequisites: ['Python or TypeScript', 'Vector DB basics'],
    slideUrl: 'https://devfest.gdgchennai.com/slides/multimodal-rag',
    repoUrl: 'https://github.com/aigeeks-devfest/multimodal-ast-rag',
    capacityPct: 84
  },
  {
    id: 'ses-106',
    title: 'Lightning Round: 5 Production Post-Mortems in 25 Minutes',
    day: 1,
    startTime: '14:00',
    endTime: '14:45',
    slotId: 'd1-s4',
    track: 'cloud',
    format: 'Lightning',
    level: '100 - Beginner',
    room: 'Main Arena // Grand Ballroom',
    speakerIds: ['spk-5', 'spk-6'],
    abstract: 'Fast-paced war stories covering BGP route leaks, runaway recursive agent loops, DNS TTL pitfalls, and how automated circuit breakers saved Friday deployments.',
    takeaways: [
      'Setting hard token and recursion budgets on autonomous agents',
      'Why staging environments miss connection pool exhaustion',
      'Instant rollback playbooks every engineer needs'
    ],
    prerequisites: ['None — high energy & practical lessons'],
    slideUrl: 'https://devfest.gdgchennai.com/slides/post-mortems',
    repoUrl: 'https://github.com/aigeeks-devfest/chaos-playbooks',
    capacityPct: 72
  },
  {
    id: 'ses-201',
    title: 'Day 2 Codelab: Building a Tri-Agent Code Reviewer & Auto-Fixer',
    day: 2,
    startTime: '10:00',
    endTime: '12:00',
    slotId: 'd2-s1',
    track: 'ai',
    format: 'Codelab',
    level: '200 - Intermediate',
    room: 'Lab Zone 1 // Builder Sandbox',
    speakerIds: ['spk-1', 'spk-7'],
    abstract: 'Hands-on 2-hour workshop where you will wire a complete Git diff analyzer, security rule verifier, and automated patch synthesizer with live test validation.',
    takeaways: [
      'Parsing unified git diffs into structured AST context',
      'Running isolated verification loops before proposing PR comments',
      'Shipping a working CLI + GitHub Action by the end of the session'
    ],
    prerequisites: ['Laptop with Node.js 20+ and Git installed'],
    slideUrl: 'https://devfest.gdgchennai.com/slides/tri-agent-lab',
    repoUrl: 'https://github.com/aigeeks-devfest/tri-agent-reviewer-lab',
    capacityPct: 96
  },
  {
    id: 'ses-202',
    title: 'Local-First Canvas Engines at 120fps with OffscreenCanvas & CRDTs',
    day: 2,
    startTime: '10:00',
    endTime: '11:30',
    slotId: 'd2-s1',
    track: 'web',
    format: 'Codelab',
    level: '300 - Advanced',
    room: 'Hall C // Chromium Studio',
    speakerIds: ['spk-8'],
    abstract: 'Build a collaborative infinite whiteboard and architecture diagramming tool using Web Workers, spatial R-tree indexing, and conflict-free replicated data types.',
    takeaways: [
      'Viewport culling with 2D spatial bounding boxes',
      'Zero-latency cursor presence and delta compression',
      'IndexedDB persistence for instant offline recovery'
    ],
    prerequisites: ['TypeScript', 'HTML5 Canvas basics'],
    slideUrl: 'https://devfest.gdgchennai.com/slides/canvas-crdts',
    repoUrl: 'https://github.com/aigeeks-devfest/infinite-canvas-crdt',
    capacityPct: 81
  },
  {
    id: 'ses-203',
    title: 'Writing Ultra-Fast Repo Verifiers & Pre-Commit Guards in Rust + Node',
    day: 2,
    startTime: '13:30',
    endTime: '14:30',
    slotId: 'd2-s2',
    track: 'systems',
    format: 'Deep Dive',
    level: '200 - Intermediate',
    room: 'Hall D // Kernel Foundry',
    speakerIds: ['spk-6', 'spk-2'],
    abstract: 'Eliminate broken documentation, invalid SVG assets, and unverified Mermaid diagrams before code ever leaves a developer workstation.',
    takeaways: [
      'Combining fast Node `.mjs` verifiers with Rust N-API bindings',
      'Automated README structural validation and badge telemetry',
      'Zero-friction Git hook wiring across monorepos'
    ],
    prerequisites: ['JavaScript/TypeScript or Rust basics'],
    slideUrl: 'https://devfest.gdgchennai.com/slides/repo-verifiers',
    repoUrl: 'https://github.com/aigeeks-devfest/verify-readme-engine',
    capacityPct: 76
  }
];

export const CODELABS: Codelab[] = [
  {
    id: 'lab-1',
    title: 'Stateful Bug-to-Test Synthesizer (ReproState Sandbox)',
    track: 'systems',
    instructor: 'Siddharth Verma',
    duration: '120 mins',
    room: 'Sandbox Room A',
    seatsLeft: 4,
    totalSeats: 60,
    cloneCmd: 'git clone https://github.com/aigeeks-devfest/lab-reprostate.git && cd lab-reprostate && npm i',
    prereqs: ['Node.js v20+', 'Playwright Chromium installed', 'API Key provided at desk'],
    steps: ['1. Ingest Issue Payload & Trace', '2. Hydrate Isolated DOM State', '3. Synthesize & Execute Spec']
  },
  {
    id: 'lab-2',
    title: 'Multi-Agent Orchestration with Deterministic Eval Harnesses',
    track: 'ai',
    instructor: 'Dr. Kavya Krishnan & Ananya Iyer',
    duration: '90 mins',
    room: 'Sandbox Room B',
    seatsLeft: 7,
    totalSeats: 80,
    cloneCmd: 'git clone https://github.com/aigeeks-devfest/lab-agent-evals.git && cd lab-agent-evals && npm i',
    prereqs: ['TypeScript / Python 3.11+', 'Docker Desktop optional'],
    steps: ['1. Wire Planner + Executor Graph', '2. Attach Sandbox Tool Callers', '3. Run 50-Case Golden Benchmark']
  },
  {
    id: 'lab-3',
    title: 'Neon-Glass UI Token Generator & Interactive Theme Studio',
    track: 'web',
    instructor: 'Riya Sharma',
    duration: '90 mins',
    room: 'Sandbox Room C',
    seatsLeft: 11,
    totalSeats: 60,
    cloneCmd: 'git clone https://github.com/aigeeks-devfest/lab-glass-tokens.git && cd lab-glass-tokens && npm i',
    prereqs: ['React 19 + Tailwind CSS', 'Modern Chromium Browser'],
    steps: ['1. Extract Palette Luminance Curves', '2. Compile CSS Custom Variables', '3. Wire Live Glass Previewer']
  }
];

export const HACKATHON_TRACKS: HackathonTrack[] = [
  {
    id: 'hack-1',
    code: 'TRACK 01 // DEVTOOLS',
    title: 'Autonomous Debugging, Triage & Test Synthesis',
    prize: '₹1,50,000 + Cloud Credits',
    prompt: 'Build a software-only developer tool that converts unstructured bug reports, logs, or stack traces into reproducible tests and verified patches.',
    stack: ['Playwright', 'Vitest', 'AST Parser', 'LLM Agents']
  },
  {
    id: 'hack-2',
    code: 'TRACK 02 // AI WORKSPACES',
    title: 'Cognitive Engineering & Multi-Layered SaaS Copilots',
    prize: '₹1,25,000 + GDE Mentorship',
    prompt: 'Create a next-generation collaborative workspace that unifies architecture diagramming, live code execution, and autonomous verification.',
    stack: ['React 19', 'WebSockets/CRDT', 'Gemini API', 'Mermaid/Canvas']
  },
  {
    id: 'hack-3',
    code: 'TRACK 03 // CLOUD & FINOPS',
    title: 'Self-Healing Infrastructure & Telemetry Radar',
    prize: '₹1,00,000 + Swag Box',
    prompt: 'Design an observability or anomaly-detection engine that predicts latency spikes and synthesizes safe remediation policies.',
    stack: ['OpenTelemetry', 'Kubernetes', 'Go / Rust', 'Time-Series UI']
  }
];

export const SPONSORS: Sponsor[] = [
  {
    id: 'sp-1',
    name: 'Google for Developers',
    tier: 'Title',
    tagline: 'Build with Gemini, Cloud, Angular, Flutter & Chrome.',
    track: 'ai',
    promoCode: 'DEVFEST26-GCP-500',
    creditOffer: '$500 Google Cloud & Vertex AI Trial Credits',
    docsUrl: 'https://developers.google.com',
    boothCode: 'STAMP-GDEV'
  },
  {
    id: 'sp-2',
    name: 'Vyron Cognitive Cloud',
    tier: 'Platinum',
    tagline: 'Autonomous engineering workspaces & neon-glass UI infrastructure.',
    track: 'systems',
    promoCode: 'VYRON-PRO-2026',
    creditOffer: '6 Months Free Pro Workspace + Agent Sandbox',
    docsUrl: 'https://example.com/vyron',
    boothCode: 'STAMP-VYRN'
  },
  {
    id: 'sp-3',
    name: 'ScaleMesh Kubernetes',
    tier: 'Platinum',
    tagline: 'Zero-cold-start GPU inference clusters for AI teams.',
    track: 'cloud',
    promoCode: 'SCALEMESH-GPU',
    creditOffer: '100 Free A100 GPU Compute Hours',
    docsUrl: 'https://example.com/scalemesh',
    boothCode: 'STAMP-MESH'
  },
  {
    id: 'sp-4',
    name: 'HyperCanvas UI',
    tier: 'Gold',
    tagline: '120fps local-first visual collaboration SDK for React.',
    track: 'web',
    promoCode: 'HYPER-SDK-26',
    creditOffer: 'Unlimited Commercial Seat License (1 Year)',
    docsUrl: 'https://example.com/hypercanvas',
    boothCode: 'STAMP-CANV'
  }
];

export const JOBS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Principal Full-Stack AI Systems Architect',
    company: 'Vyron Cognitive Cloud',
    location: 'Chennai / Remote Hybrid',
    compensation: '₹48L – ₹72L + Equity',
    tags: ['TypeScript', 'Multi-Agent Loops', 'React 19', 'Distributed Systems']
  },
  {
    id: 'job-2',
    title: 'Staff Kubernetes & GPU Infrastructure Engineer',
    company: 'ScaleMesh',
    location: 'Bengaluru / Chennai',
    compensation: '₹42L – ₹65L',
    tags: ['Go', 'Kubernetes', 'eBPF', 'vLLM']
  },
  {
    id: 'job-3',
    title: 'Senior Design Systems & WebGPU Engineer',
    company: 'HyperCanvas UI',
    location: 'Remote (India)',
    compensation: '₹35L – ₹52L',
    tags: ['Tailwind CSS', 'WebGPU', 'HTML5 Canvas', 'A11y']
  }
];

export const VENUE_ZONES: VenueZone[] = [
  {
    id: 'zone-main',
    name: 'Main Arena // Neural & Grand Stage',
    level: 'Level 1',
    capacity: '1,800 Seats',
    currentActivity: 'Opening Keynote & Flagship AI Talks',
    coords: { x: 30, y: 25, w: 260, h: 150 },
    color: '#34A853'
  },
  {
    id: 'zone-expo',
    name: 'Sponsor Expo & AI Geeks Badge Pickup',
    level: 'Level 1',
    capacity: '12 Interactive Booths',
    currentActivity: 'Live Demos, Swag Redemption & QR Check-in',
    coords: { x: 310, y: 25, w: 210, h: 150 },
    color: '#4285F4'
  },
  {
    id: 'zone-labs',
    name: 'Codelab Sandboxes A, B & C',
    level: 'Level 2',
    capacity: '200 Workstations (10Gbps Fiber)',
    currentActivity: 'Hands-On ReproState & Tri-Agent Workshops',
    coords: { x: 30, y: 195, w: 320, h: 115 },
    color: '#FBBC05'
  },
  {
    id: 'zone-hack',
    name: '24-Hour Software Hackathon War Room',
    level: 'Level 3',
    capacity: '400 Hackers // 24x7 Caffeine Bar',
    currentActivity: 'Sprint Building, Mentor Office Hours & Live Pitching',
    coords: { x: 370, y: 195, w: 150, h: 115 },
    color: '#EA4335'
  }
];

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 'q1',
    question: 'Which technique prevents LLM agent hallucination drift during automated bug reproduction?',
    options: [
      'Increasing temperature to 1.4',
      'Deterministic sandbox execution + AST/Playwright assertion verification',
      'Removing system instructions',
      'Disabling TypeScript strict mode'
    ],
    correctIndex: 1,
    xp: 50
  },
  {
    id: 'q2',
    question: 'What is the primary advantage of Gemini Context Caching for large codebase analysis?',
    options: [
      'Reuses pre-computed KV tensors for shared prompt prefixes to slash latency and cost',
      'Compresses PNG images into SVG automatically',
      'Replaces CSS Grid with Flexbox',
      'Disables TLS encryption'
    ],
    correctIndex: 0,
    xp: 50
  },
  {
    id: 'q3',
    question: 'In a high-FPS HTML5 Canvas badge or diagramming engine, how do you ensure crisp rendering on Retina screens?',
    options: [
      'Use only 8-bit GIFs',
      'Multiply canvas width/height by window.devicePixelRatio and scale the 2D context',
      'Set CSS opacity to 0.5',
      'Avoid requestAnimationFrame'
    ],
    correctIndex: 1,
    xp: 50
  }
];

export const FAQS = [
  {
    q: 'Is GDG DevFest / AI GEEKS Summit free to attend?',
    a: 'Yes! The General Builder Pass and Student Hacker Pass are 100% free for registered community builders. Claim your instant QR pass via the RSVP wizard to lock your seat.'
  },
  {
    q: 'Is the 24-Hour Hackathon software-only?',
    a: 'Yes, the hackathon is strictly software-only. All tracks focus on autonomous developer tools, multi-agent SaaS architectures, cloud infrastructure, and modern web interfaces.'
  },
  {
    q: 'What should I bring for the Hands-On Codelabs?',
    a: 'Bring a laptop with Node.js 20+, Git, and a modern Chromium browser installed. High-speed 5G Wi-Fi and ephemeral cloud sandbox keys are provided at every table.'
  },
  {
    q: 'How do I unlock the limited-edition AI GEEKS Hoodie?',
    a: 'Collect all 6 Digital Passport Stamps in the Scavenger Hunt tab (by visiting sponsor booths, creating your custom DevFest badge, and completing the tech trivia) to unlock your redemption code.'
  },
  {
    q: 'Are food and refreshments provided during the 2-day conference?',
    a: 'Yes, full buffet lunches, continuous specialty coffee/chai bars, and midnight energy packs for hackathon builders are covered for all pass holders.'
  }
];

export const STICKER_OPTIONS = [
  '⚡ TypeScript Architect',
  '🤖 Agent Orchestrator',
  '🦀 Rust + Wasm Builder',
  '☸️ Kubernetes Captain',
  '✨ Neon-Glass UI Crafter',
  '🧪 Bug-to-Test Synth'
];

export const AVATAR_PRESETS = [
  { id: 1, label: '3D Robot Mascot', emoji: '🤖', bg: 'from-emerald-500 to-teal-700' },
  { id: 2, label: 'Cyber Architect', emoji: '⚡', bg: 'from-blue-500 to-indigo-700' },
  { id: 3, label: 'Cloud Ninja', emoji: '☁️', bg: 'from-amber-400 to-orange-600' },
  { id: 4, label: 'Kernel Hacker', emoji: '🦀', bg: 'from-rose-500 to-red-700' }
];
