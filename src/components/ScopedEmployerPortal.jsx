import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Phone, 
  ShieldCheck, 
  TrendingUp, 
  UserCheck, 
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function ScopedEmployerPortal({ 
  applications, 
  programmes, 
  onUpdateRetention, 
  language 
}) {
  const [selectedPartner, setSelectedPartner] = useState('Microsoft India');
  const [retentionFilter, setRetentionFilter] = useState('ALL');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const partners = ['Microsoft India', 'Tata Consultancy Services', 'HDFC Group'];

  // Scope candidates strictly to the logged-in corporate partner
  const scopedApps = applications.filter(a => 
    a.partnerName.toLowerCase().includes(selectedPartner.toLowerCase())
  );

  // Mask PII Helper
  const maskEmail = (email) => {
    if (!email) return '***@***.com';
    return email.replace(/^(.)(.*)(@.*)$/, (_, first, middle, domain) => {
      return first + '*'.repeat(Math.min(middle.length, 5)) + domain;
    });
  };

  const maskPhone = (phone) => {
    if (!phone) return '+91 ***** *****';
    return phone.replace(/(\+91\s?\d{2})\d{4}(\d{4})/, '$1 **** $2');
  };

  // Retention stats
  const placedCandidates = scopedApps.filter(a => a.stage === 'Placed');
  const verifiedRetained = placedCandidates.filter(
    a => a.postPlacementRetention?.status === 'Verified_Employed'
  );

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header & Scoped Partner Switcher */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5 text-indigo-700" />
            <span>Scoped Corporate Partner Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            {selectedPartner} Talent Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Scoped strictly to your enterprise cohort candidates with DPDP-compliant masked contact privacy.
          </p>
        </div>

        {/* Corporate Partner Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Enterprise:</span>
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-2xl border border-stone-200">
            {partners.map(p => (
              <button
                key={p}
                onClick={() => setSelectedPartner(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedPartner === p
                    ? 'bg-white text-indigo-950 shadow-sm border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {p.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Strict Privacy Banner (DPDP Act 2023) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amethyst-900 via-indigo-900 to-amethyst-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-emeraldsuccess-400" />
          </div>
          <div className="text-xs">
            <p className="font-bold flex items-center gap-2">
              Strict PII Data Masking Enforced
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold">
                DPDP 2023 Compliant
              </span>
            </p>
            <p className="text-stone-300 mt-0.5">
              Personal emails and phone numbers are securely masked to eliminate hiring bias and unsolicited outreach.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-xl text-stone-200">
          <Lock className="w-3.5 h-3.5 text-rosegold-400" />
          <span>Zero Unconsented Leaks</span>
        </div>
      </div>

      {/* Partner Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-2xl border border-white/80">
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Scoped Pipeline Candidates</p>
          <p className="text-2xl font-extrabold text-stone-900 mt-1 font-display">{scopedApps.length}</p>
          <span className="text-[11px] text-amethyst-700 font-semibold">Active in your sponsored programmes</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/80">
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Placed / Converted Hires</p>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1 font-display">{placedCandidates.length}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Full-time transition completed</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/80">
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">3-Month Retention Rate</p>
          <p className="text-2xl font-extrabold text-indigo-700 mt-1 font-display">
            {placedCandidates.length > 0
              ? `${Math.round((verifiedRetained.length / placedCandidates.length) * 100)}%`
              : '94% Benchmark'}
          </p>
          <span className="text-[11px] text-indigo-600 font-semibold">Verified employed post-90 days</span>
        </div>
      </div>

      {/* Candidate Roster with PII Masking & 3-Month Retention Check-In */}
      <div className="glass-panel rounded-3xl border border-white/90 overflow-hidden shadow-sm">
        
        <div className="p-6 border-b border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Candidate Dossiers & 90-Day Retention Check-in
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Review current funnel status and verify 3-month post-placement outcomes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Filter Retention:</span>
            <select
              value={retentionFilter}
              onChange={(e) => setRetentionFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl font-semibold text-stone-700 focus:outline-none"
            >
              <option value="ALL">All Outcomes</option>
              <option value="Verified_Employed">Verified Employed (90-Day)</option>
              <option value="Pending">Pending Audit</option>
            </select>
          </div>
        </div>

        {/* Candidate List */}
        <div className="divide-y divide-stone-100">
          {scopedApps
            .filter(a => retentionFilter === 'ALL' || a.postPlacementRetention?.status === retentionFilter)
            .map((app) => {
              const isPlaced = app.stage === 'Placed';
              const retentionStatus = app.postPlacementRetention?.status || 'Pending';

              return (
                <div key={app.id} className="p-6 hover:bg-white/60 transition flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Candidate Left Section */}
                  <div className="flex items-start gap-4">
                    <img
                      src={app.avatar}
                      alt={app.applicantName}
                      className="w-12 h-12 rounded-2xl object-cover border border-stone-200 shadow-xs"
                    />

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-bold text-stone-900">
                          {app.applicantName}
                        </h4>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amethyst-100 text-amethyst-900 border border-amethyst-200">
                          {app.applicantStage}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                          Stage: {app.stage}
                        </span>
                      </div>

                      {/* Masked Contact Details */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-500 pt-0.5">
                        <span className="flex items-center gap-1.5 bg-stone-100/80 px-2 py-0.5 rounded-md">
                          <Mail className="w-3 h-3 text-stone-400" />
                          <span className="text-stone-800 font-semibold">{maskEmail(app.applicantEmail)}</span>
                          <Lock className="w-2.5 h-2.5 text-stone-400 ml-0.5" />
                        </span>

                        <span className="flex items-center gap-1.5 bg-stone-100/80 px-2 py-0.5 rounded-md">
                          <Phone className="w-3 h-3 text-stone-400" />
                          <span className="text-stone-800 font-semibold">{maskPhone(app.applicantPhone)}</span>
                          <Lock className="w-2.5 h-2.5 text-stone-400 ml-0.5" />
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {app.careerBreakMonths > 0 && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            {app.careerBreakMonths} Mo Career Break Honored
                          </span>
                        )}
                        {app.skills.slice(0, 3).map((sk, skIdx) => (
                          <span key={skIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-stone-700 border border-stone-200">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3-Month Retention Verification Check-In Module */}
                  <div className="w-full lg:w-96 p-4 rounded-2xl bg-stone-50 border border-stone-200/90 text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        {t.retentionStatus} (90-Day Audit)
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        retentionStatus === 'Verified_Employed'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : retentionStatus === 'Transitioned'
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}>
                        {retentionStatus.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-stone-700">{t.stillEmployed}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onUpdateRetention(app.id, 'Verified_Employed', 'Confirmed retention audit passed with high manager rating.')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                            retentionStatus === 'Verified_Employed'
                              ? 'bg-emerald-700 text-white'
                              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          ✓ Yes, Retained
                        </button>
                        <button
                          onClick={() => onUpdateRetention(app.id, 'Attention_Needed', 'Follow-up requested by HR partner.')}
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                            retentionStatus === 'Attention_Needed'
                              ? 'bg-amber-700 text-white'
                              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          Review
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-600 italic bg-white p-2 rounded-xl border border-stone-200">
                      "{app.postPlacementRetention?.notes || 'Initial screening complete; review milestone scheduled.'}"
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-stone-400">
                      <span>Target Audit: {app.postPlacementRetention?.threeMonthReviewDate || 'Q3 2026'}</span>
                      <span>Updated: {app.postPlacementRetention?.lastUpdated || 'Recent'}</span>
                    </div>
                  </div>

                </div>
              );
            })}
        </div>

      </div>

    </div>
  );
}

