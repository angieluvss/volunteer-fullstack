//frontend\src\pages\VolunteerHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function VolunteerHistory() {
  const [history, setHistory] = useState([]); // State to store volunteer history

  // Use useEffect to fetch events from the backend when the component loads
  useEffect(() => {
    const fetchVolunteerHistory = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (!token) {
          console.error("No token found.");
          return;
        }

        // Replace with your backend API endpoint to fetch volunteer history
        const response = await axios.get('http://localhost:4000/api/volunteers/history', {
          headers: {
            Authorization: `Bearer ${token}` // Attach token to request headers
          }
        });
        setHistory(response.data); // Set fetched history data to state
      } catch (error) {
        console.error("Error fetching volunteer history:", error);
      }
    };

    fetchVolunteerHistory();
  }, []); // Run only once when component mounts

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to right, #febac2, #f68181)', 
      paddingTop: '20px', 
    }}>
      <Container maxWidth="lg" sx={{  
        backgroundColor: '#fefafa', 
        padding: '40px', 
        borderRadius: '20px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '100px',  
        textAlign: 'center',
        width: '80%'
      }}>
        <Typography variant="h4" gutterBottom>
          Volunteer Event History
        </Typography>

        {history.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Event Name</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Skills Required</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.description}</TableCell>
                    <TableCell>
                      {`${event.address?.address1 || ''}, ${event.address?.city || ''}, ${event.address?.state || ''} ${event.address?.zipcode || ''}`}
                    </TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>{event.skillsRequired.join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h6" color="textSecondary" sx={{ marginTop: 3 }}>
            No event history available.
          </Typography>
        )}
      </Container>
    </div>
  );
}

export default VolunteerHistory;