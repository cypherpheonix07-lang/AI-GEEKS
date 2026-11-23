// src/lib/hackathonEngine.ts

export type RBACRole =
  | "Super Administrator"
  | "Hackathon Administrator"
  | "Organizer"
  | "Evaluator"
  | "Team Leader"
  | "Team Member"
  | "Public Visitor";

// PHASE 03 — 12 CONFIGURABLE TEAM LIFECYCLE STATUSES
export type TeamLifecycleStatus =
  | "Registered"
  | "Pending Verification"
  | "Verified"
  | "Problem Statement Selected"
  | "Development In Progress"
  | "Submission Pending"
  | "Submitted"
  | "Under Review"
  | "Qualified"
  | "Not Qualified"
  | "Finalist"
  | "Winner";

export const ALL_TEAM_LIFECYCLE_STATUSES: TeamLifecycleStatus[] = [
  "Registered",
  "Pending Verification",
  "Verified",
  "Problem Statement Selected",
  "Development In Progress",
  "Submission Pending",
  "Submitted",
  "Under Review",
  "Qualified",
  "Not Qualified",
  "Finalist",
  "Winner",
];

export type ProblemPublicationStatus =
  | "Draft"
  | "Published"
  | "Closed"
  | "Archived";

// PHASE 02 — ANONYMIZED CORE TEAM DEMONSTRATION ENTITY
export interface AnonymizedCoreTeamMember {
  id: string;
  fictionalName: string;
  role: string;
  department: string;
  inChargeOf: string;
  bio: string;
  neutralAvatarSvg: string;
  demoPortfolioUrl: string;
  demoGithubUrl: string;
  demoLinkedinUrl: string;
  isDemonstrationIdentity: true;
  lastEditedBy?: string;
}

// PHASE 08 — 11 REQUIRED DATABASE ENTITIES
export interface HackathonConfiguration {
  allowProblemChangeBeforeDeadline: boolean;
  selectionDeadline: string;
  submissionDeadline: string;
  enforceOneActiveProblemPerTeam: boolean;
  publicSelectionCountsEnabled: boolean;
  configuredStageLabels: Record<TeamLifecycleStatus, string>;
}

export interface Hackathon {
  id: string;
  title: string;
  edition: string;
  description: string;
  status: "Upcoming" | "Active" | "Completed" | "Archived";
  startDate: string;
  endDate: string;
  configuration: HackathonConfiguration;
}

export interface HackathonTeamMember {
  id: string;
  teamId: string;
  name: string;
  role: "Team Leader" | "Frontend Engineer" | "AI Engineer" | "Systems Architect";
  emailPrivate: string;
}

export interface TeamStatusHistory {
  id: string;
  teamId: string;
  hackathonId: string;
  previousStatus: TeamLifecycleStatus | "None";
  newStatus: TeamLifecycleStatus;
  changedBy: string;
  changedByRole: RBACRole;
  reason: string;
  timestamp: string;
}

export interface TeamSubmission {
  id: string;
  teamId: string;
  hackathonId: string;
  problemId: string;
  repositoryUrl: string;
  liveDemoUrl: string;
  architectureSummary: string;
  submittedAt: string;
  version: number;
}

export interface TeamProgressUpdate {
  id: string;
  teamId: string;
  hackathonId: string;
  milestoneTitle: string;
  progressPercent: number;
  workCompleted: string;
  workRemaining: string;
  blockers: string;
  timestamp: string;
  author: string;
}

export interface EvaluatorAssignment {
  id: string;
  hackathonId: string;
  evaluatorName: string;
  assignedTeamId: string;
  assignedAt: string;
}

export interface TeamEvaluation {
  id: string;
  teamId: string;
  hackathonId: string;
  evaluatorName: string;
  architectureScore: number; // 0-25
  problemAlignmentScore: number; // 0-25
  innovationScore: number; // 0-25
  demoExecutionScore: number; // 0-25
  totalScore: number; // 0-100
  feedbackNotes: string;
  evaluatedAt: string;
}

export interface HackathonTeam {
  id: string; // e.g., TEAM-101
  name: string;
  hackathonId: string;
  leaderName: string;
  leaderEmailPrivate: string;
  institution: string;
  memberCount: number;
  members: HackathonTeamMember[];
  selectedProblemId: string | null;
  selectedProblemCode: string | null;
  selectedProblemTitle: string | null;
  registrationDate: string;
  submissionStatus: "Not Submitted" | "Draft" | "Submission Pending" | "Submitted";
  currentReviewStage: "Unassigned" | "Queued" | "In Review" | "Reviewed";
  lifecycleStatus: TeamLifecycleStatus;
  progressPercent: number;
  lastActivity: string;
  assignedReviewer: string;
  eligibilityStatus: "Pending Verification" | "Verified" | "Ineligible";
}

export interface ProblemStatement {
  id: string;
  code: string; // PS-001
  hackathonId: string;
  title: string;
  description: string;
  technicalDomain: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  requiredTechnologies: string[];
  expectedDeliverables: string[];
  evaluationCriteria: string[];
  publishedDate: string;
  status: ProblemPublicationStatus;
  maxAllowedTeams: number;
}

