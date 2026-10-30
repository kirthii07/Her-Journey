import React from 'react';
import { X, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';

export default function WhyModal({ opportunity, isOpen, onClose }) {
  if (!isOpen || !opportunity) return null;

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
            <Sparkles className="w-4 h-4 text-plum-700" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-roseMauve-600">
              Deterministic Recommendation Engine
            </span>
            <h3 className="text-lg font-bold text-charcoal-900">Why am I seeing this?</h3>
          </div>
        </div>

        <div className="mt-4 p-3.5 bg-ivory-100/80 rounded-xl border border-ivory-200 text-sm text-charcoal-700">
          <p className="font-semibold text-plum-950 mb-1">{opportunity.title}</p>
          <p className="text-xs text-charcoal-500">{opportunity.company} • {opportunity.location}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2.5">
            Rule-Based Criteria Matched:
          </h4>
          <div className="space-y-2">
            {opportunity.reasonsList && opportunity.reasonsList.length > 0 ? (
              opportunity.reasonsList.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-charcoal-800 bg-sage-50/60 p-2.5 rounded-lg border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-sage-500 mt-0.5 shrink-0" />
                  <span>{reason}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-charcoal-600">{opportunity.whyExplanation}</p>
            )}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-ivory-300 flex items-center justify-between text-xs text-charcoal-500">
          <span className="flex items-center gap-1.5 text-roseMauve-700">
            <ShieldCheck className="w-4 h-4 text-sage-500" />
            100% Explainable & Deterministic (No AI/Black box)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-plum-800 hover:bg-plum-900 text-white font-medium rounded-lg transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

