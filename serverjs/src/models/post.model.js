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
    serviceId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Service',
    },
    images: { 
      type: Array,
      default:[] 
    },
    expiredAt: {
      type: Date,
    },
    duration: { 
      type: Number,
      min: 1 
    }
  },
  { timestamps: true }
);
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Post", postSchema);