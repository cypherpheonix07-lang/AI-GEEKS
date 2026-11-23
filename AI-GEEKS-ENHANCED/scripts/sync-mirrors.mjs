import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const TARGETS = [
  path.join(ROOT, 'ai-geeks-community-v2'),
  path.join(ROOT, '..', 'ai-geeks-community-v2'),
  path.join(ROOT, 'AI-GEEKS-ENHANCED'),
  path.join(ROOT, '..', 'ai-geeks-community-enhanced'),
];

const ITEMS_TO_SYNC = [
  'src',
  'public',
  'docs',
  'scripts',
  '.github',
  'package.json',
  'tsconfig.json',
  'next.config.mjs',
  'tailwind.config.js',
  'postcss.config.js',
  'README.md',
  'CLONE_STATUS.md',
];

for (const target of TARGETS) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  console.log(`Synchronizing to ${path.relative(ROOT, target)}...`);

  for (const item of ITEMS_TO_SYNC) {
    const srcPath = path.join(ROOT, item);
    const destPath = path.join(target, item);

    if (!fs.existsSync(srcPath)) continue;

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true, force: true });
      console.log(`  -> Synced directory ${item}`);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  -> Synced file ${item}`);
    }
  }
}

console.log('All mirrors successfully synchronized!');
