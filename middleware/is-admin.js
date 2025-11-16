const User = require('../models/user');

const adminPerm = (req, res, next) => {
  try{
    if (!req.user || req.user.role !== "school") {
      return res.status(403).json("Access denied");
    }
  next();
  } catch (err){
    console.log(err);
    res.status(500).json({err: 'Server error'});
  }
};

module.exports = adminPerm;
