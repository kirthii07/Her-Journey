// High-Fidelity Master Mock Dataset & Translations for HerJourney Platform

export const INITIAL_PERSONAS = [
  {
    id: 'user_priya_returner',
    name: 'Priya Sharma',
    roleTag: 'The Tech Returner',
    tagline: 'Returning after 3-year motherhood break into Cloud Architecture',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98201 44582',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Returner',
    location: 'Bengaluru, Karnataka',
    careerBreakMonths: 36,
    currentRole: 'Senior Full-Stack Engineer (Returning)',
    targetRole: 'Staff Cloud Architect / Engineering Lead',
    bio: 'Software engineer with 8 years of distributed systems experience at Infosys and Cisco. Took a 3-year motherhood break and completed 300+ hours in modern AWS Cloud & Microservices.',
    experienceYears: 8,
    matchProfileScore: 98,
    skills: [
      { name: 'Node.js & React', level: 'Expert', verified: true, confidence: 96 },
      { name: 'System Architecture', level: 'Advanced', verified: true, confidence: 92 },
      { name: 'AWS & Kubernetes', level: 'Intermediate', verified: true, confidence: 88 },
      { name: 'PostgreSQL & Distributed DBs', level: 'Advanced', verified: true, confidence: 90 }
    ],
    timelineEvents: [
      {
        id: 't-1',
        year: '2013 - 2017',
        title: 'B.Tech in Computer Science',
        organization: 'National Institute of Technology (NIT) Surathkal',
        description: 'First Class with Distinction (8.9 CGPA). Founder and Lead of Women in Tech campus chapter.',
        type: 'education',
        verified: true,
        credentialId: 'NIT-2017-CS-441',
        certificateUrl: 'https://images.unsplash.com/photo-1589330694653-dad6ef0140be?q=80&w=600&auto=format&fit=crop',
        badge: 'Graduated Top 5% of Class'
      },
      {
        id: 't-2',
        year: '2017 - 2021',
        title: 'Senior Systems Engineer',
        organization: 'Cisco Systems India',
        description: 'Architected high-throughput telemetry pipelines servicing 10M+ enterprise network appliances.',
        type: 'work',
        verified: true,
        credentialId: 'CISCO-EMP-88219',
        badge: 'Excellence in Engineering Award 2020'
      },
      {
        id: 't-3',
        year: '2021 - 2024',
        title: 'Planned Motherhood & Caregiving Career Break',
        organization: 'Family & Independent Lifelong Learning',
        description: 'Dedicated time to raise daughter while actively completing 300+ hours of AWS Solutions Architect and GenAI certification courses.',
        type: 'break',
        verified: true,
        badge: 'Proud Returner Milestone'
      },
      {
        id: 't-4',
        year: '2024 - Present',
        title: 'HerJourney Returnship Accelerator Fellow',
        organization: 'Microsoft Springboard & HerJourney Cohort',
        description: 'Selected into top 2% of pan-India applicants. Currently leading microservices re-architecture sprint.',
        type: 'leadership',
        verified: true,
        credentialId: 'HJ-2024-MSFT-098',
        certificateUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=600&auto=format&fit=crop',
        badge: 'Verified Returner Fellow'
      }
    ],
    consentRecords: [
      { id: 'c1', purpose: 'Corporate Partner Profile Matching (DPDP Act 2023)', granted: true, timestamp: '15 Jan 2026, 10:30 IST', version: 'v2.4' },
      { id: 'c2', purpose: 'Anonymized Equal-Pay Benchmarking Research', granted: true, timestamp: '15 Jan 2026, 10:30 IST', version: 'v2.4' },
      { id: 'c3', purpose: 'Direct Recruiter Contact via Masked Gateway', granted: true, timestamp: '15 Jan 2026, 10:30 IST', version: 'v2.4' }
    ],
    recommendations: [
      {
        id: 'rec-1',
        title: 'Staff Cloud Architect - Returner Track',
        company: 'Microsoft India',
        logo: 'https://images.unsplash.com/photo-1642132652806-8da0bf485e9a?q=80&w=120&auto=format&fit=crop',
        matchScore: 98,
        tags: ['Returner Exclusive', 'Flexible Hybrid', 'Mentorship Included'],
        reason: 'Matches your 36-month career break requirement, NIT Computer Science background, and 8 years in distributed systems.',
        deadline: 'Closing in 5 days',
        salaryOrStipend: '₹34,00,000 - ₹42,00,000 / annum',
        eligibilityChecklist: [
          { rule: 'Career Break >= 12 Months', passed: true, detail: 'Your break: 36 Months' },
          { rule: 'Core Skill: Distributed Systems & Cloud', passed: true, detail: 'Verified 8 yrs + AWS cert' },
          { rule: 'Location: Bengaluru / Hybrid', passed: true, detail: 'Location matches Bengaluru' }
        ]
      },
      {
        id: 'rec-2',
        title: 'Lead Platform Engineer - Infrastructure',
        company: 'Razorpay',
        logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=120&auto=format&fit=crop',
        matchScore: 93,
        tags: ['Equal Pay Certified', 'Childcare Allowance', 'Daycare On-Site'],
        reason: 'Strong correlation with your Cisco telemetry background and PostgreSQL scaling experience.',
        deadline: 'Closing in 12 days',
        salaryOrStipend: '₹30,00,000 - ₹38,00,000 / annum',
        eligibilityChecklist: [
          { rule: 'Experience >= 6 Years', passed: true, detail: 'Your experience: 8 Years' },
          { rule: 'Core Skill: High-throughput API Design', passed: true, detail: 'Matched from Cisco profile' },
          { rule: 'Career Break Friendly', passed: true, detail: 'Partner signed 2026 Returner Pledge' }
        ]
      }
    ]
  },
  {
    id: 'user_ananya_student',
    name: 'Ananya Deshmukh',
    roleTag: 'The Aspiring Student',
    tagline: 'Final-year AI undergrad building regional Indic NLP models',
    email: 'ananya.d@student.vjti.ac.in',
    phone: '+91 94112 88471',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Student',
    location: 'Mumbai, Maharashtra',
    careerBreakMonths: 0,
    currentRole: 'Final Year Computer Science Undergraduate',
    targetRole: 'Associate AI/ML Engineer / GenAI Specialist',
    bio: 'Undergraduate researcher passionate about multilingual NLP models for Indian regional languages and responsible AI deployment across healthcare and education.',
    experienceYears: 0,
    matchProfileScore: 96,
    skills: [
      { name: 'Python & PyTorch', level: 'Advanced', verified: true, confidence: 94 },
      { name: 'FastAPI & LLM Serving', level: 'Intermediate', verified: true, confidence: 85 },
      { name: 'Data Structures & Algorithms', level: 'Expert', verified: true, confidence: 95 },
      { name: 'HuggingFace & LoRA Fine-Tuning', level: 'Intermediate', verified: true, confidence: 88 }
    ],
    timelineEvents: [
      {
        id: 't-s1',
        year: '2022 - 2026',
        title: 'B.Tech in Artificial Intelligence',
        organization: 'VJTI Mumbai',
        description: 'Maintained 9.4 CGPA across 7 semesters. Elected General Secretary of Open Source Tech Society.',
        type: 'education',
        verified: true,
        credentialId: 'VJTI-2026-AI-019',
        badge: 'Dean’s Honor List'
      },
      {
        id: 't-s2',
        year: '2025 (Summer)',
        title: 'Machine Learning Research Fellow',
        organization: 'IIT Bombay CSE AI Lab',
        description: 'Trained speech-to-text benchmark models for Marathi and Hindi dialects with 91% accuracy.',
        type: 'work',
        verified: true,
        credentialId: 'IITB-INTERN-2025-081',
        certificateUrl: 'https://images.unsplash.com/photo-1589330694653-dad6ef0140be?q=80&w=600&auto=format&fit=crop',
        badge: 'Best Undergraduate Research Paper'
      }
    ],
    consentRecords: [
      { id: 'cs1', purpose: 'Campus Recruitment & Early Internship Discovery', granted: true, timestamp: '01 Feb 2026, 09:00 IST', version: 'v2.4' },
      { id: 'cs2', purpose: 'Women In STEM Hackathons & Mentorship Pairing', granted: true, timestamp: '01 Feb 2026, 09:00 IST', version: 'v2.4' }
    ],
    recommendations: [
      {
        id: 'rec-s1',
        title: 'Tata GenAI & Women in AI Leadership Fellowship',
        company: 'Tata Consultancy Services',
        logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=120&auto=format&fit=crop',
        matchScore: 99,
        tags: ['Student Cohort', 'Pre-Placement Offer (PPO)', 'Full Mentorship'],
        reason: 'Perfect match for your 9.4 CGPA, PyTorch specialization, and published Indic NLP benchmark at IIT Bombay.',
        deadline: 'Closing in 3 days',
        salaryOrStipend: '₹85,000 / month stipend + PPO ₹16-22 LPA',
        eligibilityChecklist: [
          { rule: 'Target Stage: Student / Early Career', passed: true, detail: 'Class of 2026 undergraduate' },
          { rule: 'Core Skill: Python & PyTorch', passed: true, detail: 'Verified 94% competence score' },
          { rule: 'Academics >= 8.0 CGPA', passed: true, detail: 'Your CGPA: 9.4' }
        ]
      }
    ]
  },
  {
    id: 'user_lakshmi_leader',
    name: 'Lakshmi Ramanathan',
    roleTag: 'The Executive Leader',
    tagline: '19+ years scaling enterprise platforms, targeting Corporate Board Directorship',
    email: 'lakshmi.r@enterprisegrowth.co',
    phone: '+91 98840 55190',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Leader',
    location: 'Chennai, Tamil Nadu',
    careerBreakMonths: 0,
    currentRole: 'VP of Product Engineering & Strategy',
    targetRole: 'Independent Board Director / CXO Advisor',
    bio: '19+ years driving digital transformation across enterprise fintech and automotive platforms. Active mentor to 100+ mid-career women leaders across South India.',
    experienceYears: 19,
    matchProfileScore: 97,
    skills: [
      { name: 'Executive Strategy & P&L ($50M+)', level: 'Expert', verified: true, confidence: 99 },
      { name: 'Corporate Board Governance', level: 'Advanced', verified: true, confidence: 94 },
      { name: 'M&A & Tech Due Diligence', level: 'Advanced', verified: true, confidence: 91 },
      { name: 'Global Engineering Leadership', level: 'Expert', verified: true, confidence: 98 }
    ],
    timelineEvents: [
      {
        id: 't-l1',
        year: '2005 - 2014',
        title: 'Senior Engineering Manager',
        organization: 'Cognizant Technology Solutions',
        description: 'Scaled global delivery teams across 4 countries for Tier-1 US Investment Banks.',
        type: 'work',
        verified: true,
        badge: 'Global Delivery Excellence Award'
      },
      {
        id: 't-l2',
        year: '2014 - 2021',
        title: 'Director of Technology',
        organization: 'Freshworks India',
        description: 'Key driver in pre-IPO product scaling and global enterprise compliance architecture.',
        type: 'work',
        verified: true,
        credentialId: 'FW-DIR-2019-011',
        badge: 'Pre-IPO Star Performer'
      },
      {
        id: 't-l3',
        year: '2021 - Present',
        title: 'VP of Engineering & Technology Strategy',
        organization: 'FinVentures APAC',
        description: 'Leading a 240-person multi-disciplinary engineering organization across India and Singapore.',
        type: 'leadership',
        verified: true,
        badge: 'Top 50 Women in Tech 2025'
      }
    ],
    consentRecords: [
      { id: 'cl1', purpose: 'Executive Board Search & Advisory Disclosures', granted: true, timestamp: '10 Jan 2026, 11:15 IST', version: 'v2.4' }
    ],
    recommendations: [
      {
        id: 'rec-l1',
        title: 'Independent Board Director - Technology & Risk',
        company: 'HDFC Capital Partners',
        logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=120&auto=format&fit=crop',
        matchScore: 97,
        tags: ['Board Seat', 'Corporate Governance', 'ESG Leadership'],
        reason: 'Recommended based on 19+ years in technology governance, P&L stewardship, and fintech scale-up.',
        deadline: 'Closing in 18 days',
        salaryOrStipend: 'Director Sitting Fee + Annual Advisory Retainer',
        eligibilityChecklist: [
          { rule: 'Experience >= 15 Years', passed: true, detail: 'Your experience: 19 Years' },
          { rule: 'P&L Ownership >= $20M', passed: true, detail: 'Managed $50M+ operations' },
          { rule: 'Corporate Governance Credential', passed: true, detail: 'Verified Director Register certified' }
        ]
      }
    ]
  },
  {
    id: 'user_rukmini_regional',
    name: 'Rukmini Devi',
    roleTag: 'The Regional Mobile Pioneer',
    tagline: 'Digitized 85 handloom weavers in Tamil Nadu using regional voice commerce',
    email: 'rukmini.crafts@gmail.com',
    phone: '+91 97919 33201',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    lifecycleStage: 'Early Career',
    location: 'Coimbatore Hub, Tamil Nadu',
    careerBreakMonths: 12,
    currentRole: 'Digital Commerce Coordinator & Artisan Lead',
    targetRole: 'Regional E-Commerce Operations Associate',
    bio: 'Mobile-first operator who digitized 85 handloom weavers onto digital marketplaces. Powered by regional voice translation & low-bandwidth HerJourney tools.',
    experienceYears: 3,
    matchProfileScore: 95,
    skills: [
      { name: 'Digital Inventory Ops', level: 'Advanced', verified: true, confidence: 92 },
      { name: 'Regional Merchant Onboarding', level: 'Expert', verified: true, confidence: 96 },
      { name: 'WhatsApp Commerce Tools', level: 'Expert', verified: true, confidence: 94 },
      { name: 'Vernacular Translation', level: 'Native/Fluent', verified: true, confidence: 99 }
    ],
    timelineEvents: [
      {
        id: 't-r1',
        year: '2021 - 2023',
        title: 'B.Com in E-Commerce Operations',
        organization: 'Bharathiar University Coimbatore',
        description: 'First university graduate in family. Organized weekend digital literacy camps in rural clusters.',
        type: 'education',
        verified: true,
        badge: 'First Generation Graduate'
      },
      {
        id: 't-r2',
        year: '2023 - 2025',
        title: 'Cluster Lead - Rural Crafts Digitization',
        organization: 'TN Rural Livelihood Mission',
        description: 'Generated ₹42 Lakhs in direct artisan sales via WhatsApp commerce and digital micro-stores.',
        type: 'work',
        verified: true,
        credentialId: 'TN-RURAL-2024-99',
        badge: 'State Livelihoods Champion'
      }
    ],
    consentRecords: [
      { id: 'cr1', purpose: 'Regional Livelihoods Data Access & Micro-Grants', granted: true, timestamp: '10 Feb 2026, 14:00 IST', version: 'v2.4' }
    ],
    recommendations: [
      {
        id: 'rec-r1',
        title: 'Regional Supply Operations Specialist (Tamil / English)',
        company: 'Flipkart Samarth Initiative',
        logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=120&auto=format&fit=crop',
        matchScore: 96,
        tags: ['Tier-2/3 Focused', 'Low-Data Tablet Provided', 'Vernacular'],
        reason: 'Direct match for Coimbatore/Erode region, weaver onboarding metrics, and WhatsApp commerce.',
        deadline: 'Closing in 7 days',
        salaryOrStipend: '₹5,50,000 - ₹7,20,000 / annum',
        eligibilityChecklist: [
          { rule: 'Regional Language Fluency (Tamil)', passed: true, detail: 'Native Speaker' },
          { rule: 'Digital Merchant Onboarding Track Record', passed: true, detail: '85+ Merchants digitized' },
          { rule: 'Tier-2/3 Geographic Base', passed: true, detail: 'Coimbatore Hub confirmed' }
        ]
      }
    ]
  }
];

