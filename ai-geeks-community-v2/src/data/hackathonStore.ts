// src/data/hackathonStore.ts

export type UserRole =
  | "Super Administrator"
  | "Hackathon Administrator"
  | "Event Organizer"
  | "Judge"
  | "Team Leader"
  | "Team Member"
  | "Public Visitor";

export type RegistrationStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Canceled";

export type ProblemSelectionStatus =
  | "Not Started"
  | "Awaiting Selection"
  | "Selection Pending Approval"
  | "Problem Selected"
  | "Selection Locked"
  | "Selection Canceled";

export type DevelopmentStatus =
  | "Not Started"
  | "Idea Submitted"
  | "Development Started"
  | "In Progress"
  | "Blocked"
  | "Development Completed";

export type SubmissionStatus =
  | "Not Submitted"
  | "Draft"
  | "Submission Pending"
  | "Submitted"
  | "Revision Requested"
  | "Final Submission Completed"
  | "Submission Closed";

export type EvaluationStatus =
  | "Not Evaluated"
  | "Under Review"
  | "Evaluation In Progress"
  | "Evaluated"
  | "Qualified"
  | "Not Qualified"
  | "Shortlisted"
  | "Finalist";

export type CompetitionOutcome =
  | "Pending"
  | "Winner"
  | "Runner-Up"
  | "Finalist"
  | "Completed"
  | "Not Selected"
  | "Disqualified"
  | "Withdrawn";

export interface WeightedMilestone {
  id: string;
  label: string;
  weightPercent: number;
}

export interface HackathonEventConfig {
  id: string;
  title: string;
  edition: string;
  description: string;
  lifecycle: "UPCOMING" | "ACTIVE" | "COMPLETED";
  startsAt: string;
  endsAt: string;
  timezone: string;
  registrationDeadline: string;
  selectionDeadline: string;
  submissionDeadline: string;
  weightedMilestones: WeightedMilestone[];
}

export interface TeamMemberInfo {
  id: string;
  name: string;
  role: string;
  email?: string;
}

export interface TeamEvaluationScore {
  totalScore: number;
  architectureScore: number;
  alignmentScore: number;
  innovationScore: number;
  demoUxScore: number;
  judgeName: string;
  evaluatedAt: string;
  remarks: string;
}

export interface ActivityItem {
  time: string;
  event: string;
  actor: string;
}

export interface HackathonTeamRecord {
  id: string;
  hackathonId: string;
  name: string;
  institution: string;
  leaderName: string;
  leaderEmailPrivate: string;
  members: TeamMemberInfo[];
  selectedProblemId?: string;
  selectedProblemCode?: string;
  registrationStatus: RegistrationStatus;
  problemSelectionStatus: ProblemSelectionStatus;
  developmentStatus: DevelopmentStatus;
  currentMilestoneLabel: string;
  activeBlocker?: string;
  submissionStatus: SubmissionStatus;
  evaluationStatus: EvaluationStatus;
  competitionOutcome: CompetitionOutcome;
  evaluation?: TeamEvaluationScore;
  adminRemarks?: string;
  githubRepoUrl?: string;
  liveDemoUrl?: string;
  activityTimeline: ActivityItem[];
  lastUpdated: string;
}

export interface ProblemStatementItem {
  id: string;
  hackathonId: string;
  code: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  shortDescription: string;
  expectedDeliverables: string[];
  maxCapacity: number;
  publicationStatus: "Draft" | "Published" | "Archived";
  selectionAvailable: boolean;
}

export interface ProblemSelectionRecord {
  id: string;
  hackathonId: string;
  teamId: string;
  problemId: string;
  problemCode: string;
  status: "ACTIVE" | "SUPERSEDED" | "CANCELED" | "PENDING_APPROVAL";
  isPrimary: boolean;
  selectedAt: string;
  actorName: string;
  reason?: string;
}

export interface StatusHistoryEntry {
  id: string;
  teamId: string;
  hackathonId: string;
  dimension: string;
  previousStatus: string;
  newStatus: string;
  actor: string;
  timestamp: string;
  isOverride?: boolean;
  reason: string;
}

