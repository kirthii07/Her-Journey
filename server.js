import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// -------------------------------------------------------------
// MongoDB Mongoose Connection Setup
// Reads MONGO_URI from .env (local or Atlas).
// Falls back gracefully to in-memory seed data if unavailable.
// -------------------------------------------------------------
const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||       // legacy alias support
  'mongodb://localhost:27017/herjourney'; // safe local default

let isDbConnected = false;

// Initialize Mongoose Schema Definitions
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  avatar: String,
  lifecycleStage: {
    type: String,
    enum: ['Student', 'Early Career', 'Returner', 'Leader', 'Senior Advisor'],
    default: 'Returner'
  },
  location: String,
  careerBreakMonths: { type: Number, default: 0 },
  currentRole: String,
  targetRole: String,
  bio: String,
  languagePreference: { type: String, default: 'en' },
  skills: [{ name: String, level: String, verified: Boolean }],
  timelineEvents: [{
    id: String,
    year: String,
    title: String,
    organization: String,
    description: String,
    type: { type: String, enum: ['education', 'break', 'work', 'certification', 'leadership'] },
    verified: Boolean,
    credentialId: String,
    certificateUrl: String,
    badge: String
  }],
  consentRecords: [{
    purpose: String,
    granted: Boolean,
    timestamp: String,
    version: String
  }],
  recommendations: [{
    id: String,
    title: String,
    company: String,
    matchScore: Number,
    tags: [String],
    reason: String,
    deadline: String,
    salaryOrStipend: String
  }]
}, { timestamps: true });

const ProgrammeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  partnerName: { type: String, required: true },
  partnerLogo: String,
  cohort: String,
  description: String,
  category: String,
  openPositions: Number,
  stipendOrSalary: String,
  startDate: String,
  eligibilityRules: {
    minBreakMonths: { type: Number, default: 0 },
    targetStages: [String],
    requiredSkills: [String],
    locationRestricted: String,
    minExperienceYears: { type: Number, default: 0 }
  },
  funnelStages: {
    type: [String],
    default: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed']
  }
}, { timestamps: true });

const ApplicationSchema = new mongoose.Schema({
  programmeId: { type: String, required: true },
  programmeTitle: String,
  partnerName: { type: String, required: true },
  userId: String,
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantPhone: { type: String, required: true },
  applicantStage: String,
  avatar: String,
  careerBreakMonths: { type: Number, default: 0 },
  skills: [String],
  matchScore: Number,
  stage: {
    type: String,
    enum: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed'],
    default: 'Applied'
  },
  attendanceRate: { type: Number, default: 100 },
  certificates: [{ title: String, issueDate: String, credentialId: String }],
  postPlacementRetention: {
    status: {
      type: String,
      enum: ['Pending', 'Verified_Employed', 'Transitioned', 'Attention_Needed'],
      default: 'Pending'
    },
    checkInDate: String,
    threeMonthReviewDate: String,
    notes: String,
    lastUpdated: String
  },
  reviewStatus: {
    type: String,
    enum: ['Clear', 'Duplicate_Flagged', 'Review_Required'],
    default: 'Clear'
  }
}, { timestamps: true });

let UserModel;
let ProgrammeModel;
let ApplicationModel;

try {
  UserModel = mongoose.model('User', UserSchema);
  ProgrammeModel = mongoose.model('Programme', ProgrammeSchema);
  ApplicationModel = mongoose.model('Application', ApplicationSchema);
} catch (e) {
  UserModel = mongoose.models.User;
  ProgrammeModel = mongoose.models.Programme;
  ApplicationModel = mongoose.models.Application;
}

