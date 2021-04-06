const express = require('express');
const getAccessToRoute = require('../middlewares/authMiddleware');
const Review = require('../models/reviewModel');

const router = express.Router();

router.get('/:id', getAccessToRoute, async (req, res) => {
  try {
    const userReviews = await Review.find({ uid: req.jwt.claims.uid });
    res
      .status(200)
      .send(userReviews);
  } catch (error) {
    res
      .status(404)
      .send({ error: 'No reviews found!' });
  }
});

router.get('/', async (req, res) => {
  if (req.query.imdbId) {
    const allReviews = await Review.find({ imdbId: req.query.imdbId });

    res
      .status(200)
      .send(allReviews);
  } else {
    const allReviews = await Review.find();

    res
      .status(200)
      .send(allReviews);
  }
});

router.post('/', getAccessToRoute, async (req, res) => {
  const newReview = new Review({
    uid: req.jwt.claims.uid,
    imdbId: req.body.imdbId,
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
  });
  await newReview.save();
  res
    .status(201)
    .send(newReview);
});

router.put('/:id', getAccessToRoute, async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id });
  if (req.body.title) {
    review.title = req.body.title;
  }

  if (req.body.description) {
    review.description = req.body.description;
  }

  if (req.body.rating) {
    review.rating = req.body.rating;
  }

  await review.save();
  res
    .status(200)
    .send(review);
});

router.delete('/:id', getAccessToRoute, async (req, res) => {
  try {
    await Review.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .send();
  } catch (error) {
    res
      .status(404)
      .send({ error: 'Review not found!' });
  }
});

module.exports = router;
