import React, { useState } from 'react';

const SearchField = ({ fetchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState('');

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
      <input onChange={handleChange} value={searchQuery} name="searchQuery"/>
      <input onChange={handleChange} value={country} name="country"/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearchField;
