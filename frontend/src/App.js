import React, { useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // Import the theme
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import VolunteerHistory from './pages/VolunteerHistory';
import AdminDashboard from './pages/AdminDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import VolunteerMatchingForm from './pages/volcards';

function App() {
  const [token, setToken] = useState(false); // login/logout
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar token={token} setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login setToken={setToken} />}/>
          <Route path='/register' element={<Register setToken={setToken} />}/>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer-history" element={<VolunteerHistory />} />
          <Route path="/volcards" element={<VolunteerMatchingForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
