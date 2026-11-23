#!/usr/bin/env node
// scripts/verify-app-and-build.mjs

import fs from "node:fs";
import path from "node:path";
import { execSync, spawn } from "node:child_process";

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, "src");
const APP_DIR = path.join(SRC_DIR, "app");

const LIVE_PORT = Number(process.env.VERIFY_PORT || 3099);
const LIVE_HOST = "127.0.0.1";
const BASE_URL = `http://${LIVE_HOST}:${LIVE_PORT}`;

const KEY_ROUTES = [
  "/",
  "/about",
  "/events",
  "/hackathon-showcase",
  "/past-speakers",
  "/gallery",
  "/platforms",
  "/forum",
  "/team",
  "/sponsor",
  "/code-of-conduct",
  "/team-portal",
  "/join",
  "/settings",
  "/admin/hackathons",
  "/admin/hackathons/hk-2026-ai-challenge",
  "/admin/hackathons/hk-2026-ai-challenge/teams",
  "/admin/hackathons/hk-2026-ai-challenge/problems",
  "/admin/hackathons/hk-2026-ai-challenge/analytics",
  "/admin/hackathons/hk-2026-ai-challenge/submissions",
  "/admin/hackathons/hk-2026-ai-challenge/reviews",
  "/admin/hackathons/hk-2026-ai-challenge/settings",
  "/api/events",
  "/api/admin/hackathons",
];

function walkFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function toRoutePath(filePath) {
  const relDir = path.relative(APP_DIR, path.dirname(filePath));
  if (!relDir || relDir === ".") return "/";
  const segments = relDir
    .split(path.sep)
    .filter((seg) => !seg.startsWith("(") && !seg.endsWith(")"));
  return `/${segments.join("/")}`;
}

function resolveImportTarget(fromFile, spec) {
  let baseCandidate = null;
  if (spec.startsWith("@/")) {
    baseCandidate = path.join(SRC_DIR, spec.slice(2));
  } else if (spec.startsWith("./") || spec.startsWith("../")) {
    baseCandidate = path.resolve(path.dirname(fromFile), spec);
  } else {
    return true;
  }

  const candidates = [
    baseCandidate,
    `${baseCandidate}.ts`,
    `${baseCandidate}.tsx`,
    `${baseCandidate}.js`,
    `${baseCandidate}.jsx`,
    `${baseCandidate}.css`,
    path.join(baseCandidate, "index.ts"),
    path.join(baseCandidate, "index.tsx"),
    path.join(baseCandidate, "page.tsx"),
  ];

  return candidates.some((c) => fs.existsSync(c));
}

function runCommand(command) {
  console.log(`\n▶ Running: ${command}`);
  execSync(command, { cwd: ROOT_DIR, stdio: "inherit" });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServerReady(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status > 0) return true;
    } catch {
      // Server still booting
    }
    await sleep(400);
  }
  return false;
}

async function stopServerProcess(child) {
  if (!child || child.exitCode !== null) return;
  if (process.platform === "win32") {
    try {
      execSync(`taskkill /pid ${child.pid} /T /F`, { stdio: "ignore" });
    } catch {
      // Process already exited
    }
  } else {
    child.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => child.once("exit", resolve)),
      sleep(3000),
    ]);
    if (child.exitCode === null) {
      child.kill("SIGKILL");
    }
  }
}

