const fs = require('fs');
const path = require('path');

const dirs = [
  'public/website_main/explorer',
  'public/website_main/moments',
  'public/website_main/gallery',
  'public/website_main/brand'
];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

// Explorer photos 01-06
for (let i = 1; i <= 6; i++) {
  const num = String(i).padStart(2, '0');
  const src = 'public/images/explorer/photo-' + num + '.jpg';
  const dest = 'public/website_main/explorer/photo-' + num + '.jpg';
  if (fs.existsSync(src)) fs.copyFileSync(src, dest);
}

// Moments 01-14
for (let i = 1; i <= 14; i++) {
  const num = String(i).padStart(2, '0');
  const src = 'public/images/moments/moment-' + num + '.jpg';
  const dest = 'public/website_main/moments/moment-' + num + '.jpg';
  if (fs.existsSync(src)) fs.copyFileSync(src, dest);
}

// Gallery media 01-06 (mapped from moments)
for (let i = 1; i <= 6; i++) {
  const num = String(i).padStart(2, '0');
  const src = 'public/images/moments/moment-' + num + '.jpg';
  const dest = 'public/website_main/gallery/media-' + num + '.jpg';
  if (fs.existsSync(src)) fs.copyFileSync(src, dest);
}

// Brand mascot and logo
if (fs.existsSync('public/images/brand/aigeeks-3d-mascot.png')) {
  fs.copyFileSync('public/images/brand/aigeeks-3d-mascot.png', 'public/website_main/brand/aigeeks-3d-mascot.png');
}
if (fs.existsSync('public/images/brand/aigeeks-logo.svg')) {
  fs.copyFileSync('public/images/brand/aigeeks-logo.svg', 'public/website_main/brand/aigeeks-logo.svg');
}

console.log('public/website_main assets populated successfully.');
