# HerJourney (भारत) — Lifelong Career Ecosystem for 1M+ Women

> **Award-Winning, Enterprise-Grade Web Application** empowering women across India—from students and regional mobile-first operators to technical returners and executive boardroom leaders.

---

## 🎨 Visual & Design System
- **Color Palette**: 
  - Soft Rose Gold (`#F472B6`)
  - Deep Amethyst Purple (`#6B21A8`)
  - Indigo Accent (`#4F46E5`)
  - Emerald Success (`#10B981`)
  - Warm Pearl Canvas (`#FAFAF9`)
- **Aesthetic**: Glassmorphism (`backdrop-blur-md`), delicate borders, subtle drop-shadows, responsive layouts, floating micro-badges, and zero developer clutter.
- **Enterprise Compliance**: Built with automated DPDP Act 2023 PII masking for corporate recruiters.

---

## 🚀 Key Modules
1. **Executive Platform & Impact Overview**:
   - Live metrics (1,048,290+ Members, 32 Regional Communities, 520+ Corporate Partners, 94.2% 90-Day Retention).
   - "All Kinds of Women, One Platform" interactive gallery highlighting real-world personas (Priya the Returner, Ananya the Student, Lakshmi the Leader, Rukmini the Regional Pioneer).
2. **Member Workspace & Unified Lifecycle Journey**:
   - Multi-persona switcher to test different lifecycles seamlessly without re-entering data.
   - Interactive 20-30 Year Career Timeline with chronological milestones and downloadable verified credentials.
   - Rule-based opportunity recommendations with "Why am I seeing this?" explainer cards and DPDP consent ledger.
3. **Programme Manager Command Center**:
   - Create new programmes with customized eligibility rules (e.g., Career Break $\ge$ 12 months, technical skills).
   - Bulk Excel/CSV Registration Upload Simulator with Duplicate Detection & Review Queue.
   - Real-time Stage Progression Kanban (`Applied` → `Screening` → `Interview` → `Sessions` → `Completed` → `Placed`).
4. **Scoped Employer / Partner Portal**:
   - Scoped corporate dashboard showing ONLY the partner's sponsored programme funnel.
   - Automatic PII Data Privacy Masking (e.g., `p***a@gmail.com`, `+91 98*** **321`).
   - Hired Outcome marking and 3-month post-placement retention verification check-in ("Still employed?" status).
5. **Low-Bandwidth & Regional Language Mode**:
   - Ultra low-data toggle (saving up to 85% bandwidth for regional 3G/rural connectivity).
   - Instant vernacular preview for English, Hindi (हिंदी), and Tamil (தமிழ்).

---

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express.js REST API.
- **Database**: Mongoose / MongoDB Atlas integration with seamless in-memory fallback.
- **Deployment**: Vercel ready (`vercel.json`).

---

## 💻 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Backend Server (Express + MongoDB)
```bash
npm run server
# Runs on http://localhost:5000
```

### 3. Run Frontend (Vite)
```bash
npm run dev
# Runs on http://localhost:3000
```

### 4. Build for Production
```bash
npm run build
```

