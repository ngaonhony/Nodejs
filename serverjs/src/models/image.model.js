
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Image', imageSchema);