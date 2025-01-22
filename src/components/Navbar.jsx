import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    // Adding a small delay before navigating to the login page
    setTimeout(() => {
      navigate("/auth", { replace: true });
    }, 100);
  };

  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/locations"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Locations
      </NavLink>
      <NavLink
        to="/add-place"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Add Place
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Dashboard
      </NavLink>
      {localStorage.getItem("token") ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <NavLink
          to="/auth"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Login/Register
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
