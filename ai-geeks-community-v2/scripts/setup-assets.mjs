import fs from 'fs';
import path from 'path';

// 1. Copy website-main/website-main/public to ./public
const srcDir = path.resolve('website-main/website-main/public');
const destDir = path.resolve('public');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const sPath = path.join(src, entry.name);
    const dPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(sPath, dPath);
    } else {
      fs.copyFileSync(sPath, dPath);
    }
  }
}

if (fs.existsSync(srcDir)) {
  copyDir(srcDir, destDir);
  console.log('Copied website-main/public -> ./public');
} else {
  fs.mkdirSync(destDir, { recursive: true });
}

// 2. Ensure custom directories
const dirs = [
  'public/images/brand',
  'public/images/explorer',
  'public/images/moments',
  'public/images/team',
  'public/images/speakers'
];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

// Helper to write SVG
function writeSvg(filePath, title, subtitle, color1 = '#00D4FF', color2 = '#020C47') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color2}" />
        <stop offset="100%" stop-color="#000521" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="#2078CF" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)" />
    <circle cx="400" cy="260" r="140" fill="none" stroke="${color1}" stroke-width="2" stroke-dasharray="6 6" opacity="0.4" />
    <polygon points="400,160 480,240 400,320 320,240" fill="none" stroke="url(#accent)" stroke-width="4" />
    <circle cx="400" cy="240" r="30" fill="${color1}" opacity="0.8" />
    <text x="400" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${title}</text>
    <text x="400" y="460" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#00D4FF" letter-spacing="2" text-anchor="middle">${subtitle}</text>
  </svg>`;
  fs.writeFileSync(filePath, svg);
}

// Brand logo SVG
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">
  <defs>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00D4FF" />
      <stop offset="100%" stop-color="#2078CF" />
    </linearGradient>
  </defs>
  <path d="M20 70 L50 20 L80 70 L60 70 L50 50 L40 70 Z" fill="url(#logoGrad)" />
  <circle cx="50" cy="38" r="6" fill="#00D4FF" />
  <text x="95" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="900" fill="#FFFFFF" letter-spacing="2">AI <tspan fill="#00D4FF">GEEKS</tspan></text>
</svg>`;
fs.writeFileSync('public/images/brand/aigeeks-logo.svg', logoSvg);
fs.writeFileSync('public/images/brand/logo.svg', logoSvg);

// Brand mascot SVG (and .png copy for fallback)
const mascotSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
  <defs>
    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.9" />
      <stop offset="40%" stop-color="#2078CF" stop-opacity="0.6" />
      <stop offset="80%" stop-color="#0E4EB2" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#000521" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="transparent" />
  <circle cx="250" cy="250" r="200" fill="url(#coreGlow)" />
  <polygon points="250,70 380,180 340,360 160,360 120,180" fill="#020C47" stroke="#00D4FF" stroke-width="4" opacity="0.85" />
  <polygon points="250,110 350,200 320,330 180,330 150,200" fill="#0A1A2F" stroke="#2078CF" stroke-width="2" opacity="0.9" />
  <circle cx="250" cy="230" r="45" fill="#000521" stroke="#00D4FF" stroke-width="4" />
  <circle cx="250" cy="230" r="22" fill="#00D4FF" />
  <circle cx="242" cy="222" r="6" fill="#FFFFFF" />
  <path d="M180 300 Q250 340 320 300" stroke="#00D4FF" stroke-width="4" fill="none" stroke-linecap="round" />
</svg>`;
fs.writeFileSync('public/images/brand/aigeeks-3d-mascot.svg', mascotSvg);
fs.writeFileSync('public/images/brand/aigeeks-3d-mascot.png', mascotSvg);

// Explorer photos 01..06
for (let i = 1; i <= 6; i++) {
  const pad = String(i).padStart(2, '0');
  writeSvg(`public/images/explorer/photo-${pad}.jpg`, `AI GEEKS COMMUNITY ${pad}`, 'KEYNOTE & SESSIONS', '#00D4FF', '#020C47');
}

// Moments 01..14
for (let i = 1; i <= 14; i++) {
  const pad = String(i).padStart(2, '0');
  writeSvg(`public/images/moments/moment-${pad}.jpg`, `MOMENT ${pad}`, 'AI GEEKS TECH SUMMIT', '#2078CF', '#011F65');
}

// Team members 01..17
for (let i = 1; i <= 17; i++) {
  const pad = String(i).padStart(2, '0');
  writeSvg(`public/images/team/member-${pad}.jpg`, `TEAM MEMBER ${pad}`, 'CORE ORGANIZER', '#00D4FF', '#0A1A2F');
}

// Speakers 01..03
for (let i = 1; i <= 3; i++) {
  const pad = String(i).padStart(2, '0');
  writeSvg(`public/images/speakers/speaker-${pad}.jpg`, `KEYNOTE SPEAKER ${pad}`, 'AI RESEARCH LEAD', '#00D4FF', '#020024');
}

console.log('All public assets successfully mirrored and generated!');
