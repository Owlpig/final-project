import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  useEffect(() => {
    fetch(`/omdb/${id}`)
      .then(res => res.json())
      .then(data => setDetails(data));
  }, []);

  return (
    <div>
      <p>Number of Seasons: {details.totalSeasons}</p>
    </div>
  );
};

export default Details;
