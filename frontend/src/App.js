import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // Import the theme
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './pages/HeroPage';
import VolunteerHistory from './pages/VolunteerHistory';
import Verification from './pages/Verification';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/volunteer-history" element={<VolunteerHistory />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
