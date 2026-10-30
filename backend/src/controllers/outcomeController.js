const Outcome = require('../models/Outcome');
const Member = require('../models/Member');
const Programme = require('../models/Programme');
const { sendSuccess, sendError } = require('../utils/response');

async function reportOutcome(req, res, next) {
  try {
    const { memberId, programmeId, response, currentRole, employer, notes } = req.body;

    if (!memberId || !programmeId || !response) {
      return sendError(res, 'memberId, programmeId and response are required', 400);
    }

    let outcome = await Outcome.findOne({ memberId, programmeId });
    if (outcome) {
      outcome.response = response;
      outcome.currentRole = currentRole || outcome.currentRole;
      outcome.employer = employer || outcome.employer;
      outcome.reportedAt = new Date();
      outcome.notes = notes || outcome.notes;
      // Changing response resets verification
      outcome.verified = false;
      outcome.verifiedAt = null;
      await outcome.save();
    } else {
      outcome = await Outcome.create({
        memberId,
        programmeId,
        type: '3-Month Employment Check-in',
        response,
        currentRole: currentRole || 'Product Manager',
        employer: employer || 'Acme Corp',
        reportedAt: new Date(),
        verified: false,
        notes: notes || ''
      });
    }

    const populated = await Outcome.findById(outcome._id).populate('memberId').populate('programmeId');
    return sendSuccess(res, populated, '3-Month outcome reported successfully as Reported Outcome');
  } catch (err) {
    next(err);
  }
}

async function verifyOutcome(req, res, next) {
  try {
    const { id } = req.params;
    const { verifiedBy, notes } = req.body;
    const role = req.user?.role || 'MANAGER';

    const outcome = await Outcome.findById(id).populate('memberId').populate('programmeId');
    if (!outcome) {
      return sendError(res, 'Outcome record not found', 404);
    }

    outcome.verified = true;
    outcome.verifiedAt = new Date();
    outcome.verifiedBy = verifiedBy || `${role} Verification Agent`;
    if (notes) outcome.notes = notes;

    await outcome.save();

    return sendSuccess(res, outcome, 'Outcome status updated to Verified');
  } catch (err) {
    next(err);
  }
}

async function getOutcomes(req, res, next) {
  try {
    const { programmeId, memberId } = req.query;
    const query = {};
    if (programmeId) query.programmeId = programmeId;
    if (memberId) query.memberId = memberId;

    const outcomes = await Outcome.find(query).populate('memberId').populate('programmeId').sort({ reportedAt: -1 });
    return sendSuccess(res, outcomes, 'Outcomes retrieved');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  reportOutcome,
  verifyOutcome,
  getOutcomes
};

