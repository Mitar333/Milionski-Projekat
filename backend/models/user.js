const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true,match:[/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] },
  passwordHash: { type: String, required: true },
  phone:    { type: String },
  role:     { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);