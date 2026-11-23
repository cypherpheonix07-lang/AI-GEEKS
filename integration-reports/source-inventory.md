# DevFest Chennai 2026 Source Inventory Report

**Repository Origin:** https://github.com/gdgchennai/devfest26-web.git  
**Imported Commit SHA:** \`eef26c05628fac51ecdf7eaedc37b91d2bb9feee\`  
**Import Message:** "Move Saurabh's Tech talk earlier and shift the following slots (#49)"  
**Cloned Local Target:** \`integrations/devfest26\`  
**License:** MIT License (GDG Chennai)  

---

## 1. Directory Structure
| Top-Level Directory | Purpose | Key Modules |
| :--- | :--- | :--- |
| \`app/\` | Next.js 16 App Router pages and layouts | \`agenda/\`, \`speakers/\`, \`tickets/\`, \`memories/\`, \`games/\`, \`live/\`, \`api/\`, \`admin/\` |
| \`components/\` | React 19 UI components | Hero, BracketsField, Games (Jigsaw, Crossword, Memory, Typer), Header, Footer |
| \`content/\` | Markdown & Structured data sources | Speaker bios, session abstracts, community partners, event archives |
| \`docs/\` | Implementation and operational architecture | \`games.md\`, \`accounts-and-favorites.md\`, \`deployment.md\`, \`environment.md\` |
| \`lib/\` | Core utilities, game rules, caching, formatters | \`game-rules.ts\`, \`leaderboard.ts\`, \`image-sizes.ts\`, \`routes.ts\` |
| \`migrations/\` | Cloudflare D1 SQL schema migrations | User accounts, ticketing records, game sessions, scores |
| \`public/\` | Static assets, SVGs, brand shapes, speaker photos | \`/brand-shapes/\`, \`/games/\`, \`/sponsors/\`, \`/illustrations/\` |
| \`scripts/\` | Build, markdown checking, and content sync tools | \`markdown-rule.mjs\`, \`sync-content.mjs\` |
| \`types/\` | TypeScript ambient and schema definitions | Domain types, Cloudflare Worker bindings |
| \`workers/\` | Cloudflare Workers for ticketing & Hall live | \`workers/ticketing/\`, \`workers/hall-live/\` |

---

## 2. Dependencies & Frameworks
- **Framework:** Next.js 16.3.3
- **Runtime Library:** React 19.2.4 / React DOM 19.2.4
- **Animation & 3D:** Three.js 0.185.1, GSAP 3.15.0, Lenis 1.3.25
- **Styling:** Tailwind CSS v4, PostCSS
- **State & Schema:** Zod 4.4.3, NextAuth 5.0.0-beta.32, PostHog 1.427.1
- **Deployment Platform:** Cloudflare Workers via OpenNext (\`@opennextjs/cloudflare\`)

---

## 3. Mini-Games Architecture
All four mini-games score **server-side** with replay verification:
1. **Jigsaw Puzzle**: Supports Tile Swap & Classic Slide modes across 3×3, 4×4, and 5×5 boards.
2. **Tech Crossword**: Clues delivered from server; hints, checks, and win conditions verified server-side.
3. **Memory Matrix**: Card-flip sequence matching with move counting and time tracking.
4. **Speed Typer**: Time Attack (15s/30s/60s) and Words Count (200/400/500 words) with WPM sanity bounds.
In local development, the application automatically leverages in-memory session persistence when Cloudflare D1 is absent.
