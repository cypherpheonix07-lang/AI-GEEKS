import { User, Post, Question, Event, Hackathon, Project, LearningPath, Job, Resource, Testimonial, NotificationItem } from '../types/community';

export const CURRENT_USER: User = {
  id: 'usr-me',
  username: 'aarav_patel',
  name: 'Aarav Patel',
  email: 'aarav@aigeeks.dev',
  bio: 'Staff AI Systems Architect • Building autonomous multi-agent dev loops & local-first glass interfaces.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  role: 'CONTRIBUTOR',
  reputation: 2450,
  tier: 'Contributor',
  streak: 14,
  longestStreak: 28,
  location: 'Bengaluru / Chennai, India',
  company: 'AI Geeks Core & Neural Labs',
  website: 'https://aarav.dev',
  githubUrl: 'https://github.com',
  twitterUrl: 'https://x.com',
  linkedinUrl: 'https://linkedin.com',
  skills: ['TypeScript', 'Gemini API', 'LangGraph', 'React 19', 'Kubernetes', 'WebGPU'],
  badges: [
    { id: 'b1', name: 'Prolific Writer', description: 'Published 10+ high-impact articles', icon: '✍️', color: 'from-purple-500 to-indigo-600', earnedAt: 'Oct 2026' },
    { id: 'b2', name: 'AI Expert', description: 'Received 500+ upvotes in AI topics', icon: '🧠', color: 'from-emerald-500 to-teal-600', earnedAt: 'Nov 2026' },
    { id: 'b3', name: 'Hackathon Winner', description: '1st place in Autonomous DevTools Sprint', icon: '🏆', color: 'from-amber-400 to-orange-500', earnedAt: 'Sep 2026' },
    { id: 'b4', name: 'OG Member', description: 'Joined during community founding', icon: '🌟', color: 'from-cyan-400 to-blue-500', earnedAt: 'Jan 2026' }
  ],
  postsCount: 14,
  projectsCount: 4,
  followersCount: 428,
  followingCount: 86,
  joinedAt: 'Jan 2026'
};

