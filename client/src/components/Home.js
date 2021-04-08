import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

import SearchField from './SearchField';
import Results from './Results';
import ResultCard from './ResultCard';

const Home = ({ setCountry }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();
  const [searchResult, setSearchResult] = useState();
  const [popularSeries, setPopularSeries] = useState();
  const [loading, setLoading] = useState(true);

  const fetchResults = (searchQuery, country) => {
    fetch('/api/utelly', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchQuery, country }),
    })
      .then(res => res.json())
      .then(data => setSearchResult(data.results));
  };

  useEffect(() => {
    fetch('/api/tmdb')
      .then(res => res.json())
      .then(data => setPopularSeries(data.results));
  }, []);

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  const button = authState.isAuthenticated
    ? <button className="login-link" onClick={() => { oktaAuth.signOut(); }}>Logout</button>
    : <button className="login-link" onClick={() => { history.push('/login'); }}>Login</button>;

  return (
    <>
      <nav className="links">
        {authState.isAuthenticated && <Link to='/profile'><button className="protected-link">Profile</button></Link>}
        <Link to="/login">{button}</Link>
        {!authState.isAuthenticated && <Link to="/register"><button className="register-link">Register</button></Link>}
      </nav>
      <SearchField setDetailsCountry={setCountry} fetchResults={fetchResults}/>
      {searchResult
        ? <Results setLoading={setLoading} searchResult={searchResult}/>
        : <><h2>Popular TV-series:</h2>
        {loading && <p>Loading...</p>}
        <div className='popular-series-container'>
          {popularSeries
          && popularSeries.map(series => <ResultCard
          key={series.id} tvShow={series} setLoading={setLoading}/>)}
        </div></>
        }
    </>
  );
};
export default Home;
