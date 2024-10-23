import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
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

function App() {
  const [token, setToken] = useState(null); // Holds user token for authentication
  const [role, setRole] = useState(null); // Holds user role (admin/volunteer)
  const [volunteerFormCompleted, setVolunteerFormCompleted] = useState(false);
  const [adminSetupCompleted, setAdminSetupCompleted] = useState(false);

  // Check token and role on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role'); // Assuming role is also stored in localStorage
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);  // Set role if available
    }
  }, []);

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar
          token={token}
          role={role}  // Pass role to the NavBar
          setToken={setToken}
          setRole={setRole}
          volunteerFormCompleted={volunteerFormCompleted}
          setVolunteerFormCompleted={setVolunteerFormCompleted}
          adminSetupCompleted={adminSetupCompleted}
          setAdminSetupCompleted={setAdminSetupCompleted}
          handleLogout={handleLogout}  // Added logout handling
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
          <Route path="/register" element={<Register setToken={setToken} setRole={setRole} />} />

          {/* Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={token && role === 'admin' ? <AdminDashboard token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="/volunteer-dashboard"
            element={token && role === 'volunteer' ? <VolunteerDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/volunteermanagmentform"
            element={token && role === 'volunteer' ? <VolunteerDashboard /> : <Navigate to="/login" />}
          />

          <Route path="/volunteer-history" element={<VolunteerHistory />} />
          <Route path="/volcards" element={<VolunteerMatchingForm />} />
          <Route path="/eventmanagmentform" element={<EventForm setAdminSetupCompleted={setAdminSetupCompleted} />} />
          <Route path="/notifs" element={<Notifications />} />
          <Route path="/verify" element={<Verification setAdminSetupCompleted={setAdminSetupCompleted} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;