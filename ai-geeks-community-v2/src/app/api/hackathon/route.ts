// src/app/api/hackathon/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  HACKATHON_EVENTS,
  INITIAL_PROBLEM_STATEMENTS,
  INITIAL_TEAMS,
  INITIAL_SELECTION_RECORDS,
  ProblemStatementItem,
  HackathonTeamRecord,
  ProblemSelectionRecord,
  StatusHistoryEntry,
  UserRole,
  RegistrationStatus,
  ProblemSelectionStatus,
  DevelopmentStatus,
  SubmissionStatus,
  EvaluationStatus,
  CompetitionOutcome,
  computeHackathonIntelligence,
} from "@/data/hackathonStore";

// Persistent in-memory server state
const dbState: {
  problems: ProblemStatementItem[];
  teams: HackathonTeamRecord[];
  selections: ProblemSelectionRecord[];
  auditLogs: StatusHistoryEntry[];
} = {
  problems: [...INITIAL_PROBLEM_STATEMENTS],
  teams: [...INITIAL_TEAMS],
  selections: [...INITIAL_SELECTION_RECORDS],
  auditLogs: [
    {
      id: "aud-01",
      teamId: "TEAM-101",
      hackathonId: "hack-2026-flagship",
      dimension: "ProblemSelection",
      previousStatus: "Awaiting Selection",
      newStatus: "Problem Selected (PS-005)",
      actor: "Aarav Mehta",
      timestamp: "2026-11-16T09:30:00Z",
      reason: "Initial primary problem statement selection.",
    },
  ],
};

