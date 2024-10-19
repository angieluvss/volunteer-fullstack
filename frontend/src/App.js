//frontend\src\App.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // Import the theme
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import VolunteerHistory from './pages/VolunteerHistory';
import AdminDashboard from './pages/AdminDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import VolunteerMatchingForm from './pages/volcards';
import Volunteermanagmentform from './pages/Volunteermanagmentform2';
import EventForm from './pages/Eventmanagmentform2';
import Notifications from './pages/notifs';
import Verification from './pages/Verification';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Retrieve token from localStorage initially

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // Save token to localStorage
    } else {
      localStorage.removeItem('token'); // Remove token if not present
    }
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* The NavBar will appear on all pages */}
        <NavBar token={token} setToken={setToken} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />

          {/* Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute token={token}>
                <AdminDashboard token={token} setToken={setToken} />
              </PrivateRoute>
            }
          />
          <Route
            path="/volunteer-dashboard"
            element={
              <PrivateRoute token={token}>
                <VolunteerDashboard token={token} />
              </PrivateRoute>
            }
          />

          {/* Unprotected Routes */}
          <Route path="/volunteer-history" element={<VolunteerHistory />} />
          <Route path="/volcards" element={<VolunteerMatchingForm />} />
          <Route path="/volunteermanagmentform" element={<Volunteermanagmentform />} />
          <Route path="/eventmanagmentform" element={<EventForm />} />
          <Route path="/notifs" element={<Notifications />} />
          <Route path="/verify" element={<Verification />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;