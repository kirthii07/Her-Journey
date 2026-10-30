/**
 * Deterministic, rule-based eligibility evaluation engine.
 * Evaluates whether a member meets programme requirements with fully explainable criteria breakdown.
 * NO AI / LLM used - purely transparent, deterministic business rules.
 */

function evaluateEligibility(member, programme) {
  if (!member || !programme) {
    return {
      isEligible: false,
      reasons: ['Member or programme data missing'],
      criteriaBreakdown: []
    };
  }

  const criteriaBreakdown = [];
  const rules = programme.eligibilityRules || {};
  let isEligible = true;

  // 1. Career Break evaluation (if programme requires a minimum career break)
  const minCareerBreakMonths = rules.minCareerBreakMonths !== undefined
    ? rules.minCareerBreakMonths
    : (programme.careerBreakRequirementMonths || 0);

  if (minCareerBreakMonths > 0) {
    const memberBreak = member.careerBreakMonths || 0;
    const passed = memberBreak >= minCareerBreakMonths;
    if (!passed) isEligible = false;

    criteriaBreakdown.push({
      rule: `Career break >= ${minCareerBreakMonths} months`,
      passed,
      detail: passed
        ? `Career break is ${memberBreak} months (meets requirement of >= ${minCareerBreakMonths} months)`
        : `Career break is ${memberBreak} months (requires at least ${minCareerBreakMonths} months)`
    });
  }

  // 2. Skills requirement evaluation (e.g. Product OR Analytics or specific skills)
  const requiredSkills = (rules.requiredSkills && rules.requiredSkills.length > 0)
    ? rules.requiredSkills
    : (programme.requiredSkills || []);

  if (requiredSkills.length > 0) {
    const memberSkillsLower = (member.skills || []).map(s => s.toLowerCase().trim());
    const matchedSkills = [];

    for (const req of requiredSkills) {
      const reqLower = req.toLowerCase().trim();
      const match = memberSkillsLower.some(ms => ms.includes(reqLower) || reqLower.includes(ms));
      if (match) {
        matchedSkills.push(req);
      }
    }

    const passed = matchedSkills.length > 0;
    if (!passed) isEligible = false;

    criteriaBreakdown.push({
      rule: `Skills must contain ${requiredSkills.join(' OR ')}`,
      passed,
      detail: passed
        ? `Matched skill(s): ${matchedSkills.join(', ')}`
        : `No matching skills found from: ${requiredSkills.join(', ')} (Member has: ${member.skills?.join(', ') || 'none'})`
    });
  }

  // 3. Life stage requirement evaluation (e.g. Returner, Career Break, Student, etc.)
  const allowedLifeStages = (rules.allowedLifeStages && rules.allowedLifeStages.length > 0)
    ? rules.allowedLifeStages
    : (programme.targetLifeStage || []);

  if (allowedLifeStages.length > 0) {
    const passed = allowedLifeStages.some(
      stage => stage.toLowerCase() === (member.careerStage || '').toLowerCase()
    );
    if (!passed) isEligible = false;

    criteriaBreakdown.push({
      rule: `Target career stage: ${allowedLifeStages.join(', ')}`,
      passed,
      detail: passed
        ? `Member current stage "${member.careerStage}" matches target cohort`
        : `Member current stage "${member.careerStage}" does not match target (${allowedLifeStages.join(', ')})`
    });
  }

  // Generate clear human-readable explanation strings
  const reasons = criteriaBreakdown.map(c => (c.passed ? `✓ ${c.detail}` : `✗ ${c.detail}`));

  return {
    isEligible,
    reasons,
    criteriaBreakdown
  };
}

module.exports = {
  evaluateEligibility
};

