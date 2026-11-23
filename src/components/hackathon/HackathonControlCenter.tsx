"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ShieldCheck,
  BarChart3,
  Layers,
  Users,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Search,
  Activity,
  Sliders,
  X,
  Download,
  FileSpreadsheet,
  FileJson,
  Award,
  Trophy,
} from "lucide-react";
import {
  HACKATHON_EVENTS,
  INITIAL_PROBLEM_STATEMENTS,
  INITIAL_TEAMS,
  INITIAL_SELECTION_RECORDS,
  UserRole,
  CompetitionOutcome,
  HackathonTeamRecord,
  ProblemStatementItem,
  ProblemSelectionRecord,
  StatusHistoryEntry,
  computeHackathonIntelligence,
  calculateTeamMilestonePercentage,
} from "@/data/hackathonStore";
import {
  ExportFormat,
  exportProblemSelectionReport,
  exportTeamStatusMatrixReport,
  exportJudgeRubricScoresReport,
  exportGovernanceAuditLogsReport,
} from "@/utils/exportReports";
import WinnerCertificateModule from "@/components/hackathon/WinnerCertificateModule";

const ROLES: UserRole[] = [
  "Super Administrator",
  "Hackathon Administrator",
  "Event Organizer",
  "Judge",
  "Team Leader",
  "Team Member",
  "Public Visitor",
];

type ConsoleTab =
  | "analytics"
  | "problems"
  | "teams"
  | "progress"
  | "admin"
  | "certificates";

