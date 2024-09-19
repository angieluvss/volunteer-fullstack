import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import NavBar from '../components/NavigationBar'; // Import the reusable NavBar component
import '../index.css';
import volcards from './volcards.css';

function VolunteerMatchingForm() {
  return (
    <div>
      <header>
        <div className="logo-container">
          <div className="logo">
          <img src="../../public/shasta.png" alt="Shasta Logo" />
            <p>Shasta's Coogmunity Service</p>
          </div>
          <button className="logout-btn">Log Out</button>
        </div>
      </header>

      <main className="content">
        <div className="container">
          <h1>Event Name</h1>
          <p>Current Volunteers Registered to the Event</p>
          <div className="view-switch">
            <button className="card-active">Card View</button>
            <button>Table View</button>
          </div>
          <section className="volunteer-cards">
            {/* Example of a volunteer card */}
            <div className="card">
              <div className="avatar"></div>
              <h3>John Doe</h3>
              <div className="tags">
                <span>python</span>
                <span>leadership</span>
                <span>gbaffagfa</span>
              </div>
              <p className="preferences">
                preferences: ARGORJPOGwrfgojlkJNaorgnarg orgkrwlIROGh gOIWRFOP gOg [gorhgaj GOdWgolog rqjhg r wblyjf.. FOr FOlweFIG Gwegwg WGWg wrg
              </p>
              <div className="actions">
                <select name="event" className="event-selector">
                  <option>Add to event</option>
                </select>
                <button className="remove-btn">remove from event</button>
              </div>
            </div>
            {/* Repeat the card structure as necessary */}
            <div className="card">
              <div className="avatar"></div>
              <h3>John Doe</h3>
              <div className="tags">
                <span>python</span>
                <span>leadership</span>
                <span>gbaffagfa</span>
              </div>
              <p className="preferences">
                preferences: ARGORJPOGwrfgojlkJNaorgnarg orgkrwlIROGh gOIWRFOP gOg [gorhgaj GOdWgolog rqjhg r wblyjf.. FOr FOlweFIG Gwegwg WGWg wrg
              </p>
              <div className="actions">
                <select name="event" className="event-selector">
                  <option>Add to event</option>
                </select>
                <button className="remove-btn">remove from event</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default VolunteerMatchingForm;