import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function VolunteerHistory() {
  const [events, setEvents] = useState([]); // State to store events

  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    urgency: 'low',
    skills: '',
    status: 'no',
  });

  // Use useEffect to fetch events from the backend when the component loads
  useEffect(() => {
    axios.get('http://localhost:4000/api/volunteer-history') // Ensure the URL matches your backend API
      .then((response) => {
        setEvents(response.data); // Update events state with data from the backend
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []); // Empty dependency array ensures this runs once when component mounts

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setNewEvent({ name: '', description: '', location: '', date: '', urgency: 'low', skills: '', status: 'no' });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to right, #febac2, #f68181)', 
      paddingTop: '0px', 
      marginTop: '0px'
    }}>
      <Container className="volunteer-history-container" maxWidth="lg" sx={{  
        backgroundColor: '#fefafa', 
        padding: '40px', 
        borderRadius: '20px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '100px',  
        textAlign: 'center',
        width: '80%'
      }}>
        <Typography variant="h4" gutterBottom>
          Volunteer History
        </Typography>

        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <TextField
            label="Event Name"
            name="name"
            value={newEvent.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Event Description"
            name="description"
            value={newEvent.description}
            onChange={handleChange}
          />
          <TextField
            label="Location"
            name="location"
            value={newEvent.location}
            onChange={handleChange}
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={newEvent.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Skills Required"
            name="skills"
            value={newEvent.skills}
            onChange={handleChange}
            placeholder="Leadership, Communication"
          />
          <Button variant="contained" color="primary" type="submit" sx={{ height: '55px' }}>
            Add Event
          </Button>
        </form>

        <TableContainer component={Paper} className="event-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Event Name</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Urgency</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Skills Required</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell className={event.urgency === 'high' ? 'high-urgency' : 'low-urgency'}>
                    {event.urgency}
                  </TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.skills}</TableCell>
                  <TableCell className={event.status === 'yes' ? 'status-yes' : 'status-no'}>
                    {event.status === 'yes' ? '✔️' : '❌'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default VolunteerHistory;

