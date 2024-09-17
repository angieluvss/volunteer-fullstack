import React from 'react';
import './Header.css'; // Create a CSS file for styling

function Header() {
  return (
    <header className="header">
      <div className="logo">
      <img src="/shasta.png" alt="Shasta's Coogmunity Service" />
        <h1> Shasta’s Coogmunity Service</h1>
      </div>
      <button className="logout-btn">Log Out</button>
    </header>
  );
}

export default Header;
