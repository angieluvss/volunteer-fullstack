import React, { useEffect, useState } from 'react';
import './notifs.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Notifications = () => {
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const navigate = useNavigate();

  // Fetch notifications from an API when the component mounts
  useEffect(() => {
    axios.get('/api/notifications') // Assuming you have an API endpoint for notifications
      .then(response => {
        setNotifications(response.data); // Update state with fetched notifications
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, []); // Empty array means this will run once when the component mounts

  return (
    <div className="updates-container">
      {/* Header Section */}
      <div className="updates-header">
        <h2>Updates</h2>
        <span>View all notices you need to be aware of</span>
        <button onClick={() => navigate('/volunteer-dashboard')} className="close-button">✖</button>
      </div>

      {/* Render fetched notifications */}
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div className="update-card" key={index}>
            <div className="update-header">
              <p className="update-title">{notification.title}</p>
              <span className="update-date">{notification.date}</span>
            </div>
            <p className="update-message">
              {notification.message}
            </p>
          </div>
        ))
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
};

export default Notifications;

