import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import { getAllPlaces } from "../apiService";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [places, setPlaces] = useState([]);
  const query = useQuery();
  const navigate = useNavigate();
  const currentSearch = query.get("search") || "";

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllPlaces();
        setPlaces(data);
        setLocations(data);

        if (currentSearch) {
          handleSearch(currentSearch, data);
        } else {
          setFilteredLocations(data); // Default to show all locations
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [currentSearch]);

  const handleSearch = (query, locationData = locations) => {
    if (query !== currentSearch) {
      navigate(`/locations?search=${query}`);
    }
    const filtered = locationData.filter(
      (location) =>
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.description.toLowerCase().includes(query.toLowerCase()) ||
        location.location.city.toLowerCase().includes(query.toLowerCase()) ||
        location.location.country.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const handleLocationClick = (id) => {
    const selectedLocation = locations.find((location) => location._id === id);
    if (selectedLocation) {
      setFilteredLocations([selectedLocation]);
      navigate(`/locations?search=${selectedLocation.name}`);
    }
  };

  return (
    <div>
      <Banner places={places} />
      <h1>Locations</h1>
      <SearchBar onSearch={(query) => handleSearch(query, locations)} />
      <div className="locations-grid">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <div
              key={location._id}
              className="location-card"
              onClick={() => handleLocationClick(location._id)}
            >
              <img
                src={location.image}
                alt={location.name}
                className="location-image"
              />
              <h3>{location.name}</h3>
              <p>{location.description}</p>
              <p>
                {location.location.city}, {location.location.country}
              </p>
              {location.facts && location.facts.length > 0 && (
                <ul>
                  {location.facts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default LocationsPage;
