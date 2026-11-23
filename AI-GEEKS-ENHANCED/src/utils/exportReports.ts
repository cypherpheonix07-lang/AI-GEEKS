// src/utils/exportReports.ts

import {
  HackathonEventConfig,
  HackathonIntelligenceSummary,
  HackathonTeamRecord,
  StatusHistoryEntry,
  UserRole,
  calculateTeamMilestonePercentage,
} from "@/data/hackathonStore";

export type ExportFormat = "csv" | "json";

/**
 * Sanitizes cell values against CSV Formula Injection (OWASP CSV Injection)
 * and formats fields according to RFC 4180.
 */
function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let str = String(value);

  // Prevent spreadsheet formula execution if cell starts with =, +, -, @, Tab, or CR
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  // Escape double quotes and wrap in quotes if needed
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Converts an array of flat objects into an RFC 4180 CSV string with UTF-8 BOM.
 */
export function serializeToCsv<T extends Record<string, unknown>>(
  rows: T[]
): string {
  if (rows.length === 0) return "\uFEFFNo records available\r\n";

  const headers = Object.keys(rows[0]);
  const headerLine = headers.map((h) => escapeCsvCell(h)).join(",");
  const dataLines = rows.map((row) =>
    headers.map((header) => escapeCsvCell(row[header])).join(",")
  );

  return `\uFEFF${[headerLine, ...dataLines].join("\r\n")}\r\n`;
}

/**
 * Triggers a client-side file download in the browser.
 */
