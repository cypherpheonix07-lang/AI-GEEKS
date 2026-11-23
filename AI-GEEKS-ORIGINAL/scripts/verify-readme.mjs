#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const README_PATH = path.join(ROOT_DIR, "README.md");
const HERO_SVG_PATH = path.join(ROOT_DIR, "public/readme/hero-banner.svg");
const DIVIDER_SVG_PATH = path.join(ROOT_DIR, "public/readme/section-divider.svg");

let hasErrors = false;

function report(category, check, passed, details) {
  if (!passed) hasErrors = true;
  const badge = passed ? "✅ PASS" : "❌ FAIL";
  console.log(`${badge} | [${category}] ${check} — ${details}`);
}

function readSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

// 1. Verify Animated SVG Files
function verifyAnimatedSvgs() {
  const svgs = [
    { name: "hero-banner.svg", fullPath: HERO_SVG_PATH },
    { name: "section-divider.svg", fullPath: DIVIDER_SVG_PATH },
  ];

  for (const item of svgs) {
    const exists = fs.existsSync(item.fullPath);
    if (!exists) {
      report("SVG Assets", item.name, false, `Missing file at ${item.fullPath}`);
      continue;
    }

    const raw = readSafe(item.fullPath);
    const isValidSvg = raw.includes("<svg") && raw.includes("</svg>");
    const hasAnimation =
      raw.includes("<animate") || raw.includes("<animateTransform");

    report(
      "SVG Assets",
      `${item.name} Animation Check`,
      isValidSvg && hasAnimation,
      isValidSvg && hasAnimation
        ? "Valid SVG structure with active <animate> / <animateTransform> nodes"
        : "Missing valid <svg> tags or animation elements"
    );
  }
}

// 2. Verify README Structure & Required Sections
function verifyReadmeStructure(readmeContent) {
  if (!readmeContent) {
    report("README", "Existence", false, "README.md not found in project root");
    return;
  }

  const requiredSections = [
    "## Overview",
    "## System & Component Architecture",
    "## 9-Shade Blue Glassmorphic Color System",
    "## Route & Module Matrix",
    "## Quick Start & Automated Verification",
  ];

  const missing = requiredSections.filter(
    (heading) => !readmeContent.includes(heading)
  );

  report(
    "README",
    "Required Section Headings",
    missing.length === 0,
    missing.length === 0
      ? `All ${requiredSections.length} architectural sections present`
      : `Missing sections: ${missing.join(", ")}`
  );

  const embedsHero = readmeContent.includes("./public/readme/hero-banner.svg");
  const embedsDivider = readmeContent.includes(
    "./public/readme/section-divider.svg"
  );

  report(
    "README",
    "SVG Banner & Divider Embeds",
    embedsHero && embedsDivider,
    embedsHero && embedsDivider
      ? "Both animated SVG files are linked in README.md"
      : "Missing hero-banner.svg or section-divider.svg reference in README.md"
  );
}

// 3. Verify Mermaid Diagrams
function verifyMermaidBlocks(readmeContent) {
  const mermaidRegex = /```mermaid\s+([\s\S]*?)```/g;
  const matches = [...readmeContent.matchAll(mermaidRegex)];

  report(
    "Mermaid",
    "Diagram Block Count",
    matches.length >= 3,
    `Found ${matches.length} Mermaid architecture diagrams (minimum 3 required)`
  );

  const validDeclarations = ["graph ", "sequenceDiagram", "flowchart "];
  matches.forEach((match, index) => {
    const body = match[1].trim();
    const hasValidHeader = validDeclarations.some((decl) =>
      body.startsWith(decl)
    );

    const openBrackets = (body.match(/\[/g) || []).length;
    const closeBrackets = (body.match(/\]/g) || []).length;
    const balanced = openBrackets === closeBrackets;

    report(
      "Mermaid",
      `Diagram #${index + 1} Syntax`,
      hasValidHeader && balanced && body.length > 30,
      hasValidHeader && balanced
        ? `Valid ${body.split(/\s+/)[0]} diagram with balanced node brackets`
        : "Invalid Mermaid diagram header or unbalanced brackets"
    );
  });
}

// 4. Verify All 9 Blue Palette Hex Codes in README
function verifyPaletteDocumentation(readmeContent) {
  const requiredHexCodes = [
    "#000521",
    "#020024",
    "#020C47",
    "#0A1A2F",
    "#011F65",
    "#0E4EB2",
    "#2078CF",
    "#00D4FF",
    "#1F1F1F",
  ];

  const upperReadme = readmeContent.toUpperCase();
  const missingHex = requiredHexCodes.filter(
    (hex) => !upperReadme.includes(hex)
  );

  report(
    "Color System",
    "9-Shade Hex Matrix in README",
    missingHex.length === 0,
    missingHex.length === 0
      ? "All 9 custom blue & carbon hex shades documented"
      : `Missing hex codes in README: ${missingHex.join(", ")}`
  );
}

console.log("🔍 Running AI GEEKS README, SVG & Mermaid Verification...\n");
const readmeText = readSafe(README_PATH);
verifyAnimatedSvgs();
verifyReadmeStructure(readmeText);
verifyMermaidBlocks(readmeText);
verifyPaletteDocumentation(readmeText);

if (hasErrors) {
  console.error("\n⚠️ README verification failed. Fix the items above and re-run.");
  process.exit(1);
} else {
  console.log("\n🚀 All README sections, animated SVGs, Mermaid diagrams, and 9-shade tokens verified!");
  process.exit(0);
}
