<div align="center">
  <img src="./public/readme/hero-banner.svg" alt="AI GEEKS Community Platform Banner" width="100%" />

  <br />

  ![Next.js 16](https://img.shields.io/badge/Next.js-16_App_Router-000521?style=for-the-badge&logo=next.js&logoColor=00D4FF&labelColor=020C47)
  ![TypeScript 5](https://img.shields.io/badge/TypeScript-5.x_Strict-011F65?style=for-the-badge&logo=typescript&logoColor=00D4FF&labelColor=0A1A2F)
  ![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4_Tokens-0E4EB2?style=for-the-badge&logo=tailwindcss&logoColor=00D4FF&labelColor=020C47)
  ![GSAP & Lenis](https://img.shields.io/badge/Motion-GSAP_%2B_Lenis-2078CF?style=for-the-badge&logo=greensock&logoColor=00D4FF&labelColor=000521)
  ![DevFest 2026](https://img.shields.io/badge/GDG_DevFest_2026-Integrated-00D4FF?style=for-the-badge&labelColor=011F65)
  ![License MIT](https://img.shields.io/badge/License-MIT-00D4FF?style=for-the-badge&labelColor=1F1F1F)
</div>

<img src="./public/readme/section-divider.svg" alt="" width="100%" />

## Overview

**AI GEEKS** is a unified developer community platform engineered with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **GSAP ScrollTrigger**, and **Lenis** smooth scroll physics. The platform unites two premier developer ecosystems into one seamless experience with a shared zero-border, **9-Shade Blue Glassmorphic Design System**:

1. **Chennai React JS Community Experience (`/`)**:
   - Parallax Hero with iconic Chennai Central & Marina Beach motifs.
   - DevFestBot interactive 3D Mascot Playground (`@react-three/fiber` + `@react-three/drei`).
   - ReactBits draggable Sticker Peel interactive dock.
   - Live Luma community meetups feed, upcoming talks, and DSC VIT-inspired organizing team grid.
   - Dual Opposing Marquees for real-time community tweets and LinkedIn highlights.
   - Napier Bridge-themed multi-channel social footer.

2. **GDG DevFest Chennai 2026 Experience (`/devfest`)**:
   - Forensic clone and native integration of the official DevFest Chennai 2026 web application.
   - Interactive 3D Brackets background with performance mode toggle (`?lite=1`).
   - 8 Technical Specialization Tracks (GenAI, Cloud, Android, Web, Security, DevOps, etc.).
   - Full 68-session Timetable & Agenda with hall filtering, track pills, and session bookmarking.
   - 29-Speaker Keynote Directory with deep-linked bio modals and individual speaker profile pages (`/devfest/speakers/[slug]`).
   - Tiered Digital Pass Selector (`/devfest/tickets`) with KonfHub-style registration (`/devfest/tickets/select`).
   - 4 Browser Mini-Games (`/devfest/games`): Jigsaw Puzzle, Google Crossword, Memory Matrix, Syntax Speed Typer with live XP.
   - 15-Photo High-Resolution Event Memories Archive (`/devfest/memories`) across 2025, 2024, and 2023.
   - Multi-Stage Live Broadcast Center (`/devfest/live`) with real-time emoji reactions and simulated chat.
   - Community Partners Showcase (`/devfest/partner`) and Digital Badge Customization Studio (`/devfest/profile`).

<img src="./public/readme/section-divider.svg" alt="" width="100%" />

## System & Component Architecture

The unified platform separates static and dynamic rendering across the Next.js 16 App Router, synchronizing smooth scroll inertia with pinned GSAP timelines, WebGL particle canvases, and a centralized TypeScript data layer.

```mermaid
graph TD
    subgraph Client_Runtime["Client Runtime & Motion Engine"]
        Lenis["Lenis Smooth Scroll"]
        GSAP["GSAP + ScrollTrigger"]
        R3F["Three.js / R3F Canvas"]
        Lenis -->|raf & scroll sync| GSAP
    end

    subgraph Unified_Next_Router["Unified Next.js 16 App Router"]
        RootLayout["RootLayout (layout.tsx)"]
        
        subgraph Chennai_React["Chennai React & AI GEEKS Ecosystem"]
            Home["Hero & 3D Playground (/)"]
            Events["Events Hub (/events)"]
            Speakers["Speakers Directory (/past-speakers)"]
            Gallery["Media Lightbox (/gallery)"]
            Forum["AI Forum & Q&A (/forum)"]
            Team["Core Team (/team)"]
            Sponsor["Sponsor & Speak (/sponsor)"]
            CoC["Code of Conduct (/code-of-conduct)"]
        end

        subgraph GDG_DevFest["GDG DevFest Chennai 2026 Ecosystem"]
            DevFestLayout["DevFest Layout (/devfest/layout.tsx)"]
            DevFestHome["DevFest Portal (/devfest)"]
            Agenda["68-Session Timetable (/devfest/agenda)"]
            DevFestSpeakers["Speakers & Profiles (/devfest/speakers)"]
            Tickets["Passes & Checkout (/devfest/tickets)"]
            Games["4x Arcade Hub (/devfest/games)"]
            Memories["Event Archive (/devfest/memories)"]
            Live["Broadcast Hub (/devfest/live)"]
            Partner["Partners (/devfest/partner)"]
            Profile["Badge Studio (/devfest/profile)"]
            Contact["Help Desk (/devfest/contact)"]
        end
    end

    subgraph Data_And_Tokens["Data & 9-Shade Blue Token System"]
        Tokens["CSS Tokens (tokens.css)"]
        CommunityData["Typed Community Data (communityData.ts)"]
        DevFestData["DevFest Data (devfestData.ts)"]
    end

    RootLayout --> Client_Runtime
    RootLayout --> Chennai_React
    RootLayout --> DevFestLayout
    DevFestLayout --> GDG_DevFest
    Data_And_Tokens --> Unified_Next_Router
```

### Interactive Scroll & Luma Feed Lifecycle

```mermaid
sequenceDiagram
    participant User as Developer / Visitor
    participant Lenis as SmoothScrollProvider
    participant GSAP as MomentsGallery (ScrollTrigger)
    participant UI as UpcomingEvents UI
    participant API as /api/events Route

    User->>Lenis: Scrolls viewport vertically
    Lenis->>GSAP: Emits synchronized scroll progress
    GSAP->>User: Pins section & scrubs 01 / 14 cards horizontally
    User->>UI: Clicks "Try again" on Luma Fallback Boundary
    UI->>API: GET /api/events
    API-->>UI: Returns JSON event feed (Upcoming & Past)
    UI-->>User: Renders interactive glassmorphic event cards
```

### Community Feature & Data Flow

```mermaid
flowchart LR
    Config["SITE_CONFIG & NAV_LINKS"] --> Navbar["Infinite Marquee & Glass Navbar"]
    Explorer["EXPLORER_PHOTOS (01 / 06)"] --> Picker["Interactive Photo Picker"]
    Moments["COMMUNITY_MOMENTS (01 / 14)"] --> Track["Pinned Horizontal Track"]
    Threads["FORUM_THREADS"] --> ForumView["Master-Detail Q&A Forum"]
    Tiers["SPONSOR_TIERS"] --> Onboarding["Speaker & Sponsor Portal"]
    DevFestJSON["agenda.json & speakers.json"] --> DevFestViews["DevFest Agenda, Speakers, Games"]
```

<img src="./public/readme/section-divider.svg" alt="" width="100%" />

## 9-Shade Blue Glassmorphic Color System

Every surface, border, gradient, and glow state in the repository is strictly mapped to nine hex shades defined in **src/styles/tokens.css**.

| CSS Custom Property | Hex Code | Palette Name | Primary Architectural Role |
| :--- | :--- | :--- | :--- |
| --ag-bg-abyss | #000521 | Abyssal Navy | Primary viewport background canvas |
| --ag-bg-void | #020024 | Midnight Void | Alternating section and footer canvas |
| --ag-bg-obsidian | #020C47 | Obsidian Royal | Elevated glassmorphic card base |
| --ag-bg-cyber | #0A1A2F | Cyber Slate Navy | Translucent surface panel tint |
| --ag-blue-imperial | #011F65 | Imperial Cobalt | Active route pills and secondary buttons |
| --ag-blue-sapphire | #0E4EB2 | Core Sapphire | Interactive hover fill and CTA midpoint |
| --ag-blue-azure | #2078CF | Vibrant Azure | Primary CTA gradient lead and borders |
| --ag-cyan-electric | #00D4FF | Electric Cyan | Monospace eyebrows, badges, and rim glows |
| --ag-neutral-carbon | #1F1F1F | Carbon Dark | Terminal header bars, code blocks, and dividers |

<img src="./public/readme/section-divider.svg" alt="" width="100%" />

## Route & Module Matrix

### Primary AI GEEKS & Chennai React Routes

| Route Path | Source File | Interactive Capabilities |
| :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Parallax Hero, 3D Mascot Playground, Sticker Peel, Luma feed, GSAP gallery |
| `/about` | `src/app/about/page.tsx` | Community pillars, 10k+ member metrics, and builder mission |
| `/events` | `src/app/events/page.tsx` | Upcoming and past meetup tabs wired to the Luma API handler |
| `/past-speakers` | `src/app/past-speakers/page.tsx` | Live text search and category filtering across speaker sessions |
| `/gallery` | `src/app/gallery/page.tsx` | Photo and video media archive with modal lightbox player |
| `/forum` | `src/app/forum/page.tsx` | Master-detail AI Q&A forum with upvotes, thread creation, and replies |
| `/team` | `src/app/team/page.tsx` | 17-member core organizing team grid with role badges |
| `/sponsor` | `src/app/sponsor/page.tsx` | Sponsorship prospectus tiers and speaker proposal onboarding form |
| `/code-of-conduct` | `src/app/code-of-conduct/page.tsx` | Community safety standards and enforcement guidelines |
| `/join` | `src/app/join/page.tsx` | Community membership onboarding with interest tags and pass generation |
| `/hackathon-showcase` | `src/app/hackathon-showcase/page.tsx` | Live project submissions, demo links, and judge scoring matrix |
| `/settings` | `src/app/settings/page.tsx` | User preferences, theme controls, and notification settings |

### GDG DevFest Chennai 2026 Routes

| Route Path | Source File | Interactive Capabilities |
| :--- | :--- | :--- |
| `/devfest` | `src/app/devfest/page.tsx` | Particle hero, 8 tech tracks, mini-games preview, keynotes, venue map |
| `/devfest/agenda` | `src/app/devfest/agenda/page.tsx` | Interactive 68-session timetable with hall filters, track pills, and search |
| `/devfest/speakers` | `src/app/devfest/speakers/page.tsx` | 29 keynote speakers directory with bio modal and talk cross-links |
| `/devfest/speakers/[slug]` | `src/app/devfest/speakers/[slug]/page.tsx` | Dynamic individual speaker profile page with full session details |
| `/devfest/tickets` | `src/app/devfest/tickets/page.tsx` | Tiered pass selector (Student, Pro, Women in Tech, VIP) with badge generator |
| `/devfest/tickets/select` | `src/app/devfest/tickets/select/page.tsx` | KonfHub-style profile matching and pass tier selection step |
| `/devfest/games` | `src/app/devfest/games/page.tsx` | 4 browser games (Jigsaw, Crossword, Memory Matrix, Typer) with live XP |
| `/devfest/memories` | `src/app/devfest/memories/page.tsx` | 15-photo high-resolution event archive (2025, 2024, 2023) with lightbox |
| `/devfest/live` | `src/app/devfest/live/page.tsx` | Multi-stage broadcast center with emoji reactions and simulated live chat |
| `/devfest/partner` | `src/app/devfest/partner/page.tsx` | Community partners and alliance showcase (GDG Cloud, UAI, Grafana, etc.) |
| `/devfest/profile` | `src/app/devfest/profile/page.tsx` | Digital attendee badge studio with customizable name, role, accent, QR |
| `/devfest/contact` | `src/app/devfest/contact/page.tsx` | Help desk and inquiry contact form |

<img src="./public/readme/section-divider.svg" alt="" width="100%" />

## Quick Start & Automated Verification

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Unified Development Server**
   ```bash
   npm run dev
   ```
   - Primary AI GEEKS / Chennai React: `http://localhost:3000/`
   - DevFest Chennai 2026 Portal: `http://localhost:3000/devfest`

3. **Run the Automated Verification Suite**
   ```bash
   npm run verify:readme
   npm run verify:clone
   npm run typecheck
   npm run build
   ```
