import React from 'react';
import NavBar from '../components/NavBar'; // Ensure the path is correct

const AdminDashboard = ({ token, setToken }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar with token and setToken passed in */}
      <NavBar token={token} setToken={setToken} />

      <div className="text-left px-16 pt-32">
        <h2 className="text-5xl font-bold mb-8 text-red-600 text-center">Welcome Admin</h2>

        {/* Flexbox for "Create Event" and "Run Matches" */}
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          <button className="text-2xl py-4 px-16 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all max-w-xs uppercase tracking-wider font-semibold rounded-lg">
            Create Event
          </button>

          <button className="text-2xl py-4 px-16 bg-red-600 text-white hover:bg-red-700 transition-all max-w-xs uppercase tracking-wider font-semibold rounded-lg">
            Run Matches
          </button>
        </div>

        <h4 className="text-3xl font-bold mb-6" style={{ paddingLeft: '16%' }}>Manage Events</h4> {/* Adjusted left padding */}

        {/* Flexbox for Event Cards */}
        <div className="flex justify-center gap-8 flex-wrap">
          <div className="flex-1 max-w-md text-center">
            {[1, 1, 1].map((event, index) => (
              <div
                key={index}
                className="mb-6 p-6 border border-red-600 rounded-lg text-center"
              >
                <h6 className="text-lg font-bold mb-2">Event {event}</h6>
                <div className="flex justify-between gap-4">
                  <span className="text-red-600 cursor-pointer">edit</span>
                  <span className="text-red-600 cursor-pointer">volunteers</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 max-w-md text-center">
            {[2, 2, 2].map((event, index) => (
              <div
                key={index}
                className="mb-6 p-6 border border-red-600 rounded-lg text-center"
              >
                <h6 className="text-lg font-bold mb-2">Event {event}</h6>
                <div className="flex justify-between gap-4">
                  <span className="text-red-600 cursor-pointer">edit</span>
                  <span className="text-red-600 cursor-pointer">volunteers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


