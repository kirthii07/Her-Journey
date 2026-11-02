import React from 'react';
import { Award, CheckCircle, Download, ExternalLink, ShieldCheck, X } from 'lucide-react';

export default function CertificateModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden">
        
        {/* Top header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amethyst-900 via-amethyst-800 to-indigo-900 text-white">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emeraldsuccess-400" />
            <span className="text-xs font-semibold tracking-wider uppercase">HerJourney Verified Credential</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Canvas */}
        <div className="p-8 bg-[#FFFDF9] border-[12px] border-[#F5EBE1] m-4 rounded-2xl relative">
          
          {/* Subtle Watermark Emblem */}
          <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
            <Award className="w-36 h-36 text-amethyst-800" />
          </div>

          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-rosegold-50 border border-rosegold-200 text-rosegold-700 rounded-full text-xs font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-rosegold-500" />
              <span>Cryptographically Verified on Bharat Trust Network</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-amethyst-900 tracking-tight">
              Certificate of Verified Milestone
            </h2>

            <p className="text-xs text-stone-500 uppercase tracking-widest">Presented for outstanding accomplishment to</p>

            <div className="py-2">
              <span className="text-2xl font-bold text-stone-900 border-b-2 border-stone-300 pb-1 px-8">
                {event.recipientName || 'Candidate Profile'}
              </span>
            </div>

            <p className="text-stone-700 font-medium text-base max-w-lg mx-auto leading-relaxed">
              For distinguished completion of <span className="font-semibold text-amethyst-800">{event.title}</span> under the auspices of{' '}
              <span className="font-semibold text-stone-900">{event.organization}</span>.
            </p>

            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-stone-200 text-left text-xs">
              <div>
                <p className="text-stone-400 uppercase font-semibold text-[10px]">Credential ID</p>
                <p className="font-mono text-stone-800 font-semibold">{event.credentialId || 'HJ-2026-IND-091'}</p>
              </div>
              <div>
                <p className="text-stone-400 uppercase font-semibold text-[10px]">Timeline Period</p>
                <p className="text-stone-800 font-semibold">{event.year}</p>
              </div>
              <div>
                <p className="text-stone-400 uppercase font-semibold text-[10px]">Status</p>
                <p className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" /> Verifiable
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-8 py-4 bg-stone-50 border-t border-stone-100">
          <span className="text-xs text-stone-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amethyst-700" />
            Empowering 1M+ Women Career Milestones
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert(`Downloaded digital verification packet for ${event.title}`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amethyst-800 hover:bg-amethyst-900 text-white rounded-xl text-xs font-semibold shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

