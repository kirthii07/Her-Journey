import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Briefcase,
  Users,
  Clock,
  FileCheck,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  MapPin,
  Calendar,
  Compass,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import Timeline from '../components/Timeline';
import StatusBadge from '../components/StatusBadge';
import CertificateModal from '../components/CertificateModal';
import WhyModal from '../components/WhyModal';
import OutcomeCheckinModal from '../components/OutcomeCheckinModal';
import { CardSkeleton, TimelineSkeleton } from '../components/Skeleton';

export default function MemberDashboard() {
  const { currentMember, currentUser } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedWhyOpp, setSelectedWhyOpp] = useState(null);
  const [checkinOpen, setCheckinOpen] = useState(false);

  const memberId = currentMember?._id || currentUser?.memberId;

  const loadDashboard = async () => {
    if (!memberId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await api.getMemberDashboard(memberId);
      setDashboardData(data);
    } catch (err) {
      console.error('Failed to load member dashboard:', err);
      setError(err.message || 'Failed to load member dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (memberId) {
      loadDashboard();
    } else {
      setLoading(false);
    }
  }, [memberId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 page-enter">
        <div className="h-52 rounded-3xl shimmer" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CardSkeleton className="h-64" />
            <TimelineSkeleton />
          </div>
          <div className="space-y-6">
            <CardSkeleton className="h-80" />
            <CardSkeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 max-w-xl mx-auto my-16 card card-body text-center space-y-5">
        <AlertCircle className="w-12 h-12 text-coral-500 mx-auto" />
        <h3 className="text-h3 font-display text-charcoal-900">We couldn&apos;t load your journey</h3>
        <p className="text-body text-charcoal-500">{error}</p>
        <button onClick={loadDashboard} className="btn-primary btn-sm mx-auto">
          Try Again
        </button>
      </div>
    );
  }

  const { member, currentProgramme, currentApplication, profileCompletion, timeline, certificates, opportunities, outcomes } = dashboardData || {};

  const firstName = member?.name?.split(' ')[0] || 'Priya';
  const isPlaced = currentApplication?.currentStage === 'Placed';
  const stages = currentProgramme?.stages || ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed'];
  const currentStageIndex = stages.indexOf(currentApplication?.currentStage || 'Sessions');

  // SVG Progress Circle
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((profileCompletion || 85) / 100) * circumference;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 page-enter">

      {/* ── 1. Hero Welcome Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-warm rounded-3xl p-8 sm:p-12 text-white shadow-xl overflow-hidden relative"
      >
        {/* Decorative glow blobs */}
        <div
          className="absolute -right-24 -top-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #ED6A5A 0%, transparent 70%)' }}
        />
        <div
          className="absolute -left-16 -bottom-20 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #C98486 0%, transparent 70%)' }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          {/* Left */}
          <div className="space-y-5">
            {/* Eyebrow pill */}
            <div className="glass-dark inline-flex items-center gap-2 px-4 py-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-coral-300" />
              <span className="text-label font-bold uppercase tracking-wider text-white/90">
                One Identity • Lifelong Career Journey
              </span>
            </div>

            <h1 className="text-h1 font-display text-white">
              Welcome back, {firstName}.
            </h1>

            <p className="text-body-lg text-white/80 max-w-xl leading-relaxed">
              Your next chapter is unfolding. HerJourney keeps every workshop, mentor conversation,
              and hiring milestone connected in your lifelong record.
            </p>

            {/* Persona badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-label font-bold uppercase bg-coral-500 text-white shadow-sm">
                Stage: {member?.careerStage?.toUpperCase() || 'RETURNER'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-label font-semibold bg-white/10 border border-white/15 text-white/90">
                <MapPin className="w-3.5 h-3.5 text-coral-300" />
                {member?.city || 'Bengaluru'}
              </span>
              {member?.careerBreakMonths > 0 && (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-label font-semibold bg-white/10 border border-white/15 text-white/90">
                  <Calendar className="w-3.5 h-3.5 text-rose-300" />
                  Career Break: {Math.round(member.careerBreakMonths / 12)} Yrs ({member.careerBreakMonths} Mo)
                </span>
              )}
            </div>
          </div>

          {/* Right: Profile Completeness */}
          <div className="glass-dark p-6 sm:p-7 rounded-3xl flex items-center gap-5 shrink-0 self-start lg:self-center">
            <div className="relative w-22 h-22 flex items-center justify-center shrink-0">
              <svg width="88" height="88" className="-rotate-90">
                <circle cx="44" cy="44" r={radius} className="stroke-white/20" strokeWidth="7" fill="transparent" />
                <circle
                  cx="44" cy="44" r={radius}
                  stroke="#ED6A5A"
                  strokeWidth="7"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>
              <span className="absolute font-display font-bold text-2xl text-white">
                {profileCompletion || 85}%
              </span>
            </div>
            <div>
              <span className="text-label font-bold uppercase tracking-widest text-white/60 block">
                Profile Readiness
              </span>
              <h4 className="text-h3 font-display text-white mt-0.5">Unified Record</h4>
              <Link
                to="/member/profile"
                className="inline-flex items-center gap-1 text-body-sm font-bold text-coral-300 hover:text-white mt-2 transition-colors"
              >
                View Profile <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. Active Programme Card ── */}
      {currentProgramme && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card card-body space-y-6"
        >
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-ivory-400">
            <div>
              <span className="section-eyebrow">CURRENT PROGRAMME</span>
              <h2 className="text-h2 font-display text-plum-900 mt-1">{currentProgramme.name}</h2>
              <p className="text-body-sm text-charcoal-500 mt-1">
                Sponsored by <strong className="text-charcoal-800">{currentProgramme.partnerName || 'Acme Corp'}</strong> · Reentry Track
              </p>
            </div>
            <StatusBadge status={currentApplication?.currentStage || 'Sessions'} />
          </div>

          {/* Stage Stepper — Desktop */}
          <div className="hidden sm:block">
            <div className="flex items-center justify-between text-body-sm mb-5 text-charcoal-600 font-medium">
              <span>Cohort Progression Milestones</span>
              <span className="font-bold text-plum-900 font-mono">
                Stage {Math.max(1, currentStageIndex + 1)} of {stages.length}
              </span>
            </div>

            <div className="flex items-center justify-between relative py-4">
              {/* Track base */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-ivory-400 z-0" />
              {/* Progress fill */}
              <div
                className="absolute left-6 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-plum z-0 transition-all duration-700"
                style={{ width: `${Math.max(0, (currentStageIndex / Math.max(stages.length - 1, 1)) * 100)}%` }}
              />

              {stages.map((st, idx) => {
                const isDone = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div key={st} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDone
                          ? 'bg-sage-500 text-white shadow-sm'
                          : isCurrent
                          ? 'bg-plum-800 text-white ring-4 ring-plum-100 shadow-md scale-110 animate-pulse_soft'
                          : 'bg-white text-charcoal-400 border-2 border-ivory-400'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isCurrent ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-charcoal-300" />
                      )}
                    </div>
                    <span
                      className={`mt-2.5 text-caption tracking-tight text-center max-w-[70px] ${
                        isCurrent
                          ? 'text-plum-900 font-bold'
                          : isDone
                          ? 'text-charcoal-600 font-medium'
                          : 'text-charcoal-400'
                      }`}
                    >
                      {st}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stage Stepper — Mobile */}
          <div className="sm:hidden flex items-center justify-between bg-ivory-200 rounded-2xl px-4 py-3 border border-ivory-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-coral-500 animate-pulse" />
              <span className="text-body-sm text-charcoal-600 font-medium">
                Step {currentStageIndex + 1}/{stages.length} · {currentApplication?.currentStage || stages[currentStageIndex]}
              </span>
            </div>
            <StatusBadge status={currentApplication?.currentStage || 'Sessions'} />
          </div>

          {/* Action strip */}
          <div className="bg-ivory-200 rounded-2xl p-5 border border-ivory-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-body-sm font-bold text-plum-900 block">
                {currentApplication?.currentStage === 'Sessions'
                  ? 'Cohort Workshop Attendance:'
                  : currentApplication?.currentStage === 'Placed'
                  ? 'Employment Reentry Status:'
                  : 'Current Action:'}
              </span>
              <p className="text-body-sm text-charcoal-600 leading-relaxed">
                {currentApplication?.currentStage === 'Sessions'
                  ? `${currentApplication.attendance?.filter(s => s.present).length || 2} of ${currentApplication.attendance?.length || 3} workshops verified present by Programme Director.`
                  : currentApplication?.currentStage === 'Placed'
                  ? `Successfully placed as ${currentApplication.placedRole || 'Senior Product Manager'} at ${currentApplication.placedCompany || 'Acme Corp'}!`
                  : `Currently active in the ${currentApplication?.currentStage} review phase.`}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {certificates && certificates.length > 0 && (
                <button onClick={() => setSelectedCert(certificates[0])} className="btn-primary btn-sm gap-2">
                  <Award className="w-4 h-4" />
                  View Certificate
                </button>
              )}
              {isPlaced && (
                <button onClick={() => setCheckinOpen(true)} className="btn-secondary btn-sm gap-2">
                  <Briefcase className="w-4 h-4" />
                  3-Month Check-In
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── 3. Main 3-Column Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left: Career Journey Timeline */}
        <div className="lg:col-span-2">
          <div className="card card-body space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-ivory-400">
              <div>
                <span className="section-eyebrow">YOUR CAREER STORY</span>
                <h2 className="text-h2 font-display text-plum-900 mt-1">Career Journey</h2>
              </div>
              <p className="text-body-sm text-charcoal-400 italic">
                &quot;Your career is a story, not a collection of forms.&quot;
              </p>
            </div>
            <Timeline items={timeline} />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">

          {/* Curated Opportunities */}
          <div className="card card-body space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-ivory-400">
              <div>
                <span className="section-eyebrow">RULE-BASED MATCH</span>
                <h3 className="text-h3 font-display text-plum-900 mt-1">Opportunities for You</h3>
              </div>
              <Link to="/member/opportunities" className="text-body-sm font-bold text-plum-700 hover:text-plum-900 transition-colors">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {opportunities && opportunities.length > 0 ? (
                opportunities.slice(0, 3).map((opp) => (
                  <div
                    key={opp.id}
                    className="bg-ivory-200 rounded-2xl p-4 border border-ivory-400 space-y-2 hover:border-plum-200 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-body-sm font-semibold text-plum-900 leading-snug">{opp.title}</h5>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-caption font-bold border shrink-0 ${
                          opp.matchScore >= 90
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : opp.matchScore >= 70
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                      >
                        {opp.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-caption text-charcoal-500">{opp.company} · {opp.location}</p>
                    <div className="pt-2 border-t border-ivory-400 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedWhyOpp(opp)}
                        className="inline-flex items-center gap-1.5 text-caption font-semibold text-plum-700 hover:text-plum-900 transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        Why this?
                      </button>
                      {opp.stipend && (
                        <span className="text-caption font-bold text-charcoal-700 font-mono">{opp.stipend}</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-body-sm text-charcoal-400 text-center py-4">No opportunities matched yet.</p>
              )}
            </div>
          </div>

          {/* Verified Certificates */}
          <div className="card card-body space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-ivory-400">
              <div>
                <span className="section-eyebrow">CREDENTIALS</span>
                <h3 className="text-h3 font-display text-plum-900 mt-1">Issued Certificates</h3>
              </div>
              <span className="pill-plum text-caption font-mono font-bold">
                {certificates?.length || 0}
              </span>
            </div>

            {certificates && certificates.length > 0 ? (
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div
                    key={cert._id}
                    onClick={() => setSelectedCert(cert)}
                    className="bg-plum-50 rounded-2xl p-4 border border-plum-100 cursor-pointer flex items-center justify-between group hover:border-plum-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-plum-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Award className="w-5 h-5 text-plum-700" />
                      </div>
                      <div>
                        <h5 className="text-body-sm font-bold text-plum-900">{cert.title}</h5>
                        <p className="text-caption text-charcoal-400 font-mono mt-0.5">{cert.certificateNumber}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-ivory-200 rounded-2xl border border-ivory-400">
                <Award className="w-9 h-9 text-charcoal-300 mx-auto mb-3" />
                <p className="text-body-sm font-bold text-charcoal-700">No certificates issued yet.</p>
                <p className="text-caption text-charcoal-400 mt-1">
                  Complete cohort sessions to earn your verified lifelong credential.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Modals ── */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
      />
      <WhyModal
        opportunity={selectedWhyOpp}
        isOpen={Boolean(selectedWhyOpp)}
        onClose={() => setSelectedWhyOpp(null)}
      />
      <OutcomeCheckinModal
        application={currentApplication}
        isOpen={checkinOpen}
        onClose={() => setCheckinOpen(false)}
        onOutcomeReported={() => loadDashboard()}
      />
    </div>
  );
}
