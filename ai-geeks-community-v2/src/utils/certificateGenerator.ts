// src/utils/certificateGenerator.ts

import {
  HackathonEventConfig,
  HackathonTeamRecord,
  ProblemStatementItem,
} from "@/data/hackathonStore";
import { triggerBrowserDownload } from "@/utils/exportReports";

export interface CertificateConfigOptions {
  leadSignatoryName: string;
  leadSignatoryTitle: string;
  judgeSignatoryName: string;
  judgeSignatoryTitle: string;
  issuerOrganization: string;
  verificationBaseUrl: string;
}

export const DEFAULT_CERTIFICATE_CONFIG: CertificateConfigOptions = {
  leadSignatoryName: "Aarav Mehta",
  leadSignatoryTitle: "Lead Organizer · AI GEEKS",
  judgeSignatoryName: "Ishaan Verma",
  judgeSignatoryTitle: "Chief AI Architect & Judging Chair",
  issuerOrganization: "AI GEEKS Developer Community",
  verificationBaseUrl: "https://demo.aigeeks.community/verify",
};

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generates a deterministic verification serial ID for a team & recipient.
 */
export function generateCertificateVerificationId(
  hackathonId: string,
  teamId: string,
  recipientName: string,
  outcome: string
): string {
  const seed = `${hackathonId}:${teamId}:${recipientName}:${outcome}`;
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const hexSuffix = (hash >>> 0).toString(16).toUpperCase().padStart(8, "0");
  const outcomeCode =
    outcome === "Winner"
      ? "WNR"
      : outcome === "Runner-Up"
      ? "RNR"
      : outcome === "Finalist"
      ? "FNL"
      : "CMP";
  return `AG-CERT-${teamId.replace(/[^A-Z0-9]/gi, "")}-${outcomeCode}-${hexSuffix}`;
}

/**
 * Generates a 1600x1130 Vector SVG Digital Certificate in the Dark & Light Sky Metallic Glass Blue theme.
 */