export interface ProblemSelection {
  id: string;
  hackathonId: string;
  teamId: string;
  teamName: string;
  problemId: string;
  problemCode: string;
  status: "ACTIVE" | "TRANSFERRED" | "REVOKED";
  selectedDate: string; // YYYY-MM-DD for trend aggregation
  timestamp: string;
  actor: string;
}

export interface AuditLog {
  id: string;
  hackathonId: string;
  actingUser: string;
  actingRole: RBACRole;
  actionType:
    | "PROBLEM_SELECTED"
    | "PROBLEM_TRANSFERRED"
    | "TEAM_STATUS_UPDATED"
    | "PROBLEM_CREATED"
    | "PROBLEM_UPDATED"
    | "EVALUATION_RECORDED"
    | "CORE_TEAM_CMS_UPDATED"
    | "REPORT_EXPORTED";
  targetRecord: string;
  previousValue: string;
  updatedValue: string;
  timestamp: string;
}

// ============================================================================
// PHASE 02 — SEEDED FICTIONAL CORE TEAM IDENTITIES (ENHANCED COPY ONLY)
// ============================================================================
export const SEEDED_ANONYMIZED_CORE_TEAM: AnonymizedCoreTeamMember[] = [
  {
    id: "ct-demo-01",
    fictionalName: "Aarav Mehta",
    role: "Lead Organizer",
    department: "Architecture & AI",
    inChargeOf: "Platform Architecture, CFP Curation & Technical Roadmaps",
    bio: "Demonstration Identity — Oversees community engineering architecture and hackathon problem curation.",
    neutralAvatarSvg: "/images/team/neutral-placeholder-01.svg",
    demoPortfolioUrl: "https://demo.aigeeks.community/profile/aarav-mehta",
    demoGithubUrl: "https://github.com/example-demo-aarav",
    demoLinkedinUrl: "https://linkedin.com/in/example-demo-aarav",
    isDemonstrationIdentity: true,
  },
  {
    id: "ct-demo-02",
    fictionalName: "Kavya Raman",
    role: "Core team",
    department: "Operations & Venues",
    inChargeOf: "Sponsorship Relations, Enterprise Venues & Partner Alliances",
    bio: "Demonstration Identity — Coordinates venue hosts, sponsors, and regional ecosystem partnerships.",
    neutralAvatarSvg: "/images/team/neutral-placeholder-02.svg",
    demoPortfolioUrl: "https://demo.aigeeks.community/profile/kavya-raman",
    demoGithubUrl: "https://github.com/example-demo-kavya",
    demoLinkedinUrl: "https://linkedin.com/in/example-demo-kavya",
    isDemonstrationIdentity: true,
  },
  {
    id: "ct-demo-03",
    fictionalName: "Ishaan Verma",
    role: "AI Architect",
    department: "Architecture & AI",
    inChargeOf: "24-Hour Software Hackathon Tracks & Judge Coordination",
    bio: "Demonstration Identity — Designs pure-software hackathon problem statements and evaluation rubrics.",
    neutralAvatarSvg: "/images/team/neutral-placeholder-03.svg",
    demoPortfolioUrl: "https://demo.aigeeks.community/profile/ishaan-verma",
    demoGithubUrl: "https://github.com/example-demo-ishaan",
    demoLinkedinUrl: "https://linkedin.com/in/example-demo-ishaan",
    isDemonstrationIdentity: true,
  },
  {
    id: "ct-demo-04",
    fictionalName: "Ananya Rao",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "Web Platform Engineering, GSAP Motion & Design Tokens",
    bio: "Demonstration Identity — Maintains the Sky Metallic Glass UI system and open-source web modules.",
    neutralAvatarSvg: "/images/team/neutral-placeholder-04.svg",
    demoPortfolioUrl: "https://demo.aigeeks.community/profile/ananya-rao",
    demoGithubUrl: "https://github.com/example-demo-ananya",
    demoLinkedinUrl: "https://linkedin.com/in/example-demo-ananya",
    isDemonstrationIdentity: true,
  },
  {
    id: "ct-demo-05",
    fictionalName: "Rohan Iyer",
    role: "Core team",
    department: "Operations & Venues",
    inChargeOf: "Event Production, AV Streaming & Luma Registration Ops",
    bio: "Demonstration Identity — Manages attendee check-in workflows and session recording.",
    neutralAvatarSvg: "/images/team/neutral-placeholder-05.svg",
    demoPortfolioUrl: "https://demo.aigeeks.community/profile/rohan-iyer",
    demoGithubUrl: "https://github.com/example-demo-rohan",
    demoLinkedinUrl: "https://linkedin.com/in/example-demo-rohan",
    isDemonstrationIdentity: true,
  },
  {
    id: "ct-demo-06",
    fictionalName: "Meera Nair",
    role: "Core Team, Emcee",
    department: "Stage & Emcee",
    inChargeOf: "Main Stage Hosting, Fireside Moderation & Audience Q&A",
    bio: "Demonstration Identity — Hosts technical panels and moderates live speaker Q&A sessions.",
    neutralAvatarSvg: "/images/team/neutral-placeholder-06.svg",
    demoPortfolioUrl: "https://demo.aigeeks.community/profile/meera-nair",
    demoGithubUrl: "https://github.com/example-demo-meera",
    demoLinkedinUrl: "https://linkedin.com/in/example-demo-meera",
    isDemonstrationIdentity: true,
  },
  {
    id: "ct-demo-07",
    fictionalName: "Vihaan Shah",
    role: "Core Team, Emcee",
    department: "Stage & Emcee",
    inChargeOf: "Lightning Talk Hosting & First-Time Speaker Coaching",
    bio: "Demonstration Identity — Mentors first-time lightning talk speakers and manages stage timing.",
    neutralAvatarSvg: "/images/team/neutral-placeholder-07.svg",
    demoPortfolioUrl: "https://demo.aigeeks.community/profile/vihaan-shah",
    demoGithubUrl: "https://github.com/example-demo-vihaan",
    demoLinkedinUrl: "https://linkedin.com/in/example-demo-vihaan",
    isDemonstrationIdentity: true,
  },
  {
    id: "ct-demo-08",
    fictionalName: "Diya Menon",
    role: "Core team",
    department: "Architecture & AI",
    inChargeOf: "Frontend & React Curriculum, Hands-On Workshops & Code Clinics",
    bio: "Demonstration Identity — Leads weekend builder labs on Next.js 16 and TypeScript.",
    neutralAvatarSvg: "/images/team/neutral-placeholder-08.svg",
    demoPortfolioUrl: "https://demo.aigeeks.community/profile/diya-menon",
    demoGithubUrl: "https://github.com/example-demo-diya",
    demoLinkedinUrl: "https://linkedin.com/in/example-demo-diya",
    isDemonstrationIdentity: true,
  },
];

