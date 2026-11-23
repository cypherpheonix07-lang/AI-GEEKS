"use client";

import React, { useMemo, useState } from "react";
import {
  Trophy,
  Award,
  Medal,
  FileImage,
  FileCode2,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Users,
  Eye,
  Lock,
  Globe,
} from "lucide-react";
import {
  HackathonEventConfig,
  HackathonTeamRecord,
  ProblemStatementItem,
  UserRole,
  CompetitionOutcome,
} from "@/data/hackathonStore";
import {
  DEFAULT_CERTIFICATE_CONFIG,
  CertificateConfigOptions,
  generateCertificateSvg,
  generateCertificateVerificationId,
  downloadCertificateSvg,
  downloadCertificatePng,
  generateWinnerAnnouncementCopy,
} from "@/utils/certificateGenerator";

interface WinnerCertificateModuleProps {
  hackathon: HackathonEventConfig;
  teams: HackathonTeamRecord[];
  problems: ProblemStatementItem[];
  currentRole: UserRole;
  onPromoteOutcome: (teamId: string, outcome: CompetitionOutcome) => void;
  onLogAction: (summary: string) => void;
}

export default function WinnerCertificateModule({
  hackathon,
  teams,
  problems,
  currentRole,
  onPromoteOutcome,
  onLogAction,
}: WinnerCertificateModuleProps) {
  const [resultsPublished, setResultsPublished] = useState<boolean>(true);
  const [certConfig, setCertConfig] = useState<CertificateConfigOptions>(
    DEFAULT_CERTIFICATE_CONFIG
  );

  // Filter teams eligible for podium & certificates (Winner, Runner-Up, Finalist, Completed)
  const podiumTeams = useMemo(() => {
    const order: Record<string, number> = {
      Winner: 1,
      "Runner-Up": 2,
      Finalist: 3,
      Completed: 4,
    };
    return teams
      .filter(
        (t) =>
          t.competitionOutcome === "Winner" ||
          t.competitionOutcome === "Runner-Up" ||
          t.competitionOutcome === "Finalist" ||
          t.competitionOutcome === "Completed"
      )
      .sort(
        (a, b) =>
          (order[a.competitionOutcome] || 99) -
            (order[b.competitionOutcome] || 99) ||
          (b.evaluation?.totalScore ?? 0) - (a.evaluation?.totalScore ?? 0)
      );
  }, [teams]);

  const [selectedTeamId, setSelectedTeamId] = useState<string>(
    podiumTeams[0]?.id || teams[0]?.id || "TEAM-101"
  );
  const [selectedRecipientMode, setSelectedRecipientMode] =
    useState<string>("TEAM_COLLECTIVE");
  const [copiedAnnouncement, setCopiedAnnouncement] = useState(false);
  const [isRasterizingPng, setIsRasterizingPng] = useState(false);

  const isAdminOrOrg =
    currentRole === "Super Administrator" ||
    currentRole === "Hackathon Administrator" ||
    currentRole === "Event Organizer";

  const activeTeam =
    teams.find((t) => t.id === selectedTeamId) ||
    podiumTeams[0] ||
    teams[0];

  const activeProblem = problems.find(
    (p) => p.id === activeTeam?.selectedProblemId
  );

  // Determine recipient name and role for certificate
  const { recipientName, recipientRole } = useMemo(() => {
    if (!activeTeam) {
      return { recipientName: "AI GEEKS Builder", recipientRole: "Participant" };
    }
    if (selectedRecipientMode === "TEAM_COLLECTIVE") {
      return {
        recipientName: activeTeam.name,
        recipientRole: `Registered Hackathon Team (${activeTeam.members.length} Builders)`,
      };
    }
    const member = activeTeam.members.find(
      (m) => m.id === selectedRecipientMode
    );
    return {
      recipientName: member ? member.name : activeTeam.leaderName,
      recipientRole: member ? member.role : "Team Leader",
    };
  }, [activeTeam, selectedRecipientMode]);

  const certificateSvg = useMemo(() => {
    if (!activeTeam) return "";
    return generateCertificateSvg({
      hackathon,
      team: activeTeam,
      problem: activeProblem,
      recipientName,
      recipientRole,
      config: certConfig,
    });
  }, [
    hackathon,
    activeTeam,
    activeProblem,
    recipientName,
    recipientRole,
    certConfig,
  ]);

  const verificationId = useMemo(() => {
    if (!activeTeam) return "";
    return generateCertificateVerificationId(
      hackathon.id,
      activeTeam.id,
      recipientName,
      activeTeam.competitionOutcome
    );
  }, [hackathon.id, activeTeam, recipientName]);

  const announcementMarkdown = useMemo(
    () => generateWinnerAnnouncementCopy(hackathon, podiumTeams, problems),
    [hackathon, podiumTeams, problems]
  );

  const handleDownloadSvg = () => {
    if (!activeTeam) return;
    const file = downloadCertificateSvg(
      certificateSvg,
      activeTeam.id,
      recipientName
    );
    onLogAction(
      `Downloaded SVG Certificate (${file}) for ${recipientName} [${verificationId}]`
    );
  };

  const handleDownloadPng = async () => {
    if (!activeTeam) return;
    setIsRasterizingPng(true);
    try {
      const file = await downloadCertificatePng(
        certificateSvg,
        activeTeam.id,
        recipientName
      );
      onLogAction(
        `Downloaded High-DPI PNG Certificate (${file}) for ${recipientName} [${verificationId}]`
      );
    } finally {
      setIsRasterizingPng(false);
    }
  };

  const handleCopyAnnouncement = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(announcementMarkdown);
      setCopiedAnnouncement(true);
      onLogAction(
        `Copied official Winner Announcement broadcast for ${hackathon.edition}`
      );
      setTimeout(() => setCopiedAnnouncement(false), 2500);
    }
  };

  if (!resultsPublished && !isAdminOrOrg) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center">
        <Lock className="mx-auto h-10 w-10 text-[#80D8FF]" />
        <h3 className="mt-4 text-2xl font-extrabold text-white">
          Official Podium Results &amp; Certificates Pending Publication
        </h3>
        <p className="mt-2 max-w-md mx-auto text-sm text-slate-300">
          The judging panel is finalizing evaluations. Digital certificates and
          podium standings will unlock automatically once published by the
          Hackathon Administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 1. PODIUM ANNOUNCEMENT HEADER & PUBLICATION CONTROL BAR */}
      <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="ag-badge-cyan inline-flex items-center gap-2 rounded-full px-3.5 py-1">
              <Trophy className="h-3.5 w-3.5 text-[#80D8FF]" />
              <span className="font-mono text-xs uppercase tracking-widest">
                OFFICIAL PODIUM &amp; CRYPTOGRAPHIC CREDENTIAL GENERATOR
              </span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-white">
              Winner Announcement &amp;{" "}
              <span className="ag-text-gradient">Digital Certificates.</span>
            </h2>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-300">
              Issue verifiable vector SVG and high-DPI PNG certificates for{" "}
              <strong>Winner</strong>, <strong>Runner-Up</strong>, and{" "}
              <strong>Finalist</strong> teams or individual team builders.
            </p>
          </div>

          {isAdminOrOrg && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const next = !resultsPublished;
                  setResultsPublished(next);
                  onLogAction(
                    `${
                      next ? "Published" : "Unpublished"
                    } official podium standings & digital certificates`
                  );
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-bold uppercase transition-all ${
 resultsPublished ? "ag-btn-primary" : "ag-btn-secondary"
 }`}
              >
                <Globe className="h-4 w-4" />
                <span>
                  {resultsPublished
                    ? "Public Results: LIVE"
                    : "Public Results: HIDDEN"}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Official Podium Cards (Winner / Runner-Up / Finalist) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {podiumTeams.slice(0, 3).map((team) => {
            const isSelected = activeTeam?.id === team.id;
            const prob = problems.find((p) => p.id === team.selectedProblemId);
            const badgeStyle =
              team.competitionOutcome === "Winner"
                ? "bg-gradient-to-br from-[#80D8FF]/30 via-[#2B6CB0]/50 to-[#091B32]"
                : team.competitionOutcome === "Runner-Up"
                ? "bg-gradient-to-br from-[#4DA8DA]/25 via-[#163B63]/60 to-[#051020]"
                : "bg-[#051020]/90";

            return (
              <div
                key={team.id}
                onClick={() => {
                  setSelectedTeamId(team.id);
                  setSelectedRecipientMode("TEAM_COLLECTIVE");
                }}
                className={`cursor-pointer rounded-3xl p-6 transition-all ${badgeStyle} ${
                  isSelected
                    ? "shadow-[0_0_40px_rgba(128,216,255,0.45)]"
                    : "hover:-translate-y-1"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="ag-badge-cyan inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-extrabold uppercase">
                    {team.competitionOutcome === "Winner" ? (
                      <Trophy className="h-3.5 w-3.5 text-[#C4EEFF]" />
                    ) : team.competitionOutcome === "Runner-Up" ? (
                      <Medal className="h-3.5 w-3.5 text-[#80D8FF]" />
                    ) : (
                      <Award className="h-3.5 w-3.5 text-[#4DA8DA]" />
                    )}
                    <span>{team.competitionOutcome}</span>
                  </span>

                  {team.evaluation && (
                    <span className="rounded-lg bg-[#020813]/80 px-2.5 py-1 font-mono text-xs font-extrabold text-[#C4EEFF]">
                      {team.evaluation.totalScore}/100
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-2xl font-extrabold text-white">
                  {team.name}
                </h3>
                <p className="font-mono text-xs text-[#80D8FF] mt-0.5">
                  {team.id} · {team.institution}
                </p>

                <p className="mt-3 text-xs text-slate-200 line-clamp-2">
                  {prob
                    ? `${prob.code}: ${prob.title}`
                    : `Track: ${team.selectedProblemCode || "Open"}`}
                </p>

                <div className="mt-4 pt-4 flex items-center justify-between text-xs font-mono">
                  <span className="inline-flex items-center gap-1 text-slate-300">
                    <Users className="h-3.5 w-3.5 text-[#80D8FF]" />
                    {team.members.length} Builders
                  </span>
                  <span className="text-[#C4EEFF] font-bold">
                    Preview Certificate &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. INTERACTIVE CERTIFICATE STUDIO & LIVE VECTOR PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recipient Controls, Signatory Config & Admin Podium Assignment */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF]">
                  CREDENTIAL STUDIO CONTROLS
                </span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  Configure &amp; Export Certificate
                </h3>
              </div>
              <ShieldCheck className="h-5 w-5 text-[#C4EEFF]" />
            </div>

            {/* Select Team */}
            <div>
              <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-2">
                1. Select Qualified Team
              </label>
              <select
                value={activeTeam?.id || ""}
                onChange={(e) => {
                  setSelectedTeamId(e.target.value);
                  setSelectedRecipientMode("TEAM_COLLECTIVE");
                }}
                className="ag-input-metallic w-full rounded-xl px-4 py-3 text-xs font-bold text-[#C4EEFF]"
              >
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.id} — {t.name} [{t.competitionOutcome}]
                  </option>
                ))}
              </select>
            </div>

            {/* Select Recipient (Whole Team vs Individual Member) */}
            {activeTeam && (
              <div>
                <label className="block font-mono text-xs uppercase text-[#80D8FF] mb-2">
                  2. Certificate Recipient Scope
                </label>
                <select
                  value={selectedRecipientMode}
                  onChange={(e) => setSelectedRecipientMode(e.target.value)}
                  className="ag-input-metallic w-full rounded-xl px-4 py-3 text-xs font-semibold text-white"
                >
                  <option value="TEAM_COLLECTIVE">
                    Entire Team Certificate ({activeTeam.name})
                  </option>
                  {activeTeam.members.map((m) => (
                    <option key={m.id} value={m.id}>
                      Individual Builder: {m.name} ({m.role})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Admin Quick Outcome Assignment */}
            {isAdminOrOrg && activeTeam && (
              <div className="rounded-2xl bg-[#051020]/90 p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#80D8FF] mb-2.5">
                  ASSIGN PODIUM OUTCOME FOR {activeTeam.id}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    ["Winner", "Runner-Up", "Finalist", "Completed"] as const
                  ).map((outcome) => (
                    <button
                      key={outcome}
                      type="button"
                      onClick={() => onPromoteOutcome(activeTeam.id, outcome)}
                      className={`rounded-xl py-2 px-2 font-mono text-[11px] font-bold transition-all ${
 activeTeam.competitionOutcome === outcome
 ? "ag-btn-primary"
 : "ag-btn-secondary"
 }`}
                    >
                      {outcome}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Signatory Customization (Admin Only) */}
            {isAdminOrOrg && (
              <div className="space-y-3 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#80D8FF]">
                  CUSTOMIZE CERTIFICATE SIGNATORIES
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[10px] text-slate-400 mb-1">
                      Lead Organizer Name
                    </label>
                    <input
                      type="text"
                      value={certConfig.leadSignatoryName}
                      onChange={(e) =>
                        setCertConfig({
                          ...certConfig,
                          leadSignatoryName: e.target.value,
                        })
                      }
                      className="ag-input-metallic w-full rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-slate-400 mb-1">
                      Judging Chair Name
                    </label>
                    <input
                      type="text"
                      value={certConfig.judgeSignatoryName}
                      onChange={(e) =>
                        setCertConfig({
                          ...certConfig,
                          judgeSignatoryName: e.target.value,
                        })
                      }
                      className="ag-input-metallic w-full rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Verification Serial Readout */}
            <div className="rounded-2xl bg-[#020813] p-3.5 font-mono text-xs">
              <span className="text-[10px] uppercase text-slate-400 block">
                Deterministic Verification Serial
              </span>
              <span className="text-[#C4EEFF] font-bold break-all">
                {verificationId}
              </span>
            </div>

            {/* Download Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadSvg}
                className="ag-btn-secondary inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold"
              >
                <FileCode2 className="h-4 w-4 text-[#80D8FF]" />
                <span>Download Vector SVG</span>
              </button>
              <button
                type="button"
                disabled={isRasterizingPng}
                onClick={handleDownloadPng}
                className="ag-btn-primary inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs"
              >
                <FileImage className="h-4 w-4" />
                <span>
                  {isRasterizingPng
                    ? "Rendering PNG..."
                    : "Download High-DPI PNG"}
                </span>
              </button>
            </div>
          </div>

          {/* Official Winner Announcement Broadcast Generator */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#80D8FF]">
                  COMMUNITY BROADCAST GENERATOR
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  Official Winner Announcement Copy
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCopyAnnouncement}
                className="ag-btn-primary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs"
              >
                {copiedAnnouncement ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Markdown</span>
                  </>
                )}
              </button>
            </div>

            <pre className="max-h-56 overflow-y-auto rounded-2xl bg-[#020813]/95 p-4 font-mono text-[11px] text-[#C4EEFF] whitespace-pre-wrap leading-relaxed">
              {announcementMarkdown}
            </pre>
          </div>
        </div>

        {/* Right Column: Live Interactive Vector Certificate Stage */}
        <div className="lg:col-span-7 glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF] to-transparent"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#80D8FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C4EEFF]">
                LIVE 1600&times;1130 VECTOR CERTIFICATE PREVIEW
              </span>
            </div>
            <span className="ag-badge-cyan rounded-full px-3 py-1 font-mono text-[11px]">
              Recipient: {recipientName}
            </span>
          </div>

          {/* Live Rendered SVG Container */}
          <div
            className="w-full overflow-hidden rounded-2xl bg-[#020813] shadow-[0_20px_60px_rgba(2,8,19,0.9)]"
            dangerouslySetInnerHTML={{ __html: certificateSvg }}
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-[#80D8FF]">
              <Sparkles className="h-3.5 w-3.5 text-[#C4EEFF]" />
              Rendered natively in Sky Metallic Glass Blue vector geometry
            </span>
            <span className="text-slate-400">
              Print-ready 300 DPI aspect ratio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
