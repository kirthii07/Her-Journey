import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Users, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Building2,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';

export default function MemberProgrammes() {
  const { currentMember, currentUser } = useAuth();
  const [programmes, setProgrammes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState(null);
  const [message, setMessage] = useState(null);
  const [expandedEligibility, setExpandedEligibility] = useState({});

  const memberId = currentMember?._id || currentUser?.memberId;

  const loadData = async () => {
    setLoading(true);
    try {
      const [progs, apps] = await Promise.all([
        api.getProgrammes(),
        memberId ? api.getApplications(`memberId=${memberId}`) : []
      ]);
      setProgrammes(progs || []);
      setApplications(apps || []);
    } catch (err) {
      console.error('Failed to load programmes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [memberId]);

  const handleRegister = async (progId) => {
    if (!memberId) return;
    setRegisteringId(progId);
    setMessage(null);
    try {
      await api.registerForProgramme(progId, memberId);
      setMessage('Successfully registered! Your existing unified profile was reused with zero redundant data entry.');
      await loadData();
    } catch (err) {
      setMessage(`Registration failed: ${err.message}`);
    } finally {
      setRegisteringId(null);
    }
  };

  const getApplicationForProgramme = (progId) => {
    return applications.find(a => (a.programmeId?._id || a.programmeId) === progId);
  };

  const toggleEligibility = (progId) => {
    setExpandedEligibility(prev => ({
      ...prev,
      [progId]: !prev[progId]
    }));
  };

  // Deterministic rule-based eligibility check preview
  const checkEligibilityPreview = (prog) => {
    if (!currentMember) return { eligible: true, reasons: [] };
    const reasons = [];
    let eligible = true;

    // Career break check
    if (prog.careerBreakRequirementMonths > 0) {
      const brk = currentMember.careerBreakMonths || 0;
      if (brk >= prog.careerBreakRequirementMonths) {
        reasons.push(`✓ Career break (${brk} months) meets rule requirement of >= ${prog.careerBreakRequirementMonths} months`);
      } else {
        eligible = false;
        reasons.push(`✗ Career break (${brk} months) is less than required ${prog.careerBreakRequirementMonths} months`);
      }
    }

    // Skills check
    if (prog.requiredSkills && prog.requiredSkills.length > 0) {
      const memSkills = (currentMember.skills || []).map(s => s.toLowerCase());
      const hasMatch = prog.requiredSkills.some(req => 
        memSkills.some(ms => ms.includes(req.toLowerCase()) || req.toLowerCase().includes(ms))
      );
      if (hasMatch) {
        reasons.push(`✓ Profile verified competencies match ${prog.requiredSkills.join(' / ')}`);
      } else {
        eligible = false;
        reasons.push(`✗ Missing required skill from: ${prog.requiredSkills.join(', ')}`);
      }
    }

    return { eligible, reasons };
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-plum-200 border-t-plum-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="border-b pb-6" style={{ borderColor: '#EFEAE3' }}>
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5"
          style={{ backgroundColor: '#FAF5FA', color: '#702654', borderColor: '#E8D1E8' }}
        >
          <Sparkles className="w-4 h-4 text-purple-700" />
          Sponsored Cohorts &amp; Reentry Programs
        </div>
        <h1 className="text-page-headline text-plum-950 font-serif font-bold tracking-tight mt-1">
          Career Development Programmes
        </h1>
        <p className="text-body-lg text-charcoal-600 mt-2 max-w-3xl leading-relaxed">
          Every programme connects to your single HerJourney identity. Register with one click without repeating past history, transcripts, or personal credentials.
        </p>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-2xl text-sm flex items-center gap-3 font-medium shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Programme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {programmes.map((prog, index) => {
          const app = getApplicationForProgramme(prog._id);
          const eligibility = checkEligibilityPreview(prog);
          const isExpanded = !!expandedEligibility[prog._id];

          return (
            <motion.div 
              key={prog._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-7 border shadow-card card-3d flex flex-col justify-between relative overflow-hidden"
              style={{ borderColor: '#EFEAE3' }}
            >
              {/* Left Accent Bar */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-2"
                style={{ 
                  background: app 
                    ? 'linear-gradient(180deg, #27845D 0%, #1F6D4C 100%)' 
                    : eligibility.eligible 
                    ? 'linear-gradient(180deg, #42133F 0%, #702654 100%)' 
                    : '#DDD6CE' 
                }}
              />

              <div className="pl-2">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span 
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm"
                    style={{ backgroundColor: '#FAF5FA', color: '#702654', borderColor: '#E8D1E8' }}
                  >
                    {prog.category}
                  </span>

                  {app ? (
                    <StatusBadge status={app.currentStage || app.status} />
                  ) : eligibility.eligible ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Eligible Cohort ✓
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      Criteria Review
                    </span>
                  )}
                </div>

                <h3 className="text-card-headline font-serif font-bold text-plum-950 leading-snug">
                  {prog.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-500 font-medium mt-1">
                  <Building2 className="w-3.5 h-3.5 text-roseMauve-500" />
                  <span>Sponsoring Partner: <strong className="text-charcoal-800">{prog.partnerName}</strong></span>
                </div>

                <p className="text-supporting text-charcoal-700 mt-4 leading-relaxed font-normal">
                  {prog.description}
                </p>

                {/* Collapsible Deterministic Eligibility Rules */}
                <div 
                  className="mt-5 rounded-2xl border transition overflow-hidden"
                  style={{ backgroundColor: '#FAF7F3', borderColor: '#E8E1D7' }}
                >
                  <button
                    type="button"
                    onClick={() => toggleEligibility(prog._id)}
                    className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-plum-900 hover:bg-gray-50 transition"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Deterministic Rule-Based Criteria
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <AnimatePresence>
                    {(isExpanded || eligibility.reasons.length > 0) && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 space-y-1.5 text-xs border-t border-gray-100 pt-3"
                      >
                        {eligibility.reasons.map((r, i) => (
                          <div 
                            key={i} 
                            className={`flex items-start gap-2 ${r.startsWith('✓') ? 'text-emerald-800 font-medium' : 'text-charcoal-500'}`}
                          >
                            <span>{r}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-8 pt-5 border-t flex items-center justify-between pl-2" style={{ borderColor: '#EFEAE3' }}>
                <span className="text-xs text-charcoal-500 font-mono">
                  {prog.stages?.length || 6} Milestones Pipeline
                </span>

                {app ? (
                  <Link
                    to="/member"
                    className="px-5 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-xl text-xs font-bold border border-purple-200 transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>View in My Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRegister(prog._id)}
                    disabled={registeringId === prog._id}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition disabled:opacity-50 flex items-center gap-1.5"
                    style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
                  >
                    <span>{registeringId === prog._id ? 'Reusing Profile...' : 'Register (1-Click)'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
