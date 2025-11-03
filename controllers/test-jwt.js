// controllers/test-jwt.js

const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/sign-token', (req, res) => {
  const user = {
    _id: 1,
    username: 'test',
    password: 'test',
  };

  const token = jwt.sign(user, process.env.JWT_SECRET);

  res.json({ token });
});

router.post('/verify-token', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'invalid token' });
  }
});

module.exports = router;
