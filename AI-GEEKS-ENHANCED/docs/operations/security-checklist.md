# Security, Privacy & Data Protection Compliance Checklist
**Project:** AI Geeks Tech Community  
**Document ID:** `DOCS-OPS-003`  
**Reference Date:** November 17, 2026  
**Status:** Mandatory Production Security Standard  

---

## 1. Application Security Controls (OWASP Top 10 Alignment)

- [x] **A01: Broken Access Control:**
  - Strict server-side role enforcement on every privileged operation (`/admin/*`, `/organizer/*`).
  - IDs are checked against `actor_user_id` to prevent Insecure Direct Object References (IDOR).
  - Explicit authorization matrix documented in `DOCS-ARCH-003`.
- [x] **A02: Cryptographic Failures:**
  - Passwords hashed with bcrypt / Argon2 with minimum work factors.
  - Event check-in tokens signed with HMAC-SHA256 and expiration timestamps (15-minute validity window).
  - Digital certificates signed with SHA-256 cryptographic hashes verifiable on `/verify/[certId]`.
  - All external transport enforced over TLS 1.3 with HSTS (`max-age=31536000; includeSubDomains`).
- [x] **A03: Injection:**
  - Relational queries parameterized via prepared statements / ORM; zero raw string SQL interpolation.
  - Markdown renderer sanitizes HTML tags, attributes, and strips `javascript:` protocols.
  - Input length and format validated on all form submissions.
- [x] **A04: Insecure Design:**
  - Rate limiting applied to authentication endpoints (max 5 failed attempts per 15 minutes per IP).
  - Resumable onboarding requires explicit Code of Conduct acknowledgment before write permissions.
- [x] **A05: Security Misconfiguration:**
  - Strict Content Security Policy (CSP) headers restricting script execution to approved origins.
  - `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
- [x] **A06: Vulnerable and Outdated Components:**
  - Continuous `npm audit` scanning in CI pipeline.
  - Minimal dependency footprint with trusted core packages (React 18, Vite 6, Tailwind CSS).
- [x] **A07: Identification and Authentication Failures:**
  - Session tokens stored in `HttpOnly`, `Secure`, `SameSite=Strict` cookies.
  - Multi-factor authentication (MFA) supported for administrative and organizer accounts.
- [x] **A08: Software and Data Integrity Failures:**
  - Subresource Integrity (SRI) hashes on all external CDN assets.
  - Immutable security audit logs recording every administrative mutation.
- [x] **A09: Security Logging and Monitoring Failures:**
  - Audit logging captures `actor_id`, `action`, `resource`, `ip_hash`, and `timestamp`.
- [x] **A10: Server-Side Request Forgery (SSRF):**
  - Project GitHub URL and live demo URL validators strictly reject internal IP ranges (`127.0.0.1`, `10.0.0.0/8`, `192.168.0.0/16`, `169.254.169.254`).

---

## 2. Privacy & Regulatory Compliance (DPDP & GDPR)

1. **Digital Personal Data Protection Act (DPDP - India) & GDPR (EU):**
   - **Notice & Consent:** Granular, unbundled checkboxes for newsletter subscription and public profile directory listing.
   - **Right to Erasure (Account Deletion):** Self-serve deletion request workflow in `/dashboard/settings` that hard-deletes personal identifiers and anonymizes public contributions.
   - **Data Minimization:** No unnecessary personal data (phone numbers, physical addresses) collected for general membership.
   - **Cookie Consent:** Zero non-essential tracking cookies or invasive third-party ad pixels.
