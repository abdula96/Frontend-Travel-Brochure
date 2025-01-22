import React, { useEffect, useState } from "react";
import {
  getUserData,
  updateUserEmail,
  updateUserPassword,
  addPlace, // Import addPlace function
} from "../apiService";
import Banner from "../components/Banner"; // Import Banner component

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    description: "",
    image: null, // Add image to the state
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserEmail(newEmail);
      setUpdateMessage(response.message);
    } catch (error) {
      setUpdateMessage("Error updating email.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserPassword(currentPassword, newPassword);
      setUpdateMessage(response.message);
    } catch (error) {
      setUpdateMessage("Error updating password.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Handle file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("city", formData.city);
    formDataObj.append("country", formData.country);
    formDataObj.append("description", formData.description);
    formDataObj.append("image", formData.image); // Add image to form data

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

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-page">
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>

      <h2 className="centered-text">Places you visited</h2>

      <div className="form-container-vertical">
        <div className="form-section">
          <h2>Update Email</h2>
          <form onSubmit={handleEmailChange}>
            <input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="input-small"
            />
            <button type="submit" className="small-button">
              Update Email
            </button>
          </form>
        </div>

        <div className="form-section">
          <h2>Update Password</h2>
          <form onSubmit={handlePasswordChange}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input-small"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-small"
            />
            <div>
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
            <button type="submit" className="small-button">
              Update Password
            </button>
          </form>
        </div>
      </div>

      <div className="form-container-vertical">
        <h2>Add a New Place</h2>
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
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
          />
          <button type="submit">Add Place</button>
        </form>
      </div>

      {updateMessage && <p>{updateMessage}</p>}
    </div>
  );
};

export default DashboardPage;
