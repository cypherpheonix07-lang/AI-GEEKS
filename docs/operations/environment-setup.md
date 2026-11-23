# Environment Configuration & Local Development Setup
**Project:** AI Geeks Tech Community  
**Document ID:** `DOCS-OPS-002`  
**Reference Date:** November 17, 2026  
**Status:** Canonical Setup Guide  

---

## 1. Prerequisites

- **Node.js:** `v20.x` or higher (LTS recommended)
- **Package Manager:** `npm` (v10+) or `pnpm`
- **Git:** Version 2.40+
- **Modern Browser:** Chrome, Firefox, Edge, Safari (with Web Audio & Canvas support)

---

## 2. Environment Variables Specification (`.env.example`)

Create a `.env` file in the root workspace. Do NOT commit real secret values to source control.

```bash
# ==============================================================================
# AI GEEKS COMMUNITY PLATFORM - ENVIRONMENT CONFIGURATION
# ==============================================================================

# Application Base
NODE_ENV=development
VITE_APP_TITLE="AI Geeks Tech Community"
VITE_APP_URL="http://localhost:5173"
PORT=5173

# Relational Database Connection (PostgreSQL)
DATABASE_URL="postgresql://aigeeks_user:secret_password_here@localhost:5432/aigeeks_community?schema=public"

# Authentication & Session Security
JWT_SECRET="replace-with-a-cryptographically-secure-random-string-at-least-64-chars"
HMAC_TICKET_SECRET="replace-with-a-secure-hmac-sha256-key-for-qr-tokens"
SESSION_LIFETIME_HOURS=72

# OAuth Providers (Optional / Staging)
GITHUB_CLIENT_ID="gh_oauth_client_id_placeholder"
GITHUB_CLIENT_SECRET="gh_oauth_client_secret_placeholder"
GOOGLE_CLIENT_ID="google_oauth_client_id_placeholder"
GOOGLE_CLIENT_SECRET="google_oauth_client_secret_placeholder"

# Transactional Email (Resend / AWS SES / SMTP)
SMTP_HOST="smtp.provider.com"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASSWORD="smtp_password_placeholder"
EMAIL_FROM_ADDRESS="notifications@aigeeks.dev"

# Object Storage (S3 / Cloudflare R2 / Supabase Storage)
STORAGE_BUCKET="aigeeks-community-assets"
STORAGE_REGION="us-east-1"
STORAGE_ACCESS_KEY="s3_access_key_placeholder"
STORAGE_SECRET_KEY="s3_secret_key_placeholder"

# Grounded AI Assistant (Optional / Fallback provided)
GEMINI_API_KEY="your_gemini_api_key_here"
```

---

## 3. Installation & Run Scripts

```bash
# 1. Clone repository
git clone https://github.com/ai-geeks/community-platform.git
cd community-platform

# 2. Install dependencies
npm install

# 3. Type-check TypeScript codebase
npx tsc --noEmit

# 4. Start local development server (with HMR)
npm run dev

# 5. Build optimized production bundle
npm run build

# 6. Run production preview server
npm run preview -- --port 5173
```