export const SEED_MEMBERS: User[] = [
  {
    id: 'usr-1',
    username: 'mayalin_ai',
    name: 'Dr. Maya Lin',
    email: 'maya@google.com',
    bio: 'Staff AI Researcher @ DeepMind. Working on multimodal reasoning, agentic tool use, and cognitive memory.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    role: 'SPEAKER',
    reputation: 28400,
    tier: 'Legend',
    streak: 42,
    longestStreak: 65,
    location: 'San Francisco, CA',
    company: 'Google DeepMind',
    githubUrl: 'https://github.com',
    skills: ['Transformers', 'PyTorch', 'Multimodal LLMs', 'Reinforcement Learning'],
    badges: [
      { id: 'b-leg', name: 'Legendary Contributor', description: 'Top 0.1% community rank', icon: '👑', color: 'from-rose-500 to-purple-600' }
    ],
    postsCount: 38,
    projectsCount: 12,
    followersCount: 3840,
    followingCount: 112,
    joinedAt: 'Feb 2025',
    isFollowing: true
  },
  {
    id: 'usr-2',
    username: 'alex_rivera',
    name: 'Alex Rivera',
    email: 'alex@cloudnative.io',
    bio: 'Principal SRE & CNCF Ambassador. Zero-downtime Kubernetes clusters & serverless GPU orchestration.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    role: 'MODERATOR',
    reputation: 16800,
    tier: 'Master',
    streak: 21,
    longestStreak: 30,
    location: 'Berlin, Germany',
    company: 'CloudNative Labs',
    githubUrl: 'https://github.com',
    skills: ['Kubernetes', 'Go', 'eBPF', 'Terraform', 'Prometheus'],
    badges: [
      { id: 'b-mast', name: 'Master Architect', description: 'Answered 100+ infrastructure questions', icon: '⚡', color: 'from-amber-400 to-red-500' }
    ],
    postsCount: 22,
    projectsCount: 7,
    followersCount: 2190,
    followingCount: 140,
    joinedAt: 'Mar 2025',
    isFollowing: false
  },
  {
    id: 'usr-3',
    username: 'sarah_jenkins',
    name: 'Sarah Jenkins',
    email: 'sarah@ui.dev',
    bio: 'Core UI Engineer & GDE Web. Crafting 120fps local-first canvas engines and React 19 glassmorphic token systems.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    role: 'CONTRIBUTOR',
    reputation: 8400,
    tier: 'Expert',
    streak: 18,
    longestStreak: 25,
    location: 'London, UK',
    company: 'PixelGlass & Vercel Ecosystem',
    githubUrl: 'https://github.com',
    skills: ['React 19', 'WebGPU', 'Tailwind CSS', 'CRDTs', 'TypeScript'],
    badges: [
      { id: 'b-exp', name: 'UI Virtuoso', description: 'Created top-starred community visualizer', icon: '🎨', color: 'from-yellow-400 to-orange-500' }
    ],
    postsCount: 19,
    projectsCount: 9,
    followersCount: 1750,
    followingCount: 94,
    joinedAt: 'Jun 2025',
    isFollowing: true
  },
  {
    id: 'usr-4',
    username: 'vikram_patel',
    name: 'Vikram Patel',
    email: 'vikram@rustacean.org',
    bio: 'Rust Foundation Contributor • Building AST analyzers, bug-to-test synthesizers, and ultra-fast Wasm compilers.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    role: 'CONTRIBUTOR',
    reputation: 6200,
    tier: 'Expert',
    streak: 12,
    longestStreak: 20,
    location: 'Bengaluru, India',
    company: 'KernelFoundry',
    githubUrl: 'https://github.com',
    skills: ['Rust', 'WebAssembly', 'LLVM', 'Compilers', 'Linux'],
    badges: [
      { id: 'b-rust', name: 'Systems Maestro', description: 'Published 5+ compiler deep dives', icon: '🦀', color: 'from-orange-500 to-rose-600' }
    ],
    postsCount: 16,
    projectsCount: 6,
    followersCount: 1420,
    followingCount: 78,
    joinedAt: 'Aug 2025',
    isFollowing: false
  },
  {
    id: 'usr-5',
    username: 'elena_rostova',
    name: 'Elena Rostova',
    email: 'elena@langstack.ai',
    bio: 'AI Developer Advocate • Teaching prompt orchestration, deterministic evals, and RAG architectures.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    role: 'SPEAKER',
    reputation: 3900,
    tier: 'Contributor',
    streak: 9,
    longestStreak: 16,
    location: 'Toronto, Canada',
    company: 'LangStack Ecosystem',
    githubUrl: 'https://github.com',
    skills: ['LangChain', 'LlamaIndex', 'Vector DBs', 'Python'],
    badges: [
      { id: 'b-speak', name: 'Keynote Speaker', description: 'Presented at 3+ AI Geeks events', icon: '🎤', color: 'from-purple-400 to-indigo-500' }
    ],
    postsCount: 11,
    projectsCount: 3,
    followersCount: 980,
    followingCount: 62,
    joinedAt: 'Sep 2025',
    isFollowing: false
  }
];

