import React, { useState, useEffect } from 'react';

const SearchField = ({ fetchResults, setDetailsCountry }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState('se');

  const countryArray = [
    { code: 'uk', name: 'United Kingdom' },
    { code: 'us', name: 'United States' },
    { code: 'ar', name: 'Argentina' },
    { code: 'at', name: 'Austria' },
    { code: 'be', name: 'Belgium' },
    { code: 'br', name: 'Brazil' },
    { code: 'ca', name: 'Canada' },
    { code: 'de', name: 'Germany' },
    { code: 'es', name: 'Spain' },
    { code: 'fr', name: 'France' },
    { code: 'ie', name: 'Ireland' },
    { code: 'id', name: 'Indonesia' },
    { code: 'it', name: 'Italy' },
    { code: 'in', name: 'India' },
    { code: 'is', name: 'Iceland' },
    { code: 'kr', name: 'South Korea' },
    { code: 'my', name: 'Malaysia' },
    { code: 'mx', name: 'Mexico' },
    { code: 'no', name: 'Norway' },
    { code: 'nl', name: 'Netherlands' },
    { code: 'pl', name: 'Poland' },
    { code: 'pt', name: 'Portugal' },
    { code: 'se', name: 'Sweden' },
    { code: 'sg', name: 'Singapore' }];

  useEffect(() => {
    setDetailsCountry(country);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    fetchResults(searchQuery, country);
    setSearchQuery('');
  };

  const handleQueryChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleCountryChange = e => {
    setCountry(e.target.value);
    setDetailsCountry(e.target.value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input required className="query-input" onChange={handleQueryChange} value={searchQuery}/>
      <select className="country-dropdown" onChange={handleCountryChange} defaultValue={country}>
        {countryArray.map(obj => <option
        key={obj.code}
        value={obj.code}>{obj.name}
        </option>)}
      </select>
      <button className="submit-btn">Submit</button>
    </form>
  );
};

export default SearchField;
