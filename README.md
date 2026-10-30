# HerJourney — Women's Lifelong Career Community Platform

> **Tagline:** *"One identity. Every chapter of your career."*  
> **Mission:** A connected 20–30 year career community ecosystem for women in India.  
> **Status:** Production-Quality Prototype for Junior Full-Stack Developer Assessment.

---

## 🌟 Executive Summary

**HerJourney** solves the systemic fragmentation plaguing women's skilling and workforce reentry programs across India. 

Today, organizations manage cohorts using disconnected Google Forms, Excel sheets, and WhatsApp groups. This results in duplicate profiles, broken career histories, unverified consent, and zero longitudinal outcome tracking.

HerJourney replaces this status quo with a single foundational product principle:
$$\mathbf{ONE\ WOMAN} \longrightarrow \mathbf{ONE\ IDENTITY} \longrightarrow \mathbf{COMPLETE\ CAREER\ JOURNEY}$$

A woman can stay connected over decades:
$$\text{Student} \to \text{First Job} \to \text{Career Growth} \to \text{Career Break} \to \text{Returner} \to \text{Leadership} \to \text{Mentor} \to \text{Advisor}$$

---

## 🚀 Key Architectural Highlights

1. **Persistent Unified Identity:** Single MongoDB record tracking multi-year milestones, skills, community memberships, cohort applications, and verifiable credentials.
2. **Deterministic Duplicate Detection & Reuse:** Intelligently matches normalized phone numbers (`+91 98765 43210`) and emails. Reuses existing profiles with zero duplicate data entry.
3. **Ambiguous Duplicate Review Queue:** Adheres strictly to the **Anti-Silent-Merge Policy**. Ambiguous matches are routed to a human review queue with confidence scoring rather than corrupting profile histories.
4. **Explainable Deterministic Rules (No AI / LLMs):** Transparent business logic for cohort eligibility (`careerBreakMonths >= 12` AND `skills contains Product OR Analytics`) and opportunity recommendations with *"Why am I seeing this?"* modals.
5. **Real Shared Live State:** Actions performed in the Manager portal (moving Priya to `Sessions`, marking attendance, issuing certificates) immediately update the database and reflect in Priya’s timeline and the Partner portal upon refresh.
6. **Partner Isolation & Data Masking:** Hiring partners (Acme Corp) can only see cohorts they sponsor. Contact details are automatically masked in manager and partner views (`p***@gmail.com`, `+91 98****10`).
7. **Longitudinal Outcome Tracking:** 3-Month employment retention check-in separating `Reported` from `Verified` outcome states.
8. **Rukmini & Low-Bandwidth Inclusivity:** Dedicated architecture for low-connectivity, basic smartphones featuring Hindi regional language support and lightweight asset payloads.
9. **Bonus CSV Batch Reconciliation:** Interactive simulation previewing duplicate reconciliation across 1,250 hackathon registrations.

---

## 🛠️ Tech Stack & Architecture

```
women/
├── backend/
│   ├── src/
│   │   ├── config/             # DB connection (Atlas + MemoryServer fallback) & Seeder
│   │   ├── controllers/        # Express request controllers
│   │   ├── middleware/         # RBAC, privacy masking, error handlers
│   │   ├── models/             # Mongoose schemas (Member, Programme, Application, etc.)
│   │   ├── routes/             # RESTful API route definitions
│   │   ├── services/           # Deterministic eligibility & duplicate engines
│   │   ├── utils/              # Masking helpers & response formatters
│   │   └── server.js           # Express app initialization
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI (Navbar, MobileNav, Timeline, FunnelChart...)
│   │   ├── context/            # AuthContext (Role switching), LowDataContext
│   │   ├── layouts/            # AppLayout with responsive navigation
│   │   ├── pages/              # LandingPage, MemberDashboard, ManagerViews, PartnerPortal...
│   │   ├── services/           # Fetch API client wrapper
│   │   ├── App.jsx             # React Router configuration
│   │   └── main.jsx
│   ├── tailwind.config.js      # Custom Burgundy / Rose Mauve / Soft Coral / Warm Ivory palette
│   └── package.json
│
├── PRODUCT-SCOPE.md            # Built vs. Planned scope boundaries
├── WRITEUP.md                  # Comprehensive engineering and product write-up
└── README.md                   # This project guide
```

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React, Recharts
- **Backend:** Node.js, Express 4, Mongoose 8
- **Database:** MongoDB (Local or MongoDB Atlas) with automatic fallback to embedded `mongodb-memory-server`
- **Design Tokens:** Deep Plum (`#4A154B`), Rose Mauve (`#8E4467`), Soft Coral (`#E06D53`), Warm Ivory (`#FAF8F5`), Deep Charcoal (`#1E2229`)

