import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // Import the theme
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './pages/HeroPage';
import VolunteerHistory from './pages/VolunteerHistory';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<VolunteerHistory />} />
          <Route path="/volunteer-history" element={<VolunteerHistory />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
