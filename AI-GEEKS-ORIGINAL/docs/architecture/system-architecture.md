# System Architecture & Technical Specifications
**Project:** AI Geeks Tech Community  
**Document ID:** `DOCS-ARCH-001`  
**Reference Date:** November 17, 2026  
**Status:** Approved Systems Architecture  

---

## 1. High-Level Architecture Topology

```text
  [ Web Clients / Mobile Viewports / Terminal Assistants ]
                           │
                           │ HTTPS / TLS 1.3 / Strict CSP
                           ▼
          ┌───────────────────────────────────┐
          │     AI GEEKS WEB APPLICATION      │
          │  React 18 + Vite 6 + TypeScript  │
          │   Tailwind CSS + Glassmorphism   │
          └─────────────────┬─────────────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
      ┌──────────────────┐     ┌──────────────────┐
      │  COMMAND & NAV   │     │  STATE & AUDIO   │
      │  - Command ⌘K    │     │  - Context Store │
      │  - DevFest Badge │     │  - LocalStorage  │
      │  - 18 Views      │     │  - Web Audio API │
      └────────┬─────────┘     └────────┬─────────┘
               │                        │
               ▼                        ▼
      ┌───────────────────────────────────────────┐
      │     MODULAR CLIENT SERVICE ENGINE         │
      │  - Auth & RBAC Policy Engine              │
      │  - Event Registration & QR Ticket Signer  │
      │  - Discussion & Accepted Answer Resolver  │
      │  - Project Showcase & Star Ledger         │
      │  - Learning Academy & Progress Tracker    │
      │  - Grounded AI Assistant (RAG Pipeline)   │
      └─────────────────────┬─────────────────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
      ┌──────────────────┐     ┌──────────────────┐
      │  RELATIONAL DB   │     │  INTEGRATIONS    │
      │  (33 Entities)   │     │  - GitHub API    │
      │  - PostgreSQL    │     │  - Web Audio     │
      │  - Indexed Keys  │     │  - Canvas Export │
      │  - Audit Logs    │     │  - Confetti      │
      └──────────────────┘     └──────────────────┘
```

---

## 2. Component Hierarchy & Modular Separation

1. **Presentation Layer (`src/components/`):**
   - Pure, accessible UI components decoupled from backend storage.
   - `Navbar.tsx`: Sticky glassmorphic header with active view indicator, search pill, unread notification badges, theme toggle, and user avatar drawer.
   - `Footer.tsx`: 4-column mega footer with working newsletter subscription, social links, and legal disclosures.
   - `CommandPaletteModal.tsx`: Global spotlight modal (`⌘K`) with keyboard navigation and instant search.
   - `DevFestBadgeStudio.tsx`: 2x Retina HTML5 Canvas generator rendering specular borders, customizable roles, and PNG export.
   - Modals: `AuthModal.tsx`, `WritePostModal.tsx`, `AskQuestionModal.tsx`, `SubmitProjectModal.tsx`.

2. **Data & Mock Service Layer (`src/data/`, `src/types/`):**
   - `src/types/community.ts`: Strong typing for all community models.
   - `src/data/communitySeedData.ts`: Realistic initial seeds for users, posts, questions, hackathons, projects, learning paths, and jobs.
   - `src/utils/communityUtils.ts`: Reputation tier calculator, trending score algorithm, relative time formatting, and Web Audio API synthesizer.

3. **Core Application Shell (`src/App.tsx`):**
   - Coordinates client-side routing across all 18 views with state persistence.
   - Houses the Grounded AI Community Assistant, Event Registration Modal, Job Application Modal, and Certificate Verification Viewer.
