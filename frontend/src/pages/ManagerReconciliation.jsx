import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSpreadsheet, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  UserPlus, 
  Layers, 
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';

export default function ManagerReconciliation() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSimulateCSV = async () => {
    setLoading(true);
    try {
      const data = await api.previewReconciliation();
      setResult(data);
    } catch (err) {
      console.error('Reconciliation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b pb-6" style={{ borderColor: '#EFEAE3' }}>
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
          style={{ backgroundColor: '#F3F9F6', color: '#1F6D4C', borderColor: '#A7F3D0' }}
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Bulk Deduplication &amp; Reconciliation Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-plum-950 mt-1">
          CSV Batch Import &amp; Reconciliation Preview
        </h1>
        <p className="text-base text-charcoal-500 mt-2 max-w-3xl leading-relaxed">
          Simulate ingesting 1,250 external hackathon or webinar registrations. Previews duplicate identity resolution without mutating live MongoDB collections.
        </p>
      </div>

      {/* Simulator Action Box */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 border shadow-card card-3d flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        style={{ borderColor: '#EFEAE3' }}
      >
        <div className="space-y-2">
          <h3 className="text-xl font-serif font-bold text-plum-950">
            Simulate 1,250 Registrations File Ingestion
          </h3>
          <p className="text-sm text-charcoal-600 max-w-xl leading-relaxed">
            Evaluates candidates against existing MongoDB records using normalized phone and email algorithms. Re-uploading identical rows will never create duplicate profiles.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSimulateCSV}
          disabled={loading}
          className="px-6 py-3.5 rounded-xl text-sm font-bold text-white shadow-md transition flex items-center gap-2.5 shrink-0"
          style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>{loading ? 'Reconciling Records...' : 'Run 1,250 Row CSV Preview'}</span>
        </motion.button>
      </motion.div>

      {/* Summary KPI Cards */}
      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                Matched Existing Members
              </span>
              <div className="text-3xl font-extrabold text-emerald-950 font-mono mt-1.5">
                {result.summary?.existingMatches} Profiles
              </div>
              <span className="text-xs text-emerald-800 block mt-1 font-medium">
                Existing unified profile reused with history
              </span>
            </div>

            <div className="bg-blue-50/70 p-6 rounded-3xl border border-blue-200 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 block">
                New Distinct Members
              </span>
              <div className="text-3xl font-extrabold text-blue-950 font-mono mt-1.5">
                {result.summary?.newMembers} Profiles
              </div>
              <span className="text-xs text-blue-800 block mt-1 font-medium">
                Fresh HerJourney identity anchor created
              </span>
            </div>

            <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-200 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                Review Required (Ambiguous)
              </span>
              <div className="text-3xl font-extrabold text-amber-950 font-mono mt-1.5">
                {result.summary?.reviewRequired} Profiles
              </div>
              <span className="text-xs text-amber-800 block mt-1 font-medium">
                Held in review queue to prevent corruption
              </span>
            </div>
          </div>

          {/* Detailed Batch Breakdown Table */}
          <div className="bg-white rounded-3xl border shadow-card overflow-hidden" style={{ borderColor: '#EFEAE3' }}>
            <div className="p-5 bg-gray-50/70 border-b flex items-center justify-between" style={{ borderColor: '#EFEAE3' }}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-plum-950">
                Sample Row Reconciliations
              </h3>
              <span className="text-xs text-charcoal-500 font-mono">
                Simulated 1,250 Rows
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-charcoal-400 uppercase tracking-wider font-bold text-xs" style={{ borderColor: '#EFEAE3' }}>
                    <th className="py-3.5 px-4">Incoming CSV Record</th>
                    <th className="py-3.5 px-4">Contact Key</th>
                    <th className="py-3.5 px-4">Classification</th>
                    <th className="py-3.5 px-4">Reconciliation Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#F3EFE9' }}>
                  {result.previewItems?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-purple-50/20 transition">
                      <td className="py-4 px-4">
                        <span className="font-bold text-plum-950 block">{item.row?.name}</span>
                        <span className="text-xs text-charcoal-500">{item.row?.city} • {item.row?.skills?.join(', ')}</span>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-charcoal-700">
                        {item.row?.phone} <br />
                        <span className="text-charcoal-400">{item.row?.email}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                          item.classification === 'MATCHED_EXISTING'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : item.classification === 'REVIEW_REQUIRED'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-blue-50 text-blue-800 border-blue-300'
                        }`}>
                          {item.badge}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-charcoal-600 max-w-md leading-relaxed">
                        {item.explanation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
