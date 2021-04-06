import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';

const ProfilePage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [user, setUser] = useState();
  const [favourites, setFavourites] = useState();

  const getCurrentUser = () => {
    oktaAuth.getUser()
      .then(currentUser => setUser(currentUser))
      .catch(err => console.error(err));
  };

  const getFavourites = async method => {
    const rawData = await fetch('/api/mongodb/favourites/', {
      method,
      headers: { authorization: `Bearer ${authState.accessToken.accessToken}` },
    });
    if (rawData.status === 401) {
      return false;
    }
    const parsedData = rawData.json();
    setFavourites(parsedData);
    return true;
  };
  // authState.accessToken.accessToken

  useEffect(async () => {
    getCurrentUser();
    try {
      const successfull = authState.accessToken ? await getFavourites('GET') : null;
      if (!successfull) {
        throw new Error('No favourites array found');
      }
      return true;
    } catch (err) {
      const successfull = authState.accessToken ? await getFavourites('POST') : null;
      console.log(favourites);
      return successfull;
    }
  }, []);

  if (!user) {
    if (!authState.isAuthenticated) {
      return <Redirect to={{ pathname: '/login' }}/>;
    }
    if (!authState.accessToken) {
      return null;
    }
    return null;
  }

  return (
    <section>
      <h1 className='user-profile'></h1>
      <h1>User Profile</h1>
      <div>
        <label>Name: </label>
        <span>{user.name}</span>
        {favourites && favourites.map(series => <p>{series.name}</p>)}
      </div>
    </section>
  );
};
export default ProfilePage;
