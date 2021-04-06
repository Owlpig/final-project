const express = require('express');
const getAccessToRoute = require('../middlewares/authMiddleware');
const UserFavourites = require('../models/favouritesModel');

const router = express.Router();

router.get('/', getAccessToRoute, async (req, res) => {
  try {
    const userFavourites = await UserFavourites.findOne({ uid: req.jwt.claims.uid });
    res
      .status(200)
      .send(userFavourites.favouriteTvSeries);
  } catch (error) {
    res
      .status(404)
      .send({ error: 'User not found!' });
  }
});

router.post('/', getAccessToRoute, async (req, res) => {
  const newFavourites = new UserFavourites({
    uid: req.jwt.claims.uid,
    favouriteTvSeries: req.body.favouriteTvSeries,
  });
  await newFavourites.save();
  res
    .status(201)
    .send(newFavourites);
});

router.put('/', getAccessToRoute, async (req, res) => {
  try {
    const favourites = await UserFavourites.findOne({ uid: req.jwt.claims.uid });
    if (req.body.addFavourite) {
      favourites.favouriteTvSeries.push(req.body.addFavourite);
    }

    if (req.body.deleteFavourite) {
      const id = req.body.deleteFavourite.imdbId;
      const updatedArray = favourites.favouriteTvSeries.filter(tvSeries => tvSeries.imdbId !== id);
      favourites.favouriteTvSeries = updatedArray;
    }

    await favourites.save();
    res
      .status(200)
      .send(favourites);
  } catch (error) {
    res
      .status(404)
      .send({ error: 'User not found!' });
  }
});

module.exports = router;
