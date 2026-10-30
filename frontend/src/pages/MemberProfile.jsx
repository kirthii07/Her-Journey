import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  Search, 
  Sparkles, 
  Phone, 
  Mail, 
  Calendar, 
  Lock, 
  RefreshCw,
  Plus,
  X,
  MapPin,
  GraduationCap,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import MaskedField from '../components/MaskedField';

export default function MemberProfile() {
  const { currentMember, currentUser, role } = useAuth();
  const [member, setMember] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    bio: '',
    city: '',
    education: '',
    careerGoal: '',
    careerBreakMonths: 0,
    skills: [],
    consent: {
      communication: true,
      programmeInvitations: true,
      partnerSharing: true
    }
  });

  // Interactive Duplicate Detection Simulator state
  const [lookupPhone, setLookupPhone] = useState('+91 98765 43210');
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [checkingDuplicate, setCheckingDuplicate] = useState(false);

  const memberId = currentMember?._id || currentUser?.memberId;

  const loadProfile = async () => {
    if (!memberId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.getMemberById(memberId);
      setMember(data);
      setFormData({
        bio: data.bio || '',
        city: data.city || '',
        education: data.education || '',
        careerGoal: data.careerGoal || '',
        careerBreakMonths: data.careerBreakMonths || 0,
        skills: data.skills || [],
        consent: {
          communication: data.consent?.communication ?? true,
          programmeInvitations: data.consent?.programmeInvitations ?? true,
          partnerSharing: data.consent?.partnerSharing ?? true
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [memberId]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setError(null);
    try {
      const updated = await api.updateMember(memberId, formData);
      setMember(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (formData.skills.includes(newSkill.trim())) return;
    setFormData({
      ...formData,
      skills: [...formData.skills, newSkill.trim()]
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleCheckDuplicate = async () => {
    setCheckingDuplicate(true);
    setLookupResult(null);
    try {
      const res = await api.checkDuplicate({
        phone: lookupPhone,
        email: lookupEmail
      });
      setLookupResult(res);
    } catch (err) {
      setLookupResult({ error: err.message });
    } finally {
      setCheckingDuplicate(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-plum-200 border-t-plum-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Editorial Profile Header Card with 3D Depth */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 sm:p-8 border shadow-card card-3d relative overflow-hidden"
        style={{ borderColor: '#EFEAE3' }}
      >
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(198,107,145,0.12) 0%, transparent 70%)' }}
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div 
              className="w-24 h-24 rounded-3xl flex items-center justify-center text-white text-4xl font-serif font-bold shadow-lg shrink-0"
              style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
            >
              {member?.name?.[0] || 'P'}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-plum-950">
                  {member?.name}
                </h1>
                <span 
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm"
                  style={{ backgroundColor: '#FAF5FA', color: '#702654', borderColor: '#E8D1E8' }}
                >
                  {member?.careerStage}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-charcoal-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-roseMauve-500" />
                  {member?.city}
                </span>
                <span>•</span>
                <span className="font-medium">
                  {member?.yearsOfExperience || 6} Years Experience
                </span>
                <span>•</span>
                <span className="font-mono text-xs text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  Verified Identity
                </span>
              </div>
              <p className="text-sm text-charcoal-600 max-w-2xl leading-relaxed">
                {member?.bio || 'Building a unified lifelong career identity with HerJourney.'}
              </p>
            </div>
          </div>

          {/* Profile Completion Indicator */}
          <div 
            className="p-5 rounded-2xl border text-center min-w-[150px] shrink-0"
            style={{ backgroundColor: '#FAF7F3', borderColor: '#E8E1D7' }}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 block">
              Profile Completeness
            </span>
            <span className="text-3xl font-extrabold text-plum-900 font-mono block my-1">
              {member?.profileCompletion || 85}%
            </span>
            <span className="text-xs text-emerald-700 font-semibold block">
              Single Unified Identity
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation Pill Bar */}
      <div className="flex flex-wrap items-center gap-2.5 border-b pb-3" style={{ borderColor: '#E5DFD7' }}>
        {[
          { id: 'personal', label: 'Personal & Contact', icon: User },
          { id: 'career', label: 'Career & Skills', icon: Briefcase },
          { id: 'privacy', label: 'Consent & Privacy', icon: ShieldCheck },
          { id: 'duplicate_demo', label: '1-Identity Duplicate Test', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                active
                  ? 'bg-plum-800 text-white shadow-md'
                  : 'bg-white text-charcoal-600 hover:text-plum-900 hover:bg-ivory-200 border'
              }`}
              style={{
                backgroundColor: active ? '#42133F' : '#FFFFFF',
                borderColor: active ? '#42133F' : '#EFEAE3',
                color: active ? '#FFFFFF' : '#716873'
              }}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Success and Error Banners */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 text-sm rounded-2xl flex items-center gap-3 font-medium"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Profile updates saved directly to MongoDB database.</span>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-red-50 text-red-800 border border-red-200 text-sm rounded-2xl flex items-center gap-3 font-medium"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab 1: Personal & Contact */}
      {activeTab === 'personal' && (
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSave} 
          className="bg-white rounded-3xl p-6 sm:p-10 border shadow-card space-y-6"
          style={{ borderColor: '#EFEAE3' }}
        >
          <div className="border-b pb-4" style={{ borderColor: '#EFEAE3' }}>
            <h3 className="text-xl font-serif font-bold text-plum-950">
              Personal & Verified Contact Anchors
            </h3>
            <p className="text-sm text-charcoal-500 mt-1">
              Your name, phone number, and email serve as the immutable anchor for lifelong deduplication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <label className="block text-charcoal-700 font-bold mb-1.5">Full Name</label>
              <input
                type="text"
                disabled
                value={member?.name || ''}
                className="w-full px-4 py-3 bg-ivory-100 border rounded-xl text-charcoal-800 font-semibold cursor-not-allowed"
                style={{ borderColor: '#E8E1D7' }}
              />
              <span className="text-xs text-charcoal-500 mt-1 block">Verified identity anchor across 30 years</span>
            </div>

            <div>
              <label className="block text-charcoal-700 font-bold mb-1.5">Current City / Location</label>
              <input
                type="text"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 bg-white border rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-plum-700 font-medium"
                style={{ borderColor: '#DDD6CE' }}
              />
            </div>

            <div>
              <label className="block text-charcoal-700 font-bold mb-1.5">Primary Email</label>
              <div className="relative">
                <input
                  type="email"
                  disabled
                  value={member?.email || ''}
                  className="w-full px-4 py-3 bg-ivory-100 border rounded-xl text-charcoal-800 font-mono cursor-not-allowed"
                  style={{ borderColor: '#E8E1D7' }}
                />
                <Lock className="w-4 h-4 text-charcoal-400 absolute right-4 top-3.5" />
              </div>
              <span className="text-xs text-roseMauve-700 mt-1 block">
                {role === 'MEMBER' ? 'Unmasked to you • Protected in manager and partner views' : 'Masked contact'}
              </span>
            </div>

            <div>
              <label className="block text-charcoal-700 font-bold mb-1.5">Verified Mobile Phone</label>
              <div className="relative">
                <input
                  type="text"
                  disabled
                  value={member?.phone || ''}
                  className="w-full px-4 py-3 bg-ivory-100 border rounded-xl text-charcoal-800 font-mono cursor-not-allowed"
                  style={{ borderColor: '#E8E1D7' }}
                />
                <Lock className="w-4 h-4 text-charcoal-400 absolute right-4 top-3.5" />
              </div>
              <span className="text-xs text-roseMauve-700 mt-1 block">Primary key for deduplication search</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-charcoal-700 mb-1.5">Professional Bio & Narrative</label>
            <textarea
              rows="4"
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full text-sm px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-plum-700 text-charcoal-800 leading-relaxed font-normal"
              style={{ borderColor: '#DDD6CE' }}
            ></textarea>
          </div>

          <div className="pt-4 border-t flex justify-end" style={{ borderColor: '#EFEAE3' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md transition flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Tab 2: Career & Skills */}
      {activeTab === 'career' && (
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSave} 
          className="bg-white rounded-3xl p-6 sm:p-10 border shadow-card space-y-8"
          style={{ borderColor: '#EFEAE3' }}
        >
          <div className="border-b pb-4" style={{ borderColor: '#EFEAE3' }}>
            <h3 className="text-xl font-serif font-bold text-plum-950">
              Career History, Break Details & Skills
            </h3>
            <p className="text-sm text-charcoal-500 mt-1">
              HerJourney rule-based engine uses your break duration and skills for deterministic programme eligibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <label className="block text-charcoal-700 font-bold mb-1.5">Career Stage</label>
              <select
                value={member?.careerStage}
                onChange={e => setFormData({ ...formData, careerStage: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl text-charcoal-900 font-bold focus:outline-none focus:ring-2 focus:ring-plum-700"
                style={{ borderColor: '#DDD6CE' }}
              >
                {['Student', 'First Job', 'Early Career', 'Career Growth', 'Career Break', 'Returner', 'Leadership', 'Leader', 'Mentor'].map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-charcoal-700 font-bold mb-1.5">Career Break Duration (Months)</label>
              <input
                type="number"
                value={formData.careerBreakMonths}
                onChange={e => setFormData({ ...formData, careerBreakMonths: Number(e.target.value) })}
                className="w-full px-4 py-3 border rounded-xl text-charcoal-900 font-mono focus:outline-none focus:ring-2 focus:ring-plum-700"
                style={{ borderColor: '#DDD6CE' }}
              />
              <span className="text-xs text-charcoal-500 mt-1 block">Used by Returnship rule (&gt;= 12 months)</span>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-charcoal-700 font-bold mb-1.5">Education & Degrees</label>
              <input
                type="text"
                value={formData.education}
                onChange={e => setFormData({ ...formData, education: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-plum-700"
                style={{ borderColor: '#DDD6CE' }}
                placeholder="e.g. B.Tech in Computer Science"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-charcoal-700 font-bold mb-1.5">Career Goal</label>
              <input
                type="text"
                value={formData.careerGoal}
                onChange={e => setFormData({ ...formData, careerGoal: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-plum-700"
                style={{ borderColor: '#DDD6CE' }}
                placeholder="e.g. Return to Senior Product Manager role at a product-led company"
              />
            </div>
          </div>

          {/* Skills Management Section */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-charcoal-800">
              Verified & Self-Reported Skills
            </label>
            <div className="flex flex-wrap gap-2.5 items-center">
              {formData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors shadow-sm"
                  style={{
                    backgroundColor: '#FAF5FA',
                    borderColor: '#E8D1E8',
                    color: '#42133F'
                  }}
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-600 rounded-full p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add skill input */}
            <div className="flex gap-2 max-w-md pt-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Add a new skill (e.g. SQL, System Design)"
                className="flex-1 px-3.5 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-plum-700"
                style={{ borderColor: '#DDD6CE' }}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1"
                style={{ backgroundColor: '#702654' }}
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
          </div>

          {/* Past Roles Timeline */}
          <div className="space-y-3 pt-4 border-t" style={{ borderColor: '#EFEAE3' }}>
            <h4 className="text-sm font-bold text-plum-950 uppercase tracking-wider">
              Career Timeline & Verified Roles
            </h4>
            <div className="space-y-3">
              {member?.previousRoles && member.previousRoles.length > 0 ? (
                member.previousRoles.map((role, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl border text-sm flex items-start justify-between"
                    style={{ backgroundColor: '#FAF7F3', borderColor: '#E8E1D7' }}
                  >
                    <div>
                      <div className="font-bold text-base text-plum-950">{role.title}</div>
                      <div className="text-charcoal-600 font-medium">{role.company}</div>
                      {role.description && (
                        <p className="text-xs text-charcoal-500 mt-1.5 leading-relaxed">{role.description}</p>
                      )}
                    </div>
                    <span className="font-mono text-xs bg-white px-3 py-1 rounded-full border text-purple-900 shrink-0 font-bold shadow-sm">
                      {role.duration}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-charcoal-400 italic">No previous roles entered yet.</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end" style={{ borderColor: '#EFEAE3' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md transition flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Career Details'}
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Tab 3: Consent & Privacy */}
      {activeTab === 'privacy' && (
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSave} 
          className="bg-white rounded-3xl p-6 sm:p-10 border shadow-card space-y-6"
          style={{ borderColor: '#EFEAE3' }}
        >
          <div className="border-b pb-4" style={{ borderColor: '#EFEAE3' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
              style={{ backgroundColor: '#FAF5FA', color: '#702654', borderColor: '#E8D1E8' }}>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Member Sovereignty
            </div>
            <h3 className="text-xl font-serif font-bold text-plum-950">
              Consent Controls & Partner Visibility
            </h3>
            <p className="text-sm text-charcoal-500 mt-1">
              Managers cannot invite you to programmes or share profile details with hiring partners without active consent.
            </p>
          </div>

          <div className="space-y-4">
            {/* Toggle 1 */}
            <div 
              className="p-5 rounded-2xl border flex items-center justify-between gap-4 transition"
              style={{ backgroundColor: '#FAF7F3', borderColor: '#E8E1D7' }}
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-plum-950">Programme Invitation Consent</h4>
                <p className="text-xs text-charcoal-600 max-w-xl leading-relaxed">
                  Allows programme managers to screen your profile for returnships and send guaranteed cohort invitations.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={formData.consent.programmeInvitations}
                  onChange={e => setFormData({
                    ...formData,
                    consent: { ...formData.consent, programmeInvitations: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-900"></div>
              </label>
            </div>

            {/* Toggle 2 */}
            <div 
              className="p-5 rounded-2xl border flex items-center justify-between gap-4 transition"
              style={{ backgroundColor: '#FAF7F3', borderColor: '#E8E1D7' }}
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-plum-950">Partner Talent Pool Visibility</h4>
                <p className="text-xs text-charcoal-600 max-w-xl leading-relaxed">
                  Allows verified employer partners (like Acme Corp) to review your shortlisted profile for hiring interviews. Phone and email remain permanently masked.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={formData.consent.partnerSharing}
                  onChange={e => setFormData({
                    ...formData,
                    consent: { ...formData.consent, partnerSharing: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-900"></div>
              </label>
            </div>

            {/* Toggle 3 */}
            <div 
              className="p-5 rounded-2xl border flex items-center justify-between gap-4 transition"
              style={{ backgroundColor: '#FAF7F3', borderColor: '#E8E1D7' }}
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-plum-950">General Community Communications</h4>
                <p className="text-xs text-charcoal-600 max-w-xl leading-relaxed">
                  Receive cohort notifications, milestone alerts, and peer community discussions.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={formData.consent.communication}
                  onChange={e => setFormData({
                    ...formData,
                    consent: { ...formData.consent, communication: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-900"></div>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end" style={{ borderColor: '#EFEAE3' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md transition flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
            >
              <Save className="w-4 h-4" />
              {saving ? 'Updating Consent...' : 'Update Privacy Preferences'}
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Tab 4: Interactive Duplicate Detection Simulator */}
      {activeTab === 'duplicate_demo' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border shadow-card space-y-6"
          style={{ borderColor: '#EFEAE3' }}
        >
          <div className="border-b pb-4" style={{ borderColor: '#EFEAE3' }}>
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
              style={{ backgroundColor: '#FEF8F6', color: '#AD3F27', borderColor: '#F9DCD3' }}
            >
              <Sparkles className="w-4 h-4 text-orange-600" />
              Core Principle Verification
            </div>
            <h3 className="text-xl font-serif font-bold text-plum-950">
              One Woman → One Identity Deduplication Engine
            </h3>
            <p className="text-sm text-charcoal-500 mt-1">
              Verify how the backend prevents duplicate identities by detecting existing profiles across phone numbers and emails.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <label className="block text-charcoal-700 font-bold mb-1.5">Enter Phone Number to Check</label>
              <input
                type="text"
                value={lookupPhone}
                onChange={e => setLookupPhone(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl text-charcoal-900 font-mono focus:outline-none focus:ring-2 focus:ring-plum-700"
                style={{ borderColor: '#DDD6CE' }}
                placeholder="+91 98765 43210"
              />
              <span className="text-xs text-charcoal-400 mt-1 block">Try Priya's number: +91 98765 43210</span>
            </div>

            <div>
              <label className="block text-charcoal-700 font-bold mb-1.5">Or Enter Email Address</label>
              <input
                type="email"
                value={lookupEmail}
                onChange={e => setLookupEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl text-charcoal-900 font-mono focus:outline-none focus:ring-2 focus:ring-plum-700"
                style={{ borderColor: '#DDD6CE' }}
                placeholder="priya@demo.herjourney.app"
              />
              <span className="text-xs text-charcoal-400 mt-1 block">Exact or ambiguous match test</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckDuplicate}
            disabled={checkingDuplicate}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md transition flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
          >
            <Search className="w-4 h-4" />
            {checkingDuplicate ? 'Scanning Database...' : 'Run Duplicate Detection Check'}
          </button>

          {lookupResult && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 rounded-2xl border"
              style={{
                backgroundColor: lookupResult.type === 'EXACT_MATCH' ? '#F3F9F6' : lookupResult.type === 'POSSIBLE_MATCH' ? '#FFFBEB' : '#EFF6FF',
                borderColor: lookupResult.type === 'EXACT_MATCH' ? '#A7F3D0' : lookupResult.type === 'POSSIBLE_MATCH' ? '#FDE68A' : '#BFDBFE'
              }}
            >
              {lookupResult.type === 'EXACT_MATCH' ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span>Existing Profile Found — Profile Reused</span>
                  </div>
                  <p className="text-sm text-charcoal-700 font-medium">
                    "{lookupResult.message}"
                  </p>
                  <div className="p-4 bg-white rounded-xl border border-emerald-200 space-y-2 text-xs">
                    <p className="font-bold text-plum-950 text-sm">Reused Fields without asking woman again:</p>
                    <p className="text-charcoal-700 leading-relaxed">
                      ✓ Name: <span className="font-semibold">{lookupResult.member?.name}</span> • City: <span className="font-semibold">{lookupResult.member?.city}</span> • Stage: <span className="font-semibold">{lookupResult.member?.careerStage}</span> • Skills: {lookupResult.member?.skills?.join(', ')}
                    </p>
                    <p className="text-charcoal-500 pt-1.5 border-t border-gray-100">
                      Missing fields requested only if necessary: {lookupResult.missingFields?.join(', ') || 'None (Profile already complete)'}
                    </p>
                  </div>
                </div>
              ) : lookupResult.type === 'POSSIBLE_MATCH' ? (
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-amber-900 font-bold">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>Possible Match — Queued for Human Review</span>
                  </div>
                  <p className="text-amber-800">{lookupResult.message}</p>
                  <p className="text-xs text-charcoal-600">
                    No silent merge performed. Data held safely in review queue to prevent account takeover or data overwriting.
                  </p>
                </div>
              ) : (
                <div className="space-y-1 text-sm text-blue-900">
                  <span className="font-bold block">New Member Identity</span>
                  <p>{lookupResult.message || 'No existing profile found. Fresh identity created.'}</p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
