# AI GEEKS Deployment & Operations Guide

**Project:** AI GEEKS Community Platform  
**Target Environments:** Vercel / Node.js Container / Self-Hosted VPS  
**Prerequisites:** Node.js >= 18.18.0 (Recommended: Node 20 LTS or Node 24)

---

## 1. Quick Start / Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run TypeScript check
npm run typecheck # or npx tsc --noEmit

# 3. Start local development server (Turbopack)
npm run dev

# 4. Open in browser
http://localhost:3000
```

---

## 2. Production Build & Execution

```bash
# 1. Compile production build
npm run build

# 2. Start production server
npm run start -- -p 3000

# 3. Automated full-stack verification and route probe
npm run verify:build
```

---

## 3. Environment Variables & Configuration

Create a `.env.production` file for production deployment:

```ini
# Application URL
NEXT_PUBLIC_SITE_URL=https://aigeeks.dev
NEXT_PUBLIC_API_URL=https://aigeeks.dev/api

# Internal Access & Session Security
INTERNAL_ACCESS_SECRET=your_super_secret_session_passcode
ADMIN_SESSION_SALT=your_random_salt_for_tokens

# Luma Calendar & Social Integration
NEXT_PUBLIC_LUMA_CALENDAR_URL=https://lu.ma/aigeeks
NEXT_PUBLIC_DISCORD_INVITE_URL=https://discord.gg/aigeeks
NEXT_PUBLIC_WHATSAPP_INVITE_URL=https://chat.whatsapp.com/aigeeks-chennai
```

---

## 4. Multi-Mirror Synchronization Checklist

When releasing updates:
1. Verify `AI-GEEKS-ORIGINAL` has not been modified.
2. Synchronize working files to `ai-geeks-community-v2` and `AI-GEEKS-ENHANCED`.
3. Run `node scripts/verify-clone.mjs` and `node scripts/verify-17-scenarios.mjs` to ensure the preservation invariant holds.
