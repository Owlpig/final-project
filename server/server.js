const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const app = express();
const port = 5000;
const utellyRouter = require('./routes/utelly');
const omdbRouter = require('./routes/omdb');
const mongoDBRouter = require('./routes/mongoDB');
const usersRouter = require('./routes/users');

app.use(express.json());
app.use('/api/utelly', utellyRouter);
app.use('/api/omdb', omdbRouter);
app.use('/api/mongodb', mongoDBRouter);
app.use('/api/users', usersRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
