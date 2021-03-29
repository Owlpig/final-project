import SearchField from './SearchField';

function App() {
  fetch('/search', { method: 'post', body: { searchQuery: 'game', country: 'se' } })
    .then(res => res.json())
    .then(data => console.log(data));

  return (
    <div className="App">
      <SearchField/>
    </div>
  );
}

export default App;
