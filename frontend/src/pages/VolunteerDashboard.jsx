import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Button, Modal, Box, Typography, Tabs, Tab, Card, CardContent, Grid } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './VolunteerDashboard.css'; // Custom CSS for additional styling
import axios from 'axios'; // Adding Axios to fetch data from backend
import { assets } from '../assets/assets';
import { CalendarDateRangeIcon, MapPinIcon, ListBulletIcon, ExclamationCircleIcon, BellIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const VolunteerDashboard = () => {
    const navigate = useNavigate();
    const [volunteerName, setVolunteerName] = useState(''); // State to hold volunteer name
    const [rsvpEvents, setRsvpEvents] = useState([]); // State for RSVP events from backend
    const [openModal, setOpenModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [rejectConfirmationOpen, setRejectConfirmationOpen] = useState(false);
    const [scheduledEvents, setScheduledEvents] = useState([]); // Confirmed events
    const [tabIndex, setTabIndex] = useState(0);
    const [availabilityDates, setAvailabilityDates] = useState([]);

    // Fetch volunteer name and RSVP events from backend on load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:4000/api/volunteer/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                const { name, rsvpEvents, confirmedEvents, availability } = response.data;
                const convertedAvailability = availability.map(date => new Date(date)); // Convert dates from backend to Date objects
                setVolunteerName(name); // Set the volunteer's name
                setRsvpEvents(rsvpEvents); // Set RSVP events from backend
                setScheduledEvents(confirmedEvents); // Set confirmed events from backend
                setAvailabilityDates(convertedAvailability); // Set availability dates
            })
            .catch(error => {
                console.error("Error fetching dashboard data:", error);
            });
        } else {
            navigate('/login'); // Redirect to login if no token
        }
    }, [navigate]);

    // Handle RSVP change
    const handleRSVPChange = (id, value) => {
        const token = localStorage.getItem('token');
        if (value === 'rejected') {
            setSelectedEvent(rsvpEvents.find(event => event._id === id)); // Match by _id
            setRejectConfirmationOpen(true);
        } else if (value === 'confirmed') {
            axios.put(`http://localhost:4000/api/events/rsvp/${id}`, { status: 'confirmed' }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                const confirmedEvent = rsvpEvents.find(event => event._id === id); // Match by _id
                setScheduledEvents([...scheduledEvents, { ...confirmedEvent, status: 'confirmed' }]);
                setRsvpEvents(rsvpEvents.filter(event => event._id !== id));
            })
            .catch(error => {
                console.error("Error confirming RSVP:", error);
            });
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
            const newDate = new Date(date);
            // Toggle the date in the availabilityDates array
            if (prevDates.some((d) => new Date(d).toDateString() === newDate.toDateString())) {
                return prevDates.filter((d) => new Date(d).toDateString() !== newDate.toDateString());
            } else {
                return [...prevDates, newDate];
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
                            Hello {volunteerName || 'Volunteer'}
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
                        {rsvpEvents.length > 0 ? (
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
                                    {rsvpEvents.map((event) => (
                                        <TableRow key={event._id}>
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
                                            <TableCell sx={{ fontFamily: 'Inter', color: '#352F36', border: '1px solid #E7E7E7', padding: '12px' }}>
                                                {event.date && !isNaN(new Date(event.date)) ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No Date'}
                                            </TableCell>
                                            <TableCell sx={{ fontFamily: 'Inter', color: '#352F36', border: '1px solid #E7E7E7', padding: '12px' }}>
                                                <Select
                                                    value={event.status}
                                                    onChange={(e) => handleRSVPChange(event._id, e.target.value)}
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
                                        // Ensure both 'date' and 'd' are valid Date objects before calling toDateString
                                        if (availabilityDates.some((d) => d instanceof Date && d.toDateString() === date.toDateString())) {
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
                                                {event.date && !isNaN(new Date(event.date)) ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No Date'}
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
                                            {date && !isNaN(new Date(date)) ? new Date(date).toLocaleDateString('en-CA') : 'Invalid Date'}
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
            </div>
        </section>
    );
}

export default VolunteerDashboard;