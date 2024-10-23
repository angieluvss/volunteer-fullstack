//frontend\src\pages\AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Make the request to the backend with the token
          const response = await axios.get('http://localhost:4000/api/events', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setEvents(response.data);
        } catch (err) {
          // If the token is invalid or expired, the backend will return an error
          if (err.response && err.response.status === 401) {
            // Token is invalid or expired, redirect to login
            localStorage.removeItem('token');
            navigate('/login');
          } else {
            setError('Failed to fetch events');
          }
        }
      } else {
        // No token, redirect to login
        setError('No token found, please login again.');
        navigate('/login');
      }
    };

    fetchEvents();
  }, [navigate]);

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