export const SEED_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Building Autonomous Multi-Agent Swarms with Gemini 2.5 & LangGraph',
    slug: 'autonomous-agent-swarms-gemini-2-5',
    excerpt: 'Architect stateful agent graphs with deterministic tool sandboxes, self-correcting review cycles, and zero hallucination drift.',
    content: `
# Autonomous Multi-Agent Swarms with Gemini 2.5 & LangGraph

In modern production environments, monolithic prompts and single-step LLM calls quickly fail under real-world ambiguity. Moving to autonomous, specialized agent swarms allows us to break down complex engineering tasks into deterministic stages: **Planner**, **Synthesizer**, and **Verifier**.

\`\`\`typescript
import { StateGraph, END } from '@langchain/langgraph';
import { GoogleGenAI } from '@google/genai';

interface AgentState {
  task: string;
  plan: string[];
  codeDraft: string;
  verificationErrors: string[];
  iteration: number;
}

const workflow = new StateGraph<AgentState>({
  channels: {
    task: { value: (x, y) => y ?? x },
    plan: { value: (x, y) => y ?? x },
    codeDraft: { value: (x, y) => y ?? x },
    verificationErrors: { value: (x, y) => y ?? x },
    iteration: { value: (x, y) => (y !== undefined ? y : x + 1), default: () => 0 }
  }
});
\`\`\`

### Key Architectural Pillars
1. **Isolated Tool Sandboxes:** Always execute synthetic code in an ephemeral Docker or WASM container.
2. **Deterministic Assertions:** Never rely on an LLM to "grade" its own code. Run Vitest, Playwright, or static linters to produce binary ground truth.
3. **Budget Caps:** Set strict token and step ceilings (e.g., max 5 self-repair iterations) to eliminate infinite recursive token drains.
    `,
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
    author: SEED_MEMBERS[0],
    tags: ['AI', 'Agents', 'Gemini', 'TypeScript', 'LangGraph'],
    readTime: '6 min read',
    views: 4820,
    publishedAt: '2026-11-15T14:30:00Z',
    reactions: { like: 242, love: 184, fire: 310, mind_blown: 195, celebrate: 88, bookmark: 154 },
    commentsCount: 28,
    comments: [
      {
        id: 'c1',
        author: SEED_MEMBERS[1],
        content: 'Spot on about deterministic assertions. We hooked this up with eBPF probes in staging to monitor latency spikes across agent tool execution.',
        createdAt: '2026-11-15T16:00:00Z',
        upvotes: 18,
        hasUpvoted: true
      },
      {
        id: 'c2',
        author: SEED_MEMBERS[3],
        content: 'Have you benchmarked Wasmtime for the code sandbox compared to ephemeral Docker containers? We noticed cold-starts drop from 400ms to 4ms.',
        createdAt: '2026-11-15T17:15:00Z',
        upvotes: 12,
        hasUpvoted: false
      }
    ],
    isBookmarked: true,
    category: 'Tutorial'
  },
  {
    id: 'post-2',
    title: 'Zero-Downtime Serverless GPU Inference on Kubernetes (GKE + vLLM)',
    slug: 'serverless-gpu-inference-kubernetes-vllm',
    excerpt: 'Slashing LLM serving costs by 64% using dynamic KV-cache snapshotting, node auto-provisioning, and custom Envoy token backpressure shedding.',
    content: `
# Zero-Downtime Serverless GPU Inference on GKE with vLLM

Scaling high-throughput LLM workloads requires balancing GPU utilization with instantaneous latency budgets. By pairing Kubernetes GKE Autopilot node auto-provisioning with vLLM PagedAttention, we achieved sub-50ms TTFT (Time to First Token) at scale.

### Architecture Highlights
- **Pre-warmed Container Layers:** Caching 14B model weights on high-speed NVMe local SSDs eliminates container pull bottlenecks.
- **Dynamic KV-Cache Offload:** Snapshotting conversation context to shared Redis memory allows seamless failover without re-computing tokens.
    `,
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80',
    author: SEED_MEMBERS[1],
    tags: ['Cloud', 'Kubernetes', 'vLLM', 'DevOps', 'GPU'],
    readTime: '8 min read',
    views: 3650,
    publishedAt: '2026-11-14T10:15:00Z',
    reactions: { like: 198, love: 92, fire: 245, mind_blown: 120, celebrate: 45, bookmark: 112 },
    commentsCount: 16,
    comments: [],
    isBookmarked: false,
    category: 'Case Study'
  },
  {
    id: 'post-3',
    title: 'Local-First React 19 & WebGPU: 120fps Infinite Canvas Architectures',
    slug: 'local-first-react-19-webgpu-canvas',
    excerpt: 'How we built a collaborative whiteboard and architecture diagramming engine handling 100,000+ interactive vector nodes using OffscreenCanvas and CRDTs.',
    content: `
# Local-First React 19 & WebGPU at 120fps

Web applications no longer need to feel like static document viewers. By offloading 2D spatial collision queries to Web Workers and rendering via WebGPU shaders, browser applications can run with native workstation fluidity.
    `,
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    author: SEED_MEMBERS[2],
    tags: ['Web', 'React 19', 'WebGPU', 'CRDTs', 'UI/UX'],
    readTime: '7 min read',
    views: 2980,
    publishedAt: '2026-11-13T09:00:00Z',
    reactions: { like: 164, love: 110, fire: 182, mind_blown: 85, celebrate: 62, bookmark: 94 },
    commentsCount: 14,
    comments: [],
    isBookmarked: true,
    category: 'Tutorial'
  },
  {
    id: 'post-4',
    title: 'Stateful Bug-to-Test Synthesizers in Rust: Turning Issue Reports into Verified Specs',
    slug: 'bug-to-test-synthesizers-rust',
    excerpt: 'Convert natural language issue reports and stack traces into reproducible Playwright and Vitest test specs with AST verification.',
    content: `
# Bug-to-Test Synthesizers in Rust

Manual bug triage is one of the highest friction activities in software development. Using Rust to parse ASTs and extract reproduction assertions ensures tests are robust, deterministic, and never flaky.
    `,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    author: SEED_MEMBERS[3],
    tags: ['Systems', 'Rust', 'Testing', 'AST', 'Compilers'],
    readTime: '10 min read',
    views: 2410,
    publishedAt: '2026-11-12T16:20:00Z',
    reactions: { like: 145, love: 78, fire: 190, mind_blown: 115, celebrate: 40, bookmark: 88 },
    commentsCount: 9,
    comments: [],
    isBookmarked: false,
    category: 'Research'
  }
];