---

## ⚡ Quick Start & Local Execution

### Prerequisites
- Node.js (v18+ recommended; tested on v24)
- npm (v9+)

### Zero-Friction Setup
HerJourney includes a built-in embedded in-memory MongoDB fallback. **You do NOT need MongoDB installed on your local machine to run and evaluate this prototype!**

1. **Clone and Install Dependencies:**
   ```bash
   cd women
   # Install root, backend, and frontend dependencies
   npm run install:all
   ```

2. **Configure Environment (Optional):**
   ```bash
   # Copy .env.example if you wish to connect to an external MongoDB Atlas cluster
   cp .env.example backend/.env
   ```
   *(If `MONGODB_URI` is left blank, HerJourney automatically launches an in-memory MongoDB instance and seeds sample data!)*

3. **Start the Application:**
   ```bash
   # Option A: Start both Backend and Frontend concurrently
   npm run dev

   # Option B: Run services in separate terminals
   # Terminal 1 (Backend API on http://localhost:5000):
   cd backend && npm start

   # Terminal 2 (Frontend on http://localhost:3000):
   cd frontend && npm run dev
   ```

4. **Open Browser:**
   Navigate to **`http://localhost:3000`**

---

## 👥 Demo User Personas & Accounts

The prototype features a **1-Click Demo Persona Switcher** on the top header ribbon. No manual account registration is required:

| Role | Persona | Email / Identifier | Profile Context |
| :--- | :--- | :--- | :--- |
| **Member (Primary)** | **Priya Sharma** | `priya@demo.herjourney.app` | 34 yrs, Bengaluru • 6 yrs PM experience • 3-year career break • Returner seeking reentry |
| **Member (Student)** | **Ananya Krishnan** | `ananya@demo.herjourney.app` | 20 yrs, Coimbatore • Final year CS • Hackathon winner • Skilling & internship pipeline |
| **Member (Early Career)** | **Meena Kulkarni** | `meena@demo.herjourney.app` | 27 yrs, Pune • Backend dev (Java/SQL) • Mentee of Lakshmi • Analytics transition |
| **Member (Executive)** | **Lakshmi Narayanan** | `lakshmi@demo.herjourney.app` | 45 yrs, Chennai • VP Product Strategy • Leadership Circle • Executive Mentor |
| **Member (Low Access)** | **Rukmini Devi** | `rukmini@demo.herjourney.app` | 29 yrs, Jaipur • Basic phone • Hindi preference • 2G/3G connectivity • Audio-first |
| **Programme Manager** | **Maya Rao** | `manager@demo.herjourney.app` | Senior Programme Director • Cohort management, screening, attendance, certification |
| **Employer Partner** | **Acme Corp Talent** | `partner@demo.herjourney.app` | Hiring Partner • Acme Returnship 2026 sponsor • Shortlisted talent & hiring |

> *Note on Authentication:* Prototype authentication uses a lightweight demo switcher. In production, this would be replaced with JWT token rotation, bcrypt password hashing, and WhatsApp/SMS OTP claims.

---

## 🎬 3–5 Minute Evaluator Walkthrough Script

Follow this structured flow to inspect the end-to-end user journeys:

### Part 1: Product Intro (30 Seconds)
1. Open `http://localhost:3000`.
2. Notice the clean, confidence-inspiring Deep Plum and Warm Ivory theme (no childish pinks or excessive animations).
3. Review the status quo comparison: Excel/Forms vs. HerJourney's unified identity ecosystem.

### Part 2: Priya's Journey (Member View)
1. Click **`[Continue as Priya]`**.
2. Notice the welcome banner: `Stage: RETURNER`, `Profile Completion: 85%`, `Current Programme: Returnship 2026`.
3. Inspect Priya's **Data-Driven Career Timeline**:
   - `2018 - Senior Product Manager (CloudCommerce)`
   - `2022 - Career Break (36 Months)`
   - `2025 - Joined Communities (Women in Tech, Returners)`
   - `2026 - Returnship Stages: Applied → Screening → Interview → Sessions`
4. Inspect the **Opportunities** section:
   - Click **"Why am I seeing this?"** on *Senior Product Manager - Returnship Track*.
   - Notice the transparent, explainable rule breakdown (Career stage = Returner, Break >= 12 months, Skills match).
5. Open **Profile & Privacy** (`/member/profile`):
   - Notice that Priya’s contact details are unmasked for herself.
   - Switch to the **Duplicate Detection Test** tab:
     - Type Priya's number `+91 98765 43210`.
     - Click **Run Duplicate Detection Check**.
     - Notice the response: *"Welcome back, Priya. We found your existing profile and reused the information we already have."*