export interface ProblemBreakdownItem {
  problemId: string;
  code: string;
  title: string;
  category: string;
  difficulty: string;
  selectedTeamsCount: number;
  selectionSharePercent: number;
  maxCapacity: number;
  remainingCapacity: number;
  capacityUtilizationPercent: number;
  isFullCapacity: boolean;
  assignedTeams: HackathonTeamRecord[];
}

export interface DomainPopularityItem {
  category: string;
  count: number;
  sharePercent: number;
}

export interface HackathonIntelligenceSummary {
  totalRegisteredTeams: number;
  totalEligibleTeams: number;
  totalApprovedTeams: number;
  totalProblemStatements: number;
  publishedProblemStatements: number;
  availableProblemStatements: number;
  teamsWithActiveSelection: number;
  teamsWithoutActiveSelection: number;
  selectionConversionRatePercent: number;
  mostSelectedProblem?: { code: string; count: number };
  leastSelectedProblem?: { code: string; count: number };
  zeroSelectionStatementsCount: number;
  fullCapacityStatementsCount: number;
  totalRemainingCapacity: number;
  averageSelectionsPerSelectedStatement: number;
  problemBreakdown: ProblemBreakdownItem[];
  domainPopularity: DomainPopularityItem[];
}

export const HACKATHON_EVENTS: HackathonEventConfig[] = [
  {
    id: "hack-2026-flagship",
    title: "AI GEEKS 24-Hour Pure-Software Hackathon",
    edition: "2026 Flagship Edition",
    description:
      "Enterprise hackathon arena featuring pure-software tracks across autonomous LLM triage agents, Next.js 16 streaming UIs, RAG pipelines, and open-source devtools.",
    lifecycle: "ACTIVE",
    startsAt: "2026-12-12T09:00:00Z",
    endsAt: "2026-12-13T09:00:00Z",
    timezone: "Asia/Kolkata (IST)",
    registrationDeadline: "2026-12-05T23:59:59Z",
    selectionDeadline: "2026-12-10T18:00:00Z",
    submissionDeadline: "2026-12-13T08:00:00Z",
    weightedMilestones: [
      { id: "ms-1", label: "Team Registration & Idea Inception", weightPercent: 15 },
      { id: "ms-2", label: "Problem Statement Selection & RFC", weightPercent: 20 },
      { id: "ms-3", label: "Core Architecture & Data Pipeline", weightPercent: 30 },
      { id: "ms-4", label: "Final Deployment & Video Pitch", weightPercent: 35 },
    ],
  },
  {
    id: "hack-2027-spring",
    title: "AI GEEKS Spring Code Sprint 2027",
    edition: "Spring 2027",
    description:
      "High-velocity weekend hackathon focused on small-parameter local models and WebGPU browser inference.",
    lifecycle: "UPCOMING",
    startsAt: "2027-03-20T09:00:00Z",
    endsAt: "2027-03-21T09:00:00Z",
    timezone: "Asia/Kolkata (IST)",
    registrationDeadline: "2027-03-10T23:59:59Z",
    selectionDeadline: "2027-03-15T18:00:00Z",
    submissionDeadline: "2027-03-21T08:00:00Z",
    weightedMilestones: [
      { id: "ms-1", label: "Project Initiation", weightPercent: 20 },
      { id: "ms-2", label: "Model Architecture Selection", weightPercent: 25 },
      { id: "ms-3", label: "Browser Inference Engine", weightPercent: 30 },
      { id: "ms-4", label: "Benchmark & Documentation", weightPercent: 25 },
    ],
  },
];

