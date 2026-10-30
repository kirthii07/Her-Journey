import React from 'react';
import { X, Award, CheckCircle2, Printer, Shield } from 'lucide-react';

export default function CertificateModal({ certificate, isOpen, onClose }) {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border-4 border-plum-900/10 relative overflow-hidden">
        {/* Certificate Decorative Border */}
        <div className="absolute inset-2 border-2 border-dashed border-plum-200 pointer-events-none rounded-xl"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-700 p-1 rounded-full hover:bg-ivory-200 transition z-20 no-print"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Content */}
        <div className="text-center relative z-10 py-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-plum-50 border-2 border-plum-200 text-plum-800 mb-3 shadow-inner">
            <Award className="w-8 h-8 text-plum-800" />
          </div>

          <div className="text-xs uppercase tracking-widest font-bold text-roseMauve-600 mb-1">
            HerJourney Career Foundation • Official Credential
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-plum-950 mb-2">
            Certificate of Achievement
          </h2>
          <p className="text-sm text-charcoal-500 max-w-md mx-auto mb-6">
            This certifies that the candidate has successfully completed all rigorous curriculum milestones, cohort sessions, and project deliverables.
          </p>

          <div className="my-6 py-4 border-y border-ivory-300">
            <span className="text-xs uppercase tracking-wider text-charcoal-400">Awarded To</span>
            <p className="text-2xl font-serif font-bold text-plum-900 mt-1">
              {certificate.memberId?.name || 'Priya Sharma'}
            </p>
            <p className="text-xs text-charcoal-500 mt-0.5">
              for completion of <span className="font-semibold text-charcoal-800">{certificate.title || 'Returnship 2026 Programme'}</span>
            </p>
          </div>

          {/* Endorsed Skills */}
          {certificate.skillsEndorsed && certificate.skillsEndorsed.length > 0 && (
            <div className="mb-6">
              <span className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider">
                Endorsed Professional Competencies:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
                {certificate.skillsEndorsed.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-plum-50 text-plum-800 rounded-full text-xs font-medium border border-plum-200"
                  >
                    <CheckCircle2 className="w-3 h-3 text-sage-500" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verification & Signatures */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-ivory-300 text-left">
            <div>
              <p className="text-xs text-charcoal-400 uppercase font-semibold">Credential ID</p>
              <p className="font-mono text-xs font-bold text-plum-900 mt-0.5">{certificate.certificateNumber}</p>
              <p className="text-[11px] text-charcoal-400 mt-0.5 flex items-center gap-1">
                <Shield className="w-3 h-3 text-sage-500" /> Digitally Verified
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-charcoal-400 uppercase font-semibold">Issued On</p>
              <p className="text-xs font-medium text-charcoal-800 mt-0.5">
                {new Date(certificate.issueDate || Date.now()).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p className="text-[11px] text-charcoal-400 mt-0.5">{certificate.issuedBy || 'HerJourney Certification Board'}</p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-ivory-200 flex items-center justify-between no-print">
          <span className="text-xs text-charcoal-500">Official lifelong verified credential</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-plum-200 hover:bg-plum-50 text-plum-900 rounded-lg text-xs font-medium transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-plum-800 hover:bg-plum-900 text-white rounded-lg text-xs font-medium transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

