import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, UserPlus, GitMerge, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';

export default function DuplicateReviewModal({ queueItem, isOpen, onClose, onResolved }) {
  const [resolution, setResolution] = useState('MERGE'); // 'MERGE' | 'CREATE_NEW'
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !queueItem) return null;

  const handleResolve = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await api.resolveReviewQueue(queueItem._id, resolution, resolutionNotes, queueItem.incomingData);
      if (onResolved) onResolved(queueItem._id);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const incoming = queueItem.incomingData || {};
  const existing = queueItem.matchedMemberId || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-ivory-300 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-700 p-1 rounded-full hover:bg-ivory-200 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-amber-700 mb-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
              Identity Integrity Protection
            </span>
            <h3 className="text-lg font-bold text-charcoal-900">Possible Duplicate Member Match</h3>
          </div>
        </div>

        <div className="mt-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
          <p className="font-semibold mb-0.5">Policy: Never Silently Merge Ambiguous Records</p>
          <p>
            HerJourney holds potential matches in this review queue rather than silently corrupting member career histories. Confidence Score: <span className="font-bold">{queueItem.confidenceScore}%</span>.
          </p>
          {queueItem.matchReasons && queueItem.matchReasons.length > 0 && (
            <div className="mt-2 text-xs space-y-0.5">
              {queueItem.matchReasons.map((r, i) => (
                <div key={i} className="flex items-start gap-1.5 font-medium">
                  <span className="text-amber-600">•</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Side-by-side comparison */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Incoming Candidate */}
          <div className="p-4 rounded-xl border border-ivory-300 bg-ivory-50/50">
            <span className="font-bold text-plum-900 uppercase tracking-wider block mb-2">
              Incoming Registration Record
            </span>
            <div className="space-y-1.5 text-charcoal-700">
              <p><span className="text-charcoal-400">Name:</span> <span className="font-medium">{incoming.name}</span></p>
              <p><span className="text-charcoal-400">Email:</span> <span className="font-mono">{incoming.email}</span></p>
              <p><span className="text-charcoal-400">Phone:</span> <span className="font-mono">{incoming.phone}</span></p>
              <p><span className="text-charcoal-400">City:</span> <span>{incoming.city || 'N/A'}</span></p>
              <p><span className="text-charcoal-400">Source:</span> <span className="italic">{incoming.source}</span></p>
            </div>
          </div>

          {/* Matched Existing Member */}
          <div className="p-4 rounded-xl border border-plum-200 bg-plum-50/30">
            <span className="font-bold text-plum-900 uppercase tracking-wider block mb-2">
              Existing HerJourney Member
            </span>
            <div className="space-y-1.5 text-charcoal-700">
              <p><span className="text-charcoal-400">Name:</span> <span className="font-medium text-plum-950">{existing.name}</span></p>
              <p><span className="text-charcoal-400">Email:</span> <span className="font-mono">{existing.email}</span></p>
              <p><span className="text-charcoal-400">Phone:</span> <span className="font-mono">{existing.phone}</span></p>
              <p><span className="text-charcoal-400">Stage:</span> <span className="font-semibold text-roseMauve-700">{existing.careerStage}</span></p>
              <p><span className="text-charcoal-400">City:</span> <span>{existing.city}</span></p>
            </div>
          </div>
        </div>

        {/* Action Decision */}
        <div className="mt-6">
          <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
            Manager Review Resolution:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setResolution('MERGE')}
              className={`p-3 rounded-xl border text-xs font-medium text-left transition ${
                resolution === 'MERGE'
                  ? 'bg-plum-50 border-plum-600 text-plum-900 ring-2 ring-plum-600/20'
                  : 'bg-white border-ivory-300 text-charcoal-700 hover:bg-ivory-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <GitMerge className="w-4 h-4 text-plum-700" />
                <span className="font-bold">Merge with Existing Profile</span>
              </div>
              <p className="text-[11px] text-charcoal-500">
                Confirm this is the same woman with an updated email or phone. Preserves unified career history.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setResolution('CREATE_NEW')}
              className={`p-3 rounded-xl border text-xs font-medium text-left transition ${
                resolution === 'CREATE_NEW'
                  ? 'bg-plum-50 border-plum-600 text-plum-900 ring-2 ring-plum-600/20'
                  : 'bg-white border-ivory-300 text-charcoal-700 hover:bg-ivory-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <UserPlus className="w-4 h-4 text-roseMauve-600" />
                <span className="font-bold">Create Separate Member</span>
              </div>
              <p className="text-[11px] text-charcoal-500">
                Confirmed distinct individual who coincidentally shares contact or name similarity.
              </p>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-medium text-charcoal-700 mb-1">Audit Notes / Reason</label>
          <input
            type="text"
            value={resolutionNotes}
            onChange={e => setResolutionNotes(e.target.value)}
            className="w-full text-xs px-3 py-2 border border-ivory-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-plum-700"
            placeholder="e.g. Phone confirmed with candidate via SMS; secondary personal email added to verified record."
          />
        </div>

        <div className="mt-6 pt-4 border-t border-ivory-300 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-ivory-300 rounded-lg text-xs font-medium text-charcoal-600 hover:bg-ivory-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleResolve}
            disabled={submitting}
            className="px-5 py-2 bg-plum-800 hover:bg-plum-900 text-white rounded-lg text-xs font-semibold shadow-sm transition disabled:opacity-50"
          >
            {submitting ? 'Resolving...' : `Confirm ${resolution === 'MERGE' ? 'Profile Merge' : 'Separate Creation'}`}
          </button>
        </div>
      </div>
    </div>
  );
}

