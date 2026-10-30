const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: 'General'
    },
    icon: {
      type: String,
      default: 'Users'
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
      }
    ],
    memberCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Community', communitySchema);

