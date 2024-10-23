const mongoose = require("mongoose");

const serviceBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true, 
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true, 
  },
  bookingDate: { 
    type: Date, 
    default: Date.now, 
    required: true,
  },
  bookingTime: { 
    type: String, 
    required: true,
  },
});

module.exports = mongoose.model("ServiceBooking", serviceBookingSchema);