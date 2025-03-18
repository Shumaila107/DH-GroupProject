import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Dream Home Real Estate Management System</h1>
        <div className="subheading-card">
          <p className="subheading">
            A comprehensive platform for managing <strong>staff</strong>, <strong>branches</strong>, and <strong>clients</strong> efficiently. 
            A web-based application that interacts with an Oracle database, the backend is powered by Java Spring Boot and the frontend was 
            built using React.
          </p>
        </div>
      </header>

     
      <section className="core-functionalities">
        <h2>Core Functionalities</h2>
        <div className="card-container">
          <div className="card">
            <h3>Staff Management</h3>
            <p>Manage staff records, roles, and assignments efficiently.</p>
          </div>
          <div className="card">
            <h3>Branch Management</h3>
            <p>Track and update real estate branch locations and details.</p>
          </div>
          <div className="card">
            <h3>Client Management</h3>
            <p>Store and manage client interactions and property preferences.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
