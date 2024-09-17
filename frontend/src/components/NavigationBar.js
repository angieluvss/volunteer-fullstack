import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLogoutOnly }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/heropage'); // Navigate to Hero Page on logout
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '2px solid #f68181' }}>
      <Toolbar>
        {/* Logo */}
        <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
          <img src="/Shasta.png" alt="Shasta Logo" style={{ width: '50px', height: '50px' }} />
        </IconButton>

        {/* Text next to the logo */}
        <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
          Shasta's Coogmunity Service
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Conditionally render the full nav or only the logout button */}
        {isLogoutOnly ? (
          <Button 
            onClick={handleLogout} 
            variant="contained" 
            sx={{
              backgroundColor: '#e21c34',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#feb8bf',  // Switch to #feb8bf on hover
                color: '#000',               // Text becomes black
              }
            }}>
            Log Out
          </Button>
        ) : (
          <>
            {/* About Us (underline on hover, no background color change) */}
            <Button 
              color="inherit" 
              component={Link} 
              to="/about" 
              sx={{ 
                color: '#333',
                textTransform: 'none',       // Keep text as-is
                '&:hover': {
                  backgroundColor: 'transparent', // Prevent background change
                  textDecoration: 'underline',  // Red underline on hover
                  textDecorationColor: '#e21c34',
                  color: '#333',                // Text remains the same
                }
              }}
            >
              About Us
            </Button>

            {/* Events (underline on hover, no background color change) */}
            <Button 
              color="inherit" 
              component={Link} 
              to="/events" 
              sx={{ 
                color: '#333',
                textTransform: 'none',       // Keep text as-is
                '&:hover': {
                  backgroundColor: 'transparent', // Prevent background change
                  textDecoration: 'underline',  // Red underline on hover
                  textDecorationColor: '#e21c34',
                  color: '#333',                // Text remains the same
                },
                mr: 1 // Adds spacing between Events and Login buttons
              }}
            >
              Events
            </Button>

            {/* Login (outlined button) */}
            <Button 
              variant="outlined" 
              component={Link} 
              to="/login" 
              sx={{ 
                color: '#333', 
                borderColor: '#e21c34', // Red outline
                '&:hover': {
                  backgroundColor: '#feb8bf',  // Background becomes #feb8bf on hover
                  color: '#000',               // Text becomes black
                  borderColor: '#feb8bf'       // Outline changes on hover
                }
              }}
            >
              Login
            </Button>

            {/* Get Started (filled button) */}
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/get-started" 
              sx={{ 
                ml: 2,
                backgroundColor: '#e21c34',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#feb8bf',  // Background becomes #feb8bf on hover
                  color: '#000',               // Text becomes black
                }
              }}
            >
              Get Started
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
