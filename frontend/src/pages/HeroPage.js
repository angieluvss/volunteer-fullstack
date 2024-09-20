import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import NavBar from '../components/NavigationBar'; // Import the reusable NavBar component

function HeroPage() {
  return (
    <div>
      {/* Navigation Bar */}
      <NavBar />  {/* Include the NavBar on the page */}

      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center', 
        padding: '2rem', 
        backgroundColor: '#ffffff'  // Change background to white
      }}>
        <Typography variant="h2" color="textPrimary" gutterBottom sx={{ color: '#000000' }}>
          MAKE CHANGE AT COOGS' HOUSE!
        </Typography>
        <Typography variant="h6" color="textPrimary" sx={{ color: '#000000' }}>
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




