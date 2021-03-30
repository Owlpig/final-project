import React, { useState } from 'react';

const SearchField = ({ fetchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState('');

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

  const handleSubmit = e => {
    e.preventDefault();
    fetchResults(searchQuery, country);
    setCountry('');
    setSearchQuery('');
  };

  const handleChange = e => {
    if (e.target.name === 'country') {
      setCountry(e.target.value);
    } else {
      setSearchQuery(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input required onChange={handleChange} value={searchQuery} name="searchQuery"/>
      <select name="country" onChange={handleChange} defaultValue={country}>
        {countryArray.map(obj => <option
        key={obj.code}
        value={obj.code}>{obj.name}
        </option>)}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearchField;
