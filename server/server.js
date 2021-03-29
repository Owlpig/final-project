const express = require('express');
require('dotenv').config();

const app = express();
const port = 5000;
const searchRouter = require('./routes/search');

app.use(express.json());
app.use('/search', searchRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
