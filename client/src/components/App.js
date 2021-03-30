import { useState } from 'react';
import SearchField from './SearchField';
import Results from './Results';

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
    <div className="App">
      <header className="main-header">
        <h1>StreamCompass</h1>
      </header>
      <SearchField fetchResults={fetchResults}/>
      <Results searchResult={searchResult}/>
    </div>
  );
}

export default App;
