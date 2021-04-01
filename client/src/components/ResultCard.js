import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ResultCard = ({ tvShow }) => {
  const [details, setDetails] = useState({});
  useEffect(() => {
    fetch(`/omdb/${tvShow.external_ids.imdb.id}`)
      .then(res => res.json())
      .then(data => setDetails(data));
  }, []);

  return (
    <Link to={`/tvShow-details/${tvShow.external_ids.imdb.id}`}>
      <div className="tvshow-card">
        <img src={tvShow.picture} alt="poster"/>
        <p className="tvshow-name">{ tvShow.name }</p>
        <p className="tvshow-platforms">
          {tvShow.locations.map((platform, index) => {
            if (index < tvShow.locations.length - 1) {
              return `${platform.display_name}, `;
            } return `${platform.display_name}.`;
          })}
        </p>
        <p>Genre: {details.Genre}</p>
        {details.Ratings && <p>IMDB Rating: {details.Ratings[0].Value}</p>}
      </div>
    </Link>
  );
};

export default ResultCard;
