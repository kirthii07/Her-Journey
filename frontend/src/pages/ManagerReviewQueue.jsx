import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  GitMerge, 
  UserPlus, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import DuplicateReviewModal from '../components/DuplicateReviewModal';

export default function ManagerReviewQueue() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadQueue = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getReviewQueue();
      setItems(data || []);
    } catch (err) {
      console.error('Failed to load review queue:', err);
      setError(err.message || 'Unable to load review queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueue();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-plum-200 border-t-plum-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-md mx-auto">
          <p className="text-lg font-semibold text-plum-900">Unable to load review queue</p>
          <p className="text-sm text-charcoal-500">{error}</p>
          <button onClick={loadQueue} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-plum-800 hover:bg-plum-900 transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b pb-6" style={{ borderColor: '#EFEAE3' }}>
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
          style={{ backgroundColor: '#FEF3C7', color: '#92400E', borderColor: '#FDE68A' }}
        >
          <ShieldAlert className="w-4 h-4 text-amber-700" />
          Duplicate Detection Safeguard
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-plum-950 mt-1">
          Identity Disambiguation Review Queue
        </h1>
        <p className="text-base text-charcoal-500 mt-2 max-w-3xl leading-relaxed">
          When the deduplication engine encounters conflicting signals (e.g., matching phone but divergent emails), automatic merging is suspended to protect member data sovereignty.
        </p>
      </div>

      {/* Items list */}
      {items && items.length > 0 ? (
        <div className="space-y-5">
          {items.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-7 border shadow-card card-3d flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              style={{ borderColor: '#FDE68A' }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
                    Match Confidence: {item.confidenceScore}%
                  </span>
                  <span className="text-xs text-charcoal-400 font-mono">
                    Received: {new Date(item.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-plum-950">
                  Incoming Record: {item.incomingData?.name} ({item.incomingData?.phone})
                </h3>

                <div className="text-xs space-y-1.5">
                  {item.matchReasons?.map((reason, i) => (
                    <div key={i} className="flex items-center gap-2 text-amber-900 font-medium">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-charcoal-600">
                  Potential existing profile in MongoDB: <strong className="text-plum-950 font-bold">{item.matchedMemberId?.name}</strong> ({item.matchedMemberId?.careerStage})
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedItem(item)}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white shadow-md transition flex items-center gap-2 shrink-0"
                style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
              >
                <span>Inspect &amp; Resolve</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-white rounded-3xl border shadow-card" style={{ borderColor: '#EFEAE3' }}>
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h3 className="text-xl font-serif font-bold text-plum-950">Review Queue is Clear</h3>
          <p className="text-sm text-charcoal-500 mt-1 max-w-sm mx-auto">
            All member registrations across programmes have verified, unambiguous 1-identity records.
          </p>
        </div>
      )}

      {/* Review Modal */}
      <DuplicateReviewModal
        queueItem={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onResolved={() => loadQueue()}
      />
    </div>
  );
}
