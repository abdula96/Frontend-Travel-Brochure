import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import axios from "axios";

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_URL}/places`);
        setLocations(response.data);
        setFilteredLocations(response.data); // Default to show all locations
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = (query) => {
    const filtered = locations.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  return (
    <div>
      <h1>Locations</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="locations-grid">
        {filteredLocations.map((location) => (
          <div key={location._id} className="location-card">
            <h3>{location.name}</h3>
            <p>{location.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
