// const fetch = require('node-fetch');
const express = require('express');
const mockData = require('../db/mockData');

const router = express.Router();

// const fetchResult = async (searchQuery, country) => {
//   try {
//     const rawData = await fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${searchQuery}&country=${country}`, {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': process.env.UTELLY_API_KEY,
//         'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
//       },
//     });
//     const parsedData = rawData.json();
//     return parsedData;
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// };

const fetchResult = async () => {
  const parsedData = mockData;
  return parsedData;
};

router.post('/', async (req, res) => {
  console.log(req.body);
  const result = await fetchResult(req.body.searchQuery, req.body.country);
  res
    .status(200)
    .send(result);
});

module.exports = router;
