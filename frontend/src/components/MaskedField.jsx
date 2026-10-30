import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function MaskedField({ value, type = 'text', label = null }) {
  if (!value) return <span className="text-gray-400 italic">Not provided</span>;

  const isMasked = value.includes('*');

  return (
    <div className="inline-flex items-center gap-1.5 text-sm">
      {label && <span className="text-charcoal-400 font-medium">{label}:</span>}
      <span className="font-mono text-charcoal-700 bg-ivory-200/60 px-1.5 py-0.5 rounded text-xs">
        {value}
      </span>
      {isMasked && (
        <span 
          title="Privacy Protected: Contact details are automatically masked in administrative and partner views"
          className="text-roseMauve-600 hover:text-plum-800 cursor-help"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
        </span>
      )}
    </div>
  );
}

