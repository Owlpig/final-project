import { useState } from 'react';
import {
  BrowserRouter, Switch, Route, Link,
} from 'react-router-dom';

import SearchField from './SearchField';
import Results from './Results';
import Login from './Login';
import Register from './Register';

function App() {
  const [searchResult, setSearchResult] = useState([]);

  const fetchResults = (searchQuery, country) => {
    fetch('/utelly', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchQuery, country }),
    })
      .then(res => res.json())
      .then(data => setSearchResult(data.results));
  };

  return (
    <BrowserRouter>
      <header className="main-header">
        <h1><Link className="main-heading" to="/">StreamCompass</Link></h1>
      </header>
      <nav className="links">
        <Link className="login-link" to="/login">Login</Link>
        <Link className="register-link" to="/register">Register</Link>
      </nav>
      <main className="main">
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/">
            <SearchField fetchResults={fetchResults}/>
            <Results searchResult={searchResult}/>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