// ============================================================================
// INITIAL DATABASE SEED RECORDS FOR ENHANCED COPY
// ============================================================================
export const SEED_HACKATHONS: Hackathon[] = [
  {
    id: "hk-2026-ai-challenge",
    title: "AI GEEKS 24-Hour Pure-Software Hackathon",
    edition: "Winter 2026 Edition",
    description:
      "Flagship 24-hour software hackathon featuring live problem statement selection counters, 12-stage team lifecycle tracking, and multi-evaluator rubric reviews.",
    status: "Active",
    startDate: "2026-12-12",
    endDate: "2026-12-13",
    configuration: {
      allowProblemChangeBeforeDeadline: true,
      selectionDeadline: "2026-12-12T14:00:00Z",
      submissionDeadline: "2026-12-13T08:00:00Z",
      enforceOneActiveProblemPerTeam: true,
      publicSelectionCountsEnabled: true,
      configuredStageLabels: {
        Registered: "1. Registered",
        "Pending Verification": "2. Pending Verification",
        Verified: "3. Verified",
        "Problem Statement Selected": "4. Problem Statement Selected",
        "Development In Progress": "5. Development In Progress",
        "Submission Pending": "6. Submission Pending",
        Submitted: "7. Submitted",
        "Under Review": "8. Under Review",
        Qualified: "9. Qualified",
        "Not Qualified": "10. Not Qualified",
        Finalist: "11. Finalist",
        Winner: "12. Winner",
      },
    },
  },
];

export const SEED_PROBLEMS: ProblemStatement[] = [
  {
    id: "ps-id-001",
    code: "PS-001",
    hackathonId: "hk-2026-ai-challenge",
    title: "AI-Based Real-Time Financial Fraud & Anomaly Detection",
    description:
      "Build a low-latency transaction graph analyzer that flags coordinated synthetic-identity fraud rings with explainable risk evidence.",
    technicalDomain: "Financial Technology & AI",
    difficulty: "Advanced",
    requiredTechnologies: ["TypeScript", "Next.js 16", "Streaming Anomaly Engine"],
    expectedDeliverables: [
      "Live Fraud Triage Console",
      "Explainability Audit Trail",
      "Benchmark Replay Suite",
    ],
    evaluationCriteria: [
      "Precision/Recall on streaming graph",
      "Sub-200ms inference latency",
      "Operator UI clarity",
    ],
    publishedDate: "2026-11-10",
    status: "Published",
    maxAllowedTeams: 4,
  },
  {
    id: "ps-id-002",
    code: "PS-002",
    hackathonId: "hk-2026-ai-challenge",
    title: "Smart Clinical Triage & Citation-Grounded Healthcare Assistant",
    description:
      "Synthesize fragmented patient intake notes and cross-check clinical protocols with zero-hallucination inline medical citations.",
    technicalDomain: "Healthcare Technology",
    difficulty: "Advanced",
    requiredTechnologies: ["RAG Pipeline", "TypeScript", "Vector Indexing"],
    expectedDeliverables: [
      "Clinical Intake Workspace",
      "Citation Verification Engine",
    ],
    evaluationCriteria: [
      "Zero ungrounded claims",
      "Retrieval speed",
      "Clinical workflow ergonomics",
    ],
    publishedDate: "2026-11-10",
    status: "Published",
    maxAllowedTeams: 3,
  },
  {
    id: "ps-id-003",
    code: "PS-003",
    hackathonId: "hk-2026-ai-challenge",
    title: "Zero-Day Supply-Chain & AST Threat Detection Engine",
    description:
      "Inspect dependency lockfiles and abstract syntax trees (ASTs) to quarantine malicious post-install scripts before CI execution.",
    technicalDomain: "Cybersecurity",
    difficulty: "Advanced",
    requiredTechnologies: ["AST Parser", "Node.js", "Sandboxed Runner"],
    expectedDeliverables: ["Security Scanner CLI + Web UI", "Exploit Test Bench"],
    evaluationCriteria: ["Detection accuracy", "Zero false-positive regressions"],
    publishedDate: "2026-11-11",
    status: "Published",
    maxAllowedTeams: 2, // Tight limit to demonstrate capacity enforcement
  },
  {
    id: "ps-id-004",
    code: "PS-004",
    hackathonId: "hk-2026-ai-challenge",
    title: "Intelligent Urban Traffic & Grid Bottleneck Monitor",
    description:
      "Ingest high-frequency municipal mobility telemetry and predict cascading corridor congestion 30 minutes ahead.",
    technicalDomain: "Smart Cities",
    difficulty: "Intermediate",
    requiredTechnologies: ["Next.js", "WebSockets", "Canvas Heatmaps"],
    expectedDeliverables: ["Live Corridor Telemetry Map", "Mitigation Simulator"],
    evaluationCriteria: ["Forecast horizon accuracy", "60fps visualization"],
    publishedDate: "2026-11-12",
    status: "Published",
    maxAllowedTeams: 4,
  },
  {
    id: "ps-id-005",
    code: "PS-005",
    hackathonId: "hk-2026-ai-challenge",
    title: "Generative AI Socratic Code Mentor for Distributed Systems",
    description:
      "Guide engineering students through debugging race conditions and consensus bugs using AST-aware Socratic hints rather than spoilers.",
    technicalDomain: "Educational Technology & Generative AI",
    difficulty: "Intermediate",
    requiredTechnologies: ["React 19", "TypeScript", "Stateful Prompt Orchestrator"],
    expectedDeliverables: ["Interactive Lab Workspace", "Mastery Progression Graph"],
    evaluationCriteria: ["Pedagogical depth", "Hint determinism"],
    publishedDate: "2026-11-12",
    status: "Published",
    maxAllowedTeams: 4,
  },
];

