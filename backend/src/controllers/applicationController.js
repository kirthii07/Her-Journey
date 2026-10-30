const Application = require('../models/Application');
const Programme = require('../models/Programme');
const Member = require('../models/Member');
const { sendSuccess, sendError } = require('../utils/response');
const { maskMemberForRole } = require('../utils/masking');

const DEFAULT_SESSIONS = [
  { sessionNumber: 1, topic: 'Orientation & Reentry Readiness', present: false },
  { sessionNumber: 2, topic: 'Product Execution & System Design Masterclass', present: false },
  { sessionNumber: 3, topic: 'Strategic Influence & Executive Presence', present: false }
];

async function getApplications(req, res, next) {
  try {
    const { programmeId, memberId } = req.query;
    const role = req.user?.role || 'MEMBER';
    const currentMemberId = req.user?.memberId;

    const query = {};
    if (programmeId) query.programmeId = programmeId;
    if (memberId) {
      // Privacy check: Member can only view own applications
      if (role === 'MEMBER' && currentMemberId && currentMemberId.toString() !== memberId.toString()) {
        return sendError(res, 'Privacy restriction: You can only view your own applications', 403);
      }
      query.memberId = memberId;
    }

    const applications = await Application.find(query)
      .populate('memberId')
      .populate('programmeId')
      .sort({ updatedAt: -1 });

    const formatted = applications.map(app => {
      const appObj = app.toObject();
      if (appObj.memberId) {
        const isSelf = currentMemberId && currentMemberId.toString() === appObj.memberId._id?.toString();
        appObj.memberId = maskMemberForRole(appObj.memberId, isSelf ? 'MEMBER' : role);
      }
      return appObj;
    });

    return sendSuccess(res, formatted, 'Applications retrieved');
  } catch (err) {
    next(err);
  }
}

async function getApplicationById(req, res, next) {
  try {
    const { id } = req.params;
    const role = req.user?.role || 'MEMBER';
    const currentMemberId = req.user?.memberId;

    const application = await Application.findById(id)
      .populate('memberId')
      .populate('programmeId');

    if (!application) {
      return sendError(res, 'Application not found', 404);
    }

    const appObj = application.toObject();
    if (appObj.memberId) {
      const isSelf = currentMemberId && currentMemberId.toString() === appObj.memberId._id?.toString();
      appObj.memberId = maskMemberForRole(appObj.memberId, isSelf ? 'MEMBER' : role);
    }

    return sendSuccess(res, appObj, 'Application details retrieved');
  } catch (err) {
    next(err);
  }
}

async function inviteMember(req, res, next) {
  try {
    const { id: programmeId } = req.params;
    const { memberId } = req.body;

    if (!memberId) {
      return sendError(res, 'Member ID is required', 400);
    }

    const programme = await Programme.findById(programmeId);
    if (!programme) {
      return sendError(res, 'Programme not found', 404);
    }

    const member = await Member.findById(memberId);
    if (!member) {
      return sendError(res, 'Member not found', 404);
    }

    // CONSENT CHECK - Crucial assignment requirement
    if (!member.consent?.programmeInvitations) {
      return sendError(
        res,
        `Cannot send invitation: Member ${member.name} has not granted programme invitation consent.`,
        400
      );
    }

    // Check existing application
    let application = await Application.findOne({ memberId, programmeId });
    if (application) {
      application.status = 'Invited';
      application.invitedAt = new Date();
      await application.save();
    } else {
      application = await Application.create({
        memberId,
        programmeId,
        currentStage: 'Applied',
        status: 'Invited',
        invitedAt: new Date(),
        attendance: DEFAULT_SESSIONS.map(s => ({ ...s, date: new Date() }))
      });
    }

    const populated = await Application.findById(application._id).populate('memberId').populate('programmeId');
    return sendSuccess(res, populated, `Invitation sent successfully to ${member.name}`);
  } catch (err) {
    next(err);
  }
}

