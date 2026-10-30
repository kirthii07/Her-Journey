const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    industry: {
      type: String,
      default: 'Technology'
    },
    contactEmail: {
      type: String,
      lowercase: true,
      trim: true
    },
    logo: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    programmes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Programme'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Partner', partnerSchema);

