import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by keyword (e.g., Continent, Rating, Weather)"
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
