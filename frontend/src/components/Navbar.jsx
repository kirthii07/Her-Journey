import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Sparkles,
  Award,
  ShieldCheck,
  Wifi,
  WifiOff,
  ChevronDown,
  Layers,
  Building2,
  CheckCircle,
  Menu,
  X,
  Bell,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLowData } from '../context/LowDataContext';

export default function Navbar() {
  const { role, currentUser, currentMember, currentPartner, loginAs, switchMember } = useAuth();
  const { lowDataMode, toggleLowDataMode } = useLowData();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const memberLinks = [
    { name: 'My Journey', path: '/member' },
    { name: 'Programmes', path: '/member/programmes' },
    { name: 'Opportunities', path: '/member/opportunities' },
    { name: 'Communities', path: '/member/communities' },
    { name: 'Profile & Privacy', path: '/member/profile' }
  ];

  const managerLinks = [
    { name: 'Overview', path: '/manager' },
    { name: 'Returnship 2026', path: '/manager/programmes/returnship' },
    { name: 'Eligible Members', path: '/manager/eligible-members' },
    { name: 'Review Queue', path: '/manager/review-queue' },
    { name: 'Reconciliation', path: '/manager/reconciliation' }
  ];

  const partnerLinks = [
    { name: 'Partner Dashboard', path: '/partner' }
  ];

  const links = role === 'MANAGER' ? managerLinks : role === 'PARTNER' ? partnerLinks : memberLinks;

  const personaButtons = [
    {
      label: 'Priya (Returner)',
      active: role === 'MEMBER' && currentMember?.name?.includes('Priya'),
      onClick: () => loginAs('MEMBER', 'priya'),
      activeClass: 'bg-rose-500 text-white ring-1 ring-white/30',
    },
    {
      label: 'Ananya (Student)',
      active: role === 'MEMBER' && currentMember?.name?.includes('Ananya'),
      onClick: () => loginAs('MEMBER', 'ananya'),
      activeClass: 'bg-rose-500 text-white ring-1 ring-white/30',
    },
    {
      label: 'Meena (Early Career)',
      active: role === 'MEMBER' && currentMember?.name?.includes('Meena'),
      onClick: () => loginAs('MEMBER', 'meena'),
      activeClass: 'bg-rose-500 text-white ring-1 ring-white/30',
    },
    {
      label: 'Lakshmi (Leader)',
      active: role === 'MEMBER' && currentMember?.name?.includes('Lakshmi'),
      onClick: () => loginAs('MEMBER', 'lakshmi'),
      activeClass: 'bg-rose-500 text-white ring-1 ring-white/30',
    },
    {
      label: 'Programme Manager',
      active: role === 'MANAGER',
      onClick: () => loginAs('MANAGER'),
      activeClass: 'bg-coral-500 text-white ring-1 ring-white/30',
    },
    {
      label: 'Hiring Partner',
      active: role === 'PARTNER',
      onClick: () => loginAs('PARTNER'),
      activeClass: 'bg-sage-500 text-white ring-1 ring-white/30',
    },
  ];

  const displayName = role === 'MEMBER'
    ? currentMember?.name
    : role === 'MANAGER'
    ? 'Maya Rao'
    : 'Acme Corp';

  const avatarInitial = role === 'MEMBER'
    ? (currentMember?.name?.[0] || 'P')
    : role === 'MANAGER'
    ? 'M'
    : 'A';

  return (
    <header className="sticky top-0 z-50">
      {/* ── TOP RIBBON ─────────────────────────────── */}
      <div className="bg-plum-900 h-10 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-2">
          {/* Persona switcher pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-caption font-medium text-white/50 uppercase tracking-wider hidden sm:inline">
              Switch:
            </span>
            {personaButtons.map((btn) => (
              <button
                key={btn.label}
                onClick={btn.onClick}
                className={`text-caption font-medium px-2.5 py-0.5 rounded-lg transition-all duration-200 ${
                  btn.active
                    ? btn.activeClass
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Right: Low Data + Rukmini */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/rukmini-showcase"
              className="text-caption font-medium text-white/70 hover:text-white transition-colors underline underline-offset-2 hidden sm:inline"
            >
              Rukmini Low-Bandwidth
            </Link>
            <button
              onClick={toggleLowDataMode}
              title="Low Data Mode for low-bandwidth devices"
              className={`inline-flex items-center gap-1 text-caption font-medium px-2.5 py-0.5 rounded-lg transition-all duration-200 ${
                lowDataMode
                  ? 'bg-gold-500 text-plum-900'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {lowDataMode ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
              <span>{lowDataMode ? 'Low Data: ON' : 'Low Data'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN BAR ───────────────────────────────── */}
      <div className="bg-white h-18 border-b border-ivory-400 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-full flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl shadow-md group-hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #3B1C32 0%, #5D2150 100%)' }}
            >
              H
            </div>
            <div>
              <div className="font-display text-2xl text-plum-900 leading-none tracking-tight">
                HerJourney
              </div>
              <p className="text-caption text-charcoal-400 hidden sm:block mt-0.5">
                One identity. Every chapter.
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-body-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-plum-50 text-plum-800 font-semibold'
                    : 'text-charcoal-600 hover:text-plum-800 hover:bg-ivory-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Bell icon */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-charcoal-500 hover:text-plum-800 hover:bg-ivory-300 transition-all duration-200 border border-ivory-400"
                title="Notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral-500 ring-2 ring-white" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-3xl p-5 shadow-xl border border-ivory-400 z-50 space-y-3"
                  >
                    <span className="text-caption font-bold uppercase tracking-widest text-plum-800 block">
                      Live Cohort Updates
                    </span>
                    <div className="p-3.5 rounded-2xl bg-ivory-200 border border-ivory-400">
                      <p className="text-body-sm font-bold text-plum-900">Returnship 2026 — Session 3</p>
                      <p className="text-caption text-charcoal-500 mt-1">Attendance verified by Programme Director.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-ivory-200 border border-ivory-400">
                      <p className="text-body-sm font-bold text-plum-900">Acme Corp Hiring Portal</p>
                      <p className="text-caption text-charcoal-500 mt-1">Shortlisted for Senior Product Manager reentry track.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User identity */}
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="text-right">
                <span className="block text-body-sm font-semibold text-plum-900 leading-none">
                  {displayName}
                </span>
                <span className="block text-caption text-charcoal-400 mt-0.5 uppercase tracking-wider">
                  {role}
                </span>
              </div>
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm text-white shadow-sm"
                style={{ background: 'linear-gradient(135deg, #3B1C32 0%, #7E3466 100%)' }}
              >
                {avatarInitial}
              </div>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-charcoal-600 hover:bg-ivory-300 transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-white border-t border-ivory-400"
            >
              <div className="px-4 py-4 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-body font-semibold transition-all ${
                      isActive(link.path)
                        ? 'bg-plum-50 text-plum-800'
                        : 'text-charcoal-700 hover:bg-ivory-300 hover:text-plum-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/rukmini-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-body font-semibold text-coral-500 hover:bg-coral-50 transition-all"
                >
                  Rukmini Low-Bandwidth
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