export const INITIAL_PROBLEM_STATEMENTS: ProblemStatementItem[] = [
  {
    id: "prob-001",
    hackathonId: "hack-2026-flagship",
    code: "PS-001",
    title: "Autonomous Clinical Triage & Differential Diagnosis Agent",
    category: "Healthcare Technology",
    difficulty: "Advanced",
    shortDescription:
      "Multi-agent clinical decision support pipeline grounding LLM diagnostic hypotheses with SNOMED CT and PubMed verified citations.",
    expectedDeliverables: [
      "Next.js 16 streaming consultation dashboard",
      "Deterministic citation verification engine",
      "Multi-agent supervisor graph",
    ],
    maxCapacity: 4,
    publicationStatus: "Published",
    selectionAvailable: true,
  },
  {
    id: "prob-002",
    hackathonId: "hack-2026-flagship",
    code: "PS-002",
    title: "Adaptive Municipal Traffic Grid & Congestion Simulator",
    category: "Smart Cities",
    difficulty: "Intermediate",
    shortDescription:
      "Real-time sensor stream ingestion with predictive vehicle queuing models and dynamic traffic light cycle optimization.",
    expectedDeliverables: [
      "Interactive 2D/3D corridor simulation",
      "Dynamic phase adjustment algorithms",
      "Telemetry telemetry websocket feed",
    ],
    maxCapacity: 4,
    publicationStatus: "Published",
    selectionAvailable: true,
  },
  {
    id: "prob-003",
    hackathonId: "hack-2026-flagship",
    code: "PS-003",
    title: "Zero-Day Memory Vulnerability & Binary Exploit Sentinel",
    category: "Cybersecurity",
    difficulty: "Expert",
    shortDescription:
      "Autonomous binary disassembler with symbolic execution and AST heuristic taint analysis for zero-day memory corruption detection.",
    expectedDeliverables: [
      "AST & disassembly inspector UI",
      "Automated proof-of-concept generator",
      "CVE telemetry correlation pipeline",
    ],
    maxCapacity: 3,
    publicationStatus: "Published",
    selectionAvailable: true,
  },
  {
    id: "prob-004",
    hackathonId: "hack-2026-flagship",
    code: "PS-004",
    title: "Multimodal Socratic Tutor with Real-Time Knowledge Graph",
    category: "Educational Technology",
    difficulty: "Intermediate",
    shortDescription:
      "Interactive pedagogy engine that guides learners through conceptual milestones using active questioning and concept maps.",
    expectedDeliverables: [
      "Generative canvas concept graph",
      "Speech-to-speech Socratic dialogue loop",
      "Student mastery progression tracker",
    ],
    maxCapacity: 4,
    publicationStatus: "Published",
    selectionAvailable: true,
  },
  {
    id: "prob-005",
    hackathonId: "hack-2026-flagship",
    code: "PS-005",
    title: "Autonomous Monorepo Bug Reproduction & AST Triage Agent",
    category: "Generative AI",
    difficulty: "Advanced",
    shortDescription:
      "Self-healing developer tool combining ts-morph AST codemods with LLM reasoning to deterministically reproduce CI/CD failures.",
    expectedDeliverables: [
      "CLI runner with GitHub Actions workflow",
      "AST mutation visualizer",
      "Deterministic sandbox test harness",
    ],
    maxCapacity: 4,
    publicationStatus: "Published",
    selectionAvailable: true,
  },
  {
    id: "prob-006",
    hackathonId: "hack-2026-flagship",
    code: "PS-006",
    title: "Decentralized Carbon Offset Verification & Auditing Ledger",
    category: "Sustainability",
    difficulty: "Advanced",
    shortDescription:
      "Satellite imagery segmentation coupled with IoT soil moisture verification to cryptographically validate reforestation credits.",
    expectedDeliverables: [
      "Remote sensing spectral mask viewer",
      "Cryptographic audit log verification",
      "Open credit marketplace interface",
    ],
    maxCapacity: 4,
    publicationStatus: "Published",
    selectionAvailable: true,
  },
];

