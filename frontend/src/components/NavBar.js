import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Import home icon
import "./NavBar.css"; // Import styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <FaHome className="home-icon" /> DreamHome
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/staff" className="nav-link">Staff Management</Link>
        <Link to="/branch" className="nav-link">Branch Management</Link>
        <Link to="/client" className="nav-link">Client Management</Link>
      </div>
    </nav>
  );
};

export default NavBar;
