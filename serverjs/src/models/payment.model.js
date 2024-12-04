const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
        type: String,
        required: true
      },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    bankCode: {
        type: String,
        required: false,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hàm để cập nhật thời gian cập nhật
paymentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
