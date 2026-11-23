# Production Deployment & Hosting Guide
**Project:** AI Geeks Tech Community  
**Document ID:** `DOCS-OPS-001`  
**Reference Date:** November 17, 2026  
**Status:** Approved Production Runbook  

---

## 1. Hosting Architecture Options

The **AI Geeks** web platform is packaged as a high-performance, tree-shaken static/SPA bundle with typed service endpoints, making it deployable across modern enterprise clouds:

1. **Vercel / Netlify / Cloudflare Pages (Recommended for Edge):**
   - Direct Git-triggered builds: `npm run build` with output directory `dist/`.
   - Global CDN caching with automatic Brotli/Gzip compression.
   - Zero-config SSL certificates and DDoS protection.
2. **Docker / Containerized Production (AWS ECS / GCP Cloud Run / Kubernetes):**
   - Multi-stage Dockerfile packaging NGINX Alpine serving `dist/` with security headers.
3. **Node.js / Express Server:**
   - Serving static production assets from `dist/` with compression middleware and fallback to `index.html`.

---

## 2. Docker Container Deployment

```dockerfile
# Multi-Stage Production Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### NGINX Security & SPA Routing Configuration (`nginx.conf`)
```nginx
server {
    listen 80;
    server_name aigeeks.dev www.aigeeks.dev;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/json;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # SPA Client-Side Routing Fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static Assets Cache Control (Immutable)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform, immutable";
    }
}
```

---

## 3. Rollback & Health Check Procedures

1. **Automated Health Check Endpoint:**
   - Check `GET /health` or verify HTTP 200 on root `index.html` returning valid assets.
2. **Instant Rollback Strategy:**
   - In Vercel / Cloudflare: Roll back with 1-click in dashboard to previous deployment SHA.
   - In Kubernetes / Docker: Revert deployment tag to previous release tag (`kubectl rollout undo deployment/aigeeks-web`).
