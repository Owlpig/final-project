const fetch = require('node-fetch');
const express = require('express');

const router = express.Router();

const fetchResult = async input => {
  try {
    const rawData = await fetch(`https://api.themoviedb.org/3/tv/${input}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`);
    const parsedData = rawData.json();
    return parsedData;
  } catch (err) {
    console.error(err);
    return err;
  }
};

router.get('/:id', async (req, res) => {
  const result = await fetchResult(`${req.params.id}/external_ids`);
  res
    .status(200)
    .send(result);
});

router.get('/', async (req, res) => {
  const result = await fetchResult('popular');
  res
    .status(200)
    .send(result);
});

module.exports = router;
