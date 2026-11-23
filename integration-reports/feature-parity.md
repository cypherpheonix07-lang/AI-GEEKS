# DevFest Chennai 2026 Feature Parity & Verification Report

**Reference URL:** https://devfest.gdgchennai.in/?lite=0  
**Local Integration Endpoint:** http://localhost:3000/devfest  
**Gateway Entrypoint:** http://localhost:3000/  
**Source Baseline:** https://github.com/gdgchennai/devfest26-web (commit \`eef26c05628fac51ecdf7eaedc37b91d2bb9feee\`)  

---

## 1. Feature Parity Matrix

| Feature / Page | Reference Behavior | Local Integration Status | Verified Evidence |
| :--- | :--- | :---: | :--- |
| **Homepage (\`/\`)** | Primary AI Geeks Community application | **VERIFIED** | Running unchanged, byte-for-byte baseline preserved |
| **DevFest Home (\`/devfest\`)** | Official DevFest Chennai landing page | **VERIFIED** | Full 3D hero motion, brackets field, partner marquee, stats |
| **Full 3D Mode (\`?lite=0\`)** | Three.js WebGL canvas, Lenis scroll, 3D brackets | **VERIFIED** | Active Three.js perspective camera & rotating 3D brackets |
| **Lite Mode (\`?lite=1\`)** | Static gradient baseline, zero WebGL overhead | **VERIFIED** | Lightweight static hero fallback matching reference |
| **Agenda (\`/devfest/agenda\`)** | 8-track filterable schedule, multi-floor layout | **VERIFIED** | Timings rendered in \`Asia/Kolkata\`, track chips, speaker links |
| **Speakers (\`/devfest/speakers\`)** | Speaker directory with category filters | **VERIFIED** | Full speaker profiles, topics, company badges, social handles |
| **Speaker Detail (\`/devfest/speakers/[slug]\`)**| Individual speaker bio & session details | **VERIFIED** | Dynamic route matching reference structure |
| **Tickets (\`/devfest/tickets\`)** | Event overview, date, venue, KonfHub RSVP | **VERIFIED** | Ticket tiers, category selector (Professional vs Student) |
| **Ticket Select (\`/devfest/tickets/select\`)** | Interactive ticket picker & tier pricing | **VERIFIED** | Preserves \`site.config.ts\` pricing and category rules |
| **Memories (\`/devfest/memories\`)** | High-res photo gallery with lightbox | **VERIFIED** | Grid layout with responsive image sizes |
| **Games Hub (\`/devfest/games\`)** | 4-game launcher & leaderboard rankings | **VERIFIED** | Jigsaw, Crossword, Memory Matrix, Speed Typer |
| **Jigsaw Puzzle** | Tile Swap & Classic Slide (3×3, 4×4, 5×5) | **VERIFIED** | Client move-log recording with replay validation |
| **Tech Crossword** | Daily puzzle with hints & checks | **VERIFIED** | Server-side clue verification & hint counting |
| **Memory Matrix** | Card flip matching with time penalties | **VERIFIED** | Board randomization and match tracking |
| **Speed Typer** | Time attack (15s/30s/60s) & word count | **VERIFIED** | Real-time WPM, accuracy %, and keystroke timer |
| **Profile & Sign In** | User badge, favorites, and game scores | **VERIFIED** | Isolated authentication & local score storage |

---

## 2. Zero Collision Verification
- **CSS Isolation**: Tailwind CSS compiles cleanly within DevFest namespace without leaking into primary site.
- **Port Isolation**: Primary site served on `:3001`, DevFest on `:3002`, unified seamlessly under `:3000` by Route Gateway.
- **Path Isolation**: DevFest operates under \`/devfest\` base path, avoiding collisions with primary \`/_next/...\` assets.
- **Storage Isolation**: In-memory and local SQLite/D1 session handling prevents database collisions.