export function triggerBrowserDownload(
  content: string,
  filename: string,
  mimeType: string
): void {
  if (typeof window === "undefined") return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function buildTimestampSlug(): string {
  return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

/**
 * 1. Export Problem Statement Selection Counts & Capacity Analytics (Phase 11)
 */
export function exportProblemSelectionReport(
  hackathon: HackathonEventConfig,
  intelligence: HackathonIntelligenceSummary,
  role: UserRole,
  format: ExportFormat
): { filename: string; rowCount: number } {
  const rows = intelligence.problemBreakdown.map((item) => ({
    hackathonId: hackathon.id,
    hackathonEdition: hackathon.edition,
    problemCode: item.code,
    problemTitle: item.title,
    category: item.category,
    difficulty: item.difficulty,
    selectedTeamsCount: item.selectedTeamsCount,
    selectionSharePercent: `${item.selectionSharePercent}%`,
    maxCapacity: item.maxCapacity,
    remainingCapacity: item.remainingCapacity,
    capacityUtilizationPercent: `${item.capacityUtilizationPercent}%`,
    capacityStatus: item.isFullCapacity ? "FULL_CAPACITY" : "AVAILABLE",
    assignedTeamIds: item.assignedTeams.map((t) => t.id).join(" | ") || "NONE",
    assignedTeamNames:
      item.assignedTeams.map((t) => t.name).join(" | ") || "NONE",
  }));

  const slug = buildTimestampSlug();
  const baseFilename = `aigeeks-${hackathon.id}-problem-selection-analytics-${slug}`;

  if (format === "csv") {
    const csv = serializeToCsv(rows);
    triggerBrowserDownload(csv, `${baseFilename}.csv`, "text/csv;charset=utf-8");
    return { filename: `${baseFilename}.csv`, rowCount: rows.length };
  }

  const jsonPayload = JSON.stringify(
    {
      schemaVersion: "4.0.0",
      reportType: "PROBLEM_STATEMENT_SELECTION_INTELLIGENCE",
      exportedAt: new Date().toISOString(),
      exportedByRole: role,
      hackathon: {
        id: hackathon.id,
        title: hackathon.title,
        edition: hackathon.edition,
      },
      summaryMetrics: {
        totalRegisteredTeams: intelligence.totalRegisteredTeams,
        totalEligibleTeams: intelligence.totalEligibleTeams,
        teamsWithActiveSelection: intelligence.teamsWithActiveSelection,
        teamsWithoutActiveSelection: intelligence.teamsWithoutActiveSelection,
        selectionConversionRatePercent:
          intelligence.selectionConversionRatePercent,
        mostSelectedProblem: intelligence.mostSelectedProblem,
        leastSelectedProblem: intelligence.leastSelectedProblem,
        zeroSelectionStatementsCount: intelligence.zeroSelectionStatementsCount,
        fullCapacityStatementsCount: intelligence.fullCapacityStatementsCount,
        totalRemainingCapacity: intelligence.totalRemainingCapacity,
      },
      problemBreakdown: rows,
      domainPopularity: intelligence.domainPopularity,
    },
    null,
    2
  );

  triggerBrowserDownload(
    jsonPayload,
    `${baseFilename}.json`,
    "application/json;charset=utf-8"
  );
  return { filename: `${baseFilename}.json`, rowCount: rows.length };
}

/**
 * 2. Export 6-Dimension Team Status Matrix & Milestone Progress (Phases 06, 07, 08)
 */
export function exportTeamStatusMatrixReport(
  hackathon: HackathonEventConfig,
  teams: HackathonTeamRecord[],
  role: UserRole,
  format: ExportFormat
): { filename: string; rowCount: number } {
  const isAdminOrOrg =
    role === "Super Administrator" ||
    role === "Hackathon Administrator" ||
    role === "Event Organizer";

  const rows = teams.map((team) => {
    const milestonePercent = calculateTeamMilestonePercentage(team, hackathon);
    return {
      teamId: team.id,
      teamName: team.name,
      institution: team.institution,
      memberCount: team.members.length,
      leaderName: team.leaderName,
      leaderEmail: isAdminOrOrg
        ? team.leaderEmailPrivate
        : "[MASKED_BY_RBAC]",
      selectedProblemCode: team.selectedProblemCode || "UNASSIGNED",
      registrationStatus: team.registrationStatus,
      problemSelectionStatus: team.problemSelectionStatus,
      developmentStatus: team.developmentStatus,
      milestoneCompletionPercent: `${milestonePercent}%`,
      currentMilestone: team.currentMilestoneLabel,
      activeBlocker: team.activeBlocker || "NONE",
      submissionStatus: team.submissionStatus,
      evaluationStatus: team.evaluationStatus,
      competitionOutcome: team.competitionOutcome,
      judgeTotalScore:
        team.evaluation?.totalScore !== undefined
          ? `${team.evaluation.totalScore}/100`
          : "NOT_EVALUATED",
      githubRepoUrl: team.githubRepoUrl || "NOT_SUBMITTED",
      liveDemoUrl: team.liveDemoUrl || "NOT_SUBMITTED",
      lastUpdated: team.lastUpdated,
    };
  });

  const slug = buildTimestampSlug();
  const baseFilename = `aigeeks-${hackathon.id}-team-status-matrix-${slug}`;

  if (format === "csv") {
    const csv = serializeToCsv(rows);
    triggerBrowserDownload(csv, `${baseFilename}.csv`, "text/csv;charset=utf-8");
    return { filename: `${baseFilename}.csv`, rowCount: rows.length };
  }

  const jsonPayload = JSON.stringify(
    {
      schemaVersion: "4.0.0",
      reportType: "SIX_DIMENSION_TEAM_STATUS_MATRIX",
      exportedAt: new Date().toISOString(),
      exportedByRole: role,
      hackathonId: hackathon.id,
      totalTeams: rows.length,
      teams: rows,
    },
    null,
    2
  );

  triggerBrowserDownload(
    jsonPayload,
    `${baseFilename}.json`,
    "application/json;charset=utf-8"
  );
  return { filename: `${baseFilename}.json`, rowCount: rows.length };
}

/**
 * 3. Export Judge Rubric Scores & Qualification Standings (Phase 14)
 */
export function exportJudgeRubricScoresReport(
  hackathon: HackathonEventConfig,
  teams: HackathonTeamRecord[],
  role: UserRole,
  format: ExportFormat
): { filename: string; rowCount: number } {
  const canViewJudgeRemarks =
    role === "Super Administrator" ||
    role === "Hackathon Administrator" ||
    role === "Judge";

  const sortedTeams = [...teams].sort(
    (a, b) => (b.evaluation?.totalScore ?? -1) - (a.evaluation?.totalScore ?? -1)
  );

  const rows = sortedTeams.map((team, idx) => ({
    standingRank: team.evaluation ? idx + 1 : "UNRANKED",
    teamId: team.id,
    teamName: team.name,
    institution: team.institution,
    problemCode: team.selectedProblemCode || "UNASSIGNED",
    submissionStatus: team.submissionStatus,
    evaluationStatus: team.evaluationStatus,
    competitionOutcome: team.competitionOutcome,
    judgeName: team.evaluation?.judgeName || "PENDING_ASSIGNMENT",
    architectureScore_25: team.evaluation?.architectureScore ?? 0,
    alignmentScore_25: team.evaluation?.alignmentScore ?? 0,
    innovationScore_25: team.evaluation?.innovationScore ?? 0,
    demoUxScore_25: team.evaluation?.demoUxScore ?? 0,
    totalRubricScore_100: team.evaluation?.totalScore ?? 0,
    evaluatedAt: team.evaluation?.evaluatedAt || "PENDING",
    judgeRemarks: canViewJudgeRemarks
      ? team.evaluation?.remarks || "No remarks recorded"
      : "[RESTRICTED_TO_JUDGES_AND_ADMINS]",
    githubRepoUrl: team.githubRepoUrl || "NONE",
    liveDemoUrl: team.liveDemoUrl || "NONE",
  }));

  const slug = buildTimestampSlug();
  const baseFilename = `aigeeks-${hackathon.id}-judge-rubric-scores-${slug}`;

  if (format === "csv") {
    const csv = serializeToCsv(rows);
    triggerBrowserDownload(csv, `${baseFilename}.csv`, "text/csv;charset=utf-8");
    return { filename: `${baseFilename}.csv`, rowCount: rows.length };
  }

  const jsonPayload = JSON.stringify(
    {
      schemaVersion: "4.0.0",
      reportType: "JUDGE_RUBRIC_EVALUATIONS_AND_STANDINGS",
      exportedAt: new Date().toISOString(),
      exportedByRole: role,
      hackathonId: hackathon.id,
      evaluatedTeamsCount: teams.filter((t) => Boolean(t.evaluation)).length,
      totalTeamsCount: teams.length,
      rubricStandings: rows,
    },
    null,
    2
  );

  triggerBrowserDownload(
    jsonPayload,
    `${baseFilename}.json`,
    "application/json;charset=utf-8"
  );
  return { filename: `${baseFilename}.json`, rowCount: rows.length };
}

/**
 * 4. Export Immutable Governance & Status Transition Audit Logs (Phase 12 & 13)
 */
export function exportGovernanceAuditLogsReport(
  hackathon: HackathonEventConfig,
  auditLogs: StatusHistoryEntry[],
  role: UserRole,
  format: ExportFormat
): { filename: string; rowCount: number } {
  const rows = auditLogs.map((entry) => ({
    auditId: entry.id,
    hackathonId: entry.hackathonId,
    teamId: entry.teamId,
    statusDimension: entry.dimension,
    previousStatus: entry.previousStatus,
    newStatus: entry.newStatus,
    actor: entry.actor,
    isOverride: entry.isOverride ? "TRUE" : "FALSE",
    reason: entry.reason,
    timestamp: entry.timestamp,
  }));

  const slug = buildTimestampSlug();
  const baseFilename = `aigeeks-${hackathon.id}-governance-audit-logs-${slug}`;

  if (format === "csv") {
    const csv = serializeToCsv(rows);
    triggerBrowserDownload(csv, `${baseFilename}.csv`, "text/csv;charset=utf-8");
    return { filename: `${baseFilename}.csv`, rowCount: rows.length };
  }

  const jsonPayload = JSON.stringify(
    {
      schemaVersion: "4.0.0",
      reportType: "IMMUTABLE_GOVERNANCE_AUDIT_LOGS",
      exportedAt: new Date().toISOString(),
      exportedByRole: role,
      hackathonId: hackathon.id,
      totalAuditEntries: rows.length,
      auditTrail: rows,
    },
    null,
    2
  );

  triggerBrowserDownload(
    jsonPayload,
    `${baseFilename}.json`,
    "application/json;charset=utf-8"
  );
  return { filename: `${baseFilename}.json`, rowCount: rows.length };
}
