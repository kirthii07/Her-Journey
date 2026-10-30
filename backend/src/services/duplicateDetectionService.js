const Member = require('../models/Member');
const ReviewQueue = require('../models/ReviewQueue');

/**
 * Normalizes phone numbers for reliable comparison across formats:
 * e.g. "+91 98765 43210", "+919876543210", "9876543210", "09876543210" -> last 10 digits
 */
function normalizePhone(phone) {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length >= 10) {
    return digits.slice(-10);
  }
  return digits;
}

/**
 * Normalizes email address
 */
function normalizeEmail(email) {
  if (!email) return '';
  return email.trim().toLowerCase();
}

/**
 * Detects missing profile fields for existing members
 */
function getMissingFields(member) {
  const missing = [];
  if (!member.education) missing.push('education');
  if (!member.careerGoal) missing.push('careerGoal');
  if (!member.previousRoles || member.previousRoles.length === 0) missing.push('previousRoles');
  if (!member.skills || member.skills.length === 0) missing.push('skills');
  if (!member.bio) missing.push('bio');
  return missing;
}

/**
 * Performs duplicate detection check when a woman signs up, registers, or enters phone/email.
 * Rules:
 * 1. Exact Match: Same normalized phone OR same normalized email -> Return existing profile
 * 2. Ambiguous/Possible Match: Same name + city OR same phone but differing name -> Put into Review Queue
 * 3. No match: Can safely create new member
 */
async function checkDuplicateOrReuse({ phone, email, name, city, skills, additionalData = {} }) {
  const normPhone = normalizePhone(phone);
  const normEmail = normalizeEmail(email);

  // 1. Check exact phone match
  if (normPhone) {
    const existingByPhone = await Member.findOne({
      phone: { $regex: normPhone + '$' }
    });
    if (existingByPhone) {
      // Check if email matches or is missing
      const existingEmailNorm = normalizeEmail(existingByPhone.email);
      if (!normEmail || existingEmailNorm === normEmail) {
        // EXACT MATCH!
        const missingFields = getMissingFields(existingByPhone);
        return {
          type: 'EXACT_MATCH',
          action: 'REUSE_EXISTING',
          member: existingByPhone,
          message: `Welcome back, ${existingByPhone.name}. We found your existing profile and reused the information we already have.`,
          reusedFields: ['name', 'careerStage', 'skills', 'city', 'previousRoles', 'careerBreakMonths'],
          missingFields
        };
      } else {
        // Same phone, differing email! This is ambiguous. Do not silently merge.
        const review = await ReviewQueue.create({
          incomingData: { name, email, phone, city, skills },
          matchedMemberId: existingByPhone._id,
          confidenceScore: 78,
          matchReasons: [
            `Exact phone match (${phone}) but differing email (incoming: ${email}, existing: ${existingByPhone.email})`
          ],
          status: 'Pending'
        });

        return {
          type: 'POSSIBLE_MATCH',
          action: 'REVIEW_QUEUE',
          reviewQueueId: review._id,
          potentialMember: existingByPhone,
          message: 'Possible existing member found with this phone number. To protect privacy and prevent data corruption, this requires administrator review.'
        };
      }
    }
  }

  // 2. Check exact email match
  if (normEmail) {
    const existingByEmail = await Member.findOne({
      email: normEmail
    });
    if (existingByEmail) {
      const missingFields = getMissingFields(existingByEmail);
      return {
        type: 'EXACT_MATCH',
        action: 'REUSE_EXISTING',
        member: existingByEmail,
        message: `Welcome back, ${existingByEmail.name}. We found your existing profile and reused the information we already have.`,
        reusedFields: ['name', 'careerStage', 'skills', 'city', 'previousRoles', 'careerBreakMonths'],
        missingFields
      };
    }
  }

  // 3. Check possible ambiguous match: Same Full Name AND Same City
  if (name && city) {
    const fuzzyNameMatches = await Member.find({
      name: new RegExp(`^${name.trim()}$`, 'i'),
      city: new RegExp(`^${city.trim()}$`, 'i')
    });

    if (fuzzyNameMatches.length > 0) {
      const matched = fuzzyNameMatches[0];
      const review = await ReviewQueue.create({
        incomingData: { name, email, phone, city, skills },
        matchedMemberId: matched._id,
        confidenceScore: 65,
        matchReasons: [
          `Identical name "${name}" and city "${city}", but unverified phone/email.`
        ],
        status: 'Pending'
      });

      return {
        type: 'POSSIBLE_MATCH',
        action: 'REVIEW_QUEUE',
        reviewQueueId: review._id,
        potentialMember: matched,
        message: 'Possible existing member found. Sent to review queue for verification before merging.'
      };
    }
  }

  // 4. No match found - Brand new member
  return {
    type: 'NO_MATCH',
    action: 'CREATE_NEW',
    message: 'No existing profile found. A new HerJourney identity will be created.'
  };
}

module.exports = {
  checkDuplicateOrReuse,
  normalizePhone,
  normalizeEmail
};

