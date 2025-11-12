const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  title: String,
  description: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'User',
  },  
  enrolledStudents:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;