### Part 3: Programme Operations (Manager View)
1. In the top ribbon, click **`[Manager]`**.
2. Review the **Conversion Funnel Visualization**:
   - `Invited: 250 → Registered: 180 → Participated: 150 → Completed: 120 → Placed: 45`.
3. Navigate to **Eligible Members** (`/manager/eligible-members`):
   - Observe the deterministic evaluation table.
   - Note that Priya has `Eligible ✓` and `Consent Granted ✓` with explainable checkmarks.
   - Note that candidate phone and email are **masked** (`p***@gmail.com`, `+91 98****10`).
4. Navigate to **Returnship 2026 Management** (`/manager/programmes/returnship`):
   - Select Priya Sharma.
   - **Move Stage:** Click `Completed`.
   - **Track Attendance:** Toggle Session 3 to `Present ✓` (attendance updates to 100%).
   - **Issue Certificate:** Click `Issue Completion Certificate`. An official verified credential (`HJ-RET-XXXXXX`) is generated!

### Part 4: Shared Live State & Partner Hiring (Partner View)
1. In the top ribbon, switch to **`[Acme Partner]`**.
2. Notice **Partner Isolation**: Acme Corp can only view its own sponsored Returnship program.
3. Locate Priya Sharma in the **Shortlisted Candidates** table.
4. Click **`[Mark as Hired]`**.
5. Switch back to **`[Priya]`**:
   - Notice her active status immediately reflects `Placed` as Senior Product Manager at Acme Corp!

### Part 5: Longitudinal Outcome Loop
1. As Priya, click the **`[3-Month Check-In]`** button.
2. Select *"Yes, still working here"* and submit.
3. Notice the state recorded as a **Reported Outcome**.
4. Switch to **`[Acme Partner]`**:
   - Locate the 3-Month Outcome section.
   - Click **`[Mark Verified]`**. The outcome elevates from Reported to Verified!

### Part 6: Inclusivity & Rukmini's Low-Bandwidth Model
1. Click **`[Rukmini Low-Bandwidth Architecture]`** in the header.
2. Switch language to **हिन्दी (Hindi)**.
3. Observe how the production platform accommodates low memory (sub-150KB payload), audio guidance, and two-way SMS synchronization.
4. Toggle **Low Data: ON** to preview lightweight rendering.

---

## 📡 REST API Reference Summary

| Method | Endpoint | Description | Role Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/demo-login` | Demo fast-login with persona switcher | Public |
| `GET` | `/api/members` | Retrieve all members (contacts masked) | Manager |
| `POST` | `/api/members/check-duplicate` | Deterministic phone/email identity lookup | Public / Member |
| `GET` | `/api/members/:id` | Member profile (unmasked for self, masked for admin) | Authenticated |
| `PUT` | `/api/members/:id` | Update profile fields & consent toggles | Member (Self) |
| `GET` | `/api/programmes` | List programmes (isolated by partner for Partner role) | Authenticated |
| `POST` | `/api/programmes` | Create programme with custom stages & rules | Manager |
| `GET` | `/api/programmes/:id/eligible-members` | Deterministic eligibility & consent audit | Manager |
| `POST` | `/api/programmes/:id/invite` | Send cohort invite (verifies consent) | Manager |
| `POST` | `/api/applications` | Register for programme with profile reuse | Member |
| `PUT` | `/api/applications/:id/stage` | Move candidate stage in shared MongoDB | Manager |
| `PUT` | `/api/applications/:id/attendance` | Record session attendance percentage | Manager |
| `PUT` | `/api/applications/:id/hire` | Mark candidate as Hired | Partner / Manager |
| `POST` | `/api/certificates` | Issue verifiable credential | Manager |
| `GET` | `/api/certificates/member/:id` | Get member's official certificates | Member |
| `GET` | `/api/opportunities/member/:id` | Rule-based recommendations with *Why* details | Member |
| `POST` | `/api/outcomes` | Submit 3-month retention check-in | Member |
| `PUT` | `/api/outcomes/:id/verify` | Verify outcome against payroll records | Partner / Manager |
| `GET` | `/api/review-queue` | Inspect ambiguous duplicate records | Manager |
| `POST` | `/api/reconciliation/preview-csv` | Bonus bulk CSV import reconciliation preview | Manager |

---

## 🔒 Security & Privacy Measures

1. **Contact Masking:** Backend sanitizes email and phone representations before transmitting data to manager and partner interfaces.
2. **Deterministic Rules:** Zero reliance on unexplainable third-party AI APIs; audit trails are 100% reproducible.
3. **Data Protection by Default:** Consent timestamps are recorded; invitations cannot be dispatched without member permission.
4. **Environment Isolation:** Secrets and keys are excluded from git (`.gitignore`).

