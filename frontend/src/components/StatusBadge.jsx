import React from 'react';

const STAGE_STYLES = {
  // Application Stages
  'Applied': 'bg-plum-50 text-plum-800 border-plum-200',
  'Screening': 'bg-roseMauve-50 text-roseMauve-700 border-roseMauve-200',
  'Interview': 'bg-purple-50 text-purple-700 border-purple-200',
  'Sessions': 'bg-coral-50 text-coral-700 border-coral-200',
  'Completed': 'bg-sage-50 text-sage-600 border-emerald-200',
  'Placed': 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
  
  // Statuses
  'Invited': 'bg-amber-50 text-amber-800 border-amber-200',
  'Registered': 'bg-blue-50 text-blue-700 border-blue-200',
  'In Progress': 'bg-roseMauve-50 text-roseMauve-700 border-roseMauve-200',
  'Active': 'bg-emerald-50 text-emerald-700 border-emerald-200',

  // Outcomes
  'Reported': 'bg-amber-50 text-amber-700 border-amber-200',
  'Verified': 'bg-emerald-50 text-emerald-700 border-emerald-200',

  // Verification & Consent
  'Granted': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Pending': 'bg-amber-50 text-amber-700 border-amber-200'
};

export default function StatusBadge({ status, size = 'sm' }) {
  if (!status) return null;
  const style = STAGE_STYLES[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  const sizeClasses = size === 'xs' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${style} ${sizeClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75"></span>
      {status}
    </span>
  );
}

