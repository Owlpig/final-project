import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Details = ({ country }) => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [platforms, setPlatforms] = useState({});
  useEffect(() => {
    fetch(`/api/omdb/${id}`)
      .then(res => res.json())
      .then(data => setDetails(data));

    fetch(`/api/utelly/${id}`, { method: 'POST', body: JSON.stringify({ country }) })
      .then(res => res.json())
      .then(data => setPlatforms(data.collection.locations));
  }, []);

  return (
    <div className='details-container'>
      <img className="details-image"src={details.Poster}/>
      <section className='details-text'>
        <h2 className="details-title">{details.Title}</h2>
        <p>Year: {details.Year}</p>
        {details.Ratings && <p>IMDB Rating: {details.Ratings[0].Value}</p>}
        <p>Genre: {details.Genre}</p>
        <p>Number of Seasons: {details.totalSeasons}</p>
        <p className="tvshow-platforms">
          Available on: {platforms[0] && platforms.map((platform, index) => {
          if (index < platforms.length - 1) {
            return `${platform.display_name}, `;
          } return `${platform.display_name}.`;
        })}
        </p>
      </section>
      <p className="details-plot">{details.Plot}</p>
    </div>
  );
};

export default Details;
