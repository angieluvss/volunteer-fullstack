import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'; // Import MUI components
import NavBar from '../components/NavigationBar'; // Import the NavBar component
import './VolunteerHistory.css'; // Import your custom CSS file

function VolunteerHistory() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Event 1',
      description: 'Description of event 1',
      location: 'Location 1',
      date: '2024-09-11',
      urgency: 'high',  
      status: 'yes'
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    urgency: 'low',
    status: 'no',
  });

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setNewEvent({ name: '', description: '', location: '', date: '', urgency: 'low', status: 'no' });
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to right, #febac2, #f68181)', 
      paddingTop: '0px', // Remove extra padding or margin above the content
      marginTop: '0px'
    }}>
      {/* Include the Navigation Bar */}
      <NavBar />

      <Container className="volunteer-history-container" maxWidth="md" sx={{ 
        backgroundColor: '#fefafa', 
        padding: '40px', 
        borderRadius: '20px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '50px',  // Adjust margin for spacing below navbar
        textAlign: 'center'
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
