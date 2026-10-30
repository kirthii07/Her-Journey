const Member = require('../models/Member');
const { sendSuccess, sendError } = require('../utils/response');
const { maskMemberForRole } = require('../utils/masking');
const { checkDuplicateOrReuse } = require('../services/duplicateDetectionService');

async function getAllMembers(req, res, next) {
  try {
    const role = req.user?.role || 'MANAGER';
    const { stage, city } = req.query;

    const query = {};
    if (stage) query.careerStage = stage;
    if (city) query.city = new RegExp(city, 'i');

    const members = await Member.find(query).populate('communities').sort({ createdAt: -1 });

    const maskedMembers = members.map(m => maskMemberForRole(m, role));
    return sendSuccess(res, maskedMembers, 'Members fetched successfully');
  } catch (err) {
    next(err);
  }
}

async function getMemberById(req, res, next) {
  try {
    const { id } = req.params;
    const role = req.user?.role || 'MEMBER';
    const currentMemberId = req.user?.memberId;

    const member = await Member.findById(id).populate('communities');
    if (!member) {
      return sendError(res, 'Member profile not found', 404);
    }

    // Role-based masking: only unmasked if member is looking at herself
    const isSelf = currentMemberId && currentMemberId.toString() === id.toString();
    const effectiveRole = isSelf ? 'MEMBER' : role;

    const formattedMember = maskMemberForRole(member, effectiveRole);
    return sendSuccess(res, formattedMember, 'Member retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function updateMember(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const member = await Member.findById(id);
    if (!member) {
      return sendError(res, 'Member not found', 404);
    }

    // Permitted updates
    const allowedFields = [
      'bio',
      'city',
      'skills',
      'education',
      'careerGoal',
      'careerStage',
      'careerBreakMonths',
      'previousRoles',
      'consent',
      'avatarUrl'
    ];

    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        if (field === 'consent' && typeof updates.consent === 'object') {
          member.consent = {
            ...member.consent,
            ...updates.consent,
            consentTimestamp: new Date()
          };
        } else {
          member[field] = updates[field];
        }
      }
    });

    member.calculateProfileCompletion();
    await member.save();

    return sendSuccess(res, member, 'Profile updated successfully');
  } catch (err) {
    next(err);
  }
}

async function checkDuplicate(req, res, next) {
  try {
    const { phone, email, name, city, skills } = req.body;

    if (!phone && !email) {
      return sendError(res, 'Either phone number or email is required for identity verification', 400);
    }

    const result = await checkDuplicateOrReuse({
      phone,
      email,
      name,
      city,
      skills
    });

    return sendSuccess(res, result, result.message);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllMembers,
  getMemberById,
  updateMember,
  checkDuplicate
};

