import { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import Reviews from './Reviews';

const Details = ({ country }) => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [platforms, setPlatforms] = useState({});
  const [addedFavourite, setAddedFavourite] = useState();
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();

  useEffect(() => {
    fetch(`/api/omdb/${id}`)
      .then(res => res.json())
      .then(data => setDetails(data));

    fetch(`/api/utelly/${id}`, { method: 'POST', body: JSON.stringify({ country }) })
      .then(res => res.json())
      .then(data => setPlatforms(data.collection.locations));
  }, []);
  useEffect(() => {
    const success = authState.accessToken
      ? fetch('/api/mongodb/favourites/', { method: 'GET', headers: { authorization: `Bearer ${authState.accessToken.accessToken}` } })
        .then(res => res.json())
        .then(data => {
          const match = data.find(series => series.imdbId === id);
          if (match) {
            setAddedFavourite(true);
          } else {
            setAddedFavourite(false);
          }
        })
        .catch(err => err)
      : null;
    return success;
  }, [authState]);

  const handleFavourites = input => {
    fetch('/api/mongodb/favourites', {
      method: 'PUT',
      body: JSON.stringify({
        [input]: {
          imdbId: id,
          name: details.Title,
        },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${authState.accessToken.accessToken}`,
      },
    });
    if (input === 'addFavourite') {
      setAddedFavourite(true);
    } else {
      setAddedFavourite(false);
    }
  };

  const buttonLogin = authState.isAuthenticated
    ? <button className="login-link" onClick={() => { oktaAuth.signOut(); }}>Logout</button>
    : <button className="login-link" onClick={() => { history.push('/login'); }}>Login</button>;

  const buttonFavourite = addedFavourite
    ? <button onClick={() => handleFavourites('deleteFavourite')}>Remove favourite</button>
    : <button onClick={() => handleFavourites('addFavourite')}>Add to favourites</button>;

  return (
    <>
      <nav className="links">
        {authState.isAuthenticated && <Link to='/profile'><button className="protected-link">Profile</button></Link>}
        <Link to="/login">{buttonLogin}</Link>
        {!authState.isAuthenticated && <Link to="/register"><button className="register-link">Register</button></Link>}
      </nav>
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
          {authState.isAuthenticated && buttonFavourite}
        </section>
        <p className="details-plot">{details.Plot}</p>
      </div>
      <Reviews mediaTitle={details.Title} id={id}/>
    </>
  );
};

export default Details;
