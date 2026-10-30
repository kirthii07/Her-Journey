const Certificate = require('../models/Certificate');
const Application = require('../models/Application');
const Programme = require('../models/Programme');
const Member = require('../models/Member');
const { sendSuccess, sendError } = require('../utils/response');

async function issueCertificate(req, res, next) {
  try {
    const { memberId, programmeId, skillsEndorsed } = req.body;

    if (!memberId || !programmeId) {
      return sendError(res, 'Member ID and Programme ID are required', 400);
    }

    const member = await Member.findById(memberId);
    if (!member) {
      return sendError(res, 'Member not found', 404);
    }

    const programme = await Programme.findById(programmeId);
    if (!programme) {
      return sendError(res, 'Programme not found', 404);
    }

    // Check application status
    const application = await Application.findOne({ memberId, programmeId });
    if (!application) {
      return sendError(res, 'No application found for this member and programme', 404);
    }

    // Generate unique verifiable certificate number
    const certNum = `HJ-${programme.category.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`;

    // Check if certificate already exists
    let certificate = await Certificate.findOne({ memberId, programmeId });
    if (certificate) {
      certificate.status = 'Issued';
      certificate.issueDate = new Date();
      certificate.skillsEndorsed = skillsEndorsed || programme.requiredSkills;
      await certificate.save();
    } else {
      certificate = await Certificate.create({
        memberId,
        programmeId,
        title: `${programme.name} Completion Certificate`,
        certificateNumber: certNum,
        issueDate: new Date(),
        status: 'Issued',
        skillsEndorsed: skillsEndorsed || programme.requiredSkills || ['Product Management', 'Analytics'],
        partnerName: programme.partnerName || 'Acme Corp',
        issuedBy: 'HerJourney Certification Board'
      });
    }

    // Update application stage if not already completed
    if (application.currentStage !== 'Completed' && application.currentStage !== 'Placed') {
      application.currentStage = 'Completed';
      application.status = 'Completed';
      application.completedAt = new Date();
      await application.save();
    }

    return sendSuccess(res, certificate, `Certificate successfully issued for ${member.name}`);
  } catch (err) {
    next(err);
  }
}

async function getMemberCertificates(req, res, next) {
  try {
    const { memberId } = req.params;
    const certificates = await Certificate.find({ memberId, status: 'Issued' })
      .populate('programmeId')
      .sort({ issueDate: -1 });

    return sendSuccess(res, certificates, 'Certificates retrieved');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  issueCertificate,
  getMemberCertificates
};

