const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100, // Giới hạn chiều dài tên
    },
    phone: {
      type: String,
      required: true,
      maxlength: 15, // Giới hạn chiều dài số điện thoại
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5 
    },
    comment: { 
      type: String, 
      maxlength: 500 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);