// -------------------------------------------------------------
// High-Fidelity In-Memory Dataset (Seed Data & Standalone Engine)
// -------------------------------------------------------------
let inMemoryPersonas = [
  {
    id: 'user_priya_returner',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98201 44582',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Returner',
    location: 'Bengaluru, Karnataka',
    careerBreakMonths: 36,
    currentRole: 'Senior Full-Stack Engineer (Returning)',
    targetRole: 'Staff / Lead Cloud Architect',
    bio: 'Software engineer with 8 years of distributed systems experience at Infosys and Cisco. Took a 3-year motherhood break and upskilled in AWS Cloud & Microservices.',
    languagePreference: 'en',
    skills: [
      { name: 'Node.js & React', level: 'Expert', verified: true },
      { name: 'System Architecture', level: 'Advanced', verified: true },
      { name: 'AWS & Kubernetes', level: 'Intermediate', verified: true },
      { name: 'PostgreSQL & MongoDB', level: 'Advanced', verified: true }
    ],
    timelineEvents: [
      {
        id: 't-1',
        year: '2013 - 2017',
        title: 'B.Tech in Computer Science',
        organization: 'NIT Surathkal',
        description: 'First Class with Distinction. Led Women in Tech campus chapter.',
        type: 'education',
        verified: true,
        credentialId: 'NIT-2017-CS-441',
        certificateUrl: 'https://images.unsplash.com/photo-1589330694653-dad6ef0140be?q=80&w=600&auto=format&fit=crop',
        badge: 'Graduated Top 5%'
      },
      {
        id: 't-2',
        year: '2017 - 2021',
        title: 'Senior Systems Engineer',
        organization: 'Cisco Systems India',
        description: 'Built high-throughput telemetry pipelines servicing 10M+ enterprise network devices.',
        type: 'work',
        verified: true,
        credentialId: 'CISCO-EMP-88219',
        badge: 'Excellence In Engineering 2020'
      },
      {
        id: 't-3',
        year: '2021 - 2024',
        title: 'Planned Motherhood & Caregiving Career Break',
        organization: 'Family & Independent Learning',
        description: 'Completed 300+ hours of modern cloud architecture and GenAI engineering certifications.',
        type: 'break',
        verified: true,
        badge: 'Active Lifelong Learner'
      },
      {
        id: 't-4',
        year: '2024 - Present',
        title: 'HerJourney Returnship Accelerator',
        organization: 'Google Cloud & HerJourney Cohort',
        description: 'Selected into elite returnship program with 98% milestone completion score.',
        type: 'leadership',
        verified: true,
        credentialId: 'HJ-2024-RET-098',
        certificateUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=600&auto=format&fit=crop',
        badge: 'Verified Returner Fellow'
      }
    ],
    consentRecords: [
      { purpose: 'Corporate Partner Profile Matching (DPDP Act 2023)', granted: true, timestamp: '2026-01-15T10:30:00Z', version: 'v2.4' },
      { purpose: 'Anonymized Salary Benchmarking & Research', granted: true, timestamp: '2026-01-15T10:30:00Z', version: 'v2.4' },
      { purpose: 'Direct Recruiter Contact via Masked Gateway', granted: true, timestamp: '2026-01-15T10:30:00Z', version: 'v2.4' }
    ],
    recommendations: [
      {
        id: 'rec-1',
        title: 'Back-to-Work Tech Returnship: Staff Cloud Architect',
        company: 'Microsoft India',
        matchScore: 98,
        tags: ['Returner Exclusive', 'Flexible Hybrid', 'Mentorship Included'],
        reason: 'Matches your 36-month break requirement, NIT CS background, and advanced distributed systems experience.',
        deadline: 'In 5 days',
        salaryOrStipend: '₹34,00,000 - ₹42,00,000 / annum'
      },
      {
        id: 'rec-2',
        title: 'Lead Platform Engineer - FinTech Infrastructure',
        company: 'Razorpay',
        matchScore: 93,
        tags: ['Equal Pay Certified', 'Motherhood Support Grant'],
        reason: 'Identified strong overlap in high-scale telemetry and PostgreSQL performance tuning.',
        deadline: 'In 12 days',
        salaryOrStipend: '₹30,00,000 - ₹38,00,000 / annum'
      }
    ]
  },
  {
    id: 'user_ananya_student',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@student.vjti.ac.in',
    phone: '+91 94112 88471',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Student',
    location: 'Mumbai, Maharashtra',
    careerBreakMonths: 0,
    currentRole: 'Final Year Computer Science Undergraduate',
    targetRole: 'Associate AI/ML Engineer',
    bio: 'Undergraduate researcher passionate about multilingual NLP models for Indian regional languages and responsible AI deployment.',
    languagePreference: 'en',
    skills: [
      { name: 'Python & PyTorch', level: 'Advanced', verified: true },
      { name: 'FastAPI & Docker', level: 'Intermediate', verified: true },
      { name: 'GenAI & LangChain', level: 'Intermediate', verified: true },
      { name: 'Data Structures & Algorithms', level: 'Expert', verified: true }
    ],
    timelineEvents: [
      {
        id: 't-s1',
        year: '2022 - 2026',
        title: 'B.Tech in Artificial Intelligence',
        organization: 'VJTI Mumbai',
        description: 'CGPA 9.4/10. Secretary of Open Source Developers Club.',
        type: 'education',
        verified: true,
        badge: 'Dean’s Honor List'
      },
      {
        id: 't-s2',
        year: '2025 (Summer)',
        title: 'Machine Learning Research Intern',
        organization: 'IIT Bombay CSE Lab',
        description: 'Trained speech-to-text benchmark models for Marathi and Hindi dialects.',
        type: 'work',
        verified: true,
        credentialId: 'IITB-INTERN-2025-081',
        badge: 'Best Undergraduate Paper'
      }
    ],
    consentRecords: [
      { purpose: 'Campus Recruitment & Internship Discovery', granted: true, timestamp: '2026-02-01T08:00:00Z', version: 'v2.4' },
      { purpose: 'Hackathon & Mentorship Pairing', granted: true, timestamp: '2026-02-01T08:00:00Z', version: 'v2.4' }
    ],
    recommendations: [
      {
        id: 'rec-s1',
        title: 'Google STEP / Early Career AI Fellow',
        company: 'Google India',
        matchScore: 99,
        tags: ['Student Cohort', 'Pre-Placement Offer (PPO)', 'Mentorship'],
        reason: 'Matches your 9.4 CGPA, PyTorch proficiency, and multilingual NLP research at IIT Bombay.',
        deadline: 'In 3 days',
        salaryOrStipend: '₹1,25,000 / month stipend'
      }
    ]
  },
  {
    id: 'user_lakshmi_leader',
    name: 'Lakshmi Ramanathan',
    email: 'lakshmi.r@enterprisegrowth.co',
    phone: '+91 98840 55190',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Leader',
    location: 'Chennai, Tamil Nadu',
    careerBreakMonths: 0,
    currentRole: 'VP of Product Engineering & Strategy',
    targetRole: 'Independent Board Director / CXO',
    bio: '19+ years driving SaaS transformation across enterprise fintech and automotive platforms. Active mentor to 100+ mid-career women in Tamil Nadu and Telangana.',
    languagePreference: 'en',
    skills: [
      { name: 'Executive Strategy', level: 'Expert', verified: true },
      { name: 'P&L Management ($40M+)', level: 'Expert', verified: true },
      { name: 'M&A & Tech Due Diligence', level: 'Advanced', verified: true },
      { name: 'Board Governance', level: 'Advanced', verified: true }
    ],
    timelineEvents: [
      {
        id: 't-l1',
        year: '2005 - 2014',
        title: 'Senior Engineering Manager',
        organization: 'Cognizant Technology Solutions',
        description: 'Scaled global delivery teams across 4 countries for Tier-1 US Banks.',
        type: 'work',
        verified: true,
        badge: 'Global Delivery Star'
      },
      {
        id: 't-l2',
        year: '2014 - 2021',
        title: 'Director of Technology',
        organization: 'Freshworks',
        description: 'Key driver in pre-IPO product scaling and enterprise reliability architecture.',
        type: 'work',
        verified: true,
        badge: 'IPO Impact Contributor'
      },
      {
        id: 't-l3',
        year: '2021 - Present',
        title: 'VP of Engineering',
        organization: 'FinVentures APAC',
        description: 'Leading 220-person multi-disciplinary engineering organization across India and Singapore.',
        type: 'leadership',
        verified: true,
        badge: 'Women in Leadership 2025'
      }
    ],
    consentRecords: [
      { purpose: 'Executive Board Search & Advisory Disclosures', granted: true, timestamp: '2026-01-10T09:15:00Z', version: 'v2.4' }
    ],
    recommendations: [
      {
        id: 'rec-l1',
        title: 'Independent Board Director - Tech & Audit Committee',
        company: 'Federal Bank / HDFC Capital Partners',
        matchScore: 97,
        tags: ['Board Seat', 'Governance', 'ESG Leadership'],
        reason: 'Recommended based on 19+ years in FinTech scale-up and verified P&L oversight.',
        deadline: 'In 18 days',
        salaryOrStipend: 'Honorarium + Board Retainer'
      }
    ]
  },
  {
    id: 'user_rukmini_regional',
    name: 'Rukmini Devi',
    email: 'rukmini.crafts@gmail.com',
    phone: '+91 97919 33201',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Early Career',
    location: 'Coimbatore (Tier-2 Hub), Tamil Nadu',
    careerBreakMonths: 12,
    currentRole: 'Digital Commerce Coordinator & Artisan Lead',
    targetRole: 'Regional E-Commerce Operations Associate',
    bio: 'Mobile-first operator who digitized 85 handloom weavers onto digital marketplaces. Powered by regional voice translation & low-bandwidth HerJourney tools.',
    languagePreference: 'ta',
    skills: [
      { name: 'Digital Inventory Ops', level: 'Advanced', verified: true },
      { name: 'Regional Merchant Onboarding', level: 'Expert', verified: true },
      { name: 'WhatsApp Commerce Tools', level: 'Expert', verified: true },
      { name: 'Vernacular Support', level: 'Fluent', verified: true }
    ],
    timelineEvents: [
      {
        id: 't-r1',
        year: '2021 - 2023',
        title: 'B.Com in E-Commerce Operations',
        organization: 'Bharathiar University',
        description: 'Graduated first in family. Conducted digital literacy workshops in rural hubs.',
        type: 'education',
        verified: true,
        badge: 'Community Pioneer'
      },
      {
        id: 't-r2',
        year: '2023 - 2025',
        title: 'Cluster Lead - Rural Crafts Digitization',
        organization: 'TN Rural Livelihood Mission',
        description: 'Generated ₹42 Lakhs in direct artisan sales via digital micro-stores.',
        type: 'work',
        verified: true,
        badge: 'Impact Champion'
      }
    ],
    consentRecords: [
      { purpose: 'Regional Livelihoods Data Access & Micro-Grants', granted: true, timestamp: '2026-02-10T11:00:00Z', version: 'v2.4' }
    ],
    recommendations: [
      {
        id: 'rec-r1',
        title: 'Regional Supply Operations Specialist (Tamil / English)',
        company: 'Flipkart Samarth Initiative',
        matchScore: 96,
        tags: ['Tier-2/3 Focused', 'Low Data Kit Provided', 'Vernacular'],
        reason: 'Direct match for Coimbatore/Erode region, weaver onboarding metrics, and WhatsApp commerce.',
        deadline: 'In 7 days',
        salaryOrStipend: '₹5,50,000 - ₹7,20,000 / annum'
      }
    ]
  }
];

