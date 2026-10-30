import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  WifiOff, 
  Smartphone, 
  Languages, 
  PhoneCall, 
  Volume2, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Radio, 
  Zap, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useLowData } from '../context/LowDataContext';

export default function RukminiShowcase() {
  const { lowDataMode, toggleLowDataMode } = useLowData();
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [audioPlaying, setAudioPlaying] = useState(false);

  const hindiContent = {
    title: 'रुक्मिणी के लिए समावेशी डिज़ाइन वास्तुकला',
    subtitle: 'कम बैंडविड्थ, बुनियादी स्मार्टफोन और क्षेत्रीय भाषा समर्थन',
    personaName: 'रुक्मिणी देवी',
    personaDesc: 'उम्र: 29 • जयपुर (राजस्थान) • पहली पीढ़ी की पेशेवर • बुनियादी फोन • 2G/कमजोर 3G इंटरनेट',
    goal: 'लक्ष्य: दूरस्थ ग्राहक सहायता / डिजिटल संचालन में सम्मानजनक आजीविका',
    status: 'करियर स्थिति: 24 महीने का अंतराल (देखभाल अवकाश)'
  };

  const englishContent = {
    title: 'Inclusive Architecture for Rukmini',
    subtitle: 'Low Bandwidth, Basic Smart/Feature Phones & Regional Language Infrastructure',
    personaName: 'Rukmini Devi',
    personaDesc: 'Age: 29 • Jaipur (Peri-urban) • First-generation professional • Basic phone • Weak 2G/3G connectivity',
    goal: 'Goal: Digital operations & customer support livelihood with local economic dignity',
    status: 'Career Stage: 24-Month Career Break (Caregiving)'
  };

  const c = selectedLanguage === 'hi' ? hindiContent : englishContent;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: '#EFEAE3' }}>
        <div>
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
            style={{ backgroundColor: '#FEF8F6', color: '#AD3F27', borderColor: '#F9DCD3' }}
          >
            <WifiOff className="w-4 h-4 text-orange-600" />
            Core Inclusivity Requirement
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-plum-950 mt-1">
            {c.title}
          </h1>
          <p className="text-base text-charcoal-500 mt-2">
            {c.subtitle}
          </p>
        </div>

        {/* Language & Low Data Controls */}
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-2xl bg-gray-100 p-1 border border-gray-200">
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLanguage === 'en' ? 'bg-white text-plum-900 shadow-sm' : 'text-charcoal-500 hover:text-plum-950'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLanguage('hi')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLanguage === 'hi' ? 'bg-purple-900 text-white shadow-sm' : 'text-charcoal-500 hover:text-plum-950'
              }`}
            >
              हिन्दी (Hindi)
            </button>
          </div>

          <button
            onClick={toggleLowDataMode}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
              lowDataMode ? 'bg-amber-500 text-plum-950' : 'bg-white border border-gray-200 text-charcoal-700 hover:bg-gray-50'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{lowDataMode ? 'Low Data: ON' : 'Toggle Low Data'}</span>
          </button>
        </div>
      </div>

      {/* Persona Snapshot Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden card-3d"
        style={{
          background: 'linear-gradient(135deg, #42133F 0%, #702654 60%, #42133F 100%)'
        }}
      >
        <div 
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(242,140,120,0.2) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-pink-200 block">
              User Profile Spotlight
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">{c.personaName}</h2>
            <p className="text-sm text-pink-100/90 max-w-xl leading-relaxed">{c.personaDesc}</p>
            <p className="text-sm text-orange-200 font-medium">{c.goal}</p>
          </div>

          <div 
            className="p-5 rounded-2xl border text-xs text-pink-100 space-y-2 min-w-[220px]"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <p className="font-bold text-white uppercase text-[11px] tracking-wider border-b border-white/20 pb-1">
              Target Device Profile:
            </p>
            <p>• Screen: 360px × 640px viewport</p>
            <p>• Memory: 1.5 GB RAM limit</p>
            <p>• Latency: High latency (250ms+)</p>
            <p>• Audio preference: Enabled</p>
          </div>
        </div>
      </motion.div>

      {/* 5 Technical Pillars for Rukmini */}
      <div className="space-y-6">
        <h3 className="text-2xl font-serif font-bold text-plum-950">
          5 Production Architecture Pillars Built for Rukmini
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: Lightweight DOM */}
          <div className="bg-white p-7 rounded-3xl border shadow-card space-y-3 card-3d" style={{ borderColor: '#EFEAE3' }}>
            <div className="flex items-center gap-2.5 text-plum-950 font-bold text-base">
              <Zap className="w-5 h-5 text-orange-600" />
              <span>1. Zero Heavy Asset Payload (Sub-150KB)</span>
            </div>
            <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
              Eliminated marketing videos and oversized bitmaps. UI relies entirely on SVG icons, system typography, and Tailwind CSS utilities, allowing initial paint in under 1.2 seconds over 2G/3G networks.
            </p>
          </div>

          {/* Pillar 2: Low Data Mode */}
          <div className="bg-white p-7 rounded-3xl border shadow-card space-y-3 card-3d" style={{ borderColor: '#EFEAE3' }}>
            <div className="flex items-center gap-2.5 text-plum-950 font-bold text-base">
              <WifiOff className="w-5 h-5 text-amber-600" />
              <span>2. Dedicated "Low Data Mode" Client Engine</span>
            </div>
            <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
              When toggled, HerJourney suppresses non-essential network fetches, disables decorative gradients, sets strict HTTP caching headers, and optimizes form submissions into single lightweight payloads.
            </p>
          </div>

          {/* Pillar 3: Audio & Hindi Voice Integration */}
          <div className="bg-white p-7 rounded-3xl border shadow-card space-y-3 card-3d" style={{ borderColor: '#EFEAE3' }}>
            <div className="flex items-center gap-2.5 text-plum-950 font-bold text-base">
              <Volume2 className="w-5 h-5 text-purple-800" />
              <span>3. Regional Language &amp; Audio Explainers</span>
            </div>
            <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
              First-generation learners can listen to 30-second audio explainers for programme requirements rather than struggling through dense legalistic English text.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setAudioPlaying(!audioPlaying)}
                className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-xl text-xs font-bold border border-purple-200 transition flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4 text-purple-700" />
                <span>{audioPlaying ? 'ऑडियो बज रहा है... (Audio Playing)' : 'सुनें: कार्यक्रम की जानकारी (Listen Audio)'}</span>
              </button>
            </div>
          </div>

          {/* Pillar 4: SMS / IVR Headless Fallback */}
          <div className="bg-white p-7 rounded-3xl border shadow-card space-y-3 card-3d" style={{ borderColor: '#EFEAE3' }}>
            <div className="flex items-center gap-2.5 text-plum-950 font-bold text-base">
              <PhoneCall className="w-5 h-5 text-emerald-600" />
              <span>4. SMS &amp; IVR Headless State Sync</span>
            </div>
            <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
              If Rukmini's phone loses data entirely, her single identity supports two-way SMS triggers: "Reply 1 to confirm Session 1 attendance". The backend writes directly to the same MongoDB `Application` collection.
            </p>
          </div>

          {/* Pillar 5: Offline-First LocalStorage Caching */}
          <div className="bg-white p-7 rounded-3xl border shadow-card space-y-3 card-3d md:col-span-2" style={{ borderColor: '#EFEAE3' }}>
            <div className="flex items-center gap-2.5 text-plum-950 font-bold text-base">
              <Layers className="w-5 h-5 text-purple-900" />
              <span>5. Offline Identity &amp; Credential Caching</span>
            </div>
            <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
              Her unified credential, certificate IDs, and registered cohort dates are cached locally via Service Worker &amp; LocalStorage so she can inspect her credentials without incurring recurring mobile data tariffs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
