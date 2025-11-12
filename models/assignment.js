const mongoose = require('mongoose');

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

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;