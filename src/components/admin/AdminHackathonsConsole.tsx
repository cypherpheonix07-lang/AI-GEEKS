"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInternalAccess } from "@/components/providers/InternalAccessProvider";
import {
  ShieldCheck,
  BarChart3,
  Layers,
  Users,
  CheckCircle2,
  AlertTriangle,
  Search,
  Plus,
  History,
  UserCheck,
  X,
  Download,
  Sliders,
  ArrowRightLeft,
  FolderGit2,
  ClipboardCheck,
  ExternalLink,
  Github,
  Save,
  RefreshCw,
  GitCommit,
  Activity,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  SEED_HACKATHONS,
  SEED_PROBLEMS,
  SEED_TEAMS,
  SEED_SELECTIONS,
  SEED_SUBMISSIONS,
  SEED_PROGRESS_UPDATES,
  SEEDED_ANONYMIZED_CORE_TEAM,
  ALL_TEAM_LIFECYCLE_STATUSES,
  RBACRole,
  TeamLifecycleStatus,
  ProblemStatement,
  HackathonTeam,
  ProblemSelection,
  TeamSubmission,
  TeamProgressUpdate,
  TeamStatusHistory,
  AuditLog,
  AnonymizedCoreTeamMember,
  computeProblemSelectionAnalytics,
} from "@/lib/hackathonEngine";

export type AdminViewTab =
  | "analytics"
  | "teams"
  | "problems"
  | "submissions"
  | "reviews"
  | "settings"
  | "core-team-cms"
  | "audit-history";

export interface AdminHackathonsConsoleProps {
  initialHackathonId?: string;
  initialTab?: AdminViewTab;
}

const RBAC_ROLES: RBACRole[] = [
  "Super Administrator",
  "Hackathon Administrator",
  "Organizer",
  "Evaluator",
  "Team Leader",
  "Team Member",
  "Public Visitor",
];

const DONUT_COLORS = [
  "#C4EEFF",
  "#80D8FF",
  "#4DA8DA",
  "#2B6CB0",
  "#163B63",
];

