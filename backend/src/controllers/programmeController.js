const Programme = require('../models/Programme');
const Member = require('../models/Member');
const Application = require('../models/Application');
const { sendSuccess, sendError } = require('../utils/response');
const { maskMemberForRole } = require('../utils/masking');
const { evaluateEligibility } = require('../services/eligibilityEngine');

async function getAllProgrammes(req, res, next) {
  try {
    const role = req.user?.role || 'MEMBER';
    const partnerId = req.user?.partnerId;

    const query = {};
    // Partner isolation: Partner can only see their own programmes
    if (role === 'PARTNER' && partnerId) {
      query.partnerId = partnerId;
    }

    const programmes = await Programme.find(query).populate('partnerId').sort({ createdAt: -1 });
    return sendSuccess(res, programmes, 'Programmes fetched successfully');
  } catch (err) {
    next(err);
  }
}

async function getProgrammeById(req, res, next) {
  try {
    const { id } = req.params;
    const role = req.user?.role || 'MEMBER';
    const partnerId = req.user?.partnerId;

    const programme = await Programme.findById(id).populate('partnerId');
    if (!programme) {
      return sendError(res, 'Programme not found', 404);
    }

    // Partner isolation verification
    if (role === 'PARTNER' && partnerId && programme.partnerId?._id?.toString() !== partnerId.toString()) {
      return sendError(res, 'Unauthorized: Partner can only view their own sponsored programmes', 403);
    }

    return sendSuccess(res, programme, 'Programme details retrieved');
  } catch (err) {
    next(err);
  }
}

async function createProgramme(req, res, next) {
  try {
    const {
      name,
      description,
      partnerId,
      partnerName,
      category,
      targetLifeStage,
      requiredSkills,
      careerBreakRequirementMonths,
      eligibilityRules,
      stages,
      startDate,
      endDate,
      seats
    } = req.body;

    if (!name || !description) {
      return sendError(res, 'Programme name and description are required', 400);
    }

    const defaultStages = stages && stages.length > 0
      ? stages
      : ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed'];

    const newProgramme = await Programme.create({
      name,
      description,
      partnerId: partnerId || null,
      partnerName: partnerName || 'HerJourney Foundation',
      category: category || 'Returnship',
      targetLifeStage: targetLifeStage || ['Returner', 'Career Break'],
      requiredSkills: requiredSkills || [],
      careerBreakRequirementMonths: Number(careerBreakRequirementMonths) || 0,
      eligibilityRules: eligibilityRules || {
        minCareerBreakMonths: Number(careerBreakRequirementMonths) || 0,
        requiredSkills: requiredSkills || [],
        allowedLifeStages: targetLifeStage || []
      },
      stages: defaultStages,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      seats: seats || 50,
      status: 'Active'
    });

    return sendSuccess(res, newProgramme, 'Programme created successfully', 201);
  } catch (err) {
    next(err);
  }
}

async function updateProgramme(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const programme = await Programme.findByIdAndUpdate(id, updates, { new: true });
    if (!programme) {
      return sendError(res, 'Programme not found', 404);
    }

    return sendSuccess(res, programme, 'Programme updated successfully');
  } catch (err) {
    next(err);
  }
}

async function getEligibleMembersForProgramme(req, res, next) {
  try {
    const { id } = req.params;
    const role = req.user?.role || 'MANAGER';

    const programme = await Programme.findById(id);
    if (!programme) {
      return sendError(res, 'Programme not found', 404);
    }

    // Fetch all members
    const members = await Member.find().populate('communities');
    // Fetch existing applications for this programme
    const applications = await Application.find({ programmeId: id });
    const appMap = new Map();
    applications.forEach(app => {
      appMap.set(app.memberId.toString(), app);
    });

    // Evaluate each member against the deterministic eligibility rules
    const evaluatedMembers = members.map(member => {
      const evaluation = evaluateEligibility(member, programme);
      const existingApp = appMap.get(member._id.toString());
      const masked = maskMemberForRole(member, role);

      return {
        member: masked,
        isEligible: evaluation.isEligible,
        reasons: evaluation.reasons,
        criteriaBreakdown: evaluation.criteriaBreakdown,
        consentGranted: Boolean(member.consent?.programmeInvitations),
        consentTimestamp: member.consent?.consentTimestamp,
        applicationStatus: existingApp ? existingApp.status : 'None',
        currentStage: existingApp ? existingApp.currentStage : null,
        applicationId: existingApp ? existingApp._id : null
      };
    });

    return sendSuccess(res, evaluatedMembers, 'Eligible members evaluated');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllProgrammes,
  getProgrammeById,
  createProgramme,
  updateProgramme,
  getEligibleMembersForProgramme
};

