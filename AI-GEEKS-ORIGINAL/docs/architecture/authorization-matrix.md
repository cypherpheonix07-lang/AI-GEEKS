# Role-Based Access Control (RBAC) & Authorization Matrix
**Project:** AI Geeks Tech Community  
**Document ID:** `DOCS-ARCH-003`  
**Reference Date:** November 17, 2026  
**Status:** Approved Security Matrix  

---

## 1. Role Definitions

1. **`guest` (Public Anonymous Visitor):** Read-only access to public directory, events, blog, and certificate verification.
2. **`member` (Verified Community Member):** Can RSVP, submit projects, write posts, ask/answer questions, enroll in courses.
3. **`volunteer` (Community Volunteer):** Member permissions + access to event logistics and assigned volunteer tasks.
4. **`mentor` (Technical Mentor):** Member permissions + public mentor profile and 1:1 mentorship request intake.
5. **`content_editor` (Editorial Lead):** Member permissions + review and curate community blog posts and featured projects.
6. **`event_organizer` (Chapter Event Organizer):** Member permissions + create/edit assigned events, scan attendee QR check-ins, issue certificates.
7. **`chapter_lead` (Regional Chapter Director):** Organizer permissions + manage chapter profile, member roster, and chapter reporting.
8. **`moderator` (Community Safety & Compliance):** Member permissions + moderate discussions, lock threads, review reported content.
9. **`community_admin` (Operations Administrator):** Broad administrative permissions: approve chapters, review volunteer applications, view analytics.
10. **`super_admin` (System Administrator):** Root privileges: assign administrative roles, modify system configuration, view immutable audit logs.

---

## 2. Granular Permissions Matrix

| Resource & Action | Guest | Member | Volunteer | Mentor | Content Editor | Event Organizer | Chapter Lead | Moderator | Community Admin | Super Admin |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **View Public Pages** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Manage Own Profile** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **RSVP / Claim Event Pass** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Submit Showcase Project** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Publish Technical Blog** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Post Q&A Question / Answer** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Enroll in Learning Tracks** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Apply for Job / Mentorship** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Manage Mentor Profile** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Curate Featured Content** | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Create & Edit Chapter Events**| ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Scan Attendee QR Check-in** | ❌ | ❌ | 🟡 | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Issue Verified Certificates** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Manage Chapter Roster** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ |
| **Moderate Flagged Content** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Approve New Chapters** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Review Volunteer Apps** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **View Platform Telemetry** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Assign User Roles** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **View Security Audit Logs** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
