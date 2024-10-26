const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  description: {
    type: String,
    trim: true, 
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], 
    default: 'active', 
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model("Category", categorySchema);