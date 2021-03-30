const express = require('express');
require('dotenv').config();

const app = express();
const port = 5000;
const utellyRouter = require('./routes/utelly');
const omdbRouter = require('./routes/omdb');

app.use(express.json());
app.use('/utelly', utellyRouter);
app.use('/omdb', omdbRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
