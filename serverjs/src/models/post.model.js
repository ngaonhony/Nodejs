const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, maxlength: 100 },
    description: { type: String, maxlength: 1000 },
    price: { type: Number,  min: 0 },
    location: { type: String},
    area: { type: Number, min: 0 },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    serviceId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Service',
    },
    paymentId: { type: String, unique: true },
    images: { 
      type: Array,
      default:[] 
    },
    expiredAt: {
      type: Date,
    },
    status: {  
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active',
    },
  },
  { timestamps: true }
);
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Post", postSchema);