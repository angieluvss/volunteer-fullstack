import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import NavBar from '../components/NavigationBar'; // Import the reusable NavBar component
import '../index.css';
import volcards from './volcards.css';

function VolunteerMatchingForm() {
  return (
    <div>
      <NavBar />  {/* Include the NavBar on the page */}
      <main className="content">
        <div className="container">
          <h1>Event Name</h1>
          <p>Current Volunteers Registered to the Event</p>
          <div className="view-switch">
            <button className="card-active">Card View</button>
            <button>Table View</button>
          </div>
          <section className="volunteer-cards">
            {/* Card 1 */}
            <div className="card">
              <div className="avatar"></div>
              <h3>John Doe</h3>
              <div className="tags">
                <span>python</span>
                <span>leadership</span>
              </div>
              <p className="preferences">
                preferences: lorem ipsum dolor sit amet...
              </p>
              <div className="actions">
                <select name="event" className="event-selector">
                  <option>Add to event</option>
                </select>
                <button className="remove-btn">remove from event</button>
              </div>
            </div>
            {/* Card 2 */}
            <div className="card">
              <div className="avatar"></div>
              <h3>Jane Smith</h3>
              <div className="tags">
                <span>javascript</span>
                <span>management</span>
              </div>
              <p className="preferences">
                preferences: lorem ipsum dolor sit amet...
              </p>
              <div className="actions">
                <select name="event" className="event-selector">
                  <option>Add to event</option>
                </select>
                <button className="remove-btn">remove from event</button>
              </div>
            </div>
            <div className="card">
              <div className="avatar"></div>
              <h3>Jane Smith</h3>
              <div className="tags">
                <span>javascript</span>
                <span>management</span>
              </div>
              <p className="preferences">
                preferences: lorem ipsum dolor sit amet...
              </p>
              <div className="actions">
                <select name="event" className="event-selector">
                  <option>Add to event</option>
                </select>
                <button className="remove-btn">remove from event</button>
              </div>
            </div>
            <div className="card">
              <div className="avatar"></div>
              <h3>Jane Smith</h3>
              <div className="tags">
                <span>javascript</span>
                <span>management</span>
              </div>
              <p className="preferences">
                preferences: lorem ipsum dolor sit amet...
              </p>
              <div className="actions">
                <select name="event" className="event-selector">
                  <option>Add to event</option>
                </select>
                <button className="remove-btn">remove from event</button>
              </div>
            </div>
            <div className="card">
              <div className="avatar"></div>
              <h3>Jane Smith</h3>
              <div className="tags">
                <span>javascript</span>
                <span>management</span>
              </div>
              <p className="preferences">
                preferences: lorem ipsum dolor sit amet...
              </p>
              <div className="actions">
                <select name="event" className="event-selector">
                  <option>Add to event</option>
                </select>
                <button className="remove-btn">remove from event</button>
              </div>
            </div>
            <div className="card">
              <div className="avatar"></div>
              <h3>Jane Smith</h3>
              <div className="tags">
                <span>javascript</span>
                <span>management</span>
              </div>
              <p className="preferences">
                preferences: lorem ipsum dolor sit amet...
              </p>
              <div className="actions">
                <select name="event" className="event-selector">
                  <option>Add to event</option>
                </select>
                <button className="remove-btn">remove from event</button>
              </div>
            </div>
            <div className="card">
              <div className="avatar"></div>
              <h3>Jane Smith</h3>
              <div className="tags">
                <span>javascript</span>
                <span>management</span>
              </div>
              <p className="preferences">
                preferences: lorem ipsum dolor sit amet...
              </p>
              <div className="actions">
                <select name="event" className="event-selector">
                  <option>Add to event</option>
                </select>
                <button className="remove-btn">remove from event</button>
              </div>
            </div>
            <div className="card">
              <div className="avatar"></div>
              <h3>Jane Smith</h3>
              <div className="tags">
                <span>javascript</span>
                <span>management</span>
              </div>
              <p className="preferences">
                preferences: lorem ipsum dolor sit amet...
              </p>
              <div className="actions">
                <select name="event" className="event-selector">
                  <option>Add to event</option>
                </select>
                <button className="remove-btn">remove from event</button>
              </div>
            </div>
            <div className="card">
              <div className="avatar"></div>
              <h3>Jane Smith</h3>
              <div className="tags">
                <span>javascript</span>
                <span>management</span>
              </div>
              <p className="preferences">
                preferences: lorem ipsum dolor sit amet...
              </p>
              <div className="actions">
                <select name="event" className="event-selector">
                  <option>Add to event</option>
                </select>
                <button className="remove-btn">remove from event</button>
              </div>
            </div>
            {/* Repeat as needed */}
          </section>
        </div>
      </main>
    </div>
  );
}

export default VolunteerMatchingForm;