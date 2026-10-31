import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Check,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import FunnelChart from '../components/FunnelChart';
import MaskedField from '../components/MaskedField';
import StatusBadge from '../components/StatusBadge';

export default function PartnerDashboard() {
  const { currentPartner, currentUser } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [verifyingId, setVerifyingId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const partnerId = currentPartner?._id || currentUser?.partnerId;

  const loadData = async () => {
    if (!partnerId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setFeedback(null);
    setError(null);
    try {
      const res = await api.getPartnerDashboard(partnerId);
      setData(res);
    } catch (err) {
      console.error('Failed to load partner dashboard:', err);
      setError(err.message || 'Unable to load partner dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (partnerId) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [partnerId]);

  const handleMarkHired = async (applicationId) => {
    setActionLoadingId(applicationId);
    setFeedback(null);
    try {
      await api.markHired(applicationId, 'Senior Product Manager', 'Acme Corp');
      setFeedback('Candidate successfully marked as Hired! Live state updated across Priya, Programme Manager, and Partner views.');
      await loadData();
    } catch (err) {
      setFeedback(`Failed to update hire status: ${err.message}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleVerifyOutcome = async (outcomeId) => {
    setVerifyingId(outcomeId);
    try {
      await api.verifyOutcome(outcomeId, 'Acme Corp HR Partner', 'Verified through official HR payroll records');
      setFeedback('Employment outcome verified! Status updated from Reported to Verified in permanent impact ledger.');
      await loadData();
    } catch (err) {
      setFeedback(`Failed to verify outcome: ${err.message}`);
    } finally {
      setVerifyingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-plum-200 border-t-plum-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-md mx-auto">
          <p className="text-lg font-semibold text-plum-900">Unable to load Partner Dashboard</p>
          <p className="text-sm text-charcoal-500">{error}</p>
          <button onClick={loadData} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-plum-800 hover:bg-plum-900 transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { partner, programmes, funnel, shortlistedCandidates, outcomes } = data || {};
  const activeProgramme = programmes && programmes.length > 0 ? programmes[0] : null;

  const funnelItems = [
    { stage: 'Invited', count: funnel?.invited || 250, fill: '#42133F' },
    { stage: 'Registered', count: funnel?.registered || 180, fill: '#5A1B46' },
    { stage: 'Participated', count: funnel?.participated || 150, fill: '#702654' },
    { stage: 'Completed', count: funnel?.completed || 120, fill: '#8E4467' },
    { stage: 'Placed', count: funnel?.placed || 45, fill: '#27845D' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Editorial Partner Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden card-3d"
        style={{
          background: 'linear-gradient(135deg, #42133F 0%, #702654 60%, #42133F 100%)'
        }}
      >
        <div 
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(242,140,120,0.2) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/40 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-emerald-400" />
              Employer Partner Talent Portal
            </div>
            <h1 className="text-page-headline font-serif font-bold text-white tracking-tight">
              {partner?.name || 'Acme Corp'} Talent &amp; Reentry Hub
            </h1>
            <p className="text-body-lg text-pink-100 max-w-2xl leading-relaxed font-normal">
              Partner boundary enforced: Access strictly confined to sponsored Returnship cohorts. Candidate phone numbers and personal emails remain safely masked.
            </p>
          </div>

          <div 
            className="p-5 rounded-2xl border text-center min-w-[180px] shrink-0"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <span className="text-xs uppercase tracking-wider font-bold text-pink-200 block">
              Sponsored Cohort
            </span>
            <span className="text-base font-serif font-bold text-white block mt-1">
              {activeProgramme?.name || 'Acme Returnship 2026'}
            </span>
            <span className="text-xs text-emerald-300 font-semibold block mt-1">
              Guaranteed Hiring Track
            </span>
          </div>
        </div>
      </motion.div>

      {/* Live State Alert */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-2xl text-sm flex items-center gap-3 font-medium shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Funnel & Partner Metrics Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <FunnelChart 
          data={funnelItems} 
          title="Sponsored Returnship Conversion Funnel" 
        />

        <div className="bg-white rounded-3xl p-7 border shadow-card space-y-5 card-3d" style={{ borderColor: '#EFEAE3' }}>
          <div className="pb-3 border-b" style={{ borderColor: '#EFEAE3' }}>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#702654' }}>
              Impact Objectives
            </span>
            <h3 className="text-xl font-serif font-bold text-plum-950 mt-1">
              Hiring Commitments &amp; Talent Conversion
            </h3>
          </div>
          <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
            Acme Corp partners with HerJourney to hire mid-to-senior women product leaders returning after career breaks of 1 to 5 years.
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: '#FAF7F3', borderColor: '#E8E1D7' }}>
              <span className="text-xs text-charcoal-400 block font-medium">Placement Commitment</span>
              <span className="text-2xl font-extrabold text-plum-900 font-mono mt-1 block">50 Hires</span>
            </div>
            <div className="p-4 rounded-2xl border bg-emerald-50/70 border-emerald-200">
              <span className="text-xs text-emerald-800 block font-medium">Currently Placed</span>
              <span className="text-2xl font-extrabold text-emerald-950 font-mono mt-1 block">{funnel?.placed || 45}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl border text-xs text-charcoal-600 space-y-1.5" style={{ backgroundColor: '#FAF5FA', borderColor: '#E8D1E8' }}>
            <span className="font-bold text-plum-950 block text-sm">Privacy &amp; Data Sovereignty Safeguard:</span>
            <p className="leading-relaxed">
              Personal contact details remain masked until a formal candidate offer is issued, strictly preventing off-platform poaching.
            </p>
          </div>
        </div>
      </div>

      {/* Shortlisted Candidates Table */}
      <div className="bg-white rounded-3xl p-7 border shadow-card space-y-5" style={{ borderColor: '#EFEAE3' }}>
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: '#EFEAE3' }}>
          <div>
            <h3 className="text-xl font-serif font-bold text-plum-950">Shortlisted Returner Candidates</h3>
            <p className="text-sm text-charcoal-500 mt-1">Evaluated cohort participants ready for partner interviews and hiring offers.</p>
          </div>
          <span className="text-xs font-mono font-bold text-purple-900 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
            {shortlistedCandidates?.length || 0} Candidates
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-charcoal-400 uppercase tracking-wider font-bold text-xs" style={{ borderColor: '#EFEAE3' }}>
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Masked Contact</th>
                <th className="py-3.5 px-4">Career Break</th>
                <th className="py-3.5 px-4">Endorsed Skills</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4 text-right">Partner Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#F3EFE9' }}>
              {shortlistedCandidates && shortlistedCandidates.length > 0 ? (
                shortlistedCandidates.map((cand) => {
                  const isHired = cand.currentStage === 'Placed';
                  return (
                    <tr key={cand._id} className="hover:bg-purple-50/20 transition">
                      <td className="py-4 px-4">
                        <span className="font-bold text-plum-950 block">{cand.memberId?.name}</span>
                        <span className="text-xs text-charcoal-500">{cand.memberId?.city}</span>
                      </td>
                      <td className="py-4 px-4 space-y-1">
                        <MaskedField value={cand.memberId?.email} />
                        <br />
                        <MaskedField value={cand.memberId?.phone} />
                      </td>
                      <td className="py-4 px-4 font-mono text-charcoal-700 font-semibold">
                        {cand.memberId?.careerBreakMonths || 36} Months
                      </td>
                      <td className="py-4 px-4 max-w-[200px]">
                        <div className="flex flex-wrap gap-1.5">
                          {cand.memberId?.skills?.slice(0, 3).map((s, i) => (
                            <span key={i} className="text-xs bg-white px-2 py-0.5 rounded-lg text-charcoal-700 border border-gray-200 font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={cand.currentStage} />
                      </td>
                      <td className="py-4 px-4 text-right">
                        {isHired ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                            <Check className="w-4 h-4 text-emerald-600" />
                            Hired at Acme Corp
                          </span>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleMarkHired(cand._id)}
                            disabled={actionLoadingId === cand._id}
                            className="px-4 py-2 text-white font-bold rounded-xl text-xs shadow-md transition disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
                          >
                            {actionLoadingId === cand._id ? 'Updating...' : 'Mark as Hired'}
                          </motion.button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-charcoal-400">
                    No shortlisted candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outcome Tracking: Reported vs Verified */}
      <div className="bg-white rounded-3xl p-7 border shadow-card space-y-5" style={{ borderColor: '#EFEAE3' }}>
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: '#EFEAE3' }}>
          <div>
            <h3 className="text-xl font-serif font-bold text-plum-950">3-Month Employment Outcome Verification</h3>
            <p className="text-sm text-charcoal-500 mt-1">
              Longitudinal tracking: Women self-report 3-month retention; partners confirm payroll records to substantiate impact audits.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Audited Impact
          </span>
        </div>

        {outcomes && outcomes.length > 0 ? (
          <div className="space-y-4">
            {outcomes.map((outcome) => (
              <div
                key={outcome._id}
                className="p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm"
                style={{ backgroundColor: '#FAF7F3', borderColor: '#E8E1D7' }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-plum-950 text-base">{outcome.memberId?.name}</span>
                    <span className="text-charcoal-300">•</span>
                    <span className="text-charcoal-600">Role: <strong className="text-plum-950">{outcome.currentRole}</strong></span>
                  </div>
                  <p className="text-xs text-charcoal-700">
                    Check-in Prompt: "Are you still working in this role?" → Response: <strong className="text-emerald-800 font-bold">{outcome.response}</strong>
                  </p>
                  <p className="text-xs text-charcoal-400">
                    Reported on: {new Date(outcome.reportedAt).toLocaleDateString('en-IN')}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-charcoal-400 uppercase font-bold block mb-1">Status</span>
                    {outcome.verified ? (
                      <span className="font-bold text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        Verified ✓
                      </span>
                    ) : (
                      <span className="font-bold text-xs text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        Reported (Unverified)
                      </span>
                    )}
                  </div>

                  {!outcome.verified && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleVerifyOutcome(outcome._id)}
                      disabled={verifyingId === outcome._id}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition shadow-sm"
                    >
                      {verifyingId === outcome._id ? 'Verifying...' : 'Mark Verified'}
                    </motion.button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl border text-sm text-charcoal-500" style={{ backgroundColor: '#FAF7F3', borderColor: '#E8E1D7' }}>
            No outcomes reported yet. When placed candidates submit their 3-month check-in, they appear here for partner payroll verification.
          </div>
        )}
      </div>
    </div>
  );
}
