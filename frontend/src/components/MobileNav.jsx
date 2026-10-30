import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Briefcase, Users, User, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MobileNav() {
  const { role } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const memberNav = [
    { label: 'Journey', path: '/member', icon: Compass },
    { label: 'Programmes', path: '/member/programmes', icon: Briefcase },
    { label: 'Opportunities', path: '/member/opportunities', icon: Sparkles },
    { label: 'Communities', path: '/member/communities', icon: Users },
    { label: 'Profile', path: '/member/profile', icon: User }
  ];

  const managerNav = [
    { label: 'Dashboard', path: '/manager', icon: Compass },
    { label: 'Returnship', path: '/manager/programmes/returnship', icon: Briefcase },
    { label: 'Eligible', path: '/manager/eligible-members', icon: Users },
    { label: 'Review', path: '/manager/review-queue', icon: ShieldCheck }
  ];

  const partnerNav = [
    { label: 'Portal', path: '/partner', icon: Building2 },
    { label: 'Talent', path: '/partner', icon: Users }
  ];

  const navItems = role === 'MANAGER' ? managerNav : role === 'PARTNER' ? partnerNav : memberNav;

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t py-2 px-3 shadow-2xl"
      style={{ borderColor: '#EFEAE3' }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.label}
              to={item.path}
              className="relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all"
              style={{
                color: active ? '#42133F' : '#716873'
              }}
            >
              {active && (
                <motion.div
                  layoutId="mobile-tab-indicator"
                  className="absolute inset-0 rounded-xl"
                  style={{ backgroundColor: 'rgba(66, 19, 63, 0.08)' }}
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <div className="relative z-10">
                <Icon className="w-5 h-5" />
              </div>
              <span className="relative z-10 text-[11px] font-bold mt-1 tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
