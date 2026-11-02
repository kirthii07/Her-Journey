import React, { useState } from 'react';
import { Briefcase, Calendar, Check, Plus, Shield, Sparkles, X } from 'lucide-react';

export default function CreateProgrammeModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    partnerName: 'Microsoft India',
    cohort: 'Fall 2026 Cohort (16-Week Returnship)',
    category: 'Returnship',
    openPositions: 30,
    stipendOrSalary: '₹2,20,000 / month stipend',
    startDate: 'October 1, 2026',
    description: '',
    minBreakMonths: 12,
    targetStages: ['Returner'],
    requiredSkills: 'Distributed Systems, Cloud Architecture, Node.js',
    locationRestricted: 'Bengaluru / Hyderabad / Remote'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProg = {
      id: `prog-${Date.now()}`,
      title: formData.title || 'Tech Returner Cohort 2026',
      partnerName: formData.partnerName,
      partnerLogo: 'https://images.unsplash.com/photo-1642132652806-8da0bf485e9a?q=80&w=120&auto=format&fit=crop',
      cohort: formData.cohort,
      description: formData.description || 'Exclusive pathway enabling qualified women engineers to transition back into enterprise tech roles.',
      category: formData.category,
      openPositions: Number(formData.openPositions) || 25,
      stipendOrSalary: formData.stipendOrSalary,
      startDate: formData.startDate,
      eligibilityRules: {
        minBreakMonths: Number(formData.minBreakMonths),
        targetStages: formData.targetStages,
        requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()),
        locationRestricted: formData.locationRestricted,
        minExperienceYears: 3
      },
      funnelStages: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed']
    };

    onSave(newProg);
    onClose();
  };

  const toggleStage = (stage) => {
    setFormData(prev => {
      const exists = prev.targetStages.includes(stage);
      return {
        ...prev,
        targetStages: exists
          ? prev.targetStages.filter(s => s !== stage)
          : [...prev.targetStages, stage]
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amethyst-900 via-amethyst-800 to-indigo-900 text-white shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-rosegold-400" />
            </div>
            <div>
              <h3 className="text-base font-bold">Create New Empowering Programme</h3>
              <p className="text-xs text-stone-300">Set eligibility rules & customizable funnel stages</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Programme Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Google Cloud Women Returnship 2026"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amethyst-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Partner / Sponsoring Enterprise</label>
              <select
                value={formData.partnerName}
                onChange={e => setFormData({ ...formData, partnerName: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amethyst-500 focus:outline-none bg-white"
              >
                <option value="Microsoft India">Microsoft India</option>
                <option value="Tata Consultancy Services">Tata Consultancy Services</option>
                <option value="HDFC Group">HDFC Group</option>
                <option value="Google India">Google India</option>
                <option value="Razorpay">Razorpay</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amethyst-500 focus:outline-none bg-white"
              >
                <option value="Returnship">Returnship</option>
                <option value="Emerging Tech">Emerging Tech</option>
                <option value="Executive Leadership">Executive Leadership</option>
                <option value="Regional Livelihoods">Regional Livelihoods</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Open Positions</label>
              <input
                type="number"
                min="1"
                value={formData.openPositions}
                onChange={e => setFormData({ ...formData, openPositions: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amethyst-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Stipend / Salary Offer</label>
              <input
                type="text"
                value={formData.stipendOrSalary}
                onChange={e => setFormData({ ...formData, stipendOrSalary: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amethyst-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Eligibility Rules Section */}
          <div className="p-4 bg-amethyst-50/60 border border-amethyst-100 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amethyst-700" />
              <h4 className="font-bold text-amethyst-900 text-xs uppercase tracking-wider">
                Automated Eligibility Matching Rules
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Minimum Career Break (Months)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.minBreakMonths}
                  onChange={e => setFormData({ ...formData, minBreakMonths: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amethyst-500 focus:outline-none"
                />
                <span className="text-[10px] text-stone-500">e.g. 12 months for returner verification</span>
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Location / Modality
                </label>
                <input
                  type="text"
                  value={formData.locationRestricted}
                  onChange={e => setFormData({ ...formData, locationRestricted: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amethyst-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Target Lifecycles (Multi-select)</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Student', 'Early Career', 'Returner', 'Leader', 'Senior Advisor'].map(stage => {
                  const active = formData.targetStages.includes(stage);
                  return (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => toggleStage(stage)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                        active
                          ? 'bg-amethyst-700 text-white border-amethyst-700 shadow-sm'
                          : 'bg-white text-stone-600 border-stone-200 hover:border-amethyst-300'
                      }`}
                    >
                      {active ? '✓ ' : '+ '} {stage}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Required Technical / Functional Skills (Comma-separated)
              </label>
              <input
                type="text"
                value={formData.requiredSkills}
                onChange={e => setFormData({ ...formData, requiredSkills: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amethyst-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">Programme Description & Vision</label>
            <textarea
              rows={2}
              placeholder="Describe the cohort benefits, mentor pairing, and final hiring transition..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amethyst-500 focus:outline-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-200 hover:bg-stone-50 rounded-xl font-semibold text-stone-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-amethyst-800 to-indigo-700 hover:from-amethyst-900 hover:to-indigo-800 text-white rounded-xl font-semibold shadow-md transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Publish Programme & Open Funnel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

