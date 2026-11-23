# AI GEEKS Design System: Dark & Light Sky Metallic Glass Blue

**Project:** AI GEEKS Community Platform  
**Design Tokens Architecture:** Semantic CSS Variables & Tailwind Utility Tokens  
**Palette:** Dark & Light Sky Metallic Glass Blue  
**Fonts:** Plus Jakarta Sans (Headings/Body) & JetBrains Mono (Technical/Eyebrow)

---

## 1. Palette Tokens & Color Architecture

The platform uses a unified 10-shade **Dark & Light Sky Metallic Glass Blue** token system paired with obsidian depth and specular frosted cyan highlights:

| Token Name | Hex Code | Semantic Role | Tailwind Equivalent |
|---|---|---|---|
| **Root Void Obsidian** | `#020813` | Root page canvas, dark backdrop | `bg-[#020813]` |
| **Deep Abyssal Blue** | `#051020` | Section backgrounds, card base | `bg-[#051020]` |
| **Midnight Navy Surface** | `#091B32` | Glass card surfaces, navigation container | `bg-[#091B32]` |
| **Deep Steel Navy** | `#0F2744` | Secondary button base, media containers | `bg-[#0F2744]` |
| **Cobalt Foundation** | `#163B63` | Ambient lighting, border rings, accents | `bg-[#163B63]` |
| **Royal Azure Accent** | `#2B6CB0` | Primary interactive highlights, active tabs | `bg-[#2B6CB0]` |
| **Sky Blue Highlight** | `#4DA8DA` | Glow gradients, secondary link hover | `text-[#4DA8DA]` |
| **Electric Cyan Glow** | `#80D8FF` | Eyebrow badges, icons, focus outlines | `text-[#80D8FF]` |
| **Specular Frost Ice** | `#C4EEFF` | Top-edge specular highlights, active text | `text-[#C4EEFF]` |
| **Carbon Obsidian Glass** | `#16202C` | Code snippets, header label chips | `bg-[#16202C]` |

---

## 2. Typography System

- **Display & Headings:** `Plus Jakarta Sans` (`--font-jakarta-sans`)
  - Weight 800 (Extrabold) for Hero headlines (`text-4xl sm:text-6xl lg:text-7xl`)
  - Weight 700 (Bold) for Section titles (`text-3xl md:text-5xl`)
  - Tight letter-spacing (`tracking-tight`) with optical leading (`leading-[1.06]`)
- **Eyebrows & Technical Readouts:** `JetBrains Mono` (`--font-jetbrains-mono`)
  - Weight 600–700 (Semibold / Bold)
  - Uppercase with wide letter spacing (`uppercase tracking-widest text-xs`)
- **Body & Editorial Copy:** `Plus Jakarta Sans`
  - Weight 400–500 (Normal / Medium)
  - Slate text scales: `text-slate-100` (primary), `text-slate-300` (secondary), `text-slate-400` (subtle)

---

## 3. Glassmorphic Surface Primitives

```css
/* Glass Panel with Specular Frosting */
.glass-panel {
  background: rgba(9, 27, 50, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(128, 216, 255, 0.22);
  box-shadow: 0 8px 32px 0 rgba(2, 8, 19, 0.37),
              inset 0 1px 0 0 rgba(196, 238, 255, 0.22);
}

/* Primary Glass Button */
.ag-btn-primary {
  background: linear-gradient(135deg, #C4EEFF 0%, #80D8FF 50%, #4DA8DA 100%);
  color: #020813;
  font-weight: 700;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(128, 216, 255, 0.35);
  transition: all 0.2s ease;
}
.ag-btn-primary:hover {
  transform: translateY(-1.5px);
  box-shadow: 0 0 28px rgba(196, 238, 255, 0.55);
}

/* Secondary Glass Button */
.ag-btn-secondary {
  background: rgba(15, 39, 68, 0.7);
  border: 1px solid rgba(128, 216, 255, 0.3);
  color: #C4EEFF;
  border-radius: 12px;
  backdrop-filter: blur(12px);
  transition: all 0.2s ease;
}
.ag-btn-secondary:hover {
  background: rgba(22, 59, 99, 0.9);
  border-color: #C4EEFF;
  color: #FFFFFF;
}

/* Cyan Eyebrow Badge */
.ag-badge-cyan {
  background: rgba(22, 59, 99, 0.65);
  border: 1px solid rgba(128, 216, 255, 0.4);
  color: #C4EEFF;
  font-family: var(--font-jetbrains-mono);
  box-shadow: inset 0 1px 0 0 rgba(196, 238, 255, 0.2);
}

/* Gradient Text */
.ag-text-gradient {
  background: linear-gradient(135deg, #FFFFFF 0%, #C4EEFF 45%, #80D8FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 4. Layout & Spacing Rules

- **Maximum Container Width:** `max-w-7xl` (`1280px`), centered horizontally (`mx-auto`).
- **Horizontal Padding:** `px-4 sm:px-6 md:px-8`.
- **Section Vertical Rhythm:** `py-16 md:py-24`.
- **Card Corner Radii:**
  - Standard cards: `rounded-2xl` (`16px`)
  - Hero & major feature panels: `rounded-3xl` (`24px`)
  - Action pills: `rounded-full` (`9999px`)
- **Specular Top Edge:** Every major card and section header incorporates an absolute positioned top highlight:
  `<div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4EEFF]/80 to-transparent" />`

---

## 5. Motion Tokens & Physics

- **Spring Cubic-Bezier Curve:** `[0.22, 1, 0.36, 1]`
- **Slider Duration:** `0.36s`
- **Horizontal Slide Delta:** `±128px` with scale `0.96` and blur dissolve `8px`
- **GSAP Scrub:** Continuous pinned horizontal strip with smooth velocity-matched scrubbing
