import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Button, Modal, Box, Typography, Tabs, Tab, Card, CardContent, Grid } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './VolunteerDashboard.css'; // Custom CSS for additional styling
import { assets } from '../assets/assets';
import { CalendarDateRangeIcon, MapPinIcon, ListBulletIcon, ExclamationCircleIcon, BellIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const VolunteerDashboard = () => {
    const navigate = useNavigate();

    // State to hold RSVP events for the volunteer
    const [rsvpEvents, setRsvpEvents] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [rejectConfirmationOpen, setRejectConfirmationOpen] = useState(false);
    const [scheduledEvents, setScheduledEvents] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [availabilityDates, setAvailabilityDates] = useState([]);

    // Use useEffect to fetch events from the backend when the component loads
    useEffect(() => {
        axios.get('http://localhost:4000/api/volunteer-dashboard')
            .then((response) => {
                // Add base URL for images to ensure they load correctly
                const eventsWithImages = response.data.map(event => ({
                    ...event,
                    image: `http://localhost:4000${event.image}`,
                }));
                setRsvpEvents(eventsWithImages); // Update the state with the data from the backend
            })
            .catch((error) => {
                console.error("There was an error fetching the events!", error);
            });
    }, []); // Empty dependency array ensures this runs once when component mounts

    // Sort events by urgency (high > medium > low)
    const sortedEvents = [...rsvpEvents].sort((a, b) => {
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    });

    // Handle RSVP change
    const handleRSVPChange = (id, value) => {
        const updatedEvent = rsvpEvents.find(event => event.id === id);
    
        if (value === 'rejected') {
            setSelectedEvent(updatedEvent);
            setRejectConfirmationOpen(true);
        } else {
            // Update status locally
            const updatedRSVPEvents = rsvpEvents.map(event => 
                event.id === id ? { ...event, status: value } : event
            );
    
            setRsvpEvents(updatedRSVPEvents);
    
            // Update status on the backend
            axios.put(`http://localhost:4000/api/volunteer-dashboard/${id}`, { status: value }) // Use the appropriate endpoint
                .then(response => {
                    console.log('Event status updated successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error updating the event status:', error);
                });
    
            if (value === 'confirmed') {
                setScheduledEvents([...scheduledEvents, { ...updatedEvent, status: 'confirmed' }]);
            }
        }
    };
    
    
    // Handle open/close modal
    const handleOpenModal = (event) => {
        setSelectedEvent(event);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedEvent(null);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleDateChange = (date) => {
        setAvailabilityDates((prevDates) => {
            // Toggle the date in the availabilityDates array
            if (prevDates.some((d) => d.toDateString() === date.toDateString())) {
                return prevDates.filter((d) => d.toDateString() !== date.toDateString());
            } else {
                return [...prevDates, date];
            }
        });
    };
    
    const removeDate = (dateToRemove) => {
        setAvailabilityDates((prevDates) =>
            prevDates.filter((date) => date.toDateString() !== dateToRemove.toDateString())
        );
    };
    
    return (
        <section className='snap-start min-h-screen flex pt-28 justify-center font-medium font-[Inter] bg-snow'>
            <div className='flex flex-col w-3/4 gap-8'>
                {/* Header Section */}
                <div className='header-container flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0'>
                    <div className='flex flex-col items-center md:items-start'>
                        <h1 className='text-4xl md:text-5xl font-bold text-lava_black text-center md:text-left'>
                            Hello [Volunteer Name]
                        </h1>
                        <button className='edit-profile-button mt-2 text-sm text-gray-500 hover:underline'>
                            edit profile
                        </button>
                        <button onClick={() => navigate('/volunteer-history')} className='edit-profile-button mt-2 text-sm text-gray-500 hover:underline'>
                            view event history
                        </button>
                    </div>
                    <button onClick={() => navigate('/notifs')} className='bell-container mt-2 md:mt-0'>
                        <BellIcon className='h-8 w-8 text-dark_gray cursor-pointer hover:text-shasta_red transition-colors duration-200' />
                    </button>
                </div>
                
                {/* RSVP Waiting Section */}
                <div>
                    <div className='py-5 px-10 border-2 border-light_pink bg-light_pink rounded-t-2xl'>
                        <h1 className='text-3xl font-bold bg-light_pink text-lava_black'>RSVP Waiting</h1>
                    </div>
                    <div className='px-10 border-2 border-light_pink rounded-b-2xl'>
                        {sortedEvents.length > 0 ? (
                            <TableContainer className="rsvp-table" sx={{ margin: 0, overflowX: 'auto' }}>
                                <Table sx={{ borderCollapse: 'collapse', minWidth: '1000px', tableLayout: 'fixed' }}>
                                    <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: '37%', fontFamily: 'Inter', color: '#352F36', border: '1px solid #E7E7E7', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}><strong>Event Name</strong></TableCell>
                                        <TableCell sx={{ width: '17%', fontFamily: 'Inter', color: '#352F36', border: '1px solid #E7E7E7', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}><strong>Event Description</strong></TableCell>
                                        <TableCell sx={{ width: '20%', fontFamily: 'Inter', color: '#352F36', border: '1px solid #E7E7E7', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}><strong>Event Date</strong></TableCell>
                                        <TableCell sx={{ width: '26%', fontFamily: 'Inter', color: '#352F36', border: '1px solid #E7E7E7', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}><strong>RSVP</strong></TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {sortedEvents.map((event) => (
                                        <TableRow key={event.id}>
                                            <TableCell sx={{ fontFamily: 'Inter', color: '#352F36', border: '1px solid #E7E7E7', padding: '12px' }}>{event.name}</TableCell>
                                            <TableCell sx={{ fontFamily: 'Inter', color: '#352F36', border: '1px solid #E7E7E7', padding: '12px' }}>
                                                <Button
                                                    variant="text"
                                                    onClick={() => handleOpenModal(event)}
                                                    sx={{
                                                        backgroundColor: '#ffbbc3',
                                                        color: '#352F36',
                                                        '&:hover': {
                                                            backgroundColor: '#f68181'
                                                        },
                                                        textTransform: 'none'
                                                    }}
                                                    >
                                                    View Event Details
                                                </Button>
                                            </TableCell>
                                            <TableCell sx={{ fontFamily: 'Inter', color: '#352F36', border: '1px solid #E7E7E7', padding: '12px' }}>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                                            <TableCell sx={{ fontFamily: 'Inter', color: '#352F36', border: '1px solid #E7E7E7', padding: '12px' }}>
                                                <Select
                                                    value={event.status}
                                                    onChange={(e) => handleRSVPChange(event.id, e.target.value)}
                                                    displayEmpty
                                                    sx={{ fontFamily: 'Inter', color: 'lava_black', py: 0, width: '100%', height: '40px', minHeight: 'unset' }}
                                                >
                                                    <MenuItem value="confirmed">Confirm Attendance</MenuItem>
                                                    <MenuItem value="rejected">Reject Attendance</MenuItem>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Typography sx={{ fontFamily: 'Inter', color: '#352F36', textAlign: 'center', paddingY: 5 }}>No events to RSVP...</Typography>
                        )}
                    </div>
                </div>

                {/* Scheduled Events */}
                <div>
                    <div className='py-5 px-10 border-2 border-light_pink bg-light_pink rounded-t-2xl'>
                        <h1 className='text-3xl font-bold bg-light_pink text-lava_black'>Scheduled Events</h1>
                    </div>
                    <div className='py-5 px-10 border-2 border-light_pink rounded-b-2xl'>

                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Scheduled Events Tabs">
                            <Tab label="Calendar View" />
                            <Tab label="Card View" />
                        </Tabs>

                        {/* CALENDAR VIEW */}
                        {tabIndex === 0 && (
                            <div className='mt-4 w-full'>
                                <Calendar
                                    tileContent={({ date, view }) => {
                                        const events = scheduledEvents.filter(e => new Date(e.date).toDateString() === date.toDateString());
                                        return events.length > 0 ? (
                                            <div className='calendar-event-tile-container'>
                                                {events.map((event, index) => (
                                                    <Typography key={index} className='calendar-event-text calendar-event-tile' title={event.name}>
                                                        {event.name}
                                                    </Typography>
                                                ))}
                                            </div>
                                        ) : null;
                                    }}
                                    className='custom-calendar w-full'
                                />
                            </div>
                        )}

                        {/* CARD VIEW */}
                        {tabIndex === 1 && (
                            <Grid
                                container
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: 4,
                                    mt: 4,
                                }}
                            >
                                {scheduledEvents.map((event) => (
                                    <Card
                                        key={event.id}
                                        sx={{
                                            borderRadius: '16px',
                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                            overflow: 'hidden',
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.02)',
                                            },
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                        }}
                                    >
                                        <img
                                            src={event.image}
                                            alt={event.name}
                                            style={{
                                                width: '100%',
                                                height: '180px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <CardContent sx={{ padding: 3, flexGrow: 1 }}>
                                            {/* Event Name */}
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                sx={{
                                                    fontFamily: 'Inter',
                                                    fontWeight: 'bold',
                                                    color: '#352F36',
                                                    mb: 2,
                                                    fontSize: { xs: '1rem', md: '1.25rem' },
                                                }}
                                            >
                                                {event.name}
                                            </Typography>

                                            {/* Date */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <CalendarDateRangeIcon className="h-6 w-6 text-gray-500" />
                                                <Typography variant="body1" sx={{ fontSize: '0.9rem', fontFamily: 'Inter', color: '#352F36' }}>
                                                    {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </Typography>
                                            </Box>

                                            {/* Location */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <MapPinIcon className="h-6 w-6 text-gray-500" />
                                                <Typography variant="body1" sx={{ fontSize: '0.9rem', fontFamily: 'Inter', color: '#352F36' }}>
                                                    {event.location}
                                                </Typography>
                                            </Box>

                                            {/* Skills Required */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <ListBulletIcon className="h-6 w-6 text-gray-500" />
                                                <Typography variant="body1" sx={{ fontSize: '0.9rem', fontFamily: 'Inter', color: '#352F36' }}>
                                                    <strong>Skills Required:</strong> 
                                                    <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 1, ml: 1 }}>
                                                        {event.skills.split(',').map((skill, index) => (
                                                            <span
                                                                key={index}
                                                                style={{
                                                                    background: '#f0f0f0',
                                                                    padding: '3px 8px',
                                                                    borderRadius: '8px',
                                                                    fontSize: '0.8rem',
                                                                }}
                                                            >
                                                                {skill.trim()}
                                                            </span>
                                                        ))}
                                                    </Box>
                                                </Typography>
                                            </Box>

                                            {/* Urgency */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <ExclamationCircleIcon className="h-6 w-6 text-gray-500" />
                                                <Typography variant="body1" sx={{ fontSize: '0.9rem', fontFamily: 'Inter', color: '#352F36' }}>
                                                    <strong>Urgency:</strong> 
                                                    <span
                                                        style={{
                                                            background: event.urgency === 'high' ? '#f8d7da' : event.urgency === 'medium' ? '#fff3cd' : '#d4edda',
                                                            padding: '3px 8px',
                                                            borderRadius: '8px',
                                                            fontSize: '0.8rem',
                                                            marginLeft: '8px',
                                                            color: '#000',
                                                        }}
                                                    >
                                                        {event.urgency}
                                                    </span>
                                                </Typography>
                                            </Box>

                                            {/* Description */}
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontFamily: 'Inter',
                                                    color: '#352F36',
                                                    fontSize: '0.9rem',
                                                    mt: 2,
                                                }}
                                            >
                                                {event.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Grid>
                        )}

                    </div>
                </div>

                {/* Select Next Months Availability */}
                <div className='mb-16'>
                    <div className='py-5 px-10 border-2 border-light_pink bg-light_pink rounded-t-2xl'>
                        <h1 className='text-3xl font-bold bg-light_pink text-lava_black'>Select Your Availability</h1>
                    </div>
                    <div className='py-5 px-10 border-2 border-light_pink rounded-b-2xl flex flex-col md:flex-row gap-8'>
                        {/* Calendar Component */}
                        <div className='w-full md:w-2/3'>
                            <Calendar
                                onClickDay={handleDateChange}
                                minDate={new Date()} // Prevent users from selecting previous dates
                                tileContent={({ date, view }) => {
                                    if (availabilityDates.some(d => d.toDateString() === date.toDateString())) {
                                        return (
                                            <div className='calendar-event-tile-container'>
                                                <Typography className='calendar-event-text calendar-event-tile' title="Available">
                                                    ✔
                                                </Typography>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                                className='custom-calendar w-full'
                            />
                        </div>

                        {/* Selected Dates List */}
                        <div className='w-full md:w-1/3'>
                            <h2 className='text-2xl font-bold text-lava_black mb-4'>Dates</h2>
                            <div className='flex flex-col gap-2'>
                                {availabilityDates.map((date, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between bg-light_pink p-2 rounded-lg shadow-md'
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: 'Inter',
                                                fontSize: '1rem',
                                                color: '#352F36',
                                            }}
                                        >
                                            {date.toLocaleDateString('en-CA')}
                                        </Typography>
                                        <Button
                                            onClick={() => removeDate(date)}
                                            sx={{
                                                minWidth: '28px',
                                                height: '28px',
                                                padding: 0,
                                                color: '#fff',
                                                backgroundColor: '#ff4c4c',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                '&:hover': {
                                                    backgroundColor: '#ff7a7a',
                                                },
                                            }}
                                        >
                                            ×
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                {/* Event Details Modal */}
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="event-details-title"
                    aria-describedby="event-details-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '90%', sm: '80%', md: 600 },
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            bgcolor: 'background.paper',
                            borderRadius: '16px',
                            boxShadow: 24,
                            p: 0,
                        }}
                    >
                        {selectedEvent && (
                            <div>
                                {/* Event Image */}
                                <div style={{ borderRadius: '16px 16px 0 0', overflow: 'hidden' }}>
                                    <img
                                        src={selectedEvent.image}
                                        alt={selectedEvent.name}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'cover',
                                            borderRadius: '16px 16px 0 0',
                                        }}
                                    />
                                </div>

                                {/* Event Details */}
                                <div style={{ padding: '20px' }}>
                                    <Typography
                                        id="event-details-title"
                                        variant="h4"
                                        sx={{
                                            fontFamily: 'Inter',
                                            fontWeight: 'bold',
                                            color: '#352F36',
                                            mb: 2,
                                            fontSize: { xs: '1.5rem', md: '2rem' },
                                        }}
                                    >
                                        {selectedEvent.name}
                                    </Typography>

                                    {/* Event Information with Icons */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <CalendarDateRangeIcon className="h-6 w-6 text-gray-500" />
                                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, fontFamily: 'Inter', color: '#352F36' }}>
                                            <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <MapPinIcon className="h-6 w-6 text-gray-500" />
                                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, fontFamily: 'Inter', color: '#352F36' }}>
                                            <strong>Location:</strong> {selectedEvent.location}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <ListBulletIcon className="h-6 w-6 text-gray-500" />
                                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, fontFamily: 'Inter', color: '#352F36' }}>
                                            <strong>Skills Required:</strong> 
                                            <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 1, ml: 1 }}>
                                                {selectedEvent.skills.split(',').map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        style={{
                                                            background: '#f0f0f0',
                                                            padding: '3px 8px',
                                                            borderRadius: '8px',
                                                            fontSize: '0.8rem',
                                                        }}
                                                    >
                                                        {skill.trim()}
                                                    </span>
                                                ))}
                                            </Box>
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <ExclamationCircleIcon className="h-6 w-6 text-gray-500" />
                                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, fontFamily: 'Inter', color: '#352F36' }}>
                                            <strong>Urgency:</strong> 
                                            <span
                                                style={{
                                                    background: selectedEvent.urgency === 'high' ? '#f8d7da' : selectedEvent.urgency === 'medium' ? '#fff3cd' : '#d4edda',
                                                    padding: '3px 8px',
                                                    borderRadius: '8px',
                                                    fontSize: '0.8rem',
                                                    marginLeft: '8px',
                                                    color: '#000',
                                                }}
                                            >
                                                {selectedEvent.urgency}
                                            </span>
                                        </Typography>
                                    </Box>

                                    <Typography
                                        id="event-details-description"
                                        sx={{
                                            fontFamily: 'Inter',
                                            color: '#352F36',
                                            fontSize: { xs: '0.9rem', md: '1rem' },
                                        }}
                                    >
                                        {selectedEvent.description}
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </Box>
                </Modal>


                {/* Confirmation of Rejecting event Modal */}
                <Modal
                    open={rejectConfirmationOpen}
                    onClose={() => setRejectConfirmationOpen(false)}
                    aria-labelledby="reject-confirmation-title"
                    aria-describedby="reject-confirmation-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            borderRadius: '12px',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <h2 id="reject-confirmation-title" className='text-3xl font-bold text-lava_black'>Are you sure?</h2>
                        <p id="reject-confirmation-description" className='text-lava_black mt-4'>
                            Are you sure you want to reject the event "{selectedEvent?.name}"?
                        </p>
                        <p className='text-shasta_red font-bold'>You will not be able to sign up again</p>
                        <div className='flex justify-end gap-4 mt-6'>
                            <Button
                                variant="outlined"
                                onClick={() => setRejectConfirmationOpen(false)}
                                sx={{
                                    color: '#352F36',
                                    borderColor: '#352F36',
                                    '&:hover': {
                                        backgroundColor: '#f2f2f2',
                                    },
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setRsvpEvents(rsvpEvents.filter(event => event.id !== selectedEvent.id));
                                    setRejectConfirmationOpen(false);
                                }}
                                sx={{
                                    backgroundColor: '#f68181',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#ff4c4c',
                                    },
                                }}
                            >
                                Reject
                            </Button>
                        </div>
                    </Box>
                </Modal>

            </div>
        </section>
    );
}

export default VolunteerDashboard;

// Volunteer Dashboard css file

