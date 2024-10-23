import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);  // State to hold fetched events
  const [error, setError] = useState('');

  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/events', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(response.data);  // Set the events in state
      } catch (err) {
        console.error("Error fetching events:", err);
        setError('Failed to fetch events');
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <section className="min-h-screen bg-white">
      {/* Outer container to align content */}
      <div className="pt-32 flex flex-col items-center">
        <div className="w-full max-w-6xl px-8">
          <h2 className="text-5xl font-bold mb-8 text-red-600">Welcome Admin</h2>

          {/* Flexbox for "Create Event" and "Run Matches" */}
          <div className="flex justify-center gap-8 mb-12">
            <button onClick={() => navigate('/eventmanagmentform')} className="text-2xl py-4 px-24 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all uppercase tracking-wider font-semibold rounded-lg">
              Create Event
            </button>

            <button className="text-2xl py-4 px-24 bg-red-600 text-white hover:bg-red-700 transition-all uppercase tracking-wider font-semibold rounded-lg">
              Run Matches
            </button>
          </div>

          <h4 className="text-3xl font-bold mb-6">Manage Events</h4>

          {/* Display error message if there is an error */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Event Cards */}
          <div className="grid grid-cols-2 gap-8">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event._id} className="mb-6 p-6 border border-red-600 rounded-lg text-center">
                  <h6 className="text-lg font-bold mb-2">{event.name}</h6>
                  <p>{event.description}</p>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                  <div className="flex justify-between gap-4 mt-4">
                    <span className="text-red-600 cursor-pointer">edit</span>
                    <button onClick={() => navigate('/volcards')} className="text-red-600 cursor-pointer">volunteers</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No events available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;