async function verifyLiveRoutes() {
  console.log(`\n🌐 Starting production Next.js server on ${BASE_URL}...\n`);
  const nextCli = path.join(
    ROOT_DIR,
    "node_modules",
    "next",
    "dist",
    "bin",
    "next"
  );

  const serverProcess = spawn(
    process.execPath,
    [nextCli, "start", "-H", LIVE_HOST, "-p", String(LIVE_PORT)],
    {
      cwd: ROOT_DIR,
      env: { ...process.env, PORT: String(LIVE_PORT) },
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  let serverLogs = "";
  serverProcess.stdout?.on("data", (chunk) => {
    serverLogs += chunk.toString();
  });
  serverProcess.stderr?.on("data", (chunk) => {
    serverLogs += chunk.toString();
  });

  let routeFailures = 0;

  try {
    const ready = await waitForServerReady(`${BASE_URL}/`);
    if (!ready) {
      console.error("❌ FAIL | Next.js server failed to start within timeout.");
      if (serverLogs.trim()) {
        console.error(serverLogs.slice(-1500));
      }
      return 1;
    }

    for (const route of KEY_ROUTES) {
      const targetUrl = `${BASE_URL}${route}`;
      try {
        const res = await fetch(targetUrl, {
          headers: {
            "x-ag-rbac-role": "Super Administrator",
          },
        });
        const ok = res.status === 200;
        if (!ok) routeFailures++;
        console.log(
          `${ok ? "✅ PASS" : "❌ FAIL"} | HTTP ${res.status} -> ${route}`
        );
      } catch (err) {
        routeFailures++;
        console.log(
          `❌ FAIL | Request error for ${route}: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
    }

    return routeFailures;
  } finally {
    await stopServerProcess(serverProcess);
    console.log("🛑 Stopped temporary Next.js verification server.");
  }
}

async function main() {
  console.log("▶ [Step 0] Running full-site audit (scripts/audit-full-site.mjs)...");
  runCommand("node scripts/audit-full-site.mjs");

  console.log(
    "\n🔍 Auditing Next.js 16 src/app routes, dynamic params, and component imports...\n"
  );

  if (!fs.existsSync(APP_DIR)) {
    console.error("❌ FAIL | src/app directory not found.");
    process.exit(1);
  }

  const appFiles = walkFiles(APP_DIR);
  const routeFiles = appFiles.filter((f) =>
    /(?:^|[\\/])(page|route|layout|template|error|loading|not-found)\.(ts|tsx|js|jsx)$/.test(
      f
    )
  );
  const codeFiles = walkFiles(SRC_DIR).filter((f) =>
    /\.(ts|tsx|js|jsx)$/.test(f)
  );

  let failures = 0;

  console.log(`Found ${routeFiles.length} App Router entry files in src/app:`);
  for (const file of routeFiles) {
    const rel = path.relative(ROOT_DIR, file);
    const routePath = toRoutePath(file);
    const content = fs.readFileSync(file, "utf8");
    const isDynamic = routePath.includes("[");
    const isPageOrLayout = /(?:^|[\\/])(page|layout)\.(ts|tsx|js|jsx)$/.test(
      file
    );

    let ok = true;
    let detail = `Route ${routePath}`;

    if (isDynamic && isPageOrLayout) {
      const usesPromiseParams = /params\s*:\s*Promise</.test(content);
      const awaitsParams = /await\s+params/.test(content);
      if (!usesPromiseParams || !awaitsParams) {
        ok = false;
        detail +=
          " — missing Next.js 16 Promise<{ ... }> params or await params";
      } else {
        detail += " — async Promise params verified";
      }
    }

    if (!ok) failures++;
    console.log(`${ok ? "✅ PASS" : "❌ FAIL"} | ${rel} -> ${detail}`);
  }

  console.log(
    `\nAuditing local imports across ${codeFiles.length} source files in src/...`
  );
  const importRegex =
    /(?:import\s+(?:[\w*\s{},]*\s+from\s+)?|export\s+(?:[\w*\s{},]*\s+from\s+)?)["']([^"']+)["']/g;

  let brokenImportCount = 0;
  for (const file of codeFiles) {
    const content = fs.readFileSync(file, "utf8");
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const spec = match[1];
      if (
        spec.startsWith("@/") ||
        spec.startsWith("./") ||
        spec.startsWith("../")
      ) {
        if (!resolveImportTarget(file, spec)) {
          brokenImportCount++;
          failures++;
          console.log(
            `❌ FAIL | Broken import "${spec}" in ${path.relative(
              ROOT_DIR,
              file
            )}`
          );
        }
      }
    }
  }

  if (brokenImportCount === 0) {
    console.log(
      "✅ PASS | All local @/ and relative component/module imports resolve cleanly."
    );
  }

  if (failures > 0) {
    console.error(
      `\n💥 Static audit failed with ${failures} issue(s). Skipping tsc/build/live check.`
    );
    process.exit(1);
  }

  const skipBuild = process.argv.includes("--skip-build");
  if (!skipBuild) {
    try {
      const nextDir = path.join(ROOT_DIR, ".next");
      if (fs.existsSync(nextDir)) {
        try {
          fs.rmSync(nextDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 500 });
        } catch (rmErr) {
          console.warn("Notice: could not clear .next cache before build:", rmErr.message);
        }
      }
      runCommand("npx tsc --noEmit");
      runCommand("npm run build");
    } catch (err) {
      console.error("\n❌ TypeScript or Next.js build validation failed:", err.message);
      process.exit(1);
    }
  } else {
    console.log("\n⏩ --skip-build flag detected. Using existing production build...\n");
  }

  const liveFailures = await verifyLiveRoutes();
  if (liveFailures > 0) {
    console.error(
      `\n💥 Live HTTP verification failed on ${liveFailures} route(s).`
    );
    process.exit(1);
  }

  console.log(
    "\n🎉 All static route checks, TypeScript checks, production build, and live HTTP 200 route checks passed!"
  );
}

main();
