import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';
import './StaffHiringForm';

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="main-menu-container">
      <h1>Main Menu</h1>
      <button onClick={() => navigate('/staff')}>Staff Main Menu</button>
      <button onClick={() => navigate('/branch')}>Branch Main Menu</button>
      <button onClick={() => navigate('/client')}>Client Main Menu</button>
    </div>
  );
};

export default MainMenu;
