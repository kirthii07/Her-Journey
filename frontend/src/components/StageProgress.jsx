import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const DEFAULT_STAGES = ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed'];

export default function StageProgress({ currentStage = 'Applied', stages = DEFAULT_STAGES }) {
  const currentIndex = stages.indexOf(currentStage);

  return (
    <div className="w-full py-3">
      {/* Desktop & Tablet Progress Bar */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-ivory-300 -z-0"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-plum-700 via-roseMauve-600 to-coral-500 transition-all duration-500 -z-0"
          style={{ width: `${Math.max(0, (currentIndex / (stages.length - 1)) * 100)}%` }}
        ></div>

        {stages.map((stage, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isUpcoming = idx > currentIndex;

          return (
            <div key={stage} className="flex flex-col items-center relative z-10">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDone 
                    ? 'bg-sage-500 text-white shadow-sm'
                    : isCurrent
                    ? 'bg-plum-800 text-white ring-4 ring-roseMauve-200 shadow-md scale-110'
                    : 'bg-white text-charcoal-400 border-2 border-ivory-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4 animate-pulse" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-charcoal-300" />
                )}
              </div>
              <span 
                className={`mt-2 text-xs font-medium tracking-tight ${
                  isCurrent 
                    ? 'text-plum-900 font-bold' 
                    : isDone 
                    ? 'text-charcoal-700' 
                    : 'text-charcoal-400'
                }`}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Stacked Step Indicator */}
      <div className="sm:hidden flex items-center justify-between bg-plum-50/50 p-2.5 rounded-lg border border-plum-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-coral-500 animate-pulse"></div>
          <span className="text-xs text-charcoal-500">Current Stage:</span>
          <span className="text-xs font-bold text-plum-900">{currentStage}</span>
        </div>
        <span className="text-xs font-mono font-medium text-roseMauve-700 bg-white px-2 py-0.5 rounded border border-roseMauve-200">
          Step {Math.max(1, currentIndex + 1)} of {stages.length}
        </span>
      </div>
    </div>
  );
}

