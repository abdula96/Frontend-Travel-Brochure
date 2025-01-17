import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    console.log("Search query:", query);
    setSearchResults([]);
  };

  return (
    <div>
      <h1>Featured Locations</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="locations-grid">
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result.id} className="location-card">
              <h3>{result.name}</h3>
              <p>{result.description}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
