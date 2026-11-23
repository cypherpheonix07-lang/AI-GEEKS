#!/usr/bin/env node
// scripts/verify-admin-routes.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();

const REQUIRED_ADMIN_FILES = [
  "src/app/admin/hackathons/page.tsx",
  "src/app/admin/hackathons/[id]/page.tsx",
  "src/app/admin/hackathons/[id]/[tab]/page.tsx",
  "src/app/api/admin/hackathons/route.ts",
  "src/components/admin/AdminHackathonsConsole.tsx",
];

console.log("🔍 Running Admin Dynamic Routes & Component Audit...\n");

let failures = 0;

for (const relPath of REQUIRED_ADMIN_FILES) {
  const fullPath = path.join(ROOT_DIR, relPath);
  const exists = fs.existsSync(fullPath);
  if (!exists) {
    failures++;
    console.log(`❌ FAIL | Missing admin file: ${relPath}`);
  } else {
    const content = fs.readFileSync(fullPath, "utf8");
    let detail = "Exists on disk";
    if (relPath.includes("[id]")) {
      const usesPromise = /params\s*:\s*Promise</.test(content);
      const awaits = /await\s+params/.test(content);
      if (usesPromise && awaits) {
        detail += " (Next.js 16 async Promise params verified)";
      } else {
        failures++;
        detail += " (ERROR: missing Promise<{ id }> or await params)";
      }
    }
    console.log(`✅ PASS | ${relPath} -> ${detail}`);
  }
}

if (failures > 0) {
  console.error(`\n💥 Admin routes audit failed with ${failures} error(s).`);
  process.exit(1);
} else {
  console.log("\n🎉 All dynamic admin sub-routes and components verified on disk!");
  process.exit(0);
}