export const SEED_TEAMS: HackathonTeam[] = [
  {
    id: "TEAM-101",
    name: "Neural Sentinel",
    hackathonId: "hk-2026-ai-challenge",
    leaderName: "Vikramaditya Rao",
    leaderEmailPrivate: "vikram@neuralsentinel.demo",
    institution: "IIT Madras Research Park",
    memberCount: 3,
    members: [
      { id: "m-1", teamId: "TEAM-101", name: "Vikramaditya Rao", role: "Team Leader", emailPrivate: "vikram@neuralsentinel.demo" },
      { id: "m-2", teamId: "TEAM-101", name: "Shruti Narayanan", role: "Frontend Engineer", emailPrivate: "shruti@neuralsentinel.demo" },
      { id: "m-3", teamId: "TEAM-101", name: "Pranav Kulkarni", role: "AI Engineer", emailPrivate: "pranav@neuralsentinel.demo" },
    ],
    selectedProblemId: "ps-id-001",
    selectedProblemCode: "PS-001",
    selectedProblemTitle: "AI-Based Real-Time Financial Fraud & Anomaly Detection",
    registrationDate: "2026-11-14",
    submissionStatus: "Submitted",
    currentReviewStage: "Reviewed",
    lifecycleStatus: "Winner",
    progressPercent: 100,
    lastActivity: "2026-11-18 21:15",
    assignedReviewer: "Ishaan Verma",
    eligibilityStatus: "Verified",
  },
  {
    id: "TEAM-102",
    name: "FinGraph Shield",
    hackathonId: "hk-2026-ai-challenge",
    leaderName: "Kiranmayi S",
    leaderEmailPrivate: "kiran@fingraph.demo",
    institution: "Anna University CEG",
    memberCount: 4,
    members: [
      { id: "m-4", teamId: "TEAM-102", name: "Kiranmayi S", role: "Team Leader", emailPrivate: "kiran@fingraph.demo" },
      { id: "m-5", teamId: "TEAM-102", name: "Ritesh B", role: "Systems Architect", emailPrivate: "ritesh@fingraph.demo" },
    ],
    selectedProblemId: "ps-id-001",
    selectedProblemCode: "PS-001",
    selectedProblemTitle: "AI-Based Real-Time Financial Fraud & Anomaly Detection",
    registrationDate: "2026-11-14",
    submissionStatus: "Submitted",
    currentReviewStage: "Reviewed",
    lifecycleStatus: "Finalist",
    progressPercent: 95,
    lastActivity: "2026-11-18 20:40",
    assignedReviewer: "Aarav Mehta",
    eligibilityStatus: "Verified",
  },
  {
    id: "TEAM-103",
    name: "Aegis AST Guard",
    hackathonId: "hk-2026-ai-challenge",
    leaderName: "Aditi Subramanian",
    leaderEmailPrivate: "aditi@aegisguard.demo",
    institution: "MIT Campus Chennai",
    memberCount: 3,
    members: [
      { id: "m-6", teamId: "TEAM-103", name: "Aditi Subramanian", role: "Team Leader", emailPrivate: "aditi@aegisguard.demo" },
    ],
    selectedProblemId: "ps-id-003",
    selectedProblemCode: "PS-003",
    selectedProblemTitle: "Zero-Day Supply-Chain & AST Threat Detection Engine",
    registrationDate: "2026-11-15",
    submissionStatus: "Submitted",
    currentReviewStage: "Reviewed",
    lifecycleStatus: "Qualified",
    progressPercent: 90,
    lastActivity: "2026-11-18 19:50",
    assignedReviewer: "Ishaan Verma",
    eligibilityStatus: "Verified",
  },
  {
    id: "TEAM-104",
    name: "Lockfile Zero",
    hackathonId: "hk-2026-ai-challenge",
    leaderName: "Raghavendra Prasad",
    leaderEmailPrivate: "raghav@lockfilezero.demo",
    institution: "VIT Chennai",
    memberCount: 2,
    members: [
      { id: "m-7", teamId: "TEAM-104", name: "Raghavendra Prasad", role: "Team Leader", emailPrivate: "raghav@lockfilezero.demo" },
    ],
    selectedProblemId: "ps-id-003",
    selectedProblemCode: "PS-003", // Reaches 2/2 Full Capacity on PS-003
    selectedProblemTitle: "Zero-Day Supply-Chain & AST Threat Detection Engine",
    registrationDate: "2026-11-15",
    submissionStatus: "Submission Pending",
    currentReviewStage: "In Review",
    lifecycleStatus: "Under Review",
    progressPercent: 80,
    lastActivity: "2026-11-18 18:30",
    assignedReviewer: "Neha Kapoor",
    eligibilityStatus: "Verified",
  },
  {
    id: "TEAM-105",
    name: "MedGround RAG",
    hackathonId: "hk-2026-ai-challenge",
    leaderName: "Dr. Keerthana S",
    leaderEmailPrivate: "keerthana@medground.demo",
    institution: "SRM Innovation Hub",
    memberCount: 3,
    members: [
      { id: "m-8", teamId: "TEAM-105", name: "Dr. Keerthana S", role: "Team Leader", emailPrivate: "keerthana@medground.demo" },
    ],
    selectedProblemId: "ps-id-002",
    selectedProblemCode: "PS-002",
    selectedProblemTitle: "Smart Clinical Triage & Citation-Grounded Healthcare Assistant",
    registrationDate: "2026-11-16",
    submissionStatus: "Draft",
    currentReviewStage: "Queued",
    lifecycleStatus: "Development In Progress",
    progressPercent: 65,
    lastActivity: "2026-11-18 17:20",
    assignedReviewer: "Diya Menon",
    eligibilityStatus: "Verified",
  },
  {
    id: "TEAM-106",
    name: "Socratic Loop",
    hackathonId: "hk-2026-ai-challenge",
    leaderName: "Sanjana Krishnamurthy",
    leaderEmailPrivate: "sanjana@socraticloop.demo",
    institution: "SSN College of Engineering",
    memberCount: 3,
    members: [
      { id: "m-9", teamId: "TEAM-106", name: "Sanjana Krishnamurthy", role: "Team Leader", emailPrivate: "sanjana@socraticloop.demo" },
    ],
    selectedProblemId: "ps-id-005",
    selectedProblemCode: "PS-005",
    selectedProblemTitle: "Generative AI Socratic Code Mentor for Distributed Systems",
    registrationDate: "2026-11-16",
    submissionStatus: "Draft",
    currentReviewStage: "Queued",
    lifecycleStatus: "Problem Statement Selected",
    progressPercent: 45,
    lastActivity: "2026-11-18 16:10",
    assignedReviewer: "Aarav Mehta",
    eligibilityStatus: "Verified",
  },
  {
    id: "TEAM-107",
    name: "PayStream AI",
    hackathonId: "hk-2026-ai-challenge",
    leaderName: "Harishankar V",
    leaderEmailPrivate: "harish@paystream.demo",
    institution: "TIDEL Builders Collective",
    memberCount: 2,
    members: [
      { id: "m-10", teamId: "TEAM-107", name: "Harishankar V", role: "Team Leader", emailPrivate: "harish@paystream.demo" },
    ],
    selectedProblemId: "ps-id-001",
    selectedProblemCode: "PS-001", // 3rd team on PS-001 (makes PS-001 Most Selected)
    selectedProblemTitle: "AI-Based Real-Time Financial Fraud & Anomaly Detection",
    registrationDate: "2026-11-17",
    submissionStatus: "Not Submitted",
    currentReviewStage: "Unassigned",
    lifecycleStatus: "Development In Progress",
    progressPercent: 55,
    lastActivity: "2026-11-18 15:40",
    assignedReviewer: "Ishaan Verma",
    eligibilityStatus: "Verified",
  },
  {
    id: "TEAM-108",
    name: "Latent Horizon",
    hackathonId: "hk-2026-ai-challenge",
    leaderName: "Abhishek N",
    leaderEmailPrivate: "abhishek@latenthorizon.demo",
    institution: "Chennai Tech Park",
    memberCount: 3,
    members: [
      { id: "m-11", teamId: "TEAM-108", name: "Abhishek N", role: "Team Leader", emailPrivate: "abhishek@latenthorizon.demo" },
    ],
    selectedProblemId: null,
    selectedProblemCode: null, // Verified team without a problem selection yet
    selectedProblemTitle: null,
    registrationDate: "2026-11-17",
    submissionStatus: "Not Submitted",
    currentReviewStage: "Unassigned",
    lifecycleStatus: "Verified",
    progressPercent: 15,
    lastActivity: "2026-11-18 14:00",
    assignedReviewer: "Unassigned",
    eligibilityStatus: "Verified",
  },
  {
    id: "TEAM-109",
    name: "Quantum Flux",
    hackathonId: "hk-2026-ai-challenge",
    leaderName: "Naveen Kumar",
    leaderEmailPrivate: "naveen@quantumflux.demo",
    institution: "St. Joseph's Institute",
    memberCount: 2,
    members: [
      { id: "m-12", teamId: "TEAM-109", name: "Naveen Kumar", role: "Team Leader", emailPrivate: "naveen@quantumflux.demo" },
    ],
    selectedProblemId: null,
    selectedProblemCode: null,
    selectedProblemTitle: null,
    registrationDate: "2026-11-18",
    submissionStatus: "Not Submitted",
    currentReviewStage: "Unassigned",
    lifecycleStatus: "Pending Verification",
    progressPercent: 5,
    lastActivity: "2026-11-18 11:30",
    assignedReviewer: "Unassigned",
    eligibilityStatus: "Pending Verification",
  },
];