let inMemoryProgrammes = [
  {
    id: 'prog-1',
    title: 'Microsoft Springboard Returnship 2026',
    partnerName: 'Microsoft India',
    partnerLogo: 'https://images.unsplash.com/photo-1642132652806-8da0bf485e9a?q=80&w=120&auto=format&fit=crop',
    cohort: 'Spring 2026 Cohort (16-Week Paid Transition)',
    description: 'Empowering experienced technical women returning after a 12+ month career gap to transition back into Staff Engineering and Cloud Architecture roles.',
    category: 'Returnship',
    openPositions: 45,
    stipendOrSalary: '₹2,50,000/mo + Conversion Bonus',
    startDate: 'March 15, 2026',
    eligibilityRules: {
      minBreakMonths: 12,
      targetStages: ['Returner'],
      requiredSkills: ['Cloud Architecture', 'Distributed Systems', 'Node.js', 'Python'],
      locationRestricted: 'Bengaluru / Hyderabad / Remote',
      minExperienceYears: 4
    },
    funnelStages: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed']
  },
  {
    id: 'prog-2',
    title: 'Tata GenAI & Women in AI Leadership Fellowship',
    partnerName: 'Tata Consultancy Services',
    partnerLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=120&auto=format&fit=crop',
    cohort: 'Cohort 4 - Pan India',
    description: 'Specialized 12-week fellowship for final year female graduates and early-career innovators building production LLMs and generative agents.',
    category: 'Emerging Tech',
    openPositions: 80,
    stipendOrSalary: '₹85,000/mo + High-Performance GPU Allowance',
    startDate: 'April 1, 2026',
    eligibilityRules: {
      minBreakMonths: 0,
      targetStages: ['Student', 'Early Career'],
      requiredSkills: ['Python', 'Machine Learning', 'NLP', 'Data Structures'],
      locationRestricted: 'Pan India',
      minExperienceYears: 0
    },
    funnelStages: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed']
  },
  {
    id: 'prog-3',
    title: 'HDFC Bank Board Readiness & CXO Accelerator',
    partnerName: 'HDFC Group',
    partnerLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=120&auto=format&fit=crop',
    cohort: 'Executive Winter 2026',
    description: 'Preparing senior women leaders with 15+ years experience for public board directorships, ESG oversight, and high-impact fintech governance.',
    category: 'Executive Leadership',
    openPositions: 25,
    stipendOrSalary: 'Corporate Sponsored Executive Grant',
    startDate: 'May 10, 2026',
    eligibilityRules: {
      minBreakMonths: 0,
      targetStages: ['Leader', 'Senior Advisor'],
      requiredSkills: ['Corporate Governance', 'P&L Strategy', 'Risk Management'],
      locationRestricted: 'Mumbai / Delhi / Hybrid',
      minExperienceYears: 15
    },
    funnelStages: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed']
  }
];

