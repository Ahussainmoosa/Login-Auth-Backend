const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  title:{
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  }, 
  enrolledStudents:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;