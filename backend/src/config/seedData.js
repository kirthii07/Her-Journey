const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const Member = require('../models/Member');
const Programme = require('../models/Programme');
const Application = require('../models/Application');
const Community = require('../models/Community');
const Mentorship = require('../models/Mentorship');
const Certificate = require('../models/Certificate');
const Outcome = require('../models/Outcome');
const Partner = require('../models/Partner');
const ReviewQueue = require('../models/ReviewQueue');

// Standard documented demo password
const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD || 'HerJourney@2026';

async function seedDatabase() {
  const currentDb = mongoose.connection.name;
  if (currentDb && currentDb !== 'herjourney_db') {
    throw new Error(`SAFETY CHECK FAILED: Seed script targeted "${currentDb}". It must strictly run on "herjourney_db".`);
  }

  console.log(`[Seed] Seeding HerJourney database "${currentDb || 'herjourney_db'}" safely...`);

  // Salt and hash demo password once
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, salt);

  // Clear ONLY HerJourney collections within herjourney_db
  await Promise.all([
    User.deleteMany({}),
    Member.deleteMany({}),
    Programme.deleteMany({}),
    Application.deleteMany({}),
    Community.deleteMany({}),
    Mentorship.deleteMany({}),
    Certificate.deleteMany({}),
    Outcome.deleteMany({}),
    Partner.deleteMany({}),
    ReviewQueue.deleteMany({})
  ]);

  // 1. Create Partners
  const acmePartner = await Partner.create({
    name: 'Acme Corp',
    industry: 'Enterprise SaaS & Cloud',
    contactEmail: 'talent@acmecorp.com',
    description: 'Global cloud solutions partner committed to returnship diversity and equitable career transitions in India.'
  });

  const techCorpPartner = await Partner.create({
    name: 'TechCorp India',
    industry: 'FinTech & Analytics',
    contactEmail: 'careers@techcorp.in',
    description: 'Pioneering digital financial infrastructure with leading gender diversity cohorts.'
  });

  // 2. Create Communities
  const commData = [
    { name: 'Women in Tech', description: 'Pan-India community of female engineers, analysts, and tech builders.', category: 'Engineering' },
    { name: 'Returners', description: 'Supportive cohort of women returning to tech after parental, caregiving, or sabbatical breaks.', category: 'Career Reentry' },
    { name: 'Early Career Professionals', description: 'Accelerating foundational careers in tech and analytics.', category: 'Growth' },
    { name: 'Women Leaders', description: 'Senior leaders, directors, and VPs fostering executive influence.', category: 'Leadership' },
    { name: 'Mentors', description: 'Experienced practitioners dedicated to guiding women through every chapter.', category: 'Mentorship' },
    { name: 'Students in Tech', description: 'College students and fresh graduates launching technical careers.', category: 'Campus' },
    { name: 'Future Developers', description: 'Skill-building, hackathons, and open source exploration.', category: 'Campus' }
  ];

  const communities = await Community.insertMany(commData);
  const commMap = {};
  communities.forEach(c => { commMap[c.name] = c._id; });

  // 3. Create Sample Members
  // Member 1: Priya (Primary Demo User)
  const priya = await Member.create({
    name: 'Priya Sharma',
    email: 'priya@demo.herjourney.app',
    phone: '+91 98765 43210',
    age: 34,
    city: 'Bengaluru',
    careerStage: 'Returner',
    yearsOfExperience: 6,
    careerBreakMonths: 36, // 3 years break
    skills: ['Product Management', 'Product Strategy', 'Analytics', 'Agile', 'User Research'],
    education: 'B.Tech in Computer Science, Visvesvaraya Technological University',
    careerGoal: 'Return to a Senior Product Manager role at a forward-thinking technology company.',
    bio: 'Product Manager with 6 years experience in eCommerce product discovery. Took a planned 3-year career break for maternity and childcare. Passionate about user empathy, data-driven backlogs, and agile roadmaps.',
    previousRoles: [
      {
        title: 'Senior Product Manager',
        company: 'CloudCommerce India',
        duration: '2018 - 2022',
        years: 4,
        description: 'Led core checkout and payments funnel resulting in 18% lift in conversion.'
      },
      {
        title: 'Associate Product Manager',
        company: 'RetailPulse Technologies',
        duration: '2016 - 2018',
        years: 2,
        description: 'Managed customer retention workflows and catalog taxonomy.'
      }
    ],
    communities: [commMap['Returners'], commMap['Women in Tech']],
    consent: {
      communication: true,
      programmeInvitations: true,
      partnerSharing: true,
      consentTimestamp: new Date('2026-01-15T10:00:00Z'),
      consentVersion: 'v1.0'
    },
    profileCompletion: 85
  });

  // Member 2: Ananya (Student)
  const ananya = await Member.create({
    name: 'Ananya Krishnan',
    email: 'ananya@demo.herjourney.app',
    phone: '+91 98765 43211',
    age: 20,
    city: 'Coimbatore',
    careerStage: 'Student',
    yearsOfExperience: 0,
    careerBreakMonths: 0,
    skills: ['Python', 'JavaScript', 'Problem Solving', 'Data Structures', 'React'],
    education: 'B.E. Computer Science (Final Year), PSG College of Technology',
    careerGoal: 'Secure a foundational Full-Stack Developer internship and graduate to first full-time role.',
    bio: 'Curious final-year computer science student, open source contributor, and hackathon winner passionate about clean web architectures.',
    previousRoles: [],
    communities: [commMap['Students in Tech'], commMap['Future Developers']],
    consent: {
      communication: true,
      programmeInvitations: true,
      partnerSharing: true,
      consentTimestamp: new Date('2026-02-01T10:00:00Z'),
      consentVersion: 'v1.0'
    },
    profileCompletion: 80
  });

  // Member 3: Meena (Early Career)
  const meena = await Member.create({
    name: 'Meena Kulkarni',
    email: 'meena@demo.herjourney.app',
    phone: '+91 98765 43212',
    age: 27,
    city: 'Pune',
    careerStage: 'Early Career',
    yearsOfExperience: 3,
    careerBreakMonths: 0,
    skills: ['Java', 'SQL', 'Product Analytics', 'Spring Boot', 'Data Pipelines'],
    education: 'B.Tech in Information Technology, Pune Institute of Computer Technology',
    careerGoal: 'Transition into Senior Analytics Engineering or Product Strategy leadership.',
    bio: 'Backend developer & analytics practitioner with 3 years building microservices and relational data pipelines.',
    previousRoles: [
      {
        title: 'Software Engineer',
        company: 'Fintech Solutions Pune',
        duration: '2023 - Present',
        years: 3,
        description: 'Maintained transaction ledger services and payment reconciliation tables.'
      }
    ],
    communities: [commMap['Women in Tech'], commMap['Early Career Professionals']],
    consent: {
      communication: true,
      programmeInvitations: true,
      partnerSharing: true,
      consentTimestamp: new Date('2026-01-20T10:00:00Z'),
      consentVersion: 'v1.0'
    },
    profileCompletion: 90
  });

  // Member 4: Lakshmi (Leader & Mentor)
  const lakshmi = await Member.create({
    name: 'Lakshmi Narayanan',
    email: 'lakshmi@demo.herjourney.app',
    phone: '+91 98765 43213',
    age: 45,
    city: 'Chennai',
    careerStage: 'Leader',
    yearsOfExperience: 18,
    careerBreakMonths: 0,
    skills: ['Leadership', 'Strategy', 'Product Management', 'Executive Coaching', 'Organizational Scaling'],
    education: 'MBA Indian Institute of Management Bangalore; B.Tech IIT Madras',
    careerGoal: 'Mentor 50+ women into senior product leadership and serve on tech advisory boards.',
    bio: 'VP of Product Strategy with 18+ years leading enterprise cloud software. Dedicated mentor helping women navigate transitions and board roles.',
    previousRoles: [
      {
        title: 'Vice President of Product',
        company: 'Global SaaS Enterprise',
        duration: '2019 - Present',
        years: 7,
        description: 'Oversees 140+ person product and engineering division across Asia-Pacific.'
      }
    ],
    communities: [commMap['Women Leaders'], commMap['Mentors']],
    consent: {
      communication: true,
      programmeInvitations: true,
      partnerSharing: true,
      consentTimestamp: new Date('2025-11-10T10:00:00Z'),
      consentVersion: 'v1.0'
    },
    profileCompletion: 95
  });

  // Member 5: Rukmini (Low Access / Basic phone / Regional language showcase)
  const rukmini = await Member.create({
    name: 'Rukmini Devi',
    email: 'rukmini@demo.herjourney.app',
    phone: '+91 98765 43214',
    age: 29,
    city: 'Jaipur',
    careerStage: 'Returner',
    yearsOfExperience: 2,
    careerBreakMonths: 24,
    skills: ['Customer Support', 'Digital Literacy', 'Operations', 'Local Logistics'],
    education: 'BA (Distance Education), University of Rajasthan',
    careerGoal: 'Achieve financial autonomy through remote customer success or catalog verification role.',
    bio: 'Dedicated first-generation professional from peri-urban Jaipur. Accesses digital opportunities via lightweight mobile interface and regional language audio guides.',
    previousRoles: [
      {
        title: 'Customer Support Executive',
        company: 'Regional TeleServices',
        duration: '2021 - 2023',
        years: 2,
        description: 'Handled customer issue resolution over phone and SMS.'
      }
    ],
    communities: [commMap['Returners']],
    consent: {
      communication: true,
      programmeInvitations: true,
      partnerSharing: false, // Exemplifies selective consent
      consentTimestamp: new Date('2026-02-10T10:00:00Z'),
      consentVersion: 'v1.0'
    },
    profileCompletion: 75
  });

  // Update community counts
  for (const c of communities) {
    const count = await Member.countDocuments({ communities: c._id });
    c.memberCount = count;
    await c.save();
  }

  // 4. Create Programmes
  const returnshipProg = await Programme.create({
    name: 'Returnship 2026',
    description: 'Flagship 16-week sponsored reentry programme for experienced women returning after 1+ years break. Combines hands-on product workshops, executive mentoring, and guaranteed partner interviews.',
    partnerId: acmePartner._id,
    partnerName: 'Acme Corp',
    category: 'Returnship',
    targetLifeStage: ['Returner', 'Career Break'],
    requiredSkills: ['Product Management', 'Analytics'],
    careerBreakRequirementMonths: 12,
    eligibilityRules: {
      minCareerBreakMonths: 12,
      requiredSkills: ['Product Management', 'Analytics'],
      allowedLifeStages: ['Returner', 'Career Break']
    },
    stages: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed'],
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-06-30'),
    seats: 30,
    status: 'Active'
  });

  const hackathonProg = await Programme.create({
    name: 'Women in Tech Hackathon & Skill Sprint',
    description: '48-hour national hackathon followed by a 4-week mentorship sprint for students and early-career developers.',
    partnerId: techCorpPartner._id,
    partnerName: 'TechCorp India',
    category: 'Hackathon',
    targetLifeStage: ['Student', 'First Job', 'Early Career'],
    requiredSkills: ['Python', 'JavaScript', 'Problem Solving'],
    careerBreakRequirementMonths: 0,
    eligibilityRules: {
      minCareerBreakMonths: 0,
      requiredSkills: ['Python', 'JavaScript', 'Problem Solving'],
      allowedLifeStages: ['Student', 'First Job', 'Early Career']
    },
    stages: ['Applied', 'Screening', 'Sessions', 'Completed'],
    startDate: new Date('2026-04-10'),
    endDate: new Date('2026-05-15'),
    seats: 100,
    status: 'Active'
  });

  const leadershipProg = await Programme.create({
    name: 'Leadership Circle: Women in Product Strategy',
    description: 'Executive fellowship for senior product managers and tech leaders preparing for VP and C-level board appointments.',
    partnerId: acmePartner._id,
    partnerName: 'Acme Corp',
    category: 'Leadership',
    targetLifeStage: ['Leadership', 'Leader', 'Mentor'],
    requiredSkills: ['Leadership', 'Strategy', 'Product Management'],
    careerBreakRequirementMonths: 0,
    eligibilityRules: {
      minCareerBreakMonths: 0,
      requiredSkills: ['Leadership', 'Strategy'],
      allowedLifeStages: ['Leadership', 'Leader', 'Mentor']
    },
    stages: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed'],
    startDate: new Date('2026-05-01'),
    endDate: new Date('2026-08-30'),
    seats: 25,
    status: 'Active'
  });

  acmePartner.programmes = [returnshipProg._id, leadershipProg._id];
  await acmePartner.save();
  techCorpPartner.programmes = [hackathonProg._id];
  await techCorpPartner.save();

  // 5. Create Applications
  const priyaApp = await Application.create({
    memberId: priya._id,
    programmeId: returnshipProg._id,
    currentStage: 'Sessions',
    status: 'In Progress',
    invitedAt: new Date('2026-02-15T09:30:00Z'),
    registeredAt: new Date('2026-02-16T14:20:00Z'),
    screeningNotes: 'Strong product foundation with 6 years experience. Clear articulation of career break learnings.',
    interviewFeedback: 'Passed technical and culture fit panel with Acme Corp VP of Product. Recommended for cohort.',
    attendance: [
      { sessionNumber: 1, topic: 'Orientation & Reentry Readiness', date: new Date('2026-03-05'), present: true },
      { sessionNumber: 2, topic: 'Product Execution & System Design Masterclass', date: new Date('2026-03-12'), present: true },
      { sessionNumber: 3, topic: 'Strategic Influence & Executive Presence', date: new Date('2026-03-19'), present: false }
    ]
  });

  await Application.create({
    memberId: ananya._id,
    programmeId: hackathonProg._id,
    currentStage: 'Completed',
    status: 'Completed',
    invitedAt: new Date('2026-01-10'),
    registeredAt: new Date('2026-01-12'),
    completedAt: new Date('2026-02-15'),
    attendance: [
      { sessionNumber: 1, topic: 'Kickoff & Team Matching', date: new Date('2026-01-15'), present: true },
      { sessionNumber: 2, topic: 'Prototype Review', date: new Date('2026-01-22'), present: true }
    ]
  });

  // 6. Create Mentorship
  await Mentorship.create({
    mentorId: lakshmi._id,
    menteeId: meena._id,
    focusArea: 'Leadership & Product Strategy',
    status: 'Active',
    notes: 'Bi-weekly strategic product leadership mentoring and career transition guidance.',
    meetingCount: 4
  });

  // 7. Create Ambiguous Match in Review Queue
  await ReviewQueue.create({
    incomingData: {
      name: 'Priya S.',
      email: 'priya.sharma.personal@gmail.com',
      phone: '+91 98765 43210',
      city: 'Bengaluru',
      skills: ['Product Analytics', 'Agile'],
      source: 'External Google Form Import'
    },
    matchedMemberId: priya._id,
    confidenceScore: 78,
    matchReasons: [
      'Exact phone match (+91 98765 43210) but different email address (priya.sharma.personal@gmail.com vs priya@demo.herjourney.app)'
    ],
    status: 'Pending'
  });

  // 8. Create / Upsert Real Authenticated User Accounts with bcrypt password hash
  const usersToSeed = [
    {
      name: 'Priya Sharma',
      email: 'priya@demo.herjourney.app',
      password: hashedPassword,
      role: 'MEMBER',
      memberId: priya._id
    },
    {
      name: 'Maya Rao (Programme Director)',
      email: 'manager@demo.herjourney.app',
      password: hashedPassword,
      role: 'MANAGER'
    },
    {
      name: 'Acme Corp Talent Partner',
      email: 'partner@demo.herjourney.app',
      password: hashedPassword,
      role: 'PARTNER',
      partnerId: acmePartner._id
    },
    {
      name: 'Ananya Krishnan',
      email: 'ananya@demo.herjourney.app',
      password: hashedPassword,
      role: 'MEMBER',
      memberId: ananya._id
    },
    {
      name: 'Meena Kulkarni',
      email: 'meena@demo.herjourney.app',
      password: hashedPassword,
      role: 'MEMBER',
      memberId: meena._id
    },
    {
      name: 'Lakshmi Narayanan',
      email: 'lakshmi@demo.herjourney.app',
      password: hashedPassword,
      role: 'MEMBER',
      memberId: lakshmi._id
    },
    {
      name: 'Rukmini Devi',
      email: 'rukmini@demo.herjourney.app',
      password: hashedPassword,
      role: 'MEMBER',
      memberId: rukmini._id
    }
  ];

  await User.insertMany(usersToSeed);

  console.log(`[Seed] Seeded ${usersToSeed.length} authenticated User accounts with secure bcrypt hash.`);
  console.log(`[Seed] Documented demo password: "${DEMO_PASSWORD}" (or "demo123" compatibility).`);
  console.log('[Seed] HerJourney database seeded successfully with Priya, Ananya, Meena, Lakshmi, Rukmini and ecosystem models!');
}

module.exports = { seedDatabase, DEMO_PASSWORD };