export const INITIAL_TEAMS: HackathonTeamRecord[] = [
  {
    id: "TEAM-101",
    hackathonId: "hack-2026-flagship",
    name: "Autonomous Triage Lab",
    institution: "IIT Madras Research Park",
    leaderName: "Aarav Mehta",
    leaderEmailPrivate: "aarav.mehta@demo.aigeeks.community",
    members: [
      { id: "mem-1", name: "Aarav Mehta", role: "Team Leader" },
      { id: "mem-2", name: "Kavya Raman", role: "AI Systems Lead" },
      { id: "mem-3", name: "Ishaan Verma", role: "AST Parser Lead" },
    ],
    selectedProblemId: "prob-005",
    selectedProblemCode: "PS-005",
    registrationStatus: "Approved",
    problemSelectionStatus: "Problem Selected",
    developmentStatus: "Development Completed",
    currentMilestoneLabel: "Final Deployment & Video Pitch",
    submissionStatus: "Final Submission Completed",
    evaluationStatus: "Evaluated",
    competitionOutcome: "Winner",
    evaluation: {
      totalScore: 97,
      architectureScore: 25,
      alignmentScore: 25,
      innovationScore: 24,
      demoUxScore: 23,
      judgeName: "Ishaan Verma",
      evaluatedAt: "2026-11-17T14:30:00Z",
      remarks: "Flawless AST execution with deterministic regression snapshots.",
    },
    adminRemarks: "Grand Prize Winner · First place overall.",
    githubRepoUrl: "https://github.com/aigeeks/reprostate",
    liveDemoUrl: "https://reprostate.demo.aigeeks.in",
    activityTimeline: [
      { time: "09:00", event: "Team registered and confirmed", actor: "Aarav Mehta" },
      { time: "09:15", event: "Registration approved by organizer", actor: "Rohan Iyer" },
      { time: "09:30", event: "Selected problem statement PS-005", actor: "Aarav Mehta" },
      { time: "18:00", event: "Final project submission completed", actor: "Aarav Mehta" },
      { time: "20:00", event: "Evaluated by judging panel (97/100)", actor: "Ishaan Verma" },
    ],
    lastUpdated: "2026-11-17T20:00:00Z",
  },
  {
    id: "TEAM-102",
    hackathonId: "hack-2026-flagship",
    name: "SkyGlass Systems",
    institution: "Thoughtworks Olympus",
    leaderName: "Dhanush Kandhan",
    leaderEmailPrivate: "dhanush@demo.aigeeks.community",
    members: [
      { id: "mem-4", name: "Dhanush Kandhan", role: "Team Leader" },
      { id: "mem-5", name: "Shanthi Palani", role: "Frontend Architect" },
      { id: "mem-6", name: "Navin Balaji", role: "Motion Designer" },
    ],
    selectedProblemId: "prob-001",
    selectedProblemCode: "PS-001",
    registrationStatus: "Approved",
    problemSelectionStatus: "Problem Selected",
    developmentStatus: "Development Completed",
    currentMilestoneLabel: "Final Deployment & Video Pitch",
    submissionStatus: "Final Submission Completed",
    evaluationStatus: "Evaluated",
    competitionOutcome: "Runner-Up",
    evaluation: {
      totalScore: 94,
      architectureScore: 24,
      alignmentScore: 24,
      innovationScore: 23,
      demoUxScore: 23,
      judgeName: "Ishaan Verma",
      evaluatedAt: "2026-11-17T15:10:00Z",
      remarks: "Exceptional UI architecture with streaming metallic glass components.",
    },
    adminRemarks: "2nd Place Winner · Best UI Architecture.",
    githubRepoUrl: "https://github.com/aigeeks/vyron-studio",
    liveDemoUrl: "https://vyron.demo.aigeeks.in",
    activityTimeline: [
      { time: "09:10", event: "Team registered", actor: "Dhanush Kandhan" },
      { time: "09:20", event: "Registration approved", actor: "Rohan Iyer" },
      { time: "09:40", event: "Selected problem statement PS-001", actor: "Dhanush Kandhan" },
      { time: "18:15", event: "Submitted repository and demo", actor: "Dhanush Kandhan" },
      { time: "20:30", event: "Evaluated (94/100)", actor: "Ishaan Verma" },
    ],
    lastUpdated: "2026-11-17T20:30:00Z",
  },
  {
    id: "TEAM-103",
    hackathonId: "hack-2026-flagship",
    name: "Sub-20ms Collective",
    institution: "IIT Madras",
    leaderName: "Surya Venkat",
    leaderEmailPrivate: "surya@demo.aigeeks.community",
    members: [
      { id: "mem-7", name: "Surya Venkat", role: "Team Leader" },
      { id: "mem-8", name: "Arun Kumar V", role: "Infra Engineer" },
    ],
    selectedProblemId: "prob-005",
    selectedProblemCode: "PS-005",
    registrationStatus: "Approved",
    problemSelectionStatus: "Problem Selected",
    developmentStatus: "Development Completed",
    currentMilestoneLabel: "Final Deployment & Video Pitch",
    submissionStatus: "Final Submission Completed",
    evaluationStatus: "Evaluated",
    competitionOutcome: "Finalist",
    evaluation: {
      totalScore: 91,
      architectureScore: 24,
      alignmentScore: 23,
      innovationScore: 22,
      demoUxScore: 22,
      judgeName: "Kavya Raman",
      evaluatedAt: "2026-11-17T15:40:00Z",
      remarks: "Outstanding latency optimizations with sub-20ms vector indexing.",
    },
    adminRemarks: "3rd Place · Best Infrastructure Engineering.",
    githubRepoUrl: "https://github.com/aigeeks/vectorpulse",
    liveDemoUrl: "https://vectorpulse.demo.aigeeks.in",
    activityTimeline: [
      { time: "09:25", event: "Team registered", actor: "Surya Venkat" },
      { time: "09:30", event: "Approved by organizer", actor: "Rohan Iyer" },
      { time: "09:45", event: "Selected problem statement PS-005", actor: "Surya Venkat" },
      { time: "17:45", event: "Final deliverables submitted", actor: "Surya Venkat" },
    ],
    lastUpdated: "2026-11-17T18:00:00Z",
  },
  {
    id: "TEAM-104",
    hackathonId: "hack-2026-flagship",
    name: "ZeroDrift Builders",
    institution: "Anna University CEG",
    leaderName: "Jai Saravanan",
    leaderEmailPrivate: "jai@demo.aigeeks.community",
    members: [
      { id: "mem-9", name: "Jai Saravanan", role: "Team Leader" },
      { id: "mem-10", name: "Namma Hari", role: "Full-Stack Dev" },
      { id: "mem-11", name: "Sarvesh M Rao", role: "CLI Engineer" },
    ],
    selectedProblemId: "prob-002",
    selectedProblemCode: "PS-002",
    registrationStatus: "Approved",
    problemSelectionStatus: "Problem Selected",
    developmentStatus: "Development Completed",
    currentMilestoneLabel: "Final Deployment & Video Pitch",
    submissionStatus: "Final Submission Completed",
    evaluationStatus: "Evaluated",
    competitionOutcome: "Finalist",
    evaluation: {
      totalScore: 89,
      architectureScore: 23,
      alignmentScore: 23,
      innovationScore: 21,
      demoUxScore: 22,
      judgeName: "Kavya Raman",
      evaluatedAt: "2026-11-17T16:00:00Z",
      remarks: "Very clean CLI runner and automated GitHub Actions verification.",
    },
    adminRemarks: "Community Choice Winner.",
    githubRepoUrl: "https://github.com/aigeeks/repoverify",
    liveDemoUrl: "https://repoverify.demo.aigeeks.in",
    activityTimeline: [
      { time: "09:30", event: "Team registered", actor: "Jai Saravanan" },
      { time: "09:35", event: "Approved", actor: "Rohan Iyer" },
      { time: "10:00", event: "Selected PS-002", actor: "Jai Saravanan" },
      { time: "17:30", event: "Submitted", actor: "Jai Saravanan" },
    ],
    lastUpdated: "2026-11-17T18:00:00Z",
  },
  {
    id: "TEAM-105",
    hackathonId: "hack-2026-flagship",
    name: "Neural Nexus",
    institution: "SSN College of Engineering",
    leaderName: "Aditya Joshi",
    leaderEmailPrivate: "aditya@demo.aigeeks.community",
    members: [
      { id: "mem-12", name: "Aditya Joshi", role: "Team Leader" },
      { id: "mem-13", name: "Priya Sundaram", role: "ML Engineer" },
    ],
    selectedProblemId: "prob-004",
    selectedProblemCode: "PS-004",
    registrationStatus: "Approved",
    problemSelectionStatus: "Problem Selected",
    developmentStatus: "In Progress",
    currentMilestoneLabel: "Core Architecture & Data Pipeline",
    submissionStatus: "Draft",
    evaluationStatus: "Under Review",
    competitionOutcome: "Pending",
    activityTimeline: [
      { time: "10:00", event: "Registered", actor: "Aditya Joshi" },
      { time: "10:15", event: "Approved", actor: "Rohan Iyer" },
      { time: "10:45", event: "Selected PS-004", actor: "Aditya Joshi" },
    ],
    lastUpdated: "2026-11-17T12:00:00Z",
  },
  {
    id: "TEAM-106",
    hackathonId: "hack-2026-flagship",
    name: "CyberSentinels",
    institution: "SRM Institute of Science & Tech",
    leaderName: "Nikhil Sen",
    leaderEmailPrivate: "nikhil.sen@demo.aigeeks.community",
    members: [
      { id: "mem-14", name: "Nikhil Sen", role: "Team Leader" },
      { id: "mem-15", name: "Sneha Reddy", role: "SecOps Lead" },
    ],
    selectedProblemId: "prob-003",
    selectedProblemCode: "PS-003",
    registrationStatus: "Approved",
    problemSelectionStatus: "Problem Selected",
    developmentStatus: "In Progress",
    currentMilestoneLabel: "Core Architecture & Data Pipeline",
    submissionStatus: "Draft",
    evaluationStatus: "Not Evaluated",
    competitionOutcome: "Pending",
    activityTimeline: [
      { time: "10:30", event: "Registered", actor: "Nikhil Sen" },
      { time: "10:45", event: "Approved", actor: "Rohan Iyer" },
      { time: "11:00", event: "Selected PS-003", actor: "Nikhil Sen" },
    ],
    lastUpdated: "2026-11-17T13:00:00Z",
  },
  {
    id: "TEAM-107",
    hackathonId: "hack-2026-flagship",
    name: "GreenLedger Alliance",
    institution: "Loyola-ICAM College",
    leaderName: "Tarun Varma",
    leaderEmailPrivate: "tarun@demo.aigeeks.community",
    members: [
      { id: "mem-16", name: "Tarun Varma", role: "Team Leader" },
      { id: "mem-17", name: "Anjali Nair", role: "Data Engineer" },
    ],
    selectedProblemId: "prob-006",
    selectedProblemCode: "PS-006",
    registrationStatus: "Approved",
    problemSelectionStatus: "Problem Selected",
    developmentStatus: "In Progress",
    currentMilestoneLabel: "Core Architecture & Data Pipeline",
    submissionStatus: "Draft",
    evaluationStatus: "Not Evaluated",
    competitionOutcome: "Pending",
    activityTimeline: [
      { time: "11:00", event: "Registered", actor: "Tarun Varma" },
      { time: "11:15", event: "Approved", actor: "Rohan Iyer" },
      { time: "11:30", event: "Selected PS-006", actor: "Tarun Varma" },
    ],
    lastUpdated: "2026-11-17T14:00:00Z",
  },
  {
    id: "TEAM-108",
    hackathonId: "hack-2026-flagship",
    name: "HyperScale Hackers",
    institution: "Vellore Institute of Technology",
    leaderName: "Vikramaditya Rao",
    leaderEmailPrivate: "vikram@demo.aigeeks.community",
    members: [
      { id: "mem-18", name: "Vikramaditya Rao", role: "Team Leader" },
      { id: "mem-19", name: "Karthik Narayanan", role: "Systems Engineer" },
    ],
    registrationStatus: "Approved",
    problemSelectionStatus: "Awaiting Selection",
    developmentStatus: "Not Started",
    currentMilestoneLabel: "Problem Statement Selection & RFC",
    submissionStatus: "Not Submitted",
    evaluationStatus: "Not Evaluated",
    competitionOutcome: "Pending",
    activityTimeline: [
      { time: "11:30", event: "Registered and approved", actor: "Vikramaditya Rao" },
      { time: "11:45", event: "Browsing problem statements", actor: "Vikramaditya Rao" },
    ],
    lastUpdated: "2026-11-17T15:00:00Z",
  },
];