export const INITIAL_PROGRAMMES = [
  {
    id: 'prog-1',
    title: 'Microsoft Springboard Returnship 2026',
    partnerName: 'Microsoft India',
    partnerLogo: 'https://images.unsplash.com/photo-1642132652806-8da0bf485e9a?q=80&w=120&auto=format&fit=crop',
    cohort: 'Spring 2026 Cohort (16-Week Paid Transition)',
    description: 'Empowering experienced technical women returning after a 12+ month career gap to transition back into Staff Engineering and Cloud Architecture roles.',
    category: 'Returnship',
    openPositions: 45,
    stipendOrSalary: '₹2,50,000 / month + Conversion Bonus',
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
    description: 'Specialized 12-week fellowship for final-year female graduates and early-career innovators building production LLMs and generative agents.',
    category: 'Emerging Tech',
    openPositions: 80,
    stipendOrSalary: '₹85,000 / month + High-Performance GPU Allowance',
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
    stipendOrSalary: 'Corporate Sponsored Executive Fellowship',
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

export const INITIAL_APPLICATIONS = [
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
      notes: 'Final leadership round cleared; offer roll-out pending committee approval.',
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
    applicantEmail: 'priya.sharma@gmail.com', // Intentional duplicate
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

// Sample CSV candidates to simulate batch imports
export const SIMULATED_CSV_BATCH = [
  {
    name: 'Shweta Kulkarni',
    email: 'shweta.kulkarni@outlook.com',
    phone: '+91 99302 77140',
    stage: 'Returner',
    careerBreakMonths: 28,
    skills: ['React Native', 'TypeScript', 'GraphQL'],
    notes: 'Ex-Flipkart frontend engineer looking to return.'
  },
  {
    name: 'Priya Sharma', // Duplicate candidate
    email: 'priya.sharma@gmail.com',
    phone: '+91 98201 44582',
    stage: 'Returner',
    careerBreakMonths: 36,
    skills: ['AWS', 'Distributed Systems'],
    notes: 'Duplicate registration via partner portal.'
  },
  {
    name: 'Kavitha Ramachandran',
    email: 'kavitha.rc@gmail.com',
    phone: '+91 98401 99234',
    stage: 'Leader',
    careerBreakMonths: 0,
    skills: ['Product Strategy', 'Fintech Architecture'],
    notes: '16+ years experience in payments infrastructure.'
  },
  {
    name: 'Tanvi Agarwal',
    email: 'tanvi.agarwal@bits-pilani.ac.in',
    phone: '+91 96190 44211',
    stage: 'Student',
    careerBreakMonths: 0,
    skills: ['PyTorch', 'Computer Vision', 'C++'],
    notes: 'BITS Pilani CS senior.'
  }
];

// Translations dictionary for regional language mode
export const TRANSLATIONS = {
  en: {
    heroTitle: 'Lifelong Career Community Empowering 1 Million+ Women',
    heroSubtitle: 'From students to returners and boardroom leaders—one unified journey connecting women across India to elite programmes, verified credentials, and high-trust employers.',
    exploreButton: 'Explore Member Journeys',
    partnerButton: 'Corporate Partner Portal',
    statsMembers: 'Active Women Members',
    statsCommunities: 'Regional Sub-Communities',
    statsPartners: 'Corporate Hiring Partners',
    statsRetention: '90-Day Placement Retention',
    tabLanding: 'Executive Platform',
    tabMember: 'Member Workspace',
    tabPrograms: 'Programme Command Center',
    tabEmployer: 'Scoped Employer Portal',
    timelineTitle: '20-30 Year Lifelong Career Timeline',
    whySeeingThis: 'Why am I seeing this?',
    verifiedCert: 'Verified Credential',
    privacyMaskNotice: 'Strict Data Privacy Mode (DPDP Act 2023): Applicant PII is automatically masked for corporate partners until direct mutual interview consent.',
    retentionStatus: '3-Month Retention Status',
    stillEmployed: 'Still Employed?',
    kanbanApplied: 'Applied',
    kanbanScreening: 'Screening',
    kanbanInterview: 'Interview',
    kanbanSessions: 'Sessions',
    kanbanCompleted: 'Completed',
    kanbanPlaced: 'Placed'
  },
  hi: {
    heroTitle: '10 लाख+ महिलाओं को सशक्त बनाने वाला आजीवन करियर समुदाय',
    heroSubtitle: 'छात्राओं से लेकर वापसी करने वाली (रिटर्नर) और बोर्डरूम लीडर्स तक—भारत भर की महिलाओं को शीर्ष अवसरों और सत्यापित प्रमाणपत्रों से जोड़ने वाला मंच।',
    exploreButton: 'सदस्य यात्रा देखें',
    partnerButton: 'कॉर्पोरेट पार्टनर पोर्टल',
    statsMembers: 'सक्रिय महिला सदस्य',
    statsCommunities: 'क्षेत्रीय उप-समुदाय',
    statsPartners: 'कॉर्पोरेट साझेदार',
    statsRetention: '90-दिवसीय प्रतिधारण दर',
    tabLanding: 'प्लेटफ़ॉर्म अवलोकन',
    tabMember: 'सदस्य कार्यक्षेत्र',
    tabPrograms: 'प्रोग्राम कमांड सेंटर',
    tabEmployer: 'नियोक्ता पोर्टल',
    timelineTitle: '20-30 वर्षीय आजीवन करियर समयरेखा',
    whySeeingThis: 'मुझे यह क्यों दिख रहा है?',
    verifiedCert: 'सत्यापित प्रमाणपत्र',
    privacyMaskNotice: 'सख्त डेटा गोपनीयता मोड (DPDP अधिनियम 2023): उम्मीदवार की व्यक्तिगत जानकारी कॉर्पोरेट भागीदारों से स्वचालित रूप से सुरक्षित है।',
    retentionStatus: '3-महीने का प्रतिधारण स्तर',
    stillEmployed: 'क्या अभी भी कार्यरत हैं?',
    kanbanApplied: 'आवेदन प्राप्त',
    kanbanScreening: 'स्क्रीनिंग',
    kanbanInterview: 'साक्षात्कार',
    kanbanSessions: 'सत्र प्रगति',
    kanbanCompleted: 'सफलतापूर्वक पूर्ण',
    kanbanPlaced: 'नियुक्त (Placed)'
  },
  ta: {
    heroTitle: '10 லட்சத்திற்கும் மேற்பட்ட பெண்களை மேம்படுத்தும் வாழ்நாள் தொழில் சமூகம்',
    heroSubtitle: 'மாணவிகள் முதல் மீண்டும் பணிக்குத் திரும்புவோர் மற்றும் நிர்வாக தலைவர்கள் வரை—இந்தியப் பெண்களுக்கான ஒற்றை நம்பகமான தளம்.',
    exploreButton: 'உறுப்பினர் பயணத்தை காண்க',
    partnerButton: 'கார்ப்பரேட் பார்ட்னர் போர்டல்',
    statsMembers: 'செயலில் உள்ள பெண்கள்',
    statsCommunities: 'பிராந்திய சமூகங்கள்',
    statsPartners: 'கார்ப்பரேட் நிறுவனங்கள்',
    statsRetention: '90-நாள் தக்கவைப்பு விகிதம்',
    tabLanding: 'இயங்குதள கண்ணோட்டம்',
    tabMember: 'உறுப்பினர் பணியிடம்',
    tabPrograms: 'திட்ட கட்டுப்பாட்டு மையம்',
    tabEmployer: 'முதலாளி போர்டல்',
    timelineTitle: '20-30 ஆண்டு வாழ்நாள் தொழில் காலவரிசை',
    whySeeingThis: 'இதை நான் ஏன் பார்க்கிறேன்?',
    verifiedCert: 'சரிபார்க்கப்பட்ட சான்றிதழ்',
    privacyMaskNotice: 'கடுமையான தரவு தனியுரிமை முறை (DPDP சட்டம் 2023): வேட்பாளர் தொடர்பு விவரங்கள் மறைக்கப்பட்டுள்ளன.',
    retentionStatus: '3 மாத தக்கவைப்பு நிலை',
    stillEmployed: 'இன்னும் பணியில் உள்ளாரா?',
    kanbanApplied: 'விண்ணப்பிக்கப்பட்டது',
    kanbanScreening: 'பரிசீலனை',
    kanbanInterview: 'நேர்காணல்',
    kanbanSessions: 'பயிற்சி அமர்வுகள்',
    kanbanCompleted: 'நிறைவுற்றது',
    kanbanPlaced: 'பணி நியமனம்'
  }
};

