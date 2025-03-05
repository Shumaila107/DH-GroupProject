import React from 'react';
import { Link } from 'react-router-dom'; 
import './MainMenu.css'; 

const MainMenu = () => {
    return (
        <div className="main-menu-container">
            <h1 className="title">Welcome to Dream Home Real Estate</h1>
            <div className="menu">
                <Link to="/staff" className="menu-button">Staff Main Menu</Link>
                <Link to="/branch" className="menu-button">Branch Main Menu</Link>
                <Link to="/client" className="menu-button">Client Main Menu</Link>
            </div>
        </div>
    );
};

export default MainMenu;