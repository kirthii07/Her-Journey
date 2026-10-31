import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Award,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Clock,
  Plus,
  Building2,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import FunnelChart from '../components/FunnelChart';
import StatusBadge from '../components/StatusBadge';
import MaskedField from '../components/MaskedField';

/* Animated counter hook */
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  useEffect(() => {
    if (target === undefined || target === null) return;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return count;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.45, ease: 'easeOut' } })
};

function KpiCard({ label, value, sub, subColor, delay }) {
  const animated = useCountUp(value ?? 0);
  return (
    <motion.div
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="card overflow-hidden flex"
    >
      <div className="w-1.5 flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #3B1C32, #5A1B46)' }} />
      <div className="p-6 flex-1">
        <span className="text-label text-charcoal-500 uppercase tracking-wider block">{label}</span>
        <div className="text-4xl font-extrabold font-mono mt-2 text-plum-800">
          {animated}
        </div>
        <span className="text-caption block mt-1.5 font-semibold" style={{ color: subColor || '#716873' }}>{sub}</span>
      </div>
    </motion.div>
  );
}

export default function ManagerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getManagerDashboard();
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
          <p className="text-lg font-semibold text-plum-900">Unable to load Manager Dashboard</p>
          <p className="text-sm text-charcoal-500">{error}</p>
          <button onClick={loadData} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-plum-800 hover:bg-plum-900 transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { stats, flagshipProgramme, funnelData, activeProgrammes, recentApplications } = data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b border-ivory-300 pb-7">
        <div>
          <span className="section-eyebrow">Programme Operations &amp; Governance</span>
          <h1 className="text-h1 font-display text-plum-900 mt-2">Programme Director</h1>
          <p className="text-body-lg text-charcoal-500 mt-2 max-w-2xl">
            Managing lifelong cohorts with zero data duplication, verified consent, and longitudinal outcomes.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Link to="/manager/eligible-members" className="btn-secondary btn-sm">
            Scan Eligible
          </Link>
          <Link to="/manager/create-programme" className="btn-primary btn-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create Programme</span>
          </Link>
        </div>
      </div>

      {/* Amber Alert Banner */}
      <AnimatePresence>
        {stats?.pendingReviews > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-amber-50 border border-amber-300 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-amber-950 text-base">
                  {stats.pendingReviews} Ambiguous Duplicate Record(s) Require Human Verification
                </span>
                <p className="text-amber-800 text-xs mt-0.5">
                  Our strict 1-identity data integrity policy halts automatic merging for unclear profiles.
                </p>
              </div>
            </div>
            <Link
              to="/manager/review-queue"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition shrink-0 shadow-sm"
            >
              Open Review Queue →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        <KpiCard label="Unified Member Records" value={stats?.totalMembers ?? 5} sub="Zero Duplicate Profiles" subColor="#27845D" delay={0} />
        <KpiCard label="Active Cohorts" value={stats?.totalProgrammes ?? 3} sub="Returnship &amp; Leadership" subColor="#C98486" delay={1} />
        <KpiCard label="Active Applications" value={stats?.totalApplications ?? 2} sub="Live in Stage Workflow" subColor="#ED6A5A" delay={2} />
        <KpiCard label="Career Placements" value={stats?.placedApplications ?? 1} sub="Longitudinal Tracking" subColor="#27845D" delay={3} />
      </div>

      {/* Funnel & Flagship Programme Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
          <FunnelChart data={funnelData} title="Returnship 2026 — Conversion Funnel" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="card space-y-5"
        >
          <div className="flex items-center justify-between pb-4 border-b border-ivory-300">
            <div>
              <span className="section-eyebrow mb-1">Flagship Cohort</span>
              <h3 className="text-h3 font-display text-plum-900 mt-1">
                {flagshipProgramme?.name || 'Returnship 2026'}
              </h3>
            </div>
            <StatusBadge status="Active" />
          </div>

          <p className="text-body text-charcoal-600 leading-relaxed">
            {flagshipProgramme?.description}
          </p>

          <div className="p-5 rounded-2xl bg-ivory-200 border border-ivory-300 text-sm space-y-2.5">
            {[
              { label: 'Hiring Partner', val: flagshipProgramme?.partnerName || 'Acme Corp' },
              { label: 'Target Life Stage', val: flagshipProgramme?.targetLifeStage?.join(', ') },
              { label: 'Required Career Break', val: `>= ${flagshipProgramme?.careerBreakRequirementMonths || 12} Months` },
              { label: 'Skills Evaluated', val: flagshipProgramme?.requiredSkills?.join(' OR ') },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-charcoal-500 font-medium">{label}:</span>
                <span className="font-bold text-plum-900">{val}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-ivory-300">
            <Link to="/manager/eligible-members" className="text-sm font-bold text-plum-700 hover:text-plum-900 hover:underline transition">
              Scan Eligible Members →
            </Link>
            <Link
              to="/manager/programmes/returnship"
              className="btn-primary btn-sm"
            >
              Manage Cohort Stages →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Recent Applications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="card space-y-5"
      >
        <div className="flex items-center justify-between pb-4 border-b border-ivory-300">
          <div>
            <h3 className="text-h3 font-display text-plum-900">Active Programme Applicants</h3>
            <p className="text-body-sm text-charcoal-500 mt-1">
              Contact credentials automatically masked to ensure privacy compliance.
            </p>
          </div>
          <Link to="/manager/programmes/returnship" className="text-xs font-bold hover:underline text-plum-700">
            View All Cohorts
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ivory-300 text-charcoal-400 uppercase tracking-wider font-bold text-xs">
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Masked Contact</th>
                <th className="py-3 px-4">Career Stage</th>
                <th className="py-3 px-4">Programme</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {recentApplications && recentApplications.length > 0 ? (
                recentApplications.map((app, i) => (
                  <motion.tr
                    key={app._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.07 }}
                    className="hover:bg-plum-800/5 transition"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm"
                          style={{ background: 'linear-gradient(135deg, #3B1C32, #5A1B46)' }}
                        >
                          {(app.memberId?.name || '?').charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold block text-plum-900">{app.memberId?.name}</span>
                          <span className="text-caption text-charcoal-500">{app.memberId?.city}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 space-y-1">
                      <MaskedField value={app.memberId?.email} />
                      <br />
                      <MaskedField value={app.memberId?.phone} />
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-charcoal-800">{app.memberId?.careerStage}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-plum-800">{app.programmeId?.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={app.currentStage} />
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to="/manager/programmes/returnship"
                        className="btn-ghost btn-sm"
                      >
                        Move Stage
                      </Link>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-charcoal-400 text-sm">
                    No applications currently active.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Quick Actions Footer */}
        <div className="pt-4 border-t border-ivory-300 flex items-center gap-4">
          <Link to="/manager/create-programme" className="btn-primary btn-sm flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> <span>Create New Programme</span>
          </Link>
          <Link to="/manager/review-queue" className="btn-secondary btn-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Review Queue</span>
            {stats?.pendingReviews > 0 && (
              <span className="ml-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {stats.pendingReviews}
              </span>
            )}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
