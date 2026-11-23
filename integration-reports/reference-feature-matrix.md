# Reference Feature Matrix & Forensic Live-Site Inventory
**Reference Target:** https://devfest.gdgchennai.in/  
**Inspection Date:** 2026-11-22T23:28:48.890Z  
**Official Repository:** https://github.com/gdgchennai/devfest26-web  

## 1. Verified Live Routes & Status Codes
| Route | Status | Page Title / Endpoint Type | Content-Type | Size (Bytes) |
| :--- | :---: | :--- | :--- | :---: |
| `/` | **200** | DevFest Chennai 2026 | `text/html; charset=utf-8` | 110561 |
| `/agenda` | **200** | Agenda — DevFest Chennai 2026 | `text/html; charset=utf-8` | 138158 |
| `/event-agenda` | **200** | Agenda — DevFest Chennai 2026 | `text/html; charset=utf-8` | 63760 |
| `/speakers` | **200** | Speakers — DevFest Chennai 2026 | `text/html; charset=utf-8` | 148629 |
| `/speakers/sathya-gunasekaran` | **404** | Page not found — DevFest Chennai 2026 | `text/html; charset=utf-8` | 40798 |
| `/tickets` | **200** | Tickets — DevFest Chennai 2026 | `text/html; charset=utf-8` | 71766 |
| `/tickets/select` | **200** | Get Tickets — DevFest Chennai 2026 | `text/html; charset=utf-8` | 70170 |
| `/memories` | **200** | Memories — DevFest Chennai 2026 | `text/html; charset=utf-8` | 104625 |
| `/games` | **200** | Mini Games — DevFest Chennai 2026 | `text/html; charset=utf-8` | 82153 |
| `/my-agenda` | **200** | Sign in — DevFest Chennai 2026 | `text/html; charset=utf-8` | 70461 |
| `/signin` | **200** | Sign in — DevFest Chennai 2026 | `text/html; charset=utf-8` | 70461 |
| `/profile` | **200** | Sign in — DevFest Chennai 2026 | `text/html; charset=utf-8` | 70461 |
| `/contact` | **200** | Contact — DevFest Chennai 2026 | `text/html; charset=utf-8` | 67328 |
| `/partner` | **200** | Community Partnership — DevFest Chennai 2026 | `text/html; charset=utf-8` | 92406 |
| `/creators` | **200** | An Invitation to Creators — DevFest Chennai 2026 | `text/html; charset=utf-8` | 76311 |
| `/live` | **200** | Live at DevFest — DevFest Chennai 2026 | `text/html; charset=utf-8` | 138402 |
| `/md/agenda` | **200** | No Title | `text/markdown; charset=utf-8` | 7427 |
| `/md/contact` | **200** | No Title | `text/markdown; charset=utf-8` | 727 |
| `/md/creators` | **200** | No Title | `text/markdown; charset=utf-8` | 3095 |
| `/md/memories` | **200** | No Title | `text/markdown; charset=utf-8` | 2587 |
| `/md/partner` | **200** | No Title | `text/markdown; charset=utf-8` | 4337 |
| `/md/speakers` | **200** | No Title | `text/markdown; charset=utf-8` | 5927 |
| `/md/tickets` | **200** | No Title | `text/markdown; charset=utf-8` | 2236 |
| `/api/content/agenda` | **200** | JSON API | `application/json` | 40812 |
| `/api/content/speakers` | **200** | JSON API | `application/json` | 24313 |
| `/api/content/memories` | **404** | JSON API | `application/json` | 27 |
| `/api/content/partners` | **404** | JSON API | `application/json` | 27 |
| `/api/games/content` | **200** | JSON API | `application/json` | 3420 |
| `/api/games/scores` | **200** | JSON API | `application/json` | 14066 |

## 2. Interactive States & Component Mapping
- **Full 3D Mode (`?lite=0`)**: Three.js WebGL canvas (`BracketsField`) rendering floating brackets, particle fields, ambient directional lighting, Lenis smooth scrolling, and dynamic hero motion.
- **Lite Mode (`?lite=1`)**: High-performance static gradient baseline fallback with reduced CPU/GPU footprint.
- **Agenda System**: 8-track filterable timeline, multi-floor room tracking, interactive speaker modals, and Asia/Kolkata timezone schedule.
- **Featured Speakers Directory**: Multi-track grid with speaker portraits, bio modals, topic categories, session mapping, and social badges.
- **Mini-Games Ecosystem**:
  1. **Jigsaw Puzzle**: Tile Swap and Classic Slide modes (3x3, 4x4, 5x5) with move-log server replay.
  2. **Tech Crossword**: Daily tech clue puzzle with server-side hint counting and word validation.
  3. **Memory Matrix**: Card-flip sequence memory game with time and error penalties.
  4. **Speed Typer**: 15s/30s/60s time attack and 200/400/500 word challenges with anti-cheat WPM validation.
- **Ticketing & RSVP Flow**: Tier selection (Professional vs. Student, General vs. Diverse groups) with KonfHub checkout integration.
- **Memories Gallery**: Curated event photography grid with responsive srcset imagery and lightbox modal.
