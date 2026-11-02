import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ExecutiveLanding from './components/ExecutiveLanding';
import MemberWorkspace from './components/MemberWorkspace';
import ProgrammeManager from './components/ProgrammeManager';
import ScopedEmployerPortal from './components/ScopedEmployerPortal';
import CertificateModal from './components/CertificateModal';
import ExplainerModal from './components/ExplainerModal';
import CreateProgrammeModal from './components/CreateProgrammeModal';
import { 
  INITIAL_PERSONAS, 
  INITIAL_PROGRAMMES, 
  INITIAL_APPLICATIONS 
} from './data/mockData';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [personaId, setPersonaId] = useState('user_priya_returner');
  const [personas, setPersonas] = useState(INITIAL_PERSONAS);
  const [programmes, setProgrammes] = useState(INITIAL_PROGRAMMES);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  
  // Language & Low-Bandwidth Mode state
  const [language, setLanguage] = useState('en');
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);

  // Modals state
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activeExplainer, setActiveExplainer] = useState(null);
  const [isCreateProgOpen, setIsCreateProgOpen] = useState(false);

  // Attempt API sync if backend server is available
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, progRes, appRes] = await Promise.all([
          fetch('/api/personas'),
          fetch('/api/programmes'),
          fetch('/api/applications')
        ]);

        if (pRes.ok) {
          const pData = await pRes.json();
          if (pData && pData.length > 0) setPersonas(pData);
        }
        if (progRes.ok) {
          const progData = await progRes.json();
          if (progData && progData.length > 0) setProgrammes(progData);
        }
        if (appRes.ok) {
          const appData = await appRes.json();
          if (appData && appData.length > 0) setApplications(appData);
        }
      } catch (e) {
        // Operates seamlessly with in-memory datasets
      }
    };
    fetchData();
  }, []);

  const currentPersona = personas.find(p => p.id === personaId) || personas[0];

  // Stage change handler (Kanban moves)
  const handleUpdateStage = async (appId, newStage) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        const isPlaced = newStage === 'Placed';
        return {
          ...a,
          stage: newStage,
          postPlacementRetention: {
            ...a.postPlacementRetention,
            status: isPlaced ? 'Verified_Employed' : a.postPlacementRetention.status,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        };
      }
      return a;
    }));

    try {
      await fetch(`/api/applications/${appId}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage })
      });
    } catch (e) {
      // local state already updated
    }
  };

  // Retention verification handler
  const handleUpdateRetention = async (appId, status, notes) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          postPlacementRetention: {
            ...a.postPlacementRetention,
            status,
            notes: notes || a.postPlacementRetention.notes,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        };
      }
      return a;
    }));

    try {
      await fetch(`/api/applications/${appId}/retention`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });
    } catch (e) {
      // local state already updated
    }
  };

  // Bulk import handler
  const handleBulkImport = async (candidates, programmeId) => {
    const prog = programmes.find(p => p.id === programmeId) || programmes[0];
    const newRecords = candidates.map((cand, idx) => ({
      id: `app-bulk-${Date.now()}-${idx}`,
      programmeId: prog.id,
      programmeTitle: prog.title,
      partnerName: prog.partnerName,
      userId: `user_bulk_${idx}`,
      applicantName: cand.name,
      applicantEmail: cand.email,
      applicantPhone: cand.phone,
      applicantStage: cand.stage || 'Returner',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      careerBreakMonths: Number(cand.careerBreakMonths) || 0,
      skills: cand.skills || ['Full Stack Development', 'Problem Solving'],
      matchScore: Math.floor(84 + Math.random() * 15),
      stage: 'Applied',
      attendanceRate: 100,
      certificates: [],
      postPlacementRetention: {
        status: 'Pending',
        checkInDate: '2026-07-01',
        threeMonthReviewDate: '2026-10-01',
        notes: 'Enrolled via Bulk Registration batch.',
        lastUpdated: new Date().toISOString().split('T')[0]
      },
      reviewStatus: 'Clear'
    }));

    setApplications(prev => [...newRecords, ...prev]);

    try {
      await fetch('/api/applications/bulk-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidates, programmeId })
      });
    } catch (e) {
      // local state already updated
    }
  };

  // Create Programme handler
  const handleCreateProgramme = async (newProg) => {
    setProgrammes(prev => [newProg, ...prev]);
    try {
      await fetch('/api/programmes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProg)
      });
    } catch (e) {
      // local state already updated
    }
  };

  return (
    <div className={`min-h-screen ${isLowBandwidth ? 'low-bandwidth-mode bg-stone-50' : 'bg-pearl-100'} flex flex-col selection:bg-rosegold-400 selection:text-white`}>
      
      {/* Low-Bandwidth Notification Pill */}
      {isLowBandwidth && (
        <div className="bg-amber-600 text-white text-xs py-1.5 px-4 text-center font-bold flex items-center justify-center gap-2">
          <span>⚡ Ultra Low-Bandwidth Mode Active: 3G/Regional Optimization • Images Compressed • Animations Disabled</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentPersona={currentPersona}
        setPersonaId={setPersonaId}
        personas={personas}
        language={language}
        setLanguage={setLanguage}
        isLowBandwidth={isLowBandwidth}
        setIsLowBandwidth={setIsLowBandwidth}
      />

      {/* Main Interactive Stage Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {activeTab === 'landing' && (
          <ExecutiveLanding
            onSelectPersona={setPersonaId}
            onNavigateTab={setActiveTab}
            personas={personas}
            language={language}
          />
        )}

        {activeTab === 'member' && (
          <MemberWorkspace
            currentPersona={currentPersona}
            personas={personas}
            onSelectPersona={setPersonaId}
            onOpenCertificate={setActiveCertificate}
            onOpenExplainer={(rec, user) => setActiveExplainer({ rec, user })}
            language={language}
          />
        )}

        {activeTab === 'programme' && (
          <ProgrammeManager
            programmes={programmes}
            applications={applications}
            onUpdateStage={handleUpdateStage}
            onBulkImport={handleBulkImport}
            onOpenCreateProgramme={() => setIsCreateProgOpen(true)}
          />
        )}

        {activeTab === 'employer' && (
          <ScopedEmployerPortal
            applications={applications}
            programmes={programmes}
            onUpdateRetention={handleUpdateRetention}
            language={language}
          />
        )}
      </main>

      {/* Modals */}
      {activeCertificate && (
        <CertificateModal
          event={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {activeExplainer && (
        <ExplainerModal
          recommendation={activeExplainer.rec}
          user={activeExplainer.user}
          onClose={() => setActiveExplainer(null)}
        />
      )}

      {isCreateProgOpen && (
        <CreateProgrammeModal
          isOpen={isCreateProgOpen}
          onClose={() => setIsCreateProgOpen(false)}
          onSave={handleCreateProgramme}
        />
      )}

      {/* Enterprise Footer */}
      <footer className="border-t border-stone-200/80 bg-white/70 py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-rosegold-500 fill-rosegold-400" />
            <span className="font-extrabold text-stone-800">HerJourney</span>
            <span>• Bharat National Career Ecosystem for 1M+ Women</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] font-semibold">
            <span className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> DPDP Act 2023 Certified
            </span>
            <span>Equal Opportunity Employer Network</span>
            <span>Bengaluru • Mumbai • Chennai • Delhi</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

