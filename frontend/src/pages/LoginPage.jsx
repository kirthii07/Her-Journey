import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Users, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { loginWithCredentials, loginAs } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('priya@demo.herjourney.app');
  const [password, setPassword] = useState('HerJourney@2026');
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);

  // Direct Credential Authentication (Hits backend API)
  const handleFormLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const res = await loginWithCredentials(email, password);
      setAuthSuccess(`Welcome back, ${res.user.name}`);
      
      setTimeout(() => {
        if (res?.user?.role === 'MEMBER') navigate('/member');
        else if (res?.user?.role === 'MANAGER') navigate('/manager');
        else if (res?.user?.role === 'PARTNER') navigate('/partner');
        else navigate('/member');
      }, 500);
    } catch (err) {
      setAuthError(err.message || 'Invalid email or password. Please verify your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  // Quick Persona Access
  const handleRoleAuth = async (role, memberKey, personaEmail) => {
    setSubmitting(true);
    setAuthError(null);
    setEmail(personaEmail);
    try {
      const res = await loginAs(role, memberKey, personaEmail);
      if (res?.user?.role === 'MEMBER') navigate('/member');
      else if (res?.user?.role === 'MANAGER') navigate('/manager');
      else if (res?.user?.role === 'PARTNER') navigate('/partner');
      else navigate('/member');
    } catch (err) {
      setAuthError(err.message || 'Unable to sign in with selected persona.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col md:flex-row" 
      style={{ backgroundColor: '#FAF7F3', color: '#29232B' }}
    >
      {/* Left Column: Premium Editorial Brand Showcase */}
      <div 
        className="md:w-5/12 p-8 sm:p-14 text-white flex flex-col justify-between relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #42133F 0%, #702654 60%, #42133F 100%)',
          boxShadow: '4px 0 24px rgba(66, 19, 63, 0.15)'
        }}
      >
        {/* Soft Background 3D Glow */}
        <div 
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(242,140,120,0.2) 0%, transparent 70%)' }}
        />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3.5 group mb-14">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-xl transition-transform group-hover:scale-105"
              style={{ 
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.25)'
              }}
            >
              H
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl tracking-tight text-white leading-none">HerJourney</span>
              <span className="text-xs text-pink-200 tracking-wider font-sans mt-1">LIFELONG CAREER COMMUNITY</span>
            </div>
          </Link>

          <div className="space-y-6 max-w-lg">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(242, 140, 120, 0.2)', color: '#F28C78' }}
            >
              <Sparkles className="w-4 h-4" />
              Unified Identity Network
            </div>

            <h2 className="text-page-headline text-white">
              One identity.<br />Every chapter of her career.
            </h2>

            <p className="text-body-lg text-pink-100 font-sans font-normal leading-relaxed">
              Never re-enter your qualifications across disconnected programs. HerJourney connects your college student skilling, mid-career growth, caregiving reentry, and executive mentorship under a single verifiable identity.
            </p>
          </div>

          {/* Unified Platform Advantage Callout */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 p-6 rounded-2xl max-w-md space-y-3"
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-5 h-5 text-coral-300" />
              <span className="text-base font-bold text-white tracking-wide">Single Verified Profile</span>
            </div>
            <p className="text-supporting text-pink-100/90 leading-relaxed">
              Stage updates, workshop attendance, and placement milestones reflect automatically across candidate timelines and partner talent pipelines without manual spreadsheets.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 pt-10 border-t border-white/15 text-xs text-pink-200/80 flex items-center justify-between">
          <span>HerJourney Platform</span>
          <span>Lifelong Career Ecosystem</span>
        </div>
      </div>

      {/* Right Column: Premium Authentication Card */}
      <div className="md:w-7/12 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="max-w-xl w-full space-y-8">
          <div>
            <h1 
              className="text-page-headline font-serif font-bold tracking-tight text-plum-950"
            >
              Sign In to Your Journey
            </h1>
            <p className="text-body-lg mt-2 text-charcoal-600">
              Sign in with your email or explore with an instant persona.
            </p>
          </div>

          <AnimatePresence>
            {authError && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-2xl border flex items-start gap-3 bg-red-50 border-red-200 text-red-900 text-sm font-medium"
              >
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                <div>
                  <div className="font-bold">Authentication Failed</div>
                  <div className="text-xs text-red-700 mt-0.5">{authError}</div>
                </div>
              </motion.div>
            )}

            {authSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-2xl border flex items-center gap-3 bg-emerald-50 border-emerald-200 text-emerald-900 text-sm font-medium"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <span>{authSuccess}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instant Persona Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-plum-900">
                Instant Persona Access
              </span>
              <span className="text-xs font-medium text-charcoal-500">
                Demo Password: <code className="bg-white px-2 py-0.5 rounded border border-gray-200 font-mono text-plum-900 font-bold">HerJourney@2026</code>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Persona 1: Priya Sharma (Member) */}
              <button
                type="button"
                onClick={() => handleRoleAuth('MEMBER', 'priya', 'priya@demo.herjourney.app')}
                disabled={submitting}
                className="p-4 rounded-2xl border text-left transition-all group flex flex-col justify-between"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#EFEAE3',
                  boxShadow: '0 2px 8px rgba(66, 19, 63, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C66B91';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(66, 19, 63, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#EFEAE3';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(66, 19, 63, 0.05)';
                }}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base"
                    style={{ backgroundColor: '#42133F' }}
                  >
                    P
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200">
                    MEMBER
                  </span>
                </div>
                <div>
                  <div className="font-bold text-base text-gray-900">Priya Sharma</div>
                  <div className="text-xs text-charcoal-600 mt-0.5">Returner • 34 yrs</div>
                  <div className="text-xs text-purple-900 font-mono mt-1">priya@demo.herjourney.app</div>
                </div>
              </button>

              {/* Persona 2: Maya Rao (Manager) */}
              <button
                type="button"
                onClick={() => handleRoleAuth('MANAGER', null, 'manager@demo.herjourney.app')}
                disabled={submitting}
                className="p-4 rounded-2xl border text-left transition-all group flex flex-col justify-between"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#EFEAE3',
                  boxShadow: '0 2px 8px rgba(66, 19, 63, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#F28C78';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(242, 140, 120, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#EFEAE3';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(66, 19, 63, 0.05)';
                }}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base"
                    style={{ backgroundColor: '#F28C78' }}
                  >
                    M
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-900 border border-orange-200">
                    MANAGER
                  </span>
                </div>
                <div>
                  <div className="font-bold text-base text-gray-900">Maya Rao</div>
                  <div className="text-xs text-charcoal-600 mt-0.5">Programme Director</div>
                  <div className="text-xs text-orange-800 font-mono mt-1">manager@demo.herjourney.app</div>
                </div>
              </button>

              {/* Persona 3: Acme Corp (Partner) */}
              <button
                type="button"
                onClick={() => handleRoleAuth('PARTNER', null, 'partner@demo.herjourney.app')}
                disabled={submitting}
                className="p-4 rounded-2xl border text-left transition-all group flex flex-col justify-between"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#EFEAE3',
                  boxShadow: '0 2px 8px rgba(66, 19, 63, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#27845D';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(39, 132, 93, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#EFEAE3';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(66, 19, 63, 0.05)';
                }}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base"
                    style={{ backgroundColor: '#27845D' }}
                  >
                    A
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                    PARTNER
                  </span>
                </div>
                <div>
                  <div className="font-bold text-base text-gray-900">Acme Corp</div>
                  <div className="text-xs text-charcoal-600 mt-0.5">Hiring &amp; Returnships</div>
                  <div className="text-xs text-emerald-800 font-mono mt-1">partner@demo.herjourney.app</div>
                </div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: '#E5DFD7' }}></div>
            </div>
            <span 
              className="relative px-4 text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: '#FAF7F3', color: '#716873' }}
            >
              Or Sign In With Email &amp; Password
            </span>
          </div>

          {/* Form Login */}
          <form onSubmit={handleFormLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-charcoal-900">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="priya@demo.herjourney.app"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-base font-sans focus:outline-none transition shadow-sm"
                  style={{
                    borderColor: '#DDD6CE',
                    color: '#29232B'
                  }}
                  onFocus={e => e.target.style.borderColor = '#702654'}
                  onBlur={e => e.target.style.borderColor = '#DDD6CE'}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-charcoal-900">
                  Password
                </label>
                <span className="text-xs text-charcoal-500">
                  Demo: <span className="font-mono text-plum-900 font-bold">HerJourney@2026</span>
                </span>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-base font-sans focus:outline-none transition shadow-sm"
                  style={{
                    borderColor: '#DDD6CE',
                    color: '#29232B'
                  }}
                  onFocus={e => e.target.style.borderColor = '#702654'}
                  onBlur={e => e.target.style.borderColor = '#DDD6CE'}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 rounded-xl font-bold text-base text-white shadow-lg transition flex items-center justify-center gap-2 group"
              style={{
                background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)',
                boxShadow: '0 4px 14px rgba(66, 19, 63, 0.25)'
              }}
            >
              {submitting ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Enterprise Security Callout */}
          <div 
            className="p-4 rounded-xl border flex items-start gap-3.5"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#EFEAE3' }}
          >
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
            <div className="text-xs leading-relaxed text-charcoal-600">
              <span className="font-bold text-charcoal-900 block mb-0.5">Enterprise Security &amp; Candidate Privacy</span>
              Protected with encrypted sessions and strict role-based access control. Member contact details are never shared with prospective partners without explicit candidate consent.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}