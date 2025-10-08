const mongoose = require('mongoose');

const EstateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['available', 'sold'], default: 'available' }
});

module.exports = mongoose.model('Estate', EstateSchema);