export const SEED_SELECTIONS: ProblemSelection[] = [
  {
    id: "sel-101",
    hackathonId: "hk-2026-ai-challenge",
    teamId: "TEAM-101",
    teamName: "Neural Sentinel",
    problemId: "ps-id-001",
    problemCode: "PS-001",
    status: "ACTIVE",
    selectedDate: "2026-11-14",
    timestamp: "2026-11-14T10:15:00Z",
    actor: "Vikramaditya Rao",
  },
  {
    id: "sel-102",
    hackathonId: "hk-2026-ai-challenge",
    teamId: "TEAM-102",
    teamName: "FinGraph Shield",
    problemId: "ps-id-001",
    problemCode: "PS-001",
    status: "ACTIVE",
    selectedDate: "2026-11-14",
    timestamp: "2026-11-14T11:30:00Z",
    actor: "Kiranmayi S",
  },
  {
    id: "sel-103",
    hackathonId: "hk-2026-ai-challenge",
    teamId: "TEAM-103",
    teamName: "Aegis AST Guard",
    problemId: "ps-id-003",
    problemCode: "PS-003",
    status: "ACTIVE",
    selectedDate: "2026-11-15",
    timestamp: "2026-11-15T09:45:00Z",
    actor: "Aditi Subramanian",
  },
  {
    id: "sel-104",
    hackathonId: "hk-2026-ai-challenge",
    teamId: "TEAM-104",
    teamName: "Lockfile Zero",
    problemId: "ps-id-003",
    problemCode: "PS-003",
    status: "ACTIVE",
    selectedDate: "2026-11-15",
    timestamp: "2026-11-15T14:20:00Z",
    actor: "Raghavendra Prasad",
  },
  {
    id: "sel-105",
    hackathonId: "hk-2026-ai-challenge",
    teamId: "TEAM-105",
    teamName: "MedGround RAG",
    problemId: "ps-id-002",
    problemCode: "PS-002",
    status: "ACTIVE",
    selectedDate: "2026-11-16",
    timestamp: "2026-11-16T10:05:00Z",
    actor: "Dr. Keerthana S",
  },
  {
    id: "sel-106",
    hackathonId: "hk-2026-ai-challenge",
    teamId: "TEAM-106",
    teamName: "Socratic Loop",
    problemId: "ps-id-005",
    problemCode: "PS-005",
    status: "ACTIVE",
    selectedDate: "2026-11-16",
    timestamp: "2026-11-16T16:40:00Z",
    actor: "Sanjana Krishnamurthy",
  },
  {
    id: "sel-107",
    hackathonId: "hk-2026-ai-challenge",
    teamId: "TEAM-107",
    teamName: "PayStream AI",
    problemId: "ps-id-001",
    problemCode: "PS-001",
    status: "ACTIVE",
    selectedDate: "2026-11-17",
    timestamp: "2026-11-17T12:10:00Z",
    actor: "Harishankar V",
  },
];

