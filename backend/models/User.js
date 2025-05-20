const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Make sure you have this field
  gpa: { 
    type: Number, 
    min: 0, 
    max: 4,
    validate: {
      validator: Number.isFinite,
      message: 'GPA must be a number'
    }
  },
  location: String,
  course: String,
  isProfileComplete: { type: Boolean, default: false },
  // ... any other fields you need ...
});


module.exports = mongoose.model('User', userSchema);
