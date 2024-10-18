const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true, 
    default: '', 
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], // Limits the status to these values
    required: true,
    default: 'active',},
});

module.exports = mongoose.model("Category", categorySchema);
