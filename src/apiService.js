// src/apiService.js
import axios from "./axiosConfig"; // Use the configured Axios instance

const API_URL = "http://localhost:5000/api/places";
const AUTH_API_URL = "http://localhost:5000/api/auth";
const USER_API_URL = "http://localhost:5000/api/user";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Password reset request
export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(
      `${AUTH_API_URL}/request-reset-password`,
      { email }
    );
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
};

// Password reset
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(
      `${AUTH_API_URL}/reset-password/${token}`,
      { newPassword }
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// Get user data
export const getUserData = async () => {
  try {
    const response = await axios.get(USER_API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Update user email
export const updateUserEmail = async (newEmail) => {
  try {
    const response = await axios.put(`${AUTH_API_URL}/update-email`, {
      newEmail,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating email:", error);
    throw error;
  }
};

// Update user password
export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.put(`${AUTH_API_URL}/update-password`, {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

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
    const response = await axios.post(API_URL, placeData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export default axios;
