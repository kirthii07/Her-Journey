# HerJourney — Product Scope & Implementation Boundaries

> **Tagline:** *"One identity. Every chapter of your career."*  
> **Platform Classification:** Women's Lifelong Career Community Platform (India)  
> **Repository Scope Document:** Distinguishing Built Prototype Features vs. Planned Production Roadmap

---

## 1. Scope Strategy & Architectural Philosophy

When building a lifelong career ecosystem for women spanning 20–30 years (from college student to corporate leader and advisor), attempting to build every tangential social networking feature in an early prototype dilutes core product integrity.

Instead, this prototype deliberately concentrates on the **four mission-critical architectural pillars**:
1. **One Persistent Identity & Intelligent Deduplication** (Eliminating fragmented forms & profiles)
2. **Deterministic Programme Workflows** (Transparent eligibility, stage progression, session attendance, certificate issuance)
3. **True Shared Live State** (Synchronized database state across Member, Manager, and Partner portals)
4. **Longitudinal Outcome Tracking & Privacy** (3-month self-reported retention check-ins, partner verification, and contact detail masking)

---

## 2. BUILT (Fully Implemented & Working in Prototype)

The following capabilities are fully designed, integrated with backend APIs, and backed by persistent MongoDB storage:

### A. Identity & Deduplication Engine
- [x] **One Persistent Identity per Woman:** Single document stores personal attributes, career transitions, multi-cohort applications, and issued credentials across 20–30 years.
- [x] **Deterministic Phone & Email Duplicate Detection:** Normalizes Indian phone formats (`+91`, `0`, spaces) and lowercase emails.
- [x] **Profile Reuse Flow:** When Priya enters her phone or email during registration, HerJourney recognizes her identity, states *"Welcome back, Priya. We found your existing profile and reused the information we already have"*, and prompts only for missing data.
- [x] **Anti-Corruption Ambiguous Match Review Queue:** If a candidate shares a verified phone with an existing member but presents an altered email or distinct city, the system **never silently merges records**. Instead, it flags a `POSSIBLE_MATCH`, assigns a confidence score, and routes the record to the manager's **Review Queue** for explicit human verification.
- [x] **Sample Archetype Members:** Seeded with 5 distinct life-stage identities:
  - **Priya Sharma (34, Bengaluru):** Returner, 3-year break, 6 yrs PM experience, returning to work.
  - **Ananya Krishnan (20, Coimbatore):** Final-year CS student, hackathon winner, entering tech.
  - **Meena Kulkarni (27, Pune):** Early-career software engineer transitioning into analytics.
  - **Lakshmi Narayanan (45, Chennai):** VP of Product Strategy, executive mentor.
  - **Rukmini Devi (29, Jaipur):** Low-bandwidth user, basic phone, Hindi regional language.

### B. Programme Management & Stage Workflows
- [x] **Custom Programme Creation:** Managers can configure programmes (e.g., Returnship 2026, Leadership Circle) with start/end dates, seats, partner linkages, and custom stages.
- [x] **Explainable Eligibility Engine (No AI/Black Box):** Deterministic evaluation against business rules (e.g., `careerBreakMonths >= 12` AND `skills contains Product OR Analytics`). Evaluates candidates with clear human-readable checkmarks (`✓ Career break is 36 months`, `✓ Product Management skill found`).
- [x] **Progression Stage Engine:** Linear cohort stages: `Applied` → `Screening` → `Interview` → `Sessions` → `Completed` → `Placed`. State transitions persist to MongoDB and sync across views.
- [x] **Session-Level Attendance Tracker:** Manager marks attendance for workshops (Session 1, 2, 3), dynamically calculating attendance percentages.
- [x] **Verifiable Certificate Generation:** Once a candidate reaches `Completed`, the manager issues an official credential with an immutable identifier (`HJ-RET-XXXXXX`), issue date, and endorsed competencies.

