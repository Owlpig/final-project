const Details = ({ details }) => (
    <div>
      <p>Genre: {details.Genre}</p>
      <p>IMDB Rating: {details.Ratings[0].Value}</p>
      <p>Number of Seasons: {details.totalSeasons}</p>
    </div>
);

export default Details;
