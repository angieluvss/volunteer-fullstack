// src/pages/HeroPage.js
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import NavBar from '../components/NavigationBar'; // Import the reusable NavBar component

function HeroPage() {
  return (
    <div>
      {/* Navigation Bar */}
      <NavBar />  {/* Include the NavBar on the page */}

      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', padding: '2rem', backgroundImage: 'linear-gradient(to right, #febac2, #f68181)' }}>
        <Typography variant="h2" color="secondary" gutterBottom>
          MAKE CHANGE AT COOGS' HOUSE!
        </Typography>
        <Typography variant="h6" color="secondary">
          Become part of the Cougar Family committed to change
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
          Learn More
        </Button>
      </Box>
    </div>
  );
}

export default HeroPage;



