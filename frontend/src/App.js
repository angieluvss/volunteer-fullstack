import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // Import the theme
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './pages/HeroPage';
import VolunteerHistory from './pages/VolunteerHistory';
import AdminDashboard from './pages/AdminDashboard';
import VolunteerMatchingForm from './pages/volcards';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/heropage" element={<HeroPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/volunteer-history" element={<VolunteerHistory />} />
          <Route path="/volcards" element={<VolunteerMatchingForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
