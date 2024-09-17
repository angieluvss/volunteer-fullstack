// src/pages/HeroPage.js
import React from 'react';
import './HeroPage.css'; // Renamed the CSS file accordingly

function HeroPage() {
  return (
    <div className="hero-page-container">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img src="/path/to/logo.png" alt="Logo" />
          <h1>Shasta's Coogmunity Service</h1>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#" className="cta">Get Started</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Section */}
      <main>
        <h2 className="main-title">MAKE CHANGE AT COOGS' HOUSE!</h2>

        {/* Volunteer Images */}
        <div className="volunteer-images">
          <img src="/path/to/volunteer1.png" alt="Volunteer 1" />
          <img src="/path/to/volunteer2.png" alt="Volunteer 2" />
          <img src="/path/to/volunteer3.png" alt="Volunteer 3" />
        </div>

        {/* Learn More Section */}
        <div className="learn-more">
          <p>Learn More!</p>
          <span className="down-arrow">⬇</span>
        </div>
      </main>
    </div>
  );
}

export default HeroPage;