async function registerForProgramme(req, res, next) {
  try {
    const { programmeId, memberId } = req.body;

    if (!programmeId || !memberId) {
      return sendError(res, 'Programme ID and Member ID are required', 400);
    }

    let application = await Application.findOne({ memberId, programmeId });
    if (application) {
      application.status = 'Registered';
      application.registeredAt = new Date();
      application.currentStage = 'Applied';
      if (!application.attendance || application.attendance.length === 0) {
        application.attendance = DEFAULT_SESSIONS.map(s => ({ ...s, date: new Date() }));
      }
      await application.save();
    } else {
      application = await Application.create({
        memberId,
        programmeId,
        currentStage: 'Applied',
        status: 'Registered',
        registeredAt: new Date(),
        attendance: DEFAULT_SESSIONS.map(s => ({ ...s, date: new Date() }))
      });
    }

    const populated = await Application.findById(application._id).populate('memberId').populate('programmeId');
    return sendSuccess(res, populated, 'Successfully registered for programme');
  } catch (err) {
    next(err);
  }
}

async function updateStage(req, res, next) {
  try {
    const { id } = req.params;
    const { stage, notes } = req.body;

    if (!stage) {
      return sendError(res, 'Stage is required', 400);
    }

    const application = await Application.findById(id).populate('programmeId').populate('memberId');
    if (!application) {
      return sendError(res, 'Application not found', 404);
    }

    const allowedStages = application.programmeId?.stages || [
      'Applied',
      'Screening',
      'Interview',
      'Sessions',
      'Completed',
      'Placed'
    ];

    if (!allowedStages.includes(stage)) {
      return sendError(res, `Invalid stage "${stage}". Allowed stages: ${allowedStages.join(', ')}`, 400);
    }

    application.currentStage = stage;
    if (notes) application.notes = notes;

    if (stage === 'Completed' && !application.completedAt) {
      application.completedAt = new Date();
      application.status = 'Completed';
    } else if (stage === 'Placed' && !application.placedAt) {
      application.placedAt = new Date();
      application.status = 'Placed';
    } else {
      application.status = 'In Progress';
    }

    await application.save();
    return sendSuccess(res, application, `Candidate moved to "${stage}" stage`);
  } catch (err) {
    next(err);
  }
}

async function updateAttendance(req, res, next) {
  try {
    const { id } = req.params;
    const { sessionNumber, present } = req.body;

    if (sessionNumber === undefined || present === undefined) {
      return sendError(res, 'sessionNumber and present boolean are required', 400);
    }

    const application = await Application.findById(id);
    if (!application) {
      return sendError(res, 'Application not found', 404);
    }

    const session = application.attendance.find(s => s.sessionNumber === Number(sessionNumber));
    if (session) {
      session.present = Boolean(present);
      session.date = new Date();
    } else {
      application.attendance.push({
        sessionNumber: Number(sessionNumber),
        topic: `Session ${sessionNumber}`,
        present: Boolean(present),
        date: new Date()
      });
    }

    await application.save();

    // Calculate attendance percentage
    const totalSessions = application.attendance.length;
    const attendedSessions = application.attendance.filter(s => s.present).length;
    const attendancePercentage = totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0;

    return sendSuccess(
      res,
      { application, attendancePercentage, attendedSessions, totalSessions },
      `Attendance updated for Session ${sessionNumber}: ${present ? 'Present' : 'Absent'}`
    );
  } catch (err) {
    next(err);
  }
}

async function markCandidateHired(req, res, next) {
  try {
    const { id } = req.params;
    const { placedRole, placedCompany } = req.body;

    const application = await Application.findById(id).populate('memberId').populate('programmeId');
    if (!application) {
      return sendError(res, 'Application not found', 404);
    }

    application.currentStage = 'Placed';
    application.status = 'Placed';
    application.placedAt = new Date();
    application.placedRole = placedRole || 'Product Manager';
    application.placedCompany = placedCompany || application.programmeId?.partnerName || 'Acme Corp';

    await application.save();

    return sendSuccess(
      res,
      application,
      `Candidate ${application.memberId?.name} successfully marked as Hired at ${application.placedCompany}`
    );
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getApplications,
  getApplicationById,
  inviteMember,
  registerForProgramme,
  updateStage,
  updateAttendance,
  markCandidateHired
};

