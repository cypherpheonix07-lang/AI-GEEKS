// scripts/generate-team-placeholders.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const teamDir = path.join(ROOT_DIR, "public", "images", "team");
if (!fs.existsSync(teamDir)) fs.mkdirSync(teamDir, { recursive: true });

const avatars = [
  { id: "01", color1: "#80D8FF", color2: "#163B63", label: "LEAD", shape: '<circle cx="64" cy="48" r="24" fill="#80D8FF" fill-opacity="0.35" stroke="#C4EEFF" stroke-width="3"/><path d="M32 104 C32 80 48 68 64 68 C80 68 96 80 96 104" fill="none" stroke="#C4EEFF" stroke-width="4" stroke-linecap="round"/>' },
  { id: "02", color1: "#4DA8DA", color2: "#0F2744", label: "AI", shape: '<rect x="44" y="32" width="40" height="36" rx="10" fill="#4DA8DA" fill-opacity="0.35" stroke="#80D8FF" stroke-width="3"/><circle cx="56" cy="50" r="4" fill="#C4EEFF"/><circle cx="72" cy="50" r="4" fill="#C4EEFF"/><path d="M32 104 C32 82 48 72 64 72 C80 72 96 82 96 104" fill="none" stroke="#80D8FF" stroke-width="4" stroke-linecap="round"/>' },
  { id: "03", color1: "#2B6CB0", color2: "#091B32", label: "FE", shape: '<polygon points="64,24 88,40 88,72 64,88 40,72 40,40" fill="#2B6CB0" fill-opacity="0.4" stroke="#C4EEFF" stroke-width="3"/><circle cx="64" cy="56" r="8" fill="#80D8FF"/><path d="M32 108 C32 88 48 80 64 80 C80 80 96 88 96 108" fill="none" stroke="#C4EEFF" stroke-width="4" stroke-linecap="round"/>' },
  { id: "04", color1: "#80D8FF", color2: "#163B63", label: "SYS", shape: '<circle cx="64" cy="46" r="22" fill="#163B63" stroke="#80D8FF" stroke-width="3"/><rect x="54" y="38" width="20" height="16" rx="4" fill="#80D8FF" fill-opacity="0.4"/><path d="M28 106 C28 84 46 72 64 72 C82 72 100 84 100 106" fill="none" stroke="#80D8FF" stroke-width="4" stroke-linecap="round"/>' },
  { id: "05", color1: "#C4EEFF", color2: "#0F2744", label: "DATA", shape: '<ellipse cx="64" cy="44" rx="22" ry="22" fill="#0F2744" stroke="#C4EEFF" stroke-width="3"/><path d="M52 44 L64 34 L76 44 L64 54 Z" fill="#80D8FF" fill-opacity="0.6"/><path d="M30 106 C30 84 46 72 64 72 C82 72 98 84 98 106" fill="none" stroke="#C4EEFF" stroke-width="4" stroke-linecap="round"/>' },
  { id: "06", color1: "#4DA8DA", color2: "#051020", label: "CORE", shape: '<circle cx="64" cy="48" r="24" fill="#051020" stroke="#4DA8DA" stroke-width="3"/><circle cx="64" cy="48" r="12" fill="#80D8FF" fill-opacity="0.5"/><path d="M32 104 C32 80 48 68 64 68 C80 68 96 80 96 104" fill="none" stroke="#4DA8DA" stroke-width="4" stroke-linecap="round"/>' },
  { id: "07", color1: "#80D8FF", color2: "#091B32", label: "DEV", shape: '<rect x="42" y="30" width="44" height="40" rx="12" fill="#091B32" stroke="#80D8FF" stroke-width="3"/><path d="M54 50 L60 56 L54 62" fill="none" stroke="#C4EEFF" stroke-width="2.5" stroke-linecap="round"/><line x1="64" y1="62" x2="74" y2="62" stroke="#80D8FF" stroke-width="2.5" stroke-linecap="round"/><path d="M30 106 C30 84 46 74 64 74 C82 74 98 84 98 106" fill="none" stroke="#80D8FF" stroke-width="4" stroke-linecap="round"/>' },
  { id: "08", color1: "#C4EEFF", color2: "#163B63", label: "GEEK", shape: '<circle cx="64" cy="46" r="22" fill="#163B63" fill-opacity="0.6" stroke="#C4EEFF" stroke-width="3"/><path d="M48 46 Q64 36 80 46" fill="none" stroke="#80D8FF" stroke-width="3" stroke-linecap="round"/><circle cx="54" cy="46" r="4" fill="#C4EEFF"/><circle cx="74" cy="46" r="4" fill="#C4EEFF"/><path d="M32 104 C32 82 48 70 64 70 C80 70 96 82 96 104" fill="none" stroke="#C4EEFF" stroke-width="4" stroke-linecap="round"/>' },
];

for (const av of avatars) {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="bg-${av.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F2744"/>
      <stop offset="50%" stop-color="${av.color2}"/>
      <stop offset="100%" stop-color="#020813"/>
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="28" fill="url(#bg-${av.id})"/>
  ${av.shape}
</svg>`;

  const fileName = `neutral-placeholder-${av.id}.svg`;
  fs.writeFileSync(path.join(teamDir, fileName), svgContent, "utf8");
  console.log(`Created ${fileName}`);
}
console.log("All 8 neutral team placeholder SVGs generated successfully!");
