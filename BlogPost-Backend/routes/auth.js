const express = require('express');
const { createToken } = require('../middleware/auth');

const router = express.Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = createToken({
    username: ADMIN_USERNAME,
    role: 'admin'
  });

  res.json({
    token,
    user: {
      username: ADMIN_USERNAME,
      role: 'admin'
    }
  });
});

module.exports = router;