export const SEED_SUBMISSIONS: TeamSubmission[] = [
  {
    id: "sub-101-v1",
    teamId: "TEAM-101",
    hackathonId: "hk-2026-ai-challenge",
    problemId: "ps-id-001",
    repositoryUrl: "https://github.com/demo/neural-sentinel",
    liveDemoUrl: "https://demo.neural-sentinel.aigeeks.io",
    architectureSummary: "Low-latency transaction graph analyzer with streaming anomaly engine.",
    submittedAt: "2026-11-18T18:30:00Z",
    version: 1,
  },
  {
    id: "sub-101-v2",
    teamId: "TEAM-101",
    hackathonId: "hk-2026-ai-challenge",
    problemId: "ps-id-001",
    repositoryUrl: "https://github.com/demo/neural-sentinel",
    liveDemoUrl: "https://demo.neural-sentinel.aigeeks.io",
    architectureSummary: "Deterministic multi-agent fraud graph with sub-150ms latency and explainable risk evidence.",
    submittedAt: "2026-11-18T21:15:00Z",
    version: 2,
  },
  {
    id: "sub-102-v1",
    teamId: "TEAM-102",
    hackathonId: "hk-2026-ai-challenge",
    problemId: "ps-id-001",
    repositoryUrl: "https://github.com/demo/fingraph-shield",
    liveDemoUrl: "https://fingraph.demo.aigeeks.io",
    architectureSummary: "High-precision anomaly replay bench with graph convolutional network and sky glass UI.",
    submittedAt: "2026-11-18T20:40:00Z",
    version: 1,
  },
  {
    id: "sub-103-v1",
    teamId: "TEAM-103",
    hackathonId: "hk-2026-ai-challenge",
    problemId: "ps-id-003",
    repositoryUrl: "https://github.com/demo/aegis-ast-guard",
    liveDemoUrl: "https://aegis-guard.demo.aigeeks.io",
    architectureSummary: "AST dependency scanner isolating malicious post-install lifecycle scripts.",
    submittedAt: "2026-11-18T19:50:00Z",
    version: 1,
  },
  {
    id: "sub-104-v1",
    teamId: "TEAM-104",
    hackathonId: "hk-2026-ai-challenge",
    problemId: "ps-id-003",
    repositoryUrl: "https://github.com/demo/lockfile-zero",
    liveDemoUrl: "https://lockfile-zero.demo.aigeeks.io",
    architectureSummary: "Zero-day supply chain scanner analyzing AST diffs across lockfile updates.",
    submittedAt: "2026-11-18T18:15:00Z",
    version: 1,
  },
  {
    id: "sub-105-v1",
    teamId: "TEAM-105",
    hackathonId: "hk-2026-ai-challenge",
    problemId: "ps-id-002",
    repositoryUrl: "https://github.com/demo/medground-rag",
    liveDemoUrl: "https://medground.demo.aigeeks.io",
    architectureSummary: "Clinical intake workspace with citation-grounded healthcare assistant.",
    submittedAt: "2026-11-18T17:10:00Z",
    version: 1,
  },
  {
    id: "sub-106-v1",
    teamId: "TEAM-106",
    hackathonId: "hk-2026-ai-challenge",
    problemId: "ps-id-005",
    repositoryUrl: "https://github.com/demo/socratic-loop",
    liveDemoUrl: "https://socratic.demo.aigeeks.io",
    architectureSummary: "Stateful prompt orchestrator for distributed systems code mentoring.",
    submittedAt: "2026-11-18T16:05:00Z",
    version: 1,
  },
];

