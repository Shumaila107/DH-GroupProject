import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Dream Home Real Estate Management System</h1>
        <p className="subheading">
          A comprehensive platform for managing **staff**, **branches**, and **clients** efficiently.
        </p>
      </header>

      <section className="about-section">
        <h2>About the Project</h2>
        <p>
          This system is a **college group project** aimed at developing a **web-based application** that
          interacts with an **Oracle database**. The backend is powered by **Java Spring Boot**, while the frontend
          is built using **React**.
        </p>
      </section>

      
    </div>
  );
};

export default HomePage;
