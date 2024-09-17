import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './VolunteerHistory.css'; // CSS file for styling

function VolunteerHistory() {
  const navigate = useNavigate(); // Hook to redirect

  // Sample events state, can remove if you want
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Event 1',
      description: 'Description of event 1',
      location: 'Location 1',
      date: '2024-09-11',
    },
  ]);

  // State for the new event
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to add new event
  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setNewEvent({ name: '', description: '', location: '', date: '' });
  };

  // Handle Logout
  const handleLogout = () => {
    // Perform any logout logic if necessary (e.g., clearing tokens, user data)
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="volunteer-history-container">
      <h2>Volunteer History</h2>

      {/* Logout button */}
      <button onClick={handleLogout} className="logout-btn">
        Log Out
      </button>

      {/* Form to add a new event */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Event Description"
          value={newEvent.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEvent.location}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      {/* Table to display the events */}
      <table className="event-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.location}</td>
              <td>{event.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VolunteerHistory;