export const SEED_PROGRESS_UPDATES: TeamProgressUpdate[] = [
  {
    id: "prog-101",
    teamId: "TEAM-101",
    hackathonId: "hk-2026-ai-challenge",
    milestoneTitle: "Final Deployment & Latency Benchmarks",
    progressPercent: 100,
    workCompleted: "Benchmarked 12,000 tx/sec throughput and published demo.",
    workRemaining: "None",
    blockers: "None",
    timestamp: "2026-11-18T21:15:00Z",
    author: "Vikramaditya Rao",
  },
  {
    id: "prog-102",
    teamId: "TEAM-102",
    hackathonId: "hk-2026-ai-challenge",
    milestoneTitle: "Explainability Audit UI Integration",
    progressPercent: 95,
    workCompleted: "Integrated interactive SHAP value explainability drawer in Next.js.",
    workRemaining: "Final documentation polish.",
    blockers: "None",
    timestamp: "2026-11-18T20:40:00Z",
    author: "Kiranmayi S",
  },
  {
    id: "prog-103",
    teamId: "TEAM-103",
    hackathonId: "hk-2026-ai-challenge",
    milestoneTitle: "AST Sandboxing Engine",
    progressPercent: 90,
    workCompleted: "Implemented WebAssembly sandbox for dynamic threat simulation.",
    workRemaining: "Test bench edge cases.",
    blockers: "None",
    timestamp: "2026-11-18T19:50:00Z",
    author: "Aditi Subramanian",
  },
  {
    id: "prog-104",
    teamId: "TEAM-104",
    hackathonId: "hk-2026-ai-challenge",
    milestoneTitle: "Lockfile Diff Engine",
    progressPercent: 80,
    workCompleted: "Lockfile parser and dependency graph builder completed.",
    workRemaining: "Integration with sandboxed runner.",
    blockers: "Memory overhead under 50k nested deps",
    timestamp: "2026-11-18T18:30:00Z",
    author: "Raghavendra Prasad",
  },
  {
    id: "prog-105",
    teamId: "TEAM-105",
    hackathonId: "hk-2026-ai-challenge",
    milestoneTitle: "Citation Verification Engine",
    progressPercent: 65,
    workCompleted: "Vector embeddings and RAG retrieval pipeline connected.",
    workRemaining: "Clinical workflow UI ergonomics.",
    blockers: "None",
    timestamp: "2026-11-18T17:20:00Z",
    author: "Dr. Keerthana S",
  },
  {
    id: "prog-106",
    teamId: "TEAM-106",
    hackathonId: "hk-2026-ai-challenge",
    milestoneTitle: "Socratic Hint Engine",
    progressPercent: 45,
    workCompleted: "Configured LLM prompt templates and stateful conversational agent.",
    workRemaining: "Interactive lab workspace canvas.",
    blockers: "None",
    timestamp: "2026-11-18T16:10:00Z",
    author: "Sanjana Krishnamurthy",
  },
  {
    id: "prog-107",
    teamId: "TEAM-107",
    hackathonId: "hk-2026-ai-challenge",
    milestoneTitle: "Data Ingestion Pipeline",
    progressPercent: 55,
    workCompleted: "Synthetic credit card fraud dataset ingestion stream running.",
    workRemaining: "Graph anomaly detection model training.",
    blockers: "None",
    timestamp: "2026-11-18T15:40:00Z",
    author: "Harishankar V",
  },
  {
    id: "prog-108",
    teamId: "TEAM-108",
    hackathonId: "hk-2026-ai-challenge",
    milestoneTitle: "Team Onboarding & Track Selection",
    progressPercent: 15,
    workCompleted: "Completed team verification; ready to lock primary problem statement.",
    workRemaining: "Selecting problem statement and setting up repository.",
    blockers: "None",
    timestamp: "2026-11-18T14:00:00Z",
    author: "Abhishek N",
  },
];

