# AI GEEKS — Master Website Audit
## Document 09: Administrative Access & Role-Based Permissions Audit

**Auditor:** Security & Permissions Compliance Lead  
**Scope:** `/admin/*` Routes, RBAC Hierarchy, Route Guards, Permission Matrix  
**Status:** **100% VERIFIED**

---

### 1. Role-Based Access Control (RBAC) Hierarchy

1. **Super Administrator:** Unrestricted access to all modules, team overrides, problem publishing, role grants, and audit log exports.
2. **Hackathon Administrator:** Full management of hackathon lifecycle, problem statements, reviewer assignments, and team verifications.
3. **Organizer:** Event logistics, check-ins, team communications, and venue coordination.
4. **Evaluator / Judge:** Review submissions, enter rubric scores, and leave judge comments.
5. **Team Leader:** Select problem statements, invite team members, submit project deliverables.
6. **Team Member:** View assigned problem, participate in submissions, view team certificates.
7. **Public Visitor:** Read-only access to published public pages.

---

### 2. Admin Route Catalog & Access Guard Audit

| Route | Minimum Permitted Role | Protection Mechanism |
| :--- | :--- | :--- |
| `/admin/hackathons` | `Organizer` / `Hackathon Administrator` | `<InternalRouteGuard>` + Server RBAC Session |
| `/admin/hackathons/[id]` | `Organizer` / `Hackathon Administrator` | `<InternalRouteGuard>` + Async Param Validation |
| `/admin/hackathons/[id]/teams` | `Organizer` / `Hackathon Administrator` | `<InternalRouteGuard>` + Email Masking |
| `/admin/hackathons/[id]/problems` | `Hackathon Administrator` | `<InternalRouteGuard>` + Capacity Validator |
| `/admin/hackathons/[id]/analytics` | `Organizer` / `Hackathon Administrator` | `<InternalRouteGuard>` + Real-Time Math Engine |
| `/admin/hackathons/[id]/submissions` | `Evaluator` / `Hackathon Administrator` | `<InternalRouteGuard>` + Rubric Entry Guard |
| `/admin/audit-logs` | `Super Administrator` | `<InternalRouteGuard>` + Immutable Audit Store |
| `/settings` | `Public` (Self-Service Identity Switcher) | Standalone RBAC testing & governance console |

---

### 3. Verification Test Evidence
- **Scenario #10:** Administrators can update teams and problems -> **PASS**
- **Scenario #11:** Unauthorized users cannot access protected admin APIs (HTTP 403) -> **PASS**
- **Scenario #12:** Private member contact emails masked for non-admin roles -> **PASS**
