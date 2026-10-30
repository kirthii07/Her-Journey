import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LowDataProvider } from './context/LowDataContext';
import AppLayout from './layouts/AppLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import MemberDashboard from './pages/MemberDashboard';
import MemberProfile from './pages/MemberProfile';
import MemberProgrammes from './pages/MemberProgrammes';
import MemberOpportunities from './pages/MemberOpportunities';
import MemberCommunities from './pages/MemberCommunities';
import ManagerDashboard from './pages/ManagerDashboard';
import ManagerProgrammeDetail from './pages/ManagerProgrammeDetail';
import ManagerEligibleMembers from './pages/ManagerEligibleMembers';
import ManagerCreateProgramme from './pages/ManagerCreateProgramme';
import ManagerReviewQueue from './pages/ManagerReviewQueue';
import ManagerReconciliation from './pages/ManagerReconciliation';
import PartnerDashboard from './pages/PartnerDashboard';
import RukminiShowcase from './pages/RukminiShowcase';

export default function App() {
  return (
    <BrowserRouter>
      <LowDataProvider>
        <AuthProvider>
          <Routes>
            {/* Public Landing & Login */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/rukmini-showcase" element={<RukminiShowcase />} />

            {/* Authenticated Prototype Routes wrapped in Layout */}
            <Route element={<AppLayout />}>
              {/* Member Routes */}
              <Route path="/member" element={<MemberDashboard />} />
              <Route path="/member/profile" element={<MemberProfile />} />
              <Route path="/member/programmes" element={<MemberProgrammes />} />
              <Route path="/member/opportunities" element={<MemberOpportunities />} />
              <Route path="/member/communities" element={<MemberCommunities />} />

              {/* Programme Manager Routes */}
              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/manager/programmes/returnship" element={<ManagerProgrammeDetail />} />
              <Route path="/manager/eligible-members" element={<ManagerEligibleMembers />} />
              <Route path="/manager/create-programme" element={<ManagerCreateProgramme />} />
              <Route path="/manager/review-queue" element={<ManagerReviewQueue />} />
              <Route path="/manager/reconciliation" element={<ManagerReconciliation />} />

              {/* Employer Partner Routes */}
              <Route path="/partner" element={<PartnerDashboard />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </LowDataProvider>
    </BrowserRouter>
  );
}

