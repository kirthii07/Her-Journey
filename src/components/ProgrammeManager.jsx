import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  Award, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  FileSpreadsheet, 
  Filter, 
  Layers, 
  Plus, 
  Search, 
  Trash2, 
  UploadCloud, 
  UserPlus, 
  Users, 
  X 
} from 'lucide-react';
import { SIMULATED_CSV_BATCH } from '../data/mockData';

export default function ProgrammeManager({ 
  programmes, 
  applications, 
  onUpdateStage, 
  onBulkImport, 
  onOpenCreateProgramme 
}) {
  const [selectedProgrammeId, setSelectedProgrammeId] = useState(programmes[0]?.id || 'prog-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkReviewQueue, setBulkReviewQueue] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [celebrationApplicant, setCelebrationApplicant] = useState(null);

  const selectedProgramme = programmes.find(p => p.id === selectedProgrammeId) || programmes[0];
  const programmeApps = applications.filter(a => a.programmeId === selectedProgrammeId);

  // Funnel stages for the Kanban
  const stages = ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed'];

  // Handle stage movement
  const handleStageChange = (appId, newStage, applicantName) => {
    onUpdateStage(appId, newStage);
    if (newStage === 'Placed') {
      setCelebrationApplicant(applicantName);
      setTimeout(() => setCelebrationApplicant(null), 4000);
    }
  };

  // Run Bulk Excel/CSV Simulator with Duplicate Detection
  const runBulkSimulator = () => {
    setIsUploading(true);

    setTimeout(() => {
      const duplicates = [];
      const cleanCandidates = [];

      SIMULATED_CSV_BATCH.forEach((cand, idx) => {
        // Duplicate detection: check against existing applications
        const match = applications.find(
          a => a.applicantEmail.toLowerCase() === cand.email.toLowerCase() ||
               a.applicantPhone === cand.phone
        );

        if (match) {
          duplicates.push({
            id: `dup-${idx}`,
            candidate: cand,
            existingMatch: match,
            reason: match.applicantEmail.toLowerCase() === cand.email.toLowerCase()
              ? 'Exact Email Match'
              : 'Exact Phone Match'
          });
        } else {
          cleanCandidates.push(cand);
        }
      });

      setBulkReviewQueue(duplicates);
      setIsUploading(false);

      if (cleanCandidates.length > 0) {
        onBulkImport(cleanCandidates, selectedProgrammeId);
      }
    }, 900);
  };

  const handleResolveDuplicate = (dupId, action) => {
    // action: 'merge', 'override', 'discard'
    setBulkReviewQueue(prev => prev.filter(d => d.id !== dupId));
  };

  const filteredApps = programmeApps.filter(a => 
    a.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Toast celebration when Placed */}
      {celebrationApplicant && (
        <div className="fixed top-24 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center space-x-3 border border-emerald-400 animate-bounce">
          <Award className="w-5 h-5 text-yellow-300" />
          <div>
            <p className="text-xs font-bold">Candidate Successfully Placed! </p>
            <p className="text-[11px] text-emerald-100">{celebrationApplicant} transitioned into enterprise role</p>
          </div>
        </div>
      )}

      {/* Header bar */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amethyst-100 text-amethyst-900 text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5 text-amethyst-700" />
            <span>Programme Manager Command Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            Active Cohort & Pipeline Progression
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Configure eligibility criteria, inspect candidate pipelines, and review bulk Excel registrations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsBulkModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-white border border-stone-200/90 text-stone-700 hover:bg-stone-50 font-bold text-xs shadow-xs transition flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Bulk CSV / Excel Upload</span>
          </button>

          <button
            onClick={onOpenCreateProgramme}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amethyst-800 to-indigo-800 hover:from-amethyst-900 hover:to-indigo-900 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Programme</span>
          </button>
        </div>
      </div>

      {/* Programme Selector Pills & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Programme Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {programmes.map((p) => {
            const isSelected = p.id === selectedProgrammeId;
            const count = applications.filter(a => a.programmeId === p.id).length;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProgrammeId(p.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amethyst-900 text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                <span>{p.title.split(' ')[0]} {p.title.split(' ')[1]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-amethyst-700 text-white' : 'bg-stone-100 text-stone-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Filter by name or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amethyst-500 focus:outline-none"
          />
        </div>

      </div>

      {/* Selected Programme Summary Banner */}
      {selectedProgramme && (
        <div className="p-4 bg-white/70 border border-stone-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <img 
              src={selectedProgramme.partnerLogo} 
              alt={selectedProgramme.partnerName} 
              className="w-9 h-9 rounded-xl object-cover border border-stone-200"
            />
            <div>
              <p className="font-bold text-stone-900">{selectedProgramme.title}</p>
              <p className="text-[11px] text-stone-500">{selectedProgramme.cohort} • Sponsoring Partner: {selectedProgramme.partnerName}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 bg-amethyst-50 text-amethyst-900 rounded-lg font-semibold border border-amethyst-100">
              Min Break: {selectedProgramme.eligibilityRules?.minBreakMonths || 0} Mo
            </span>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg font-semibold border border-emerald-200">
              Open Seats: {selectedProgramme.openPositions}
            </span>
            <span className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg font-semibold">
              Stipend: {selectedProgramme.stipendOrSalary}
            </span>
          </div>
        </div>
      )}

      {/* Real-Time Stage Progression Kanban Board */}
      <div className="overflow-x-auto pb-6">
        <div className="grid grid-cols-6 gap-4 min-w-[1100px]">
          {stages.map((stg) => {
            const appsInStage = filteredApps.filter(a => a.stage === stg);
            return (
              <div key={stg} className="bg-stone-100/70 p-3.5 rounded-2xl border border-stone-200/70 flex flex-col min-h-[500px]">
                
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-amethyst-600" />
                    <span className="text-xs font-bold text-stone-800">{stg}</span>
                  </div>
                  <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-white text-amethyst-900 border border-stone-200 shadow-xs">
                    {appsInStage.length}
                  </span>
                </div>

                {/* Candidate Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {appsInStage.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition space-y-2.5 group"
                    >
                      {/* Avatar & Match Score */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={app.avatar}
                            alt={app.applicantName}
                            className="w-8 h-8 rounded-full object-cover border border-stone-200"
                          />
                          <div>
                            <p className="text-xs font-bold text-stone-900 leading-tight">
                              {app.applicantName}
                            </p>
                            <span className="text-[10px] text-stone-500 font-medium">
                              {app.applicantStage}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {app.matchScore}%
                        </span>
                      </div>

                      {/* Attributes */}
                      <div className="flex flex-wrap gap-1">
                        {app.careerBreakMonths > 0 && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            {app.careerBreakMonths}m Gap
                          </span>
                        )}
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                          {app.skills[0]}
                        </span>
                      </div>

                      {/* Attendance badge */}
                      <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-100">
                        <span>Attendance:</span>
                        <span className="font-bold text-stone-800">{app.attendanceRate || 100}%</span>
                      </div>

                      {/* Stage Progression Controls */}
                      <div className="pt-1 flex items-center justify-between gap-1">
                        {stages.indexOf(stg) > 0 && (
                          <button
                            onClick={() => handleStageChange(app.id, stages[stages.indexOf(stg) - 1], app.applicantName)}
                            className="px-2 py-1 rounded bg-stone-50 hover:bg-stone-100 text-stone-600 text-[10px] font-bold border border-stone-200"
                            title="Move back"
                          >
                            ← Prev
                          </button>
                        )}

                        {stages.indexOf(stg) < stages.length - 1 ? (
                          <button
                            onClick={() => handleStageChange(app.id, stages[stages.indexOf(stg) + 1], app.applicantName)}
                            className="ml-auto px-2.5 py-1 rounded bg-amethyst-800 hover:bg-amethyst-900 text-white text-[10px] font-bold shadow-xs transition"
                          >
                            Next →
                          </button>
                        ) : (
                          <span className="ml-auto text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            ✓ Placed
                          </span>
                        )}
                      </div>

                    </div>
                  ))}

                  {appsInStage.length === 0 && (
                    <div className="p-4 text-center border-2 border-dashed border-stone-200 rounded-xl text-[11px] text-stone-400">
                      No candidates in {stg}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* BULK CSV / EXCEL UPLOAD SIMULATOR MODAL */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
              <div className="flex items-center space-x-2.5">
                <FileSpreadsheet className="w-5 h-5 text-emerald-300" />
                <div>
                  <h3 className="text-base font-bold">Bulk Candidate Registration Simulator</h3>
                  <p className="text-xs text-emerald-100">Automated duplicate detection & review queue</p>
                </div>
              </div>
              <button 
                onClick={() => setIsBulkModalOpen(false)}
                className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs">
              
              <div className="p-4 bg-stone-50 border border-dashed border-stone-300 rounded-2xl text-center space-y-2">
                <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-stone-800">Ready to simulate batch import</p>
                <p className="text-stone-500 max-w-sm mx-auto">
                  Simulating 4 candidate registrations across Maharashtra and Karnataka (including 1 duplicate to test conflict resolution).
                </p>
                <button
                  disabled={isUploading}
                  onClick={runBulkSimulator}
                  className="mt-2 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-sm transition inline-flex items-center gap-2"
                >
                  {isUploading ? 'Parsing Batch...' : 'Simulate Excel / CSV Import'}
                </button>
              </div>

              {/* Review Queue (Duplicates Flagged) */}
              {bulkReviewQueue.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Duplicate Detection Review Queue ({bulkReviewQueue.length} Flagged)
                    </h4>
                    <span className="text-[10px] text-stone-500">Exact match on email/phone</span>
                  </div>

                  <div className="space-y-2">
                    {bulkReviewQueue.map((dup) => (
                      <div key={dup.id} className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-stone-900">{dup.candidate.name}</p>
                            <p className="text-[11px] text-stone-600">{dup.candidate.email} • {dup.candidate.phone}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold text-[10px]">
                            {dup.reason}
                          </span>
                        </div>

                        <p className="text-[11px] text-amber-900 bg-amber-100/60 p-2 rounded-lg">
                          Matched with existing record: <span className="font-semibold">{dup.existingMatch.applicantName}</span> (ID: {dup.existingMatch.id}) currently in stage <span className="font-semibold">{dup.existingMatch.stage}</span>.
                        </p>

                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            onClick={() => handleResolveDuplicate(dup.id, 'discard')}
                            className="px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-semibold transition"
                          >
                            Discard Duplicate
                          </button>
                          <button
                            onClick={() => handleResolveDuplicate(dup.id, 'merge')}
                            className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-semibold transition"
                          >
                            Merge Timelines
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-end">
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