let inMemoryApplications = [
  {
    id: 'app-001',
    programmeId: 'prog-1',
    programmeTitle: 'Microsoft Springboard Returnship 2026',
    partnerName: 'Microsoft India',
    userId: 'user_priya_returner',
    applicantName: 'Priya Sharma',
    applicantEmail: 'priya.sharma@gmail.com',
    applicantPhone: '+91 98201 44582',
    applicantStage: 'Returner',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    careerBreakMonths: 36,
    skills: ['Node.js & React', 'System Architecture', 'AWS & Kubernetes'],
    matchScore: 98,
    stage: 'Interview',
    attendanceRate: 98,
    certificates: [
      { title: 'AWS Solutions Architect Associate', issueDate: '2024-11', credentialId: 'AWS-99124-RT' }
    ],
    postPlacementRetention: {
      status: 'Pending',
      checkInDate: '2026-06-30',
      threeMonthReviewDate: '2026-09-30',
      notes: 'Final leadership round cleared; offer roll-out pending.',
      lastUpdated: '2026-11-01'
    },
    reviewStatus: 'Clear'
  },
  {
    id: 'app-002',
    programmeId: 'prog-1',
    programmeTitle: 'Microsoft Springboard Returnship 2026',
    partnerName: 'Microsoft India',
    userId: 'user_meera_ret',
    applicantName: 'Meera Nambiar',
    applicantEmail: 'meera.nambiar87@gmail.com',
    applicantPhone: '+91 97120 66321',
    applicantStage: 'Returner',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=400&auto=format&fit=crop',
    careerBreakMonths: 24,
    skills: ['Distributed Systems', 'Java', 'Azure Kubernetes'],
    matchScore: 94,
    stage: 'Placed',
    attendanceRate: 100,
    certificates: [
      { title: 'Enterprise Azure Architect Certified', issueDate: '2025-04', credentialId: 'AZ-404-RET' }
    ],
    postPlacementRetention: {
      status: 'Verified_Employed',
      checkInDate: '2026-08-15',
      threeMonthReviewDate: '2026-11-15',
      notes: 'Thriving in Azure Core Team. Mentoring 2 junior returners. Verified 90-day retention.',
      lastUpdated: '2026-10-28'
    },
    reviewStatus: 'Clear'
  },
  {
    id: 'app-003',
    programmeId: 'prog-1',
    programmeTitle: 'Microsoft Springboard Returnship 2026',
    partnerName: 'Microsoft India',
    userId: 'user_divya_ret',
    applicantName: 'Divya Sundaram',
    applicantEmail: 'divya.sundaram@yahoo.co.in',
    applicantPhone: '+91 98402 11984',
    applicantStage: 'Returner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    careerBreakMonths: 18,
    skills: ['Data Engineering', 'Python', 'Apache Spark'],
    matchScore: 91,
    stage: 'Screening',
    attendanceRate: 95,
    certificates: [],
    postPlacementRetention: {
      status: 'Pending',
      checkInDate: '2026-07-01',
      threeMonthReviewDate: '2026-10-01',
      notes: 'Initial background verification & break documentation verified.',
      lastUpdated: '2026-10-15'
    },
    reviewStatus: 'Clear'
  },
  {
    id: 'app-004',
    programmeId: 'prog-2',
    programmeTitle: 'Tata GenAI & Women in AI Leadership Fellowship',
    partnerName: 'Tata Consultancy Services',
    userId: 'user_ananya_student',
    applicantName: 'Ananya Deshmukh',
    applicantEmail: 'ananya.d@student.vjti.ac.in',
    applicantPhone: '+91 94112 88471',
    applicantStage: 'Student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    careerBreakMonths: 0,
    skills: ['Python & PyTorch', 'FastAPI & Docker', 'GenAI & LangChain'],
    matchScore: 99,
    stage: 'Sessions',
    attendanceRate: 100,
    certificates: [
      { title: 'TCS Applied GenAI Fellow', issueDate: '2026-01', credentialId: 'TCS-AI-881' }
    ],
    postPlacementRetention: {
      status: 'Pending',
      checkInDate: '2026-08-01',
      threeMonthReviewDate: '2026-11-01',
      notes: 'Currently leading the vernacular speech synthesis capstone.',
      lastUpdated: '2026-10-25'
    },
    reviewStatus: 'Clear'
  },
  {
    id: 'app-005',
    programmeId: 'prog-1',
    programmeTitle: 'Microsoft Springboard Returnship 2026',
    partnerName: 'Microsoft India',
    userId: 'user_pooja_dup',
    applicantName: 'Priya V. Sharma',
    applicantEmail: 'priya.sharma@gmail.com', // Duplicate email match
    applicantPhone: '+91 98201 44582',
    applicantStage: 'Returner',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop',
    careerBreakMonths: 36,
    skills: ['Node.js', 'System Architecture'],
    matchScore: 89,
    stage: 'Applied',
    attendanceRate: 90,
    certificates: [],
    postPlacementRetention: {
      status: 'Pending',
      checkInDate: '2026-07-01',
      threeMonthReviewDate: '2026-10-01',
      notes: 'Flagged by automated upload parser: Exact email match with app-001.',
      lastUpdated: '2026-11-02'
    },
    reviewStatus: 'Duplicate_Flagged'
  }
];

