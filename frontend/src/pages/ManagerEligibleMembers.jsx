import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Mail, 
  AlertCircle, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRight,
  Info,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import MaskedField from '../components/MaskedField';
import StatusBadge from '../components/StatusBadge';

export default function ManagerEligibleMembers() {
  const [programmes, setProgrammes] = useState([]);
  const [selectedProgrammeId, setSelectedProgrammeId] = useState('');
  const [evaluatedMembers, setEvaluatedMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invitingId, setInvitingId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchProgs = async () => {
      try {
        const list = await api.getProgrammes();
        setProgrammes(list || []);
        if (list && list.length > 0) {
          const defaultProg = list.find(p => p.category === 'Returnship') || list[0];
          setSelectedProgrammeId(defaultProg._id);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load programmes:', err);
        setFeedback({ type: 'error', text: err.message || 'Failed to load programmes' });
        setLoading(false);
      }
    };
    fetchProgs();
  }, []);

  const loadEligibleMembers = async (progId) => {
    if (!progId) return;
    setLoading(true);
    setFeedback(null);
    try {
      const data = await api.getEligibleMembers(progId);
      setEvaluatedMembers(data || []);
    } catch (err) {
      console.error('Failed to evaluate eligible members:', err);
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedProgrammeId) {
      loadEligibleMembers(selectedProgrammeId);
    }
  }, [selectedProgrammeId]);

  const handleInvite = async (memberItem) => {
    if (!memberItem.consentGranted) {
      setFeedback({
        type: 'error',
        text: `Consent Restriction: Member ${memberItem.member?.name} has not granted programme outreach consent. Invitation blocked.`
      });
      return;
    }

    setInvitingId(memberItem.member?._id);
    setFeedback(null);
    try {
      await api.inviteMember(selectedProgrammeId, memberItem.member?._id);
      setFeedback({
        type: 'success',
        text: `Official invitation sent to ${memberItem.member?.name}. Her unified profile has been queued for 1-click registration.`
      });
      await loadEligibleMembers(selectedProgrammeId);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setInvitingId(null);
    }
  };

  const selectedProg = programmes.find(p => p._id === selectedProgrammeId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b pb-6" style={{ borderColor: '#EFEAE3' }}>
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
          style={{ backgroundColor: '#FAF5FA', color: '#702654', borderColor: '#E8D1E8' }}
        >
          <Sparkles className="w-4 h-4 text-purple-700" />
          Targeted Reentry Outreach
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-plum-950 mt-1">
          Cohort Eligibility &amp; Consent Verification
        </h1>
        <p className="text-base text-charcoal-500 mt-2">
          Evaluate member database with transparent deterministic rules. Full consent enforcement and masked contact privacy.
        </p>
      </div>

      {/* Programme Selector Bar */}
      <div 
        className="bg-white p-6 rounded-3xl border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-3d"
        style={{ borderColor: '#EFEAE3' }}
      >
        <div className="flex items-center gap-4">
          <label className="text-sm font-bold text-plum-950 uppercase tracking-wider">
            Active Programme:
          </label>
          <select
            value={selectedProgrammeId}
            onChange={(e) => setSelectedProgrammeId(e.target.value)}
            className="px-4 py-2.5 bg-ivory-100 border rounded-xl text-sm font-bold text-plum-900 focus:outline-none focus:ring-2 focus:ring-plum-700"
            style={{ borderColor: '#E8E1D7' }}
          >
            {programmes.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.category})
              </option>
            ))}
          </select>
        </div>

        {selectedProg && (
          <div className="text-xs text-charcoal-600 flex flex-wrap items-center gap-3 font-medium">
            <span className="bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              <strong>Rule 1:</strong> Break &gt;= {selectedProg.careerBreakRequirementMonths || 12} mo
            </span>
            <span>•</span>
            <span className="bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
              <strong>Rule 2:</strong> {selectedProg.requiredSkills?.join(' OR ')}
            </span>
          </div>
        )}
      </div>

      {/* Feedback Alert */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-2xl text-sm flex items-center gap-3 border font-medium shadow-sm ${
              feedback.type === 'success' 
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Evaluated Members Table */}
      <div className="bg-white rounded-3xl border shadow-card overflow-hidden" style={{ borderColor: '#EFEAE3' }}>
        <div className="p-5 bg-gray-50/70 border-b flex items-center justify-between" style={{ borderColor: '#EFEAE3' }}>
          <span className="text-xs font-bold text-plum-950 uppercase tracking-wider">
            Evaluated Member Profiles ({evaluatedMembers.length})
          </span>
          <span className="text-xs text-charcoal-400">
            Contacts masked: <span className="font-mono text-purple-900 font-bold">p***@gmail.com</span>
          </span>
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <div className="w-10 h-10 border-4 border-plum-200 border-t-plum-800 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-charcoal-500 font-medium">Evaluating eligibility rules against member records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-charcoal-400 uppercase tracking-wider font-bold text-xs" style={{ borderColor: '#EFEAE3' }}>
                  <th className="py-3.5 px-4">Member</th>
                  <th className="py-3.5 px-4">City</th>
                  <th className="py-3.5 px-4">Career Stage</th>
                  <th className="py-3.5 px-4">Relevant Skills</th>
                  <th className="py-3.5 px-4">Consent Status</th>
                  <th className="py-3.5 px-4">Deterministic Eligibility</th>
                  <th className="py-3.5 px-4">Current Stage</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#F3EFE9' }}>
                {evaluatedMembers.map((item) => {
                  const m = item.member || {};
                  const isEligible = item.isEligible;
                  const consentOk = item.consentGranted;
                  const appStatus = item.applicationStatus;

                  return (
                    <tr key={m._id} className="hover:bg-purple-50/20 transition">
                      {/* Name & Masked contact */}
                      <td className="py-4 px-4">
                        <span className="font-bold text-plum-950 block">{m.name}</span>
                        <div className="mt-1 space-y-0.5">
                          <MaskedField value={m.email} />
                          <br />
                          <MaskedField value={m.phone} />
                        </div>
                      </td>

                      {/* City */}
                      <td className="py-4 px-4 text-charcoal-600 font-medium">
                        {m.city}
                      </td>

                      {/* Career Stage */}
                      <td className="py-4 px-4">
                        <span 
                          className="font-bold text-xs uppercase px-2.5 py-1 rounded-full border"
                          style={{ backgroundColor: '#FAF5FA', color: '#702654', borderColor: '#E8D1E8' }}
                        >
                          {m.careerStage}
                        </span>
                        {m.careerBreakMonths > 0 && (
                          <span className="block text-xs text-charcoal-400 font-mono mt-1">
                            {m.careerBreakMonths} mo break
                          </span>
                        )}
                      </td>

                      {/* Skills */}
                      <td className="py-4 px-4 max-w-[180px]">
                        <div className="flex flex-wrap gap-1.5">
                          {m.skills?.slice(0, 3).map((s, i) => (
                            <span key={i} className="text-xs bg-white px-2 py-0.5 rounded-lg border border-gray-200 text-charcoal-700 font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Consent Status */}
                      <td className="py-4 px-4">
                        {consentOk ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Granted ✓
                          </span>
                        ) : (
                          <span 
                            title="Member has not granted outreach consent."
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800 bg-red-50 px-2.5 py-1 rounded-full border border-red-200"
                          >
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                            Not Granted ✗
                          </span>
                        )}
                      </td>

                      {/* Deterministic Eligibility */}
                      <td className="py-4 px-4 max-w-[240px]">
                        {isEligible ? (
                          <div className="space-y-1.5">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Eligible ✓
                            </span>
                            <div className="text-xs text-charcoal-600 space-y-0.5">
                              {item.reasons?.map((r, ri) => (
                                <p key={ri} className="leading-tight">{r}</p>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                              Ineligible ✗
                            </span>
                            <div className="text-xs text-charcoal-400 space-y-0.5">
                              {item.reasons?.slice(0, 1).map((r, ri) => (
                                <p key={ri} className="leading-tight">{r}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Current Stage */}
                      <td className="py-4 px-4">
                        {item.currentStage ? (
                          <StatusBadge status={item.currentStage} />
                        ) : (
                          <span className="text-xs text-charcoal-400 italic">Not applied</span>
                        )}
                      </td>

                      {/* Outreach Action */}
                      <td className="py-4 px-4 text-right">
                        {appStatus !== 'None' ? (
                          <span className="text-xs font-bold text-purple-900 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
                            {appStatus === 'Invited' ? 'Invited' : 'Active'}
                          </span>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleInvite(item)}
                            disabled={!isEligible || !consentOk || invitingId === m._id}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ml-auto shadow-sm ${
                              !isEligible || !consentOk
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                : 'text-white'
                            }`}
                            style={{
                              background: (!isEligible || !consentOk) ? undefined : 'linear-gradient(135deg, #42133F 0%, #702654 100%)'
                            }}
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{invitingId === m._id ? 'Sending...' : 'Send Invite'}</span>
                          </motion.button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
