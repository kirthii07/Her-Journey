const Member = require('../models/Member');
const ReviewQueue = require('../models/ReviewQueue');
const { sendSuccess } = require('../utils/response');
const { normalizePhone, normalizeEmail } = require('../services/duplicateDetectionService');

// Demo batch simulating 1,250 hackathon registrations with known and new identities
const DEMO_BATCH = [
  { name: 'Priya Sharma', phone: '+91 98765 43210', email: 'priya@demo.herjourney.app', city: 'Bengaluru', skills: ['Product Management', 'Python'] },
  { name: 'Ananya Krishnan', phone: '+91 98765 43211', email: 'ananya@demo.herjourney.app', city: 'Coimbatore', skills: ['Python', 'JavaScript'] },
  { name: 'Priya S.', phone: '+91 98765 43210', email: 'priya.alt@gmail.com', city: 'Bengaluru', skills: ['Product Analytics'] },
  { name: 'Deepa Natarajan', phone: '+91 94440 12345', email: 'deepa.n@innovate.org', city: 'Madurai', skills: ['Data Engineering', 'SQL'] },
  { name: 'Meena Kulkarni', phone: '+91 98765 43212', email: 'meena@demo.herjourney.app', city: 'Pune', skills: ['Java', 'SQL'] },
  { name: 'Ritu Varma', phone: '+91 98111 22334', email: 'ritu.v@outlook.com', city: 'Delhi', skills: ['Frontend', 'React'] }
];

async function previewReconciliation(req, res, next) {
  try {
    const rawRows = req.body.rows && req.body.rows.length > 0 ? req.body.rows : DEMO_BATCH;

    const results = [];
    let existingMatchesCount = 0;
    let newMembersCount = 0;
    let reviewRequiredCount = 0;

    for (const row of rawRows) {
      const normPhone = normalizePhone(row.phone);
      const normEmail = normalizeEmail(row.email);

      // Check exact phone match
      let matchedByPhone = null;
      if (normPhone) {
        matchedByPhone = await Member.findOne({ phone: { $regex: normPhone + '$' } });
      }

      // Check exact email match
      let matchedByEmail = null;
      if (normEmail) {
        matchedByEmail = await Member.findOne({ email: normEmail });
      }

      if (matchedByPhone && matchedByEmail && matchedByPhone._id.toString() === matchedByEmail._id.toString()) {
        existingMatchesCount++;
        results.push({
          row,
          classification: 'MATCHED_EXISTING',
          badge: 'Existing Match ✓',
          color: 'green',
          matchedMember: {
            id: matchedByPhone._id,
            name: matchedByPhone.name,
            email: matchedByPhone.email,
            phone: matchedByPhone.phone
          },
          explanation: `Exact match found on phone (${row.phone}) and email (${row.email}). Reuses existing profile.`
        });
      } else if (matchedByPhone || matchedByEmail) {
        // One matches but the other differs or is ambiguous
        const candidate = matchedByPhone || matchedByEmail;
        reviewRequiredCount++;
        results.push({
          row,
          classification: 'REVIEW_REQUIRED',
          badge: 'Possible Match — Review ⚠',
          color: 'amber',
          matchedMember: {
            id: candidate._id,
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone
          },
          explanation: `Ambiguous match: Phone/Email partially matched ${candidate.name}. Held in review queue to prevent silent corruption.`
        });
      } else {
        // Brand new candidate
        newMembersCount++;
        results.push({
          row,
          classification: 'NEW_MEMBER',
          badge: 'New Member ✓',
          color: 'blue',
          matchedMember: null,
          explanation: 'No matching identity found in HerJourney ecosystem. Safe to create fresh profile.'
        });
      }
    }

    return sendSuccess(res, {
      totalProcessed: rawRows.length,
      simulatedTotalBatchSize: 1250,
      summary: {
        existingMatches: existingMatchesCount,
        newMembers: newMembersCount,
        reviewRequired: reviewRequiredCount
      },
      previewItems: results
    }, 'Reconciliation preview generated');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  previewReconciliation
};

