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
  name: { type: String },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'teachers' },
  children: [{ type: Number, ref: 'children' }],
});

module.exports = mongoose.model('classes', schema);
