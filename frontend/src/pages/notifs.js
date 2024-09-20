import React from 'react';
import './Updates.css'; // Import the CSS file

const Notifications = () => {
  return (
    <div className="updates-container">
      {/* Header Section */}
      <div className="updates-header">
        <h2>Updates</h2>
        <span>View all notices you need to be aware of</span>
        <button className="close-button">✖</button>
      </div>

      {/* Update Cards */}
      <div className="update-card">
        <div className="update-header">
          <p>new event matches for you!!</p>
          <span className="update-date">Sept 20, 2024 4:44pm</span>
        </div>
        <p className="update-message">
          hey name! we have some upcoming events you have been matched to! Please confirm your attendance
        </p>
      </div>

      {/* More update cards can be added similarly */}
      <div className="update-card">
        <div className="update-header">
          <p>reminder for an upcoming event</p>
          <span className="update-date">Sept 22, 2024 10:00am</span>
        </div>
        <p className="update-message">
          Just a friendly reminder to confirm your attendance for the upcoming event.
        </p>
      </div>
    </div>
  );
};

export default Notifications;
