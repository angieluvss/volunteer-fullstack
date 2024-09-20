// src/pages/Verification.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import NavBar from '../components/NavigationBar'; // Import Navigation Bar

function Verification() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to right, #febac2, #f68181)',
    }}>
      <NavBar /> {/* Navigation Bar */}
      
      <Box 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh'
        }}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Please wait for verification
        </Typography>

        {/* Button to manually trigger redirection */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/admin-dashboard')} // Redirects on button click
          sx={{ mt: 4 }}
        >
          Continue to Dashboard
        </Button>
      </Box>
    </div>
  );
}

export default Verification;
