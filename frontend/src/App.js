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
import { jwtDecode } from 'jwt-decode';  // Named import for jwt-decode


function App() {
  const [token, setToken] = useState(null); // Holds user token for authentication
  const [volunteerFormCompleted, setVolunteerFormCompleted] = useState(false); // Track volunteer form completion
  const [adminSetupCompleted, setAdminSetupCompleted] = useState(false); // Track admin initial setup completion

  // Check token expiration and remove it if expired
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken); // Decode the token
      const currentTime = Date.now() / 1000; // Get current time in seconds
      
      if (decodedToken.exp < currentTime) {
        // If the token has expired, clear it and redirect to login
        localStorage.removeItem('token');
        setToken(null);
      } else {
        // If the token is valid, set it in the state
        setToken(storedToken);
      }
    }
  }, []); // Runs once on component mount

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar
          token={token}
          setToken={setToken}
          volunteerFormCompleted={volunteerFormCompleted}
          setVolunteerFormCompleted={setVolunteerFormCompleted}
          adminSetupCompleted={adminSetupCompleted}
          setAdminSetupCompleted={setAdminSetupCompleted}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          
          {/* Protected Routes */}
          <Route 
            path="/admin-dashboard" 
            element={token ? <AdminDashboard token={token} setToken={setToken} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/volunteer-dashboard" 
            element={token ? <VolunteerDashboard /> : <Navigate to="/login" />} 
          />

          <Route path="/volunteer-history" element={<VolunteerHistory />} />
          <Route path="/volcards" element={<VolunteerMatchingForm />} />
          <Route path="/volunteermanagmentform" element={ <Volunteermanagmentform setVolunteerFormCompleted={setVolunteerFormCompleted} /> } />
          <Route path="/eventmanagmentform" element={ <EventForm setAdminSetupCompleted={setAdminSetupCompleted} /> } />
          <Route path="/notifs" element={<Notifications />} />
          <Route path="/verify" element={<Verification setAdminSetupCompleted={setAdminSetupCompleted} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
