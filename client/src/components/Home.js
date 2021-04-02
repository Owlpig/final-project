import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

import SearchField from './SearchField';
import Results from './Results';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();

  const [searchResult, setSearchResult] = useState([]);

  const fetchResults = (searchQuery, country) => {
    fetch('/api/utelly', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchQuery, country }),
    })
      .then(res => res.json())
      .then(data => setSearchResult(data.results));
  };

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  const button = authState.isAuthenticated
    ? <button className="login-link" onClick={() => { oktaAuth.signOut(); }}>Logout</button>
    : <button className="login-link" onClick={() => { history.push('/login'); }}>Login</button>;

  return (
    <div>
      <nav className="links">
      {authState.isAuthenticated && <Link to='/profile'><button className="protected-link">Profile</button></Link>}
        <Link to="/login">{button}</Link>
        <Link to="/register"><button className="register-link">Register</button></Link>
      </nav>
      <SearchField fetchResults={fetchResults}/>
      <Results searchResult={searchResult}/>
    </div>
  );
};
export default Home;
