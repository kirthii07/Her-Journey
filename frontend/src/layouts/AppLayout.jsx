import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-100 text-charcoal-900 pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <MobileNav />
      <footer className="hidden md:block bg-white border-t border-ivory-300 py-6 px-8 text-xs text-center text-charcoal-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-semibold text-plum-950">
            HerJourney • One identity. Every chapter of your career.
          </p>
          <p className="text-charcoal-400">
            Prototype demonstration with persistent MongoDB shared live state.
          </p>
        </div>
      </footer>
    </div>
  );
}

