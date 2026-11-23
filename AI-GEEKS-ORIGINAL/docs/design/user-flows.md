# Core User Journeys & Interaction Flows
**Project:** AI Geeks Tech Community  
**Document ID:** `DOCS-DES-003`  
**Reference Date:** November 17, 2026  
**Status:** Validated User Flows  

---

## 1. Flow 1: Visitor Discovery & Resumable 4-Step Onboarding

```mermaid
sequenceDiagram
    autonumber
    actor User as Visitor / New Builder
    participant Web as AI Geeks Web App
    participant Auth as Auth & User Service
    participant DB as Relational Store

    User->>Web: Visits Homepage `/` or clicks "Join Community"
    Web->>User: Displays Step 1: Account Creation (Email / OAuth)
    User->>Web: Enters display name, email, password
    Web->>Auth: Validates input & creates unverified account
    Auth->>DB: Stores User record (status: pending_verification)
    Web->>User: Step 2: Email Verification Code Prompt
    User->>Web: Submits 6-digit confirmation code
    Web->>Auth: Validates verification token
    Auth->>DB: Updates User status: active
    Web->>User: Step 3: Community Code of Conduct Acknowledgment
    User->>Web: Toggles accept & picks 3+ Technical Interests
    Web->>User: Step 4: Optional Profile Completion (Bio, GitHub, Role)
    User->>Web: Clicks "Complete Onboarding"
    Web->>DB: Persists MemberProfile & awards +20 Welcome XP
    Web->>User: Redirects to `/dashboard` with recommended events & courses
```

---

## 2. Flow 2: Event Discovery, RSVP, Cryptographic QR Pass & Check-in

```mermaid
sequenceDiagram
    autonumber
    actor Member as Registered Member
    participant EventUI as `/events/[slug]`
    participant EventService as Event Registration Engine
    actor Organizer as Event Organizer (`/organizer`)

    Member->>EventUI: Views event details, agenda, and available seats
    Member->>EventUI: Clicks "Claim Free Pass / RSVP"
    EventUI->>EventService: Verifies capacity & user eligibility
    alt Capacity Available
        EventService->>EventService: Generates HMAC-SHA256 signed QR pass token
        EventService->>EventUI: Returns confirmed pass with unique ticket ID
        EventUI->>Member: Confetti celebration, audio feedback, calendar (.ics) export
    else Event Full
        EventService->>EventUI: Adds member to Waitlist (Position #)
    end
    Note over Member,Organizer: At in-person or virtual venue check-in desk
    Member->>Organizer: Presents QR pass from `/dashboard/events`
    Organizer->>Organizer: Scans QR code with Organizer Scanner (`/organizer/attendance`)
    Organizer->>EventService: Verifies signature & ticket token
    EventService-->>Organizer: Displays "Verified: Aarav Patel (Seat #42)"
    EventService->>EventService: Marks Attendance record & triggers Certificate eligibility
```

---

## 3. Flow 3: Open-Source Project Showcase & Star Engagement

```mermaid
sequenceDiagram
    autonumber
    actor Member as Project Author
    participant Modal as SubmitProjectModal
    participant ProjService as Project Registry
    actor Peer as Community Peer

    Member->>Modal: Clicks "Submit Project" from `/projects`
    Member->>Modal: Inputs Title, Tagline, GitHub URL, Demo URL, Tech Stack
    Modal->>ProjService: Validates URLs & checks repository metadata
    ProjService->>ProjService: Creates Project record & awards +15 XP to Author
    ProjService-->>Member: Success tone & immediate listing in Project Directory
    Peer->>ProjService: Views project & clicks "Star Project"
    ProjService->>ProjService: Increments star counter & records peer bookmark
    ProjService-->>Peer: Tactical audio pop feedback
```

---

## 4. Flow 4: Technical Article Authoring & Publishing

```mermaid
sequenceDiagram
    autonumber
    actor Author as Community Writer
    participant Editor as WritePostModal
    participant BlogService as Content Engine
    actor Reader as Community Reader

    Author->>Editor: Clicks "Write Post" in Navbar
    Author->>Editor: Writes title, markdown body, tags, category
    Editor->>Editor: Calculates live reading time & renders split-pane preview
    Author->>Editor: Clicks "Publish Article"
    Editor->>BlogService: Sanitizes HTML/Markdown & saves Article
    BlogService-->>Author: Awards +20 XP & publishes to `/blog`
    Reader->>BlogService: Reads article, clicks Bookmark, leaves constructive comment
```

---

## 5. Flow 5: Q&A Question Asking & Accepted Solution Resolution

```mermaid
sequenceDiagram
    autonumber
    actor Asker as Question Author
    actor Solver as Expert Contributor
    participant QA as Q&A Service (`/community`)

    Asker->>QA: Posts technical question with code snippet & tags
    QA-->>Asker: Awards +5 XP & lists on Q&A Feed
    Solver->>QA: Submits detailed markdown answer with explanation
    QA-->>Solver: Awards +10 XP for answering
    Asker->>QA: Clicks "Accept Answer (Green Checkmark)"
    QA->>QA: Marks accepted answer & awards +25 XP bonus to Solver
    QA-->>Asker: Updates question status to [SOLVED]
```
