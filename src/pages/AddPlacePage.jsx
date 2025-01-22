import React, { useState, useEffect } from "react";
import { addPlace, getAllPlaces } from "../apiService";
import Banner from "../components/Banner";

const AddPlacePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    description: "",
    image: null,
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

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("city", formData.city);
    formDataObj.append("country", formData.country);
    formDataObj.append("description", formData.description);
    formDataObj.append("image", formData.image);

    try {
      const newPlace = await addPlace(formDataObj);
      setFormData({
        name: "",
        city: "",
        country: "",
        description: "",
        image: null,
      });
      console.log("Place added:", newPlace);
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  return (
    <div>
      <Banner places={places} />
      <h1>Add a New Place</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
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
        <input type="file" name="image" onChange={handleImageChange} required />
        <button type="submit">Add Place</button>
      </form>
    </div>
  );
};

export default AddPlacePage;
