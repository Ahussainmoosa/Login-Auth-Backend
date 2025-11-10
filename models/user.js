const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    require: true,
  },
  role:{
    type:String ,
    required: true ,
    enum:['school','teacher', 'student'],
    default: 'student',
  },
});

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

const assignmentSchema = mongoose.Schema({
  title: String,
  content: String,
  dueDate: Date,
  course:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'},
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
});
  

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);


module.exports = {User, Course, Assignment};
