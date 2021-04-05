import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';

const ProfilePage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [user, setUser] = useState();

  const getCurrentUser = () => {
    oktaAuth.getUser()
      .then(currentUser => setUser(currentUser))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (!user) {
    if (!authState.isAuthenticated) {
      return <Redirect to={{ pathname: '/login' }}/>;
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
        </div>
    </section>
  );
};
export default ProfilePage;
