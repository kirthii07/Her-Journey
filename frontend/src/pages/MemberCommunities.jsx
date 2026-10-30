import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, UserCheck, HeartHandshake, Sparkles, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function MemberCommunities() {
  const { currentMember, currentUser } = useAuth();
  const [communities, setCommunities] = useState([]);
  const [mentorship, setMentorship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const memberId = currentMember?._id || currentUser?.memberId;

  const loadData = async () => {
    setLoading(true);
    try {
      const [comms, mentorData] = await Promise.all([
        api.getCommunities(),
        memberId ? api.getMentorship(memberId) : { mentors: [], mentees: [] }
      ]);
      setCommunities(comms || []);
      setMentorship(mentorData || null);
    } catch (err) {
      console.error('Failed to load communities & mentoring:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [memberId]);

  const handleToggleJoin = async (community) => {
    if (!memberId) return;
    setActionLoadingId(community._id);
    const isJoined = currentMember?.communities?.some(c => (c._id || c) === community._id);

    try {
      if (isJoined) {
        await api.leaveCommunity(community._id, memberId);
      } else {
        await api.joinCommunity(community._id, memberId);
      }
      await loadData();
    } catch (err) {
      console.error('Failed to toggle community:', err);
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-plum-200 border-t-plum-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  const isMemberJoined = (commId) => {
    return currentMember?.communities?.some(c => (c._id || c) === commId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="border-b pb-6" style={{ borderColor: '#EFEAE3' }}>
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5"
          style={{ backgroundColor: '#FAF5FA', color: '#702654', borderColor: '#E8D1E8' }}
        >
          <Users className="w-4 h-4 text-purple-700" />
          Lifelong Peer Networks
        </div>
        <h1 className="text-page-headline font-serif font-bold tracking-tight text-plum-950 mt-1">
          Communities &amp; Mentorship Circles
        </h1>
        <p className="text-body-lg text-charcoal-600 mt-2 max-w-3xl leading-relaxed">
          Relationships that stay connected as you navigate university hackathons, early careers, parenting breaks, returnships, and board leadership.
        </p>
      </div>

      {/* Mentorship Spotlight Banner */}
      {(mentorship?.mentors?.length > 0 || mentorship?.mentees?.length > 0) && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-7 text-white shadow-card card-3d relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 60%, #42133F 100%)' }}
        >
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(242,140,120,0.25) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-2.5">
              <HeartHandshake className="w-6 h-6 text-coral-300" />
              <h3 className="text-xl font-serif font-bold text-white">Active Mentorship Relationships</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mentorship?.mentors?.map(m => (
                <div 
                  key={m._id} 
                  className="p-5 rounded-2xl border"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  <span className="text-[11px] uppercase font-bold tracking-widest text-pink-200 block mb-1">
                    Your Assigned Mentor
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">
                    {m.mentorId?.name || 'Lakshmi Narayanan'}
                  </h4>
                  <p className="text-xs text-orange-200 font-medium mt-0.5">
                    Focus: {m.focusArea || 'Executive Presence & Product Strategy'}
                  </p>
                  <p className="text-xs text-pink-100/90 mt-2 leading-relaxed">
                    {m.notes || 'Bi-weekly strategic advice sessions for reentry acceleration.'}
                  </p>
                </div>
              ))}

              {mentorship?.mentees?.map(m => (
                <div 
                  key={m._id} 
                  className="p-5 rounded-2xl border"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  <span className="text-[11px] uppercase font-bold tracking-widest text-orange-200 block mb-1">
                    Your Mentee
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">
                    {m.menteeId?.name || 'Meena Kulkarni'}
                  </h4>
                  <p className="text-xs text-pink-200 font-medium mt-0.5">
                    Focus: {m.focusArea || 'Microservices, Analytics & Transition'}
                  </p>
                  <p className="text-xs text-pink-100/90 mt-2 leading-relaxed">
                    {m.notes || 'Weekly tactical reviews and architectural roadmap mentoring.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Communities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((comm, idx) => {
          const joined = isMemberJoined(comm._id);
          return (
            <motion.div
              key={comm._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between card-3d shadow-card bg-white"
              style={{
                borderColor: joined ? '#C66B91' : '#EFEAE3',
                backgroundColor: '#FFFFFF'
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                    style={{ backgroundColor: '#FAF5FA', color: '#702654', borderColor: '#E8D1E8' }}
                  >
                    {comm.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-charcoal-500">
                    {comm.memberCount || comm.members?.length || 0} Members
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-plum-950 mb-2 leading-snug">
                  {comm.name}
                </h3>
                <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
                  {comm.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: '#EFEAE3' }}>
                <span className="text-xs font-bold" style={{ color: joined ? '#27845D' : '#716873' }}>
                  {joined ? 'Joined Member ✓' : 'Open Community'}
                </span>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleToggleJoin(comm)}
                  disabled={actionLoadingId === comm._id}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  style={{
                    backgroundColor: joined ? '#FAF7F3' : '#42133F',
                    color: joined ? '#716873' : '#FFFFFF',
                    border: joined ? '1px solid #DDD6CE' : 'none'
                  }}
                >
                  {actionLoadingId === comm._id ? (
                    'Updating...'
                  ) : joined ? (
                    'Leave Circle'
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Join Circle</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