export default function AdminHackathonsConsole({
  initialHackathonId = "hk-2026-ai-challenge",
  initialTab = "analytics",
}: AdminHackathonsConsoleProps) {
  const router = useRouter();

  const {
    session: rbacSession,
    isInternalAccessGranted,
    policy,
    rbacDirectory,
    grantRoleBasedInternalAccess,
  } = useInternalAccess();

  const [rbacGateMemberId, setRbacGateMemberId] = useState<string>(
    rbacDirectory[0]?.memberId ?? "ct-demo-01"
  );
  const [rbacGateRole, setRbacGateRole] = useState<RBACRole>(
    rbacDirectory[0]?.rbacRole ?? "Super Administrator"
  );

  const [activeHackathonId, setActiveHackathonId] = useState<string>(
    initialHackathonId || "hk-2026-ai-challenge"
  );
  const [activeRole, setActiveRole] = useState<RBACRole>("Super Administrator");
  const [activeTab, setActiveTab] = useState<AdminViewTab>(initialTab);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    if (rbacSession?.rbacRole) {
      setActiveRole(rbacSession.rbacRole);
    }
  }, [rbacSession?.rbacRole]);

  const [problems, setProblems] = useState<ProblemStatement[]>(SEED_PROBLEMS);
  const [teams, setTeams] = useState<HackathonTeam[]>(SEED_TEAMS);
  const [selections, setSelections] =
    useState<ProblemSelection[]>(SEED_SELECTIONS);
  const [submissions, setSubmissions] =
    useState<TeamSubmission[]>(SEED_SUBMISSIONS);
  const [progressUpdates, setProgressUpdates] = useState<TeamProgressUpdate[]>(
    SEED_PROGRESS_UPDATES
  );
  const [statusHistory, setStatusHistory] = useState<TeamStatusHistory[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [coreTeamCms, setCoreTeamCms] = useState<AnonymizedCoreTeamMember[]>(
    SEEDED_ANONYMIZED_CORE_TEAM
  );

  // Problem Analytics & Filter State
  const [problemFilterQuery, setProblemFilterQuery] = useState("");
  const [selectedProblemForBreakdown, setSelectedProblemForBreakdown] =
    useState<string>("PS-001");

  // Team Status Filter State
  const [teamSearchQuery, setTeamSearchQuery] = useState("");
  const [lifecycleFilter, setLifecycleFilter] = useState<string>("All");
  const [problemCodeFilter, setProblemCodeFilter] = useState<string>("All");
  const [actingTeamId, setActingTeamId] = useState<string>("TEAM-108");

  // Submissions Tab Filter & Revision Drawer State
  const [submissionStatusFilter, setSubmissionStatusFilter] =
    useState<string>("All");
  const [expandedRevisionTeams, setExpandedRevisionTeams] = useState<
    Record<string, boolean>
  >({});

  // Evaluator Review Rubric State
  const [evaluatingTeamId, setEvaluatingTeamId] = useState<string>("TEAM-101");
  const [archScore, setArchScore] = useState<number>(24);
  const [alignScore, setAlignScore] = useState<number>(24);
  const [innovScore, setInnovScore] = useState<number>(23);
  const [demoScore, setDemoScore] = useState<number>(23);
  const [evaluatorNotes, setEvaluatorNotes] = useState<string>("");
  const [savedEvaluations, setSavedEvaluations] = useState<
    Record<
      string,
      {
        total: number;
        architecture: number;
        alignment: number;
        innovation: number;
        demoUx: number;
        evaluator: string;
        notes: string;
        updatedAt: string;
      }
    >
  >({
    "TEAM-101": {
      total: 96,
      architecture: 24,
      alignment: 25,
      innovation: 24,
      demoUx: 23,
      evaluator: "Ishaan Verma",
      notes: "Deterministic multi-agent fraud graph with sub-150ms latency.",
      updatedAt: "2026-11-18 21:15",
    },
    "TEAM-102": {
      total: 92,
      architecture: 23,
      alignment: 24,
      innovation: 23,
      demoUx: 22,
      evaluator: "Aarav Mehta",
      notes: "High-precision anomaly replay bench and clean glass UI.",
      updatedAt: "2026-11-18 20:40",
    },
  });

  // Hackathon Settings State
  const [selectionDeadlineInput, setSelectionDeadlineInput] = useState(
    "2026-12-12T14:00"
  );
  const [submissionDeadlineInput, setSubmissionDeadlineInput] = useState(
    "2026-12-13T08:00"
  );
  const [allowProblemTransfer, setAllowProblemTransfer] = useState(true);
  const [publicSelectionCounts, setPublicSelectionCounts] = useState(true);

  // Create Problem Modal State
  const [showCreateProblemModal, setShowCreateProblemModal] = useState(false);
  const [newProbCode, setNewProbCode] = useState("");
  const [newProbTitle, setNewProbTitle] = useState("");
  const [newProbDomain, setNewProbDomain] = useState("Artificial Intelligence");
  const [newProbDesc, setNewProbDesc] = useState("");
  const [newProbMaxTeams, setNewProbMaxTeams] = useState(4);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (initialHackathonId) {
      setActiveHackathonId(initialHackathonId);
    }
  }, [initialHackathonId]);

  // Unified Backend State Sync (Hydrates live Team Portal submissions & progress updates)
  const syncLiveBackendState = useCallback(
    async (showSuccessToast = false) => {
      setIsSyncing(true);
      try {
        const res = await fetch(
          `/api/admin/hackathons?hackathonId=${activeHackathonId}`,
          {
            headers: { "x-ag-rbac-role": activeRole },
          }
        );
        const data = await res.json();
        if (data.ok) {
          setProblems(data.problems);
          setTeams(data.teams);
          setSelections(data.selections);
          if (Array.isArray(data.submissions)) {
            setSubmissions(data.submissions);
          }
          if (Array.isArray(data.progressUpdates)) {
            setProgressUpdates(data.progressUpdates);
          }
          setStatusHistory(data.statusHistory || []);
          setAuditLogs(data.auditLogs || []);
          setCoreTeamCms(data.coreTeamCms || SEEDED_ANONYMIZED_CORE_TEAM);
          if (showSuccessToast) {
            setToast({
              type: "success",
              text: `Synced ${data.submissions?.length ?? 0} live submission revisions and ${
                data.progressUpdates?.length ?? 0
              } milestone updates from /team-portal.`,
            });
          }
        }
      } catch {
        // Retain local seed state if offline
      } finally {
        setIsSyncing(false);
      }
    },
    [activeHackathonId, activeRole]
  );

  useEffect(() => {
    syncLiveBackendState(false);
  }, [syncLiveBackendState]);

  // Index submissions by teamId sorted newest version first
  const submissionsByTeam = useMemo(() => {
    const map = new Map<string, TeamSubmission[]>();
    for (const sub of submissions) {
      const list = map.get(sub.teamId) || [];
      list.push(sub);
      map.set(sub.teamId, list);
    }
    for (const [key, list] of map.entries()) {
      map.set(
        key,
        [...list].sort((a, b) => b.version - a.version)
      );
    }
    return map;
  }, [submissions]);

  // Index milestone progress updates by teamId sorted newest first
  const progressByTeam = useMemo(() => {
    const map = new Map<string, TeamProgressUpdate[]>();
    for (const prog of progressUpdates) {
      const list = map.get(prog.teamId) || [];
      list.push(prog);
      map.set(prog.teamId, list);
    }
    for (const [key, list] of map.entries()) {
      map.set(
        key,
        [...list].sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      );
    }
    return map;
  }, [progressUpdates]);

  const analytics = useMemo(
    () =>
      computeProblemSelectionAnalytics(
        activeHackathonId,
        problems,
        teams,
        selections
      ),
    [activeHackathonId, problems, teams, selections]
  );

  const activeProblemBreakdown = useMemo(
    () =>
      analytics.problemRows.find(
        (r) => r.code === selectedProblemForBreakdown
      ) || analytics.problemRows[0],
    [analytics, selectedProblemForBreakdown]
  );

  const isAdminOrOrganizer =
    activeRole === "Super Administrator" ||
    activeRole === "Hackathon Administrator" ||
    activeRole === "Organizer";

  const canEvaluate = isAdminOrOrganizer || activeRole === "Evaluator";

  const handleSubRouteSelect = (tab: AdminViewTab) => {
    setActiveTab(tab);
    const routeMap: Record<AdminViewTab, string> = {
      analytics: `/admin/hackathons/${activeHackathonId}/analytics`,
      teams: `/admin/hackathons/${activeHackathonId}/teams`,
      problems: `/admin/hackathons/${activeHackathonId}/problems`,
      submissions: `/admin/hackathons/${activeHackathonId}/submissions`,
      reviews: `/admin/hackathons/${activeHackathonId}/reviews`,
      settings: `/admin/hackathons/${activeHackathonId}/settings`,
      "core-team-cms": `/admin/hackathons/${activeHackathonId}`,
      "audit-history": `/admin/hackathons/${activeHackathonId}`,
    };
    router.push(routeMap[tab], { scroll: false });
  };

  const handleSelectOrTransferProblem = async (
    teamId: string,
    problemId: string
  ) => {
    const res = await fetch("/api/admin/hackathons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "SELECT_OR_TRANSFER_PROBLEM",
        hackathonId: activeHackathonId,
        actingUser: `Aarav Mehta (${activeRole})`,
        actingRole: activeRole,
        teamId,
        problemId,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      setToast({
        type: "error",
        text: data.error || "Problem selection failed.",
      });
      return;
    }
    setProblems(data.problems);
    setTeams(data.teams);
    setSelections(data.selections);
    setStatusHistory(data.statusHistory || []);
    setAuditLogs(data.auditLogs || []);
    setToast({
      type: "success",
      text: `Updated problem assignment for ${teamId}. Chosen problem counts recalculated from active database selections.`,
    });
  };

  const handleUpdateTeamStatus = async (
    teamId: string,
    newStatus: TeamLifecycleStatus,
    assignedReviewer?: string
  ) => {
    const res = await fetch("/api/admin/hackathons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "UPDATE_TEAM_LIFECYCLE_STATUS",
        hackathonId: activeHackathonId,
        actingUser: `Aarav Mehta (${activeRole})`,
        actingRole: activeRole,
        teamId,
        newStatus,
        assignedReviewer,
        reason: `Transitioned to '${newStatus}' via Admin Console`,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      setToast({ type: "error", text: data.error || "Status update denied." });
      return;
    }
    setTeams(data.teams);
    setStatusHistory(data.statusHistory || []);
    setAuditLogs(data.auditLogs || []);
    setToast({
      type: "success",
      text: `Team ${teamId} status updated to '${newStatus}'.`,
    });
  };

  const handleCreateProblem = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/hackathons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "CREATE_PROBLEM_STATEMENT",
        hackathonId: activeHackathonId,
        actingUser: `Aarav Mehta (${activeRole})`,
        actingRole: activeRole,
        code: newProbCode,
        title: newProbTitle,
        technicalDomain: newProbDomain,
        description: newProbDesc,
        maxAllowedTeams: newProbMaxTeams,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      setToast({ type: "error", text: data.error });
      return;
    }
    setProblems(data.problems);
    setAuditLogs(data.auditLogs || []);
    setNewProbCode("");
    setNewProbTitle("");
    setNewProbDesc("");
    setShowCreateProblemModal(false);
    setToast({
      type: "success",
      text: "Published new problem statement to catalog.",
    });
  };

  const handleSaveEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEvaluate) {
      setToast({
        type: "error",
        text: "RBAC 403: Only Evaluators, Organizers, or Administrators may submit review scores.",
      });
      return;
    }
    const total = archScore + alignScore + innovScore + demoScore;
    setSavedEvaluations((prev) => ({
      ...prev,
      [evaluatingTeamId]: {
        total,
        architecture: archScore,
        alignment: alignScore,
        innovation: innovScore,
        demoUx: demoScore,
        evaluator: `Ishaan Verma (${activeRole})`,
        notes:
          evaluatorNotes.trim() ||
          "Evaluated against 4-pillar technical rubric.",
        updatedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      },
    }));

    const promotedStage: TeamLifecycleStatus =
      total >= 90 ? "Finalist" : total >= 75 ? "Qualified" : "Under Review";
    await handleUpdateTeamStatus(
      evaluatingTeamId,
      promotedStage,
      `Ishaan Verma (${activeRole})`
    );
    setEvaluatorNotes("");
    setToast({
      type: "success",
      text: `Recorded evaluation (${total}/100) for ${evaluatingTeamId} and updated stage to '${promotedStage}'.`,
    });
  };

  const handleExportSelectionCountsCsv = () => {
    const header =
      "Problem ID,Problem Title,Technical Domain,Difficulty,Teams Selected,Distribution %,Max Capacity,Remaining Capacity,Assigned Team IDs\n";
    const lines = analytics.problemRows
      .map(
        (r) =>
          `"${r.code}","${r.title.replace(/"/g, '""')}","${
            r.technicalDomain
          }","${r.difficulty}",${r.teamsSelectedCount},${
            r.distributionPercentage
          }%,${r.maxAllowedTeams},${r.remainingCapacity},"${r.selectedTeamsList
            .map((t) => t.id)
            .join(" | ")}"`
      )
      .join("\n");
    const blob = new Blob([`\uFEFF${header}${lines}`], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aigeeks-problem-selection-counts-${activeHackathonId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredProblemRows = analytics.problemRows.filter(
    (row) =>
      row.code.toLowerCase().includes(problemFilterQuery.toLowerCase()) ||
      row.title.toLowerCase().includes(problemFilterQuery.toLowerCase()) ||
      row.technicalDomain
        .toLowerCase()
        .includes(problemFilterQuery.toLowerCase())
  );

  const filteredTeams = teams.filter((team) => {
    const matchesStatus =
      lifecycleFilter === "All" || team.lifecycleStatus === lifecycleFilter;
    const matchesProb =
      problemCodeFilter === "All" ||
      (problemCodeFilter === "UNASSIGNED"
        ? !team.selectedProblemCode
        : team.selectedProblemCode === problemCodeFilter);
    const matchesText =
      team.id.toLowerCase().includes(teamSearchQuery.toLowerCase()) ||
      team.name.toLowerCase().includes(teamSearchQuery.toLowerCase()) ||
      team.leaderName.toLowerCase().includes(teamSearchQuery.toLowerCase());
    return matchesStatus && matchesProb && matchesText;
  });

  const filteredSubmissionTeams = useMemo(() => {
    return teams.filter((team) => {
      if (submissionStatusFilter === "All") return true;
      return team.submissionStatus === submissionStatusFilter;
    });
  }, [teams, submissionStatusFilter]);

  // Active team being reviewed in Sub-Route 5 (Reviews)
  const reviewingTeam = useMemo(
    () => teams.find((t) => t.id === evaluatingTeamId) || teams[0],
    [teams, evaluatingTeamId]
  );
  const reviewingTeamSubs = useMemo(
    () => (reviewingTeam ? submissionsByTeam.get(reviewingTeam.id) || [] : []),
    [reviewingTeam, submissionsByTeam]
  );
  const reviewingTeamLogs = useMemo(
    () => (reviewingTeam ? progressByTeam.get(reviewingTeam.id) || [] : []),
    [reviewingTeam, progressByTeam]
  );

  const activeBlockersCount = useMemo(() => {
    let count = 0;
    for (const logs of progressByTeam.values()) {
      if (logs[0] && logs[0].blockers.toLowerCase() !== "none") {
        count++;
      }
    }
    return count;
  }, [progressByTeam]);

  // If internal access is required and not granted, render the Core Team Verification Gate
  if (policy.requireInternalPassForAdmin && !isInternalAccessGranted) {
    return (
      <div className="min-h-[82vh] bg-[#020813] py-20 px-4 sm:px-6 text-slate-100 flex items-center justify-center">
        <div className="glass-panel relative w-full max-w-xl overflow-hidden rounded-3xl p-8 sm:p-10 space-y-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
          />

          <div className="flex items-center justify-between">
            <span className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-mono text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span>CORE TEAM RBAC ACCESS REQUIRED</span>
            </span>
            <Link
              href="/settings"
              className="font-mono text-xs text-[#80D8FF] hover:text-[#C4EEFF] underline"
            >
              Open Settings →
            </Link>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Core Team Role Access
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Select your Core Team identity and RBAC permission role to grant
              internal access to{" "}
              <code>
                /admin/hackathons/{activeHackathonId}/{activeTab}
              </code>
              .
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              grantRoleBasedInternalAccess({
                memberId: rbacGateMemberId,
                rbacRole: rbacGateRole,
              });
            }}
            className="space-y-4"
          >
            <div>
              <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                Core Team Member
              </label>
              <select
                value={rbacGateMemberId}
                onChange={(e) => setRbacGateMemberId(e.target.value)}
                className="ag-input-metallic w-full rounded-xl px-4 py-3 text-xs font-bold text-[#C4EEFF]"
              >
                {rbacDirectory.map((m) => (
                  <option key={m.memberId} value={m.memberId}>
                    {m.displayName} — {m.role} ({m.department})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                RBAC Role
              </label>
              <select
                value={rbacGateRole}
                onChange={(e) => setRbacGateRole(e.target.value as RBACRole)}
                className="ag-input-metallic w-full rounded-xl px-4 py-3 text-xs font-bold text-white"
              >
                <option value="Super Administrator">Super Administrator</option>
                <option value="Hackathon Administrator">
                  Hackathon Administrator
                </option>
                <option value="Organizer">Organizer</option>
                <option value="Evaluator">Evaluator</option>
              </select>
            </div>

            <button
              type="submit"
              className="ag-btn-primary w-full rounded-xl py-3.5 text-xs font-bold uppercase tracking-wider"
            >
              Grant Internal Access via RBAC
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020813] py-16 px-4 sm:px-6 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ====================================================================
            TOP ADMIN HEADER, BREADCRUMB & SERVER RBAC ROLE SWITCHER
           ==================================================================== */}
        <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-mono text-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#80D8FF]" />
                  <span>
                    /admin/hackathons/{activeHackathonId}/{activeTab}
                  </span>
                </span>
                <Link
                  className="rounded-full bg-[#051020] px-3 py-1 font-mono text-[11px] text-[#80D8FF] hover:text-[#C4EEFF]"
                  href="/team-portal"
                >
                  Participant Team Portal →
                </Link>
              </div>

              <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Hackathon Admin &amp;{" "}
                <span className="ag-text-gradient">
                  Problem Selection Counter.
                </span>
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-300">
                Active Scope:{" "}
                <strong className="text-[#C4EEFF]">
                  {SEED_HACKATHONS[0].title}
                </strong>{" "}
                ({activeHackathonId}) · Live synced with{" "}
                <code>/team-portal</code> submissions &amp; milestones.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => syncLiveBackendState(true)}
                disabled={isSyncing}
                className="ag-btn-secondary inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-bold"
              >
                <RefreshCw
                  className={`h-4 w-4 text-[#80D8FF] ${
 isSyncing ? "animate-spin" : ""
 }`}
                />
                <span>{isSyncing ? "Syncing..." : "Sync Portal Data"}</span>
              </button>

              <div className="rounded-2xl bg-[#051020] p-3">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#80D8FF] mb-1">
                  Active RBAC Session Role
                </label>
                <select
                  value={activeRole}
                  onChange={(e) => setActiveRole(e.target.value as RBACRole)}
                  className="ag-input-metallic rounded-xl px-3 py-2 text-xs font-bold text-[#C4EEFF]"
                >
                  {RBAC_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Deep-Linked Sub-Route Navigation Bar */}
          <div className="mt-8 flex flex-wrap gap-2 pt-6">
            {(
              [
                {
                  id: "analytics",
                  label: "1. Analytics & Chosen Counts",
                  icon: BarChart3,
                },
                {
                  id: "teams",
                  label: "2. Teams (12 Lifecycle Stages)",
                  icon: Users,
                },
                {
                  id: "problems",
                  label: "3. Problems & Transfers",
                  icon: Layers,
                },
                {
                  id: "submissions",
                  label: `4. Submissions (${submissions.length})`,
                  icon: FolderGit2,
                },
                {
                  id: "reviews",
                  label: "5. Evaluator Reviews",
                  icon: ClipboardCheck,
                },
                {
                  id: "settings",
                  label: "6. Settings & Deadlines",
                  icon: Sliders,
                },
                {
                  id: "core-team-cms",
                  label: "7. Core Team CMS",
                  icon: UserCheck,
                },
                {
                  id: "audit-history",
                  label: "8. Audit Logs",
                  icon: History,
                },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSubRouteSelect(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all ${
 isSelected ? "ag-btn-primary" : "ag-btn-secondary"
 }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Toast Alert */}
        {toast && (
          <div
            className={`flex items-center justify-between rounded-2xl px-5 py-4 text-sm ${
 toast.type === "success"
 ? "bg-[#163B63]/80 text-[#C4EEFF]"
 : "bg-amber-950/80 text-amber-200"
 }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-[#80D8FF] shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-300 shrink-0" />
              )}
              <span>{toast.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="font-mono text-xs underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ====================================================================
            SUB-ROUTE 1: /admin/hackathons/[id]/analytics
           ==================================================================== */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  label: "Total Problems",
                  val: analytics.totalProblemStatements,
                  sub: `${analytics.publishedProblemStatements} Published`,
                },
                {
                  label: "Registered Teams",
                  val: analytics.totalRegisteredTeams,
                  sub: "In Active Hackathon",
                },
                {
                  label: "Teams With Selection",
                  val: analytics.teamsWithSelectedProblem,
                  sub: "1 Active Problem / Team",
                },
                {
                  label: "Without Selection",
                  val: analytics.teamsWithoutSelection,
                  sub: "Awaiting Problem Lock",
                },
                {
                  label: "Most Selected",
                  val: analytics.mostSelectedProblem?.code || "N/A",
                  sub: `${analytics.mostSelectedProblem?.count || 0} Teams Chosen`,
                },
                {
                  label: "Least Selected",
                  val: analytics.leastSelectedProblem?.code || "N/A",
                  sub: `${analytics.leastSelectedProblem?.count || 0} Teams Chosen`,
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="glass-panel relative overflow-hidden rounded-2xl p-5"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/75 to-transparent"
                  />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF]">
                    {card.label}
                  </p>
                  <p className="mt-2 text-3xl font-extrabold ag-text-gradient">
                    {card.val}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-slate-300">
                    {card.sub}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
                  <div>
                    <span className="font-mono text-xs uppercase text-[#80D8FF]">
                      LIVE DATABASE-AGGREGATED SELECTION COUNTER
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                      Number of Teams Choosing Each Problem Statement
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAdminOrOrganizer && (
                      <button
                        type="button"
                        onClick={() => setShowCreateProblemModal(true)}
                        className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>New Problem</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleExportSelectionCountsCsv}
                      className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold"
                    >
                      <Download className="h-3.5 w-3.5 text-[#80D8FF]" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#80D8FF]" />
                  <input
                    type="text"
                    value={problemFilterQuery}
                    onChange={(e) => setProblemFilterQuery(e.target.value)}
                    placeholder="Filter by Problem ID (PS-001), title, or domain..."
                    className="ag-input-metallic w-full rounded-xl pl-10 pr-4 py-2 text-xs"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="font-mono text-[11px] uppercase text-[#80D8FF]">
                        <th className="py-3 px-3">Problem ID</th>
                        <th className="py-3 px-3">Problem Statement</th>
                        <th className="py-3 px-3 text-center">
                          Teams Selected
                        </th>
                        <th className="py-3 px-3">Share % &amp; Bar</th>
                        <th className="py-3 px-3 text-right">Capacity Left</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {filteredProblemRows.map((row) => {
                        const isOpened =
                          activeProblemBreakdown?.code === row.code;
                        return (
                          <tr
                            key={row.problemId}
                            onClick={() =>
                              setSelectedProblemForBreakdown(row.code)
                            }
                            className={`cursor-pointer transition-colors ${
 isOpened
 ? "bg-[#163B63]/75"
 : "hover:bg-[#091B32]/65"
 }`}
                          >
                            <td className="py-4 px-3 font-mono font-bold text-[#C4EEFF]">
                              {row.code}
                            </td>
                            <td className="py-4 px-3">
                              <p className="font-bold text-white">
                                {row.title}
                              </p>
                              <p className="text-[11px] text-[#80D8FF]">
                                {row.technicalDomain} · {row.difficulty}
                              </p>
                            </td>
                            <td className="py-4 px-3 text-center">
                              <span className="inline-flex h-8 w-12 items-center justify-center rounded-xl bg-[#051020] font-mono text-base font-extrabold text-[#C4EEFF]">
                                {row.teamsSelectedCount}
                              </span>
                            </td>
                            <td className="py-4 px-3 min-w-[140px]">
                              <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                                <span className="text-[#C4EEFF]">
                                  {row.distributionPercentage}%
                                </span>
                                <span className="text-slate-400">
                                  {row.teamsSelectedCount}/{row.maxAllowedTeams}
                                </span>
                              </div>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-[#020813]">
                                <div
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      (row.teamsSelectedCount /
                                        Math.max(1, row.maxAllowedTeams)) *
                                        100
                                    )}%`,
                                  }}
                                  className="h-full rounded-full bg-gradient-to-r from-[#4DA8DA] via-[#80D8FF] to-[#C4EEFF]"
                                />
                              </div>
                            </td>
                            <td className="py-4 px-3 text-right font-mono">
                              {row.isFullCapacity ? (
                                <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-200">
                                  0 (FULL)
                                </span>
                              ) : (
                                <span className="text-[#80D8FF]">
                                  {row.remainingCapacity} slots
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                {activeProblemBreakdown && (
                  <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-5">
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <span className="ag-badge-cyan rounded-full px-3 py-0.5 font-mono text-[10px] uppercase">
                          PROBLEM TEAM BREAKDOWN · {activeProblemBreakdown.code}
                        </span>
                        <h3 className="mt-2 text-lg font-extrabold text-white">
                          {activeProblemBreakdown.title}
                        </h3>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-2xl font-extrabold text-[#C4EEFF]">
                          {activeProblemBreakdown.teamsSelectedCount}
                        </span>
                        <span className="block text-[10px] text-[#80D8FF]">
                          CHOSEN TEAMS
                        </span>
                      </div>
                    </div>

                    {activeProblemBreakdown.selectedTeamsList.length === 0 ? (
                      <div className="rounded-2xl bg-[#051020]/80 p-6 text-center text-xs text-slate-400">
                        Zero teams have actively selected{" "}
                        {activeProblemBreakdown.code} yet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {activeProblemBreakdown.selectedTeamsList.map((t) => (
                          <div
                            key={t.id}
                            className="rounded-2xl bg-[#051020]/90 p-4 flex items-center justify-between gap-3"
                          >
                            <div>
                              <span className="font-mono text-xs font-bold text-[#C4EEFF]">
                                {t.id} · {t.name}
                              </span>
                              <p className="text-xs text-slate-300 mt-0.5">
                                Leader: {t.leaderName} ({t.memberCount} members)
                              </p>
                            </div>
                            <span className="ag-badge-cyan rounded-lg px-2.5 py-1 font-mono text-[10px]">
                              {t.lifecycleStatus}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
                    SELECTION SHARE DISTRIBUTION &amp; ACTIVITY TREND
                  </p>
                  <div className="flex items-center gap-6">
                    <svg
                      viewBox="0 0 120 120"
                      className="h-28 w-28 shrink-0 -rotate-90"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="44"
                        fill="none"
                        stroke="#091B32"
                        strokeWidth="16"
                      />
                      {
                        analytics.problemRows.reduce(
                          (acc, row, idx) => {
                            const circumference = 2 * Math.PI * 44;
                            const strokeDash =
                              (row.distributionPercentage / 100) *
                              circumference;
                            const el = (
                              <circle
                                key={row.code}
                                cx="60"
                                cy="60"
                                r="44"
                                fill="none"
                                stroke={
                                  DONUT_COLORS[idx % DONUT_COLORS.length]
                                }
                                strokeWidth="16"
                                strokeDasharray={`${strokeDash} ${circumference}`}
                                strokeDashoffset={-acc.offset}
                              />
                            );
                            acc.offset += strokeDash;
                            acc.elements.push(el);
                            return acc;
                          },
                          { offset: 0, elements: [] as React.ReactNode[] }
                        ).elements
                      }
                    </svg>

                    <div className="flex-1 space-y-1.5 text-xs font-mono">
                      {analytics.problemRows.map((row, idx) => (
                        <div
                          key={row.code}
                          className="flex items-center justify-between"
                        >
                          <span className="inline-flex items-center gap-2">
                            <span
                              style={{
                                backgroundColor:
                                  DONUT_COLORS[idx % DONUT_COLORS.length],
                              }}
                              className="h-2.5 w-2.5 rounded-full"
                            />
                            <span className="text-white font-bold">
                              {row.code}
                            </span>
                          </span>
                          <span className="text-[#C4EEFF]">
                            {row.teamsSelectedCount} (
                            {row.distributionPercentage}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="font-mono text-[11px] uppercase text-[#80D8FF] mb-3">
                      SELECTION HISTORY BY DATE
                    </p>
                    <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
                      {analytics.selectionHistoryByDate.map((item) => (
                        <div
                          key={item.date}
                          className="rounded-xl bg-[#051020] p-2.5"
                        >
                          <p className="text-lg font-extrabold text-[#C4EEFF]">
                            {item.count}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {item.date.slice(5)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            SUB-ROUTE 2: /admin/hackathons/[id]/teams
           ==================================================================== */}
        {activeTab === "teams" && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5">
              <div>
                <span className="font-mono text-xs uppercase text-[#80D8FF]">
                  SUB-ROUTE · /admin/hackathons/{activeHackathonId}/teams
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  Team Status Directory Across 12 Lifecycle Stages
                </h2>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <input
                  type="text"
                  value={teamSearchQuery}
                  onChange={(e) => setTeamSearchQuery(e.target.value)}
                  placeholder="Search team ID, name, or leader..."
                  className="ag-input-metallic rounded-xl px-3.5 py-2 text-xs w-60"
                />
                <select
                  value={lifecycleFilter}
                  onChange={(e) => setLifecycleFilter(e.target.value)}
                  className="ag-input-metallic rounded-xl px-3 py-2 text-xs"
                >
                  <option value="All">All 12 Lifecycle Stages</option>
                  {ALL_TEAM_LIFECYCLE_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <select
                  value={problemCodeFilter}
                  onChange={(e) => setProblemCodeFilter(e.target.value)}
                  className="ag-input-metallic rounded-xl px-3 py-2 text-xs"
                >
                  <option value="All">All Problem Statements</option>
                  <option value="UNASSIGNED">Unassigned Teams</option>
                  {problems.map((p) => (
                    <option key={p.id} value={p.code}>
                      {p.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="font-mono text-[11px] uppercase text-[#80D8FF]">
                    <th className="py-3.5 px-3">Team ID &amp; Name</th>
                    <th className="py-3.5 px-3">Leader &amp; Count</th>
                    <th className="py-3.5 px-3">Chosen Problem</th>
                    <th className="py-3.5 px-3">Eligibility</th>
                    <th className="py-3.5 px-3">Submission &amp; Progress</th>
                    <th className="py-3.5 px-3">Current Lifecycle Stage</th>
                    <th className="py-3.5 px-3">Update Stage</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {filteredTeams.map((team) => {
                    const teamSubs = submissionsByTeam.get(team.id) || [];
                    return (
                      <tr
                        key={team.id}
                        className="hover:bg-[#091B32]/60 transition-colors"
                      >
                        <td className="py-4 px-3">
                          <span className="font-mono font-bold text-[#C4EEFF]">
                            {team.id}
                          </span>
                          <p className="font-bold text-white text-sm">
                            {team.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Reg: {team.registrationDate}
                          </p>
                        </td>
                        <td className="py-4 px-3">
                          <p className="font-semibold text-white">
                            {team.leaderName}
                          </p>
                          <p className="font-mono text-[11px] text-[#80D8FF]">
                            {team.memberCount} Members · {team.leaderEmailPrivate}
                          </p>
                        </td>
                        <td className="py-4 px-3">
                          {team.selectedProblemCode ? (
                            <span className="ag-badge-cyan rounded-lg px-2.5 py-1 font-mono text-xs font-bold">
                              {team.selectedProblemCode}
                            </span>
                          ) : (
                            <span className="font-mono text-amber-300">
                              Not Selected
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-3 font-mono">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[11px] ${
 team.eligibilityStatus === "Verified"
 ? "bg-emerald-950/80 text-emerald-200"
 : "bg-amber-950/80 text-amber-200"
 }`}
                          >
                            {team.eligibilityStatus}
                          </span>
                        </td>
                        <td className="py-4 px-3 font-mono">
                          <p className="text-slate-200">
                            {team.submissionStatus}{" "}
                            {teamSubs.length > 0 && (
                              <span className="text-[#C4EEFF]">
                                (v{teamSubs[0].version})
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-[#80D8FF]">
                            Progress: {team.progressPercent}% ·{" "}
                            {team.assignedReviewer}
                          </p>
                        </td>
                        <td className="py-4 px-3">
                          <span className="ag-badge-cyan rounded-xl px-3 py-1 font-mono text-xs font-bold">
                            {team.lifecycleStatus}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <select
                            disabled={!isAdminOrOrganizer}
                            value={team.lifecycleStatus}
                            onChange={(e) =>
                              handleUpdateTeamStatus(
                                team.id,
                                e.target.value as TeamLifecycleStatus
                              )
                            }
                            className="ag-input-metallic rounded-xl px-2.5 py-1.5 font-mono text-[11px] disabled:opacity-50"
                          >
                            {ALL_TEAM_LIFECYCLE_STATUSES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ====================================================================
            SUB-ROUTE 3: /admin/hackathons/[id]/problems
           ==================================================================== */}
        {activeTab === "problems" && (
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase text-[#80D8FF]">
                  SUB-ROUTE · /admin/hackathons/{activeHackathonId}/problems
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1">
                  Problem Statement Catalog &amp; Atomic Team Assignment
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-[#80D8FF]">
                  Target Team:
                </span>
                <select
                  value={actingTeamId}
                  onChange={(e) => setActingTeamId(e.target.value)}
                  className="ag-input-metallic rounded-xl px-3.5 py-2 text-xs font-bold text-[#C4EEFF]"
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.id} — {t.name} (Current:{" "}
                      {t.selectedProblemCode || "None"})
                    </option>
                  ))}
                </select>
                {isAdminOrOrganizer && (
                  <button
                    type="button"
                    onClick={() => setShowCreateProblemModal(true)}
                    className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Problem</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analytics.problemRows.map((row) => {
                const full = problems.find((p) => p.id === row.problemId)!;
                return (
                  <div
                    key={row.problemId}
                    className="glass-panel rounded-3xl p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-xs font-bold">
                          {row.code} · {row.technicalDomain}
                        </span>
                        <span className="font-mono text-xs font-extrabold text-[#C4EEFF]">
                          {row.teamsSelectedCount} / {row.maxAllowedTeams} Teams
                          Selected
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-extrabold text-white">
                        {row.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                        {full?.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 flex items-center justify-between">
                      <span className="font-mono text-xs text-[#80D8FF]">
                        {row.remainingCapacity} capacity remaining
                      </span>

                      <button
                        type="button"
                        disabled={row.isFullCapacity}
                        onClick={() =>
                          handleSelectOrTransferProblem(
                            actingTeamId,
                            row.problemId
                          )
                        }
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold ${
 row.isFullCapacity
 ? "bg-[#16202C] text-slate-500 cursor-not-allowed"
 : "ag-btn-primary"
 }`}
                      >
                        <ArrowRightLeft className="h-3.5 w-3.5" />
                        <span>
                          {row.isFullCapacity
                            ? "Capacity Full"
                            : `Assign ${actingTeamId} to ${row.code}`}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ====================================================================
            SUB-ROUTE 4: /admin/hackathons/[id]/submissions (LIVE PORTAL REVISIONS & MILESTONES)
           ==================================================================== */}
        {activeTab === "submissions" && (
          <div className="space-y-6">
            {/* Live Submissions Telemetry Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: "Total Revisions Logged",
                  val: submissions.length,
                  sub: "Synced from /team-portal",
                },
                {
                  label: "Final Submitted Teams",
                  val: teams.filter((t) => t.submissionStatus === "Submitted")
                    .length,
                  sub: `Out of ${teams.length} Teams`,
                },
                {
                  label: "Draft Revisions",
                  val: teams.filter((t) => t.submissionStatus === "Draft")
                    .length,
                  sub: "In-Progress Repos",
                },
                {
                  label: "Active Blockers",
                  val: activeBlockersCount,
                  sub: "Reported in Milestones",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-panel relative overflow-hidden rounded-2xl p-5"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4EEFF]/75 to-transparent"
                  />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-extrabold ag-text-gradient">
                    {stat.val}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-slate-300">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>

            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5">
                <div>
                  <span className="font-mono text-xs uppercase text-[#80D8FF]">
                    SUB-ROUTE · /admin/hackathons/{activeHackathonId}/submissions
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">
                    Live Team Portal Submissions, Revisions &amp; Milestone
                    Checkpoints
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <select
                    value={submissionStatusFilter}
                    onChange={(e) => setSubmissionStatusFilter(e.target.value)}
                    className="ag-input-metallic rounded-xl px-3.5 py-2 text-xs font-semibold"
                  >
                    <option value="All">All Submission Statuses</option>
                    <option value="Submitted">Submitted (Final)</option>
                    <option value="Draft">Draft Revisions</option>
                    <option value="Submission Pending">Submission Pending</option>
                    <option value="Not Submitted">Not Submitted</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSubmissionTeams.map((team) => {
                  const teamSubs = submissionsByTeam.get(team.id) || [];
                  const latestSub = teamSubs[0];
                  const teamLogs = progressByTeam.get(team.id) || [];
                  const latestLog = teamLogs[0];
                  const evalRecord = savedEvaluations[team.id];
                  const isExpanded = Boolean(expandedRevisionTeams[team.id]);
                  const hasBlocker =
                    latestLog && latestLog.blockers.toLowerCase() !== "none";

                  return (
                    <div
                      key={team.id}
                      className="rounded-3xl bg-[#051020]/90 p-6 flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-4">
                        {/* Top Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="ag-badge-cyan rounded-full px-3 py-0.5 font-mono text-xs font-bold">
                            {team.id} · {team.selectedProblemCode || "Unassigned"}
                          </span>
                          <div className="flex items-center gap-2 font-mono text-xs">
                            {latestSub && (
                              <span className="rounded-lg bg-[#163B63] px-2.5 py-0.5 text-[#C4EEFF] font-bold">
                                v{latestSub.version}
                              </span>
                            )}
                            <span
                              className={`rounded-lg px-2.5 py-0.5 font-semibold ${
 team.submissionStatus === "Submitted"
 ? "bg-emerald-950/80 text-emerald-200"
 : "bg-[#091B32] text-[#80D8FF]"
 }`}
                            >
                              {team.submissionStatus}
                            </span>
                          </div>
                        </div>

                        {/* Team Identity */}
                        <div>
                          <h3 className="text-xl font-extrabold text-white">
                            {team.name}
                          </h3>
                          <p className="text-xs text-slate-300 mt-0.5">
                            Leader: {team.leaderName} · Stage:{" "}
                            <strong className="text-[#80D8FF]">
                              {team.lifecycleStatus}
                            </strong>
                            {evalRecord && (
                              <span className="ml-2 font-mono text-[#C4EEFF]">
                                · Score: {evalRecord.total}/100
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Live Submitted Deliverable Details */}
                        {latestSub ? (
                          <div className="rounded-2xl bg-[#020813]/90 p-4 space-y-2 text-xs">
                            <div className="flex items-center justify-between font-mono text-[11px] text-[#80D8FF]">
                              <span className="inline-flex items-center gap-1.5 font-bold text-[#C4EEFF]">
                                <GitCommit className="h-3.5 w-3.5" />
                                Latest Deliverable (v{latestSub.version})
                              </span>
                              <span>
                                {latestSub.submittedAt
                                  .slice(0, 16)
                                  .replace("T", " ")}
                              </span>
                            </div>
                            <p className="text-slate-200 leading-relaxed">
                              {latestSub.architectureSummary ||
                                "Architecture summary submitted via Team Portal."}
                            </p>
                          </div>
                        ) : (
                          <div className="rounded-2xl bg-[#020813]/70 p-4 text-xs font-mono text-slate-400">
                            No repository or live demo submitted from{" "}
                            <code>/team-portal</code> yet.
                          </div>
                        )}

                        {/* Latest Milestone Progress Update from /team-portal */}
                        <div className="rounded-2xl bg-[#091B32]/65 p-4 space-y-2 text-xs">
                          <div className="flex items-center justify-between font-mono text-[11px]">
                            <span className="inline-flex items-center gap-1.5 text-[#80D8FF] font-bold">
                              <Activity className="h-3.5 w-3.5" />
                              {latestLog
                                ? latestLog.milestoneTitle
                                : "Development Progress"}
                            </span>
                            <span className="text-[#C4EEFF] font-extrabold">
                              {team.progressPercent}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#020813]">
                            <div
                              style={{ width: `${team.progressPercent}%` }}
                              className="h-full bg-gradient-to-r from-[#4DA8DA] to-[#C4EEFF]"
                            />
                          </div>
                          {latestLog && (
                            <p className="text-[11px] text-slate-300">
                              Completed: {latestLog.workCompleted}
                            </p>
                          )}
                          {hasBlocker && (
                            <p className="font-mono text-[11px] text-amber-300">
                              ⚠ Blocker: {latestLog.blockers}
                            </p>
                          )}
                        </div>

                        {/* Expandable Revision History Drawer (when > 1 revision) */}
                        {teamSubs.length > 1 && (
                          <div>
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedRevisionTeams((prev) => ({
                                  ...prev,
                                  [team.id]: !isExpanded,
                                }))
                              }
                              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#80D8FF] hover:text-[#C4EEFF]"
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5" />
                              )}
                              <span>
                                {isExpanded ? "Hide" : "Inspect All"}{" "}
                                {teamSubs.length} Submission Revisions
                              </span>
                            </button>

                            {isExpanded && (
                              <div className="mt-2.5 space-y-2 pl-3">
                                {teamSubs.map((rev) => (
                                  <div
                                    key={rev.id}
                                    className="rounded-xl bg-[#020813] p-2.5 font-mono text-[11px] text-slate-300"
                                  >
                                    <div className="flex items-center justify-between text-[#C4EEFF]">
                                      <span>Revision v{rev.version}</span>
                                      <span>
                                        {rev.submittedAt
                                          .slice(0, 16)
                                          .replace("T", " ")}
                                      </span>
                                    </div>
                                    <p className="truncate text-[#80D8FF] mt-0.5">
                                      {rev.repositoryUrl}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer Action Links */}
                      <div className="pt-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {latestSub?.repositoryUrl ? (
                            <a
                              href={latestSub.repositoryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold"
                            >
                              <Github className="h-3.5 w-3.5 text-[#C4EEFF]" />
                              <span>GitHub Repo</span>
                            </a>
                          ) : (
                            <span className="rounded-xl px-3 py-2 font-mono text-[11px] text-slate-500">
                              No Repo URL
                            </span>
                          )}

                          {latestSub?.liveDemoUrl && (
                            <a
                              href={latestSub.liveDemoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold"
                            >
                              <span>Live Demo</span>
                              <ExternalLink className="h-3.5 w-3.5 text-[#80D8FF]" />
                            </a>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setEvaluatingTeamId(team.id);
                            handleSubRouteSelect("reviews");
                          }}
                          className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs"
                        >
                          <span>Evaluate Team →</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            SUB-ROUTE 5: /admin/hackathons/[id]/reviews (WITH LIVE DELIVERABLE INSPECTOR)
           ==================================================================== */}
        {activeTab === "reviews" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSaveEvaluation}
              className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 space-y-5"
            >
              <div>
                <span className="font-mono text-xs uppercase text-[#80D8FF]">
                  SUB-ROUTE · /admin/hackathons/{activeHackathonId}/reviews
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1">
                  Submit 4-Pillar Evaluator Rubric
                </h2>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-1.5">
                  Select Team to Evaluate
                </label>
                <select
                  value={evaluatingTeamId}
                  onChange={(e) => setEvaluatingTeamId(e.target.value)}
                  className="ag-input-metallic w-full rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#C4EEFF]"
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.id} — {t.name} ({t.selectedProblemCode || "Unassigned"})
                    </option>
                  ))}
                </select>
              </div>

              {/* Live Deliverable & Milestone Context Card for Selected Team */}
              {reviewingTeam && (
                <div className="rounded-2xl bg-[#051020]/95 p-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="font-bold text-[#C4EEFF]">
                      LIVE PORTAL DELIVERABLES ({reviewingTeam.id})
                    </span>
                    <span className="text-[#80D8FF]">
                      Progress: {reviewingTeam.progressPercent}%
                    </span>
                  </div>

                  {reviewingTeamSubs[0] ? (
                    <>
                      <p className="text-slate-300 leading-relaxed">
                        <strong className="text-white">
                          v{reviewingTeamSubs[0].version} Summary:
                        </strong>{" "}
                        {reviewingTeamSubs[0].architectureSummary}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <a
                          href={reviewingTeamSubs[0].repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold"
                        >
                          <Github className="h-3.5 w-3.5 text-[#C4EEFF]" />
                          <span>Inspect Repo</span>
                        </a>
                        {reviewingTeamSubs[0].liveDemoUrl && (
                          <a
                            href={reviewingTeamSubs[0].liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold"
                          >
                            <span>Open Live Demo</span>
                            <ExternalLink className="h-3.5 w-3.5 text-[#80D8FF]" />
                          </a>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="font-mono text-[11px] text-amber-300">
                      Team has not submitted a GitHub repository URL yet.
                    </p>
                  )}

                  {reviewingTeamLogs[0] && (
                    <p className="pt-2 font-mono text-[11px] text-[#80D8FF]">
                      Latest Milestone: {reviewingTeamLogs[0].milestoneTitle}
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">
                    Architecture (0–25)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={25}
                    value={archScore}
                    onChange={(e) => setArchScore(Number(e.target.value))}
                    className="ag-input-metallic w-full rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">
                    Problem Fit (0–25)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={25}
                    value={alignScore}
                    onChange={(e) => setAlignScore(Number(e.target.value))}
                    className="ag-input-metallic w-full rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">
                    Innovation (0–25)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={25}
                    value={innovScore}
                    onChange={(e) => setInnovScore(Number(e.target.value))}
                    className="ag-input-metallic w-full rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">
                    Live Demo UX (0–25)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={25}
                    value={demoScore}
                    onChange={(e) => setDemoScore(Number(e.target.value))}
                    className="ag-input-metallic w-full rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <textarea
                rows={3}
                value={evaluatorNotes}
                onChange={(e) => setEvaluatorNotes(e.target.value)}
                placeholder="Evaluator feedback notes..."
                className="ag-input-metallic w-full rounded-xl px-3.5 py-2.5 text-xs"
              />

              <button
                type="submit"
                className="ag-btn-primary w-full rounded-xl py-3 text-xs font-bold"
              >
                Save Evaluation ({archScore + alignScore + innovScore + demoScore}
                /100)
              </button>
            </form>

            {/* Right Column: Live Evaluator Review Queue */}
            <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    Evaluator Review Queue &amp; Live Deliverables
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Click any team row to load their repository, demo, and
                    milestone progress into the rubric scorer.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {teams.map((t) => {
                  const ev = savedEvaluations[t.id];
                  const tSubs = submissionsByTeam.get(t.id) || [];
                  const latestSub = tSubs[0];
                  const isActiveReview = t.id === evaluatingTeamId;

                  return (
                    <div
                      key={t.id}
                      onClick={() => setEvaluatingTeamId(t.id)}
                      className={`cursor-pointer rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isActiveReview
                          ? "bg-[#163B63]/75 shadow-[0_0_24px_rgba(128,216,255,0.25)]"
                          : "bg-[#051020]/90 hover:bg-[#091B32]"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#C4EEFF]">
                            {t.id} · {t.name} ({t.selectedProblemCode || "None"})
                          </span>
                          {latestSub && (
                            <span className="rounded bg-[#020813] px-2 py-0.5 font-mono text-[10px] text-[#80D8FF]">
                              v{latestSub.version} Submitted
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-300">
                          {ev
                            ? ev.notes
                            : latestSub
                            ? latestSub.architectureSummary
                            : "Awaiting repository submission from Team Portal."}
                        </p>

                        {latestSub && (
                          <div className="flex items-center gap-3 font-mono text-[11px] pt-0.5">
                            <a
                              href={latestSub.repositoryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-[#80D8FF] hover:underline"
                            >
                              <Github className="h-3 w-3" />
                              <span>Repo</span>
                            </a>
                            {latestSub.liveDemoUrl && (
                              <a
                                href={latestSub.liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-[#C4EEFF] hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" />
                                <span>Demo</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="text-right font-mono shrink-0">
                        <span className="text-lg font-extrabold text-[#C4EEFF]">
                          {ev ? `${ev.total}/100` : "Pending"}
                        </span>
                        <span className="block text-[10px] text-[#80D8FF]">
                          Progress: {t.progressPercent}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            SUB-ROUTE 6: /admin/hackathons/[id]/settings
           ==================================================================== */}
        {activeTab === "settings" && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="pb-4">
              <span className="font-mono text-xs uppercase text-[#80D8FF]">
                SUB-ROUTE · /admin/hackathons/{activeHackathonId}/settings
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                Hackathon Deadlines, Capacity Policies &amp; Stage Configuration
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-2">
                  Problem Selection Deadline (UTC/IST)
                </label>
                <input
                  type="datetime-local"
                  value={selectionDeadlineInput}
                  onChange={(e) => setSelectionDeadlineInput(e.target.value)}
                  className="ag-input-metallic w-full rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-2">
                  Project Submission Deadline (UTC/IST)
                </label>
                <input
                  type="datetime-local"
                  value={submissionDeadlineInput}
                  onChange={(e) => setSubmissionDeadlineInput(e.target.value)}
                  className="ag-input-metallic w-full rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 rounded-2xl bg-[#051020] p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowProblemTransfer}
                  onChange={(e) => setAllowProblemTransfer(e.target.checked)}
                  className="h-4 w-4 accent-[#80D8FF]"
                />
                <span className="text-xs text-slate-200">
                  Allow problem statement transfers before selection deadline
                </span>
              </label>

              <label className="flex items-center gap-3 rounded-2xl bg-[#051020] p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={publicSelectionCounts}
                  onChange={(e) => setPublicSelectionCounts(e.target.checked)}
                  className="h-4 w-4 accent-[#80D8FF]"
                />
                <span className="text-xs text-slate-200">
                  Display live chosen problem counts in public participant catalog
                </span>
              </label>
            </div>

            <button
              type="button"
              onClick={() =>
                setToast({
                  type: "success",
                  text: `Persisted configuration settings for ${activeHackathonId}.`,
                })
              }
              className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold"
            >
              <Save className="h-4 w-4" />
              <span>Save Hackathon Settings</span>
            </button>
          </div>
        )}

        {/* ====================================================================
            SUB-ROUTE 7: ANONYMIZED CORE TEAM DEMONSTRATION CMS
           ==================================================================== */}
        {activeTab === "core-team-cms" && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="pb-4">
              <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-xs">
                PHASE 02 · SEEDED DEMONSTRATION IDENTITIES (CLONE ONLY)
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-white">
                Core Team Anonymization &amp; Content Management Editor
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coreTeamCms.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl bg-[#051020]/90 p-5"
                >
                  <span className="rounded-md bg-[#163B63] px-2 py-0.5 font-mono text-[10px] text-[#C4EEFF]">
                    DEMO IDENTITY · {member.department}
                  </span>
                  <h3 className="mt-2 text-lg font-extrabold text-white">
                    {member.fictionalName}
                  </h3>
                  <p className="font-mono text-xs text-[#80D8FF]">
                    {member.role}
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    In Charge Of: {member.inChargeOf}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================================
            SUB-ROUTE 8: ADMIN AUDITING & TEAM STATUS HISTORY
           ==================================================================== */}
        {activeTab === "audit-history" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-4">
              <h3 className="text-xl font-extrabold text-white">
                Team Lifecycle Status History
              </h3>
              {statusHistory.map((h) => (
                <div
                  key={h.id}
                  className="rounded-2xl bg-[#051020] p-4 font-mono text-xs"
                >
                  <p className="text-[#C4EEFF] font-bold">
                    {h.teamId}: {h.previousStatus} → {h.newStatus}
                  </p>
                  <p className="text-slate-300 mt-1">{h.reason}</p>
                  <p className="text-[10px] text-[#80D8FF] mt-1">
                    By {h.changedBy} ({h.changedByRole}) · {h.timestamp}
                  </p>
                </div>
              ))}
            </div>

            <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-4">
              <h3 className="text-xl font-extrabold text-white">
                Immutable Administrative Audit Log
              </h3>
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-2xl bg-[#051020] p-4 font-mono text-xs"
                >
                  <p className="text-[#C4EEFF] font-bold">
                    [{log.actionType}] {log.targetRecord}
                  </p>
                  <p className="text-slate-300 mt-1">
                    {log.previousValue} →{" "}
                    <strong className="text-[#80D8FF]">
                      {log.updatedValue}
                    </strong>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Actor: {log.actingUser} ({log.actingRole}) · {log.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Problem Modal */}
        {showCreateProblemModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/90 backdrop-blur-xl p-6">
            <form
              onSubmit={handleCreateProblem}
              className="glass-panel max-w-lg w-full rounded-3xl p-7 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-white">
                  Create &amp; Publish Problem Statement
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCreateProblemModal(false)}
                  className="ag-btn-secondary rounded-xl p-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <input
                type="text"
                required
                value={newProbCode}
                onChange={(e) => setNewProbCode(e.target.value)}
                placeholder="Problem Code (e.g., PS-006)"
                className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-xs"
              />
              <input
                type="text"
                required
                value={newProbTitle}
                onChange={(e) => setNewProbTitle(e.target.value)}
                placeholder="Problem Title"
                className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-xs"
              />
              <input
                type="text"
                required
                value={newProbDomain}
                onChange={(e) => setNewProbDomain(e.target.value)}
                placeholder="Technical Domain"
                className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-xs"
              />
              <textarea
                rows={3}
                required
                value={newProbDesc}
                onChange={(e) => setNewProbDesc(e.target.value)}
                placeholder="Detailed Problem Statement Description"
                className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-xs"
              />
              <input
                type="number"
                min={1}
                max={50}
                value={newProbMaxTeams}
                onChange={(e) => setNewProbMaxTeams(Number(e.target.value))}
                placeholder="Maximum Allowed Teams"
                className="ag-input-metallic w-full rounded-xl px-4 py-2.5 text-xs"
              />
              <button
                type="submit"
                className="ag-btn-primary w-full rounded-xl py-3 text-xs font-bold"
              >
                Publish Problem Statement
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
