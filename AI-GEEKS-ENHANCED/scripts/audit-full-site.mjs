#!/usr/bin/env node
// scripts/audit-full-site.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, "src");
const APP_DIR = path.join(SRC_DIR, "app");
const COMPONENTS_DIR = path.join(SRC_DIR, "components");

const REQUIRED_ROUTES = [
  "/",
  "/about",
  "/events",
  "/past-speakers",
  "/gallery",
  "/forum",
  "/team",
  "/sponsor",
  "/code-of-conduct",
  "/join",
  "/platforms",
  "/settings",
  "/team-portal",
  "/hackathon-showcase",
  "/admin/hackathons",
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

function resolveLocalImport(fromFile, spec) {
  let targetBase = null;
  if (spec.startsWith("@/")) {
    targetBase = path.join(SRC_DIR, spec.slice(2));
  } else if (spec.startsWith("./") || spec.startsWith("../")) {
    targetBase = path.resolve(path.dirname(fromFile), spec);
  } else {
    return true;
  }

  const candidates = [
    targetBase,
    `${targetBase}.ts`,
    `${targetBase}.tsx`,
    `${targetBase}.js`,
    `${targetBase}.jsx`,
    `${targetBase}.css`,
    path.join(targetBase, "index.ts"),
    path.join(targetBase, "index.tsx"),
    path.join(targetBase, "page.tsx"),
  ];

  return candidates.some((c) => fs.existsSync(c));
}

function main() {
  console.log("🔎 Auditing src/app and src/components for AI GEEKS...\n");

  if (!fs.existsSync(APP_DIR)) {
    console.error("❌ FAIL | Missing src/app directory.");
    process.exit(1);
  }

  const appFiles = walkFiles(APP_DIR).filter((f) =>
    /\.(ts|tsx|js|jsx)$/.test(f)
  );
  const componentFiles = fs.existsSync(COMPONENTS_DIR)
    ? walkFiles(COMPONENTS_DIR).filter((f) => /\.(ts|tsx|js|jsx)$/.test(f))
    : [];

  const allScannedFiles = [...appFiles, ...componentFiles];
  let failures = 0;

  // 1. Discover routes & verify Next.js 16 dynamic params
  const pageFiles = appFiles.filter((f) =>
    /(?:^|[\\/])page\.(ts|tsx|js|jsx)$/.test(f)
  );
  const discoveredRoutes = new Set(pageFiles.map((f) => toRoutePath(f)));

  console.log("--- 1. Required Routes Check ---");
  for (const reqRoute of REQUIRED_ROUTES) {
    const exists = discoveredRoutes.has(reqRoute);
    if (!exists) failures++;
    console.log(`${exists ? "✅ PASS" : "❌ FAIL"} | Route ${reqRoute}`);
  }

  console.log("\n--- 2. Dynamic Route Async Params Check (Next.js 16) ---");
  for (const pFile of pageFiles) {
    const routePath = toRoutePath(pFile);
    if (!routePath.includes("[")) continue;
    const content = fs.readFileSync(pFile, "utf8");
    const hasPromiseParams = /params\s*:\s*Promise</.test(content);
    const hasAwaitParams = /await\s+params/.test(content);
    const ok = hasPromiseParams && hasAwaitParams;
    if (!ok) failures++;
    console.log(
      `${ok ? "✅ PASS" : "❌ FAIL"} | ${path.relative(
        ROOT_DIR,
        pFile
      )} (${routePath}) — ${
        ok
          ? "Promise params & await verified"
          : "missing Promise<{ ... }> or await params"
      }`
    );
  }

  // 3. Check for duplicate Navbar / Footer / <header> / <footer> across pages & components
  console.log("\n--- 3. Duplicate Navbar & Footer Check ---");
  const rootLayoutPath = path.join(APP_DIR, "layout.tsx");
  const rootLayoutContent = fs.existsSync(rootLayoutPath)
    ? fs.readFileSync(rootLayoutPath, "utf8")
    : "";

  const layoutHasNavbar =
    /<Navbar[\s/>]/.test(rootLayoutContent) ||
    /<header[\s>]/i.test(rootLayoutContent);
  const layoutHasFooter =
    /<Footer[\s/>]/.test(rootLayoutContent) ||
    /<footer[\s>]/i.test(rootLayoutContent);

  console.log(
    `ℹ️  Root layout mounts Navbar/Header: ${layoutHasNavbar} | Footer: ${layoutHasFooter}`
  );

  for (const file of allScannedFiles) {
    const rel = path.relative(ROOT_DIR, file).replace(/\\/g, "/");
    // Skip the canonical Navbar and Footer definitions themselves
    if (
      rel === "src/components/layout/Navbar.tsx" ||
      rel === "src/components/layout/Footer.tsx" ||
      rel === "src/app/layout.tsx"
    ) {
      continue;
    }

    const content = fs.readFileSync(file, "utf8");
    const headerMatches = (content.match(/<header[\s>]/gi) || []).length;
    const navbarCompMatches = (content.match(/<Navbar[\s/>]/g) || []).length;
    const footerMatches = (content.match(/<footer[\s>]/gi) || []).length;
    const footerCompMatches = (content.match(/<Footer[\s/>]/g) || []).length;

    const totalNavLike = headerMatches + navbarCompMatches;
    const totalFooterLike = footerMatches + footerCompMatches;

    if (layoutHasNavbar && totalNavLike > 0) {
      failures++;
      console.log(
        `❌ FAIL | Duplicate Nav/Header in ${rel} (count: ${totalNavLike})`
      );
    } else if (!layoutHasNavbar && totalNavLike > 1) {
      failures++;
      console.log(
        `❌ FAIL | Multiple Nav/Header elements in ${rel} (count: ${totalNavLike})`
      );
    }

    if (layoutHasFooter && totalFooterLike > 0) {
      failures++;
      console.log(
        `❌ FAIL | Duplicate Footer in ${rel} (count: ${totalFooterLike})`
      );
    } else if (!layoutHasFooter && totalFooterLike > 1) {
      failures++;
      console.log(
        `❌ FAIL | Multiple Footer elements in ${rel} (count: ${totalFooterLike})`
      );
    }
  }

  if (failures === 0) {
    console.log(
      "✅ PASS | No duplicate Navbar/Header or Footer elements found across src/app and src/components."
    );
  }

  // 4. Validate local imports across src/app and src/components
  console.log("\n--- 4. Local Import Resolution Check ---");
  const importRegex =
    /(?:import\s+(?:[\w*\s{},]*\s+from\s+)?|export\s+(?:[\w*\s{},]*\s+from\s+)?)["']([^"']+)["']/g;

  let brokenCount = 0;
  for (const file of allScannedFiles) {
    const content = fs.readFileSync(file, "utf8");
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const spec = match[1];
      if (
        spec.startsWith("@/") ||
        spec.startsWith("./") ||
        spec.startsWith("../")
      ) {
        if (!resolveLocalImport(file, spec)) {
          brokenCount++;
          failures++;
          console.log(
            `❌ FAIL | Missing import "${spec}" in ${path.relative(
              ROOT_DIR,
              file
            )}`
          );
        }
      }
    }
  }

  if (brokenCount === 0) {
    console.log(
      `✅ PASS | All local imports resolved across ${allScannedFiles.length} files.`
    );
  }

  if (failures > 0) {
    console.error(`\n💥 Audit finished with ${failures} issue(s).`);
    process.exit(1);
  }

  console.log("\n🎉 Full-site static audit passed with 0 issues!");
}

main();
