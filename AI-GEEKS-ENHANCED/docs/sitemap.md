# AI GEEKS Platform Sitemap & Information Architecture

**Project:** AI GEEKS Community Platform  
**Architecture:** Next.js 16 App Router  
**Last Verified:** November 2026

---

## 1. Public Community Experience

| Route | File Path | Description | Access |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Rebuilt Community Homepage (Hero, Events, 01/06 Explorer, Make It Happen, 01/14 Moments, Sliders, Footer) | Public |
| `/about` | `src/app/about/page.tsx` | Community mission, history, Chennai tech roots, and leadership | Public |
| `/events` | `src/app/events/page.tsx` | Meetups, workshops, and Luma RSVP calendar | Public |
| `/past-speakers` | `src/app/past-speakers/page.tsx` | 36+ speaker directory with circular portraits, talk topics, and company affiliations | Public |
| `/team` | `src/app/team/page.tsx` | Organizers, Core Team, and Emcee profiles (fictionalized demo names per Phase 10) | Public |
| `/gallery` | `src/app/gallery/page.tsx` | Event photo and video slider stages with unified motion physics and modal previews | Public |
| `/sponsor` | `src/app/sponsor/page.tsx` | Partnership tiers, previous sponsors grid, and speaker/sponsor application forms | Public |
| `/code-of-conduct` | `src/app/code-of-conduct/page.tsx` | Two-column policy text, organizer message, reporting form, and photo collage | Public |
| `/platforms` | `src/app/platforms/page.tsx` | 17 integrated campus directories, event platforms, and developer channels | Public |
| `/join` | `src/app/join/page.tsx` | 3-step onboarding checklist and regional Tamil Nadu hub links | Public |
| `/forum` | `src/app/forum/page.tsx` | Technical builder Q&A forum covering LLM agents, Next.js, and TypeScript | Public / Member |
| `/coc` | `src/app/coc/page.tsx` | Canonical redirect / shortcut to Code of Conduct | Public |
| `/socials` | `src/app/socials/page.tsx` | Social media link tree and discovery hub | Public |

---

## 2. Hackathon & Builder Operations

| Route | File Path | Description | Access |
|---|---|---|---|
| `/hackathon-showcase` | `src/app/hackathon-showcase/page.tsx` | Public hackathon portal, winner certificates, and problem statements | Public |
| `/team-portal` | `src/app/team-portal/page.tsx` | 12-stage team lifecycle tracker, transactional problem selection, and submissions | Team Leader / Member |

---

## 3. Administrative Command Center & Security

| Route | File Path | Description | Access |
|---|---|---|---|
| `/settings` | `src/app/settings/page.tsx` | Core Team RBAC role switcher, credential verification, and feature governance | Admin / Core Team |
| `/admin/hackathons` | `src/app/admin/hackathons/page.tsx` | Global hackathon management dashboard and status tracker | Admin / Organizer |
| `/admin/hackathons/[id]` | `src/app/admin/hackathons/[id]/page.tsx` | Event-level management console (Next.js 16 async Promise params) | Admin / Evaluator |
| `/admin/hackathons/[id]/teams` | `src/app/admin/hackathons/[id]/[tab]/page.tsx` | Team roster, 6-dimension status manager, and member masking | Admin / Organizer |
| `/admin/hackathons/[id]/problems` | `src/app/admin/hackathons/[id]/[tab]/page.tsx` | Problem statement directory, capacity rules, and publishing | Admin / Organizer |
| `/admin/hackathons/[id]/analytics` | `src/app/admin/hackathons/[id]/[tab]/page.tsx` | Selection distribution charts (Bar, Donut, Trends, Team breakdown) | Admin / Evaluator |
| `/admin/hackathons/[id]/submissions` | `src/app/admin/hackathons/[id]/[tab]/page.tsx` | Project deliverables, repository links, and demo video review | Evaluator / Admin |
| `/admin/hackathons/[id]/reviews` | `src/app/admin/hackathons/[id]/[tab]/page.tsx` | Scoring rubrics, judge evaluations, and finalist qualification | Evaluator / Admin |
| `/admin/hackathons/[id]/settings` | `src/app/admin/hackathons/[id]/[tab]/page.tsx` | Lifecycle stage locks, deadlines, and export controls | Super Admin |

---

## 4. API Endpoints

| Endpoint | Method | File Path | Description |
|---|---|---|---|
| `/api/events` | GET | `src/app/api/events/route.ts` | Returns active upcoming and past community meetups |
| `/api/admin/hackathons` | GET, POST | `src/app/api/admin/hackathons/route.ts` | Transactional problem selection, status updates, and rubric evaluation |
| `/api/hackathon` | GET | `src/app/api/hackathon/route.ts` | Hackathon metadata and active team records |
