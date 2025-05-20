const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type : String, unique: true },
  location: String,
  gpa: String,
  courseOfStudy: String,
  incomeStatus: String,
  specialCategory: String,
  isProfileComplete: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
