# Design System & Interaction Engineering Specification
**Project:** AI Geeks Tech Community  
**Document ID:** `DOCS-DES-002`  
**Reference Date:** November 17, 2026  
**Status:** Approved Component & Visual Standard  

---

## 1. Visual Direction & Aesthetic Philosophy

The **AI Geeks Design System** blends high-contrast dark-mode ergonomics with modern geometric accents inspired by developer terminal tools and Google Developer Group aesthetics:
- **Obsidian Dark Canvas:** Minimizes eye fatigue for developer night coding sessions.
- **Micro-Glassmorphism:** Subtle `backdrop-blur-md` surfaces with `1px` crisp borders (`#27272A`), avoiding excessive blurry layers that compromise frame rates.
- **Accents with Purpose:** Color is never purely decorative; each accent designates a specific domain:
  - 🟣 **Electric Violet (`#7C3AED` / `#8B5CF6`):** AI Autonomous Agents, Community Brand, Core CTAs
  - 🔵 **Electric Blue (`#4285F4` / `#3B82F6`):** Cloud Native, Infrastructure, DevFest Summit
  - 🟢 **Emerald Green (`#34A853` / `#10B981`):** Machine Learning, Verification, Accepted Answers, Success States
  - 🟡 **Amber Gold (`#FBBC05` / `#F59E0B`):** Web/UI, Developer Experience, XP Bounties, Warnings
  - 🔴 **Coral Red (`#EA4335` / `#EF4444`):** Systems, Rust, Cybersecurity, Errors, Urgent Countdowns
  - 🔷 **Cyan Neon (`#06B6D4` / `#22D3EE`):** Live Telemetry, Active Sprints, Interactive Badge Highlights

---

## 2. Semantic Color Token Architecture

| Semantic Token | Hex Value | CSS Variable / Tailwind | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#080B12` | `bg-[#080B12]` | Deepest background for viewport canvas |
| `--bg-surface` | `#111118` | `bg-[#111118]` | Primary cards, panels, modals, dropdowns |
| `--bg-elevated` | `#181824` | `bg-[#181824]` | Hover states, active tabs, nested table headers |
| `--border-subtle` | `#27272A` | `border-[#27272A]` | Structural dividers, card outlines |
| `--border-accent` | `#3F3F46` | `border-[#3F3F46]` | Hover borders, focused input outlines |
| `--text-primary` | `#F8FAFC` | `text-slate-50` / `text-white` | Page titles, headings, primary card titles |
| `--text-secondary` | `#94A3B8` | `text-slate-400` | Subtitles, body descriptions, metadata |
| `--text-muted` | `#64748B` | `text-slate-500` | Monospace tags, timestamps, secondary labels |
| `--accent-ai` | `#8B5CF6` | `text-violet-400`, `bg-violet-500` | AI models, multi-agent tracks, primary buttons |
| `--accent-cloud` | `#3B82F6` | `text-blue-400`, `bg-blue-500` | Cloud infra, Kubernetes, networking |
| `--accent-web` | `#F59E0B` | `text-amber-400`, `bg-amber-500` | React, WebGPU, UI architecture |
| `--accent-systems` | `#EF4444` | `text-red-400`, `bg-red-500` | Rust, low-level systems, security |
| `--status-success` | `#22C55E` | `text-emerald-400`, `bg-emerald-500` | Solved Q&A, verified certificates, confirmed RSVP |

---

## 3. Typography Hierarchy

| Role | Font Family | Weight | Size (Desktop / Mobile) | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `Space Grotesk`, sans-serif | Bold (700) | `48px` / `32px` | `1.15` | `-0.02em` |
| **Section H2** | `Space Grotesk`, sans-serif | Bold (700) | `30px` / `24px` | `1.25` | `-0.01em` |
| **Card H3** | `Inter`, sans-serif | Semi-Bold (600) | `18px` / `16px` | `1.35` | `0` |
| **Subheading H4**| `Inter`, sans-serif | Medium (500) | `15px` / `14px` | `1.4` | `0` |
| **Body Standard**| `Inter`, sans-serif | Regular (400) | `14px` / `14px` | `1.6` | `0` |
| **Body Compact** | `Inter`, sans-serif | Regular (400) | `13px` / `12px` | `1.5` | `0` |
| **Code & Meta** | `JetBrains Mono`, monospace | Medium (500) | `12px` / `11px` | `1.4` | `0.05em` |

---

## 4. Reusable Core Component Specifications

1. **Button (`Button.tsx`):**
   - *Variants:* Primary (Violet gradient), Secondary (Glass with `#27272A` border), Ghost (Hover fill), Danger (Red muted), Success (Emerald).
   - *States:* Default, Hover, Active, Disabled, Loading (with spinning circle indicator).
   - *Accessibility:* Standard `focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none`.

2. **Badge & Pill (`Badge.tsx`):**
   - High-contrast pill containers with 1px border and optional leading status indicator dot (e.g. `p-1 rounded-full bg-emerald-400 animate-pulse`).

3. **Card (`Card.tsx`):**
   - Default surface `#111118`, border `#27272A`, rounded-2xl or rounded-3xl.
   - Smooth transform on hover: `hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300`.

4. **Command Palette (`CommandPaletteModal.tsx`):**
   - Fullscreen glass overlay with `backdrop-blur-md`.
   - Keyboard listener for `⌘K` / `Ctrl+K`.
   - Arrow-key navigation, Enter selection, and Escape to dismiss.

5. **2x Retina Canvas Badge Studio (`DevFestBadgeStudio.tsx`):**
   - Native HTML5 `<canvas>` element rendered at `devicePixelRatio * 2` for razor-sharp physical pass printing.
   - Interactive customization: Attendee Name, Role, Accent Color, and immediate PNG blob export.

---

## 5. Motion, Sound & Tactile Engineering

- **Web Audio API Feedback Synthesizer (`communityUtils.ts`):**
  - Generates harmonic sine/triangle wave pulses for tactile feedback:
    - *Success (Upvote / RSVP):* Dual-tone ascending arpeggio (523Hz → 659Hz).
    - *Warning:* Soft descending pulse (440Hz → 349Hz).
    - *Celebration:* Multi-harmonic burst accompanied by `canvas-confetti`.
- **Motion Reduction (`prefers-reduced-motion`):**
  - All CSS transitions and pulse animations are automatically disabled or switched to instant opacity shifts when `prefers-reduced-motion: reduce` is detected in media queries.
