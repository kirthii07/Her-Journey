import React from 'react';

export function CardSkeleton({ className = '' }) {
  return (
    <div className={`p-6 rounded-3xl bg-white border border-ivory-300 shadow-card space-y-4 animate-shimmer ${className}`}>
      <div className="h-4 w-1/3 bg-ivory-300/70 rounded-full"></div>
      <div className="h-6 w-3/4 bg-ivory-300 rounded-lg"></div>
      <div className="space-y-2 pt-2">
        <div className="h-3 w-full bg-ivory-200 rounded"></div>
        <div className="h-3 w-5/6 bg-ivory-200 rounded"></div>
      </div>
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="space-y-6 pl-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-ivory-300 animate-shimmer">
      {[1, 2, 3].map((i) => (
        <div key={i} className="relative">
          <div className="absolute -left-8 top-1.5 w-6 h-6 rounded-full bg-ivory-300"></div>
          <div className="bg-white p-5 rounded-2xl border border-ivory-300 space-y-3">
            <div className="h-3 w-16 bg-ivory-200 rounded-full"></div>
            <div className="h-5 w-48 bg-ivory-300 rounded"></div>
            <div className="h-3 w-full bg-ivory-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 4 }) {
  return (
    <div className="space-y-3 p-4 bg-white rounded-2xl border border-ivory-300 animate-shimmer">
      <div className="h-6 w-1/4 bg-ivory-300 rounded"></div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-ivory-200">
          <div className="h-4 w-1/4 bg-ivory-200 rounded"></div>
          <div className="h-4 w-1/4 bg-ivory-200 rounded"></div>
          <div className="h-4 w-1/6 bg-ivory-200 rounded"></div>
          <div className="h-6 w-20 bg-ivory-300 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
}

