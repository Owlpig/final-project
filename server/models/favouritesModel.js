const mongoose = require('mongoose');

const userFavouritesSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    favouriteTvSeries: [{
      imdbId: String,
      name: String,
    }],
  },
);

const UserFavourites = mongoose.model('UserFavourites', userFavouritesSchema);

module.exports = UserFavourites;
