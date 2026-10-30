const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    age: {
      type: Number
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    careerStage: {
      type: String,
      enum: [
        'Student',
        'First Job',
        'Early Career',
        'Career Growth',
        'Career Break',
        'Returner',
        'Leadership',
        'Leader',
        'Mentor',
        'Advisor'
      ],
      required: true
    },
    previousRoles: [
      {
        title: { type: String, required: true },
        company: { type: String, required: true },
        duration: { type: String },
        years: { type: Number, default: 0 },
        description: { type: String }
      }
    ],
    yearsOfExperience: {
      type: Number,
      default: 0
    },
    skills: [
      {
        type: String,
        trim: true
      }
    ],
    education: {
      type: String,
      default: ''
    },
    careerBreakMonths: {
      type: Number,
      default: 0
    },
    careerGoal: {
      type: String,
      default: ''
    },
    communities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
      }
    ],
    consent: {
      communication: {
        type: Boolean,
        default: true
      },
      programmeInvitations: {
        type: Boolean,
        default: true
      },
      partnerSharing: {
        type: Boolean,
        default: true
      },
      consentTimestamp: {
        type: Date,
        default: Date.now
      },
      consentVersion: {
        type: String,
        default: 'v1.0'
      }
    },
    documents: [
      {
        name: { type: String },
        type: { type: String },
        url: { type: String },
        issuedAt: { type: Date, default: Date.now }
      }
    ],
    avatarUrl: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
    profileCompletion: {
      type: Number,
      default: 85
    }
  },
  {
    timestamps: true
  }
);

// Calculate profile completion percentage
memberSchema.methods.calculateProfileCompletion = function () {
  let score = 0;
  if (this.name) score += 10;
  if (this.email) score += 10;
  if (this.phone) score += 10;
  if (this.city) score += 10;
  if (this.careerStage) score += 10;
  if (this.skills && this.skills.length > 0) score += 15;
  if (this.previousRoles && this.previousRoles.length > 0) score += 15;
  if (this.education) score += 10;
  if (this.careerGoal) score += 10;
  this.profileCompletion = Math.min(score, 100);
  return this.profileCompletion;
};

module.exports = mongoose.model('Member', memberSchema);

