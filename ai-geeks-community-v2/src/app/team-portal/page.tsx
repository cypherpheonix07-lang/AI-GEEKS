"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Users,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Search,
  ArrowRightLeft,
  ShieldCheck,
  History,
  Eye,
  X,
  BookOpen,
} from "lucide-react";
import {
  SEED_HACKATHONS,
  SEED_PROBLEMS,
  SEED_TEAMS,
  SEED_SELECTIONS,
  ALL_TEAM_LIFECYCLE_STATUSES,
  RBACRole,
  ProblemStatement,
  HackathonTeam,
  ProblemSelection,
  TeamStatusHistory,
  computeProblemSelectionAnalytics,
} from "@/lib/hackathonEngine";

const PARTICIPANT_ROLES: Extract<RBACRole, "Team Leader" | "Team Member">[] = [
  "Team Leader",
  "Team Member",
];

export default function TeamPortalPage() {
  const [hackathonId] = useState<string>("hk-2026-ai-challenge");
  const [participantRole, setParticipantRole] = useState<
    "Team Leader" | "Team Member"
  >("Team Leader");

  // Default to TEAM-108 (Verified team awaiting problem selection) so Team Leaders can test selection immediately
  const [activeTeamId, setActiveTeamId] = useState<string>("TEAM-108");

  const [problems, setProblems] = useState<ProblemStatement[]>(SEED_PROBLEMS);
  const [teams, setTeams] = useState<HackathonTeam[]>(SEED_TEAMS);
  const [selections, setSelections] =
    useState<ProblemSelection[]>(SEED_SELECTIONS);
  const [statusHistory, setStatusHistory] = useState<TeamStatusHistory[]>([]);

  // Catalog Filters & Modals
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [domainFilter, setDomainFilter] = useState<string>("All");
  const [inspectedProblem, setInspectedProblem] =
    useState<ProblemStatement | null>(null);
  const [confirmTargetProblem, setConfirmTargetProblem] =
    useState<ProblemStatement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const hackathon = SEED_HACKATHONS[0];

  // Hydrate live state from /api/admin/hackathons using participant RBAC header
  useEffect(() => {
    fetch(`/api/admin/hackathons?hackathonId=${hackathonId}`, {
      headers: { "x-ag-rbac-role": participantRole },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setProblems(data.problems);
          setTeams(data.teams);
          setSelections(data.selections);
          setStatusHistory(data.statusHistory || []);
        }
      })
      .catch(() => {});
  }, [hackathonId, participantRole]);

  const activeTeam = useMemo(
    () => teams.find((t) => t.id === activeTeamId) || teams[0],
    [teams, activeTeamId]
  );

  const analytics = useMemo(
    () =>
      computeProblemSelectionAnalytics(
        hackathonId,
        problems,
        teams,
        selections
      ),
    [hackathonId, problems, teams, selections]
  );

  const assignedProblemDetails = useMemo(
    () =>
      problems.find((p) => p.id === activeTeam?.selectedProblemId) || null,
    [problems, activeTeam]
  );

  const teamHistoryEntries = useMemo(
    () => statusHistory.filter((h) => h.teamId === activeTeam?.id),
    [statusHistory, activeTeam]
  );

  const currentStageIndex = useMemo(() => {
    if (!activeTeam) return 0;
    const idx = ALL_TEAM_LIFECYCLE_STATUSES.indexOf(activeTeam.lifecycleStatus);
    return idx === -1 ? 0 : idx;
  }, [activeTeam]);

  const domains = useMemo(() => {
    const unique = Array.from(
      new Set(problems.map((p) => p.technicalDomain))
    );
    return ["All", ...unique];
  }, [problems]);

  const filteredProblemRows = useMemo(() => {
    return analytics.problemRows.filter((row) => {
      const matchesDomain =
        domainFilter === "All" || row.technicalDomain === domainFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        row.code.toLowerCase().includes(q) ||
        row.title.toLowerCase().includes(q) ||
        row.technicalDomain.toLowerCase().includes(q);
      return matchesDomain && matchesSearch;
    });
  }, [analytics.problemRows, domainFilter, searchQuery]);

  // Execute transactional problem statement selection or transfer via /api/admin/hackathons
  const handleConfirmSelection = async (problem: ProblemStatement) => {
    if (!activeTeam) return;
    setConfirmTargetProblem(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/hackathons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SELECT_OR_TRANSFER_PROBLEM",
          hackathonId,
          actingUser: `${activeTeam.leaderName} (${participantRole})`,
          actingRole: participantRole,
          teamId: activeTeam.id,
          problemId: problem.id,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFeedback({
          type: "error",
          text:
            data.error ||
            "Unable to select problem statement. Verify your Team Leader role and eligibility.",
        });
        return;
      }

      setProblems(data.problems);
      setTeams(data.teams);
      setSelections(data.selections);
      setStatusHistory(data.statusHistory || []);
      setFeedback({
        type: "success",
        text: `Problem Statement ${problem.code} (${problem.title}) is now locked as the active primary selection for ${activeTeam.name} (${activeTeam.id}).`,
      });
    } catch {
      setFeedback({
        type: "error",
        text: "Network error communicating with /api/admin/hackathons.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTeamLeader = participantRole === "Team Leader";
  const isVerifiedTeam = activeTeam?.eligibilityStatus === "Verified";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] py-16 px-4 sm:px-6 text-slate-100">
      {/* Ambient Sky Metallic Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 h-[440px] w-[880px] rounded-full bg-gradient-to-tr from-[#163B63]/55 via-[#4DA8DA]/25 to-[#C4EEFF]/15 blur-[135px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">
        {/* ====================================================================
            1. TOP TEAM WORKSPACE HEADER & PARTICIPANT ROLE SWITCHER
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
                  <Users className="h-3.5 w-3.5 text-[#80D8FF]" />
                  <span>PARTICIPANT WORKSPACE · /team-portal</span>
                </span>
                <Link
                  href="/admin/hackathons"
                  className="rounded-full bg-[#051020] px-3 py-1 font-mono text-[11px] text-[#80D8FF] hover:text-[#C4EEFF]"
                >
                  Open Admin Console →
                </Link>
              </div>

              <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Team Portal &amp;{" "}
                <span className="ag-text-gradient">Problem Selection.</span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Track your team&apos;s real-time progression across all 12
                hackathon lifecycle stages and lock your primary problem
                statement for{" "}
                <strong className="text-[#C4EEFF]">{hackathon.title}</strong>.
              </p>
            </div>

            {/* Active Team & Participant Role Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div className="rounded-2xl bg-[#051020] p-3">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#80D8FF] mb-1">
                  Active Team Workspace
                </label>
                <select
                  value={activeTeamId}
                  onChange={(e) => {
                    setActiveTeamId(e.target.value);
                    setFeedback(null);
                  }}
                  className="ag-input-metallic rounded-xl px-3 py-2 text-xs font-bold text-[#C4EEFF]"
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.id} — {t.name} ({t.lifecycleStatus})
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl bg-[#051020] p-3">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#C4EEFF] mb-1">
                  Participant Session Role
                </label>
                <select
                  value={participantRole}
                  onChange={(e) =>
                    setParticipantRole(
                      e.target.value as "Team Leader" | "Team Member"
                    )
                  }
                  className="ag-input-metallic rounded-xl px-3 py-2 text-xs font-bold text-white"
                >
                  {PARTICIPANT_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Feedback Banner */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-center justify-between rounded-2xl px-5 py-4 text-sm ${
 feedback.type === "success"
 ? "bg-[#163B63]/80 text-[#C4EEFF]"
 : "bg-amber-950/80 text-amber-200"
 }`}
            >
              <div className="flex items-center gap-3">
                {feedback.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-[#80D8FF] shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-300 shrink-0" />
                )}
                <span>{feedback.text}</span>
              </div>
              <button
                type="button"
                onClick={() => setFeedback(null)}
                className="font-mono text-xs underline ml-4 shrink-0"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====================================================================
            2. 12-STAGE LIFECYCLE PROGRESS STEPPER & TEAM TELEMETRY
           ==================================================================== */}
        {activeTeam && (
          <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8 space-y-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/85 to-transparent"
            />

            {/* Top Team Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-[#051020]/90 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF]">
                  TEAM IDENTITY &amp; ELIGIBILITY
                </p>
                <p className="mt-1.5 text-xl font-extrabold text-white">
                  {activeTeam.name}
                </p>
                <div className="mt-2 flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#C4EEFF] font-bold">
                    {activeTeam.id}
                  </span>
                  <span>·</span>
                  <span
                    className={
                      isVerifiedTeam ? "text-emerald-300" : "text-amber-300"
                    }
                  >
                    {activeTeam.eligibilityStatus}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#051020]/90 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF]">
                  ACTIVE LIFECYCLE STAGE
                </p>
                <p className="mt-1.5 text-lg font-extrabold text-[#C4EEFF]">
                  {activeTeam.lifecycleStatus}
                </p>
                <p className="mt-2 font-mono text-xs text-slate-300">
                  Stage {currentStageIndex + 1} of{" "}
                  {ALL_TEAM_LIFECYCLE_STATUSES.length} ({activeTeam.progressPercent}
                  % Built)
                </p>
              </div>

              <div className="rounded-2xl bg-[#051020]/90 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF]">
                  ASSIGNED PROBLEM STATEMENT
                </p>
                {activeTeam.selectedProblemCode ? (
                  <>
                    <p className="mt-1.5 font-mono text-lg font-extrabold text-[#C4EEFF]">
                      {activeTeam.selectedProblemCode}
                    </p>
                    <p className="mt-1 text-xs text-slate-300 line-clamp-1">
                      {activeTeam.selectedProblemTitle}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-1.5 text-lg font-extrabold text-amber-300">
                      Not Selected Yet
                    </p>
                    <p className="mt-1 font-mono text-xs text-slate-400">
                      Select an available problem below
                    </p>
                  </>
                )}
              </div>

              <div className="rounded-2xl bg-[#051020]/90 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF]">
                  SUBMISSION &amp; REVIEW
                </p>
                <p className="mt-1.5 text-lg font-extrabold text-white">
                  {activeTeam.submissionStatus}
                </p>
                <p className="mt-1 font-mono text-xs text-[#80D8FF]">
                  Reviewer: {activeTeam.assignedReviewer}
                </p>
              </div>
            </div>

            {/* 12-Stage Interactive Stepper Grid */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#80D8FF]">
                  12-STAGE HACKATHON LIFECYCLE PROGRESSION
                </p>
                <span className="font-mono text-xs text-slate-400">
                  Last Activity: {activeTeam.lastActivity}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {ALL_TEAM_LIFECYCLE_STATUSES.map((stage, idx) => {
                  const isCurrent = stage === activeTeam.lifecycleStatus;
                  const isCompleted =
                    idx < currentStageIndex &&
                    activeTeam.lifecycleStatus !== "Not Qualified";
                  const isDisqualifiedStage =
                    stage === "Not Qualified" && !isCurrent;

                  return (
                    <div
                      key={stage}
                      className={`rounded-2xl p-3 transition-all ${
 isCurrent
 ? "bg-gradient-to-br from-[#2B6CB0]/60 via-[#163B63] to-[#091B32] shadow-[0_0_24px_rgba(128,216,255,0.35)]"
 : isCompleted
 ? "bg-[#091B32]/85 text-[#C4EEFF]"
 : isDisqualifiedStage
 ? "bg-[#020813]/60 opacity-45"
 : "bg-[#051020]/70 text-slate-400"
 }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span
                          className={
                            isCurrent
                              ? "text-[#C4EEFF] font-extrabold"
                              : isCompleted
                              ? "text-[#80D8FF]"
                              : "text-slate-500"
                          }
                        >
                          STAGE {String(idx + 1).padStart(2, "0")}
                        </span>
                        {isCompleted && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#80D8FF]" />
                        )}
                        {isCurrent && (
                          <span className="h-2 w-2 rounded-full bg-[#C4EEFF] animate-ping" />
                        )}
                      </div>
                      <p
                        className={`mt-1.5 text-xs font-bold leading-snug ${
 isCurrent
 ? "text-white"
 : isCompleted
 ? "text-slate-200"
 : "text-slate-400"
 }`}
                      >
                        {stage}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Problem Banner & Team Roster Strip */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
              {/* Assigned Problem Summary */}
              <div className="lg:col-span-7 rounded-2xl bg-[#051020]/90 p-5 flex flex-col justify-between">
                {assignedProblemDetails ? (
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="ag-badge-cyan rounded-full px-3 py-0.5 font-mono text-[10px] uppercase">
                        LOCKED PRIMARY PROBLEM · {assignedProblemDetails.code}
                      </span>
                      <span className="font-mono text-xs text-[#80D8FF]">
                        {assignedProblemDetails.technicalDomain}
                      </span>
                    </div>
                    <h2 className="mt-3 text-xl font-extrabold text-white">
                      {assignedProblemDetails.title}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {assignedProblemDetails.description}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-start justify-center h-full">
                    <span className="ag-badge-cyan rounded-full px-3 py-0.5 font-mono text-[10px] uppercase">
                      ACTION REQUIRED
                    </span>
                    <h2 className="mt-3 text-xl font-extrabold text-white">
                      No Problem Statement Selected Yet
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300">
                      {isVerifiedTeam
                        ? "Your team is Verified! Browse the published problem statements below and lock your team's primary challenge."
                        : "Your team registration is currently Pending Verification. Once verified by an organizer, the Team Leader can lock a problem statement."}
                    </p>
                  </div>
                )}

                {assignedProblemDetails && (
                  <div className="mt-4 pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setInspectedProblem(assignedProblemDetails)}
                      className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-[#80D8FF]" />
                      <span>View Deliverables &amp; Rubric</span>
                    </button>

                    <span className="font-mono text-[11px] text-[#80D8FF]">
                      1 Active Selection Enforced
                    </span>
                  </div>
                )}
              </div>

              {/* Team Members & RBAC Privacy Verification */}
              <div className="lg:col-span-5 rounded-2xl bg-[#051020]/90 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#80D8FF]">
                    TEAM ROSTER ({activeTeam.memberCount} MEMBERS)
                  </p>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#C4EEFF]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#80D8FF]" />
                    RBAC Privacy Active
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeTeam.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between rounded-xl bg-[#020813]/85 px-3.5 py-2.5 text-xs"
                    >
                      <div>
                        <p className="font-bold text-white">{member.name}</p>
                        <p className="font-mono text-[10px] text-[#80D8FF]">
                          {member.role}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">
                        {member.emailPrivate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            3. AVAILABLE PROBLEM STATEMENTS DIRECTORY & TEAM SELECTION ENGINE
           ==================================================================== */}
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#80D8FF]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#80D8FF]">
                  PUBLISHED PROBLEM STATEMENTS · LIVE CAPACITY COUNTER
                </span>
              </div>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-white">
                Select or Transfer Your Team&apos;s Problem Statement
              </h2>
              {!isTeamLeader && (
                <p className="mt-1 font-mono text-xs text-amber-300">
                  Read-Only Mode: Switch Session Role to &ldquo;Team
                  Leader&rdquo; above to select or change a problem statement.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#80D8FF]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search PS-001, title, domain..."
                  className="ag-input-metallic w-full rounded-xl pl-10 pr-4 py-2 text-xs"
                />
              </div>

              <select
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="ag-input-metallic rounded-xl px-3.5 py-2 text-xs"
              >
                {domains.map((dom) => (
                  <option key={dom} value={dom}>
                    {dom === "All" ? "All Technical Domains" : dom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Problem Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProblemRows.map((row) => {
              const fullProblem = problems.find(
                (p) => p.id === row.problemId
              )!;
              const isCurrentTeamChoice =
                activeTeam?.selectedProblemId === row.problemId;
              const canSelect =
                isTeamLeader &&
                isVerifiedTeam &&
                !row.isFullCapacity &&
                !isCurrentTeamChoice;

              return (
                <article
                  key={row.problemId}
                  className={`glass-panel relative overflow-hidden rounded-3xl p-7 flex flex-col justify-between transition-all ${
 isCurrentTeamChoice
 ? "shadow-[0_0_36px_rgba(128,216,255,0.3)]"
 : ""
 }`}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/80 to-transparent"
                  />

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-xs font-bold">
                        {row.code} · {row.technicalDomain}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="rounded-lg bg-[#051020] px-2.5 py-1 text-[#80D8FF]">
                          {row.difficulty}
                        </span>
                        <span
                          className={`rounded-lg px-2.5 py-1 font-bold ${
 row.isFullCapacity
 ? "bg-amber-500/20 text-amber-200"
 : "bg-[#163B63]/80 text-[#C4EEFF]"
 }`}
                        >
                          {row.teamsSelectedCount}/{row.maxAllowedTeams} Teams
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-4 text-xl font-extrabold text-white">
                      {row.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {fullProblem?.description}
                    </p>

                    {fullProblem && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {fullProblem.requiredTechnologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg bg-[#16202C] px-2.5 py-1 font-mono text-[11px] text-[#80D8FF]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setInspectedProblem(fullProblem)}
                      className="ag-btn-secondary inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#80D8FF]" />
                      <span>Full Spec</span>
                    </button>

                    {isCurrentTeamChoice ? (
                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#163B63] px-4 py-2.5 font-mono text-xs font-extrabold text-[#C4EEFF]">
                        <CheckCircle2 className="h-4 w-4 text-[#80D8FF]" />
                        <span>Active Selection ({row.code})</span>
                      </span>
                    ) : row.isFullCapacity ? (
                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#16202C] px-4 py-2.5 font-mono text-xs text-slate-400">
                        <Lock className="h-3.5 w-3.5" />
                        <span>Capacity Full (0 left)</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={!canSelect || isSubmitting}
                        onClick={() => setConfirmTargetProblem(fullProblem)}
                        className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs disabled:opacity-45 disabled:cursor-not-allowed"
                      >
                        <ArrowRightLeft className="h-3.5 w-3.5" />
                        <span>
                          {activeTeam?.selectedProblemId
                            ? `Switch to ${row.code}`
                            : `Select ${row.code}`}
                        </span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            4. TEAM STATUS TRANSITION HISTORY LOG
           ==================================================================== */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2.5">
              <History className="h-5 w-5 text-[#80D8FF]" />
              <h3 className="text-xl font-extrabold text-white">
                Persisted Status History for {activeTeam?.name} ({activeTeam?.id})
              </h3>
            </div>
            <span className="font-mono text-xs text-[#80D8FF]">
              {teamHistoryEntries.length} Recorded Transitions
            </span>
          </div>

          {teamHistoryEntries.length === 0 ? (
            <p className="text-xs font-mono text-slate-400">
              Initial registration state active. Selecting a problem statement or
              receiving an organizer review will append timestamped history
              records here.
            </p>
          ) : (
            <div className="space-y-2.5">
              {teamHistoryEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl bg-[#051020]/90 p-4 font-mono text-xs"
                >
                  <div>
                    <span className="text-[#C4EEFF] font-bold">
                      {entry.previousStatus} → {entry.newStatus}
                    </span>
                    <p className="text-slate-300 mt-1">{entry.reason}</p>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    <p className="text-[#80D8FF]">
                      {entry.changedBy} ({entry.changedByRole})
                    </p>
                    <p>{entry.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ====================================================================
            5. FULL PROBLEM STATEMENT SPECIFICATION MODAL
           ==================================================================== */}
        <AnimatePresence>
          {inspectedProblem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/90 backdrop-blur-2xl p-4 sm:p-6"
              onClick={() => setInspectedProblem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 18 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-panel relative w-full max-w-2xl overflow-hidden rounded-3xl p-7 sm:p-8 space-y-5 max-h-[88vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between gap-4 pb-4">
                  <div>
                    <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-xs">
                      {inspectedProblem.code} ·{" "}
                      {inspectedProblem.technicalDomain}
                    </span>
                    <h3 className="mt-2 text-2xl font-extrabold text-white">
                      {inspectedProblem.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInspectedProblem(null)}
                    className="ag-btn-secondary rounded-xl p-2"
                  >
                    <X className="h-4 w-4 text-[#C4EEFF]" />
                  </button>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  {inspectedProblem.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#051020] p-4">
                    <p className="font-mono text-xs font-bold uppercase text-[#80D8FF] mb-2">
                      EXPECTED DELIVERABLES
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                      {inspectedProblem.expectedDeliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-[#051020] p-4">
                    <p className="font-mono text-xs font-bold uppercase text-[#80D8FF] mb-2">
                      EVALUATION CRITERIA
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                      {inspectedProblem.evaluationCriteria.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====================================================================
            6. SELECTION CONFIRMATION DIALOG MODAL
           ==================================================================== */}
        <AnimatePresence>
          {confirmTargetProblem && activeTeam && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#020813]/90 backdrop-blur-2xl p-4 sm:p-6"
              onClick={() => setConfirmTargetProblem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 18 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-panel max-w-lg w-full rounded-3xl p-7 sm:p-8 space-y-5"
              >
                <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-xs">
                  CONFIRM PRIMARY PROBLEM SELECTION
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  Assign {confirmTargetProblem.code} to {activeTeam.name}?
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeTeam.selectedProblemCode
                    ? `Your team currently holds ${activeTeam.selectedProblemCode}. Confirming will atomically release ${activeTeam.selectedProblemCode} and lock ${confirmTargetProblem.code} (${confirmTargetProblem.title}) as your primary problem statement.`
                    : `Confirming will lock ${confirmTargetProblem.code} (${confirmTargetProblem.title}) as your team's primary problem statement and advance your lifecycle status to 'Problem Statement Selected'.`}
                </p>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setConfirmTargetProblem(null)}
                    className="ag-btn-secondary rounded-xl px-4 py-2.5 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirmSelection(confirmTargetProblem)}
                    className="ag-btn-primary rounded-xl px-5 py-2.5 text-xs"
                  >
                    Confirm &amp; Lock {confirmTargetProblem.code}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
