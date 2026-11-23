# AI GEEKS — Master Website Audit
## Document 02: Reference Website (Chennai React) Architecture & Visual Analysis

**Reference Target:** https://www.chennaireact.in/  
**User References:** Screenshots 01–07 & 159s Screen Recording  
**Auditor:** Computer Vision & Creative Frontend Specialist  
**Design System Translation:** Dark & Light Sky Metallic Glass Blue Palette (`#020813`, `#051020`, `#091B32`, `#0F2744`, `#163B63`, `#2B6CB0`, `#4DA8DA`, `#80D8FF`, `#C4EEFF`, `#16202C`)

---

### 1. Architectural Blueprint of Reference (Chennai React)

The reference platform (`chennaireact.in`) is an event-driven community hub built with a distinctive visual cadence:

1. **Continuous Marquee Ticker:**
   - Text marquee banner announcing community ethos: `✳ VANAKKAM, DEVELOPERS! ✳ MADE FOR THE COMMUNITY, BY THE COMMUNITY ✳`.
   - Translated to AI GEEKS: `✳ WELCOME TO AI GEEKS ✳ CHENNAI'S PREMIER AI & SOFTWARE BUILDER COMMUNITY ✳`.

2. **Sticky Glassmorphic Navigation Bar:**
   - Brand logo on left with subtle hover scale.
   - Centered navigation links (`About`, `Events`, `Past speakers`, `Gallery`, `Platforms`, `Forum & Q&A`, `Team`, `Sponsors`, `Code of Conduct`).
   - Primary CTA on right (`Join the community`).
   - Responsive hamburger sheet on mobile viewports (< 768px).

3. **Hero Stage & Boundary:**
   - Bold community typography: headline with gradient accent (`ag-text-gradient`).
   - Dual actions: `Join the community ↗` (primary cyan glow) and `Explore events` (secondary metallic pill).
   - Animated SVG illustrations and interactive AI Mascot (`DevFestBot3DMascot`).

4. **Upcoming Events Boundary:**
   - Real-time event cards with calendar, time, venue, and Luma RSVP button.
   - Resilient error boundary with "Try again / View on Luma" fallback flow.

5. **"Our community." (01 / 06 Photo Explorer):**
   - Three-column layout:
     - Left: Category subtitle `THE PEOPLE BEHIND THE CODE`, description, and interactive prompt `PICK A PHOTO TO EXPLORE`.
     - Center: 3D-fanned photo stack (overlapping cards with perspective rotation `[-12deg, -6deg, 0deg, 6deg, 12deg]`, active card brought to foreground with scale 1.05 and metallic border).
     - Right: Numeric counter and active caption (e.g., `05 / 06 Learning together`).
   - Headline Metrics below: `10k+ Members`, `12+ Meetups`, `2+ Years`.

6. **Unified Media Sliders (Photos & Videos):**
   - Shared cubic-bezier physics `[0.22, 1, 0.36, 1]`.
   - Synchronized navigation buttons (prev/next) + filmstrip scrubbers.
   - Fullscreen modal Lightbox & Video Player.

7. **"Make it happen." Dual Callout Cards:**
   - Wide photographic cards with gradient overlays and specular top sheen:
     - Card 1: `CALL FOR SPEAKERS` — *"Have a story to share? Bring your ideas, lessons, and experiences to the community."* -> `[Speak at a meetup ↗]`.
     - Card 2: `CALL FOR SPONSORS` — *"Help good things grow. Support the people and meetups that bring developers together."* -> `[Partner with us ↗]`.

8. **Previous Sponsors & Community Partners Grids (Screenshot 01):**
   - Previous sponsors: 10 logos (*Talentship, imagekit.io, WSO2, IBM, Yuniq, think42 Labs, FULL, Mahathaan, St. Joseph's, 7 Angle*).
   - Community partners: 7 logos (*React India, React Nexus, JS Lovers, GDG Chennai, FOSS United Chennai, TechXConf, Global Freelance Festival*).

9. **Pinned Horizontal Moments Strip (01 / 14):**
   - GSAP `ScrollTrigger` pinned track scrolling horizontally through 14 high-density community moment frames.

10. **3-Column Community Footer (Screenshot 04):**
    - Col 1: Brand identity, mission, and secondary join/speak actions.
    - Col 2: Explore links (`About`, `Events`, `Past speakers`, `Team`, `Code of Conduct`, `Settings`).
    - Col 3: `Find us online` — 10 ecosystem social links (*Instagram, LinkedIn, WhatsApp, Discord, X, GitHub, Bluesky, YouTube, Luma, react.dev*) with dedicated SVGs.
    - Bottom bar: Copyright, `MADE WITH ❤️ IN CHENNAI`, and smooth `BACK TO TOP ↑` button.
