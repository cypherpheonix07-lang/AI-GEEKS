# Dual-Application Integration Architecture Report

## 1. Top-Level Design Principle: Zero Destructive Changes
The primary application (`ai-geeks-community-platform`) running at `http://localhost:3000/` remains completely unmodified. All original files, configurations, styling tokens, and pages are protected under the Phase 0 Immutable Protection Contract.

To integrate the full DevFest Chennai 2026 codebase without collision or code degradation, we deploy a **multi-process reverse proxy routing gateway** (`integration-router/gateway.mjs`) listening on port 3000 that partitions traffic cleanly between the two isolated environments.

---

## 2. Gateway Architecture & Port Allocation

```text
                                  CLIENT BROWSER
                                        │
                                        ▼
                         http://localhost:3000 (Gateway)
                                        │
                         ┌──────────────┴──────────────┐
                         ▼                             ▼
       Requests NOT starting with /devfest       Requests starting with /devfest
                         │                             │
                         ▼                             ▼
              PRIMARY APPLICATION               DEVFEST 2026 APPLICATION
             http://127.0.0.1:3001             http://127.0.0.1:3002/devfest
                         │                             │
              • Homepage (/)                    • DevFest Home (/devfest)
              • Events (/events)                • Agenda (/devfest/agenda)
              • Team (/team)                    • Speakers (/devfest/speakers)
              • Gallery (/gallery)              • Tickets (/devfest/tickets)
              • Sponsors (/sponsor)             • Memories (/devfest/memories)
              • Join Hub (/join)                • Games (/devfest/games)
              • Assets (/_next/...)             • DevFest Assets (/devfest/_next/...)
```

---

## 3. Isolation Measures
1. **Directory Isolation**:
   - Primary codebase: `src/`, `public/`, `package.json`
   - Cloned DevFest codebase: `integrations/devfest26/`
   - Routing Gateway: `integration-router/gateway.mjs`
   - Reports & Audits: `integration-reports/`
2. **Dependency Tree Isolation**:
   - Primary app maintains its own `node_modules` and lockfile.
   - DevFest maintains its own `integrations/devfest26/node_modules`.
3. **Asset & Path Namespacing**:
   - DevFest operates with `basePath: "/devfest"`, ensuring zero conflict between `/_next/...` bundles and `/devfest/_next/...` bundles.
4. **WebSocket & HMR Transparent Forwarding**:
   - The gateway supports HTTP `upgrade` handling so Next.js Fast Refresh and WebSocket streams forward without disconnection.
