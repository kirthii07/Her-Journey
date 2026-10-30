import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Briefcase,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Printer,
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';
import { api } from '../services/api';
import MaskedField from '../components/MaskedField';
import StatusBadge from '../components/StatusBadge';
import CertificateModal from '../components/CertificateModal';

export default function ManagerProgrammeDetail() {
  const [programme, setProgramme] = useState(null);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStage, setUpdatingStage] = useState(false);
  const [issuingCert, setIssuingCert] = useState(false);
  const [issuedCert, setIssuedCert] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const progs = await api.getProgrammes();
      const returnship = progs.find(p => p.category === 'Returnship') || progs[0];
      if (returnship) {
        setProgramme(returnship);
        const apps = await api.getApplications(`programmeId=${returnship._id}`);
        setApplications(apps || []);
        const priyaApp = apps.find(a => a.memberId?.name?.includes('Priya')) || apps[0];
        setSelectedApplication(priyaApp || null);
      }
    } catch (err) {
      console.error('Failed to load programme details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMoveStage = async (newStage) => {
    if (!selectedApplication) return;
    setUpdatingStage(true);
    setFeedback(null);
    try {
      const updated = await api.updateStage(selectedApplication._id, newStage);
      setFeedback({
        type: 'success',
        text: `Live State Updated: ${selectedApplication.memberId?.name} moved to "${newStage}" stage in persistent MongoDB.`
      });
      await loadData();
      setSelectedApplication(prev => ({ ...prev, currentStage: newStage }));
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setUpdatingStage(false);
    }
  };

  const handleToggleAttendance = async (sessionNumber, currentPresent) => {
    if (!selectedApplication) return;
    try {
      await api.updateAttendance(selectedApplication._id, sessionNumber, !currentPresent);
      await loadData();
      setSelectedApplication(prev => {
        const updatedAttendance = (prev.attendance || []).map(s =>
          s.sessionNumber === sessionNumber ? { ...s, present: !currentPresent } : s
        );
        return { ...prev, attendance: updatedAttendance };
      });
    } catch (err) {
      console.error('Failed to update attendance:', err);
    }
  };

  const handleIssueCertificate = async () => {
    if (!selectedApplication || !programme) return;
    setIssuingCert(true);
    setFeedback(null);
    try {
      const cert = await api.issueCertificate(
        selectedApplication.memberId?._id || selectedApplication.memberId,
        programme._id,
        programme.requiredSkills
      );
      setIssuedCert(cert);
      setFeedback({
        type: 'success',
        text: `Official Certificate ${cert.certificateNumber} issued to ${selectedApplication.memberId?.name}! Stored in permanent credentials ledger.`
      });
      await loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setIssuingCert(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-plum-200 border-t-plum-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  const app = selectedApplication;
  const attendanceList = app?.attendance || [];
  const attendedCount = attendanceList.filter(s => s.present).length;
  const totalSessions = attendanceList.length || 3;
  const attendancePercent = totalSessions > 0 ? Math.round((attendedCount / totalSessions) * 100) : 0;
  const stageOptions = programme?.stages || ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Programme Header Card */}
      <div
        className="rounded-3xl p-8 text-white shadow-xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3B1C32 0%, #5A1B46 60%, #3B1C32 100%)' }}
      >
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,132,134,0.2) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          <div className="space-y-3">
            <span className="pill-rose text-xs uppercase tracking-wider">
              {programme?.category || 'Returnship'} — Active Cohort
            </span>
            <h1 className="text-h1 font-display text-white mt-2">
              {programme?.name || 'Returnship 2026'}
            </h1>
            <p className="text-body text-pink-100/90 max-w-2xl leading-relaxed">
              {programme?.description}
            </p>
            <p className="text-body-sm text-pink-200/80">
              Hiring Partner: <strong className="text-white">{programme?.partnerName}</strong> · Shared live state across Member, Manager, and Partner roles.
            </p>
          </div>
          <StatusBadge status="Active Cohort" />
        </div>
      </div>

      {/* Live State Notification */}
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
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{feedback.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Two Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Panel: Applications List */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-ivory-300">
            <h3 className="text-label uppercase tracking-wider text-charcoal-500">
              Cohort Candidates ({applications.length})
            </h3>
            <span className="text-caption text-plum-700 font-mono font-bold">Unified Identities</span>
          </div>

          <div className="space-y-2">
            {applications.map((item) => {
              const isSelected = selectedApplication?._id === item._id;
              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedApplication(item)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-plum-800/5 border-l-4 border-l-plum-800 border-plum-300'
                      : 'border-ivory-300 hover:bg-ivory-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #3B1C32, #5A1B46)' }}
                    >
                      {(item.memberId?.name || '?').charAt(0)}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-body font-semibold text-plum-900">{item.memberId?.name}</h4>
                      <p className="text-caption text-charcoal-500">{item.memberId?.careerStage} · {item.memberId?.city}</p>
                      <div className="pt-0.5">
                        <StatusBadge status={item.currentStage} size="xs" />
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isSelected ? 'text-plum-800' : 'text-charcoal-300'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Application Detail */}
        {app ? (
          <div className="lg:col-span-2 space-y-6">
            <div className="card-body space-y-6">
              {/* Candidate Info Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-ivory-300">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-h2 font-display text-plum-900">{app.memberId?.name}</h2>
                    <span className="pill-plum text-xs">{app.memberId?.careerStage}</span>
                  </div>
                  <div className="flex items-center gap-3 text-caption text-charcoal-500 font-medium mt-1.5">
                    <span>City: {app.memberId?.city}</span>
                    <span>•</span>
                    <span>Career Break: {app.memberId?.careerBreakMonths || 36} Months</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-3 text-xs">
                    <MaskedField label="Masked Email" value={app.memberId?.email} />
                    <span className="text-ivory-300">•</span>
                    <MaskedField label="Masked Phone" value={app.memberId?.phone} />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-caption text-charcoal-400 uppercase font-bold block mb-1">Live Stage</span>
                  <StatusBadge status={app.currentStage} />
                </div>
              </div>

              {/* Stage Progression */}
              <div className="space-y-3">
                <label className="block text-label uppercase tracking-wider text-charcoal-500">
                  Update Candidate Pipeline Stage
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {stageOptions.map((st) => {
                    const isCurrent = app.currentStage === st;
                    return (
                      <motion.button
                        key={st}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMoveStage(st)}
                        disabled={updatingStage}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition shadow-sm ${
                          isCurrent
                            ? 'bg-plum-800 text-white border-plum-800'
                            : 'bg-ivory-200 text-charcoal-800 border-ivory-300 hover:border-plum-300'
                        }`}
                      >
                        {isCurrent ? `✓ ${st}` : st}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Attendance Tracker */}
              <div className="pt-6 border-t border-ivory-300 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-label uppercase tracking-wider text-plum-900">
                      Masterclass Attendance Tracker
                    </h3>
                    <p className="text-caption text-charcoal-500 mt-0.5">
                      Session participation required for certificate issuance.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-plum-800 font-mono block">{attendancePercent}%</span>
                    <span className="text-caption text-charcoal-400">{attendedCount} of {totalSessions} Attended</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {attendanceList.map((session) => (
                    <div
                      key={session.sessionNumber}
                      className="p-4 rounded-2xl bg-ivory-200 border border-ivory-300 flex items-center justify-between text-sm"
                    >
                      <div>
                        <span className="font-bold text-plum-900">Session {session.sessionNumber}: </span>
                        <span className="text-charcoal-700">{session.topic}</span>
                      </div>
                      <button
                        onClick={() => handleToggleAttendance(session.sessionNumber, session.present)}
                        className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
                          session.present
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-red-50 hover:text-red-800 hover:border-red-300'
                            : 'bg-white text-charcoal-600 border border-ivory-300 hover:bg-emerald-50 hover:text-emerald-800'
                        }`}
                      >
                        {session.present ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Present ✓</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-charcoal-400" />
                            <span>Mark Present</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Eligible */}
              <div className="p-4 rounded-2xl bg-plum-800/5 border border-plum-200 text-sm space-y-1">
                <span className="font-bold text-plum-800 text-xs uppercase tracking-wider block">Why Eligible</span>
                <p className="text-charcoal-600 text-xs leading-relaxed">
                  Career break ≥ {programme?.careerBreakRequirementMonths || 12} months · Skills match: {programme?.requiredSkills?.join(', ')} · Consent granted for programme outreach.
                </p>
              </div>

              {/* Certificate Issuance */}
              <div
                className="pt-6 border-t border-ivory-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border"
                style={{ backgroundColor: '#FAF5FA', borderColor: '#E8D1E8' }}
              >
                <div>
                  <h4 className="text-sm font-bold text-plum-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-plum-700" />
                    <span>Official Credential &amp; Certificate Issuance</span>
                  </h4>
                  <p className="text-caption text-charcoal-600 mt-1 max-w-lg leading-relaxed">
                    Issues a cryptographically verifiable completion certificate endorsing skills ({programme?.requiredSkills?.join(', ')}).
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleIssueCertificate}
                  disabled={issuingCert}
                  className="btn-primary flex items-center gap-2 shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>{issuingCert ? 'Issuing...' : 'Issue Certificate'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 p-12 text-center card">
            <Users className="w-12 h-12 text-charcoal-200 mx-auto mb-3" />
            <p className="text-body text-charcoal-500">Select a candidate on the left to manage stage progression and attendance.</p>
          </div>
        )}
      </div>

      <CertificateModal
        certificate={issuedCert}
        isOpen={Boolean(issuedCert)}
        onClose={() => setIssuedCert(null)}
      />
    </div>
  );
}
