<div align="center">
  <img src="./public/readme/hero-banner.svg" alt="AI GEEKS Community Platform Banner" width="100%" />

  <br />

  ![Next.js 16](https://img.shields.io/badge/Next.js-16_App_Router-000521?style=for-the-badge&logo=next.js&logoColor=00D4FF&labelColor=020C47)
  ![TypeScript 5](https://img.shields.io/badge/TypeScript-5.x_Strict-011F65?style=for-the-badge&logo=typescript&logoColor=00D4FF&labelColor=0A1A2F)
  ![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4_Tokens-0E4EB2?style=for-the-badge&logo=tailwindcss&logoColor=00D4FF&labelColor=020C47)
  ![GSAP & Lenis](https://img.shields.io/badge/Motion-GSAP_%2B_Lenis-2078CF?style=for-the-badge&logo=greensock&logoColor=00D4FF&labelColor=000521)
  ![License MIT](https://img.shields.io/badge/License-MIT-00D4FF?style=for-the-badge&labelColor=1F1F1F)
</div>

<img src="./public/readme/section-divider.svg" alt="" width="100%" />

## Overview

**AI GEEKS** is a modern developer community platform engineered with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **GSAP ScrollTrigger**, and **Lenis** smooth scroll interpolation. Re-architected from the open-source Chennai React community stack and styled in a custom **9-Shade Blue Glassmorphic Design System**, the platform powers live Luma event calendars, interactive meetup galleries, speaker directories, sponsorship portals, and an AI engineering Q&A forum.

<img src="./public/readme/section-divider.svg" alt="" width="100%" />

## System & Component Architecture

The platform separates static and dynamic rendering across the Next.js App Router, synchronizing smooth scroll inertia with pinned GSAP timelines and a centralized TypeScript data layer.

```mermaid
graph TD
    subgraph Client_Runtime["Client Runtime & Motion Engine"]
        Lenis["Lenis Smooth Scroll"]
        GSAP["GSAP + ScrollTrigger"]
        Lenis -->|raf & scroll sync| GSAP
    end

    subgraph Next_App_Router["Next.js 16 App Router"]
        Layout["RootLayout (layout.tsx)"]
        Home["Landing View (/)"]
        Events["Events Hub (/events)"]
        Speakers["Speakers Directory (/past-speakers)"]
        Gallery["Media Lightbox (/gallery)"]
        Forum["AI Forum & Q&A (/forum)"]
        Team["Core Team (/team)"]
        Sponsor["Sponsor & Speak (/sponsor)"]
        CoC["Code of Conduct (/code-of-conduct)"]
        API["Luma API Handler (/api/events)"]
    end

    subgraph Data_And_Tokens["Data & 9-Shade Blue Token System"]
        Tokens["CSS Tokens (tokens.css)"]
        Data["Typed Data (communityData.ts)"]
    end

    Layout --> Client_Runtime
    Layout --> Home
    Layout --> Events
    Layout --> Speakers
    Layout --> Gallery
    Layout --> Forum
    Layout --> Team
    Layout --> Sponsor
    Layout --> CoC
    Events --> API
    Home --> API
    Data_And_Tokens --> Next_App_Router
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

| Route Path | Source File | Interactive Capabilities |
| :--- | :--- | :--- |
| / | src/app/page.tsx | 3D Mascot tilt hero, Luma feed, 01/06 photo picker, 01/14 GSAP gallery |
| /about | src/app/about/page.tsx | Community pillars, 10k+ member metrics, and builder mission |
| /events | src/app/events/page.tsx | Upcoming and past meetup tabs wired to the Luma API handler |
| /past-speakers | src/app/past-speakers/page.tsx | Live text search and category filtering across speaker sessions |
| /gallery | src/app/gallery/page.tsx | Photo and video media archive with modal lightbox player |
| /forum | src/app/forum/page.tsx | Master-detail AI Q&A forum with upvotes, thread creation, and replies |
| /team | src/app/team/page.tsx | 17-member core organizing team grid with role badges |
| /sponsor | src/app/sponsor/page.tsx | Sponsorship prospectus tiers and speaker proposal onboarding form |
| /code-of-conduct | src/app/code-of-conduct/page.tsx | Community safety standards and enforcement guidelines |

<img src="./public/readme/section-divider.svg" alt="" width="100%" />

## Quick Start & Automated Verification

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Run the Automated Clone & README Verification Suite**
   ```bash
   npm run verify:readme
   npm run verify:clone
   npm run build
   ```
