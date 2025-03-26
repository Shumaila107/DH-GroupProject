import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCaretDown } from "react-icons/fa"; // Import home icon
// Import home icon and dropdown caret
import "./NavBar.css"; // Import styling

const NavBar = () => {
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);

  const toggleBranchDropdown = () => {
    setIsBranchDropdownOpen(!isBranchDropdownOpen);
  };
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <FaHome className="home-icon" /> DreamHome
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/staff" className="nav-link">Staff Management</Link>
        <div className="dropdown">
          <button className="nav-link dropbtn" onClick={toggleBranchDropdown}>
            Branch Management <FaCaretDown />
          </button>
          <div className={`dropdown-content ${isBranchDropdownOpen ? 'show' : ''}`}>
            <Link to="/branch-address">Identify Branch Address</Link>
            <Link to="/edit-branch">Edit Branch</Link>
            <Link to="/open-branch">Open Branch</Link>
          </div>
        </div>
        <Link to="/client" className="nav-link">Client Management</Link>
      </div>
    </nav>
  );
};

export default NavBar;
