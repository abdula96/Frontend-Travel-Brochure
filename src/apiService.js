import axios from "axios";

const API_URL = "http://localhost:5000/api/places"; // Adjust the URL as needed

// Get all places
export const getAllPlaces = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};

// Get location by ID
export const getLocationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching place by ID:", error);
    throw error;
  }
};

// Add a new place
export const addPlace = async (placeData) => {
  try {
    const response = await axios.post(API_URL, placeData);
    return response.data;
  } catch (error) {
    console.error("Error adding place:", error);
    throw error;
  }
};

// Update an existing place
export const updatePlace = async (id, placeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, placeData);
    return response.data;
  } catch (error) {
    console.error("Error updating place:", error);
    throw error;
  }
};

// Delete a place
export const deletePlace = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting place:", error);
    throw error;
  }
};
