import { useState } from 'react';

const ResultCard = ({ tvShow }) => {
  const [details, setDetails] = useState({});
  const fetchDetails = id => {
    fetch(`/omdb/${id}`)
      .then(res => res.json())
      .then(data => setDetails(data));
  };

  return (
    <div onClick={() => fetchDetails(tvShow.external_ids.imdb.id)} className="tvshow-card">
      <img src={tvShow.picture} alt="poster"/>
      <p className="tvshow-name">{ tvShow.name }</p>
      <p className="tvshow-platforms">
        {tvShow.locations.map((platform, index) => {
          if (index < tvShow.locations.length - 1) {
            return `${platform.display_name}, `;
          } return `${platform.display_name}.`;
        })}
      </p>
      {details.Genre && <p>{details.Genre}</p>}
    </div>
  );
};

export default ResultCard;
