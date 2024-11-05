const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 1000 },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true },
    area: { type: String, required: true, min: 0 },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    serviceBookingId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'ServiceBooking',
      required: true,
    },
    images: { 
      type: [String], 
      required: true,
    },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);