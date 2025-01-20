import React, { useState, useEffect } from "react";
import { addPlace, getAllPlaces } from "../apiService";
import Banner from "../components/Banner";

const AddPlacePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
  });

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllPlaces();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPlace = await addPlace(formData);
      console.log("Place added:", newPlace);
      setFormData({
        name: "",
        location: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  return (
    <div>
      <Banner places={places} />
      <h1>Add a New Place</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Place Name"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location (City, Country)"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="5"
          required
        />
        <button type="submit">Add Place</button>
      </form>
    </div>
  );
};

export default AddPlacePage;
