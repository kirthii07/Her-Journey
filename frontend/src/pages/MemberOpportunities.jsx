import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import WhyModal from '../components/WhyModal';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-pulse">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <div className="h-5 w-24 rounded-full bg-gray-100" />
            <div className="h-5 w-32 rounded-full bg-gray-100" />
          </div>
          <div className="h-6 w-3/4 rounded bg-gray-100" />
          <div className="h-4 w-1/2 rounded bg-gray-100" />
          <div className="h-16 rounded bg-gray-100" />
          <div className="flex gap-2">
            <div className="h-5 w-16 rounded-full bg-gray-100" />
            <div className="h-5 w-20 rounded-full bg-gray-100" />
          </div>
        </div>
        <div className="space-y-2 shrink-0">
          <div className="h-8 w-32 rounded-lg bg-gray-100" />
          <div className="h-9 w-36 rounded-xl bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

function MatchBadge({ score }) {
  const color =
    score >= 90
      ? { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' }
      : score >= 70
      ? { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' }
      : { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${color.bg} ${color.text} ${color.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
      {score}% Match
    </span>
  );
}

function WhyPanel({ opp, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Why you&apos;re seeing this
          </h4>
          <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600 font-medium">
            Hide ✕
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {opp.reasons?.map((r, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100"
            >
              <p className="text-xs font-semibold text-gray-700">{r.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{r.detail}</p>
            </div>
          ))}
          {(!opp.reasons || opp.reasons.length === 0) && (
            <>
              <div className="bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700">Career Stage</p>
                <p className="text-xs text-gray-500 mt-0.5">Matched your current stage</p>
              </div>
              <div className="bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700">Skills</p>
                <p className="text-xs text-gray-500 mt-0.5">Skills align with role requirements</p>
              </div>
              <div className="bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700">Location</p>
                <p className="text-xs text-gray-500 mt-0.5">Available in your region</p>
              </div>
            </>
          )}
        </div>
        <p className="mt-3 text-[11px] text-gray-400 flex items-center gap-1">
          <span>🔒</span>
          Rule-based deterministic matching — no opaque AI scoring
        </p>
      </div>
    </motion.div>
  );
}

export default function MemberOpportunities() {
  const { currentMember, currentUser } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWhyOpp, setSelectedWhyOpp] = useState(null);
  const [expandedWhy, setExpandedWhy] = useState(null);
  const [applied, setApplied] = useState({});

  const memberId = currentMember?._id || currentUser?.memberId;

  useEffect(() => {
    const fetchOpps = async () => {
      if (!memberId) return;
      setLoading(true);
      try {
        const data = await api.getOpportunities(memberId);
        setOpportunities(data.opportunities || []);
      } catch (err) {
        console.error('Failed to load opportunities:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOpps();
  }, [memberId]);

  const handleApply = (oppId) => {
    setApplied((prev) => ({ ...prev, [oppId]: true }));
  };

  const toggleWhy = (id) => {
    setExpandedWhy((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 py-8"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 border-b pb-6"
        style={{ borderColor: '#EFEAE3' }}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5"
          style={{ backgroundColor: '#FAF5FA', color: '#702654', borderColor: '#E8D1E8' }}>
          ✨ Deterministic Matching Engine
        </div>
        <h1
          className="text-page-headline font-serif font-bold text-plum-950 mb-2"
        >
          Your Career Opportunities
        </h1>
        <p className="text-body-lg text-charcoal-600 max-w-2xl leading-relaxed">
          Targeted returnships, fellowships, and leadership roles — matched strictly by your
          career stage and verified skills without repeated paperwork.
        </p>
      </motion.div>

      {/* Opportunities */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : opportunities.length > 0 ? (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {opportunities.map((opp) => (
            <motion.div
              key={opp.id}
              variants={fadeUp}
              className="bg-white rounded-2xl border shadow-sm overflow-hidden transition-shadow hover:shadow-md"
              style={{ borderColor: '#F0EBF0' }}
            >
              {/* Accent bar */}
              <div
                className="h-1"
                style={{
                  background:
                    opp.matchScore >= 90
                      ? 'linear-gradient(90deg, #4A154B, #8E4467)'
                      : opp.matchScore >= 70
                      ? 'linear-gradient(90deg, #8E4467, #E06D53)'
                      : '#e5e7eb',
                }}
              />

              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left */}
                  <div className="flex-1 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                        style={{
                          background: 'rgba(74,21,75,0.06)',
                          color: '#4A154B',
                          borderColor: 'rgba(74,21,75,0.15)',
                        }}
                      >
                        {opp.type}
                      </span>
                      <MatchBadge score={opp.matchScore} />
                    </div>

                    <h3
                      className="text-card-headline font-serif font-bold text-plum-950"
                    >
                      {opp.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-charcoal-500">
                      <span className="flex items-center gap-1.5 font-bold text-plum-900">
                        🏢 {opp.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        📍 {opp.location}
                      </span>
                      {opp.stipend && (
                        <span className="font-bold text-charcoal-900 font-mono">
                          {opp.stipend}
                        </span>
                      )}
                    </div>

                    <p className="text-supporting text-charcoal-700 leading-relaxed">
                      {opp.description}
                    </p>

                    {opp.tags && opp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {opp.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-0.5 rounded-lg border font-medium"
                            style={{
                              background: '#FAF8F5',
                              borderColor: '#E5DFE5',
                              color: '#4B5563',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expanded Why panel */}
                    <AnimatePresence>
                      {expandedWhy === opp.id && (
                        <WhyPanel opp={opp} onClose={() => setExpandedWhy(null)} />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 shrink-0">
                    <button
                      onClick={() => toggleWhy(opp.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold rounded-lg px-2.5 py-1.5 transition-colors"
                      style={{ color: '#8E4467', background: expandedWhy === opp.id ? 'rgba(142,68,103,0.08)' : 'transparent' }}
                    >
                      ❓ Why this?
                    </button>

                    {applied[opp.id] ? (
                      <span
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold"
                        style={{ background: '#F0FDF4', color: '#16a34a', border: '1px solid #bbf7d0' }}
                      >
                        ✓ Applied
                      </span>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleApply(opp.id)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition"
                        style={{ background: 'linear-gradient(135deg, #4A154B, #8E4467)' }}
                      >
                        Apply with 1-Identity →
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-16 text-center bg-white rounded-2xl border"
          style={{ borderColor: '#F0EBF0' }}
        >
          <div className="text-5xl mb-4">💼</div>
          <h4 className="text-lg font-bold mb-2" style={{ color: '#1E2229', fontFamily: "'DM Serif Display', serif" }}>
            No opportunities matched yet
          </h4>
          <p className="text-sm max-w-xs mx-auto" style={{ color: '#6B7280' }}>
            Add more skills or update your career break details in your profile to expand
            recommendations.
          </p>
          <button
            className="mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #4A154B, #8E4467)' }}
            onClick={() => window.location.assign('/profile')}
          >
            Update Profile
          </button>
        </motion.div>
      )}

      {/* Legacy modal (kept for compatibility) */}
      <WhyModal
        opportunity={selectedWhyOpp}
        isOpen={Boolean(selectedWhyOpp)}
        onClose={() => setSelectedWhyOpp(null)}
      />
    </div>
  );
}