export const SEED_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    title: 'How do you prevent context window pollution and hallucination drift in multi-turn agent loops?',
    slug: 'prevent-context-window-pollution-multi-turn-agents',
    body: 'We are building an autonomous code review bot that executes tests and attempts patches. After 4 or 5 iterations, the model starts hallucinatory file paths and loses track of the initial diff. What is the industry standard pattern to prune and compress conversation state?',
    author: SEED_MEMBERS[4],
    tags: ['AI', 'Agents', 'LangChain', 'PromptEngineering'],
    votes: 42,
    hasVoted: null,
    answersCount: 3,
    views: 1240,
    isSolved: true,
    createdAt: '2026-11-14T11:00:00Z',
    answers: [
      {
        id: 'ans-1',
        questionId: 'q-1',
        author: SEED_MEMBERS[0],
        body: 'The gold standard pattern is **Rolling Summary Memory with Scratchpad Masking**. Instead of feeding the full raw dialog history, maintain a structured JSON scratchpad:\n\n1. Target File Path & AST Node\n2. Current Verification Status (Passed/Failed)\n3. Most Recent Error Stack Only (discard previous iterations)\n\nDiscard the intermediate raw LLM thought chains from previous turns before the next API call.',
        votes: 38,
        hasVoted: 'up',
        isAccepted: true,
        createdAt: '2026-11-14T12:15:00Z'
      },
      {
        id: 'ans-2',
        questionId: 'q-1',
        author: SEED_MEMBERS[3],
        body: 'Also consider Gemini Context Caching. If your repository AST or codebase guidelines are fixed, mark them as an immutable cache prefix so only the dynamic state is passed.',
        votes: 14,
        hasVoted: null,
        isAccepted: false,
        createdAt: '2026-11-14T14:30:00Z'
      }
    ]
  },
  {
    id: 'q-2',
    title: 'Best strategy for GKE Spot GPU node preemption handling with vLLM?',
    slug: 'gke-spot-gpu-preemption-handling-vllm',
    body: 'When running inference clusters on GCP Spot A100s, node terminations can drop in-flight requests. What is the recommended Envoy or Kubernetes configuration to shed traffic gracefully within the 30-second termination notice window?',
    author: SEED_MEMBERS[2],
    tags: ['Cloud', 'Kubernetes', 'GCP', 'DevOps'],
    votes: 29,
    hasVoted: null,
    answersCount: 2,
    views: 890,
    isSolved: true,
    createdAt: '2026-11-13T18:40:00Z',
    answers: [
      {
        id: 'ans-3',
        questionId: 'q-2',
        author: SEED_MEMBERS[1],
        body: 'Use the GCP node termination handler to trap SIGTERM. Immediately set the pod readiness probe to false so Envoy stops routing new requests, while completing in-flight streams via HTTP/2 streaming backpressure.',
        votes: 26,
        hasVoted: null,
        isAccepted: true,
        createdAt: '2026-11-13T19:20:00Z'
      }
    ]
  },
  {
    id: 'q-3',
    title: 'How to handle high-frequency cursor presence synchronization in React 19 without re-rendering the whole DOM?',
    slug: 'react-19-cursor-presence-canvas-crdt',
    body: 'In our collaborative canvas, sending 60 cursor updates per second causes noticeable re-render drops in React concurrent mode. How should we architect off-thread cursor layers?',
    author: CURRENT_USER,
    tags: ['Web', 'React 19', 'WebSockets', 'Canvas'],
    votes: 35,
    hasVoted: 'up',
    answersCount: 1,
    views: 950,
    isSolved: false,
    createdAt: '2026-11-15T09:10:00Z',
    answers: [
      {
        id: 'ans-4',
        questionId: 'q-3',
        author: SEED_MEMBERS[2],
        body: 'Bypass React state entirely for cursor rendering! Mount a standalone transparent `<canvas>` layer on top of your app and draw incoming coordinates directly via \`requestAnimationFrame\` consuming a typed array buffer.',
        votes: 31,
        hasVoted: null,
        isAccepted: false,
        createdAt: '2026-11-15T10:00:00Z'
      }
    ]
  }
];