// Helper to mask sensitive PII for Scoped Employer View
export const maskPII = (email, phone) => {
  const maskedEmail = email
    ? email.replace(/^(.)(.*)(@.*)$/, (_, first, middle, domain) => {
        return first + '*'.repeat(Math.min(middle.length, 5)) + domain;
      })
    : '***@***.com';

  const maskedPhone = phone
    ? phone.replace(/(\+91\s?\d{2})\d{4}(\d{4})/, '$1 **** $2')
    : '+91 ***** *****';

  return { maskedEmail, maskedPhone };
};

// -------------------------------------------------------------
// MongoDB Automatic Connection Initializer (Robust with Fallback)
// -------------------------------------------------------------
const initMongoDB = async () => {
  const uri = MONGO_URI;
  const isLocalUri = uri.startsWith('mongodb://localhost');

  console.log('\n──────────────────────────────────────────────');
  console.log('  HerJourney Platform — Database Initializer');
  console.log('──────────────────────────────────────────────');
  console.log(`  Target  : ${isLocalUri ? uri : uri.replace(/:([^:@]{1,}?)@/, ':****@')}`);
  console.log(`  Mode    : ${isLocalUri ? 'Local MongoDB' : 'MongoDB Atlas (Cloud)'}`);
  console.log(`  ENV     : ${process.env.NODE_ENV || 'development'}`);
  console.log('──────────────────────────────────────────────\n');

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,  // fail fast so fallback kicks in quickly
      connectTimeoutMS: 5000,
    });

    isDbConnected = true;

    console.log('  ✅  MongoDB connected successfully!');
    console.log(`  📦  Database : ${mongoose.connection.db.databaseName}`);
    console.log(`  🏠  Host     : ${mongoose.connection.host}:${mongoose.connection.port}\n`);

    // Auto-seed collections when they are empty
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      console.log('  🌱  Collections are empty — seeding initial data...');
      await UserModel.insertMany(inMemoryPersonas);
      await ProgrammeModel.insertMany(inMemoryProgrammes);
      await ApplicationModel.insertMany(inMemoryApplications);
      console.log('  ✅  Seed data inserted successfully!\n');
    } else {
      console.log(`  ℹ️   Existing data found (${userCount} users) — skipping seed.\n`);
    }

  } catch (err) {
    isDbConnected = false;

    // Friendly diagnostic message based on error type
    if (err.name === 'MongoServerSelectionError') {
      if (isLocalUri) {
        console.warn('  ⚠️   Local MongoDB not running on localhost:27017.');
        console.warn('       → Start it with: mongod  (or use MongoDB Compass)\n');
      } else {
        console.warn('  ⚠️   Could not reach MongoDB Atlas. Check:');
        console.warn('       1. MONGO_URI credentials in .env');
        console.warn('       2. IP whitelist in Atlas Network Access\n');
      }
    } else {
      console.warn(`  ⚠️   MongoDB connection error: ${err.message}\n`);
    }

    console.log('  🔄  Falling back to high-performance in-memory dataset.');
    console.log('       All API routes remain fully functional.\n');
  }
};

