const mongoose = require('mongoose');
// const uniqueId = require('generate-unique-id');
const uniqueId = require('mongoose-sequence');

const schema = new mongoose.Schema({
  _id: {
    type: Number,
    default: function () {
      return uniqueId({
        length: 10,
        useLetters: false,
      });
    },
  },
  fullName: { type: String, required: true },
  age: { type: Number, min: 0 },
  level: { type: String, enum: ['PreKG', 'KG1', 'KG2'] },
  address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true },
  },
});

module.exports = mongoose.model('children', schema);