export const SEED_EVENTS: Event[] = [
  {
    id: 'evt-1',
    title: 'AI Geeks Flagship DevFest 2026: The Autonomous Builder Era',
    slug: 'devfest-2026-chennai',
    description: 'Our annual 2-day flagship conference bringing together 5,000+ AI architects, researchers, and cloud builders for keynotes, workshops, and hands-on sandboxes.',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
    startDate: '2026-11-20',
    endDate: '2026-11-21',
    time: '09:00 AM - 06:00 PM IST',
    type: 'Conference',
    format: 'Hybrid',
    location: 'Taj Coromandel, Chennai & Virtual Stage',
    onlineLink: 'https://stream.aigeeks.dev/devfest26',
    speakers: [
      { name: 'Dr. Maya Lin', role: 'Staff AI Researcher', company: 'Google DeepMind', avatar: SEED_MEMBERS[0].avatar },
      { name: 'Alex Rivera', role: 'Principal SRE', company: 'CloudNative Labs', avatar: SEED_MEMBERS[1].avatar },
      { name: 'Sarah Jenkins', role: 'Core UI Engineer', company: 'Vercel Ecosystem', avatar: SEED_MEMBERS[2].avatar }
    ],
    attendeeCount: 5240,
    isRsvpd: true,
    status: 'Open',
    tags: ['Flagship', 'AutonomousAI', 'Kubernetes', 'React19']
  },
  {
    id: 'evt-2',
    title: 'Deep Dive Workshop: Building Production RAG with Gemini Context Caching',
    slug: 'workshop-gemini-context-caching-rag',
    description: 'Hands-on 3-hour live coding session on structuring million-token AST repositories and vector indices for sub-300ms query latency.',
    coverImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80',
    startDate: '2026-11-28',
    endDate: '2026-11-28',
    time: '04:00 PM - 07:00 PM IST',
    type: 'Workshop',
    format: 'Online',
    location: 'Google Meet / Live Sandbox',
    onlineLink: 'https://meet.google.com/aig-rag-deep',
    speakers: [
      { name: 'Elena Rostova', role: 'AI Developer Advocate', company: 'LangStack', avatar: SEED_MEMBERS[4].avatar }
    ],
    attendeeCount: 840,
    isRsvpd: false,
    status: 'Open',
    tags: ['Workshop', 'RAG', 'Gemini', 'Python']
  },
  {
    id: 'evt-3',
    title: 'Autonomous Software Hackathon 2026: 24-Hour Sprint',
    slug: 'hackathon-autonomous-software-2026',
    description: 'Compete for ₹3,75,000 in cash prizes + $15k cloud compute credits. Build developer tools, multi-agent workspaces, or self-healing cloud bots.',
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
    startDate: '2026-12-05',
    endDate: '2026-12-06',
    time: '10:00 AM (24 Hours Continuous)',
    type: 'Hackathon',
    format: 'Hybrid',
    location: 'Neural Arena Hall & Discord',
    speakers: [
      { name: 'Vikram Patel', role: 'Systems Architect', company: 'Rust Foundation', avatar: SEED_MEMBERS[3].avatar }
    ],
    attendeeCount: 1200,
    isRsvpd: true,
    status: 'Open',
    tags: ['Hackathon', 'Prizes', 'DevTools', 'AI']
  }
];

export const SEED_HACKATHONS: Hackathon[] = [
  {
    id: 'hack-1',
    title: 'The AI Geeks Autonomous DevTools Hackathon',
    slug: 'autonomous-devtools-hackathon',
    tagline: 'Build the next generation of autonomous engineering agents and self-healing systems.',
    description: 'Strictly software-only. 3 flagship tracks: Autonomous Debugging & Test Synthesis, Multi-Agent SaaS Copilots, and Self-Healing Cloud Telemetry. Judged by Google Developer Experts and YC founders.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    prizePool: '₹3,75,000 + $15,000 Cloud Compute',
    startDate: 'Dec 5, 2026',
    deadline: 'Dec 6, 2026',
    status: 'Active',
    tracks: ['Autonomous Testing', 'Cognitive Workspaces', 'Cloud Self-Healing'],
    participantsCount: 1420,
    submissionsCount: 68,
    sponsors: ['Google for Developers', 'Hugging Face', 'Vercel', 'ScaleMesh'],
    isRegistered: true,
    leaderboard: [
      { rank: 1, teamName: 'NeuroSynth', projectTitle: 'ReproState: Stateful Bug-to-Vitest Synthesizer', score: 98.4, members: ['Aarav Patel', 'Vikram Patel'] },
      { rank: 2, teamName: 'GlassAgents', projectTitle: 'SpatialCanvas: 120fps Multi-Agent Graph Editor', score: 95.2, members: ['Sarah Jenkins', 'Elena Rostova'] },
      { rank: 3, teamName: 'MeshGuard', projectTitle: 'eBPF Anomaly Detector & Auto-Remediator', score: 92.8, members: ['Alex Rivera', 'Chen Wei'] }
    ]
  },
  {
    id: 'hack-2',
    title: 'WebGPU & Local-First AI Innovation Challenge',
    slug: 'webgpu-local-first-ai-challenge',
    tagline: 'Run quantized LLMs and diffusion shaders directly in browser client workers.',
    description: 'Build web applications that function 100% offline using ONNX Runtime Web and WebGPU hardware acceleration.',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    prizePool: '₹2,50,000 + Hardware GPU Grant',
    startDate: 'Jan 15, 2027',
    deadline: 'Jan 17, 2027',
    status: 'Upcoming',
    tracks: ['Offline-First AI', 'Creative WebGPU', 'Edge Workers'],
    participantsCount: 650,
    submissionsCount: 0,
    sponsors: ['Google Chrome', 'Hugging Face', 'PixelGlass'],
    isRegistered: false,
    leaderboard: []
  }
];

