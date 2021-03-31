const express = require('express');
const { runDB } = require('../modules/mongo');

const router = express.Router();

router.post('/register', async (req, res) => {
  const collection = await runDB();
  const newUser = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  const user = await collection.insertOne(newUser);

  res
    .json(user)
    .status(201)
    .end();
});

module.exports = router;
