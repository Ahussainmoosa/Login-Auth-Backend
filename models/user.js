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
    enum:['school', 'student'],
    default: 'student',
  },
});
  

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
