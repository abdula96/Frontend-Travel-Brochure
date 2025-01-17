import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;
