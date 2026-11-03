import dns from 'node:dns';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';

// Fix MongoDB Atlas DNS resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Load .env from project root
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(__dirname, '..', '.env'),
});

// MongoDB connection
const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/herjourney';
// ─── Schemas ──────────────────────────────────────────────────
const UserSchema = new mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    avatar: String,
    roleTag: String,
    tagline: String,
    lifecycleStage: {
      type: String,
      enum: ['Student', 'Early Career', 'Returner', 'Leader', 'Senior Advisor'],
      default: 'Returner',
    },
    location: String,
    careerBreakMonths: { type: Number, default: 0 },
    currentRole: String,
    targetRole: String,
    bio: String,
    experienceYears: Number,
    matchProfileScore: Number,
    languagePreference: { type: String, default: 'en' },
    skills: [{ name: String, level: String, verified: Boolean, confidence: Number }],
    // Change this inside your User schema:
    timelineEvents: {
      type: [
        new mongoose.Schema(
          {
            id: String,
            year: String,
            title: String,
            organization: String,
            description: String,
            type: String,
            verified: Boolean,
            credentialId: String,
            certificateUrl: String,
            badge: String,
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    consentRecords: [
      {
        id: String,
        purpose: String,
        granted: Boolean,
        timestamp: String,
        version: String,
      },
    ],
    recommendations: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const ProgrammeSchema = new mongoose.Schema(
  {
    id: String,
    title: { type: String, required: true },
    partnerName: { type: String, required: true },
    partnerLogo: String,
    cohort: String,
    description: String,
    category: String,
    openPositions: Number,
    stipendOrSalary: String,
    startDate: String,
    eligibilityRules: mongoose.Schema.Types.Mixed,
    funnelStages: [String],
  },
  { timestamps: true }
);

const ApplicationSchema = new mongoose.Schema(
  {
    id: String,
    programmeId: String,
    programmeTitle: String,
    partnerName: String,
    userId: String,
    applicantName: String,
    applicantEmail: String,
    applicantPhone: String,
    applicantStage: String,
    avatar: String,
    careerBreakMonths: Number,
    skills: [String],
    matchScore: Number,
    stage: {
      type: String,
      enum: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed'],
      default: 'Applied',
    },
    attendanceRate: Number,
    certificates: mongoose.Schema.Types.Mixed,
    postPlacementRetention: mongoose.Schema.Types.Mixed,
    reviewStatus: {
      type: String,
      enum: ['Clear', 'Duplicate_Flagged', 'Review_Required'],
      default: 'Clear',
    },
  },
  { timestamps: true }
);

// ─── Seed Data ────────────────────────────────────────────────
const USERS = [
  {
    id: 'user_priya_returner',
    name: 'Priya Sharma',
    roleTag: 'The Tech Returner',
    tagline: 'Returning after 3-year motherhood break into Cloud Architecture',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98201 44582',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Returner',
    location: 'Bengaluru, Karnataka',
    careerBreakMonths: 36,
    currentRole: 'Senior Full-Stack Engineer (Returning)',
    targetRole: 'Staff Cloud Architect / Engineering Lead',
    bio: 'Software engineer with 8 years of distributed systems experience at Infosys and Cisco. Took a 3-year motherhood break and completed 300+ hours in AWS Cloud & Microservices.',
    experienceYears: 8,
    matchProfileScore: 98,
    languagePreference: 'en',
    skills: [
      { name: 'Node.js & React', level: 'Expert', verified: true, confidence: 96 },
      { name: 'System Architecture', level: 'Advanced', verified: true, confidence: 92 },
      { name: 'AWS & Kubernetes', level: 'Intermediate', verified: true, confidence: 88 },
      { name: 'PostgreSQL & Distributed DBs', level: 'Advanced', verified: true, confidence: 90 },
    ],
    timelineEvents: [
      {
        id: 't-1',
        year: '2013 - 2017',
        title: 'B.Tech in Computer Science',
        organization: 'NIT Surathkal',
        description: 'First Class with Distinction. Founded Women in Tech campus chapter.',
        type: 'education',
        verified: true,
        credentialId: 'NIT-2017-CS-441',
        badge: 'Graduated Top 5% of Class',
      },
      {
        id: 't-2',
        year: '2017 - 2021',
        title: 'Senior Systems Engineer',
        organization: 'Cisco Systems India',
        description: 'Architected telemetry pipelines for 10M+ enterprise devices.',
        type: 'work',
        verified: true,
        credentialId: 'CISCO-EMP-88219',
        badge: 'Excellence in Engineering Award 2020',
      },
      {
        id: 't-3',
        year: '2021 - 2024',
        title: 'Planned Motherhood & Career Break',
        organization: 'Family & Independent Learning',
        description: 'Completed 300+ hours of AWS and GenAI certifications during break.',
        type: 'break',
        verified: true,
        badge: 'Proud Returner Milestone',
      },
      {
        id: 't-4',
        year: '2024 - Present',
        title: 'HerJourney Returnship Accelerator Fellow',
        organization: 'Microsoft Springboard & HerJourney Cohort',
        description: 'Selected into top 2% of pan-India applicants.',
        type: 'leadership',
        verified: true,
        credentialId: 'HJ-2024-MSFT-098',
        badge: 'Verified Returner Fellow',
      },
    ],
    consentRecords: [
      {
        id: 'c1',
        purpose: 'Corporate Partner Profile Matching (DPDP Act 2023)',
        granted: true,
        timestamp: '15 Jan 2026, 10:30 IST',
        version: 'v2.4',
      },
      {
        id: 'c2',
        purpose: 'Anonymized Equal-Pay Benchmarking Research',
        granted: true,
        timestamp: '15 Jan 2026, 10:30 IST',
        version: 'v2.4',
      },
    ],
  },
  {
    id: 'user_ananya_student',
    name: 'Ananya Deshmukh',
    roleTag: 'The Aspiring Student',
    tagline: 'Final-year AI undergrad building regional Indic NLP models',
    email: 'ananya.d@student.vjti.ac.in',
    phone: '+91 94112 88471',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Student',
    location: 'Mumbai, Maharashtra',
    careerBreakMonths: 0,
    currentRole: 'Final Year Computer Science Undergraduate',
    targetRole: 'Associate AI/ML Engineer',
    bio: 'Undergraduate researcher building multilingual NLP models for Indian regional languages.',
    experienceYears: 0,
    matchProfileScore: 96,
    languagePreference: 'en',
    skills: [
      { name: 'Python & PyTorch', level: 'Advanced', verified: true, confidence: 94 },
      { name: 'FastAPI & LLM Serving', level: 'Intermediate', verified: true, confidence: 85 },
      { name: 'Data Structures & Algorithms', level: 'Expert', verified: true, confidence: 95 },
    ],
    timelineEvents: [
      {
        id: 't-s1',
        year: '2022 - 2026',
        title: 'B.Tech in Artificial Intelligence',
        organization: 'VJTI Mumbai',
        description: '9.4 CGPA. Secretary of Open Source Tech Society.',
        type: 'education',
        verified: true,
        credentialId: 'VJTI-2026-AI-019',
        badge: "Dean's Honor List",
      },
      {
        id: 't-s2',
        year: '2025 (Summer)',
        title: 'ML Research Fellow',
        organization: 'IIT Bombay CSE AI Lab',
        description: 'Speech-to-text for Marathi and Hindi dialects, 91% accuracy.',
        type: 'work',
        verified: true,
        credentialId: 'IITB-INTERN-2025-081',
        badge: 'Best Undergraduate Research Paper',
      },
    ],
    consentRecords: [
      {
        id: 'cs1',
        purpose: 'Campus Recruitment & Early Internship Discovery',
        granted: true,
        timestamp: '01 Feb 2026, 09:00 IST',
        version: 'v2.4',
      },
    ],
  },
  {
    id: 'user_lakshmi_leader',
    name: 'Lakshmi Ramanathan',
    roleTag: 'The Executive Leader',
    tagline: '19+ years scaling enterprise platforms, targeting Board Directorship',
    email: 'lakshmi.r@enterprisegrowth.co',
    phone: '+91 98840 55190',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Leader',
    location: 'Chennai, Tamil Nadu',
    careerBreakMonths: 0,
    currentRole: 'VP of Product Engineering & Strategy',
    targetRole: 'Independent Board Director / CXO Advisor',
    bio: '19+ years driving digital transformation across enterprise fintech and automotive platforms.',
    experienceYears: 19,
    matchProfileScore: 97,
    languagePreference: 'en',
    skills: [
      { name: 'Executive Strategy & P&L', level: 'Expert', verified: true, confidence: 99 },
      { name: 'Board Governance', level: 'Advanced', verified: true, confidence: 94 },
      { name: 'M&A & Tech Due Diligence', level: 'Advanced', verified: true, confidence: 91 },
    ],
    timelineEvents: [
      {
        id: 't-l1',
        year: '2005 - 2014',
        title: 'Senior Engineering Manager',
        organization: 'Cognizant Technology Solutions',
        description: 'Scaled global delivery teams for Tier-1 US Banks.',
        type: 'work',
        verified: true,
        badge: 'Global Delivery Excellence Award',
      },
      {
        id: 't-l2',
        year: '2014 - 2021',
        title: 'Director of Technology',
        organization: 'Freshworks India',
        description: 'Key driver in pre-IPO product scaling.',
        type: 'work',
        verified: true,
        credentialId: 'FW-DIR-2019-011',
        badge: 'Pre-IPO Star Performer',
      },
      {
        id: 't-l3',
        year: '2021 - Present',
        title: 'VP of Engineering & Strategy',
        organization: 'FinVentures APAC',
        description: '240-person engineering org across India and Singapore.',
        type: 'leadership',
        verified: true,
        badge: 'Top 50 Women in Tech 2025',
      },
    ],
    consentRecords: [
      {
        id: 'cl1',
        purpose: 'Executive Board Search & Advisory Disclosures',
        granted: true,
        timestamp: '10 Jan 2026, 11:15 IST',
        version: 'v2.4',
      },
    ],
  },
  {
    id: 'user_rukmini_regional',
    name: 'Rukmini Devi',
    roleTag: 'The Regional Mobile Pioneer',
    tagline: 'Digitized 85 handloom weavers in Tamil Nadu using regional voice commerce',
    email: 'rukmini.crafts@gmail.com',
    phone: '+91 97919 33201',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Early Career',
    location: 'Coimbatore Hub, Tamil Nadu',
    careerBreakMonths: 12,
    currentRole: 'Digital Commerce Coordinator & Artisan Lead',
    targetRole: 'Regional E-Commerce Operations Associate',
    bio: 'Mobile-first operator who digitized 85 handloom weavers onto digital marketplaces.',
    experienceYears: 3,
    matchProfileScore: 95,
    languagePreference: 'ta',
    skills: [
      { name: 'Digital Inventory Ops', level: 'Advanced', verified: true, confidence: 92 },
      { name: 'Regional Merchant Onboarding', level: 'Expert', verified: true, confidence: 96 },
      { name: 'WhatsApp Commerce Tools', level: 'Expert', verified: true, confidence: 94 },
    ],
    timelineEvents: [
      {
        id: 't-r1',
        year: '2021 - 2023',
        title: 'B.Com in E-Commerce Operations',
        organization: 'Bharathiar University',
        description: 'First university graduate in family.',
        type: 'education',
        verified: true,
        badge: 'First Generation Graduate',
      },
      {
        id: 't-r2',
        year: '2023 - 2025',
        title: 'Cluster Lead - Rural Crafts Digitization',
        organization: 'TN Rural Livelihood Mission',
        description: 'Generated ₹42 Lakhs in direct artisan sales.',
        type: 'work',
        verified: true,
        credentialId: 'TN-RURAL-2024-99',
        badge: 'State Livelihoods Champion',
      },
    ],
    consentRecords: [
      {
        id: 'cr1',
        purpose: 'Regional Livelihoods Data & Micro-Grants',
        granted: true,
        timestamp: '10 Feb 2026, 14:00 IST',
        version: 'v2.4',
      },
    ],
  },
];

const PROGRAMMES = [
  {
    id: 'prog-1',
    title: 'Microsoft Springboard Returnship 2026',
    partnerName: 'Microsoft India',
    partnerLogo:
      'https://images.unsplash.com/photo-1642132652806-8da0bf485e9a?q=80&w=120&auto=format&fit=crop',
    cohort: 'Spring 2026 Cohort (16-Week Paid Transition)',
    description:
      'Empowering experienced technical women returning after a 12+ month career gap to transition into Staff Engineering and Cloud Architecture roles.',
    category: 'Returnship',
    openPositions: 45,
    stipendOrSalary: '₹2,50,000 / month + Conversion Bonus',
    startDate: 'March 15, 2026',
    eligibilityRules: {
      minBreakMonths: 12,
      targetStages: ['Returner'],
      requiredSkills: ['Cloud Architecture', 'Distributed Systems', 'Node.js', 'Python'],
      locationRestricted: 'Bengaluru / Hyderabad / Remote',
      minExperienceYears: 4,
    },
    funnelStages: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed'],
  },
  {
    id: 'prog-2',
    title: 'Tata GenAI & Women in AI Leadership Fellowship',
    partnerName: 'Tata Consultancy Services',
    partnerLogo:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=120&auto=format&fit=crop',
    cohort: 'Cohort 4 - Pan India',
    description:
      '12-week fellowship for final-year female graduates and early-career innovators building production LLMs and generative agents.',
    category: 'Emerging Tech',
    openPositions: 80,
    stipendOrSalary: '₹85,000 / month + High-Performance GPU Allowance',
    startDate: 'April 1, 2026',
    eligibilityRules: {
      minBreakMonths: 0,
      targetStages: ['Student', 'Early Career'],
      requiredSkills: ['Python', 'Machine Learning', 'NLP', 'Data Structures'],
      locationRestricted: 'Pan India',
      minExperienceYears: 0,
    },
    funnelStages: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed'],
  },
  {
    id: 'prog-3',
    title: 'HDFC Bank Board Readiness & CXO Accelerator',
    partnerName: 'HDFC Group',
    partnerLogo:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=120&auto=format&fit=crop',
    cohort: 'Executive Winter 2026',
    description:
      'Preparing senior women leaders with 15+ years experience for public board directorships and fintech governance.',
    category: 'Executive Leadership',
    openPositions: 25,
    stipendOrSalary: 'Corporate Sponsored Executive Fellowship',
    startDate: 'May 10, 2026',
    eligibilityRules: {
      minBreakMonths: 0,
      targetStages: ['Leader', 'Senior Advisor'],
      requiredSkills: ['Corporate Governance', 'P&L Strategy', 'Risk Management'],
      locationRestricted: 'Mumbai / Delhi / Hybrid',
      minExperienceYears: 15,
    },
    funnelStages: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed'],
  },
];

const APPLICATIONS = [
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
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    careerBreakMonths: 36,
    skills: ['Node.js & React', 'System Architecture', 'AWS & Kubernetes'],
    matchScore: 98,
    stage: 'Interview',
    attendanceRate: 98,
    certificates: [{ title: 'AWS Solutions Architect Associate', issueDate: '2024-11', credentialId: 'AWS-99124-RT' }],
    postPlacementRetention: {
      status: 'Pending',
      checkInDate: '2026-06-30',
      threeMonthReviewDate: '2026-09-30',
      notes: 'Final leadership round cleared; offer pending committee approval.',
      lastUpdated: '2026-11-01',
    },
    reviewStatus: 'Clear',
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
    avatar:
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=400&auto=format&fit=crop',
    careerBreakMonths: 24,
    skills: ['Distributed Systems', 'Java', 'Azure Kubernetes'],
    matchScore: 94,
    stage: 'Placed',
    attendanceRate: 100,
    certificates: [{ title: 'Enterprise Azure Architect Certified', issueDate: '2025-04', credentialId: 'AZ-404-RET' }],
    postPlacementRetention: {
      status: 'Verified_Employed',
      checkInDate: '2026-08-15',
      threeMonthReviewDate: '2026-11-15',
      notes: 'Thriving in Azure Core Team. Verified 90-day retention.',
      lastUpdated: '2026-10-28',
    },
    reviewStatus: 'Clear',
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
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
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
      notes: 'Initial background verification complete.',
      lastUpdated: '2026-10-15',
    },
    reviewStatus: 'Clear',
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
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    careerBreakMonths: 0,
    skills: ['Python & PyTorch', 'FastAPI & Docker', 'GenAI & LangChain'],
    matchScore: 99,
    stage: 'Sessions',
    attendanceRate: 100,
    certificates: [{ title: 'TCS Applied GenAI Fellow', issueDate: '2026-01', credentialId: 'TCS-AI-881' }],
    postPlacementRetention: {
      status: 'Pending',
      checkInDate: '2026-08-01',
      threeMonthReviewDate: '2026-11-01',
      notes: 'Leading vernacular speech synthesis capstone.',
      lastUpdated: '2026-10-25',
    },
    reviewStatus: 'Clear',
  },
  {
    id: 'app-005',
    programmeId: 'prog-1',
    programmeTitle: 'Microsoft Springboard Returnship 2026',
    partnerName: 'Microsoft India',
    userId: 'user_pooja_dup',
    applicantName: 'Priya V. Sharma',
    applicantEmail: 'priya.sharma@gmail.com',
    applicantPhone: '+91 98201 44582',
    applicantStage: 'Returner',
    avatar:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop',
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
      notes: 'Flagged: Exact email match with app-001.',
      lastUpdated: '2026-11-02',
    },
    reviewStatus: 'Duplicate_Flagged',
  },
];

// ─── Main Seeder ──────────────────────────────────────────────
async function createDatabase() {
  const isLocal = MONGO_URI.includes('localhost');

  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║   HerJourney — MongoDB Database Setup & Seeder       ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');
  console.log(`  🔗  URI     : ${isLocal ? MONGO_URI : MONGO_URI.replace(/:([^:@]{1,}?)@/, ':****@')}`);
  console.log(`  🌍  Target  : ${isLocal ? 'Local MongoDB' : 'MongoDB Atlas (Cloud)'}\n`);

  try {
    // 1. Connect
    process.stdout.write('  ⏳  Connecting to MongoDB... ');
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 6000,
    });
    console.log('✅ Connected!\n');

    // 2. Register models
    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    const Programme = mongoose.models.Programme || mongoose.model('Programme', ProgrammeSchema);
    const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);

    // 3. Drop existing collections for a clean seed
    console.log('  🗑️   Dropping existing collections (clean slate)...');
    await User.deleteMany({});
    await Programme.deleteMany({});
    await Application.deleteMany({});
    console.log('  ✅  Collections cleared.\n');

    // 4. Seed Users
    process.stdout.write(`  👩  Seeding ${USERS.length} user profiles... `);
    const insertedUsers = await User.insertMany(USERS);
    console.log(`✅ Done (${insertedUsers.length} documents)`);

    // 5. Seed Programmes
    process.stdout.write(`  📋  Seeding ${PROGRAMMES.length} programmes... `);
    const insertedProgs = await Programme.insertMany(PROGRAMMES);
    console.log(`✅ Done (${insertedProgs.length} documents)`);

    // 6. Seed Applications
    process.stdout.write(`  📁  Seeding ${APPLICATIONS.length} applications... `);
    const insertedApps = await Application.insertMany(APPLICATIONS);
    console.log(`✅ Done (${insertedApps.length} documents)\n`);

    // 7. Verify counts
    const [uc, pc, ac] = await Promise.all([
      User.countDocuments(),
      Programme.countDocuments(),
      Application.countDocuments(),
    ]);

    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║   ✅  DATABASE CREATED SUCCESSFULLY!                 ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log(`║   📦  Database     : herjourney                      `);
    console.log(`║   👩  Users        : ${String(uc).padEnd(4)} documents                  `);
    console.log(`║   📋  Programmes   : ${String(pc).padEnd(4)} documents                  `);
    console.log(`║   📁  Applications : ${String(ac).padEnd(4)} documents                  `);
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log('║   🚀  Run "npm run server" to start the API          ║');
    console.log('╚══════════════════════════════════════════════════════╝\n');

  } catch (err) {
    console.error('\n  ❌  Setup failed:', err.message);

    if (err.name === 'MongoServerSelectionError') {
      if (MONGO_URI.includes('localhost')) {
        console.error('\n  💡  Fix: Local MongoDB is not running.');
        console.error('       Option 1 → Install & start MongoDB: https://www.mongodb.com/try/download/community');
        console.error('       Option 2 → Use MongoDB Atlas (free cloud):');
        console.error('                  1. Sign up at https://cloud.mongodb.com');
        console.error('                  2. Create a free cluster');
        console.error('                  3. Copy connection string into .env as MONGO_URI=...');
        console.error('                  4. Re-run: node scripts/createDb.js\n');
      } else {
        console.error('\n  💡  Atlas connection failed. Check:');
        console.error('       1. MONGO_URI credentials in .env');
        console.error('       2. IP address whitelisted in Atlas → Network Access\n');
      }
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

createDatabase();

