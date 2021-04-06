import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect, Link } from 'react-router-dom';

const ProfilePage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [user, setUser] = useState();
  const [favourites, setFavourites] = useState();
  const [error, setError] = useState('');

  const getCurrentUser = () => {
    oktaAuth.getUser()
      .then(currentUser => setUser(currentUser))
      .catch(err => setError(err.message));
  };

  const getFavourites = async method => {
    const rawData = await fetch('/api/mongodb/favourites/', {
      method,
      headers: { authorization: `Bearer ${authState.accessToken.accessToken}` },
    });
    if (rawData.status === 404) {
      return false;
    }
    const parsedData = await rawData.json();
    setFavourites(parsedData);
    return true;
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  useEffect(async () => {
    try {
      const successfull = authState.accessToken ? await getFavourites('GET') : null;
      if (!successfull) {
        throw new Error('No favourites array found');
      }
      return true;
    } catch (err) {
      const successfull = authState.accessToken ? await getFavourites('POST') : null;
      return successfull;
    }
  }, [user]);

  if (!user) {
    if (!authState.accessToken) {
      return <p>Loading...</p>;
    }
    if (!authState.isAuthenticated) {
      return <Redirect to={{ pathname: '/login' }}/>;
    }
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <nav className='links'>
        <Link to='/login'><button className="login-link" onClick={() => { oktaAuth.signOut(); }}>Logout</button></Link>
      </nav>
      <h1 className='user-profile'></h1>
      <h1>User Profile</h1>
      <div>
        <label>Welcome </label>
        <span>{user.name}!</span>
        <h3>Your favourite series:</h3>
        {favourites && favourites.map(series => <p key={series.imdbId}>{series.name}</p>)}
      </div>
    </section>
  );
};
export default ProfilePage;
