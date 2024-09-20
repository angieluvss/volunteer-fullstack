import React from 'react';
import NavBar from '../components/NavBar'; // Ensure the path is correct

const AdminDashboard = ({ token, setToken }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar with token and setToken passed in */}
      <NavBar token={token} setToken={setToken} />

      {/* Outer container to align content */}
      <div className="pt-32 flex flex-col items-center">
        <div className="w-full max-w-6xl px-8">  {/* Adjusted padding here for alignment */}
          <h2 className="text-5xl font-bold mb-8 text-red-600">Welcome Admin</h2>

          {/* Flexbox for "Create Event" and "Run Matches" */}
          <div className="flex justify-center gap-8 mb-12">
            <button className="text-2xl py-4 px-24 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all uppercase tracking-wider font-semibold rounded-lg">
              Create Event
            </button>

            <button className="text-2xl py-4 px-24 bg-red-600 text-white hover:bg-red-700 transition-all uppercase tracking-wider font-semibold rounded-lg">
              Run Matches
            </button>
          </div>

          <h4 className="text-3xl font-bold mb-6">Manage Events</h4>

          {/* Flexbox for Event Cards - centered content with same width as buttons */}
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
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

            <div className="text-center">
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
    </div>
  );
};

export default AdminDashboard;