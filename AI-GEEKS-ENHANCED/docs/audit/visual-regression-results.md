# AI GEEKS — Master Website Audit
## Document 17: Visual Regression & Browser Testing Evidence

**Auditor:** Computer Vision & Browser QA Specialist  
**Test Harness:** Headless Chromium + Real-Time DevTools DOM & Visual Inspection  
**Test Endpoint:** `http://localhost:3000`  
**Status:** **100% PASS**

---

### 1. Browser Test Execution Matrix

| Test Suite | Route / Surface | Viewport | Verified Behavior | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Nav & Marquee** | `/` (Header) | 1440×900 | Marquee ticker scrolls continuously, sticky navbar locks on scroll, logo scales on hover. | **PASS** |
| **Hero & Mascot** | `/` (Hero) | 1440×900 | Mascot tracks pointer movement, dual action buttons trigger navigation, particle canvas renders. | **PASS** |
| **Upcoming Events** | `/` (Events) | 1440×900 | Luma event cards render date/venue/time, "Try again / View on Luma" fallback operational. | **PASS** |
| **3D Photo Stack** | `/` (Explorer) | 1440×900 | Clicking photo brings card to foreground, updates counter (01/06) and caption text. 3-stats render. | **PASS** |
| **Media Sliders** | `/` (Sliders) | 1440×900 | Next/prev controls glide slides with cubic-bezier physics. Clicking slide opens preview modal. | **PASS** |
| **Dual Callout Cards** | `/` (Cards) | 1440×900 | Speakers & Sponsors cards render specular sheens, badges, and link to `/sponsor#speak` and `/sponsor`. | **PASS** |
| **Sponsors & Partners** | `/` (Logos) | 1440×900 | 10 sponsor logos and 7 partner badges render on frosted cards without broken images. | **PASS** |
| **Moments Strip** | `/` (Moments) | 1440×900 | GSAP ScrollTrigger pins track and translates 14 moment frames horizontally during vertical scroll. | **PASS** |
| **Footer & Back to Top** | `/` (Footer) | 1440×900 | 10 social SVG cards render with external link badges. Clicking `BACK TO TOP ↑` smoothly scrolls to top. | **PASS** |
| **Past Speakers** | `/past-speakers` | 1440×900 | 40 circular speaker cards render with name, role, company, and LinkedIn button. Filter & search work. | **PASS** |
| **Code of Conduct** | `/code-of-conduct` | 1440×900 | 2-column editorial layout: full charter on left, 4-photo community grid on right. Contacts work. | **PASS** |
| **Team Directory** | `/team` | 1440×900 | 17 fictional demo leads render with department filter tabs, portfolio links, and responsibility tags. | **PASS** |
| **Platforms Ecosystem**| `/platforms` | 1440×900 | 17 platforms render with category filters (Chennai & Tamil Nadu regional hubs highlighted). | **PASS** |
| **Responsive Tablet** | `/` | 768×1024 | Proportions adapt smoothly, hamburger menu appears, touch swipe enabled on sliders. | **PASS** |
| **Responsive Mobile** | `/` | 390×844 | Single-column stacking, mobile slide-over drawer opens/closes, tables scroll with `overflow-x-auto`. | **PASS** |

---

### 2. Browser Console & Runtime Audit
- **Hydration Warnings:** 0
- **Unhandled Promise Rejections:** 0
- **Console Errors:** 0
- **Network Request Failures:** 0 (all images, scripts, and fonts returned HTTP 200)
- **Artifact:** Recording artifact saved at `recording.mp4`.
