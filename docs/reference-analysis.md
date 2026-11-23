# Reference Analysis & Reverse-Engineering Specification

**Project:** AI GEEKS Community Platform  
**Target Architecture:** Next.js 16 (Turbopack) & React 19  
**Styling System:** Dark & Light Sky Metallic Glass Blue (`#020813`, `#051020`, `#091B32`, `#0F2744`, `#163B63`, `#2B6CB0`, `#4DA8DA`, `#80D8FF`, `#C4EEFF`, `#16202C`)  
**Source References:** User Screenshots 01–07 & Screen Recording (159s)

---

## 1. Executive Summary & Visual DNA

The visual references capture the premier developer community experience modeled from the Chennai tech ecosystem (ChennaiReact.in), translated into an authentic AI GEEKS community web platform. 

The design combines:
1. **Top Community Marquee Ticker & Sticky Glass Navbar:** Continuous community announcement banner over a translucent, backdrop-blurred navigation bar with high-contrast actions.
2. **Hero & Upcoming Events Boundary:** Bold typographic statement, brand mascot showcase, primary and secondary call-to-actions, and an immediate upcoming events schedule with resilient empty states.
3. **Interactive 01 / 06 Photo Explorer:** Three-region community photo stack with subtle card tilt, front elevation, dynamic index counters, and key community metrics (10k+ Members, 12+ Meetups, 2+ Years).
4. **"Make It Happen" Dual Action Panels:** High-impact call-for-speakers and call-for-sponsors cards with rounded corners, photography overlays, and direct application workflows.
5. **Clean Multi-Column Sponsor & Partner Grids:** 5-column sponsor grid (TALENTSHIP, ImageKit, WSO2, IBM, YuniQ, think42, FULL, Mahathaan, St. Joseph's, 7 Angle) and partner network (React India, React Nexus, JS Lovers, GDG Chennai, FOSS United, TechXConf, Global Freelance Festival).
6. **Horizontal Moments Track (01 / 14):** Polaroid-style horizontal scroll gallery with pinned GSAP track and live bottom counter.
7. **Subpage Directory & 3-Column Footer:** Dedicated past speakers circular grid, meet-the-team card directory, two-column code of conduct with photo collage, and 3-column footer with 10 social/developer channels.

---

## 2. Screenshot-by-Screenshot Analysis

### Screenshot 01 — Previous Sponsors & Community Partners
- **Section A (Our previous sponsors):**
  - Section heading in bold display type, accompanied by the right-aligned subhead `"Thank you for supporting the community."`.
  - 10-logo grid arranged in 2 rows of 5 columns on desktop, condensing to 3 columns on tablet and 2 columns on mobile.
  - Logos: TALENTSHIP (chevron icon), imagekit.io (blue sans), WSO2 (orange/black curve), IBM (striped blue font), YuniQ (bold black sans), think42 Labs (green typography), FULL (bold inverted black box), MAHATHAAN (tall condensed serif/sans), St. JOSEPH'S (crest + blue typography), 7 Angle™ (red triangle).
- **Section B (Community partners):**
  - Section heading `"Community partners"` with right-aligned subhead `"Better together, across communities."`.
  - 5-column grid with dark icon containers and labels underneath: React India (atom logo), React Nexus (cyan atom), JS Lovers (blue heart), GDG Chennai (Google bracket icon), FOSS United Chennai (monochrome box), TechXConf (blue tech mark), Global Freelance Festival (circular emblem).

### Screenshot 02 — Social Media Footer ("FIND US ONLINE")
- **Heading:** `"FIND US ONLINE"` in uppercase letter-spaced font with cyan/sky blue accent.
- **2-Column Channel Grid:**
  - Column 1: Instagram, WhatsApp, X, Bluesky, Luma
  - Column 2: LinkedIn, Discord, GitHub, YouTube, react.dev
- **Card Ergonomics:** Outlined lucide icon on the left, clear label text, and hover elevation with accent border highlight.

### Screenshot 03 — "Make It Happen" Dual Action Cards
- **Eyebrow:** `"BE PART OF THE STORY"` in uppercase letter-spaced blue font.
- **Heading:** `"Make it happen."` with supporting copy `"There's more than one way to help our community grow."`.
- **Card 01 (Call for Speakers):**
  - Tag: `"CALL FOR SPEAKERS"` in pill container with microphone icon.
  - Headline: `"Have a story to share?"`.
  - Description: `"Bring your ideas, lessons, and experiences to the community."`.
  - CTA Button: `"Speak at a meetup ↗"` (routes to `/sponsor#speak`).
  - Visual: Speaker presenting to audience under warm stage light.
- **Card 02 (Call for Sponsors):**
  - Tag: `"CALL FOR SPONSORS"` in pill container with handshake icon.
  - Headline: `"Help good things grow."`.
  - Description: `"Support the people and meetups that bring Chennai's developers together."`.
  - CTA Button: `"Partner with us ↗"` (routes to `/sponsor`).
  - Visual: Engaged developer audience wearing purple event lanyards.

### Screenshot 04 — Interactive Photo Explorer & Statistics ("Our community.")
- **Heading:** `"Our community."` with sub-eyebrow `"THE PEOPLE BEHIND THE CODE"`.
- **Three-Region Layout:**
  - Left: Introductory text (`"Fresh perspectives and practical knowledge to take into whatever you build next."`) and `"PICK A PHOTO TO EXPLORE"` selection grid.
  - Center: Overlapping fanned / stacked photo cards with white/frosted specular borders, -6° and +6° tilt on background cards, and front card elevated with shadow.
  - Right: Slide counter (`05 / 06`) with bold slide title (`Learning together`).
- **Statistics Row:**
  - 3 large metric cards with blue bullet indicators:
    - `10k+` — Members
    - `12+` — Meetups & Hackathons
    - `2+` — Years

### Screenshot 05 — Past Speakers Directory (`/past-speakers`)
- **Heading:** `"Past speakers."` with subhead `"Meet the speakers who have shared their knowledge at Chennai meetups."`.
- **Directory Grid:** 4-column responsive grid featuring 36+ speaker profiles.
- **Profile Card Elements:**
  - Circular portrait headshot (~130px diameter) with subtle border ring.
  - Speaker name in bold sans-serif.
  - Professional title (e.g., Founding Engineer, Lead Architect, Engineering Manager).
  - Organization / company (Hasura, Cisco, Freshworks, Lentra, etc.).
  - Small social/professional profile link icon.

### Screenshot 06 — Core Team Directory (`/team`)
- **Eyebrow & Heading:** `"THE PEOPLE BEHIND AI GEEKS"` / `"Meet the team."` with subhead `"The people bringing our community together, one meetup at a time."`.
- **Card Layout:** 4-column rectangular portrait card grid with ~20px rounded corners and 3:4 aspect ratio.
- **Card Elements:**
  - High-resolution photographic portrait with clean indoor/stage backdrop.
  - Display name in bold font.
  - Role pill or badge: `"Core team"`, `"Core Team"`, or `"Emcee"`.
  - Social link icon in bottom-right corner.
- **Compliance Requirement:** All Core Team names in the enhanced version are replaced with stable fictional demonstration identities per Phase 10, while preserving the layout and roles.

### Screenshot 07 — Community Code of Conduct (`/code-of-conduct`)
- **Eyebrow & Heading:** `"AI GEEKS COMMUNITY"` / `"Code of conduct."` with tagline `"Let's make this a place where everyone feels welcome to learn, share, and belong."`.
- **Two-Column Editorial Structure:**
  - **Left Column (Policy text):**
    - Message from the organisers
    - The short version
    - The not so short version
    - Reporting violations (confidential organizer contact)
    - Special incidents (designated contact person cards)
    - Credit & attribution (Major League Hacking, Creative Commons, FOSS United)
  - **Right Column (Visual Collage):**
    - 3 rounded rectangular community event photographs depicting attendees, organizers, and volunteers at community gatherings.

---

## 3. Video Recording Analysis (159 Seconds)

| Timestamp | Screen State & Observable Interaction | Architectural Implementation |
|---|---|---|
| **00:00 – 00:06** | Top marquee banner animating horizontally. Sticky navbar remains persistent. Hero headline with primary CTA `"Explore events"` and secondary `"Join the community"`. | `Navbar.tsx` with CSS marquee + `HeroSection` with GSAP entrance. |
| **00:06 – 00:10** | Upcoming events schedule with Luma RSVP buttons. Empty state toggle demonstrating fallback flow. | `UpcomingEvents` with resilient Luma fallback state. |
| **00:10 – 00:24** | Scrolling down to "Our community." 01 / 06 Photo Explorer. User clicks thumbnail: cards animate with smooth horizontal slide and blur dissolve. 10k+/12+/2+ metrics row below. | `CommunityExplorer` with Framer Motion `UNIFIED_SLIDER_VARIANTS`. |
| **00:24 – 00:36** | "Make it happen." section with dual large cards (Call for speakers & Call for sponsors). Hovering causes subtle scale. | Dual feature cards with gradient overlays and direct CTA links. |
| **00:36 – 00:54** | Logo grid of 10 previous sponsors followed by 7 community partners. Clean responsive alignment. | `SponsorGrid` and `CommunityPartnerGrid` components. |
| **00:54 – 01:30** | "Good times, together." horizontal pinned moments strip. As the user scrolls vertically, the track scrolls horizontally, updating the `01 / 14` live counter. | GSAP `ScrollTrigger` pinned horizontal strip. |
| **01:30 – 01:50** | Navigation to `/events` and `/past-speakers`. Circular speaker portraits render in 4-column grid with topic filters. | `/events/page.tsx` and `/past-speakers/page.tsx`. |
| **01:50 – 02:06** | Navigation to `/team`. Rectangular portrait cards render with member names and role badges. | `/team/page.tsx` with stable fictional demonstration names. |
| **02:06 – 02:36** | Navigation to `/code-of-conduct`. Two-column policy text on the left and 3-photo collage on the right. | `/code-of-conduct/page.tsx`. |
| **02:36 – 02:38** | Scroll to 3-column footer: Brand Column, Explore links, and Find us online grid with 10 social handles. Click "BACK TO TOP ↑". | `Footer.tsx` with smooth scroll-to-top handler. |

---

## 4. Rebuild Component & Route Mapping

| Reference Section | Source File | Responsiveness | Key Interactions |
|---|---|---|---|
| Top Marquee | `src/components/layout/Navbar.tsx` | Full-width continuous scroll | CSS keyframe marquee |
| Sticky Navbar | `src/components/layout/Navbar.tsx` | Mobile drawer toggle `< 1024px` | Scroll blur, active route indicators |
| Community Hero | `src/app/page.tsx` | Stacks 1-col on `< 1024px` | GSAP stagger entrance, mascot card |
| Upcoming Events | `src/app/page.tsx` | 3-col desktop → 1-col mobile | Luma RSVP, empty state fallback toggle |
| Photo Explorer | `src/app/page.tsx` | 12-col grid (4/5/3 split) | 01/06 picker, fanned card depth |
| Metrics Row | `src/app/page.tsx` | 3-col desktop → 1-col mobile | Metric cards with cyan accents |
| Make It Happen | `src/app/page.tsx` | 2-col desktop → 1-col mobile | Hover zoom, CTA navigation |
| Sponsors & Partners | `src/app/page.tsx` | 5-col desktop → 2-col mobile | Hover translate, external link open |
| Moments Track | `src/app/page.tsx` | Pinned horizontal track | GSAP `ScrollTrigger` scrub, 01/14 counter |
| Media Sliders | `src/app/page.tsx` | 2-col desktop → 1-col mobile | Drag, step, preview modal playback |
| 3-Column Footer | `src/components/layout/Footer.tsx` | 12-col (5/3/4) → 1-col mobile | Smooth scroll top, 10 social channels |
| Events Directory | `src/app/events/page.tsx` | 3-col card grid | Upcoming / Past tabs, Luma link |
| Speakers Directory | `src/app/past-speakers/page.tsx` | 4-col circular portrait grid | Search, topic filter, speaker modal |
| Team Directory | `src/app/team/page.tsx` | 4-col rectangular card grid | Fictionalized identities, admin edit |
| Code of Conduct | `src/app/code-of-conduct/page.tsx` | 2-col desktop (8/4 split) | Reporting contact form, photo collage |
| Platforms Network | `src/app/platforms/page.tsx` | 3-col card grid | Category filter tabs, copy link |
| Join Community | `src/app/join/page.tsx` | 3-col card grid | 3-step checklist, regional hub filter |

---

## 5. Animation & Motion Physics Specification

```typescript
// Shared slider easing physics applied across Photo, Video, and Explorer sliders
const UNIFIED_SLIDER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const UNIFIED_SLIDER_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 128 : -128,
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -128 : 128,
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
  }),
};
```

---

## 6. Reference-to-Implementation Compliance Checklist

- [x] Top Marquee Banner: "VANAKKAM, DEVELOPERS & AI BUILDERS! MADE FOR THE COMMUNITY, BY THE COMMUNITY"
- [x] Sticky Navigation Bar with brand logo, primary links, and Join CTA pill
- [x] Hero Section with headline ("Chennai's own AI & React community"), description, and mascot
- [x] Upcoming Events boundary with Luma links and empty fallback state
- [x] "Our community." Photo Explorer (01/06) with fanned card stack
- [x] Verified Community Metrics: 10k+ Members, 12+ Meetups & Hackathons, 2+ Years
- [x] "Make it happen." Dual Cards: Call for Speakers and Call for Sponsors
- [x] 10 Previous Sponsors in 5-column grid (TALENTSHIP, ImageKit, WSO2, IBM, YuniQ, think42, FULL, Mahathaan, St. Joseph's, 7 Angle)
- [x] 7 Community Partners in 5-column grid (React India, React Nexus, JS Lovers, GDG Chennai, FOSS United, TechXConf, Global Freelance Festival)
- [x] Horizontal Moments Strip (01/14) with pinned GSAP ScrollTrigger
- [x] Unified Photo Slider & Video Slider with identical cubic-bezier motion physics
- [x] Past Speakers directory with circular portraits and topic filtering
- [x] Meet the Team directory with rectangular portrait cards and fictionalized names
- [x] Code of Conduct two-column policy layout with right photo collage
- [x] 3-Column Footer with Brand Identity, Explore, and Find us online (10 channels)
- [x] Untouched Baseline Preservation: `AI-GEEKS-ORIGINAL` remains pristine