export const INITIAL_SELECTION_RECORDS: ProblemSelectionRecord[] = [
  {
    id: "sel-01",
    hackathonId: "hack-2026-flagship",
    teamId: "TEAM-101",
    problemId: "prob-005",
    problemCode: "PS-005",
    status: "ACTIVE",
    isPrimary: true,
    selectedAt: "2026-11-16T09:30:00Z",
    actorName: "Aarav Mehta",
  },
  {
    id: "sel-02",
    hackathonId: "hack-2026-flagship",
    teamId: "TEAM-102",
    problemId: "prob-001",
    problemCode: "PS-001",
    status: "ACTIVE",
    isPrimary: true,
    selectedAt: "2026-11-16T09:40:00Z",
    actorName: "Dhanush Kandhan",
  },
  {
    id: "sel-03",
    hackathonId: "hack-2026-flagship",
    teamId: "TEAM-103",
    problemId: "prob-005",
    problemCode: "PS-005",
    status: "ACTIVE",
    isPrimary: true,
    selectedAt: "2026-11-16T09:45:00Z",
    actorName: "Surya Venkat",
  },
  {
    id: "sel-04",
    hackathonId: "hack-2026-flagship",
    teamId: "TEAM-104",
    problemId: "prob-002",
    problemCode: "PS-002",
    status: "ACTIVE",
    isPrimary: true,
    selectedAt: "2026-11-16T10:00:00Z",
    actorName: "Jai Saravanan",
  },
  {
    id: "sel-05",
    hackathonId: "hack-2026-flagship",
    teamId: "TEAM-105",
    problemId: "prob-004",
    problemCode: "PS-004",
    status: "ACTIVE",
    isPrimary: true,
    selectedAt: "2026-11-16T10:45:00Z",
    actorName: "Aditya Joshi",
  },
  {
    id: "sel-06",
    hackathonId: "hack-2026-flagship",
    teamId: "TEAM-106",
    problemId: "prob-003",
    problemCode: "PS-003",
    status: "ACTIVE",
    isPrimary: true,
    selectedAt: "2026-11-16T11:00:00Z",
    actorName: "Nikhil Sen",
  },
  {
    id: "sel-07",
    hackathonId: "hack-2026-flagship",
    teamId: "TEAM-107",
    problemId: "prob-006",
    problemCode: "PS-006",
    status: "ACTIVE",
    isPrimary: true,
    selectedAt: "2026-11-16T11:30:00Z",
    actorName: "Tarun Varma",
  },
];

