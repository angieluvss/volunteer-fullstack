import React from 'react';
import './notifs.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();
  return (
    <div className="updates-container">
      {/* Header Section */}
      <div className="updates-header">
        <h2>Updates</h2>
        <span>View all notices you need to be aware of</span>
        <button onClick={() => navigate('/volunteer-dashboard')} className="close-button">✖</button>
      </div>

      {/* Update Card */}
      <div className="update-card">
        <div className="update-header">
          <p className="update-title">new event matches for you!!</p>
          <span className="update-date">Sept 20, 2024 4:44pm</span>
        </div>
        <p className="update-message">
          hey name! we have some upcoming events you have been matched to! Please confirm your attendance
        </p>
      </div>
      {/* Update Card */}
      <div className="update-card">
        <div className="update-header">
          <p className="update-title">new event matches for you!!</p>
          <span className="update-date">Sept 20, 2024 4:44pm</span>
        </div>
        <p className="update-message">
          hey name! we have some upcoming events you have been matched to! Please confirm your attendance
        </p>
      </div>
      {/* Update Card */}
      <div className="update-card">
        <div className="update-header">
          <p className="update-title">new event matches for you!!</p>
          <span className="update-date">Sept 20, 2024 4:44pm</span>
        </div>
        <p className="update-message">
          hey name! we have some upcoming events you have been matched to! Please confirm your attendance
        </p>
      </div>
    </div>
  );
};

export default Notifications;
