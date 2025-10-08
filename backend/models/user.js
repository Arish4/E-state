const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' }
});

// Hash password before save
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);