const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100, 
    },
    phone: {
      type: String,
      required: true,
      maxlength: 15, 
    },
    comment: { 
      type: String, 
      maxlength: 500 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);