/**
 * Calculates weighted milestone completion percentage for a team (0 to 100).
 */
export function calculateTeamMilestonePercentage(
  team: HackathonTeamRecord,
  hackathon: HackathonEventConfig
): number {
  if (team.submissionStatus === "Final Submission Completed") return 100;
  if (team.developmentStatus === "Development Completed") return 85;
  if (team.developmentStatus === "In Progress") return 65;
  if (team.developmentStatus === "Development Started") return 45;
  if (team.developmentStatus === "Idea Submitted" || team.problemSelectionStatus === "Problem Selected") return 35;
  if (team.registrationStatus === "Approved") return 15;
  return 0;
}

/**
 * Live 22-Metric Problem Statement Selection Intelligence & Telemetry Calculator (Phase 11)
 */
export function computeHackathonIntelligence(
  hackathonId: string,
  teams: HackathonTeamRecord[],
  problems: ProblemStatementItem[],
  selections: ProblemSelectionRecord[]
): HackathonIntelligenceSummary {
  const eventTeams = teams.filter((t) => t.hackathonId === hackathonId);
  const eventProblems = problems.filter((p) => p.hackathonId === hackathonId);
  const eventSelections = selections.filter((s) => s.hackathonId === hackathonId);

  const totalRegisteredTeams = eventTeams.length;
  const approvedTeams = eventTeams.filter((t) => t.registrationStatus === "Approved");
  const totalApprovedTeams = approvedTeams.length;
  const totalEligibleTeams = totalApprovedTeams;

  const totalProblemStatements = eventProblems.length;
  const publishedProblemStatements = eventProblems.filter(
    (p) => p.publicationStatus === "Published"
  ).length;
  const availableProblemStatements = eventProblems.filter(
    (p) => p.publicationStatus === "Published" && p.selectionAvailable
  ).length;

  // Active primary selections
  const activePrimarySelections = eventSelections.filter(
    (s) => s.status === "ACTIVE" && s.isPrimary
  );

  // Distinct teams with active selections
  const distinctSelectedTeamIds = new Set(
    activePrimarySelections.map((s) => s.teamId)
  );
  const teamsWithActiveSelection = distinctSelectedTeamIds.size;
  const teamsWithoutActiveSelection = Math.max(
    0,
    totalEligibleTeams - teamsWithActiveSelection
  );

  const selectionConversionRatePercent =
    totalEligibleTeams > 0
      ? Number(
          ((teamsWithActiveSelection / totalEligibleTeams) * 100).toFixed(1)
        )
      : 0;

  // Build problem breakdown
  const problemBreakdown: ProblemBreakdownItem[] = eventProblems.map((prob) => {
    const teamsAssigned = activePrimarySelections
      .filter((s) => s.problemId === prob.id)
      .map((s) => eventTeams.find((t) => t.id === s.teamId)!)
      .filter(Boolean);

    const count = teamsAssigned.length;
    const share =
      teamsWithActiveSelection > 0
        ? Number(((count / teamsWithActiveSelection) * 100).toFixed(1))
        : 0;
    const remaining = Math.max(0, prob.maxCapacity - count);
    const util = Number(((count / prob.maxCapacity) * 100).toFixed(1));

    return {
      problemId: prob.id,
      code: prob.code,
      title: prob.title,
      category: prob.category,
      difficulty: prob.difficulty,
      selectedTeamsCount: count,
      selectionSharePercent: share,
      maxCapacity: prob.maxCapacity,
      remainingCapacity: remaining,
      capacityUtilizationPercent: util,
      isFullCapacity: count >= prob.maxCapacity,
      assignedTeams: teamsAssigned,
    };
  });

  // Calculate most / least selected
  const sortedByCount = [...problemBreakdown].sort(
    (a, b) => b.selectedTeamsCount - a.selectedTeamsCount
  );
  const mostSelectedProblem =
    sortedByCount[0] && sortedByCount[0].selectedTeamsCount > 0
      ? { code: sortedByCount[0].code, count: sortedByCount[0].selectedTeamsCount }
      : undefined;

  const leastSelectedProblem =
    sortedByCount.length > 0
      ? {
          code: sortedByCount[sortedByCount.length - 1].code,
          count: sortedByCount[sortedByCount.length - 1].selectedTeamsCount,
        }
      : undefined;

  const zeroSelectionStatementsCount = problemBreakdown.filter(
    (p) => p.selectedTeamsCount === 0
  ).length;
  const fullCapacityStatementsCount = problemBreakdown.filter(
    (p) => p.isFullCapacity
  ).length;
  const totalRemainingCapacity = problemBreakdown.reduce(
    (sum, p) => sum + p.remainingCapacity,
    0
  );

  const selectedProblemsCount = problemBreakdown.filter(
    (p) => p.selectedTeamsCount > 0
  ).length;
  const averageSelectionsPerSelectedStatement =
    selectedProblemsCount > 0
      ? Number((teamsWithActiveSelection / selectedProblemsCount).toFixed(1))
      : 0;

  // Domain popularity
  const categoryCounts: Record<string, number> = {};
  for (const item of problemBreakdown) {
    categoryCounts[item.category] =
      (categoryCounts[item.category] || 0) + item.selectedTeamsCount;
  }
  const domainPopularity: DomainPopularityItem[] = Object.entries(
    categoryCounts
  ).map(([category, count]) => ({
    category,
    count,
    sharePercent:
      teamsWithActiveSelection > 0
        ? Number(((count / teamsWithActiveSelection) * 100).toFixed(1))
        : 0,
  }));

  return {
    totalRegisteredTeams,
    totalEligibleTeams,
    totalApprovedTeams,
    totalProblemStatements,
    publishedProblemStatements,
    availableProblemStatements,
    teamsWithActiveSelection,
    teamsWithoutActiveSelection,
    selectionConversionRatePercent,
    mostSelectedProblem,
    leastSelectedProblem,
    zeroSelectionStatementsCount,
    fullCapacityStatementsCount,
    totalRemainingCapacity,
    averageSelectionsPerSelectedStatement,
    problemBreakdown,
    domainPopularity,
  };
}
