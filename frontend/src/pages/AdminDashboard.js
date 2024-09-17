// src/pages/AdminDashboard.js
import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import NavBar from '../components/NavigationBar'; // Import Navigation Bar

function AdminDashboard() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to right, #febac2, #f68181)',
    }}>
      <NavBar /> {/* Navigation Bar */}

      <Box 
        sx={{
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome Admin
        </Typography>

        <Box sx={{ margin: '2rem 0' }}>
          <Button 
            variant="outlined" 
            color="primary" 
            sx={{ marginRight: '1rem' }}
          >
            Create Event
          </Button>
          <Button 
            variant="contained" 
            color="primary"
          >
            Run Matches
          </Button>
        </Box>

        {/* Manage Events Section */}
        <Typography variant="h6" gutterBottom>
          Manage Events
        </Typography>
        
        <Grid container spacing={2} justifyContent="center">
          {['Event 1', 'Event 2'].map((event, index) => (
            <Grid item key={index}>
              <Box 
                sx={{
                  border: '1px solid #e21c34', 
                  borderRadius: '8px', 
                  padding: '1rem',
                  textAlign: 'center',
                  width: '200px',
                }}
              >
                <Typography variant="body1">{event}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button size="small" color="secondary">edit</Button>
                  <Button size="small" color="secondary">volunteers</Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default AdminDashboard;
