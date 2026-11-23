// scripts/remove-all-borders.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, "src");

function walkFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, files);
    } else if (/\.(tsx|ts|css|jsx|js)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const PREFIX_REGEX = /^(?:(?:sm|md|lg|xl|2xl|hover|focus|group-hover|focus-within|focus-visible|active|disabled|dark):)+/;

function isBorderClass(token) {
  if (!token) return false;
  const raw = token.trim();
  if (!raw) return false;

  const base = raw.replace(PREFIX_REGEX, "");

  // Never match rounded (border-radius)
  if (base.startsWith("rounded")) return false;

  // Keep table layout properties if any
  if (base === "border-collapse" || base === "border-separate") return false;

  // Never match CSS variable names
  if (base.startsWith("--ag-border") || base.startsWith("--aigeeks-border")) return false;
  if (base.startsWith("border-radius")) return false;

  // Any Tailwind border utility
  if (base === "border" || base.startsWith("border-")) {
    return true;
  }

  // Any Tailwind divide utility
  if (base === "divide" || base.startsWith("divide-")) {
    return true;
  }

  // Any Tailwind ring utility
  if (base === "ring" || base.startsWith("ring-")) {
    return true;
  }

  return false;
}

function cleanClassString(classStr) {
  const tokens = classStr.split(/\s+/);
  const kept = tokens.filter((t) => !isBorderClass(t));
  return kept.join(" ");
}

function processContent(content, filePath) {
  let modified = content;

  // 1. Process className="..."
  modified = modified.replace(/className="([^"]*)"/g, (match, classes) => {
    return `className="${cleanClassString(classes)}"`;
  });

  // 2. Process className='...'
  modified = modified.replace(/className='([^']*)'/g, (match, classes) => {
    return `className='${cleanClassString(classes)}'`;
  });

  // 3. Process className={`...`}
  modified = modified.replace(/className=\{`([^`]*)`\}/g, (match, classes) => {
    const lines = classes.split("\n");
    const cleaned = lines
      .map((line) => {
        const parts = line.split(/(\$\{[^}]+\})/);
        return parts
          .map((part) => {
            if (part.startsWith("${")) {
              // Inside ${...}, clean string literals like "border-[#C4EEFF] bg-..."
              return part.replace(/"([^"]*)"/g, (m, str) => `"${cleanClassString(str)}"`)
                         .replace(/'([^']*)'/g, (m, str) => `'${cleanClassString(str)}'`);
            }
            return cleanClassString(part);
          })
          .join("");
      })
      .join("\n");
    return `className={\`${cleaned}\`}`;
  });

  // 4. Process all remaining string literals in TS/TSX files that contain border classes
  if (/\.(tsx|ts|jsx|js)$/.test(filePath)) {
    modified = modified.replace(/(["'])([^"'\n]*?\bborder(?:-[^\s"']+)?\b[^"'\n]*?)\1/g, (match, quote, inner) => {
      if (inner.includes("border-radius") || inner.includes("--ag-border") || inner.includes("border: none") || inner.includes("border: string")) {
        return match;
      }
      return `${quote}${cleanClassString(inner)}${quote}`;
    });
    modified = modified.replace(/(["'])([^"'\n]*?\bdivide-[^\s"']+\b[^"'\n]*?)\1/g, (match, quote, inner) => {
      return `${quote}${cleanClassString(inner)}${quote}`;
    });
  }

  // 5. In CSS files, replace border definitions with border: none
  if (filePath.endsWith(".css")) {
    modified = modified.replace(/^\s*border(?:-(?:top|bottom|left|right|color|width|style))?:\s*(?!none)[^;]+;\s*$/gm, "  border: none;");
    modified = modified.replace(/^\s*outline:\s*(?!none)[^;]+;\s*$/gm, "  outline: none;");
  }

  return modified;
}

const files = walkFiles(SRC_DIR);
console.log(`Found ${files.length} source files to inspect for border/divide/ring classes.`);

let totalChanged = 0;
for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const processed = processContent(content, file);
  if (processed !== content) {
    fs.writeFileSync(file, processed, "utf8");
    totalChanged++;
    console.log(`Refactored: ${path.relative(ROOT_DIR, file)}`);
  }
}

console.log(`\nCompleted: ${totalChanged} files updated with borders removed.`);
