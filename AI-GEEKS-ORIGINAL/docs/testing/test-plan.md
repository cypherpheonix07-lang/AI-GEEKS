# Comprehensive Quality Assurance & Validation Test Plan
**Project:** AI Geeks Tech Community  
**Document ID:** `DOCS-TEST-001`  
**Reference Date:** November 17, 2026  
**Status:** Approved Master Test Plan  

---

## 1. Test Strategy & Scope

The testing framework for **AI Geeks** spans three rigorous tiers:
1. **Automated Unit & Business Logic Tests (Vitest):**
   - Validates state transitions, permission enforcement across all 10 roles, cryptographic token hashing, capacity limits, waitlist logic, XSS sanitization, and reputation calculations.
2. **Automated End-to-End Browser Tests (Chrome DevTools / Playwright):**
   - Validates real rendering, user onboarding, Q&A upvoting, canvas badge generation, command palette spotlight, and responsive viewports.
3. **Manual Cross-Device Verification:**
   - Desktop (1920x1080, 1440x900), Tablet (768x1024), Mobile (375x667, 390x844).

---

## 2. 16 Mandatory Critical Test Scenarios

| Scenario ID | Test Name | Target Behavior | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-01** | User Registration & Verification | New user signs up and submits 6-digit email token | User status transitions from `pending` to `active` |
| **TC-02** | Login & Secure Session | User logs in with email + password | Valid session established; role assigned |
| **TC-03** | Password Reset | User requests reset email token | One-time token validated; password updated |
| **TC-04** | Profile Update | User edits bio, skills, and portfolio link | Updated profile persisted in database/storage |
| **TC-05** | Role Permission Enforcement | Guest attempts to create event or access `/admin` | Denied with 403 Forbidden; audit log written |
| **TC-06** | Event Creation | Event Organizer creates new chapter workshop | Event published and appears on calendar |
| **TC-07** | Event Registration (RSVP) | Member clicks "Claim Free Pass" | Registration confirmed; signed QR token returned |
| **TC-08** | Capacity & Waitlist Logic | Registration attempted when `registered >= capacity` | User placed in Waitlist; position assigned |
| **TC-09** | Cryptographic Attendance Validation | Organizer scans signed QR pass token | Token signature validated; attendance logged |
| **TC-10** | Project Submission & Stars | Member submits AI project; peer stars project | Project listed with tech stack; star count increments |
| **TC-11** | Content Moderation | Moderator reviews flagged discussion | Thread hidden/locked; action recorded in audit log |
| **TC-12** | Member Discussion & Accepted Answer | Question author marks green checkmark on reply | Thread marked [SOLVED]; solver awarded +25 XP |
| **TC-13** | Organizer Permissions Isolation | Chapter A Organizer attempts to edit Chapter B Event | Operation blocked; unauthorized error returned |
| **TC-14** | Admin Content Publishing | Admin updates homepage announcement banner | Live banner updates immediately across views |
| **TC-15** | Notification Delivery | User receives RSVP confirmation and reply alert | Bell badge increments; unread list displays alert |
| **TC-16** | Account Privacy & Data Erasure | User requests GDPR/DPDP account deletion | Identifiers removed; public profile marked deleted |
