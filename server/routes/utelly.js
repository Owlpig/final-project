const fetch = require('node-fetch');
const express = require('express');

const router = express.Router();

const fetchResultByQuery = async (searchQuery, country) => {
  try {
    const rawData = await fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${searchQuery}&country=${country}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.UTELLY_API_KEY,
        'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
      },
    });
    const parsedData = rawData.json();
    return parsedData;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const fetchResultById = async (id, country) => {
  try {
    const rawData = await fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=${id}&&source=imdb&country=${country}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.UTELLY_API_KEY,
        'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
      },
    });
    const parsedData = rawData.json();
    return parsedData;
  } catch (err) {
    console.error(err);
    return err;
  }
};

router.post('/:id', async (req, res) => {
  const result = await fetchResultById(req.params.id, req.body.country);
  res
    .status(200)
    .send(result);
});

router.post('/', async (req, res) => {
  const result = await fetchResultByQuery(req.body.searchQuery, req.body.country);
  res
    .status(200)
    .send(result);
});

module.exports = router;
