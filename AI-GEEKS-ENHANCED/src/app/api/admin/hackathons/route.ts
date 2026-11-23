// src/app/api/admin/hackathons/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  SEED_HACKATHONS,
  SEED_PROBLEMS,
  SEED_TEAMS,
  SEED_SELECTIONS,
  SEED_SUBMISSIONS,
  SEED_PROGRESS_UPDATES,
  SEEDED_ANONYMIZED_CORE_TEAM,
  Hackathon,
  ProblemStatement,
  HackathonTeam,
  ProblemSelection,
  TeamSubmission,
  TeamProgressUpdate,
  TeamStatusHistory,
  AuditLog,
  AnonymizedCoreTeamMember,
  RBACRole,
  TeamLifecycleStatus,
  computeProblemSelectionAnalytics,
} from "@/lib/hackathonEngine";

// Persistent server store for the isolated enhanced copy
const engineStore: {
  hackathons: Hackathon[];
  problems: ProblemStatement[];
  teams: HackathonTeam[];
  selections: ProblemSelection[];
  submissions: TeamSubmission[];
  progressUpdates: TeamProgressUpdate[];
  statusHistory: TeamStatusHistory[];
  auditLogs: AuditLog[];
  coreTeamCms: AnonymizedCoreTeamMember[];
} = {
  hackathons: [...SEED_HACKATHONS],
  problems: [...SEED_PROBLEMS],
  teams: [...SEED_TEAMS],
  selections: [...SEED_SELECTIONS],
  submissions: [...SEED_SUBMISSIONS],
  progressUpdates: [...SEED_PROGRESS_UPDATES],
  statusHistory: [
    {
      id: "sh-01",
      teamId: "TEAM-101",
      hackathonId: "hk-2026-ai-challenge",
      previousStatus: "Finalist",
      newStatus: "Winner",
      changedBy: "Aarav Mehta",
      changedByRole: "Super Administrator",
      reason: "Ranked #1 in final evaluation rubric.",
      timestamp: "2026-11-18T21:15:00Z",
    },
  ],
  auditLogs: [
    {
      id: "aud-100",
      hackathonId: "hk-2026-ai-challenge",
      actingUser: "Aarav Mehta",
      actingRole: "Super Administrator",
      actionType: "PROBLEM_SELECTED",
      targetRecord: "TEAM-101 -> PS-001",
      previousValue: "Unassigned",
      updatedValue: "PS-001",
      timestamp: "2026-11-14T10:15:00Z",
    },
  ],
  coreTeamCms: [...SEEDED_ANONYMIZED_CORE_TEAM],
};

