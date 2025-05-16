const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
  title: String,
  description: String,
  amount: String,
  deadline: String,
  applicationLink: String,
  source: String
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
