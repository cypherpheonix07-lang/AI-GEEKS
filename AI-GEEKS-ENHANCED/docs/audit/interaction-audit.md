# AI GEEKS — Master Website Audit
## Document 05: Interaction & Motion Physics Audit

**Auditor:** Creative Motion & Animation Engineer  
**Audit Scope:** 3D Photo Stack, Unified Media Sliders, Pinned GSAP ScrollTrack, Mobile Drawer, Modals & ⌘K  
**Status:** **100% VERIFIED**

---

### 1. Interactive 3D Photo Stack ("Our community." 01 / 06)
- **Physics Engine:** Framer Motion + perspective CSS transforms (`perspective: 1200px`).
- **Card Distribution:** 6 cards with fanned angles `[-12°, -6°, -1.5°, 3°, 8°, 14°]` and horizontal offsets.
- **Selection Interaction:** Clicking any card smoothly interpolates it to the active center foreground position (`scale: 1.05`, `z-index: 40`, `rotate: 0deg`, border `#C4EEFF`).
- **Dynamic Synchronization:** Clicking updates the right-hand counter (`01 / 06` to `06 / 06`) and editorial caption in real time.
- **Keyboard / Accessibility:** Tab-focusable with `Enter` and `Space` activation triggers.

---

### 2. Unified Media Sliders (Photos & Videos)
- **Physics Curve:** Shared cubic-bezier `[0.22, 1, 0.36, 1]` with smooth drag friction.
- **Directional Velocity:** Dragging or clicking next/prev applies spring velocity in the direction of navigation.
- **Synchronized Controls:**
  - Prev/Next chevron buttons with disabled bounds.
  - Interactive filmstrip scrubber showing all slides.
  - Slide counter indicator (`01 / 06`).
- **Preview Modals:** Clicking any slide opens a high-definition Lightbox (for Photos) or 16:9 Cinema Player (for Videos) with backdrop blur and escape key dismissal.

---

### 3. Pinned GSAP Moments Strip (01 / 14)
- **Engine:** GSAP 3 + `ScrollTrigger` + `SmoothScrollProvider` (Lenis).
- **Pinning:** Section locks into view on desktop and translates the 14 moment frames horizontally as the user scrolls vertically.
- **Hydration Resilience:** Triggers `ScrollTrigger.refresh()` after route changes and page mount to eliminate layout jitter.

---

### 4. Global Command Palette (⌘K / Ctrl+K)
- **Trigger:** Global keydown listener (`Cmd+K` / `Ctrl+K`) or search button.
- **Live Search:** Instant fuzzy indexing across 40 speakers, 17 platforms, hackathons, forum threads, and pages.
- **Keyboard Navigation:** Arrow keys up/down, Enter to navigate, Escape to dismiss.
