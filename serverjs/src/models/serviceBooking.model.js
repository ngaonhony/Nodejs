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
  bookingDate: { 
    type: Date, 
    default: Date.now, 
    required: true,
  },
  bookingTime: { 
    type: Number, 
    required: true,
  },
  expiryDate: {
    type: Date, 
    required: true, 
  },
});

module.exports = mongoose.model("ServiceBooking", serviceBookingSchema);