export function generateCertificateSvg(params: {
  hackathon: HackathonEventConfig;
  team: HackathonTeamRecord;
  problem?: ProblemStatementItem;
  recipientName: string;
  recipientRole: string;
  config?: CertificateConfigOptions;
}): string {
  const {
    hackathon,
    team,
    problem,
    recipientName,
    recipientRole,
    config = DEFAULT_CERTIFICATE_CONFIG,
  } = params;

  const outcome = team.competitionOutcome;
  const certId = generateCertificateVerificationId(
    hackathon.id,
    team.id,
    recipientName,
    outcome
  );

  const outcomeTitle =
    outcome === "Winner"
      ? "FIRST PLACE · GRAND WINNER"
      : outcome === "Runner-Up"
      ? "SECOND PLACE · RUNNER-UP"
      : outcome === "Finalist"
      ? "OFFICIAL GRAND FINALIST"
      : "CERTIFICATE OF EXCELLENCE";

  const problemLine = problem
    ? `${problem.code}: ${problem.title}`
    : team.selectedProblemCode
    ? `Problem Track ${team.selectedProblemCode}`
    : "Open Pure-Software Innovation Track";

  const scoreBadge =
    team.evaluation?.totalScore !== undefined
      ? `${team.evaluation.totalScore} / 100 RUBRIC SCORE`
      : "VERIFIED SUBMISSION";

  const issuedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1130" width="1600" height="1130" fill="none">
  <defs>
    <linearGradient id="certBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020813" />
      <stop offset="48%" stop-color="#051020" />
      <stop offset="100%" stop-color="#091B32" />
    </linearGradient>

    <linearGradient id="certGlassPanel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F2744" stop-opacity="0.88" />
      <stop offset="55%" stop-color="#091B32" stop-opacity="0.92" />
      <stop offset="100%" stop-color="#020813" stop-opacity="0.96" />
    </linearGradient>

    <linearGradient id="skyMetallicBorder" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2B6CB0" />
      <stop offset="50%" stop-color="#C4EEFF" />
      <stop offset="100%" stop-color="#4DA8DA" />
    </linearGradient>

    <linearGradient id="skyTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C4EEFF" />
      <stop offset="50%" stop-color="#80D8FF" />
      <stop offset="100%" stop-color="#4DA8DA" />
    </linearGradient>

    <linearGradient id="medallionFill" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#80D8FF" />
      <stop offset="45%" stop-color="#4DA8DA" />
      <stop offset="100%" stop-color="#163B63" />
    </linearGradient>

    <radialGradient id="topGlow" cx="50%" cy="0%" r="65%">
      <stop offset="0%" stop-color="#80D8FF" stop-opacity="0.24" />
      <stop offset="55%" stop-color="#2B6CB0" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#020813" stop-opacity="0" />
    </radialGradient>

    <pattern id="certGrid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#4DA8DA" stroke-width="0.7" stroke-opacity="0.12" />
    </pattern>
  </defs>

  <!-- Base Deep Sky Gunmetal Canvas -->
  <rect width="1600" height="1130" fill="url(#certBg)" />
  <rect width="1600" height="1130" fill="url(#certGrid)" />
  <rect width="1600" height="1130" fill="url(#topGlow)" />

  <!-- Outer Specular Metallic Frame -->
  <rect x="44" y="44" width="1512" height="1042" rx="32" fill="url(#certGlassPanel)" stroke="url(#skyMetallicBorder)" stroke-width="3" />
  <rect x="64" y="64" width="1472" height="1002" rx="22" fill="none" stroke="#80D8FF" stroke-opacity="0.28" stroke-width="1.5" stroke-dasharray="10 6" />

  <!-- Corner Specular Accents -->
  <path d="M 84 124 L 84 84 L 124 84" stroke="#C4EEFF" stroke-width="4" stroke-linecap="round" />
  <path d="M 1476 84 L 1516 84 L 1516 124" stroke="#C4EEFF" stroke-width="4" stroke-linecap="round" />
  <path d="M 84 1006 L 84 1046 L 124 1046" stroke="#C4EEFF" stroke-width="4" stroke-linecap="round" />
  <path d="M 1476 1046 L 1516 1046 L 1516 1006" stroke="#C4EEFF" stroke-width="4" stroke-linecap="round" />

  <!-- Top Header Pill -->
  <rect x="530" y="108" width="540" height="44" rx="22" fill="#163B63" fill-opacity="0.75" stroke="#80D8FF" stroke-opacity="0.55" stroke-width="1.5" />
  <text x="800" y="136" text-anchor="middle" fill="#C4EEFF" font-family="monospace" font-size="15" font-weight="bold" letter-spacing="3">
    ${escapeXml(config.issuerOrganization.toUpperCase())}
  </text>

  <!-- Main Certificate Title -->
  <text x="800" y="220" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="900" letter-spacing="2">
    CERTIFICATE OF ACHIEVEMENT
  </text>

  <!-- Outcome Medallion Ribbon -->
  <rect x="490" y="252" width="620" height="58" rx="16" fill="url(#medallionFill)" stroke="#C4EEFF" stroke-width="2" />
  <text x="800" y="289" text-anchor="middle" fill="#020813" font-family="monospace" font-size="22" font-weight="900" letter-spacing="3">
    ★ ${escapeXml(outcomeTitle)} ★
  </text>

  <!-- Presentation Line -->
  <text x="800" y="366" text-anchor="middle" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="18" letter-spacing="1.5">
    THIS OFFICIAL CREDENTIAL IS PROUDLY PRESENTED TO
  </text>

  <!-- Recipient Name -->
  <text x="800" y="446" text-anchor="middle" fill="url(#skyTextGradient)" font-family="system-ui, -apple-system, sans-serif" font-size="60" font-weight="900">
    ${escapeXml(recipientName)}
  </text>

  <!-- Recipient Role & Team Identity -->
  <text x="800" y="494" text-anchor="middle" fill="#C4EEFF" font-family="monospace" font-size="20" font-weight="bold" letter-spacing="1.5">
    ${escapeXml(recipientRole.toUpperCase())} · TEAM ${escapeXml(team.name.toUpperCase())} (${escapeXml(team.id)})
  </text>
  <text x="800" y="528" text-anchor="middle" fill="#80D8FF" font-family="system-ui, -apple-system, sans-serif" font-size="16">
    Institution / Collective: ${escapeXml(team.institution)}
  </text>

  <!-- Divider Line -->
  <line x1="320" y1="560" x2="1280" y2="560" stroke="url(#skyMetallicBorder)" stroke-width="1.5" stroke-opacity="0.65" />

  <!-- Hackathon & Problem Statement Box -->
  <rect x="200" y="592" width="1200" height="174" rx="22" fill="#051020" fill-opacity="0.9" stroke="#4DA8DA" stroke-opacity="0.45" stroke-width="1.5" />
  <text x="800" y="636" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800">
    ${escapeXml(hackathon.title)} (${escapeXml(hackathon.edition)})
  </text>
  <text x="800" y="678" text-anchor="middle" fill="#80D8FF" font-family="monospace" font-size="18" font-weight="bold">
    PROBLEM STATEMENT — ${escapeXml(problemLine.slice(0, 88))}
  </text>
  <text x="800" y="718" text-anchor="middle" fill="#CBD5E1" font-family="system-ui, -apple-system, sans-serif" font-size="16">
    Evaluated on Technical Architecture, Problem Alignment, AI Execution, and Production UX · ${escapeXml(scoreBadge)}
  </text>

  <!-- Signatures & Verification Seal Row -->
  <!-- Left Signatory -->
  <g transform="translate(220, 840)">
    <text x="160" y="32" text-anchor="middle" fill="#C4EEFF" font-family="Georgia, serif" font-style="italic" font-size="30" font-weight="bold">
      ${escapeXml(config.leadSignatoryName)}
    </text>
    <line x1="20" y1="50" x2="300" y2="50" stroke="#4DA8DA" stroke-width="1.5" />
    <text x="160" y="78" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">
      ${escapeXml(config.leadSignatoryName)}
    </text>
    <text x="160" y="102" text-anchor="middle" fill="#80D8FF" font-family="monospace" font-size="13">
      ${escapeXml(config.leadSignatoryTitle)}
    </text>
  </g>

  <!-- Center Specular Verification Seal -->
  <g transform="translate(800, 885)">
    <circle cx="0" cy="0" r="68" fill="#091B32" stroke="url(#skyMetallicBorder)" stroke-width="3" />
    <circle cx="0" cy="0" r="56" fill="none" stroke="#C4EEFF" stroke-width="1" stroke-dasharray="5 4" />
    <text x="0" y="-12" text-anchor="middle" fill="#C4EEFF" font-family="monospace" font-size="13" font-weight="bold">
      VERIFIED
    </text>
    <text x="0" y="10" text-anchor="middle" fill="#80D8FF" font-family="monospace" font-size="16" font-weight="900">
      AI GEEKS
    </text>
    <text x="0" y="30" text-anchor="middle" fill="#4DA8DA" font-family="monospace" font-size="11">
      PURE SOFTWARE
    </text>
  </g>

  <!-- Right Signatory -->
  <g transform="translate(1060, 840)">
    <text x="160" y="32" text-anchor="middle" fill="#C4EEFF" font-family="Georgia, serif" font-style="italic" font-size="30" font-weight="bold">
      ${escapeXml(config.judgeSignatoryName)}
    </text>
    <line x1="20" y1="50" x2="300" y2="50" stroke="#4DA8DA" stroke-width="1.5" />
    <text x="160" y="78" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="bold">
      ${escapeXml(config.judgeSignatoryName)}
    </text>
    <text x="160" y="102" text-anchor="middle" fill="#80D8FF" font-family="monospace" font-size="13">
      ${escapeXml(config.judgeSignatoryTitle)}
    </text>
  </g>

  <!-- Bottom Metadata & Serial ID Footer -->
  <text x="100" y="1018" fill="#80D8FF" font-family="monospace" font-size="13">
    CREDENTIAL ID: ${escapeXml(certId)}
  </text>
  <text x="800" y="1018" text-anchor="middle" fill="#94A3B8" font-family="monospace" font-size="13">
    ISSUED: ${escapeXml(issuedDate.toUpperCase())}
  </text>
  <text x="1500" y="1018" text-anchor="end" fill="#C4EEFF" font-family="monospace" font-size="13">
    VERIFY: ${escapeXml(config.verificationBaseUrl)}/${escapeXml(certId)}
  </text>
</svg>`;
}

/**
 * Downloads the standalone SVG certificate file.
 */
export function downloadCertificateSvg(
  svgString: string,
  teamId: string,
  recipientName: string
): string {
  const safeName = recipientName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const filename = `aigeeks-certificate-${teamId.toLowerCase()}-${safeName}.svg`;
  triggerBrowserDownload(svgString, filename, "image/svg+xml;charset=utf-8");
  return filename;
}

/**
 * Rasterizes the SVG certificate onto an offscreen HTML5 Canvas and triggers a high-DPI PNG download.
 */
export async function downloadCertificatePng(
  svgString: string,
  teamId: string,
  recipientName: string
): Promise<string> {
  const safeName = recipientName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const filename = `aigeeks-certificate-${teamId.toLowerCase()}-${safeName}.png`;

  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Browser environment required for PNG rasterization."));
      return;
    }

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = 1130;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas 2D context unavailable."));
        return;
      }

      ctx.fillStyle = "#020813";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 1600, 1130);
      URL.revokeObjectURL(url);

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) {
          reject(new Error("Failed to encode PNG blob."));
          return;
        }
        const pngUrl = URL.createObjectURL(pngBlob);
        const anchor = document.createElement("a");
        anchor.href = pngUrl;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(pngUrl);
        resolve(filename);
      }, "image/png");
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load SVG into image rasterizer."));
    };

    img.src = url;
  });
}

/**
 * Generates an official formatted Markdown announcement for Winner, Runner-Up, and Finalist teams.
 */
export function generateWinnerAnnouncementCopy(
  hackathon: HackathonEventConfig,
  podiumTeams: HackathonTeamRecord[],
  problems: ProblemStatementItem[]
): string {
  const winners = podiumTeams.filter((t) => t.competitionOutcome === "Winner");
  const runnersUp = podiumTeams.filter(
    (t) => t.competitionOutcome === "Runner-Up"
  );
  const finalists = podiumTeams.filter(
    (t) => t.competitionOutcome === "Finalist"
  );

  const formatTeamLine = (team: HackathonTeamRecord, medal: string) => {
    const prob = problems.find((p) => p.id === team.selectedProblemId);
    const score =
      team.evaluation?.totalScore !== undefined
        ? `${team.evaluation.totalScore}/100`
        : "Verified";
    const builders = team.members.map((m) => m.name).join(", ");
    return `${medal} **${team.name}** (${team.id} · ${team.institution})\n- **Builders:** ${builders}\n- **Problem Track:** ${
      prob ? `${prob.code} — ${prob.title}` : team.selectedProblemCode || "Open"
    }\n- **Rubric Score:** ${score}\n- **Repository:** ${
      team.githubRepoUrl || "Verified on file"
    }`;
  };

  const sections: string[] = [
    `# 🏆 OFFICIAL RESULTS — ${hackathon.title.toUpperCase()} (${hackathon.edition.toUpperCase()})`,
    `Congratulations to every builder and team who shipped pure-software architectures during the **${hackathon.title}**! Here are our official podium standings:`,
  ];

  if (winners.length > 0) {
    sections.push(
      `## 🥇 FIRST PLACE · GRAND WINNER\n` +
        winners.map((t) => formatTeamLine(t, "🥇")).join("\n\n")
    );
  }

  if (runnersUp.length > 0) {
    sections.push(
      `## 🥈 SECOND PLACE · RUNNER-UP\n` +
        runnersUp.map((t) => formatTeamLine(t, "🥈")).join("\n\n")
    );
  }

  if (finalists.length > 0) {
    sections.push(
      `## 🏅 OFFICIAL GRAND FINALISTS\n` +
        finalists.map((t) => formatTeamLine(t, "🏅")).join("\n\n")
    );
  }

  sections.push(
    `---\n*Verified digital certificates are now live in the AI GEEKS Hackathon Podium & Certificate Portal.*`
  );

  return sections.join("\n\n");
}
