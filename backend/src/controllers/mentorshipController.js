const Mentorship = require('../models/Mentorship');
const Member = require('../models/Member');
const { sendSuccess, sendError } = require('../utils/response');

async function getMentorshipForMember(req, res, next) {
  try {
    const { memberId } = req.params;

    const asMentee = await Mentorship.find({ menteeId: memberId })
      .populate('mentorId', 'name careerStage city avatarUrl skills bio')
      .sort({ createdAt: -1 });

    const asMentor = await Mentorship.find({ mentorId: memberId })
      .populate('menteeId', 'name careerStage city avatarUrl skills bio')
      .sort({ createdAt: -1 });

    return sendSuccess(
      res,
      {
        mentors: asMentee,
        mentees: asMentor
      },
      'Mentorship connections retrieved'
    );
  } catch (err) {
    next(err);
  }
}

async function createMentorship(req, res, next) {
  try {
    const { mentorId, menteeId, focusArea, notes } = req.body;

    if (!mentorId || !menteeId || !focusArea) {
      return sendError(res, 'mentorId, menteeId and focusArea are required', 400);
    }

    const mentorship = await Mentorship.create({
      mentorId,
      menteeId,
      focusArea,
      notes: notes || '',
      status: 'Active'
    });

    const populated = await Mentorship.findById(mentorship._id)
      .populate('mentorId')
      .populate('menteeId');

    return sendSuccess(res, populated, 'Mentorship connection established', 201);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMentorshipForMember,
  createMentorship
};

