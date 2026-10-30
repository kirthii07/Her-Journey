/**
 * Rule-based, deterministic opportunity recommendation engine.
 * Generates relevant opportunities (jobs, returnships, fellowships, leadership programs)
 * with transparent "Why am I seeing this?" explanations.
 * NO AI / LLM used.
 */

const OPPORTUNITY_CATALOG = [
  {
    id: 'opp-1',
    title: 'Senior Product Manager - Returnship Track',
    company: 'Acme Corp',
    location: 'Bengaluru (Hybrid / Flexible)',
    type: 'Returnship to Full-time',
    stipend: '₹1,50,000 / month during returnship',
    tags: ['Returnship', 'Product Management', 'Flexible Hours'],
    rules: {
      careerStages: ['Returner', 'Career Break', 'Career Growth'],
      skills: ['Product Management', 'Product Strategy', 'Analytics', 'Agile'],
      minBreakMonths: 12
    },
    description: 'A 6-month supported reentry programme designed for experienced product professionals returning after a career break of 1+ years. Features 1:1 executive sponsorship and flexible hybrid working arrangements.'
  },
  {
    id: 'opp-2',
    title: 'Product Analytics & BI Specialist',
    company: 'TechCorp India',
    location: 'Bengaluru / Pune (Remote friendly)',
    type: 'Full-time Re-entry',
    stipend: 'Competitive CTC',
    tags: ['Analytics', 'SQL', 'Returner Welcome'],
    rules: {
      careerStages: ['Returner', 'Early Career', 'Career Growth'],
      skills: ['Analytics', 'Product Analytics', 'SQL', 'Data Analysis']
    },
    description: 'Empowering product teams with deep user behavioral analytics and data models. Welcomes professionals returning from career breaks with refresher mentorship.'
  },
  {
    id: 'opp-3',
    title: 'Early Career Software Engineering Fellowship',
    company: 'Fintech Innovations India',
    location: 'Coimbatore / Chennai / Remote',
    type: 'Fellowship / Internship',
    stipend: '₹40,000 / month',
    tags: ['Student', 'First Job', 'Python', 'Web Dev'],
    rules: {
      careerStages: ['Student', 'First Job', 'Early Career'],
      skills: ['Python', 'JavaScript', 'Problem Solving', 'Java']
    },
    description: 'Designed for ambitious college students and early-career developers looking to accelerate their foundational full-stack software development skills with live production projects.'
  },
  {
    id: 'opp-4',
    title: 'Women in Tech Executive Advisory Council',
    company: 'HerJourney Leadership Circle',
    location: 'Pan-India (Quarterly in Chennai/Bengaluru)',
    type: 'Leadership Fellowship / Board Mentorship',
    stipend: 'Honorarium + Executive Peer Network',
    tags: ['Leadership', 'Mentorship', 'Strategy'],
    rules: {
      careerStages: ['Leadership', 'Leader', 'Mentor', 'Advisor'],
      skills: ['Leadership', 'Strategy', 'Product Management', 'Executive Coaching']
    },
    description: 'An exclusive peer network for senior women directors and VPs to shape industry policies, mentor rising returners, and exchange board-level insights.'
  },
  {
    id: 'opp-5',
    title: 'Career Restart Foundation Workshop: Resume & Interview Prep',
    company: 'HerJourney Career Lab',
    location: 'Online (Interactive evening cohorts)',
    type: 'Career Development',
    stipend: 'Free for Community Members',
    tags: ['Career Break', 'Confidence Building', 'Interview Prep'],
    rules: {
      careerStages: ['Career Break', 'Returner']
    },
    description: 'A structured 4-week cohort specifically addressing career break narrative reframing, LinkedIn positioning, confidence building, and modern interview techniques.'
  }
];

function getRecommendedOpportunities(member) {
  if (!member) return [];

  const memberStage = member.careerStage || '';
  const memberSkillsLower = (member.skills || []).map(s => s.toLowerCase());
  const memberBreak = member.careerBreakMonths || 0;

  const scoredRecommendations = [];

  for (const opp of OPPORTUNITY_CATALOG) {
    const reasons = [];
    let matchScore = 0;

    // Check career stage
    if (opp.rules.careerStages && opp.rules.careerStages.includes(memberStage)) {
      matchScore += 40;
      reasons.push(`Your current career stage is "${memberStage}"`);
    }

    // Check skills
    if (opp.rules.skills && opp.rules.skills.length > 0) {
      const matchedSkills = [];
      for (const reqSkill of opp.rules.skills) {
        if (memberSkillsLower.some(s => s.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(s))) {
          matchedSkills.push(reqSkill);
        }
      }

      if (matchedSkills.length > 0) {
        matchScore += 40;
        reasons.push(`Your profile highlights relevant expertise in ${matchedSkills.join(', ')}`);
      }
    }

    // Check break requirement if specified
    if (opp.rules.minBreakMonths && memberBreak >= opp.rules.minBreakMonths) {
      matchScore += 20;
      reasons.push(`Your career break of ${memberBreak} months qualifies you for this dedicated reentry track`);
    }

    // Only recommend if there is a genuine match (score >= 40)
    if (matchScore >= 40) {
      scoredRecommendations.push({
        ...opp,
        matchScore,
        whyExplanation: `You are seeing this opportunity because ${reasons.join(', and ')}.`,
        reasonsList: reasons
      });
    }
  }

  // Sort by highest match score
  return scoredRecommendations.sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = {
  OPPORTUNITY_CATALOG,
  getRecommendedOpportunities
};

