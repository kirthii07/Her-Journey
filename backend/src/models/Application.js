const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
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
    currentStage: {
      type: String,
      default: 'Applied'
    },
    status: {
      type: String,
      enum: ['Invited', 'Registered', 'In Progress', 'Completed', 'Placed', 'Rejected', 'Withdrawn'],
      default: 'Invited'
    },
    invitedAt: {
      type: Date,
      default: Date.now
    },
    registeredAt: {
      type: Date
    },
    screeningNotes: {
      type: String,
      default: ''
    },
    interviewFeedback: {
      type: String,
      default: ''
    },
    attendance: [
      {
        sessionNumber: { type: Number, required: true },
        topic: { type: String, required: true },
        date: { type: Date, default: Date.now },
        present: { type: Boolean, default: false }
      }
    ],
    completedAt: {
      type: Date
    },
    placedAt: {
      type: Date
    },
    placedRole: {
      type: String,
      default: ''
    },
    placedCompany: {
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

// Compound index to ensure one application per member per programme
applicationSchema.index({ memberId: 1, programmeId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);

