import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function FunnelChart({ data = [], title = 'Programme Talent Funnel' }) {
  if (!data || data.length === 0) {
    return <div className="p-4 text-xs text-charcoal-400">No funnel data available</div>;
  }

  const maxVal = Math.max(...data.map(d => d.count), 1);

  return (
    <div 
      className="bg-white rounded-3xl p-6 sm:p-7 border shadow-card card-3d"
      style={{ borderColor: '#EFEAE3' }}
    >
      <div className="flex items-center justify-between mb-5 pb-3 border-b" style={{ borderColor: '#EFEAE3' }}>
        <h4 className="text-base font-serif font-bold text-plum-950">{title}</h4>
        <span className="text-xs text-charcoal-400 font-medium">Real-time Stage Funnel</span>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => {
          const widthPercent = Math.max(16, Math.round((item.count / maxVal) * 100));
          const prevItem = index > 0 ? data[index - 1] : null;
          const dropoff = prevItem && prevItem.count > 0 
            ? Math.round((item.count / prevItem.count) * 100) 
            : 100;

          return (
            <div key={item.stage} className="relative">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="font-bold text-plum-950 text-sm">{item.stage}</span>
                <div className="flex items-center gap-2.5">
                  {prevItem && (
                    <span className="text-xs text-charcoal-400 font-mono">
                      {dropoff}% yield
                    </span>
                  )}
                  <span 
                    className="font-mono font-bold px-2.5 py-0.5 rounded-lg border text-xs"
                    style={{ backgroundColor: '#FAF5FA', color: '#42133F', borderColor: '#E8D1E8' }}
                  >
                    {item.count}
                  </span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div 
                className="w-full rounded-full h-3.5 overflow-hidden p-0.5"
                style={{ backgroundColor: '#FAF7F3', border: '1px solid #E8E1D7' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: item.fill || '#42133F',
                    boxShadow: '0 2px 6px rgba(66, 19, 63, 0.2)'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Yield */}
      <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs text-charcoal-600" style={{ borderColor: '#EFEAE3' }}>
        <span className="font-medium">Total Cohort Placement Yield:</span>
        <span className="font-bold text-plum-950 font-mono text-sm">
          {Math.round(((data[data.length - 1]?.count || 0) / (data[0]?.count || 1)) * 100)}%
        </span>
      </div>
    </div>
  );
}
