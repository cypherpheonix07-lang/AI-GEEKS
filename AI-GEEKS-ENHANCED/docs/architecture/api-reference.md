# RESTful Service API Reference Specification
**Project:** AI Geeks Tech Community  
**Document ID:** `DOCS-ARCH-004`  
**Reference Date:** November 17, 2026  
**Status:** Approved Service Contract  

---

## 1. Authentication & Member Services

### `POST /api/auth/register`
- **Request Body:** `{ email: string, password: string, displayName: string }`
- **Response (201 Created):** `{ userId: string, status: 'pending_verification', message: 'Verification code dispatched' }`

### `POST /api/auth/login`
- **Request Body:** `{ email: string, password: string }`
- **Response (200 OK):** `{ token: string, user: UserProfile, roles: string[] }`

### `POST /api/auth/verify-email`
- **Request Body:** `{ userId: string, code: string }`
- **Response (200 OK):** `{ verified: true, status: 'active' }`

---

## 2. Events & Cryptographic Check-in Services

### `GET /api/events`
- **Query Params:** `?category=workshop&chapter=delhi&status=upcoming`
- **Response (200 OK):** `{ events: Event[], total: number }`

### `POST /api/events/:slug/rsvp`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
  ```json
  {
    "registrationId": "reg-9921",
    "status": "confirmed",
    "seatNumber": 42,
    "signedQrToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "calendarDownloadUrl": "/api/events/devfest-2026/calendar.ics"
  }
  ```

### `POST /api/organizer/check-in`
- **Headers:** `Authorization: Bearer <organizer_token>`
- **Request Body:** `{ qrToken: string, eventId: string }`
- **Response (200 OK):** `{ verified: true, attendee: { name: 'Aarav Patel', seat: 42 }, timestamp: '...' }`

### `GET /api/certificates/:certId`
- **Public Lookup:** Accessible without authentication.
- **Response (200 OK):**
  ```json
  {
    "certificateId": "CERT-AIG-2026-X89Y",
    "recipient": "Aarav Patel",
    "eventTitle": "AI Geeks Flagship DevFest 2026",
    "issuedDate": "2026-11-20",
    "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "isRevoked": false
  }
  ```

---

## 3. Projects & Community Showcase Services

### `GET /api/projects`
- **Query Params:** `?sort=stars&tag=webgpu&page=1`
- **Response (200 OK):** `{ projects: Project[], total: number }`

### `POST /api/projects`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** `{ title: string, tagline: string, githubUrl: string, demoUrl?: string, techStack: string[] }`
- **Response (201 Created):** `{ project: Project, awardedXp: 15 }`

### `POST /api/projects/:id/star`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):** `{ starred: boolean, newStarsCount: number }`

---

## 4. Discussions & Q&A Services

### `GET /api/discussions`
- **Query Params:** `?category=genai-llms&solved=true`
- **Response (200 OK):** `{ questions: Question[], total: number }`

### `POST /api/discussions/:id/vote`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** `{ direction: 'up' | 'down' }`
- **Response (200 OK):** `{ newScore: number }`

### `POST /api/discussions/:id/accept-answer`
- **Headers:** `Authorization: Bearer <author_token>`
- **Request Body:** `{ replyId: string }`
- **Response (200 OK):** `{ isSolved: true, acceptedReplyId: string, solverAwardedXp: 25 }`

---

## 5. Grounded AI Community Assistant

### `POST /api/assistant/chat`
- **Request Body:** `{ prompt: string, conversationHistory: Message[] }`
- **Response (200 OK):**
  ```json
  {
    "responseMarkdown": "The AI Geeks DevFest 2026 takes place on November 20, 2026 at the Main Arena. You can claim your free pass in the Events tab.",
    "citations": [
      { "title": "DevFest 2026 Event Details", "url": "/events/devfest-2026" }
    ],
    "groundedSource": "AI Geeks Event Database v2.4"
  }
  ```
