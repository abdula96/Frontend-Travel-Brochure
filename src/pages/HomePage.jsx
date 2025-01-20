import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import { getAllPlaces } from "../apiService";

const HomePage = () => {
  const [featuredLocations, setFeaturedLocations] = useState([]);
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllPlaces();
        setPlaces(data);
        // Randomly select 3 locations to feature
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3); // Select the first 3 elements
        setFeaturedLocations(selected);
      } catch (error) {
        console.error("Failed to fetch featured locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = (query) => {
    navigate(`/locations?search=${query}`);
  };

  const handleFeaturedClick = (name) => {
    navigate(`/locations?search=${name}`);
  };

  const getImageUrl = (place) => {
    // If the image path starts with '/', consider it a public image
    if (place.image.startsWith("/")) {
      return place.image;
    }
    // Otherwise, it's an uploaded image
    return `http://localhost:5000/${place.image}`;
  };

  return (
    <div>
      <Banner places={places} />
      <SearchBar onSearch={handleSearch} />
      <h1>Featured Locations</h1>
      <div className="locations-grid">
        {featuredLocations.map((location) => (
          <div
            key={location._id}
            className="location-card"
            onClick={() => handleFeaturedClick(location.name)}
          >
            <img
              src={getImageUrl(location)} // Ensure the URL is correct
              alt={location.name}
              className="location-image"
            />
            <h3>{location.name}</h3>
            <p>{location.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
