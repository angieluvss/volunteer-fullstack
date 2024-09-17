// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '2px solid #f68181' }}>
      <Toolbar>
        {/* Logo */}
        <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
          <img src="/Shasta.png" alt="Shasta Logo" style={{ width: '50px', height: '50px' }} />
        </IconButton>

        {/* Website Title */}
        <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
          Shasta's Coogmunity Service
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/about" sx={{ color: '#333' }}>
            About Us
          </Button>
          <Button color="inherit" component={Link} to="/events" sx={{ color: '#333' }}>
            Events
          </Button>

          {/* Login Button */}
          <Button color="inherit" component={Link} to="/login" sx={{ color: '#000000' }}>
            Login
          </Button>

          {/* Get Started Button */}
          <Button variant="contained" color="primary" component={Link} to="/get-started" sx={{ ml: 2 }}>
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
