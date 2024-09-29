
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    role: { type: String, enum: ['tenant', 'landlord','admin'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);