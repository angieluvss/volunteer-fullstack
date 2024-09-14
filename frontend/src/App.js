// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventForm from './pages/Eventform';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event-form" element={<EventForm />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
    </div>
  );
}

export default App;
