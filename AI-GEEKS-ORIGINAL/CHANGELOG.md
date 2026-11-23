# Changelog: AI Geeks Technology Community Platform
All notable changes to this project are documented in this file in adherence to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/).

## [2.0.0] - 2026-11-17
### Added
- **Global Community Benchmark Research:** Completed empirical analysis across 10 global reference communities (`GDG`, `Hugging Face`, `freeCodeCamp`, `DEV.to`, `AI Tinkerers`, `Kaggle`, `DeepLearning.AI`, `Hack Club`, `DataTalks.Club`, `GitHub Community`) with verified historical timelines (`DOCS-RES-001`, `DOCS-RES-002`, `DOCS-RES-003`).
- **Relational Data Architecture:** Defined 33 relational entity schemas covering Users, Profiles, Chapters, Events, Attendance, Certificates, Projects, Discussions, Courses, Hackathons, Opportunities, and Audit Logs (`DOCS-ARCH-002`).
- **Granular RBAC Authorization Engine:** Enforced 10 discrete user roles (`guest`, `member`, `volunteer`, `mentor`, `content_editor`, `event_organizer`, `chapter_lead`, `moderator`, `community_admin`, `super_admin`) with server-side authorization checks (`DOCS-ARCH-003`).
- **Flagship DevFest Summit & 2x Retina Badge Studio:** High-DPI HTML5 Canvas generator rendering specular neon borders, lanyard punchouts, customizable attendee roles, live theme selector, and PNG export.
- **Cryptographic QR Event Check-in System:** Generated HMAC-SHA256 signed ticket tokens with 15-minute expiration windows for fraud-proof attendance validation.
- **Permanent Digital Certificate Authenticator:** Database-backed public certificate lookup (`/verify/[certId]`) with cryptographic hash verification.
- **Stack Overflow-style Q&A Forum:** Threaded technical discussions, real-time upvoting/downvoting, accepted answer green checkmarks (+25 XP), and markdown syntax highlighting.
- **Open-Source Project Showcase:** Community AI project catalog with GitHub repository sync, live demo embeds, and star counters.
- **Learning Academy & Research Hub:** Structured course tracks with module checklists, progress tracking, and academic paper summaries with BibTeX citations.
- **Universal Command Palette (`⌘K` / `Ctrl+K`):** Spotlight modal across articles, questions, members, and quick navigation routes.
- **Tactile Audio Synthesizer:** Custom Web Audio API synthesizer producing harmonic sine/triangle wave feedback on user actions.
- **Comprehensive Documentation Suite:** 19 dedicated architectural, research, design, operational, and testing specification documents in `docs/`.
- **Automated Vitest Test Suite:** 19 unit & integration tests covering RBAC, event capacity, waitlists, QR verification, and certificate lookups (100% pass rate).

### Changed
- Rebuilt single-page application into an enterprise-grade, dark-mode-first glassmorphic architecture with Tailwind CSS semantic tokens.
- Upgraded build pipeline to Vite 6 and TypeScript 5 with zero compilation warnings.