// Graceful disconnect on process exit
process.on('SIGINT', async () => {
  if (isDbConnected) {
    await mongoose.connection.close();
    console.log('\n  🔌  MongoDB connection closed gracefully.');
  }
  process.exit(0);
});

initMongoDB();

// -------------------------------------------------------------
// REST API Endpoints
// -------------------------------------------------------------

// 1. Health & DB Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'HerJourney Enterprise API',
    version: '2.5.0',
    dbConnected: isDbConnected,
    timestamp: new Date().toISOString()
  });
});

// 2. Platform Overview Stats
app.get('/api/stats', (req, res) => {
  res.json({
    totalMembers: '1,048,290+',
    subCommunities: 32,
    corporatePartners: '520+',
    careerReturnRate: '88.4%',
    retentionAt90Days: '94.2%',
    activePrograms: inMemoryProgrammes.length,
    activeApplications: inMemoryApplications.length
  });
});

// 3. Personas & Unified User Profiles
app.get('/api/personas', (req, res) => {
  res.json(inMemoryPersonas);
});

app.get('/api/users/:id', (req, res) => {
  const user = inMemoryPersonas.find(u => u.id === req.params.id) || inMemoryPersonas[0];
  res.json(user);
});

app.put('/api/users/:id', (req, res) => {
  const idx = inMemoryPersonas.findIndex(u => u.id === req.params.id);
  if (idx !== -1) {
    inMemoryPersonas[idx] = { ...inMemoryPersonas[idx], ...req.body };
    return res.json(inMemoryPersonas[idx]);
  }
  res.status(404).json({ error: 'User not found' });
});

