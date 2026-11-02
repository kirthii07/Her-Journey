import React, { useState } from 'react';
import { 
  Award, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  GraduationCap, 
  HelpCircle, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  ChevronRight, 
  Clock, 
  FileText,
  UserCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function MemberWorkspace({ 
  currentPersona, 
  personas, 
  onSelectPersona,
  onOpenCertificate,
  onOpenExplainer,
  language
}) {
  const [activeSubTab, setActiveSubTab] = useState('timeline');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'education': return GraduationCap;
      case 'break': return Clock;
      case 'work': return Briefcase;
      case 'leadership': return Award;
      default: return Sparkles;
    }
  };

  const getTimelineBadgeColor = (type) => {
    switch (type) {
      case 'education': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'break': return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'work': return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'leadership': return 'bg-rosegold-100 text-rosegold-900 border-rosegold-300';
      default: return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Quick Persona Switcher Bar */}
      <div className="glass-panel p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-white/90 shadow-sm">
        <div className="flex items-center space-x-2 text-xs font-bold text-stone-500 uppercase tracking-wider pl-1">
          <Zap className="w-4 h-4 text-amethyst-700" />
          <span>Active Persona:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {personas.map((p) => {
            const isSelected = p.id === currentPersona.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPersona(p.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-amethyst-900 text-white shadow-md'
                    : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200/80'
                }`}
              >
                <img src={p.avatar} alt={p.name} className="w-5 h-5 rounded-full object-cover" />
                <span>{p.name.split(' ')[0]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-amethyst-700 text-amethyst-100' : 'bg-stone-100 text-stone-600'
                }`}>
                  {p.lifecycleStage}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Unified Profile Header Card */}
      <div className="glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-white/90 relative overflow-hidden">
        
        {/* Rose gold & purple background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-rosegold-200/30 to-amethyst-200/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={currentPersona.avatar}
                alt={currentPersona.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-xl"
              />
              <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-emeraldsuccess-500 text-white text-[10px] font-extrabold border-2 border-white flex items-center gap-1 shadow-xs">
                <CheckCircle2 className="w-2.5 h-2.5" /> Verified
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                  {currentPersona.name}
                </h2>
                <span className="px-3 py-1 rounded-xl bg-amethyst-100 text-amethyst-900 text-xs font-bold border border-amethyst-200">
                  {currentPersona.lifecycleStage} Stage
                </span>
                {currentPersona.careerBreakMonths > 0 && (
                  <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    {currentPersona.careerBreakMonths} Months Career Break Honored
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-amethyst-800">
                {currentPersona.currentRole}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-medium pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" /> {currentPersona.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-stone-400" /> {currentPersona.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-stone-400" /> {currentPersona.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Badge Capsule */}
          <div className="w-full md:w-auto p-4 rounded-2xl bg-white/80 border border-stone-200/80 shadow-xs flex items-center justify-between md:justify-center gap-4">
            <div className="text-left md:text-right">
              <p className="text-[10px] uppercase font-bold text-stone-400">Match Readiness Score</p>
              <p className="text-2xl font-extrabold text-amethyst-900 font-display">
                {currentPersona.matchProfileScore || 96}%
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amethyst-800 to-indigo-700 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5 text-emeraldsuccess-400" />
            </div>
          </div>

        </div>

        {/* Bio */}
        <p className="mt-5 text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed border-t border-stone-100 pt-4">
          {currentPersona.bio}
        </p>

        {/* Verified Skills Bar */}
        <div className="mt-4 pt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-500 mr-1">Verified Competencies:</span>
          {currentPersona.skills.map((skill, sIdx) => (
            <span
              key={sIdx}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white border border-stone-200/90 text-xs font-semibold text-stone-800 shadow-xs"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>{skill.name}</span>
              <span className="text-[10px] text-amethyst-700 font-bold ml-0.5">({skill.level})</span>
            </span>
          ))}
        </div>

      </div>

      {/* Sub-Tabs: Career Timeline vs Verified Credentials vs DPDP Consent */}
      <div className="flex border-b border-stone-200">
        <button
          onClick={() => setActiveSubTab('timeline')}
          className={`pb-3 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 ${
            activeSubTab === 'timeline'
              ? 'border-amethyst-800 text-amethyst-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{t.timelineTitle}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('recommendations')}
          className={`pb-3 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 ${
            activeSubTab === 'recommendations'
              ? 'border-amethyst-800 text-amethyst-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-rosegold-500" />
          <span>Rule-Matched Opportunities ({currentPersona.recommendations.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('consent')}
          className={`pb-3 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 ${
            activeSubTab === 'consent'
              ? 'border-amethyst-800 text-amethyst-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>DPDP Consent Ledger</span>
        </button>
      </div>

      {/* SUB-VIEW 1: Interactive 20-30 Year Career Timeline */}
      {activeSubTab === 'timeline' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-display text-stone-900">
                Continuous Professional Record
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Complete longitudinal timeline spanning education, career breaks, enterprise contributions, and returnships.
              </p>
            </div>
            <span className="text-xs text-stone-500 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Tamper-Proof Record
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-amethyst-200/80 space-y-8 ml-3 sm:ml-4">
            {currentPersona.timelineEvents.map((evt) => {
              const Icon = getTimelineIcon(evt.type);
              const badgeStyle = getTimelineBadgeColor(evt.type);

              return (
                <div key={evt.id} className="relative group">
                  
                  {/* Timeline Node Point */}
                  <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-amethyst-600 shadow-md flex items-center justify-center text-amethyst-800 group-hover:scale-110 group-hover:border-rosegold-500 transition">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>

                  {/* Card Content */}
                  <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/90 hover:shadow-glass-hover transition">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amethyst-800 font-mono">
                          {evt.year}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                          {evt.badge || evt.type}
                        </span>
                      </div>

                      {evt.verified && (
                        <button
                          onClick={() => onOpenCertificate({ ...evt, recipientName: currentPersona.name })}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rosegold-50 hover:bg-rosegold-100 text-rosegold-700 text-xs font-bold border border-rosegold-200 transition"
                        >
                          <Award className="w-3.5 h-3.5 text-rosegold-600" />
                          <span>View Verified Credential</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-stone-900">
                      {evt.title}
                    </h4>
                    <p className="text-xs font-semibold text-stone-600 mt-0.5">
                      {evt.organization}
                    </p>

                    <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                      {evt.description}
                    </p>

                    {evt.credentialId && (
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center gap-2 text-[10px] text-stone-400 font-mono">
                        <span>Credential ID:</span>
                        <span className="font-semibold text-stone-700">{evt.credentialId}</span>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: Rule-Based Opportunity Recommendations + "Why am I seeing this?" */}
      {activeSubTab === 'recommendations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-display text-stone-900">
                Rule-Matched Career Pathways
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Precision matching powered by lifecycle stage eligibility, career break length, and verified skills.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPersona.recommendations.map((rec) => (
              <div 
                key={rec.id}
                className="glass-panel p-6 rounded-3xl border border-white/90 hover:shadow-glass-hover hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={rec.logo}
                        alt={rec.company}
                        className="w-12 h-12 rounded-2xl object-cover border border-stone-200 shadow-xs"
                      />
                      <div>
                        <h4 className="text-base font-bold text-stone-900 leading-snug">
                          {rec.title}
                        </h4>
                        <p className="text-xs font-semibold text-stone-600">{rec.company}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold shrink-0">
                      {rec.matchScore}% Match
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {rec.reason}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {rec.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-lg bg-amethyst-50 text-amethyst-800 border border-amethyst-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 p-3 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs space-y-1">
                    <p className="text-stone-400 font-medium text-[10px] uppercase">Compensation / Grant</p>
                    <p className="font-bold text-stone-900">{rec.salaryOrStipend}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenExplainer(rec, currentPersona)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amethyst-700 hover:text-amethyst-900 transition"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{t.whySeeingThis}</span>
                  </button>

                  <button
                    onClick={() => alert(`Application submitted for ${rec.title} at ${rec.company}! Your masked profile was shared under DPDP consent.`)}
                    className="px-4 py-2 bg-gradient-to-r from-amethyst-800 to-indigo-800 hover:from-amethyst-900 hover:to-indigo-900 text-white rounded-xl text-xs font-bold shadow-sm transition"
                  >
                    Apply Now
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: DPDP Act 2023 Consent Records */}
      {activeSubTab === 'consent' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  Data Protection & Privacy Consent Records (DPDP Act 2023)
                </h3>
                <p className="text-xs text-stone-500">
                  You have full sovereign rights to grant, audit, or revoke recruiter access at any time.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              Fully Compliant
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {currentPersona.consentRecords.map((c) => (
              <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-stone-800">{c.purpose}</p>
                  <p className="text-[11px] text-stone-400">Granted on {c.timestamp} • Schema {c.version}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Consent Active
                  </span>
                  <button
                    onClick={() => alert(`Consent preferences updated for: ${c.purpose}`)}
                    className="text-xs font-semibold text-stone-500 hover:text-stone-800 transition underline"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

