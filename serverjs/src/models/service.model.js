const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  price_per_day: { type: Number, required: true },
  price_per_week: { type: Number, required: true },
  price_per_month: { type: Number, required: true },
  pushPrice: { type: Number, required: true },
  advantages: { type:  Boolean, required: true },
  title_color: { type: String, required: true },
  auto_approval: { type: Boolean, default: false },
  prominent_badge: { type: Boolean, default: false },
},);

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;