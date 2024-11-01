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
import { jwtDecode } from 'jwt-decode';
import { fetchProfileStatus } from './utils/fetchProfileStatus';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [volunteerFormCompleted, setVolunteerFormCompleted] = useState(
    localStorage.getItem('volunteerFormCompleted') || (role === 'admin' ? 'null' : 'not completed')
  );

  useEffect(() => {
    const initProfileStatus = async () => {
      try {
        if (token) {
          await fetchProfileStatus(setRole, setVolunteerFormCompleted);
        }
      } catch (error) {
        console.error("Failed to fetch profile status in App:", error);
      }
    };
    initProfileStatus();
  }, [token]);
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar
          token={token}
          setToken={setToken}
          role={role}
          setRole={setRole}
          volunteerFormCompleted={volunteerFormCompleted}
          setVolunteerFormCompleted={setVolunteerFormCompleted}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} setRole={setRole} setVolunteerFormCompleted={setVolunteerFormCompleted} />} />
          <Route path="/register" element={<Register setToken={setToken} setRole={setRole} setVolunteerFormCompleted={setVolunteerFormCompleted} />} />
          
          {/* Protected Routes */}
          <Route 
            path="/admin-dashboard" 
            element={token ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/volunteer-dashboard" 
            element={token ? <VolunteerDashboard /> : <Navigate to="/login" />} 
          />
          <Route path="/volunteer-history" element={<VolunteerHistory />} />
          <Route path="/volcards" element={<VolunteerMatchingForm />} />
          <Route path="/volunteermanagmentform" element={<Volunteermanagmentform setVolunteerFormCompleted={setVolunteerFormCompleted}/>} />
          <Route path="/eventmanagmentform" element={<EventForm />} />
          <Route path="/notifs" element={<Notifications />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;