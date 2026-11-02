import React from 'react';
import { CheckCircle2, HelpCircle, Sparkles, X, Shield, ArrowRight } from 'lucide-react';

export default function ExplainerModal({ recommendation, user, onClose }) {
  if (!recommendation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-amethyst-900 to-indigo-900 text-white">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-rosegold-400" />
            </div>
            <div>
              <h3 className="text-base font-bold">Why am I seeing this recommendation?</h3>
              <p className="text-xs text-stone-300">Algorithmic transparency under DPDP Act 2023</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between p-3.5 bg-amethyst-50/70 border border-amethyst-100 rounded-2xl">
            <div>
              <p className="text-xs font-semibold text-amethyst-900">{recommendation.title}</p>
              <p className="text-xs text-stone-600 font-medium">{recommendation.company}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 bg-amethyst-700 text-white text-xs font-bold rounded-lg shadow-sm">
                {recommendation.matchScore}% Match
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
              Rule-Based Eligibility Evaluation
            </h4>
            <div className="space-y-2.5">
              {recommendation.eligibilityChecklist?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-stone-800">{item.rule}</p>
                    <p className="text-stone-500 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              )) || (
                <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600">
                  <p className="font-medium text-stone-800">Direct Persona Match</p>
                  <p className="mt-1">{recommendation.reason}</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-3.5 bg-rosegold-50/70 border border-rosegold-200/60 rounded-2xl flex items-start gap-3">
            <Shield className="w-4 h-4 text-rosegold-600 mt-0.5 shrink-0" />
            <div className="text-xs text-rosegold-900 leading-relaxed">
              <span className="font-semibold">Privacy First:</span> This match was computed locally against your lifecycle attributes ({user.lifecycleStage}, {user.careerBreakMonths} mo break). Your personal phone and email remain masked from the employer until you choose to apply.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">Stage: {user.lifecycleStage}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition"
          >
            Got it, thanks
          </button>
        </div>

      </div>
    </div>
  );
}

