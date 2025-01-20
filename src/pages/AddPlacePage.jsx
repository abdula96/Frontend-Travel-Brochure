import React, { useState, useEffect } from "react";
import { addPlace, getAllPlaces } from "../apiService";
import Banner from "../components/Banner";

const AddPlacePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    description: "",
    image: null, // Add image to the state
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
    setFormData({ ...formData, image: e.target.files[0] }); // Handle file input
    console.log("Image selected:", e.target.files[0]); // Log the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Log form submission
    console.log("Form data:", formData); // Log form data

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("city", formData.city);
    formDataObj.append("country", formData.country);
    formDataObj.append("description", formData.description);
    formDataObj.append("image", formData.image); // Add image to form data

    console.log("FormData object:", formDataObj); // Log FormData object

    try {
      const newPlace = await addPlace(formDataObj);
      console.log("Place added:", newPlace);
      setFormData({
        name: "",
        city: "",
        country: "",
        description: "",
        image: null,
      });
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
