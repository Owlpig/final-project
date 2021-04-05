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
  // authState.accessToken.accessToken
  useEffect(() => {
    getCurrentUser();
    try {
      fetch('/api/mongodb/favourites/', {
        method: 'GET',
        headers: { authorization: `Bearer ${authState.accessToken.accessToken}` },
      })
        .then(res => res.json)
        .then(data => setFavourites(data.favouriteTvSeries));
    } catch (err) {
      fetch('/api/mongodb/favourites/', {
        method: 'POST',
        headers: { authorization: `Bearer ${authState.accessToken.accessToken}` },
      })
        .then(res => res.json)
        .then(data => setFavourites(data.favouriteTvSeries))
        .catch(error => error);
    }
  }, []);

  if (!user) {
    if (!authState.isAuthenticated) {
      return <Redirect to={{ pathname: '/login' }}/>;
    }
    return null;
  }

  console.log(user);

  return (
    <section>
      <h1 className='user-profile'></h1>
      <h1>User Profile</h1>
        <div>
          <label>Name: </label>
          <span>{user.name}</span>
        </div>
    </section>
  );
};
export default ProfilePage;
