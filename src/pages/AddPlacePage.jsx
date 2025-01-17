import React, { useState } from "react";

const AddPlacePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Clear the form
    setFormData({
      name: "",
      location: "",
      description: "",
    });

    // Add logic here to send data to your backend
    // Example:
    // axios.post(`${import.meta.env.VITE_API_URL}/places`, formData)
    //   .then(response => console.log("Place added:", response.data))
    //   .catch(error => console.error("Error adding place:", error));
  };

  return (
    <div>
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
