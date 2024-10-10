const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  imageUrl: { type: String, required: [true, "Image phải có URL"] },
});

module.exports = mongoose.model("Image", imageSchema);
