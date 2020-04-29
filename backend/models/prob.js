const mongoose = require('mongoose');

const probSchema = mongoose.Schema({
  title: {type: String, required: true},
  desc: {type: String, required: true},
  starter: {type: String, required: true},
  tester: {type: String, required: true},
  submit: String,
  tags: [{type: String}],
  likes: Number,
  hates: Number
});

module.exports = mongoose.model('Prob', probSchema);
