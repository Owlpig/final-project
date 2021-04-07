import ResultCard from './ResultCard';

const Results = ({ searchResult, setLoading }) => (
  <div className="results-container">
    {searchResult.map(tvShow => <ResultCard
      key={tvShow.id} setLoading={setLoading} tvShow={tvShow}/>)}
  </div>
);

export default Results;