export const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'ReproState Synthesizer',
    tagline: 'Converts natural language bug reports into deterministic Playwright & Vitest reproduction scripts.',
    description: 'An open-source developer tool written in Rust and TypeScript that serializes isolated DOM/network snapshots, runs headless sandbox assertions, and verifies test patches automatically.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    author: CURRENT_USER,
    techStack: ['Rust', 'Playwright', 'Vitest', 'TypeScript', 'AST'],
    githubUrl: 'https://github.com/aigeeks-community/reprostate',
    liveUrl: 'https://reprostate.aigeeks.dev',
    starsCount: 1420,
    hasStarred: true,
    category: 'AI Tools',
    createdAt: '2026-10-20'
  },
  {
    id: 'proj-2',
    title: 'HyperCanvas UI',
    tagline: '120fps local-first collaborative diagramming engine for multi-agent workflows.',
    description: 'Hardware accelerated collaborative canvas handling over 100,000 elements with sub-millisecond CRDT synchronization and zero layout shift.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    author: SEED_MEMBERS[2],
    techStack: ['React 19', 'WebGPU', 'HTML5 Canvas', 'CRDTs'],
    githubUrl: 'https://github.com/aigeeks-community/hypercanvas',
    liveUrl: 'https://hypercanvas.aigeeks.dev',
    starsCount: 2850,
    hasStarred: true,
    category: 'Open Source',
    createdAt: '2026-09-14'
  },
  {
    id: 'proj-3',
    title: 'ScaleMesh K8s Anomaly Radar',
    tagline: 'Predictive GPU cluster telemetry & automated token backpressure shedding.',
    description: 'Zero-cold-start inference autoscaler for vLLM and TensorRT-LLM clusters running on Google Kubernetes Engine with eBPF metrics.',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
    author: SEED_MEMBERS[1],
    techStack: ['Kubernetes', 'Go', 'eBPF', 'OpenTelemetry'],
    githubUrl: 'https://github.com/aigeeks-community/scalemesh-radar',
    liveUrl: 'https://scalemesh.io',
    starsCount: 980,
    hasStarred: false,
    category: 'AI Tools',
    createdAt: '2026-08-11'
  },
  {
    id: 'proj-4',
    title: 'SmolAgent Orchestrator',
    tagline: 'Sub-50KB zero-dependency multi-agent runtime for edge devices and serverless workers.',
    description: 'Lightweight agent loop that compiles tool calling schemas into optimized bytecodes with deterministic JSON repair.',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    author: SEED_MEMBERS[0],
    techStack: ['TypeScript', 'Gemini API', 'Edge Workers'],
    githubUrl: 'https://github.com/aigeeks-community/smol-agent',
    starsCount: 1640,
    hasStarred: false,
    category: 'Research',
    createdAt: '2026-11-01'
  }
];

