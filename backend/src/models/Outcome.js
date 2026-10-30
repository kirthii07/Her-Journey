const mongoose = require('mongoose');

const outcomeSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    },
    programmeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Programme',
      required: true
    },
    type: {
      type: String,
      default: '3-Month Employment Check-in'
    },
    response: {
      type: String,
      enum: ['Yes', 'No', 'Changed role', 'Prefer not to say'],
      required: true
    },
    currentRole: {
      type: String,
      default: 'Product Manager'
    },
    employer: {
      type: String,
      default: 'Acme Corp'
    },
    retentionMonths: {
      type: Number,
      default: 3
    },
    reportedAt: {
      type: Date,
      default: Date.now
    },
    verified: {
      type: Boolean,
      default: false
    },
    verifiedAt: {
      type: Date
    },
    verifiedBy: {
      type: String,
      default: ''
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Outcome', outcomeSchema);

