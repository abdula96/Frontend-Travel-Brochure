// src/axiosConfig.js
import axios from "axios";

const token = localStorage.getItem("token"); // or wherever you store your token
if (token) {
  console.log("Token found:", token); // Debugging line
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  console.log("No token found"); // Debugging line
}

export default axios;
