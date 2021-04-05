const express = require('express');
const getAccessToRoute = require('../middlewares/authMiddleware');
const User = require('../models/userModel');

const router = express.Router();

router.get('/users', getAccessToRoute, async (req, res) => {
  const users = await User.find();

  res
    .status(200)
    .send(users);
});

router.get('/users/:id', getAccessToRoute, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res
      .status(200)
      .send(user);
  } catch (error) {
    res
      .status(404)
      .send({ error: 'User not found!' });
  }
});

router.post('/users', async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  await newUser.save();
  res
    .status(201)
    .send(newUser);
});

router.put('/users/:id', getAccessToRoute, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }

    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();
    res
      .status(200)
      .send(user);
  } catch (error) {
    res
      .status(404)
      .send({ error: 'User not found!' });
  }
});

router.delete('/users/:id', getAccessToRoute, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .send();
  } catch (error) {
    res
      .status(404)
      .send({ error: 'User not found!' });
  }
});

module.exports = router;