// 4. Programmes
app.get('/api/programmes', (req, res) => {
  res.json(inMemoryProgrammes);
});

app.post('/api/programmes', (req, res) => {
  const newProg = {
    id: `prog-${Date.now()}`,
    title: req.body.title || 'New Empowering Programme',
    partnerName: req.body.partnerName || 'Corporate Partner',
    partnerLogo: req.body.partnerLogo || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=120&auto=format&fit=crop',
    cohort: req.body.cohort || '2026 Cohort',
    description: req.body.description || 'Dedicated career returnship and upskilling pathway.',
    category: req.body.category || 'Returnship',
    openPositions: Number(req.body.openPositions) || 20,
    stipendOrSalary: req.body.stipendOrSalary || 'Competitive Market Compensation',
    startDate: req.body.startDate || 'May 2026',
    eligibilityRules: req.body.eligibilityRules || {
      minBreakMonths: 12,
      targetStages: ['Returner'],
      requiredSkills: ['Full Stack', 'Cloud'],
      locationRestricted: 'Pan India',
      minExperienceYears: 3
    },
    funnelStages: req.body.funnelStages || ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed']
  };

  inMemoryProgrammes.unshift(newProg);
  res.status(201).json(newProg);
});

// 5. Applications & Scoped Employer Gateway
app.get('/api/applications', (req, res) => {
  const { partner, maskPrivacy } = req.query;
  let results = [...inMemoryApplications];

  // Scoped view for specific corporate partner
  if (partner) {
    results = results.filter(app => app.partnerName.toLowerCase().includes(partner.toLowerCase()));
  }

  // Automatic Data Privacy Masking for corporate portals
  if (maskPrivacy === 'true') {
    results = results.map(app => {
      const { maskedEmail, maskedPhone } = maskPII(app.applicantEmail, app.applicantPhone);
      return {
        ...app,
        applicantEmail: maskedEmail,
        applicantPhone: maskedPhone,
        isPiiMasked: true
      };
    });
  }

  res.json(results);
});

