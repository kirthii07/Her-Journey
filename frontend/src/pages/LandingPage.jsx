import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Briefcase,
  Layers,
  Clock,
  Database,
  CheckCircle2,
  Award,
  Users,
  ChevronRight,
  Compass,
  HeartHandshake,
  GraduationCap,
  TrendingUp,
  Coffee,
  RotateCcw,
  Star,
  Flame,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CAREER_STAGES = [
  {
    id: 'student',
    title: 'Student',
    icon: GraduationCap,
    badge: 'Foundation',
    badgeVariant: 'plum',
    timeline: 'Years 0 – 1',
    desc: 'Campus skilling cohorts, foundational hackathons, and technical apprenticeships that build an early verifiable portfolio.',
    example: 'Ananya: Final-year B.Tech CS candidate completing her first cloud micro-credential.'
  },
  {
    id: 'first-job',
    title: 'First Job',
    icon: Briefcase,
    badge: 'Launch',
    badgeVariant: 'rose',
    timeline: 'Years 1 – 3',
    desc: 'First full-time engineering or analyst placements with early-career peer circles and structured junior developer onboarding.',
    example: 'Meena: Junior Frontend Developer building enterprise React apps with verified peer mentorship.'
  },
  {
    id: 'growth',
    title: 'Career Growth',
    icon: TrendingUp,
    badge: 'Acceleration',
    badgeVariant: 'plum',
    timeline: 'Years 3 – 8',
    desc: 'Mid-career specialization, technical project leadership, high-visibility cross-functional initiatives, and promotions.',
    example: 'Advancing from Individual Contributor to Technical Lead or Senior Product Strategist.'
  },
  {
    id: 'break',
    title: 'Career Break',
    icon: Coffee,
    badge: 'Life Transition',
    badgeVariant: 'rose',
    timeline: 'Sabbatical / Caregiving',
    desc: 'Zero-pressure community touchpoints, micro-learning refreshers, and network preservation during parenting or family care.',
    example: 'Staying connected through alumni networks without losing accumulated credentials or identity.'
  },
  {
    id: 'returner',
    title: 'Return to Work',
    icon: RotateCcw,
    badge: 'Re-entry',
    badgeVariant: 'plum',
    timeline: 'Returnship Phase',
    desc: 'Intensive structured returnship cohorts, modern tech stack re-skilling, interview clinics, and dedicated corporate placement paths.',
    example: 'Priya: 3-year break returner refreshing product analytics and entering sponsored returnship.'
  },
  {
    id: 'leadership',
    title: 'Leadership',
    icon: Star,
    badge: 'Executive',
    badgeVariant: 'rose',
    timeline: 'Years 10 – 20+',
    desc: 'VP and Director level transitions, strategic boardroom visibility, executive coaching, and organisational policymaking.',
    example: 'Lakshmi: Engineering VP guiding enterprise cloud architectures and steering council policies.'
  },
  {
    id: 'mentor',
    title: 'Mentor & Advisor',
    icon: HeartHandshake,
    badge: 'Ecosystem Giving',
    badgeVariant: 'plum',
    timeline: 'Lifelong Wisdom',
    desc: 'Giving back through 1-on-1 career sponsorship, portfolio reviews, venture advising, and inspiring the next generation of women in tech.',
    example: 'Senior women leaders hosting cohort office hours and sponsoring rising talent.'
  }
];

const PROOF_POINTS = [
  'Zero Repeated Form Fills',
  'Verifiable Credential Ledger',
  'Strict Role-Based Privacy',
  '3-Month Retention Tracking',
];

