const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await User.find();

  res
    .send(users)
    .status(201)
    .end();
});

module.exports = router;