### C. Live Shared State & Partner Governance
- [x] **Multi-Portal Real-Time Synchronization:** Updates made by the Programme Manager (e.g., moving Priya to `Sessions` or issuing a certificate) immediately reflect in Priya’s timeline upon refresh and in Acme Partner's hiring pool.
- [x] **Partner Isolation Boundary:** Employer partners (e.g., Acme Corp) can **only** access cohorts they sponsor. They cannot view another partner's applicants, preserving corporate confidentiality.
- [x] **Shortlisted Talent & 1-Click Hiring:** Partners review qualified returners and mark candidates as `Hired`, setting stage to `Placed`.

### D. Privacy, Data Sovereignty & Masking
- [x] **Role-Based Contact Masking:** Candidate personal email and phone numbers are automatically masked in all Manager and Partner screens (`p***@gmail.com`, `+91 98****10`). Only members themselves can view their full unmasked contact data.
- [x] **Consent Enforcement Guardrail:** Explicit consent states recorded with timestamps (`programmeInvitations`, `partnerSharing`, `communication`). Managers **cannot** send invitations to members without active consent.

### E. Longitudinal Outcomes Tracking
- [x] **3-Month Employment Retention Check-In:** Placed candidates receive a post-reentry check-in questionnaire (*"Are you still working in this role?"* with options: *Yes*, *No*, *Changed role*, *Prefer not to say*).
- [x] **Dual Outcome States (`Reported` vs. `Verified`):** Candidate answers are initially saved as a `Reported Outcome`. A partner or manager can audit payroll/HR records and elevate it to `Verified`.

### F. User Experience & Mobile Optimization
- [x] **Ecosystem Visual Identity:** Professional Deep Plum (`#4A154B`), Rose Mauve (`#8E4467`), Soft Coral (`#E06D53`), Warm Ivory (`#FAF8F5`), and Deep Charcoal (`#1E2229`). Professional and confident; zero childish styling.
- [x] **Mobile-First Responsive Layout:** Bottom thumb navigation bar, touch-friendly tap targets, vertical chronological timeline cards, and stacked responsive tables.
- [x] **Rukmini Low-Bandwidth Mode:** Conceptual toggle reducing decorative assets, optimizing payloads, and featuring Hindi regional audio/text explainers.
- [x] **Bonus CSV Reconciliation Preview:** Interactive simulation reconciling 1,250 hackathon registrations into *Existing Matches*, *New Members*, and *Review Required*.

---

## 3. PLANNED (Production Roadmap & Future Milestones)

The following capabilities are deliberately staged for subsequent engineering phases following user validation:

### A. Authentication & Security
- [ ] **Production Identity Management:** JWT access/refresh token rotation, bcrypt password hashing, and rate-limited Redis session stores.
- [ ] **Multi-Factor Authentication (MFA):** Mandatory SMS OTP or WhatsApp-based authentication for sensitive identity claim operations.
- [ ] **Enterprise Single Sign-On (SSO):** SAML 2.0 / OpenID Connect integration for corporate hiring partners (Okta, Azure AD, Google Workspace).

### B. Communications & Delivery Infrastructure
- [ ] **WhatsApp Business API Integration:** Two-way automated WhatsApp templates for cohort invitations, session reminders, and check-in survey links.
- [ ] **Transactional Email Pipelines:** SendGrid / Amazon SES templates for official certificate delivery and partner hiring notifications.
- [ ] **Two-Way SMS / IVR Engine:** Dedicated shortcode system for low-connectivity users (Rukmini) to confirm attendance or reply to check-ins via basic feature phone keypad.

### C. Advanced Platform Capabilities
- [ ] **Production Multi-Language Localization (i18n):** Full dynamic UI translation across 8 Indian regional languages (Hindi, Tamil, Telugu, Marathi, Kannada, Bengali, Gujarati, Malayalam).
- [ ] **Deep File & Certificate Ledger:** Exportable cryptographically signed PDF certificates with QR-code public verification endpoints.
- [ ] **AI-Assisted Career Advisory (Future Phase):** Natural language career coaching and resume narrative reframing for returners (strictly excluded from the current prototype to preserve explainability).
- [ ] **Advanced Consent Revocation & GDPR/DPDP Compliance:** Granular data export, right-to-be-forgotten deletion workflows, and third-party data access audit logs in compliance with India's Digital Personal Data Protection Act (DPDP).

