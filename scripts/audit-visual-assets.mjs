// scripts/audit-visual-assets.mjs
import fs from "node:fs";
import path from "node:path";
import * as LucideIcons from "lucide-react";

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, "src");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

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

console.log("======================================================================");
console.log("1. INVENTORYING PUBLIC/ STATIC ASSETS");
console.log("======================================================================");

const allPublicFiles = walkFiles(PUBLIC_DIR);
const publicPathSet = new Set(
  allPublicFiles.map((f) => "/" + path.relative(PUBLIC_DIR, f).replace(/\\/g, "/"))
);
console.log(`Found ${publicPathSet.size} total static files under public/.`);

const srcFiles = walkFiles(SRC_DIR).filter((f) => /\.(tsx|ts|jsx|js)$/.test(f));
console.log(`Auditing ${srcFiles.length} source files in src/...`);

console.log("\n======================================================================");
console.log("2. CHECKING STATIC ASSET PATHS REFERENCED IN SRC/");
console.log("======================================================================");

const assetPathRegex = /["'](\/(?:images|website_main|brand|illustrations|partners|sponsors|socials|logo|events)[^"']+)["']/g;
const referencedAssetPaths = new Map();

for (const file of srcFiles) {
  const content = fs.readFileSync(file, "utf8");
  let match;
  while ((match = assetPathRegex.exec(content)) !== null) {
    const rawPath = match[1].split("?")[0].split("#")[0];
    if (!referencedAssetPaths.has(rawPath)) {
      referencedAssetPaths.set(rawPath, []);
    }
    referencedAssetPaths.get(rawPath).push(path.relative(ROOT_DIR, file));
  }
}

console.log(`Found ${referencedAssetPaths.size} unique static asset paths referenced in src/.`);

const missingAssets = [];
for (const [assetPath, files] of referencedAssetPaths.entries()) {
  if (!publicPathSet.has(assetPath)) {
    missingAssets.push({ assetPath, files });
  }
}

if (missingAssets.length === 0) {
  console.log("✅ PASS | All referenced static asset paths resolve cleanly to existing files in public/!");
} else {
  console.log(`⚠️  FOUND ${missingAssets.length} referenced paths not found in public/:`);
  for (const m of missingAssets) {
    console.log(`  - ${m.assetPath} (referenced in: ${m.files.slice(0, 3).join(", ")})`);
  }
}

console.log("\n======================================================================");
console.log("3. AUDITING <img> AND <video> ELEMENTS");
console.log("======================================================================");

let totalImgs = 0;
let missingAlt = 0;
let missingOnError = 0;
let missingFraming = 0;

for (const file of srcFiles) {
  const content = fs.readFileSync(file, "utf8");
  // Simple JSX tag matcher for <img>
  const imgMatches = content.match(/<img[\s\S]*?>/g) || [];
  totalImgs += imgMatches.length;

  for (const tag of imgMatches) {
    const hasAlt = /alt=(?:\{[^}]+\}|"[^"]*"|'[^']*')/.test(tag);
    if (!hasAlt) {
      missingAlt++;
      console.log(`⚠️  Missing alt in ${path.relative(ROOT_DIR, file)}: ${tag.slice(0, 80)}...`);
    }

    const hasOnError = /onError=/.test(tag);
    if (!hasOnError) {
      missingOnError++;
      console.log(`ℹ️  No onError in ${path.relative(ROOT_DIR, file)}: ${tag.slice(0, 80)}...`);
    }

    const hasFraming = /object-cover|object-contain|object-scale-down|object-fill/.test(tag);
    if (!hasFraming) {
      missingFraming++;
    }
  }
}

console.log(`Found ${totalImgs} <img> tags.`);
console.log(`- Missing alt: ${missingAlt}`);
console.log(`- Missing onError handler: ${missingOnError}`);
console.log(`- Missing object-cover/contain framing: ${missingFraming}`);

console.log("\n======================================================================");
console.log("4. AUDITING LUCIDE-REACT ICON EXPORTS");
console.log("======================================================================");

const lucideImportRegex = /import\s+\{([^}]+)\}\s+from\s+["']lucide-react["']/g;
let brokenIconsCount = 0;

for (const file of srcFiles) {
  const content = fs.readFileSync(file, "utf8");
  let match;
  while ((match = lucideImportRegex.exec(content)) !== null) {
    const iconNames = match[1]
      .split(",")
      .map((i) => i.trim().split(" as ")[0].trim())
      .filter((i) => i.length > 0 && !i.startsWith("//"));

    for (const name of iconNames) {
      if (!(name in LucideIcons)) {
        brokenIconsCount++;
        console.log(`❌ FAIL | Icon "${name}" imported in ${path.relative(ROOT_DIR, file)} does NOT exist in lucide-react!`);
      }
    }
  }
}

if (brokenIconsCount === 0) {
  console.log("✅ PASS | All imported icons exist in lucide-react!");
} else {
  console.log(`❌ Found ${brokenIconsCount} invalid lucide-react icon imports!`);
}