export const SEED_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'lp-1',
    title: 'Autonomous AI & Multi-Agent Architecture',
    slug: 'autonomous-ai-multi-agent-architecture',
    description: 'Master the transition from basic LLM prompts to self-correcting agent swarms, sandbox code execution, and deterministic evaluation harnesses.',
    icon: '🤖',
    level: 'Intermediate',
    estimatedHours: '18 hours',
    modulesCount: 6,
    enrolledCount: 3840,
    isEnrolled: true,
    progressPct: 65,
    topics: ['LangGraph', 'Gemini 2.5', 'Tool Calling', 'Eval Harnesses', 'Vector DBs'],
    modules: [
      { id: 'm1', title: '1. Foundations of Autonomous Loops: Planner, Executor & Verifier', duration: '2.5 hrs', type: 'video', completed: true },
      { id: 'm2', title: '2. Safe Code Execution: Sandboxing with Docker & WASM', duration: '3 hrs', type: 'article', completed: true },
      { id: 'm3', title: '3. Deterministic Evals: Eliminating Hallucination Drift', duration: '3 hrs', type: 'article', completed: true },
      { id: 'm4', title: '4. Multimodal RAG with AST Code Chunking', duration: '3.5 hrs', type: 'video', completed: false },
      { id: 'm5', title: '5. Stateful Memory & Rolling Summary Compression', duration: '3 hrs', type: 'article', completed: false },
      { id: 'm6', title: '6. Capstone Project: Shipping a GitHub Code Review Agent', duration: '3 hrs', type: 'quiz', completed: false }
    ]
  },
  {
    id: 'lp-2',
    title: 'Cloud Native & Zero-Downtime GPU Infrastructure',
    slug: 'cloud-native-gpu-infra',
    description: 'Scale LLM serving clusters on Kubernetes with vLLM, eBPF telemetry, node auto-provisioning, and zero-cold-start failover.',
    icon: '☁️',
    level: 'Advanced',
    estimatedHours: '24 hours',
    modulesCount: 8,
    enrolledCount: 2190,
    isEnrolled: false,
    progressPct: 0,
    topics: ['Kubernetes', 'vLLM', 'eBPF', 'Prometheus', 'Envoy'],
    modules: [
      { id: 'm21', title: '1. GKE Autopilot & GPU Node Provisioning', duration: '3 hrs', type: 'video' },
      { id: 'm22', title: '2. PagedAttention & vLLM Memory Layouts', duration: '3 hrs', type: 'article' },
      { id: 'm23', title: '3. High-Throughput Load Balancing with Envoy', duration: '3 hrs', type: 'article' }
    ]
  },
  {
    id: 'lp-3',
    title: 'Modern Web & Local-First AI with React 19',
    slug: 'modern-web-local-first-ai',
    description: 'Craft 60-120fps spatial glassmorphic interfaces, WebGPU client shaders, and local CRDT synchronizers.',
    icon: '✨',
    level: 'Intermediate',
    estimatedHours: '14 hours',
    modulesCount: 5,
    enrolledCount: 2950,
    isEnrolled: true,
    progressPct: 20,
    topics: ['React 19', 'WebGPU', 'HTML5 Canvas', 'CRDTs', 'Tailwind'],
    modules: [
      { id: 'm31', title: '1. Glassmorphic Design Tokens & Performance Budgets', duration: '2.5 hrs', type: 'article', completed: true },
      { id: 'm32', title: '2. WebGPU 101: Writing Compute Shaders in the Browser', duration: '3 hrs', type: 'video', completed: false }
    ]
  }
];

export const SEED_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Principal Full-Stack AI Systems Architect',
    company: 'NeuralStack Cloud',
    logo: '⚡',
    location: 'Bengaluru / Remote (India)',
    type: 'Full-time',
    isRemote: true,
    salary: '₹55,00,000 – ₹80,00,000 + Equity',
    experienceLevel: 'Lead',
    techStack: ['TypeScript', 'Gemini API', 'LangGraph', 'Distributed Systems'],
    description: 'Architect enterprise agent swarms, deterministic eval pipelines, and high-performance developer workspaces.',
    applyUrl: 'https://careers.neuralstack.ai/principal-ai',
    postedAt: '2 days ago'
  },
  {
    id: 'job-2',
    title: 'Staff Kubernetes & GPU Infrastructure Engineer',
    company: 'ScaleMesh Networks',
    logo: '☁️',
    location: 'Chennai / Hybrid',
    type: 'Full-time',
    isRemote: false,
    salary: '₹45,00,000 – ₹68,00,000',
    experienceLevel: 'Senior',
    techStack: ['Go', 'Kubernetes', 'eBPF', 'vLLM', 'GCP'],
    description: 'Scale multi-region Kubernetes clusters serving 50M+ daily inference queries with zero cold-start.',
    applyUrl: 'https://careers.scalemesh.io/staff-infra',
    postedAt: '4 days ago'
  },
  {
    id: 'job-3',
    title: 'Senior Design Systems & WebGPU Engineer',
    company: 'HyperCanvas Labs',
    logo: '🎨',
    location: 'Remote (Global)',
    type: 'Full-time',
    isRemote: true,
    salary: '$140,000 – $185,000 USD',
    experienceLevel: 'Senior',
    techStack: ['React 19', 'WebGPU', 'Tailwind CSS', 'CRDTs'],
    description: 'Lead development on our collaborative 120fps infinite whiteboard used by hundreds of thousands of AI builders.',
    applyUrl: 'https://hypercanvas.aigeeks.dev/careers',
    postedAt: '1 week ago'
  }
];

