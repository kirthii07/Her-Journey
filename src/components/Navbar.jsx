import React, { useState } from 'react';
import { 
  Sparkles, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Layers, 
  Globe2, 
  Zap, 
  ChevronDown,
  Building2,
  Heart,
  CheckCircle2
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentPersona, 
  setPersonaId, 
  personas, 
  language, 
  setLanguage,
  isLowBandwidth,
  setIsLowBandwidth
}) {
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const navItems = [
    { id: 'landing', label: t.tabLanding, icon: Sparkles },
    { id: 'member', label: t.tabMember, icon: Users },
    { id: 'programme', label: t.tabPrograms, icon: Layers },
    { id: 'employer', label: t.tabEmployer, icon: Building2 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-stone-200/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Mission */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-amethyst-800 via-rosegold-500 to-indigo-600 p-[2px] shadow-md hover:scale-105 transition">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Heart className="w-6 h-6 text-amethyst-800 fill-rosegold-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emeraldsuccess-500 rounded-full border-2 border-white" title="Verified Network" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight font-display bg-gradient-to-r from-amethyst-900 via-amethyst-700 to-indigo-800 bg-clip-text text-transparent">
                  HerJourney
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rosegold-100 text-rosegold-700 rounded-md">
                  India
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium">1M+ Women • Bharat Career Ecosystem</p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center p-1.5 bg-stone-100/80 rounded-2xl border border-stone-200/80 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-amethyst-900 shadow-sm border border-stone-200/60 font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amethyst-700' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Persona Switcher, Regional Mode & Low-Bandwidth */}
          <div className="flex items-center space-x-2.5">
            
            {/* Low-Bandwidth Switcher */}
            <button
              onClick={() => setIsLowBandwidth(!isLowBandwidth)}
              title={isLowBandwidth ? 'Switch to Rich Visual Mode' : 'Switch to Ultra Low-Bandwidth Regional Mode (Save 85% data)'}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition ${
                isLowBandwidth 
                  ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                  : 'bg-white/80 text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isLowBandwidth ? 'text-amber-700 fill-amber-700' : 'text-stone-400'}`} />
              <span className="hidden sm:inline">{isLowBandwidth ? 'Low-Data: ON' : 'Low-Bandwidth'}</span>
            </button>

            {/* Regional Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-white/80 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
              >
                <Globe2 className="w-3.5 h-3.5 text-amethyst-700" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-stone-100 py-1.5 z-50 animate-fadeIn">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिंदी (Hindi)' },
                    { code: 'ta', label: 'தமிழ் (Tamil)' },
                  ].map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-amethyst-50 flex items-center justify-between ${
                        language === l.code ? 'text-amethyst-800 font-bold bg-amethyst-50/50' : 'text-stone-700'
                      }`}
                    >
                      <span>{l.label}</span>
                      {language === l.code && <CheckCircle2 className="w-3 h-3 text-amethyst-700" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Multi-Persona Switcher (Interactive Testing Hub) */}
            <div className="relative">
              <button
                onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
                className="flex items-center space-x-2 pl-2 pr-3 py-1 bg-gradient-to-r from-amethyst-50 to-rosegold-50 border border-amethyst-200/80 rounded-2xl text-xs font-semibold text-amethyst-900 hover:shadow-sm transition"
              >
                <img
                  src={currentPersona.avatar}
                  alt={currentPersona.name}
                  className="w-7 h-7 rounded-xl object-cover border border-white shadow-xs"
                />
                <div className="text-left hidden lg:block">
                  <div className="text-[11px] font-bold leading-tight flex items-center gap-1">
                    {currentPersona.name}
                  </div>
                  <div className="text-[10px] text-amethyst-700 font-medium">{currentPersona.roleTag}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-amethyst-600 ml-0.5" />
              </button>

              {isPersonaMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-100 p-2 z-50 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-stone-100 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Switch Test Lifecycle Persona
                  </div>
                  <div className="space-y-1 mt-1">
                    {personas.map((p) => {
                      const isSelected = p.id === currentPersona.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            setPersonaId(p.id);
                            setIsPersonaMenuOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-xl flex items-center space-x-2.5 transition ${
                            isSelected
                              ? 'bg-amethyst-50/80 border border-amethyst-200/70 text-amethyst-950 font-semibold'
                              : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold leading-tight flex items-center justify-between">
                              <span className="truncate">{p.name}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600 font-semibold">
                                {p.lifecycleStage}
                              </span>
                            </div>
                            <p className="text-[10px] text-stone-500 truncate mt-0.5">{p.roleTag}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-stone-200/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition ${
                  isActive ? 'text-amethyst-800 font-bold' : 'text-stone-500'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-amethyst-700' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}

