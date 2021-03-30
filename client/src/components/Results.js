import ResultCard from './ResultCard';

const Results = ({ searchResult }) => (
  <div className="results-container">
    {searchResult.map(tvShow => <ResultCard key={tvShow.id} tvShow={tvShow}/>)}
  </div>
);

export default Results;
