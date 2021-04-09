const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const app = express();
const port = 5000;
const utellyRouter = require('./routes/utelly');
const omdbRouter = require('./routes/omdb');
const tmdbRouter = require('./routes/tmdb');
const favouritesRouter = require('./routes/favourites');
const reviewsRouter = require('./routes/reviews');
const usersRouter = require('./routes/users');

app.use(express.json());
app.use('/api/utelly', utellyRouter);
app.use('/api/omdb', omdbRouter);
app.use('/api/tmdb', tmdbRouter);
app.use('/api/mongodb/favourites', favouritesRouter);
app.use('/api/mongodb/reviews', reviewsRouter);
app.use('/api/users', usersRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
