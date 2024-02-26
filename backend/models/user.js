

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  photo: { type: String },
});

module.exports = mongoose.model('User', userSchema);
