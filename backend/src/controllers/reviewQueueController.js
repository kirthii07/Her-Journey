const ReviewQueue = require('../models/ReviewQueue');
const Member = require('../models/Member');
const { sendSuccess, sendError } = require('../utils/response');

async function getReviewQueueItems(req, res, next) {
  try {
    const items = await ReviewQueue.find({ status: 'Pending' })
      .populate('matchedMemberId')
      .sort({ createdAt: -1 });

    return sendSuccess(res, items, 'Review queue items retrieved');
  } catch (err) {
    next(err);
  }
}

async function resolveReviewQueueItem(req, res, next) {
  try {
    const { id } = req.params;
    const { decision, resolutionNotes, updatedData } = req.body;

    // decision: 'MERGE' | 'CREATE_NEW' | 'DISMISS'
    const queueItem = await ReviewQueue.findById(id).populate('matchedMemberId');
    if (!queueItem) {
      return sendError(res, 'Queue item not found', 404);
    }

    if (decision === 'MERGE') {
      // Merge verified incoming info into existing member
      const member = queueItem.matchedMemberId;
      if (member && updatedData) {
        if (updatedData.skills && updatedData.skills.length > 0) {
          member.skills = Array.from(new Set([...member.skills, ...updatedData.skills]));
        }
        if (updatedData.education) member.education = updatedData.education;
        if (updatedData.careerGoal) member.careerGoal = updatedData.careerGoal;
        member.calculateProfileCompletion();
        await member.save();
      }
      queueItem.status = 'Resolved_Merged';
    } else if (decision === 'CREATE_NEW') {
      // Intentionally create new separate member
      queueItem.status = 'Resolved_Created_New';
    } else {
      queueItem.status = 'Dismissed';
    }

    queueItem.resolvedAt = new Date();
    queueItem.resolvedBy = req.user?.name || 'Programme Manager';
    queueItem.resolutionNotes = resolutionNotes || `Resolved as ${decision}`;
    await queueItem.save();

    return sendSuccess(res, queueItem, `Review item resolved as ${decision}`);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getReviewQueueItems,
  resolveReviewQueueItem
};

