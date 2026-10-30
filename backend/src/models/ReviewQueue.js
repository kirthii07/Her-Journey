const mongoose = require('mongoose');

const reviewQueueSchema = new mongoose.Schema(
  {
    incomingData: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String },
      skills: [{ type: String }],
      source: { type: String, default: 'Registration Form' }
    },
    matchedMemberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    },
    confidenceScore: {
      type: Number,
      required: true // e.g. 75 (%)
    },
    matchReasons: [
      {
        type: String
      }
    ],
    status: {
      type: String,
      enum: ['Pending', 'Resolved_Merged', 'Resolved_Created_New', 'Dismissed'],
      default: 'Pending'
    },
    resolvedAt: {
      type: Date
    },
    resolvedBy: {
      type: String
    },
    resolutionNotes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ReviewQueue', reviewQueueSchema);

