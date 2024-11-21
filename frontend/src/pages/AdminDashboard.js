//frontend\src\pages\AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);  // State to hold fetched events
  const [error, setError] = useState('');

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [matchesResult, setMatchesResult] = useState('');

  // const runMatches = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       console.error('No token found');
  //       return;
  //     }

  //     const response = await axios.post(
  //       'http://localhost:4000/api/events/run-matches',
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     setMatchesResult(response.data.msg);
  //     alert('Matching completed successfully!');
  //   } catch (error) {
  //     console.error('Error running matches:', error);
  //     alert('Failed to run matches.');
  //   }
  // };

  const handleRunMatch = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Log token to ensure it's retrieved
  
      const response = await axios.post(
        `http://localhost:4000/api/events/match/${eventId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Match Response:', response.data); // Log server response
      alert(response.data.msg);
    } catch (error) {
      console.error('Error running match:', error.message); // Log error
      alert('Failed to run match.');
    }
  };
  

  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      try {
        const upcomingResponse = await axios.get('http://localhost:4000/api/events/upcoming', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUpcomingEvents(upcomingResponse.data);
  
        const pastResponse = await axios.get('http://localhost:4000/api/events/past', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPastEvents(pastResponse.data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events');
      }
    };
  
    fetchEvents();
  }, []);

  return (
    <section className="min-h-screen bg-white">
      {/* Outer container to align content */}
      <div className="pt-32 flex flex-col items-center">
        <div className="w-full max-w-6xl px-8">
          <h2 className="text-5xl font-bold mb-8 text-red-600">Welcome Admin</h2>
  
          {/* Flexbox for "Create Event" and "Run Matches" */}
          <div className="flex justify-center gap-8 mb-12">
            <button
              onClick={() => navigate('/eventmanagmentform')}
              className="text-2xl py-4 px-24 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all uppercase tracking-wider font-semibold rounded-lg"
            >
              Create Event
            </button>

            <button
              onClick={() => navigate('/reports')}
              className="text-2xl py-4 px-24 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all uppercase tracking-wider font-semibold rounded-lg"
            >
              Reports
            </button>
            
          </div>
  
          {/* Display error message if there is an error */}
          {error && <p className="text-red-500">{error}</p>}
  
          {/* Upcoming Events */}
          <h4 className="text-3xl font-bold mb-6">Upcoming Events</h4>
          <div className="grid grid-cols-2 gap-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((currentEvent) => (
                <div
                  key={currentEvent._id}
                  className="mb-6 p-6 border border-red-600 rounded-lg text-center"
                >
                  <h6 className="text-lg font-bold mb-2">{currentEvent.name}</h6>
                  <p>{currentEvent.description}</p>
                  <p>{new Date(currentEvent.date).toLocaleDateString()}</p>
                  <p className="font-semibold">Urgency: {currentEvent.urgency}</p>
                  <div className="flex justify-between gap-4 mt-4">
                    <span
                      onClick={() =>
                        navigate('/eventmanagmentform', {
                          state: { event: currentEvent, isChangingEvent: true },
                        })
                      }
                      className="text-red-600 cursor-pointer"
                    >
                      edit
                    </span>
                    <button onClick={() => handleRunMatch(currentEvent._id)} className="text-red-600 cursor-pointer">
                      Run Match
                    </button>
                    <button
                        onClick={() => {
                            console.log("Navigating to /volcards with eventId:", currentEvent._id);
                            navigate(`/volcards/${currentEvent._id}`);
                        }}
                        className="text-red-600 cursor-pointer"
                    >
                        volunteers ({currentEvent.volunteerCount || 0})
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No upcoming events available</p>
            )}
          </div>
  
          {/* Past Events */}
          <h4 className="text-3xl font-bold mb-6 mt-12">Past Events</h4>
          <div className="grid grid-cols-2 gap-8">
            {pastEvents.length > 0 ? (
              pastEvents.map((currentEvent) => (
                <div
                  key={currentEvent._id}
                  className="mb-6 p-6 border border-gray-400 rounded-lg text-center"
                >
                  <h6 className="text-lg font-bold mb-2">{currentEvent.name}</h6>
                  <p>{currentEvent.description}</p>
                  <p>{new Date(currentEvent.date).toLocaleDateString()}</p>
                  <p className="font-semibold">Urgency: {currentEvent.urgency}</p>
                  <div className="flex justify-between gap-4 mt-4">
                    <span
                      onClick={() =>
                        navigate('/eventmanagmentform', {
                          state: { event: currentEvent, isChangingEvent: true },
                        })
                      }
                      className="text-gray-600 cursor-pointer"
                    >
                      edit
                    </span>
                    <button
                      onClick={() => {
                        console.log("Navigating to /volcards with eventId:", currentEvent._id);
                        navigate(`/volcards/${currentEvent._id}`);
                      }}
                      className="text-gray-600 cursor-pointer"
                    >
                      volunteers ({currentEvent.volunteerCount || 0})
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No past events available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
  
};

export default AdminDashboard;
