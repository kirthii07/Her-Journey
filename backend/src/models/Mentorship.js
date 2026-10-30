const mongoose = require('mongoose');

const mentorshipSchema = new mongoose.Schema(
  {
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    },
    menteeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    },
    focusArea: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Pending'],
      default: 'Active'
    },
    notes: {
      type: String,
      default: ''
    },
    meetingCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Mentorship', mentorshipSchema);