function sanitizeTeamsForRole(
  teams: HackathonTeamRecord[],
  role: UserRole
): HackathonTeamRecord[] {
  const isPrivileged =
    role === "Super Administrator" ||
    role === "Hackathon Administrator" ||
    role === "Event Organizer";

  if (isPrivileged) return teams;

  return teams.map((t) => ({
    ...t,
    leaderEmailPrivate: "[RESTRICTED — ADMIN ONLY]",
    adminRemarks:
      role === "Judge" ? t.adminRemarks : "[RESTRICTED TO ORGANIZERS]",
  }));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hackathonId = searchParams.get("hackathonId") || "hack-2026-flagship";
  const role =
    (request.headers.get("x-ag-role") as UserRole) || "Super Administrator";

  const intelligence = computeHackathonIntelligence(
    hackathonId,
    dbState.teams,
    dbState.problems,
    dbState.selections
  );

  return NextResponse.json({
    ok: true,
    role,
    events: HACKATHON_EVENTS,
    problems: dbState.problems.filter((p) => p.hackathonId === hackathonId),
    teams: sanitizeTeamsForRole(
      dbState.teams.filter((t) => t.hackathonId === hackathonId),
      role
    ),
    selections: dbState.selections.filter((s) => s.hackathonId === hackathonId),
    intelligence,
    auditLogs: dbState.auditLogs.filter((a) => a.hackathonId === hackathonId),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    action,
    role = "Super Administrator",
    actorName = "Aarav Mehta (Admin)",
    hackathonId = "hack-2026-flagship",
  } = body;

  const nowIso = new Date().toISOString();
  const nowTimeShort = new Date().toTimeString().slice(0, 5);

  // 1. TRANSACTIONAL PROBLEM STATEMENT SELECTION & CHANGE ENGINE (PHASE 10)
  if (action === "SELECT_OR_CHANGE_PROBLEM") {
    const { teamId, problemId, reason = "Team Leader problem selection" } = body;

    if (
      role === "Public Visitor" ||
      role === "Judge" ||
      role === "Team Member"
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "RBAC Denied: Only Team Leaders or Administrators may select or change problem statements.",
        },
        { status: 403 }
      );
    }

    const team = dbState.teams.find(
      (t) => t.id === teamId && t.hackathonId === hackathonId
    );
    if (!team) {
      return NextResponse.json(
        { ok: false, error: "Unregistered team ID." },
        { status: 404 }
      );
    }

    if (team.registrationStatus !== "Approved") {
      return NextResponse.json(
        {
          ok: false,
          error: `Ineligible Team: Registration status is '${team.registrationStatus}'. Only Approved teams may select a problem statement.`,
        },
        { status: 400 }
      );
    }

    if (team.problemSelectionStatus === "Selection Locked" && role === "Team Leader") {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Selection Locked: Problem selection is locked for this team. Contact a Hackathon Administrator for an override.",
        },
        { status: 403 }
      );
    }

    const problem = dbState.problems.find(
      (p) => p.id === problemId && p.hackathonId === hackathonId
    );
    if (
      !problem ||
      problem.publicationStatus !== "Published" ||
      !problem.selectionAvailable
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid or unpublished problem statement.",
        },
        { status: 400 }
      );
    }

    // Idempotency guard: check if team already holds this active selection
    if (team.selectedProblemId === problem.id) {
      return NextResponse.json(
        {
          ok: false,
          error: `Team ${team.name} already holds an active primary selection for ${problem.code}.`,
        },
        { status: 409 }
      );
    }

    // Concurrency & Capacity check: count distinct active teams on target problem
    const activeTeamsOnTarget = new Set(
      dbState.selections
        .filter(
          (s) =>
            s.hackathonId === hackathonId &&
            s.problemId === problem.id &&
            s.status === "ACTIVE" &&
            s.isPrimary
        )
        .map((s) => s.teamId)
    );

    if (activeTeamsOnTarget.size >= problem.maxCapacity) {
      return NextResponse.json(
        {
          ok: false,
          error: `Capacity Full: ${problem.code} has reached its maximum capacity of ${problem.maxCapacity} teams.`,
        },
        { status: 409 }
      );
    }

    // Atomic state update: release previous active selection if changing
    const previousCode = team.selectedProblemCode || "None";
    dbState.selections = dbState.selections.map((s) =>
      s.hackathonId === hackathonId &&
      s.teamId === team.id &&
      s.status === "ACTIVE"
        ? {
            ...s,
            status: "SUPERSEDED" as const,
            reason: `Superseded by ${problem.code}`,
          }
        : s
    );

    // Insert new ACTIVE primary selection
    dbState.selections.push({
      id: `sel-${Date.now()}`,
      hackathonId,
      teamId: team.id,
      problemId: problem.id,
      problemCode: problem.code,
      status: "ACTIVE",
      isPrimary: true,
      selectedAt: nowIso,
      actorName,
      reason,
    });

    // Update team record
    team.selectedProblemId = problem.id;
    team.selectedProblemCode = problem.code;
    team.problemSelectionStatus = "Problem Selected";
    if (team.developmentStatus === "Not Started") {
      team.developmentStatus = "Idea Submitted";
    }
    team.lastUpdated = nowIso;
    team.activityTimeline.push({
      time: nowTimeShort,
      event:
        previousCode === "None"
          ? `Problem statement ${problem.code} selected`
          : `Changed problem statement from ${previousCode} to ${problem.code}`,
      actor: actorName,
    });

    dbState.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      teamId: team.id,
      hackathonId,
      dimension: "ProblemSelection",
      previousStatus: previousCode,
      newStatus: problem.code,
      actor: actorName,
      timestamp: nowIso,
      reason,
    });
  }

  // 2. TEAM REGISTRATION WORKFLOW (PHASE 06)
  if (action === "REGISTER_TEAM") {
    const { teamName, leaderName, leaderEmail, institution, members = [] } = body;
    const duplicate = dbState.teams.some(
      (t) =>
        t.hackathonId === hackathonId &&
        t.name.toLowerCase() === String(teamName).trim().toLowerCase()
    );
    if (duplicate) {
      return NextResponse.json(
        {
          ok: false,
          error: `Duplicate Registration: A team named '${teamName}' is already registered.`,
        },
        { status: 409 }
      );
    }

    const newTeamId = `TEAM-${100 + dbState.teams.length + 1}`;
    const newTeam: HackathonTeamRecord = {
      id: newTeamId,
      hackathonId,
      name: String(teamName).trim(),
      institution: String(institution).trim() || "Independent Builder Collective",
      leaderName: String(leaderName).trim(),
      leaderEmailPrivate: String(leaderEmail).trim(),
      members:
        members.length > 0
          ? members
          : [
              {
                id: `mem-${Date.now()}-1`,
                name: String(leaderName).trim(),
                role: "Team Leader",
              },
            ],
      registrationStatus: "Pending",
      problemSelectionStatus: "Not Started",
      developmentStatus: "Not Started",
      currentMilestoneLabel: "Team Registration & Idea Inception",
      submissionStatus: "Not Submitted",
      evaluationStatus: "Not Evaluated",
      competitionOutcome: "Pending",
      activityTimeline: [
        {
          time: nowTimeShort,
          event: "Team registration submitted (Pending Review)",
          actor: String(leaderName).trim(),
        },
      ],
      lastUpdated: nowIso,
    };

    dbState.teams.push(newTeam);
    dbState.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      teamId: newTeamId,
      hackathonId,
      dimension: "Registration",
      previousStatus: "NEW_APPLICATION",
      newStatus: "Pending",
      actor: actorName,
      timestamp: nowIso,
      reason: `Registered new team ${newTeam.name}`,
    });
  }

  // 3. STATUS DIMENSION TRANSITION (PHASES 07 & 13)
  if (action === "UPDATE_STATUS_DIMENSION") {
    const { teamId, dimension, newValue, reason = "Administrative update" } = body;

    const isAdminOrOrg =
      role === "Super Administrator" ||
      role === "Hackathon Administrator" ||
      role === "Event Organizer";

    if (!isAdminOrOrg) {
      return NextResponse.json(
        {
          ok: false,
          error: "RBAC Denied: Only Administrators or Organizers may update status dimensions.",
        },
        { status: 403 }
      );
    }

    const team = dbState.teams.find(
      (t) => t.id === teamId && t.hackathonId === hackathonId
    );
    if (!team) {
      return NextResponse.json(
        { ok: false, error: "Team not found." },
        { status: 404 }
      );
    }

    let prevValue = "";
    if (dimension === "Registration") {
      prevValue = team.registrationStatus;
      team.registrationStatus = newValue as RegistrationStatus;
    } else if (dimension === "ProblemSelection") {
      prevValue = team.problemSelectionStatus;
      team.problemSelectionStatus = newValue as ProblemSelectionStatus;
    } else if (dimension === "Development") {
      prevValue = team.developmentStatus;
      team.developmentStatus = newValue as DevelopmentStatus;
    } else if (dimension === "Submission") {
      prevValue = team.submissionStatus;
      team.submissionStatus = newValue as SubmissionStatus;
    } else if (dimension === "Evaluation") {
      prevValue = team.evaluationStatus;
      team.evaluationStatus = newValue as EvaluationStatus;
    } else if (dimension === "Outcome") {
      prevValue = team.competitionOutcome;
      team.competitionOutcome = newValue as CompetitionOutcome;
    }

    team.lastUpdated = nowIso;
    team.activityTimeline.push({
      time: nowTimeShort,
      event: `Status dimension '${dimension}' updated to '${newValue}'`,
      actor: actorName,
    });

    dbState.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      teamId: team.id,
      hackathonId,
      dimension,
      previousStatus: prevValue,
      newStatus: newValue,
      actor: actorName,
      timestamp: nowIso,
      reason,
    });
  }

  // 4. JUDGE RUBRIC EVALUATION (PHASE 14)
  if (action === "SUBMIT_EVALUATION") {
    const {
      teamId,
      architectureScore = 0,
      alignmentScore = 0,
      innovationScore = 0,
      demoUxScore = 0,
      remarks = "",
    } = body;

    const canJudge =
      role === "Judge" ||
      role === "Super Administrator" ||
      role === "Hackathon Administrator";

    if (!canJudge) {
      return NextResponse.json(
        {
          ok: false,
          error: "RBAC Denied: Only assigned Judges or Administrators may submit evaluation rubrics.",
        },
        { status: 403 }
      );
    }

    const team = dbState.teams.find(
      (t) => t.id === teamId && t.hackathonId === hackathonId
    );
    if (!team) {
      return NextResponse.json(
        { ok: false, error: "Team not found." },
        { status: 404 }
      );
    }

    const arch = Math.max(0, Math.min(25, Number(architectureScore)));
    const align = Math.max(0, Math.min(25, Number(alignmentScore)));
    const innov = Math.max(0, Math.min(25, Number(innovationScore)));
    const demo = Math.max(0, Math.min(25, Number(demoUxScore)));
    const total = arch + align + innov + demo;

    team.evaluation = {
      totalScore: total,
      architectureScore: arch,
      alignmentScore: align,
      innovationScore: innov,
      demoUxScore: demo,
      judgeName: actorName,
      evaluatedAt: nowIso,
      remarks,
    };
    team.evaluationStatus = "Evaluated";
    team.lastUpdated = nowIso;
    team.activityTimeline.push({
      time: nowTimeShort,
      event: `Judge rubric score submitted: ${total}/100`,
      actor: actorName,
    });

    dbState.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      teamId: team.id,
      hackathonId,
      dimension: "Evaluation",
      previousStatus: "Under Review",
      newStatus: `Evaluated (${total}/100)`,
      actor: actorName,
      timestamp: nowIso,
      reason: remarks || "4-pillar pure-software rubric evaluation.",
    });
  }

  const intelligence = computeHackathonIntelligence(
    hackathonId,
    dbState.teams,
    dbState.problems,
    dbState.selections
  );

  return NextResponse.json({
    ok: true,
    problems: dbState.problems.filter((p) => p.hackathonId === hackathonId),
    teams: sanitizeTeamsForRole(
      dbState.teams.filter((t) => t.hackathonId === hackathonId),
      role
    ),
    selections: dbState.selections.filter((s) => s.hackathonId === hackathonId),
    auditLogs: dbState.auditLogs.filter((a) => a.hackathonId === hackathonId),
    intelligence,
  });
}
