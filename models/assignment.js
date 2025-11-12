const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
  answer:{
    type: String,
    required: true,
  },
  submissionDate: Date,
});

const assignmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  }, 
  content:{
    type: String,
  }, 
  dueDate: Date,
  course:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
    },

    Submission: [submissionSchema],
    
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;