//frontend\src\pages\AdminDashboard.js
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = ({ token, setToken }) => {
  const navigate = useNavigate();

  // State to hold events fetched from the backend
  const [events, setEvents] = useState([]);

  // Fetch events from the backend when the component loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/events'); // Adjust URL if necessary
        setEvents(response.data); // Store events in state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array ensures this runs once when component mounts

  return (
    <section className="min-h-screen bg-white">
      {/* Outer container to align content */}
      <div className="pt-32 flex flex-col items-center">
        <div className="w-full max-w-6xl px-8">  {/* Adjusted padding here for alignment */}
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

          {/* Flexbox for Event Cards - centered content with same width as buttons */}
          {events.length > 0 ? (
            <div className="grid grid-cols-2 gap-8">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="mb-6 p-6 border border-red-600 rounded-lg text-center"
                >
                  <h6 className="text-lg font-bold mb-2">{event.name}</h6>
                  <div className="flex justify-between gap-4">
                    <span className="text-red-600 cursor-pointer">edit</span>
                    <button onClick={() => navigate('/volcards')} className="text-red-600 cursor-pointer">volunteers</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No events available</p> // Display this if no events are available
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
