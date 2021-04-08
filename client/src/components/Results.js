import ResultCard from './ResultCard';

const Results = ({ searchResult, setLoading }) => {
  if (!searchResult[0]) {
    return <p>Sorry, no results found. Please, try another search.</p>;
  }
  return (
  <div className="results-container">
    {searchResult.map(tvShow => <ResultCard
      key={tvShow.id} setLoading={setLoading} tvShow={tvShow}/>)}
  </div>
  );
};

export default Results;
