const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log(authHeader)
      req.user = null; 
      return next();
    }
    const token = authHeader.split(' ')[1];
    console.log('token', token)

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload._id,
      role: payload.role,
      username: payload.username,
      };

    next();
  } catch (err) {
    console.log('Token parse failed', err)
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
