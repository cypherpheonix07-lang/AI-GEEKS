# AI GEEKS — Master Website Audit
## Document 15: Defect Register & Prioritized Audit Log

**Auditor:** Quality Assurance Lead & Release Manager  
**Severity Scale:** P0 (Critical/Blocker), P1 (High), P2 (Medium), P3 (Low/Cosmetic)  
**Status:** **ALL IDENTIFIED DEFECTS RESOLVED**

---

### Defect Tracking & Remediation Matrix

| Defect ID | Severity | Description | Affected Component | Root Cause | Status | Resolution Proof |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **DEF-01** | **P1** | Previous sponsors list had only 5 sponsors instead of all 10 in Screenshot 01. | `src/data/communityData.ts`, `src/app/page.tsx` | Missing 5 sponsor entities (*think42 Labs, FULL, Mahathaan, St. Joseph's, 7 Angle*). | **RESOLVED** | Added all 10 sponsors with real `.webp` logo assets. |
| **DEF-02** | **P1** | Community partners had only 5 partners instead of all 7 in Screenshot 01. | `src/data/communityData.ts`, `src/app/page.tsx` | Missing *TechXConf* and *Global Freelance Festival*. | **RESOLVED** | Added both partners with verified `.webp` assets and labels. |
| **DEF-03** | **P1** | Code of conduct was single column instead of 2-column layout in Screenshot 02. | `src/app/code-of-conduct/page.tsx` | Missing 4-photo right aside and Dhanush/Shanthi contact cards. | **RESOLVED** | Rebuilt into 2-column editorial grid with full charter & photo aside. |
| **DEF-04** | **P1** | Past speakers directory had only 4 speakers instead of all 40 in Screenshot 03. | `src/data/communityData.ts`, `src/app/past-speakers/page.tsx` | Incomplete initial seed array. | **RESOLVED** | Expanded `PAST_SPEAKERS` to all 40 verified speakers with circular avatar grid & search. |
| **DEF-05** | **P2** | Footer "Find us online" links fell back to generic icons instead of dedicated SVGs. | `src/components/layout/Footer.tsx` | Generic switch condition. | **RESOLVED** | Added 10 custom SVG icons matching Screenshot 04 (*Instagram, LinkedIn, WhatsApp, Discord, X, GitHub, Bluesky, YouTube, Luma, react.dev*). |
| **DEF-06** | **P2** | TypeScript build failure on `spk.topicCategory` in `CommandPalette.tsx`. | `src/components/layout/CommandPalette.tsx` | Optional property accessed without null-check after type expansion. | **RESOLVED** | Added fallback `(spk.topicCategory \|\| "SPEAKER").toUpperCase()`. `tsc --noEmit` returns 0 errors. |
| **DEF-07** | **P2** | Sponsor logo cards on homepage rendered text-only without logos. | `src/app/page.tsx` | Missing `<img src={sponsor.logoUrl} />` rendering tag. | **RESOLVED** | Upgraded to high-contrast frosted white cards with genuine logo graphics and titles. |
| **DEF-08** | **P3** | Mirror destinations (`ai-geeks-community-v2`, `AI-GEEKS-ENHANCED`) drifted from active `src/`. | Root scripts | Lack of automated sync script. | **RESOLVED** | Built `scripts/sync-mirrors.mjs` and verified full recursive synchronization across all 4 mirrors. |
