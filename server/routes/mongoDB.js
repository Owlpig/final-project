const express = require('express');
const getAccessToRoute = require('../middlewares/authMiddleware');
const UserFavourites = require('../models/favouritesModel');

const router = express.Router();

// router.get('/favourites', getAccessToRoute, async (req, res) => {
//   const allFavourites = await UserFavourites.find();

//   res
//     .status(200)
//     .send(allFavourites);
// });

router.get('/favourites', getAccessToRoute, async (req, res) => {
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

router.post('/favourites', async (req, res) => {
  const newFavourites = new UserFavourites({
    uid: req.jwt.claims.uid,
    favouriteTvSeries: req.body.favouriteTvSeries,
  });
  await newFavourites.save();
  res
    .status(201)
    .send(newFavourites);
});

router.put('/favourites', getAccessToRoute, async (req, res) => {
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

// router.delete('/favourites/:id', getAccessToRoute, async (req, res) => {
//   try {
//     await UserFavourites.deleteOne({ uid: req.params.id });
//     res
//       .status(204)
//       .send();
//   } catch (error) {
//     res
//       .status(404)
//       .send({ error: 'User not found!' });
//   }
// });

module.exports = router;