// 6. Stage Progression (Kanban Moves)
app.patch('/api/applications/:id/stage', (req, res) => {
  const { stage } = req.body;
  const appIndex = inMemoryApplications.findIndex(a => a.id === req.params.id);

  if (appIndex === -1) {
    return res.status(404).json({ error: 'Application not found' });
  }

  inMemoryApplications[appIndex].stage = stage;
  if (stage === 'Placed') {
    inMemoryApplications[appIndex].postPlacementRetention.status = 'Verified_Employed';
    inMemoryApplications[appIndex].postPlacementRetention.lastUpdated = new Date().toISOString().split('T')[0];
  }

  res.json(inMemoryApplications[appIndex]);
});

// 7. Post-Placement 3-Month Retention Check-in
app.patch('/api/applications/:id/retention', (req, res) => {
  const { status, notes } = req.body;
  const appIndex = inMemoryApplications.findIndex(a => a.id === req.params.id);

  if (appIndex === -1) {
    return res.status(404).json({ error: 'Application not found' });
  }

  inMemoryApplications[appIndex].postPlacementRetention = {
    ...inMemoryApplications[appIndex].postPlacementRetention,
    status: status || inMemoryApplications[appIndex].postPlacementRetention.status,
    notes: notes || inMemoryApplications[appIndex].postPlacementRetention.notes,
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  res.json(inMemoryApplications[appIndex]);
});

// 8. Bulk CSV / Excel Upload Simulator with Duplicate Detection
app.post('/api/applications/bulk-upload', (req, res) => {
  const { candidates, programmeId } = req.body;

  if (!candidates || !Array.isArray(candidates)) {
    return res.status(400).json({ error: 'Array of candidate records required' });
  }

  const prog = inMemoryProgrammes.find(p => p.id === programmeId) || inMemoryProgrammes[0];
  const processed = [];
  const duplicates = [];
  const newApplicants = [];

  candidates.forEach((cand, idx) => {
    // Duplicate detection rules: exact email or phone match
    const existing = inMemoryApplications.find(
      a => a.applicantEmail.toLowerCase() === cand.email.toLowerCase() ||
           a.applicantPhone === cand.phone
    );

    const matchScore = Math.floor(82 + Math.random() * 17);
    const newRecord = {
      id: `app-bulk-${Date.now()}-${idx}`,
      programmeId: prog.id,
      programmeTitle: prog.title,
      partnerName: prog.partnerName,
      userId: `user_bulk_${idx}`,
      applicantName: cand.name,
      applicantEmail: cand.email,
      applicantPhone: cand.phone,
      applicantStage: cand.stage || 'Returner',
      avatar: cand.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      careerBreakMonths: Number(cand.careerBreakMonths) || 0,
      skills: cand.skills || ['Full Stack Development', 'Problem Solving'],
      matchScore: matchScore,
      stage: 'Applied',
      attendanceRate: 100,
      certificates: [],
      postPlacementRetention: {
        status: 'Pending',
        checkInDate: '2026-07-01',
        threeMonthReviewDate: '2026-10-01',
        notes: 'Enrolled via Bulk Registration Batch.',
        lastUpdated: new Date().toISOString().split('T')[0]
      },
      reviewStatus: existing ? 'Duplicate_Flagged' : 'Clear'
    };

    if (existing) {
      duplicates.push({
        candidate: newRecord,
        matchedWith: existing,
        reason: existing.applicantEmail.toLowerCase() === cand.email.toLowerCase()
          ? 'Exact Email Address Match'
          : 'Exact Phone Number Match'
      });
    } else {
      newApplicants.push(newRecord);
      inMemoryApplications.unshift(newRecord);
    }

    processed.push(newRecord);
  });

  res.json({
    summary: {
      totalUploaded: candidates.length,
      importedSuccessfully: newApplicants.length,
      duplicatesFlagged: duplicates.length
    },
    duplicatesReviewQueue: duplicates,
    imported: newApplicants
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(` HerJourney Express Server running smoothly on http://localhost:${PORT}`);
});

export default app;