function maskTeamsForRole(
  teams: HackathonTeam[],
  role: RBACRole
): HackathonTeam[] {
  const canViewPrivateContact =
    role === "Super Administrator" ||
    role === "Hackathon Administrator" ||
    role === "Organizer";

  if (canViewPrivateContact) return teams;

  return teams.map((team) => ({
    ...team,
    leaderEmailPrivate: "[PROTECTED BY SERVER RBAC]",
    members: team.members.map((m) => ({
      ...m,
      emailPrivate: "[PROTECTED BY SERVER RBAC]",
    })),
  }));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hackathonId =
    searchParams.get("hackathonId") || "hk-2026-ai-challenge";
  const role =
    (request.headers.get("x-ag-rbac-role") as RBACRole) ||
    "Super Administrator";

  const analytics = computeProblemSelectionAnalytics(
    hackathonId,
    engineStore.problems,
    engineStore.teams,
    engineStore.selections
  );

  return NextResponse.json({
    ok: true,
    role,
    hackathons: engineStore.hackathons,
    problems: engineStore.problems.filter((p) => p.hackathonId === hackathonId),
    teams: maskTeamsForRole(
      engineStore.teams.filter((t) => t.hackathonId === hackathonId),
      role
    ),
    selections: engineStore.selections.filter(
      (s) => s.hackathonId === hackathonId
    ),
    submissions: engineStore.submissions.filter(
      (s) => s.hackathonId === hackathonId
    ),
    progressUpdates: engineStore.progressUpdates.filter(
      (p) => p.hackathonId === hackathonId
    ),
    statusHistory: engineStore.statusHistory.filter(
      (h) => h.hackathonId === hackathonId
    ),
    auditLogs: engineStore.auditLogs.filter(
      (a) => a.hackathonId === hackathonId
    ),
    coreTeamCms: engineStore.coreTeamCms,
    analytics,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    action,
    hackathonId = "hk-2026-ai-challenge",
    actingUser = "Aarav Mehta",
    actingRole = "Super Administrator",
  } = body as {
    action: string;
    hackathonId?: string;
    actingUser?: string;
    actingRole?: RBACRole;
    [key: string]: unknown;
  };

  const nowIso = new Date().toISOString();
  const todayDate = nowIso.slice(0, 10);
  const isAdminOrOrganizer =
    actingRole === "Super Administrator" ||
    actingRole === "Hackathon Administrator" ||
    actingRole === "Organizer";

  // ==========================================================================
  // 1. SELECT OR TRANSFER TEAM PROBLEM STATEMENT (ATOMIC COUNT UPDATE)
  // ==========================================================================
  if (action === "SELECT_OR_TRANSFER_PROBLEM") {
    const { teamId, problemId } = body as {
      teamId: string;
      problemId: string;
    };

    if (!isAdminOrOrganizer && actingRole !== "Team Leader") {
      return NextResponse.json(
        {
          ok: false,
          error:
            "RBAC 403: Only Authorized Administrators, Organizers, or Team Leaders may select a problem statement.",
        },
        { status: 403 }
      );
    }

    const team = engineStore.teams.find(
      (t) => t.id === teamId && t.hackathonId === hackathonId
    );
    if (!team) {
      return NextResponse.json(
        { ok: false, error: "Team not found." },
        { status: 404 }
      );
    }

    if (team.eligibilityStatus !== "Verified" && !isAdminOrOrganizer) {
      return NextResponse.json(
        {
          ok: false,
          error: `Team ${team.id} is currently '${team.eligibilityStatus}'. Only Verified teams can select a problem statement.`,
        },
        { status: 400 }
      );
    }

    const targetProblem = engineStore.problems.find(
      (p) => p.id === problemId && p.hackathonId === hackathonId
    );
    if (!targetProblem || targetProblem.status !== "Published") {
      return NextResponse.json(
        { ok: false, error: "Problem statement is not published or available." },
        { status: 400 }
      );
    }

    if (team.selectedProblemId === targetProblem.id) {
      return NextResponse.json(
        {
          ok: false,
          error: `Duplicate Selection Blocked: ${team.name} already holds an active selection for ${targetProblem.code}.`,
        },
        { status: 409 }
      );
    }

    // Concurrency & Capacity Lock Check
    const activeTeamsOnTarget = new Set(
      engineStore.selections
        .filter(
          (s) =>
            s.hackathonId === hackathonId &&
            s.problemId === targetProblem.id &&
            s.status === "ACTIVE"
        )
        .map((s) => s.teamId)
    );

    if (activeTeamsOnTarget.size >= targetProblem.maxAllowedTeams) {
      return NextResponse.json(
        {
          ok: false,
          error: `Capacity Limit Reached: ${targetProblem.code} already has ${targetProblem.maxAllowedTeams}/${targetProblem.maxAllowedTeams} teams selected.`,
        },
        { status: 409 }
      );
    }

    const previousProblemCode = team.selectedProblemCode || "Unassigned";

    // Atomically mark any previous ACTIVE selection for this team as TRANSFERRED
    engineStore.selections = engineStore.selections.map((sel) =>
      sel.hackathonId === hackathonId &&
      sel.teamId === team.id &&
      sel.status === "ACTIVE"
        ? { ...sel, status: "TRANSFERRED" }
        : sel
    );

    // Insert new ACTIVE selection
    engineStore.selections.push({
      id: `sel-${Date.now()}`,
      hackathonId,
      teamId: team.id,
      teamName: team.name,
      problemId: targetProblem.id,
      problemCode: targetProblem.code,
      status: "ACTIVE",
      selectedDate: todayDate,
      timestamp: nowIso,
      actor: actingUser,
    });

    // Update team fields & lifecycle status if needed
    team.selectedProblemId = targetProblem.id;
    team.selectedProblemCode = targetProblem.code;
    team.selectedProblemTitle = targetProblem.title;
    team.lastActivity = nowIso.slice(0, 16).replace("T", " ");
    if (
      team.lifecycleStatus === "Registered" ||
      team.lifecycleStatus === "Pending Verification" ||
      team.lifecycleStatus === "Verified"
    ) {
      const oldStatus = team.lifecycleStatus;
      team.lifecycleStatus = "Problem Statement Selected";
      engineStore.statusHistory.unshift({
        id: `sh-${Date.now()}`,
        teamId: team.id,
        hackathonId,
        previousStatus: oldStatus,
        newStatus: "Problem Statement Selected",
        changedBy: actingUser,
        changedByRole: actingRole,
        reason: `Selected problem statement ${targetProblem.code}`,
        timestamp: nowIso,
      });
    }

    engineStore.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      hackathonId,
      actingUser,
      actingRole,
      actionType:
        previousProblemCode === "Unassigned"
          ? "PROBLEM_SELECTED"
          : "PROBLEM_TRANSFERRED",
      targetRecord: `${team.id} (${team.name})`,
      previousValue: previousProblemCode,
      updatedValue: targetProblem.code,
      timestamp: nowIso,
    });
  }

  // ==========================================================================
  // 2. UPDATE TEAM LIFECYCLE STATUS (PHASE 03 — 12 STATUSES)
  // ==========================================================================
  if (action === "UPDATE_TEAM_LIFECYCLE_STATUS") {
    if (!isAdminOrOrganizer) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "RBAC 403: Only Administrators and Organizers may update official team lifecycle statuses.",
        },
        { status: 403 }
      );
    }

    const {
      teamId,
      newStatus,
      assignedReviewer,
      reason = "Organizer status transition",
    } = body as {
      teamId: string;
      newStatus: TeamLifecycleStatus;
      assignedReviewer?: string;
      reason?: string;
    };

    const team = engineStore.teams.find(
      (t) => t.id === teamId && t.hackathonId === hackathonId
    );
    if (!team) {
      return NextResponse.json(
        { ok: false, error: "Team not found." },
        { status: 404 }
      );
    }

    const prevStatus = team.lifecycleStatus;
    team.lifecycleStatus = newStatus;
    if (newStatus === "Verified") {
      team.eligibilityStatus = "Verified";
    }
    if (assignedReviewer) {
      team.assignedReviewer = assignedReviewer;
    }
    team.lastActivity = nowIso.slice(0, 16).replace("T", " ");

    engineStore.statusHistory.unshift({
      id: `sh-${Date.now()}`,
      teamId: team.id,
      hackathonId,
      previousStatus: prevStatus,
      newStatus,
      changedBy: actingUser,
      changedByRole: actingRole,
      reason,
      timestamp: nowIso,
    });

    engineStore.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      hackathonId,
      actingUser,
      actingRole,
      actionType: "TEAM_STATUS_UPDATED",
      targetRecord: `${team.id} (${team.name})`,
      previousValue: prevStatus,
      updatedValue: newStatus,
      timestamp: nowIso,
    });
  }

  // ==========================================================================
  // 3. CREATE NEW PROBLEM STATEMENT (PHASE 04 & 06)
  // ==========================================================================
  if (action === "CREATE_PROBLEM_STATEMENT") {
    if (
      actingRole !== "Super Administrator" &&
      actingRole !== "Hackathon Administrator"
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "RBAC 403: Only Super Administrators or Hackathon Administrators can create problem statements.",
        },
        { status: 403 }
      );
    }

    const {
      code,
      title,
      description,
      technicalDomain,
      difficulty = "Intermediate",
      maxAllowedTeams = 4,
    } = body as {
      code: string;
      title: string;
      description: string;
      technicalDomain: string;
      difficulty?: "Beginner" | "Intermediate" | "Advanced";
      maxAllowedTeams?: number;
    };

    const nextNum = String(engineStore.problems.length + 1).padStart(3, "0");
    const problemCode = (code || `PS-${nextNum}`).trim().toUpperCase();

    const created: ProblemStatement = {
      id: `ps-id-${Date.now()}`,
      code: problemCode,
      hackathonId,
      title: title.trim(),
      description: description.trim(),
      technicalDomain: technicalDomain.trim(),
      difficulty,
      requiredTechnologies: ["TypeScript", "Next.js 16"],
      expectedDeliverables: ["Working Repository", "Live Demo"],
      evaluationCriteria: ["Technical Architecture", "Problem Alignment"],
      publishedDate: todayDate,
      status: "Published",
      maxAllowedTeams: Number(maxAllowedTeams) || 4,
    };

    engineStore.problems.push(created);

    engineStore.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      hackathonId,
      actingUser,
      actingRole,
      actionType: "PROBLEM_CREATED",
      targetRecord: `${created.code} (${created.title})`,
      previousValue: "None",
      updatedValue: `Published (Max Teams: ${created.maxAllowedTeams})`,
      timestamp: nowIso,
    });
  }

  // ==========================================================================
  // 4. UPDATE ANONYMIZED CORE TEAM DISPLAY VIA CMS (PHASE 02.7)
  // ==========================================================================
  if (action === "UPDATE_CORE_TEAM_CMS") {
    if (actingRole !== "Super Administrator") {
      return NextResponse.json(
        {
          ok: false,
          error:
            "RBAC 403: Only Super Administrators can modify Core Team CMS display profiles.",
        },
        { status: 403 }
      );
    }

    const { memberId, fictionalName, role, inChargeOf } = body as {
      memberId: string;
      fictionalName: string;
      role: string;
      inChargeOf: string;
    };

    const member = engineStore.coreTeamCms.find((m) => m.id === memberId);
    if (member) {
      const oldName = member.fictionalName;
      member.fictionalName = fictionalName.trim();
      member.role = role.trim();
      member.inChargeOf = inChargeOf.trim();
      member.lastEditedBy = actingUser;

      engineStore.auditLogs.unshift({
        id: `aud-${Date.now()}`,
        hackathonId,
        actingUser,
        actingRole,
        actionType: "CORE_TEAM_CMS_UPDATED",
        targetRecord: member.id,
        previousValue: oldName,
        updatedValue: member.fictionalName,
        timestamp: nowIso,
      });
    }
  }

  const analytics = computeProblemSelectionAnalytics(
    hackathonId,
    engineStore.problems,
    engineStore.teams,
    engineStore.selections
  );

  return NextResponse.json({
    ok: true,
    problems: engineStore.problems.filter((p) => p.hackathonId === hackathonId),
    teams: maskTeamsForRole(
      engineStore.teams.filter((t) => t.hackathonId === hackathonId),
      actingRole
    ),
    selections: engineStore.selections.filter(
      (s) => s.hackathonId === hackathonId
    ),
    submissions: engineStore.submissions.filter(
      (s) => s.hackathonId === hackathonId
    ),
    progressUpdates: engineStore.progressUpdates.filter(
      (p) => p.hackathonId === hackathonId
    ),
    statusHistory: engineStore.statusHistory.filter(
      (h) => h.hackathonId === hackathonId
    ),
    auditLogs: engineStore.auditLogs.filter(
      (a) => a.hackathonId === hackathonId
    ),
    coreTeamCms: engineStore.coreTeamCms,
    analytics,
  });
}
