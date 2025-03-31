import React, { useEffect, useState } from "react";
import "./HomePage.css";
import condoImage from "./condo2.jpg"; // your hero image
import apt1 from "./rent1.jpg";
import apt2 from "./rent2.jpg";
import apt3 from "./rent3.jpg";

const HomePage = () => {
  const [counters, setCounters] = useState({
    staff: 0,
    branch: 0,
    client: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/counter")
      .then((res) => res.json())
      .then((data) => setCounters(data))
      .catch((err) => console.error("Error fetching counter data:", err));
  }, []);

  const scrollToProperties = () => {
    document.getElementById("property-section").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage-wrapper">
      {/* HERO SECTION */}
      <section className="hero-section" style={{ backgroundImage: `url(${condoImage})` }}>
        <div className="hero-overlay">
          <h1>FIND YOUR DREAM HOME</h1>
          <p>Real estate management made easy and beautiful</p>
          <button onClick={scrollToProperties}>Explore More</button>
        </div>
      </section>

      {/* COUNTERS + DESCRIPTION */}
      <section className="counter-description-section">
  {[
    {
      count: counters.staff,
      title: "Staff Management",
      desc: "Manage staff records, roles, and assignments efficiently.",
      label: "Total Staff Members"
    },
    {
      count: counters.branch,
      title: "Branch Management",
      desc: "Track and update real estate branch locations and details.",
      label: "Total Branches"
    },
    {
      count: counters.client,
      title: "Client Management",
      desc: "Store and manage client interactions and preferences.",
      label: "Total Registered Clients"
    }
  ].map((item, index) => (
    <div key={index} className="feature-card">
      <h2>{item.title}</h2>
      <p>{item.desc}</p>
      <div className="live-counter">
        <h1>{item.count}</h1>
        <p className="live-label">{item.label}</p>
        <p className="live-subtext">(Live counter based on database)</p>
      </div>
    </div>
  ))}
</section>

      {/* PROPERTY LISTING */}
      <section id="property-section" className="property-section">
        <h2>Available Properties for Rent</h2>
        <div className="property-cards">
          {[
            { img: apt1, size: "1200 sq ft", address: "56 Cover Drive, London", price: "$1,500/mo" },
            { img: apt2, size: "900 sq ft", address: "32 Manse Road, Bristol", price: "$1,200/mo" },
            { img: apt3, size: "1500 sq ft", address: "1 Wayne Manor, Gotham", price: "$2,800/mo" }
          ].map((apt, i) => (
            <div key={i} className="property-card">
              <img src={apt.img} alt={`property-${i}`} />
              <div className="property-info">
                <p><strong>Size:</strong> {apt.size}</p>
                <p><strong>Address:</strong> {apt.address}</p>
                <p><strong>Price:</strong> {apt.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;