export default function HackathonControlCenter() {
  const [activeHackathonId, setActiveHackathonId] = useState(
    "hack-2026-flagship"
  );
  const [currentRole, setCurrentRole] = useState<UserRole>(
    "Super Administrator"
  );
  const [activeTab, setActiveTab] = useState<ConsoleTab>("analytics");

  const [problems, setProblems] = useState<ProblemStatementItem[]>(
    INITIAL_PROBLEM_STATEMENTS
  );
  const [teams, setTeams] = useState<HackathonTeamRecord[]>(INITIAL_TEAMS);
  const [selections, setSelections] = useState<ProblemSelectionRecord[]>(
    INITIAL_SELECTION_RECORDS
  );
  const [auditLogs, setAuditLogs] = useState<StatusHistoryEntry[]>([
    {
      id: "aud-init-1",
      teamId: "TEAM-101",
      hackathonId: "hack-2026-flagship",
      dimension: "ProblemSelection",
      previousStatus: "Awaiting Selection",
      newStatus: "PS-005",
      actor: "Aarav Mehta",
      timestamp: "2026-11-16T09:30:00Z",
      reason: "Initial primary problem statement selection.",
    },
  ]);

  const [bannerMessage, setBannerMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Filters & Drill-Down State
  const [problemSearch, setProblemSearch] = useState("");
  const [problemCategoryFilter, setProblemCategoryFilter] = useState("All");
  const [drillDownProblemCode, setDrillDownProblemCode] = useState<
    string | null
  >("PS-005");

  // Team Dashboard Filters
  const [teamSearch, setTeamSearch] = useState("");
  const [regStatusFilter, setRegStatusFilter] = useState("All");
  const [devStatusFilter, setDevStatusFilter] = useState("All");
  const [selectedTeamDetail, setSelectedTeamDetail] =
    useState<HackathonTeamRecord | null>(null);

  // Judge Rubric Scoring State
  const [archScore, setArchScore] = useState(24);
  const [alignScore, setAlignScore] = useState(24);
  const [innovScore, setInnovScore] = useState(23);
  const [demoScore, setDemoScore] = useState(23);
  const [judgeRemarks, setJudgeRemarks] = useState("");

  // Selection Modal State
  const [actingTeamId, setActingTeamId] = useState("TEAM-108");
  const [confirmingProblem, setConfirmingProblem] =
    useState<ProblemStatementItem | null>(null);

  // New Registration Form State
  const [newTeamName, setNewTeamName] = useState("");
  const [newLeaderName, setNewLeaderName] = useState("");
  const [newLeaderEmail, setNewLeaderEmail] = useState("");
  const [newInstitution, setNewInstitution] = useState("");

  const activeHackathon =
    HACKATHON_EVENTS.find((h) => h.id === activeHackathonId) ||
    HACKATHON_EVENTS[0];

  useEffect(() => {
    fetch(`/api/hackathon?hackathonId=${activeHackathonId}`, {
      headers: { "x-ag-role": currentRole },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setProblems(data.problems);
          setTeams(data.teams);
          setSelections(data.selections);
          if (Array.isArray(data.auditLogs) && data.auditLogs.length > 0) {
            setAuditLogs(data.auditLogs);
          }
        }
      })
      .catch(() => {});
  }, [activeHackathonId, currentRole]);

  const intelligence = useMemo(
    () =>
      computeHackathonIntelligence(
        activeHackathonId,
        teams,
        problems,
        selections
      ),
    [activeHackathonId, teams, problems, selections]
  );

  const drillDownRow = useMemo(
    () =>
      intelligence.problemBreakdown.find(
        (r) => r.code === drillDownProblemCode
      ) || intelligence.problemBreakdown[0],
    [intelligence, drillDownProblemCode]
  );

  const isAdminOrOrg =
    currentRole === "Super Administrator" ||
    currentRole === "Hackathon Administrator" ||
    currentRole === "Event Organizer";

  const canExport = isAdminOrOrg || currentRole === "Judge";

  // ONE-CLICK CSV & JSON REPORT EXPORT HANDLER WITH RBAC & AUDIT LOGGING
  const handleExportReport = (
    reportType: "problems" | "teams" | "rubric" | "audit",
    format: ExportFormat
  ) => {
    if (!canExport) {
      setBannerMessage({
        type: "error",
        text: `RBAC Denied: Role '${currentRole}' is not authorized to export administrative or judging reports.`,
      });
      return;
    }

    if (reportType === "audit" && !isAdminOrOrg) {
      setBannerMessage({
        type: "error",
        text: "RBAC Denied: Only Administrators and Organizers may export governance audit logs.",
      });
      return;
    }

    let result = { filename: "", rowCount: 0 };

    if (reportType === "problems") {
      result = exportProblemSelectionReport(
        activeHackathon,
        intelligence,
        currentRole,
        format
      );
    } else if (reportType === "teams") {
      result = exportTeamStatusMatrixReport(
        activeHackathon,
        teams,
        currentRole,
        format
      );
    } else if (reportType === "rubric") {
      result = exportJudgeRubricScoresReport(
        activeHackathon,
        teams,
        currentRole,
        format
      );
    } else if (reportType === "audit") {
      result = exportGovernanceAuditLogsReport(
        activeHackathon,
        auditLogs,
        currentRole,
        format
      );
    }

    const logEntry: StatusHistoryEntry = {
      id: `aud-exp-${Date.now()}`,
      teamId: "SYSTEM_EXPORT",
      hackathonId: activeHackathonId,
      dimension: "Evaluation",
      previousStatus: reportType.toUpperCase(),
      newStatus: `EXPORTED_${format.toUpperCase()} (${result.rowCount} rows)`,
      actor: `Aarav Mehta (${currentRole})`,
      timestamp: new Date().toISOString(),
      reason: `Downloaded ${result.filename}`,
    };

    setAuditLogs((prev) => [logEntry, ...prev]);
    setBannerMessage({
      type: "success",
      text: `Exported ${result.rowCount} records to ${result.filename} (${format.toUpperCase()}).`,
    });
  };

  const executeProblemSelection = async (problem: ProblemStatementItem) => {
    setConfirmingProblem(null);
    try {
      const res = await fetch("/api/hackathon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SELECT_OR_CHANGE_PROBLEM",
          role: currentRole,
          actorName: `${currentRole} (${actingTeamId})`,
          hackathonId: activeHackathonId,
          teamId: actingTeamId,
          problemId: problem.id,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setBannerMessage({
          type: "error",
          text: data.error || "Selection failed.",
        });
        return;
      }
      setProblems(data.problems);
      setTeams(data.teams);
      setSelections(data.selections);
      setAuditLogs(data.auditLogs || []);
      setDrillDownProblemCode(problem.code);
      setBannerMessage({
        type: "success",
        text: `Confirmed: ${actingTeamId} is now assigned to ${problem.code} (${problem.title}). All selection counts updated atomically.`,
      });
    } catch {
      setBannerMessage({
        type: "error",
        text: "Network error communicating with selection engine.",
      });
    }
  };

  const handleStatusUpdate = async (
    teamId: string,
    dimension: string,
    newValue: string
  ) => {
    const res = await fetch("/api/hackathon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "UPDATE_STATUS_DIMENSION",
        role: currentRole,
        actorName: `Aarav Mehta (${currentRole})`,
        hackathonId: activeHackathonId,
        teamId,
        dimension,
        newValue,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      setTeams(data.teams);
      setAuditLogs(data.auditLogs || []);
      setBannerMessage({
        type: "success",
        text: `Updated ${teamId} ${dimension} status to '${newValue}'.`,
      });
    } else {
      setBannerMessage({ type: "error", text: data.error });
    }
  };

  const handleSubmitJudgeRubric = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamDetail) return;

    const res = await fetch("/api/hackathon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "SUBMIT_EVALUATION",
        role: currentRole,
        actorName: `Ishaan Verma (${currentRole})`,
        hackathonId: activeHackathonId,
        teamId: selectedTeamDetail.id,
        architectureScore: archScore,
        alignmentScore: alignScore,
        innovationScore: innovScore,
        demoUxScore: demoScore,
        remarks:
          judgeRemarks.trim() ||
          "Evaluated via 4-pillar pure-software rubric.",
      }),
    });

    const data = await res.json();
    if (data.ok) {
      setTeams(data.teams);
      const updated = data.teams.find(
        (t: HackathonTeamRecord) => t.id === selectedTeamDetail.id
      );
      if (updated) setSelectedTeamDetail(updated);
      setJudgeRemarks("");
      setBannerMessage({
        type: "success",
        text: `Saved Judge Rubric Evaluation for ${selectedTeamDetail.id} (${
          archScore + alignScore + innovScore + demoScore
        }/100).`,
      });
    } else {
      setBannerMessage({ type: "error", text: data.error });
    }
  };

  const handleRegisterTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/hackathon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "REGISTER_TEAM",
        role: currentRole,
        hackathonId: activeHackathonId,
        teamName: newTeamName,
        leaderName: newLeaderName,
        leaderEmail: newLeaderEmail,
        institution: newInstitution,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      setTeams(data.teams);
      setAuditLogs(data.auditLogs || []);
      setNewTeamName("");
      setNewLeaderName("");
      setNewLeaderEmail("");
      setNewInstitution("");
      setBannerMessage({
        type: "success",
        text: `Team '${newTeamName}' registered in Pending state.`,
      });
    } else {
      setBannerMessage({ type: "error", text: data.error });
    }
  };

  const filteredProblems = intelligence.problemBreakdown.filter((row) => {
    const matchesCat =
      problemCategoryFilter === "All" || row.category === problemCategoryFilter;
    const matchesSearch =
      row.code.toLowerCase().includes(problemSearch.toLowerCase()) ||
      row.title.toLowerCase().includes(problemSearch.toLowerCase()) ||
      row.category.toLowerCase().includes(problemSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredTeams = teams.filter((t) => {
    const matchesReg =
      regStatusFilter === "All" || t.registrationStatus === regStatusFilter;
    const matchesDev =
      devStatusFilter === "All" || t.developmentStatus === devStatusFilter;
    const matchesQuery =
      t.id.toLowerCase().includes(teamSearch.toLowerCase()) ||
      t.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
      t.leaderName.toLowerCase().includes(teamSearch.toLowerCase()) ||
      (t.selectedProblemCode || "")
        .toLowerCase()
        .includes(teamSearch.toLowerCase());
    return matchesReg && matchesDev && matchesQuery;
  });

  return (
    <section className="relative min-h-screen bg-[#020813] py-16 px-4 sm:px-6 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* TOP RBAC, MULTI-HACKATHON & QUICK EXPORT COMMAND BAR */}
        <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-3.5 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#80D8FF]" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  VERSION 4.0 · ENTERPRISE HACKATHON &amp; PROBLEM ANALYTICS ENGINE
                </span>
              </div>
              <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {activeHackathon.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl">
                {activeHackathon.description}
              </p>
            </div>

            {/* Event Switcher & Role Simulator */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#80D8FF] mb-1">
                  Active Hackathon Scope
                </label>
                <select
                  value={activeHackathonId}
                  onChange={(e) => setActiveHackathonId(e.target.value)}
                  className="ag-input-metallic rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                >
                  {HACKATHON_EVENTS.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.edition} ({ev.lifecycle})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C4EEFF] mb-1">
                  Active RBAC Session Role
                </label>
                <select
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value as UserRole)}
                  className="ag-input-metallic rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#C4EEFF]"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      Role: {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Module Navigation Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 pt-6">
            {(
              [
                {
                  id: "analytics",
                  label: "1. Selection Intelligence & Charts (A–H)",
                  icon: BarChart3,
                },
                {
                  id: "problems",
                  label: "2. Problem Statements & Selection Engine",
                  icon: Layers,
                },
                {
                  id: "teams",
                  label: "3. 6-Dimension Team Status Tracker",
                  icon: Users,
                },
                {
                  id: "progress",
                  label: "4. Milestone Progress & Registration",
                  icon: Activity,
                },
                {
                  id: "admin",
                  label: "5. Admin Export Center & Audit Logs",
                  icon: Sliders,
                },
                {
                  id: "certificates",
                  label: "6. Podium & Digital Certificates",
                  icon: Trophy,
                },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all ${
 isActive ? "ag-btn-primary" : "ag-btn-secondary"
 }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Feedback Banner */}
        {bannerMessage && (
          <div
            className={`flex items-center justify-between rounded-2xl px-5 py-4 text-sm ${
 bannerMessage.type === "success"
 ? "bg-[#163B63]/80 text-[#C4EEFF]"
 : "bg-amber-950/70 text-amber-200"
 }`}
          >
            <div className="flex items-center gap-3">
              {bannerMessage.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-[#80D8FF] shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-300 shrink-0" />
              )}
              <span>{bannerMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setBannerMessage(null)}
              className="font-mono text-xs underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ====================================================================
            TAB 1: PHASE 11 — PROBLEM STATEMENT SELECTION INTELLIGENCE & CHARTS A–H
           ==================================================================== */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            {/* Quick One-Click Export Bar for Selection Analytics */}
            <div className="glass-panel rounded-2xl px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-[#80D8FF]" />
                <div>
                  <p className="text-sm font-bold text-white">
                    Export Problem Selection Intelligence Report
                  </p>
                  <p className="font-mono text-xs text-slate-300">
                    Includes distinct team counts, selection share %, remaining
                    capacity, and assigned team IDs
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleExportReport("problems", "csv")}
                  className="ag-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
                >
                  <FileSpreadsheet className="h-4 w-4 text-[#80D8FF]" />
                  <span>Export Selection CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportReport("problems", "json")}
                  className="ag-btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs"
                >
                  <FileJson className="h-4 w-4" />
                  <span>Export Selection JSON</span>
                </button>
              </div>
            </div>

            {/* 22-Metric Executive Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  label: "Registered Teams",
                  val: intelligence.totalRegisteredTeams,
                  sub: `${intelligence.totalApprovedTeams} Approved / Eligible`,
                },
                {
                  label: "Published Problems",
                  val: intelligence.publishedProblemStatements,
                  sub: `${intelligence.availableProblemStatements} Open · ${intelligence.fullCapacityStatementsCount} Full`,
                },
                {
                  label: "Active Selections",
                  val: intelligence.teamsWithActiveSelection,
                  sub: `${intelligence.teamsWithoutActiveSelection} Eligible Without Selection`,
                },
                {
                  label: "Selection Conversion",
                  val: `${intelligence.selectionConversionRatePercent}%`,
                  sub: `Avg ${intelligence.averageSelectionsPerSelectedStatement} teams/problem`,
                },
                {
                  label: "Most Selected",
                  val: intelligence.mostSelectedProblem?.code || "N/A",
                  sub: `${intelligence.mostSelectedProblem?.count || 0} Distinct Teams`,
                },
                {
                  label: "Remaining Capacity",
                  val: intelligence.totalRemainingCapacity,
                  sub: `${intelligence.zeroSelectionStatementsCount} Zero-Selection Statements`,
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

            {/* Chart A (Problem Selection Distribution) + Interactive Problem Drill-Down */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 glass-panel rounded-3xl p-7">
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <p className="font-mono text-xs uppercase text-[#80D8FF]">
                      CHART A, C &amp; H · DISTINCT ACTIVE PRIMARY SELECTIONS
                    </p>
                    <h2 className="text-xl font-extrabold text-white mt-1">
                      Teams Selecting Each Problem Statement
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-[#C4EEFF]">
                    Denominator: {intelligence.teamsWithActiveSelection} Active Teams
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {intelligence.problemBreakdown.map((row) => {
                    const isSelectedDrill = drillDownRow?.code === row.code;
                    return (
                      <button
                        key={row.problemId}
                        type="button"
                        onClick={() => setDrillDownProblemCode(row.code)}
                        className={`w-full text-left rounded-2xl p-4 transition-all ${
                          isSelectedDrill
                            ? "bg-[#163B63]/75 shadow-[0_0_25px_rgba(128,216,255,0.28)]"
                            : "bg-[#051020]/75 hover:bg-[#091B32]"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="ag-badge-cyan rounded-lg px-2.5 py-1 font-mono text-xs font-bold">
                              {row.code}
                            </span>
                            <span className="font-bold text-sm text-white">
                              {row.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 font-mono text-xs">
                            <span className="text-[#C4EEFF] font-extrabold">
                              {row.selectedTeamsCount} Teams
                            </span>
                            <span className="text-[#80D8FF]">
                              ({row.selectionSharePercent}% share)
                            </span>
                            <span
                              className={`rounded-md px-2 py-0.5 text-[10px] ${
 row.isFullCapacity
 ? "bg-amber-500/20 text-amber-200"
 : "bg-[#091B32] text-[#80D8FF]"
 }`}
                            >
                              Cap: {row.selectedTeamsCount}/{row.maxCapacity}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[#020813]">
                          <div
                            style={{
                              width: `${Math.min(
                                100,
                                row.capacityUtilizationPercent
                              )}%`,
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-[#4DA8DA] via-[#80D8FF] to-[#C4EEFF]"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Phase 11.6 Administrator Drill-Down Panel */}
              <div className="lg:col-span-5 glass-panel rounded-3xl p-7 flex flex-col justify-between">
                {drillDownRow ? (
                  <div>
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <span className="ag-badge-cyan rounded-full px-3 py-0.5 font-mono text-[10px] uppercase">
                          DRILL-DOWN INSPECTOR · {drillDownRow.code}
                        </span>
                        <h3 className="mt-2 text-xl font-extrabold text-white">
                          {drillDownRow.title}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-xl bg-[#051020] p-3">
                        <p className="font-mono text-[10px] text-[#80D8FF]">
                          SELECTED TEAMS
                        </p>
                        <p className="text-2xl font-extrabold text-[#C4EEFF]">
                          {drillDownRow.selectedTeamsCount}
                        </p>
                      </div>
                      <div className="rounded-xl bg-[#051020] p-3">
                        <p className="font-mono text-[10px] text-[#80D8FF]">
                          REMAINING CAP
                        </p>
                        <p className="text-2xl font-extrabold text-white">
                          {drillDownRow.remainingCapacity}
                        </p>
                      </div>
                      <div className="rounded-xl bg-[#051020] p-3">
                        <p className="font-mono text-[10px] text-[#80D8FF]">
                          SHARE OF TOTAL
                        </p>
                        <p className="text-2xl font-extrabold text-[#80D8FF]">
                          {drillDownRow.selectionSharePercent}%
                        </p>
                      </div>
                    </div>

                    <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
                      ASSIGNED TEAMS ({drillDownRow.assignedTeams.length})
                    </h4>

                    {drillDownRow.assignedTeams.length === 0 ? (
                      <div className="mt-4 rounded-2xl bg-[#051020]/70 p-6 text-center text-xs text-slate-400">
                        Zero teams have selected {drillDownRow.code} so far.{" "}
                        {drillDownRow.remainingCapacity} slots available.
                      </div>
                    ) : (
                      <div className="mt-3 space-y-3">
                        {drillDownRow.assignedTeams.map((t) => (
                          <div
                            key={t.id}
                            className="rounded-2xl bg-[#051020]/90 p-4"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-[#C4EEFF]">
                                {t.id} · {t.name}
                              </span>
                              <span className="rounded-md bg-[#163B63] px-2 py-0.5 font-mono text-[10px] text-[#80D8FF]">
                                {t.developmentStatus}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-300">
                              Leader: {t.leaderName} ({t.institution})
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2 font-mono text-[10px] text-slate-400">
                              <span>Sub: {t.submissionStatus}</span>
                              <span>·</span>
                              <span>Eval: {t.evaluationStatus}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Chart B: Domain Popularity Breakdown */}
                <div className="mt-8 pt-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#80D8FF] mb-3">
                    CHART B · DOMAIN POPULARITY BY CATEGORY
                  </p>
                  <div className="space-y-2">
                    {intelligence.domainPopularity.map((dom) => (
                      <div
                        key={dom.category}
                        className="flex items-center justify-between text-xs font-mono"
                      >
                        <span className="text-slate-200">{dom.category}</span>
                        <span className="text-[#C4EEFF] font-bold">
                          {dom.count} teams ({dom.sharePercent}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 2: PHASE 09 & 10 — PROBLEM STATEMENTS CATALOG & SELECTION ENGINE
           ==================================================================== */}
        {activeTab === "problems" && (
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#80D8FF]" />
                  <input
                    type="text"
                    value={problemSearch}
                    onChange={(e) => setProblemSearch(e.target.value)}
                    placeholder="Search code, title, domain..."
                    className="ag-input-metallic w-full rounded-xl pl-10 pr-4 py-2 text-xs"
                  />
                </div>

                <select
                  value={problemCategoryFilter}
                  onChange={(e) => setProblemCategoryFilter(e.target.value)}
                  className="ag-input-metallic rounded-xl px-3.5 py-2 text-xs"
                >
                  <option value="All">All Categories</option>
                  <option value="Healthcare Technology">
                    Healthcare Technology
                  </option>
                  <option value="Smart Cities">Smart Cities</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Educational Technology">
                    Educational Technology
                  </option>
                  <option value="Generative AI">Generative AI</option>
                  <option value="Sustainability">Sustainability</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#80D8FF]">
                  Select Problem As Team:
                </span>
                <select
                  value={actingTeamId}
                  onChange={(e) => setActingTeamId(e.target.value)}
                  className="ag-input-metallic rounded-xl px-3.5 py-2 text-xs font-bold text-[#C4EEFF]"
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.id} — {t.name} ({t.selectedProblemCode || "Unassigned"})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProblems.map((row) => {
                const fullProblem = problems.find(
                  (p) => p.id === row.problemId
                )!;
                return (
                  <article
                    key={row.problemId}
                    className="glass-panel rounded-3xl p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-xs font-bold">
                          {row.code} · {row.category}
                        </span>
                        <span className="rounded-lg bg-[#051020] px-2.5 py-1 font-mono text-[11px] text-[#80D8FF]">
                          {row.difficulty}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-extrabold text-white">
                        {row.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                        {fullProblem?.shortDescription}
                      </p>

                      {fullProblem && (
                        <div className="mt-4 rounded-2xl bg-[#051020]/85 p-4 text-xs text-slate-300 space-y-1.5">
                          <p className="font-mono text-[10px] uppercase text-[#80D8FF]">
                            EXPECTED DELIVERABLES &amp; REQUIREMENTS
                          </p>
                          <p>{fullProblem.expectedDeliverables.join(" · ")}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 flex items-center justify-between">
                      <div className="font-mono text-xs">
                        <span className="text-[#C4EEFF] font-bold">
                          {row.selectedTeamsCount} / {row.maxCapacity} Teams
                        </span>
                        <span className="ml-2 text-slate-400">
                          ({row.remainingCapacity} slots left)
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={row.isFullCapacity}
                        onClick={() => setConfirmingProblem(fullProblem)}
                        className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                          row.isFullCapacity
                            ? "bg-[#16202C] text-slate-500 cursor-not-allowed"
                            : "ag-btn-primary"
                        }`}
                      >
                        {row.isFullCapacity ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Lock className="h-3.5 w-3.5" /> Capacity Full
                          </span>
                        ) : (
                          `Select ${row.code} for ${actingTeamId}`
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {confirmingProblem && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/90 backdrop-blur-xl p-6">
                <div className="glass-panel max-w-lg w-full rounded-3xl p-8 space-y-5">
                  <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-xs">
                    CONFIRM TRANSACTIONAL PROBLEM SELECTION
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    Lock {confirmingProblem.code}: {confirmingProblem.title}?
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    You are assigning <strong>{actingTeamId}</strong> to{" "}
                    <strong>{confirmingProblem.code}</strong>. Any previous
                    active selection for this team will be atomically released
                    and marked as <code>SUPERSEDED</code> in the audit log.
                  </p>
                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setConfirmingProblem(null)}
                      className="ag-btn-secondary rounded-xl px-4 py-2.5 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => executeProblemSelection(confirmingProblem)}
                      className="ag-btn-primary rounded-xl px-5 py-2.5 text-xs"
                    >
                      Confirm &amp; Execute Selection
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====================================================================
            TAB 3: PHASE 07 — 6-DIMENSION TEAM STATUS MONITORING DASHBOARD
           ==================================================================== */}
        {activeTab === "teams" && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 overflow-hidden space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase text-[#80D8FF]">
                  PHASE 07 · MULTI-DIMENSIONAL TEAM STATUS MATRIX
                </p>
                <h2 className="text-2xl font-extrabold text-white">
                  Registered Teams &amp; 6 Independent Status Dimensions
                </h2>
              </div>

              {/* Direct Team Matrix & Judge Rubric Export Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleExportReport("teams", "csv")}
                  className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 text-[#80D8FF]" />
                  <span>Matrix CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportReport("teams", "json")}
                  className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold"
                >
                  <FileJson className="h-3.5 w-3.5 text-[#C4EEFF]" />
                  <span>Matrix JSON</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportReport("rubric", "csv")}
                  className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs"
                >
                  <Award className="h-3.5 w-3.5" />
                  <span>Judge Scores CSV</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <input
                type="text"
                value={teamSearch}
                onChange={(e) => setTeamSearch(e.target.value)}
                placeholder="Filter by ID, team, leader, PS code..."
                className="ag-input-metallic rounded-xl px-3.5 py-2 text-xs w-64"
              />
              <select
                value={regStatusFilter}
                onChange={(e) => setRegStatusFilter(e.target.value)}
                className="ag-input-metallic rounded-xl px-3 py-2 text-xs"
              >
                <option value="All">All Registration Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select
                value={devStatusFilter}
                onChange={(e) => setDevStatusFilter(e.target.value)}
                className="ag-input-metallic rounded-xl px-3 py-2 text-xs"
              >
                <option value="All">All Development Stages</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Blocked">Blocked</option>
                <option value="Development Completed">Completed</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="font-mono text-[11px] uppercase text-[#80D8FF]">
                    <th className="py-3.5 px-3">Team ID &amp; Name</th>
                    <th className="py-3.5 px-3">Members</th>
                    <th className="py-3.5 px-3">Problem</th>
                    <th className="py-3.5 px-3">1. Registration</th>
                    <th className="py-3.5 px-3">2. Development</th>
                    <th className="py-3.5 px-3">3. Submission</th>
                    <th className="py-3.5 px-3">4. Evaluation</th>
                    <th className="py-3.5 px-3">5. Outcome</th>
                    <th className="py-3.5 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {filteredTeams.map((team) => {
                    const pct = calculateTeamMilestonePercentage(
                      team,
                      activeHackathon
                    );
                    return (
                      <tr
                        key={team.id}
                        className="hover:bg-[#091B32]/60 transition-colors"
                      >
                        <td className="py-4 px-3">
                          <p className="font-mono font-bold text-[#C4EEFF]">
                            {team.id}
                          </p>
                          <p className="font-bold text-white text-sm">
                            {team.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Lead: {team.leaderName}
                          </p>
                        </td>
                        <td className="py-4 px-3 font-mono">
                          {team.members.length} builders
                        </td>
                        <td className="py-4 px-3">
                          {team.selectedProblemCode ? (
                            <span className="ag-badge-cyan rounded-lg px-2.5 py-1 font-mono text-xs font-bold">
                              {team.selectedProblemCode}
                            </span>
                          ) : (
                            <span className="text-amber-300 font-mono text-[11px]">
                              Unassigned
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-3 font-mono">
                          <span
                            className={`rounded-md px-2 py-1 text-[11px] ${
 team.registrationStatus === "Approved"
 ? "bg-emerald-950/80 text-emerald-200"
 : "bg-amber-950/80 text-amber-200"
 }`}
                          >
                            {team.registrationStatus}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <span className="font-mono text-[#C4EEFF]">
                            {team.developmentStatus} ({pct}%)
                          </span>
                          {team.activeBlocker && (
                            <p className="mt-1 text-[10px] text-amber-300">
                              ⚠ Blocker Active
                            </p>
                          )}
                        </td>
                        <td className="py-4 px-3 font-mono text-slate-200">
                          {team.submissionStatus}
                        </td>
                        <td className="py-4 px-3 font-mono text-[#80D8FF]">
                          {team.evaluationStatus}
                          {team.evaluation && (
                            <span className="block text-[10px] text-[#C4EEFF]">
                              Score: {team.evaluation.totalScore}/100
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-3 font-mono font-bold text-[#C4EEFF]">
                          {team.competitionOutcome}
                        </td>
                        <td className="py-4 px-3">
                          <button
                            type="button"
                            onClick={() => setSelectedTeamDetail(team)}
                            className="ag-btn-secondary rounded-xl px-3 py-1.5 font-mono text-[11px]"
                          >
                            Inspect &amp; Score
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Team Detail & Judge Rubric Modal */}
            {selectedTeamDetail && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/90 backdrop-blur-xl p-4 sm:p-6"
                onClick={() => setSelectedTeamDetail(null)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="glass-panel max-w-3xl w-full rounded-3xl p-7 max-h-[88vh] overflow-y-auto space-y-6"
                >
                  <div className="flex items-start justify-between pb-4">
                    <div>
                      <span className="ag-badge-cyan rounded-full px-3 py-0.5 font-mono text-xs">
                        {selectedTeamDetail.id} · {selectedTeamDetail.institution}
                      </span>
                      <h3 className="mt-2 text-2xl font-extrabold text-white">
                        {selectedTeamDetail.name}
                      </h3>
                      <p className="text-xs text-[#80D8FF] font-mono mt-1">
                        Leader: {selectedTeamDetail.leaderName} · Contact:{" "}
                        {isAdminOrOrg
                          ? selectedTeamDetail.leaderEmailPrivate
                          : "[MASKED BY RBAC]"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedTeamDetail(null)}
                      className="ag-btn-secondary rounded-xl p-2"
                    >
                      <X className="h-4 w-4 text-[#C4EEFF]" />
                    </button>
                  </div>

                  {/* Activity Timeline */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#80D8FF] mb-3">
                      PERSISTED ACTIVITY TIMELINE
                    </h4>
                    <div className="space-y-2 rounded-2xl bg-[#051020]/90 p-4 font-mono text-xs">
                      {selectedTeamDetail.activityTimeline.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-[#C4EEFF] font-bold">
                            {item.time}
                          </span>
                          <span className="text-slate-200">— {item.event}</span>
                          <span className="text-slate-400 ml-auto">
                            [{item.actor}]
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Judge 4-Pillar Rubric Scoring Form (Phase 14) */}
                  {(currentRole === "Judge" || isAdminOrOrg) && (
                    <form
                      onSubmit={handleSubmitJudgeRubric}
                      className="rounded-2xl bg-[#051020]/90 p-5 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase text-[#C4EEFF]">
                          PHASE 14 · 4-PILLAR JUDGE RUBRIC EVALUATION
                        </span>
                        <span className="font-mono text-sm font-extrabold text-[#80D8FF]">
                          Total: {archScore + alignScore + innovScore + demoScore}
                          /100
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                        <div>
                          <label className="block text-slate-300 mb-1">
                            Architecture (0-25)
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={25}
                            value={archScore}
                            onChange={(e) => setArchScore(Number(e.target.value))}
                            className="ag-input-metallic w-full rounded-lg px-3 py-1.5"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1">
                            Alignment (0-25)
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={25}
                            value={alignScore}
                            onChange={(e) =>
                              setAlignScore(Number(e.target.value))
                            }
                            className="ag-input-metallic w-full rounded-lg px-3 py-1.5"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1">
                            Innovation (0-25)
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={25}
                            value={innovScore}
                            onChange={(e) =>
                              setInnovScore(Number(e.target.value))
                            }
                            className="ag-input-metallic w-full rounded-lg px-3 py-1.5"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1">
                            Demo &amp; UX (0-25)
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={25}
                            value={demoScore}
                            onChange={(e) => setDemoScore(Number(e.target.value))}
                            className="ag-input-metallic w-full rounded-lg px-3 py-1.5"
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        value={judgeRemarks}
                        onChange={(e) => setJudgeRemarks(e.target.value)}
                        placeholder="Enter technical judging remarks (restricted from public view)..."
                        className="ag-input-metallic w-full rounded-xl px-3.5 py-2 text-xs"
                      />

                      <button
                        type="submit"
                        className="ag-btn-primary rounded-xl px-5 py-2 text-xs"
                      >
                        Submit Rubric Score
                      </button>
                    </form>
                  )}

                  {/* Admin Quick Status Controls */}
                  {isAdminOrOrg && (
                    <div className="pt-4">
                      <p className="font-mono text-xs uppercase text-[#80D8FF] mb-3">
                        ADMINISTRATIVE STATUS OVERRIDES
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusUpdate(
                              selectedTeamDetail.id,
                              "Registration",
                              "Approved"
                            )
                          }
                          className="ag-btn-primary rounded-xl px-3.5 py-2 text-xs"
                        >
                          Approve Registration
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusUpdate(
                              selectedTeamDetail.id,
                              "ProblemSelection",
                              "Selection Locked"
                            )
                          }
                          className="ag-btn-secondary rounded-xl px-3.5 py-2 text-xs"
                        >
                          Lock Problem Selection
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusUpdate(
                              selectedTeamDetail.id,
                              "Evaluation",
                              "Finalist"
                            )
                          }
                          className="ag-btn-secondary rounded-xl px-3.5 py-2 text-xs"
                        >
                          Promote to Finalist
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====================================================================
            TAB 4: PHASE 06 & 08 — TEAM REGISTRATION & MILESTONE PROGRESS
           ==================================================================== */}
        {activeTab === "progress" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form
              onSubmit={handleRegisterTeam}
              className="lg:col-span-5 glass-panel rounded-3xl p-7 space-y-4"
            >
              <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-xs">
                PHASE 06 · TEAM REGISTRATION WORKFLOW
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Register a New Hackathon Team
              </h3>
              <input
                type="text"
                required
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="Team Name (Duplicate-checked)"
                className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
              />
              <input
                type="text"
                required
                value={newLeaderName}
                onChange={(e) => setNewLeaderName(e.target.value)}
                placeholder="Team Leader Full Name"
                className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
              />
              <input
                type="email"
                required
                value={newLeaderEmail}
                onChange={(e) => setNewLeaderEmail(e.target.value)}
                placeholder="Leader Contact Email (Private / Masked)"
                className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
              />
              <input
                type="text"
                required
                value={newInstitution}
                onChange={(e) => setNewInstitution(e.target.value)}
                placeholder="Institution / Organization"
                className="ag-input-metallic w-full rounded-xl px-4 py-3 text-sm"
              />
              <button
                type="submit"
                className="ag-btn-primary w-full rounded-xl py-3.5 text-sm"
              >
                Submit Team Registration
              </button>
            </form>

            <div className="lg:col-span-7 glass-panel rounded-3xl p-7 space-y-5">
              <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-xs">
                PHASE 08 · WEIGHTED MILESTONE PROGRESS CALCULATOR
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Event-Configured Weighted Milestones
              </h3>
              <p className="text-xs text-slate-300">
                Completion percentages are calculated strictly from the
                hackathon&apos;s configured milestone weights—never fabricated:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeHackathon.weightedMilestones.map((ms) => (
                  <div
                    key={ms.id}
                    className="rounded-2xl bg-[#051020]/85 p-4"
                  >
                    <p className="font-mono text-xs font-bold text-[#C4EEFF]">
                      {ms.label}
                    </p>
                    <p className="mt-1 font-mono text-xs text-[#80D8FF]">
                      Configured Weight: {ms.weightPercent}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 5: PHASE 12 & 13 — ADMIN EXPORT CENTER & IMMUTABLE AUDIT LOGS
           ==================================================================== */}
        {activeTab === "admin" && (
          <div className="space-y-8">
            {/* Unified One-Click CSV & JSON Export Matrix */}
            <div className="glass-panel relative overflow-hidden rounded-3xl p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
              />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5">
                <div>
                  <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-xs">
                    PHASE 13 · ONE-CLICK DATA EXPORT SUITE (CSV &amp; JSON)
                  </span>
                  <h2 className="mt-2 text-2xl font-extrabold text-white">
                    Authorized Hackathon Reports &amp; Telemetry Exports
                  </h2>
                  <p className="mt-1 text-xs text-slate-300">
                    All CSV exports include UTF-8 BOM for Excel and OWASP formula
                    sanitization. Private fields are automatically masked based
                    on your active RBAC role ({currentRole}).
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    id: "problems" as const,
                    title: "1. Problem Selection Counts",
                    desc: "Distinct active teams per problem, share %, capacity limits, and assigned team IDs.",
                    records: `${intelligence.publishedProblemStatements} Statements`,
                  },
                  {
                    id: "teams" as const,
                    title: "2. 6-Dimension Team Matrix",
                    desc: "Registration, Problem, Development, Milestone %, Submission, Evaluation, and Outcome.",
                    records: `${teams.length} Registered Teams`,
                  },
                  {
                    id: "rubric" as const,
                    title: "3. Judge Rubric Standings",
                    desc: "4-pillar rubric scores (Architecture, Alignment, Innovation, UX), total /100, and rank.",
                    records: `${
                      teams.filter((t) => Boolean(t.evaluation)).length
                    } Evaluated Teams`,
                  },
                  {
                    id: "audit" as const,
                    title: "4. Governance Audit Trail",
                    desc: "Chronological status transitions, problem changes, actors, and admin overrides.",
                    records: `${auditLogs.length} Audit Events`,
                  },
                ].map((card) => (
                  <div
                    key={card.id}
                    className="rounded-2xl bg-[#051020]/90 p-5 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#80D8FF]">
                        {card.records}
                      </span>
                      <h3 className="mt-1 text-base font-extrabold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => handleExportReport(card.id, "csv")}
                        className="ag-btn-secondary inline-flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold"
                      >
                        <FileSpreadsheet className="h-3.5 w-3.5 text-[#80D8FF]" />
                        <span>CSV</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExportReport(card.id, "json")}
                        className="ag-btn-primary inline-flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs"
                      >
                        <FileJson className="h-3.5 w-3.5" />
                        <span>JSON</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Immutable Audit Log Stream */}
            <div className="glass-panel rounded-3xl p-7 space-y-6">
              <div className="flex items-center justify-between pb-4">
                <div>
                  <p className="font-mono text-xs uppercase text-[#80D8FF]">
                    PHASE 12 &amp; 13 · IMMUTABLE GOVERNANCE &amp; AUDIT LOG
                  </p>
                  <h3 className="text-2xl font-extrabold text-white mt-1">
                    Status Transitions, Selection History &amp; Export Events
                  </h3>
                </div>
                <span className="ag-badge-cyan rounded-full px-3.5 py-1 font-mono text-xs">
                  {auditLogs.length} Persisted Audit Events
                </span>
              </div>

              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl bg-[#051020]/85 p-4 font-mono text-xs"
                  >
                    <div>
                      <span className="text-[#C4EEFF] font-bold">
                        [{log.dimension}] {log.teamId}
                      </span>{" "}
                      <span className="text-slate-300">
                        {log.previousStatus} →{" "}
                        <strong className="text-[#80D8FF]">
                          {log.newStatus}
                        </strong>
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Reason: {log.reason}
                      </p>
                    </div>
                    <div className="text-right text-[11px] text-slate-400">
                      <p className="text-[#80D8FF]">{log.actor}</p>
                      <p>{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 6: PODIUM & DIGITAL CERTIFICATES (WINNER ANNOUNCEMENT MODULE)
           ==================================================================== */}
        {activeTab === "certificates" && (
          <WinnerCertificateModule
            hackathon={activeHackathon}
            teams={teams}
            problems={problems}
            currentRole={currentRole}
            onPromoteOutcome={(teamId, outcome) =>
              handleStatusUpdate(teamId, "Outcome", outcome)
            }
            onLogAction={(summary) => {
              setAuditLogs((prev) => [
                {
                  id: `aud-cert-${Date.now()}`,
                  teamId: "CERTIFICATE_ENGINE",
                  hackathonId: activeHackathonId,
                  dimension: "Outcome",
                  previousStatus: "ISSUED",
                  newStatus: "VERIFIED_CREDENTIAL",
                  actor: `Aarav Mehta (${currentRole})`,
                  timestamp: new Date().toISOString(),
                  reason: summary,
                },
                ...prev,
              ]);
              setBannerMessage({ type: "success", text: summary });
            }}
          />
        )}
      </div>
    </section>
  );
}