export const SEED_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: 'Gemini 2.5 Multi-Agent Orchestration Blueprint',
    description: 'Official production architecture template for stateful graph loops, tool sandboxing, and evaluation harnesses.',
    type: 'Repo',
    format: 'Open Source',
    url: 'https://github.com/google-gemini/cookbook',
    upvotes: 840,
    hasUpvoted: true,
    tags: ['Gemini', 'Agents', 'TypeScript', 'Python'],
    author: 'Google DeepMind Team',
    createdAt: '2026-11-10'
  },
  {
    id: 'res-2',
    title: 'vLLM: High-Throughput and Memory-Efficient LLM Serving',
    description: 'State of the art serving runtime featuring PagedAttention, chunked prefill, and continuous batching.',
    type: 'Tool',
    format: 'Open Source',
    url: 'https://github.com/vllm-project/vllm',
    upvotes: 1950,
    hasUpvoted: true,
    tags: ['Kubernetes', 'Inference', 'Python', 'CUDA'],
    author: 'vLLM Project',
    createdAt: '2026-10-15'
  },
  {
    id: 'res-3',
    title: 'Attention Is All You Need — Interactive Visualizer',
    description: 'Interactive 3D tensor attention head inspector with live token queries and transformer layer weights.',
    type: 'Tool',
    format: 'Free',
    url: 'https://poloclub.github.io/transformer-explainer/',
    upvotes: 1240,
    hasUpvoted: false,
    tags: ['Transformers', 'NeuralNetworks', 'Education'],
    author: 'Polo Club of Data Science',
    createdAt: '2026-09-22'
  }
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'AI Geeks is the single highest-signal community for practicing engineers in APAC. The technical depth of the discussions and hackathons is unmatched.',
    author: 'Siddharth Verma',
    role: 'Staff Systems Architect',
    company: 'Vyron Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    country: '🇮🇳 India'
  },
  {
    id: 't-2',
    quote: 'From asking my first question on LangGraph memory to winning the DevTools Hackathon, AI Geeks transformed how I build and deploy agents.',
    author: 'Nandini Iyer',
    role: 'Lead Applied AI Engineer',
    company: 'ScaleMesh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    country: '🇸🇬 Singapore'
  },
  {
    id: 't-3',
    quote: 'The learning paths gave our entire frontend team the confidence to build hardware-accelerated WebGPU canvases in production.',
    author: 'Marcus Vance',
    role: 'VP of Engineering',
    company: 'CloudNative Labs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    country: '🇩🇪 Germany'
  }
];

export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'reaction',
    title: 'Dr. Maya Lin reacted to your post',
    message: 'Reacted with 🔥 on "Building Autonomous Multi-Agent Swarms with Gemini 2.5"',
    time: '20m ago',
    read: false,
    link: 'post-1'
  },
  {
    id: 'notif-2',
    type: 'comment',
    title: 'New comment on your question',
    message: 'Sarah Jenkins replied: "Bypass React state entirely for cursor rendering..."',
    time: '2h ago',
    read: false,
    link: 'q-3'
  },
  {
    id: 'notif-3',
    type: 'badge',
    title: 'New Badge Unlocked: Prolific Writer!',
    message: 'You have earned the Prolific Writer badge for publishing 10+ community articles.',
    time: '1d ago',
    read: true
  },
  {
    id: 'notif-4',
    type: 'event',
    title: 'Flagship DevFest 2026 starts in 3 days!',
    message: 'Your verified pass DF26-9084 is confirmed for Taj Coromandel Gate A.',
    time: '2d ago',
    read: true
  }
];

export const TOP_TAGS = [
  { name: 'LLMs', count: 1420, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  { name: 'Agents', count: 980, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { name: 'Kubernetes', count: 750, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { name: 'React 19', count: 820, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { name: 'WebGPU', count: 540, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  { name: 'Rust', count: 690, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  { name: 'PyTorch', count: 890, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
  { name: 'HuggingFace', count: 610, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' }
];

export const SPONSOR_LOGOS = [
  { name: 'Google for Developers', icon: '🌐' },
  { name: 'Hugging Face', icon: '🤗' },
  { name: 'OpenAI', icon: '🧠' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Anthropic', icon: '⚡' },
  { name: 'Scale AI', icon: '⚖️' }
];