export default function LandingPage() {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState(4);
  const [launchingRole, setLaunchingRole] = useState(null);

  const handleDemoStart = async (role, memberKey = 'priya') => {
    setLaunchingRole(role);
    try {
      await loginAs(role, memberKey);
      if (role === 'MEMBER') navigate('/member');
      else if (role === 'MANAGER') navigate('/manager');
      else if (role === 'PARTNER') navigate('/partner');
    } finally {
      setLaunchingRole(null);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-ivory-200 flex flex-col text-charcoal-800 overflow-x-hidden">

      {/* ── LANDING NAV ─────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-ivory-400 h-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl shadow-md group-hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #3B1C32 0%, #5D2150 100%)' }}
            >
              H
            </div>
            <div>
              <div className="font-display text-2xl text-plum-900 leading-none">HerJourney</div>
              <p className="text-caption text-charcoal-400 hidden sm:block">One identity. Every chapter.</p>
            </div>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => scrollToSection('career-journey')}
              className="text-body-sm font-medium text-charcoal-600 hover:text-plum-800 px-3 py-2 rounded-xl hover:bg-ivory-300 transition hidden lg:inline"
            >
              Career Chapters
            </button>
            <button
              onClick={() => scrollToSection('demo-launcher')}
              className="text-body-sm font-medium text-charcoal-600 hover:text-plum-800 px-3 py-2 rounded-xl hover:bg-ivory-300 transition hidden sm:inline"
            >
              Personas
            </button>
            <Link
              to="/rukmini-showcase"
              className="text-body-sm font-medium text-coral-500 hover:text-coral-600 px-3 py-2 rounded-xl hover:bg-coral-50 transition hidden md:inline"
            >
              Rukmini
            </Link>
            <Link to="/login" className="btn-secondary btn-sm">
              Sign In
            </Link>
            <button
              onClick={() => handleDemoStart('MEMBER', 'priya')}
              className="btn-primary btn-sm flex items-center gap-1.5 group"
            >
              <span>Explore Demo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative pt-40 pb-32 px-4 sm:px-8 text-white flex flex-col items-center justify-center bg-gradient-hero"
      >
        {/* Decorative glows */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(237,106,90,0.25) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(201,132,134,0.3) 0%, transparent 70%)' }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="glass-dark inline-flex items-center gap-2 px-5 py-2 rounded-full text-caption font-bold tracking-widest uppercase text-rose-300">
              <Sparkles className="w-3.5 h-3.5" />
              The Lifelong Career Ecosystem for Women in India
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-hero font-display text-white"
          >
            One identity.{' '}
            <br className="hidden sm:inline" />
            <span className="italic text-gradient-plum">
              Every chapter of her career.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-body-lg text-white/75 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            From first opportunity to leadership, connect every career milestone, programme,
            community, mentor and achievement in one lifelong platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => scrollToSection('career-journey')}
              className="btn-primary btn-lg group flex items-center gap-2"
            >
              <span>Explore Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-8 py-4 rounded-2xl text-body-lg font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-200"
            >
              Discover the Platform
            </button>
          </motion.div>

          {/* Proof points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-6 text-caption text-white/70"
          >
            {PROOF_POINTS.map((pt) => (
              <div key={pt} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-sage-400 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CAREER JOURNEY ───────────────────────────────── */}
      <section id="career-journey" className="bg-white py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="section-eyebrow">20–30 Years of Lifelong Continuity</span>
            <h2 className="section-title">
              Seven Career Chapters. One Continuous Identity.
            </h2>
            <p className="section-subtitle mx-auto">
              A woman never starts from scratch again. Her profile, verified credentials, peer
              communities, and mentorship history persist seamlessly through every stage of life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAREER_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activeStage === idx;

              return (
                <motion.div
                  key={stage.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  onClick={() => setActiveStage(idx)}
                  className={`card-hover cursor-pointer flex flex-col justify-between p-6 ${
                    isSelected ? 'ring-2 ring-plum-600 shadow-lg' : ''
                  }`}
                >
                  <div>
                    {/* Icon + Badge row */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-plum-800 text-white shadow-md'
                            : 'bg-plum-50 text-plum-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={stage.badgeVariant === 'plum' ? 'pill-plum' : 'pill-rose'}
                      >
                        {stage.badge}
                      </span>
                    </div>

                    {/* Title + timeline */}
                    <h3 className="text-h3 font-display text-plum-900 mb-1">{stage.title}</h3>
                    <div className="text-caption text-coral-500 font-mono font-bold mb-3">
                      {stage.timeline}
                    </div>

                    {/* Description */}
                    <p className="text-body-sm text-charcoal-600 leading-relaxed mb-4">
                      {stage.desc}
                    </p>
                  </div>

                  {/* Example quote */}
                  <div className="bg-ivory-200 rounded-2xl p-3 italic text-caption text-charcoal-600 border border-ivory-400 mt-auto">
                    <span className="not-italic font-bold text-plum-900 block mb-0.5 text-caption">
                      Real-world:
                    </span>
                    {stage.example}
                  </div>
                </motion.div>
              );
            })}

            {/* Continuous Ledger card */}
            <div className="bg-gradient-warm rounded-3xl p-6 text-white flex flex-col justify-between border border-plum-700/30 shadow-card">
              <div className="space-y-3">
                <span className="text-caption font-bold uppercase tracking-widest text-coral-300 block">
                  Continuous Ledger
                </span>
                <h3 className="text-h3 font-display text-white">Zero Lost Progress</h3>
                <p className="text-body-sm text-white/75 leading-relaxed">
                  When Priya returns to work after 3 years, her early student hackathon certs,
                  previous Senior PM leadership records, and community recommendations are
                  immediately recognized.
                </p>
              </div>
              <button
                onClick={() => handleDemoStart('MEMBER', 'priya')}
                className="mt-6 w-full py-3 px-4 rounded-2xl text-body-sm font-bold text-plum-900 bg-white hover:bg-ivory-100 shadow-md transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Explore Priya's Timeline</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEMO LAUNCHER ─────────────────────────────────── */}
      <section id="demo-launcher" className="bg-ivory-200 py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="section-eyebrow">Multi-Persona Demonstration</span>
            <h2 className="section-title">
              Experience HerJourney from Every Perspective
            </h2>
            <p className="section-subtitle mx-auto">
              Switch between the returner candidate, the cohort programme director, and the
              corporate hiring partner with a single click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Priya — Member */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="card-hover flex flex-col justify-between"
            >
              <div className="card-body space-y-4">
                <div className="flex items-center justify-between">
                  <span className="pill-plum">Primary Demo User</span>
                  <span className="text-caption font-mono font-bold text-coral-500">Bengaluru</span>
                </div>
                <h3 className="text-h2 font-display text-plum-900">Priya Sharma</h3>
                <p className="text-label text-plum-700 uppercase tracking-wider font-bold">
                  Senior Product Manager · 3-Year Break
                </p>
                <p className="text-body-sm text-charcoal-600 leading-relaxed">
                  Returning to work after 36 months of caregiving. Reuses her verified career
                  history to enter Returnship 2026, track workshops, and secure placement at Acme
                  Corp without repeated paperwork.
                </p>
              </div>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <button
                  onClick={() => handleDemoStart('MEMBER', 'priya')}
                  disabled={launchingRole === 'MEMBER'}
                  className="btn-primary w-full justify-center group"
                >
                  <span>{launchingRole === 'MEMBER' ? 'Launching…' : 'Launch Member Journey'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Maya — Manager */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="card-hover flex flex-col justify-between"
            >
              <div className="card-body space-y-4">
                <div className="flex items-center justify-between">
                  <span className="pill-rose">Cohort Leadership</span>
                  <span className="text-caption font-mono font-bold text-rose-500">Operations</span>
                </div>
                <h3 className="text-h2 font-display text-plum-900">Programme Director</h3>
                <p className="text-label text-coral-600 uppercase tracking-wider font-bold">
                  Maya Rao · Cohort Operations
                </p>
                <p className="text-body-sm text-charcoal-600 leading-relaxed">
                  Scans ecosystem members with deterministic eligibility rules, checks consent,
                  moves candidates between stages, tracks attendance, and issues tamper-proof
                  certificates.
                </p>
              </div>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <button
                  onClick={() => handleDemoStart('MANAGER')}
                  disabled={launchingRole === 'MANAGER'}
                  className="w-full py-3 px-6 rounded-2xl text-body-sm font-semibold text-white bg-coral-500 hover:bg-coral-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>{launchingRole === 'MANAGER' ? 'Launching…' : 'Launch Manager Suite'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Acme — Partner */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="card-hover flex flex-col justify-between"
            >
              <div className="card-body space-y-4">
                <div className="flex items-center justify-between">
                  <span className="pill-sage">Hiring Partner</span>
                  <span className="text-caption font-mono font-bold text-sage-500">Acme Corp</span>
                </div>
                <h3 className="text-h2 font-display text-plum-900">Acme Talent Partner</h3>
                <p className="text-label text-sage-500 uppercase tracking-wider font-bold">
                  Corporate Talent Pipeline
                </p>
                <p className="text-body-sm text-charcoal-600 leading-relaxed">
                  Accesses isolated sponsored cohort funnel, reviews qualified candidates with
                  masked contact information, marks hires with one click, and audits 3-month
                  retention.
                </p>
              </div>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <button
                  onClick={() => handleDemoStart('PARTNER')}
                  disabled={launchingRole === 'PARTNER'}
                  className="w-full py-3 px-6 rounded-2xl text-body-sm font-semibold text-white bg-sage-500 hover:bg-sage-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>{launchingRole === 'PARTNER' ? 'Launching…' : 'Launch Partner Portal'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="how-it-works" className="bg-white py-24 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="section-eyebrow">Architectural Transformation</span>
            <h2 className="section-title">Why One Identity Matters</h2>
            <p className="section-subtitle mx-auto">
              How HerJourney replaces fragile manual processes with an enterprise-grade connected
              career ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Status Quo */}
            <div className="bg-white rounded-3xl card-body sm:p-10 border-2 border-red-200 shadow-sm space-y-6">
              <span className="pill bg-red-50 text-red-700 border-red-200">The Status Quo</span>
              <h3 className="text-h2 font-display text-charcoal-900">
                Excel + Google Forms + WhatsApp Broadcasts
              </h3>
              <ul className="space-y-4 text-body-sm text-charcoal-600">
                {[
                  ['Duplicate identities:', 'The same woman fills 5 forms across 5 programmes, producing scattered unverified identities.'],
                  ['Lost career history:', 'Past hackathon performance and mentorship progress vanish into disconnected spreadsheets.'],
                  ['Unchecked consent:', 'Outreach is blasted without verifiable consent timestamps, violating candidate privacy.'],
                  ['Zero longitudinal outcomes:', 'Funders receive anecdotal claims rather than auditable employment verification.'],
                ].map(([label, text]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg leading-none mt-0.5">✕</span>
                    <span><strong>{label}</strong> {text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HerJourney Solution */}
            <div className="bg-white rounded-3xl card-body sm:p-10 border-2 border-plum-800 shadow-card space-y-6">
              <span className="pill-plum">HerJourney Solution</span>
              <h3 className="text-h2 font-display text-plum-900">
                One Persistent Identity + Shared Live State
              </h3>
              <ul className="space-y-4 text-body-sm text-charcoal-700">
                {[
                  ['Intelligent profile reuse:', 'Duplicate detection reuses existing profiles; ambiguous matches are routed to a human review queue.'],
                  ['Shared live state:', 'Manager stage updates reflect immediately across Priya\'s timeline and the hiring partner\'s funnel.'],
                  ['Role-based privacy & masking:', 'Personal phone and email are automatically masked in administrative and partner views.'],
                  ['Verified outcome loop:', '3-Month retention check-in separates Reported from Verified outcomes for philanthropic funders.'],
                ].map(([label, text]) => (
                  <li key={label} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sage-400 shrink-0 mt-0.5" />
                    <span><strong>{label}</strong> {text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-plum-900 py-16 px-4 sm:px-8 text-white/70">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-display font-bold text-lg shadow-md"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              H
            </div>
            <span className="font-display text-2xl text-white">HerJourney</span>
          </div>
          <p className="text-body text-white/60">
            One identity. Every chapter of your career.
          </p>
          <p className="text-body-sm text-white/40 max-w-xl mx-auto">
            A privacy-first lifelong career community empowering women from campus to leadership
            across India. Your data is yours — always.
          </p>
          <div className="pt-6 flex items-center justify-center gap-4 text-caption text-white/30 font-medium">
            <span>Platform</span>
            <span>·</span>
            <span>India</span>
            <span>·</span>
            <span>Est. 2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