// ============================================================================
// PHASE 05 — DATABASE-BACKED PROBLEM STATEMENT SELECTION COUNTER & ANALYTICS
// ============================================================================
export interface ProblemSelectionCountRow {
  problemId: string;
  code: string;
  title: string;
  technicalDomain: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: ProblemPublicationStatus;
  teamsSelectedCount: number; // Derived strictly from ACTIVE database records
  maxAllowedTeams: number;
  remainingCapacity: number;
  distributionPercentage: number;
  isFullCapacity: boolean;
  selectedTeamsList: HackathonTeam[];
}

export interface SelectionAnalyticsSnapshot {
  totalProblemStatements: number;
  publishedProblemStatements: number;
  totalRegisteredTeams: number;
  teamsWithSelectedProblem: number;
  teamsWithoutSelection: number;
  mostSelectedProblem: { code: string; title: string; count: number } | null;
  leastSelectedProblem: { code: string; title: string; count: number } | null;
  problemRows: ProblemSelectionCountRow[];
  selectionHistoryByDate: { date: string; count: number }[];
}

export function computeProblemSelectionAnalytics(
  hackathonId: string,
  problems: ProblemStatement[],
  teams: HackathonTeam[],
  selections: ProblemSelection[]
): SelectionAnalyticsSnapshot {
  const eventProblems = problems.filter((p) => p.hackathonId === hackathonId);
  const publishedProblems = eventProblems.filter(
    (p) => p.status === "Published"
  );
  const eventTeams = teams.filter((t) => t.hackathonId === hackathonId);
  const activeSelections = selections.filter(
    (s) => s.hackathonId === hackathonId && s.status === "ACTIVE"
  );

  const distinctSelectedTeamIds = new Set(
    activeSelections.map((s) => s.teamId)
  );
  const teamsWithSelectedProblem = distinctSelectedTeamIds.size;
  const teamsWithoutSelection = Math.max(
    0,
    eventTeams.length - teamsWithSelectedProblem
  );

  const problemRows: ProblemSelectionCountRow[] = publishedProblems.map(
    (prob) => {
      const teamIdsForProblem = new Set(
        activeSelections
          .filter((s) => s.problemId === prob.id)
          .map((s) => s.teamId)
      );
      const teamsSelectedCount = teamIdsForProblem.size;
      const remainingCapacity = Math.max(
        0,
        prob.maxAllowedTeams - teamsSelectedCount
      );
      const distributionPercentage =
        teamsWithSelectedProblem > 0
          ? Number(
              ((teamsSelectedCount / teamsWithSelectedProblem) * 100).toFixed(1)
            )
          : 0;

      const selectedTeamsList = eventTeams.filter((t) =>
        teamIdsForProblem.has(t.id)
      );

      return {
        problemId: prob.id,
        code: prob.code,
        title: prob.title,
        technicalDomain: prob.technicalDomain,
        difficulty: prob.difficulty,
        status: prob.status,
        teamsSelectedCount,
        maxAllowedTeams: prob.maxAllowedTeams,
        remainingCapacity,
        distributionPercentage,
        isFullCapacity: teamsSelectedCount >= prob.maxAllowedTeams,
        selectedTeamsList,
      };
    }
  );

  const sorted = [...problemRows].sort(
    (a, b) => b.teamsSelectedCount - a.teamsSelectedCount
  );

  const mostSelectedProblem =
    sorted.length > 0
      ? {
          code: sorted[0].code,
          title: sorted[0].title,
          count: sorted[0].teamsSelectedCount,
        }
      : null;

  const leastSelectedProblem =
    sorted.length > 0
      ? {
          code: sorted[sorted.length - 1].code,
          title: sorted[sorted.length - 1].title,
          count: sorted[sorted.length - 1].teamsSelectedCount,
        }
      : null;

  // Aggregate selection activity by date (Trend Chart)
  const dateMap = new Map<string, number>();
  for (const sel of activeSelections) {
    dateMap.set(sel.selectedDate, (dateMap.get(sel.selectedDate) || 0) + 1);
  }
  const selectionHistoryByDate = Array.from(dateMap.entries())
    .sort(([d1], [d2]) => d1.localeCompare(d2))
    .map(([date, count]) => ({ date, count }));

  return {
    totalProblemStatements: eventProblems.length,
    publishedProblemStatements: publishedProblems.length,
    totalRegisteredTeams: eventTeams.length,
    teamsWithSelectedProblem,
    teamsWithoutSelection,
    mostSelectedProblem,
    leastSelectedProblem,
    problemRows,
    selectionHistoryByDate,
  };
}
