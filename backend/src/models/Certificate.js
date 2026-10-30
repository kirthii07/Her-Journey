const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: true
    },
    certificateNumber: {
      type: String,
      required: true,
      unique: true
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Issued', 'Revoked'],
      default: 'Issued'
    },
    skillsEndorsed: [
      {
        type: String
      }
    ],
    issuedBy: {
      type: String,
      default: 'HerJourney Programme Committee'
    },
    partnerName: {
      type: String,
      default: 'Acme Corp'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Certificate', certificateSchema);

