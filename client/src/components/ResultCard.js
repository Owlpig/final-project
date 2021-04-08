import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ResultCard = ({ tvShow, setLoading }) => {
  const [details, setDetails] = useState({});
  const [imdbId, setImdbId] = useState();

  useEffect(async () => {
    if (tvShow.external_ids) {
      const rawData = await fetch(`/api/omdb/${tvShow.external_ids.imdb.id}`);
      const parsedData = await rawData.json();
      setDetails(parsedData);
      setImdbId(tvShow.external_ids.imdb.id);
    } else {
      const rawData = await fetch(`/api/tmdb/${tvShow.id}`);
      const parsedData = await rawData.json();
      const rawDetails = await fetch(`/api/omdb/${parsedData.imdb_id}`);
      const parsedDetails = await rawDetails.json();
      setDetails(parsedDetails);
      setImdbId(parsedData.imdb_id);
    }
  }, []);

  if (details.Poster) {
    setLoading(false);
  } else {
    return null;
  }

  return (
    <Link to={`/tvShow-details/${imdbId}`}>
      <div className="tvshow-card">
        <figure className='tvshow-poster'>
          <img src={details.Poster} alt="poster"/>
        </figure>
        <div className='tvshow-text'>
          <p className="tvshow-name">{ tvShow.name }</p>
          <p>Genre: {details.Genre}</p>
          {details.Ratings
          && details.Ratings.length > 0 && <p className="tvshow-rating">IMDB Rating: {details.Ratings[0].Value}</p>}
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;
