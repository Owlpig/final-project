const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    imdbId: {
      type: String,
      required: true,
    },
    mediaTitle: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
