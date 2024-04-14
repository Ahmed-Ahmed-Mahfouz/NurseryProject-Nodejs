const mongoose = require('mongoose');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullname: { type: String, required: true },
  email: { type: String, required: true, match: emailRegex, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
});

schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('teachers', schema);
