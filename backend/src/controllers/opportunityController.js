const Member = require('../models/Member');
const { getRecommendedOpportunities } = require('../services/opportunityEngine');
const { sendSuccess, sendError } = require('../utils/response');

async function getOpportunitiesForMember(req, res, next) {
  try {
    const { memberId } = req.params;

    const member = await Member.findById(memberId);
    if (!member) {
      return sendError(res, 'Member not found', 404);
    }

    const recommendations = getRecommendedOpportunities(member);

    return sendSuccess(
      res,
      {
        memberId: member._id,
        memberName: member.name,
        careerStage: member.careerStage,
        opportunities: recommendations
      },
      'Rule-based opportunities computed'
    );
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getOpportunitiesForMember
};

