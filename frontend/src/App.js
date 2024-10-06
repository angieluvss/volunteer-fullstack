import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // Import the theme
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  const [volunteerFormCompleted, setVolunteerFormCompleted] = useState(false); // Track volunteer form completion
  const [adminSetupCompleted, setAdminSetupCompleted] = useState(false); // Track admin initial setup completion
  
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
          <Route path="/admin-dashboard" element={<AdminDashboard token={token} setToken={setToken} />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
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