import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Briefcase, HelpCircle } from 'lucide-react';
import { api } from '../services/api';

export default function OutcomeCheckinModal({ application, isOpen, onClose, onOutcomeReported }) {
  const [response, setResponse] = useState('Yes');
  const [currentRole, setCurrentRole] = useState(application?.placedRole || 'Product Manager');
  const [employer, setEmployer] = useState(application?.placedCompany || 'Acme Corp');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !application) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const outcome = await api.reportOutcome({
        memberId: application.memberId?._id || application.memberId,
        programmeId: application.programmeId?._id || application.programmeId,
        response,
        currentRole,
        employer,
        notes
      });
      if (onOutcomeReported) onOutcomeReported(outcome);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-ivory-300 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-700 p-1 rounded-full hover:bg-ivory-200 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-plum-800 mb-2">
          <div className="w-8 h-8 rounded-lg bg-plum-100 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-plum-700" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-roseMauve-600">
              Lifelong Career Impact Tracking
            </span>
            <h3 className="text-lg font-bold text-charcoal-900">3-Month Employment Check-In</h3>
          </div>
        </div>

        <p className="text-xs text-charcoal-600 mt-1 mb-4">
          HerJourney tracks continuous longitudinal outcomes. Your self-reported progress helps measure the lasting impact of women's career reentries.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
              Are you still working in this role at {employer}?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Yes, still working here', val: 'Yes' },
                { label: 'No, left the company', val: 'No' },
                { label: 'Changed to new role', val: 'Changed role' },
                { label: 'Prefer not to say', val: 'Prefer not to say' }
              ].map(opt => (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => setResponse(opt.val)}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                    response === opt.val
                      ? 'bg-plum-50 border-plum-600 text-plum-900 ring-2 ring-plum-600/20'
                      : 'bg-white border-ivory-300 text-charcoal-700 hover:bg-ivory-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.label}</span>
                    {response === opt.val && <CheckCircle2 className="w-3.5 h-3.5 text-plum-700" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-700 mb-1">Current Job Title</label>
            <input
              type="text"
              value={currentRole}
              onChange={e => setCurrentRole(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-ivory-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-plum-700"
              placeholder="e.g. Senior Product Manager"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-700 mb-1">Company / Organization</label>
            <input
              type="text"
              value={employer}
              onChange={e => setEmployer(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-ivory-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-plum-700"
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-700 mb-1">Notes / Retention Reflections (Optional)</label>
            <textarea
              rows="2"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-ivory-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-plum-700"
              placeholder="How has your reentry onboarding and mentorship been?"
            ></textarea>
          </div>

          <div className="p-3 bg-ivory-100 rounded-xl text-[11px] text-charcoal-600 border border-ivory-200">
            <span className="font-semibold text-plum-900">Outcome State: </span>
            This response is saved as a <span className="font-semibold text-amber-700">Reported Outcome</span>.
            The programme manager or hiring partner can later mark it as <span className="font-semibold text-emerald-700">Verified</span>.
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-ivory-300 rounded-lg text-xs font-medium text-charcoal-600 hover:bg-ivory-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-plum-800 hover:bg-plum-900 text-white rounded-lg text-xs font-semibold shadow-sm transition disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Reported Outcome'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

