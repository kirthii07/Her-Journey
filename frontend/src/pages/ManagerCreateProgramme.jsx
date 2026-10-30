import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Layers, Calendar, Briefcase, Sparkles, Building2 } from 'lucide-react';
import { api } from '../services/api';

export default function ManagerCreateProgramme() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Women in Product Analytics Fellowship',
    description: 'An intensive 12-week fellowship for women returning to tech after breaks or transitioning from engineering into product management and analytics.',
    category: 'Returnship',
    partnerName: 'Acme Corp',
    careerBreakRequirementMonths: 12,
    targetLifeStage: ['Returner', 'Career Break'],
    requiredSkills: 'Product Management, Analytics, SQL',
    stages: 'Applied, Screening, Interview, Sessions, Completed, Placed',
    seats: 30
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const skillsArray = formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean);
      const stagesArray = formData.stages.split(',').map(s => s.trim()).filter(Boolean);

      await api.createProgramme({
        ...formData,
        requiredSkills: skillsArray,
        stages: stagesArray,
        eligibilityRules: {
          minCareerBreakMonths: Number(formData.careerBreakRequirementMonths),
          requiredSkills: skillsArray,
          allowedLifeStages: formData.targetLifeStage
        }
      });

      navigate('/manager');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Details' },
    { number: 2, title: 'Eligibility' },
    { number: 3, title: 'Stages & Review' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      <button
        onClick={() => navigate('/manager')}
        className="inline-flex items-center gap-2 text-sm font-bold text-charcoal-500 hover:text-plum-950 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Operations Dashboard
      </button>

      {/* Header */}
      <div className="border-b pb-6" style={{ borderColor: '#EFEAE3' }}>
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
          style={{ backgroundColor: '#FAF5FA', color: '#702654', borderColor: '#E8D1E8' }}
        >
          <Sparkles className="w-4 h-4 text-purple-700" />
          Cohort Orchestration
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-plum-950 mt-1">
          Create New Career Programme
        </h1>
        <p className="text-base text-charcoal-500 mt-2">
          Configure transparent deterministic eligibility rules, partner relationships, and progression stages.
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="flex items-center justify-between max-w-md mx-auto">
        {steps.map((s, idx) => (
          <React.Fragment key={s.number}>
            <div className="flex flex-col items-center gap-1.5">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all"
                style={{
                  backgroundColor: step >= s.number ? '#42133F' : '#EFEAE3',
                  color: step >= s.number ? '#FFFFFF' : '#716873',
                  boxShadow: step === s.number ? '0 0 0 4px rgba(66, 19, 63, 0.15)' : 'none'
                }}
              >
                {step > s.number ? '✓' : s.number}
              </div>
              <span className="text-xs font-bold text-charcoal-600">{s.title}</span>
            </div>
            {idx < steps.length - 1 && (
              <div 
                className="flex-1 h-1 mx-4 rounded transition-all"
                style={{ backgroundColor: step > s.number ? '#42133F' : '#EFEAE3' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-800 text-sm rounded-2xl border border-red-200 font-medium">
          {error}
        </div>
      )}

      {/* Wizard Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-7 sm:p-10 border shadow-card space-y-6 card-3d" style={{ borderColor: '#EFEAE3' }}>
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-plum-950 border-b pb-3" style={{ borderColor: '#EFEAE3' }}>
              Step 1: Programme Overview &amp; Partner
            </h3>

            <div className="space-y-5 text-sm">
              <div>
                <label className="block text-charcoal-700 font-bold mb-1.5">Programme Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-plum-700 font-medium"
                  style={{ borderColor: '#DDD6CE' }}
                />
              </div>

              <div>
                <label className="block text-charcoal-700 font-bold mb-1.5">Detailed Description</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-plum-700 leading-relaxed font-normal"
                  style={{ borderColor: '#DDD6CE' }}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-charcoal-700 font-bold mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl text-charcoal-900 font-bold focus:outline-none focus:ring-2 focus:ring-plum-700"
                    style={{ borderColor: '#DDD6CE' }}
                  >
                    <option value="Returnship">Returnship</option>
                    <option value="Skilling">Skilling &amp; Bootcamp</option>
                    <option value="Leadership">Leadership Circle</option>
                    <option value="Hackathon">Hackathon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-charcoal-700 font-bold mb-1.5">Hiring / Sponsoring Partner</label>
                  <input
                    type="text"
                    value={formData.partnerName}
                    onChange={e => setFormData({ ...formData, partnerName: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-plum-700 font-medium"
                    style={{ borderColor: '#DDD6CE' }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end" style={{ borderColor: '#EFEAE3' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
              >
                <span>Continue to Eligibility Rules</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-plum-950 border-b pb-3" style={{ borderColor: '#EFEAE3' }}>
              Step 2: Deterministic Eligibility Criteria
            </h3>

            <div className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-charcoal-700 font-bold mb-1.5">Min. Career Break (Months)</label>
                  <input
                    type="number"
                    value={formData.careerBreakRequirementMonths}
                    onChange={e => setFormData({ ...formData, careerBreakRequirementMonths: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl text-charcoal-900 font-mono focus:outline-none focus:ring-2 focus:ring-plum-700"
                    style={{ borderColor: '#DDD6CE' }}
                  />
                </div>

                <div>
                  <label className="block text-charcoal-700 font-bold mb-1.5">Cohort Seats / Capacity</label>
                  <input
                    type="number"
                    value={formData.seats}
                    onChange={e => setFormData({ ...formData, seats: Number(e.target.value) })}
                    className="w-full px-4 py-3 border rounded-xl text-charcoal-900 font-mono focus:outline-none focus:ring-2 focus:ring-plum-700"
                    style={{ borderColor: '#DDD6CE' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-charcoal-700 font-bold mb-1.5">Required Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.requiredSkills}
                  onChange={e => setFormData({ ...formData, requiredSkills: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-plum-700 font-medium"
                  style={{ borderColor: '#DDD6CE' }}
                />
                <span className="text-xs text-charcoal-500 mt-1 block">Candidates matching any one skill pass this check</span>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-between" style={{ borderColor: '#EFEAE3' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold border text-charcoal-600 hover:bg-gray-50"
                style={{ borderColor: '#DDD6CE' }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
              >
                <span>Continue to Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-plum-950 border-b pb-3" style={{ borderColor: '#EFEAE3' }}>
              Step 3: Progression Stages &amp; Final Review
            </h3>

            <div className="space-y-5 text-sm">
              <div>
                <label className="block text-charcoal-700 font-bold mb-1.5">Milestone Progression Stages</label>
                <input
                  type="text"
                  value={formData.stages}
                  onChange={e => setFormData({ ...formData, stages: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl text-charcoal-900 font-mono focus:outline-none focus:ring-2 focus:ring-plum-700"
                  style={{ borderColor: '#DDD6CE' }}
                />
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-2xl border space-y-3" style={{ backgroundColor: '#FAF7F3', borderColor: '#E8E1D7' }}>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block">
                  Programme Configuration Summary
                </span>
                <div className="text-xs text-charcoal-700 space-y-1.5">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Partner:</strong> {formData.partnerName}</p>
                  <p><strong>Category:</strong> {formData.category}</p>
                  <p><strong>Min Career Break:</strong> {formData.careerBreakRequirementMonths} months</p>
                  <p><strong>Skills Checked:</strong> {formData.requiredSkills}</p>
                  <p><strong>Capacity:</strong> {formData.seats} seats</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-between" style={{ borderColor: '#EFEAE3' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold border text-charcoal-600 hover:bg-gray-50"
                style={{ borderColor: '#DDD6CE' }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #42133F 0%, #702654 100%)' }}
              >
                <Plus className="w-4 h-4" />
                <span>{submitting ? 'Persisting to Database...' : 'Persist Programme to MongoDB'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
