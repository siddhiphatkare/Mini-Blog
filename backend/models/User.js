const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // only for local signup
  provider: { type: String, default: 'local' }, // 'local', 'google', 'facebook'
});

module.exports = mongoose.model('User', userSchema);
