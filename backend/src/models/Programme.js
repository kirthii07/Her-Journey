const mongoose = require('mongoose');

const programmeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partner'
    },
    partnerName: {
      type: String,
      default: 'HerJourney Foundation'
    },
    category: {
      type: String,
      enum: ['Returnship', 'Skilling', 'Leadership', 'Hackathon', 'Mentorship', 'Webinar'],
      default: 'Returnship'
    },
    targetLifeStage: [
      {
        type: String
      }
    ],
    requiredSkills: [
      {
        type: String
      }
    ],
    careerBreakRequirementMonths: {
      type: Number,
      default: 0
    },
    eligibilityRules: {
      minCareerBreakMonths: {
        type: Number,
        default: 0
      },
      requiredSkills: [
        {
          type: String
        }
      ],
      allowedLifeStages: [
        {
          type: String
        }
      ]
    },
    stages: {
      type: [String],
      default: ['Applied', 'Screening', 'Interview', 'Sessions', 'Completed', 'Placed']
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Draft', 'Active', 'Completed', 'Archived'],
      default: 'Active'
    },
    bannerImage: {
      type: String,
      default: ''
    },
    seats: {
      type: Number,
      default: 50
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Programme', programmeSchema);

