import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Coffee, 
  Users, 
  Mail, 
  UserCheck, 
  FileCheck, 
  Video, 
  Award, 
  CheckCircle2, 
  Clock, 
  Sparkles
} from 'lucide-react';

const STATUS_ICONS = {
  INVITED: Mail,
  REGISTERED: UserCheck,
  ATTENDED: Video,
  COMPLETED: CheckCircle2,
  IN_PROGRESS: Clock,
  ROLE: Briefcase,
  CAREER_BREAK: Coffee,
  COMMUNITY_JOINED: Users
};

export default function Timeline({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border" style={{ borderColor: '#EFEAE3' }}>
        <Sparkles className="w-8 h-8 text-roseMauve-500 mx-auto mb-2 opacity-60" />
        <p className="text-sm font-bold text-plum-950">No career milestones recorded yet.</p>
        <p className="text-xs text-charcoal-500 mt-1">Programme registrations, session attendances, and career stages will appear here.</p>
      </div>
    );
  }

  return (
    <div className="relative pl-7 sm:pl-10 space-y-6 before:absolute before:left-3.5 sm:before:left-4.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#42133F] before:via-[#C66B91] before:to-[#F28C78]">
      {items.map((item, index) => {
        const IconComponent = STATUS_ICONS[item.type] || STATUS_ICONS[item.status] || Briefcase;
        const isCurrent = item.status === 'IN_PROGRESS';

        return (
          <motion.div 
            key={item.id || index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="relative group"
          >
            {/* Timeline Dot Icon */}
            <div 
              className={`absolute -left-7 sm:-left-10 top-2 w-7 sm:w-8 h-7 sm:h-8 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${
                isCurrent ? 'animate-soft-pulse' : ''
              }`}
              style={{
                backgroundColor: isCurrent ? '#42133F' : '#FFFFFF',
                borderColor: isCurrent ? '#F28C78' : '#702654',
                color: isCurrent ? '#FFFFFF' : '#42133F'
              }}
            >
              <IconComponent className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>

            {/* Timeline Card */}
            <div 
              className="bg-white rounded-2xl p-5 border shadow-card card-3d transition duration-200"
              style={{ borderColor: isCurrent ? '#C66B91' : '#EFEAE3' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span 
                  className="font-mono text-xs font-bold px-3 py-1 rounded-full border shadow-xs"
                  style={{ backgroundColor: '#FAF5FA', color: '#702654', borderColor: '#E8D1E8' }}
                >
                  {item.year}
                </span>

                {item.status && (
                  <span 
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider"
                    style={{
                      backgroundColor: isCurrent ? '#42133F' : '#FAF7F3',
                      color: isCurrent ? '#FFFFFF' : '#716873',
                      borderColor: isCurrent ? '#42133F' : '#E8E1D7'
                    }}
                  >
                    {item.status}
                  </span>
                )}
              </div>

              <h4 className="text-lg sm:text-xl font-serif font-bold text-plum-950 group-hover:text-purple-900 transition">
                {item.title}
              </h4>

              {item.subtitle && (
                <p className="text-sm font-semibold text-plum-850 mt-1">
                  {item.subtitle}
                </p>
              )}

              {item.description && (
                <p 
                  className="text-supporting text-charcoal-700 mt-3 leading-relaxed p-3.5 rounded-xl border"
                  style={{ backgroundColor: '#FAF7F3', borderColor: '#E8E1D7' }}
                >
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
