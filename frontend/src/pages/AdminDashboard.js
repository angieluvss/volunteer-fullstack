import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import NavBar from '../components/NavigationBar'; // Import the updated NavBar component

function AdminDashboard() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Navigation Bar with only the logout button */}
      <NavBar isLogoutOnly={true} /> {/* Only shows the logout button */}

      <Box sx={{ textAlign: 'left', padding: '20rem', paddingTop: '3rem' }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '2rem', textAlign: 'left' }}>
          Welcome Admin
        </Typography>

        {/* Flexbox for "Create Event" and "Run Matches" */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <Button 
            variant="outlined" 
            sx={{
              fontSize: '1.25rem',
              padding: '1rem 5rem',
              borderWidth: '2px',
              borderColor: '#e21c34',
              '&:hover': {
                backgroundColor: '#e21c34',
                color: '#ffffff',
              },
              flex: '1 1 300px', 
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            Create Event
          </Button>

          <Button 
            variant="contained" 
            sx={{
              fontSize: '1.25rem',
              padding: '1rem 5rem',
              backgroundColor: '#e21c34',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#d0172b',
              },
              flex: '1 1 300px',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            Run Matches
          </Button>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'left' }}>
          Manage Events
        </Typography>

        {/* Flexbox for Event Cards */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 300px', textAlign: 'center', maxWidth: '400px' }}>
            {[1, 1, 1].map((event, index) => (
              <Box 
                key={index} 
                sx={{
                  marginBottom: '1.5rem',
                  padding: '1.5rem',
                  border: '1px solid #e21c34',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Event {event}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <Typography variant="body1" color="primary" sx={{ cursor: 'pointer' }}>
                    edit
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ cursor: 'pointer' }}>
                    volunteers
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ flex: '1 1 300px', textAlign: 'center', maxWidth: '400px' }}>
            {[2, 2, 2].map((event, index) => (
              <Box 
                key={index} 
                sx={{
                  marginBottom: '1.5rem',
                  padding: '1.5rem',
                  border: '1px solid #e21c34',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Event {event}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <Typography variant="body1" color="primary" sx={{ cursor: 'pointer' }}>
                    edit
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ cursor: 'pointer' }}>
                    volunteers
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default AdminDashboard;
