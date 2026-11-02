import React from 'react';
import { 
  ArrowRight, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  ChevronRight, 
  Compass, 
  GraduationCap, 
  HeartHandshake, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Users 
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function ExecutiveLanding({ 
  onSelectPersona, 
  onNavigateTab, 
  personas, 
  language 
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const keyMetrics = [
    { label: t.statsMembers, value: '1,048,290+', growth: '+14% MoM', icon: Users, color: 'from-rosegold-500 to-pink-600' },
    { label: t.statsCommunities, value: '32 Cities & Hubs', growth: 'Pan-India', icon: Compass, color: 'from-amethyst-600 to-purple-800' },
    { label: t.statsPartners, value: '520+ Enterprises', growth: 'Equal-Pay Certified', icon: HeartHandshake, color: 'from-indigo-600 to-blue-700' },
    { label: t.statsRetention, value: '94.2% Verified', growth: '3-Month Audit', icon: ShieldCheck, color: 'from-emerald-500 to-teal-700' },
  ];

  return (
    <div className="space-y-16 py-6 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl mesh-gradient-hero border border-white/80 shadow-glass p-8 sm:p-14 lg:p-16">
        
        {/* Floating Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-rosegold-300/20 to-amethyst-400/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-indigo-300/20 to-pink-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* Micro-badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-rosegold-200/80 shadow-xs text-xs font-semibold text-amethyst-900 animate-float">
            <span className="w-2 h-2 rounded-full bg-emeraldsuccess-500 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-rosegold-500" />
            <span>National Digital Mission for Women's Economic Mobility</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-stone-900 leading-[1.12]">
            {language === 'en' ? (
              <>
                A Lifelong Career Community <br />
                <span className="text-gradient-purple-rose">Empowering 1 Million+ Women</span>
              </>
            ) : (
              t.heroTitle
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigateTab('member')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amethyst-800 via-amethyst-900 to-indigo-900 hover:from-amethyst-900 hover:to-indigo-950 text-white font-bold text-sm shadow-glow-purple hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2.5"
            >
              <span>{t.exploreButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('employer')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/90 hover:bg-white border border-stone-200/80 text-stone-800 font-bold text-sm shadow-sm hover:border-amethyst-300 transition flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-amethyst-700" />
              <span>{t.partnerButton}</span>
            </button>
          </div>

          {/* High-Trust Guarantee Micro-text */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-stone-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> DPDP Act 2023 Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Masked Corporate Gateway
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amethyst-700" /> 100% Cryptographically Verified Badges
            </span>
          </div>

        </div>

      </section>

      {/* Animated Key Impact Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {keyMetrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div 
              key={idx}
              className="glass-panel p-6 rounded-3xl border border-white/80 hover:shadow-glass-hover hover:-translate-y-1 transition duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${m.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {m.growth}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                {m.value}
              </div>
              <p className="text-xs font-semibold text-stone-500 mt-1 uppercase tracking-wider">
                {m.label}
              </p>
            </div>
          );
        })}
      </section>

      {/* Persona Interactive Gallery: "All Kinds of Women, One Platform" */}
      <section className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amethyst-100/70 text-amethyst-800 text-xs font-bold mb-2">
              <Users className="w-3.5 h-3.5 text-amethyst-700" />
              <span>Inclusive Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-stone-900">
              All Kinds of Women, One Platform
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              From college campuses and rural hubs to technical returnships and boardrooms—select any persona to test their unified lifecycle experience.
            </p>
          </div>
          <span className="text-xs font-semibold text-stone-400">
            Click any card to launch their tailored workspace
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectPersona(p.id);
                onNavigateTab('member');
              }}
              className="glass-panel p-6 rounded-3xl border border-white/90 hover:border-rosegold-300 hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amethyst-700 via-rosegold-400 to-indigo-600 opacity-80 group-hover:opacity-100 transition" />

              <div>
                {/* Avatar & Stage Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emeraldsuccess-500 rounded-full border-2 border-white" />
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-amethyst-100/80 text-amethyst-900 text-xs font-bold shadow-xs">
                    {p.lifecycleStage}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-amethyst-900 transition">
                  {p.name}
                </h3>
                <p className="text-xs font-semibold text-amethyst-700 mt-0.5">{p.roleTag}</p>

                <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed">
                  {p.tagline}
                </p>

                {/* Key attributes chip */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                  {p.careerBreakMonths > 0 && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {p.careerBreakMonths} Mo Break
                    </span>
                  )}
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                    {p.location.split(',')[0]}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-rosegold-50 text-rosegold-700 border border-rosegold-200">
                    {p.skills[0]?.name}
                  </span>
                </div>
              </div>

              {/* Action Prompt */}
              <div className="mt-6 flex items-center justify-between text-xs font-bold text-amethyst-800 group-hover:text-rosegold-600 transition">
                <span>Simulate Journey</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Enterprise Architecture Pillars */}
      <section className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/80 space-y-8">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-bold font-display text-stone-900">
            Enterprise Pillars Built for India's Scale
          </h3>
          <p className="text-sm text-stone-600 mt-1">
            Engineered to bridge India's gender workforce gap through privacy-preserving algorithms, verified credentials, and regional accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white/70 border border-stone-200/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amethyst-100 text-amethyst-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-amethyst-800" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">DPDP Act 2023 Masked Privacy</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Recruiters never see unmasked phone numbers or emails until direct candidate opt-in, eliminating harassment and hiring bias.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 border border-stone-200/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rosegold-100 text-rosegold-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5 text-rosegold-600" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">3-Month Retention Tracking</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We verify employment stability 90 days after placement, achieving a benchmark 94.2% verified retention rate across India.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 border border-stone-200/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5 text-indigo-700" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">Lifelong Career Verification</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              A 20-30 year tamper-proof record of education, career breaks, returnships, and board qualifications with instant verification.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

