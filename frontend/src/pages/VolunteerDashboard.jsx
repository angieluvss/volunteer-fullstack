import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Button, Modal, Box, Typography, Tabs, Tab, Card, CardContent, Grid } from '@mui/material';
import { BellIcon, CalendarDateRangeIcon, MapPinIcon, ListBulletIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './VolunteerDashboard.css'; // Custom CSS for additional styling
import { jwtDecode } from 'jwt-decode'; 
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import axios from 'axios';

const VolunteerDashboard = () => {
    const navigate = useNavigate();

    // State to hold volunteer name
    const [volunteerName, setVolunteerName] = useState('Volunteer');
    const [volunteerProfileId, setVolunteerProfileId] = useState(null);

    // State to hold RSVP and Scheduled events
    const [rsvpEvents, setRsvpEvents] = useState([]);
    const [scheduledEvents, setScheduledEvents] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    //const [availabilityDates, setAvailabilityDates] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [rejectConfirmationOpen, setRejectConfirmationOpen] = useState(false);
    const [showUnregisterButton, setShowUnregisterButton] = useState(false); //for the modal of events in calendar view

    const [calendarMode, setCalendarMode] = useState('specific'); // 'specific' or 'blocked'

    const [specificDatesToDelete, setSpecificDatesToDelete] = useState([]);
    const [blockedDatesToDelete, setBlockedDatesToDelete] = useState([]);

    // check to not have duplicate dates
    const [initialBlockedDates, setInitialBlockedDates] = useState([]);
    const [initialSpecificDates, setInitialSpecificDates] = useState([]);

    // State for general availability, specific dates, and blocked dates
    const [generalAvailability, setGeneralAvailability] = useState({
        Monday: { start: "", end: "" },
        Tuesday: { start: "", end: "" },
        Wednesday: { start: "", end: "" },
        Thursday: { start: "", end: "" },
        Friday: { start: "", end: "" },
        Saturday: { start: "", end: "" },
        Sunday: { start: "", end: "" },
      });
      
    const [specificDates, setSpecificDates] = useState([]); // Specific dates
    const [blockedDates, setBlockedDates] = useState([]);   // Blocked dates


    // Handle changes to specific date times
    const handleSpecificDateTimeChange = (id, field, value) => {
    setSpecificDates((prev) =>
        prev.map((entry) => {
        const identifier = entry._id || entry.tempId;
        if (identifier === id) {
            return { ...entry, [field]: value, isAllDay: false }; // Uncheck "Available all day" when times are set
        }
        return entry;
        })
    );
    };

    // Handle Block Entire Day Checkbox Change
    const handleBlockEntireDayChange = (id, isChecked) => {
        setBlockedDates((prev) =>
        prev.map((entry) => {
            const identifier = entry._id || entry.tempId;
            if (identifier === id) {
            return { ...entry, isAllDay: isChecked };
            }
            return entry;
        })
        );
    };

    // Handle changes to blocked date times
    const handleBlockedDateTimeChange = (id, field, value) => {
        setBlockedDates((prev) =>
        prev.map((entry) => {
            const identifier = entry._id || entry.tempId;
            if (identifier === id) {
            return { ...entry, [field]: value, isAllDay: false }; // Uncheck "Block Entire Day" when times are set
            }
            return entry;
        })
        );
    };

    // Fetch availability from the backend
    const fetchAvailability = async () => {
        try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
    
        const response = await axios.get('http://localhost:4000/api/volunteers/availability', {
            headers: { Authorization: `Bearer ${token}` },
        });
    
        const { general = {}, specific = [], blocked = [] } = response.data.availability || {};

        // Save initial states
        setInitialBlockedDates(blocked.map(entry => ({ ...entry, date: new Date(entry.date) })));
        setInitialSpecificDates(specific.map(entry => ({ ...entry, date: new Date(entry.date) })));
    
        // Ensure all days of the week have default values
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const defaultGeneral = daysOfWeek.reduce((acc, day) => {
            acc[day] = { start: '', end: '' };
            return acc;
        }, {});
    
        // Merge default values with fetched general availability
        setGeneralAvailability({ ...defaultGeneral, ...general });
    
        // Map over specific and blocked dates to include _id and convert date strings to Date objects
        setSpecificDates(
            specific.map((entry) => ({
              _id: entry._id,
              date: new Date(entry.date),
              start: entry.start || '',
              end: entry.end || '',
              isAllDay: entry.isAllDay || false,
            }))
          );

          setBlockedDates(
            blocked.map((entry) => ({
              _id: entry._id,
              date: new Date(entry.date),
              start: entry.start || '',
              end: entry.end || '',
              isAllDay: entry.isAllDay || false,
            }))
          );
        } catch (error) {
        console.error('Error fetching availability:', error);
        }
    };

    const hasChanged = (entry, original) => {
        if (!original) return true; // New entry, consider it changed
        return (
            entry.date.toISOString() !== original.date.toISOString() ||
            entry.start !== original.start ||
            entry.end !== original.end ||
            entry.isAllDay !== original.isAllDay
        );
    };
    
    // Call the fetchAvailability function inside useEffect
    useEffect(() => {
        fetchAvailability();
    }, []);
  
    // Save availability to the backend
    const handleSaveAvailability = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
    
            // Helper function to compare entries
            const hasChanged = (entry, original) => {
                if (!original) return true; // New entry, always considered changed
                return (
                    entry.date.toISOString() !== original.date.toISOString() ||
                    entry.start !== original.start ||
                    entry.end !== original.end ||
                    entry.isAllDay !== original.isAllDay
                );
            };
    
            // Filter specificDates for new or changed entries
            const changedSpecificDates = specificDates.filter(entry => {
                const original = initialSpecificDates.find(orig => orig._id === entry._id);
                return hasChanged(entry, original); // Include if changed or new
            });
    
            // Filter blockedDates for new or changed entries
            const changedBlockedDates = blockedDates.filter(entry => {
                const original = initialBlockedDates.find(orig => orig._id === entry._id);
                return hasChanged(entry, original); // Include if changed or new
            });
    
            // Include IDs of deleted specific dates
            const deletedSpecificDates = initialSpecificDates
                .filter(entry => !specificDates.some(updated => updated._id === entry._id))
                .map(entry => entry._id);
    
            // Include IDs of deleted blocked dates
            const deletedBlockedDates = initialBlockedDates
                .filter(entry => !blockedDates.some(updated => updated._id === entry._id))
                .map(entry => entry._id);
    
            // Prepare data to send
            const updates = {
                generalAvailability, // Include general availability
                specificDates: changedSpecificDates.map(entry => ({
                    _id: entry._id,
                    date: entry.date.toISOString(),
                    start: entry.start || '',
                    end: entry.end || '',
                    isAllDay: entry.isAllDay || false,
                })),
                blockedDates: changedBlockedDates.map(entry => ({
                    _id: entry._id,
                    date: entry.date.toISOString(),
                    start: entry.start || '',
                    end: entry.end || '',
                    isAllDay: entry.isAllDay || false,
                })),
                specificDatesToDelete: deletedSpecificDates,
                blockedDatesToDelete: deletedBlockedDates,
            };
    
            // Send the updates to the backend
            await axios.patch('http://localhost:4000/api/volunteers/availability', updates, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            // Update initial states with the current state after saving
            setInitialSpecificDates([...specificDates]);
            setInitialBlockedDates([...blockedDates]);
    
            // Clear the deletion lists after successful update
            setSpecificDatesToDelete([]);
            setBlockedDatesToDelete([]);
    
            alert('Availability updated successfully!');
        } catch (error) {
            if (error.response && error.response.data.msg) {
                alert(error.response.data.msg);
            } else {
                console.error('Error saving availability:', error);
                alert('Failed to save availability.');
            }
        }
    }; 
    
    // fetch name of user from backend
    useEffect(() => {
        const fetchVolunteerProfile = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    console.error("No token found");
                    return;
                }

                // Fetch the volunteer profile to get the correct _id
                const volunteerProfileResponse = await axios.get("http://localhost:4000/api/volunteers/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
        
                setVolunteerProfileId(volunteerProfileResponse.data._id);
    
                // Extract name and _id
                const { firstName, confirmedEvents } = volunteerProfileResponse.data;
                // Set state
                setVolunteerName(firstName);

                // Fetch full event details for confirmed events
                const eventDetailsPromises = confirmedEvents.map(eventId =>
                    axios.get(`http://localhost:4000/api/events/${eventId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                );
                const eventDetails = await Promise.all(eventDetailsPromises);

                // Map the event details and set the state
                setScheduledEvents(eventDetails.map(event => event.data));

            } catch (error) {
                console.error("Error fetching volunteer profile:", error.message);
                if (error.response) {
                    console.error("Error status:", error.response.status);
                    console.error("Error data:", error.response.data);
                }
            }
        };
    
        fetchVolunteerProfile();
    }, []);
    
    
    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
    
            // Fetch RSVP events
            const rsvpResponse = await axios.get("http://localhost:4000/api/events/available", {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            // Debug: Log the events and volunteerProfileId
            console.log("Fetched RSVP Events:", rsvpResponse.data);
    
            // Filter events where the volunteer is matched
            const filteredRsvpEvents = rsvpResponse.data.filter((event) => {
                console.log(`Checking Event: ${event.name}`);
    
                if (!Array.isArray(event.matchedVolunteers)) {
                    console.error("matchedVolunteers is not an array:", event.matchedVolunteers);
                    return false;
                }
    
                const isMatched = event.matchedVolunteers.some((id) => {
                    const eventVolunteerId = String(id).trim(); // Ensure ObjectId is converted to string
                    const volunteerProfileIdStr = String(volunteerProfileId).trim(); // Ensure _id is a string
                    console.log(
                        `Comparing Event Volunteer ID: ${eventVolunteerId} with Volunteer Profile ID: ${volunteerProfileIdStr}`
                    );
                    return eventVolunteerId === volunteerProfileIdStr; // Compare strings
                });
    
                console.log(`Event Matched: ${isMatched}`);
                return isMatched; // Keep only matched events
            });
    
            console.log("Filtered RSVP Events:", filteredRsvpEvents);
            setRsvpEvents(filteredRsvpEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };
    
    useEffect(() => {
        if (volunteerProfileId) {
            console.log("volunteerProfileId is now set:", volunteerProfileId);
            fetchEvents();
        }
    }, [volunteerProfileId]);

    // Sort events by urgency (high > medium > low)
    const sortedEvents = rsvpEvents.sort((a, b) => {
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    });

    // Handle RSVP change
    const handleRSVPChange = async (eventId, value) => {
        if (!volunteerProfileId) {
            console.error("Volunteer Profile ID is null. Cannot register.");
            alert("Profile ID is not set yet. Please wait or reload the page.");
            return;
        }
    
        if (value === 'confirmed') {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No token found");
                    return;
                }
    
                // Send RSVP request to the backend
                const response = await axios.post(
                    `http://localhost:4000/api/events/register-from-match/${eventId}`,
                    { volunteerId: volunteerProfileId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log("RSVP Response:", response.data);
    
                // Find the registered event
                const registeredEvent = rsvpEvents.find(event => event._id === eventId);
    
                // Update frontend state
                setRsvpEvents(prev => prev.filter(event => event._id !== eventId));
                setScheduledEvents(prev => [...prev, registeredEvent]);
    
                alert("Successfully registered for the event!");
            } catch (error) {
                console.error("RSVP Error:", error);
                alert("Failed to register for the event.");
            }
        } else if (value === 'rejected') {

            const selected = rsvpEvents.find((event) => event._id === eventId);

            if (selected) {
                setSelectedEvent(selected);
                setRejectConfirmationOpen(true);
            }

            // try {
            //   const token = localStorage.getItem('token');
            //   if (!token) {
            //     console.error("No token found");
            //     return;
            //   }
        
            //   // Send rejection request to the backend
            //   await axios.post(
            //     `http://localhost:4000/api/events/reject/${eventId}`,
            //     { eventId, volunteerId: volunteerProfileId },
            //     { headers: { Authorization: `Bearer ${token}` } }
            //   );
        
            //   // Update state
            //   setRsvpEvents(prev => prev.filter(event => event._id !== eventId));
        
            //   alert("Successfully rejected the event!");
            // } catch (error) {
            //   console.error("Rejection Error:", error);
            //   alert("Failed to reject the event.");
            // }
        }
    };

    const handleRejectAttendance = async () => {
        if (!selectedEvent) {
            console.error("No selected event for rejection");
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found");
                return;
            }
    
            // Send rejection request to the backend
            await axios.post(
                `http://localhost:4000/api/events/reject/${selectedEvent._id}`,
                { eventId: selectedEvent._id, volunteerId: volunteerProfileId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            // Update state to remove the rejected event
            setRsvpEvents((prev) => prev.filter((event) => event._id !== selectedEvent._id));
            setRejectConfirmationOpen(false); // Close the modal
            setSelectedEvent(null); // Clear the selected event
            alert("Successfully rejected the event!");
        } catch (error) {
            console.error("Rejection Error:", error);
            alert("Failed to reject the event.");
        }
    };
    
    

    const handleUnregister = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found");
                return;
            }
    
            // Send a request to the backend to unregister the volunteer from the event
            await axios.post(
                'http://localhost:4000/api/events/unregister',
                { eventId, volunteerId: volunteerProfileId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            // Update frontend state
            const unregisteredEvent = scheduledEvents.find(event => event._id === eventId);
            setScheduledEvents((prev) => prev.filter(event => event._id !== eventId));
    
            // Add the unregistered event back to RSVP
            setRsvpEvents((prev) => [...prev, unregisteredEvent]);
    
            alert("Successfully unregistered from the event!");
        } catch (error) {
            console.error("Error unregistering from event:", error);
            alert("Failed to unregister from the event.");
        }
    };
    
    // Handle open/close modal
    const handleOpenModal = (event, fromCalendar = false) => {
        setSelectedEvent(event);
        setOpenModal(true);
        setShowUnregisterButton(fromCalendar); // Set true only for calendar events
        console.log("Event ID being sent to register:", event._id);  // Add this log
    };
    

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedEvent(null);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleGeneralAvailabilityChange = (day, field, value) => {
        setGeneralAvailability((prev) => ({
        ...prev,
        [day]: {
            ...prev[day],
            [field]: value,
        },
        }));
    };

    // Handle adding a specific date
    const handleAddSpecificDate = (date) => {
        // Check if the date is in the blockedDates list
        const isBlocked = blockedDates.some(
            (entry) => entry.date.toDateString() === date.toDateString()
        );
    
        if (isBlocked) {
            alert("This date is currently blocked. Please unblock it before marking it as available.");
            return;
        }
    
        // Check if the date already exists in specificDates
        const dateExists = specificDates.some(
            (entry) => entry.date.toDateString() === date.toDateString()
        );
    
        if (!dateExists) {
            setSpecificDates((prev) => [
                ...prev,
                { tempId: uuidv4(), date, start: "", end: "", isAllDay: true },
            ]);
        } else {
            alert("This date is already added.");
        }
    };
    
    
    // Remove a specific date
    const handleRemoveSpecificDate = (id) => {
        setSpecificDates((prev) => prev.filter((entry) => {
          const identifier = entry._id || entry.tempId;
          return identifier !== id;
        }));
        if (isValidObjectId(id)) {
          setSpecificDatesToDelete((prev) => [...prev, id]);
        }
      };

    // Handle adding a blocked date
    const handleBlockDate = (date) => {
        const isSpecific = specificDates.some(
            (entry) => entry.date.toDateString() === date.toDateString()
        );
    
        if (isSpecific) {
            alert(
                'This date is currently marked as available. Please remove it from specific dates before blocking it.'
            );
            return;
        }
    
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const isGeneralAvailable =
            generalAvailability[dayOfWeek]?.start && generalAvailability[dayOfWeek]?.end;
    
        const dateExists = blockedDates.some(
            (entry) => entry.date.toDateString() === date.toDateString()
        );
    
        if (!dateExists) {
            setBlockedDates((prev) => [
                ...prev,
                { tempId: uuidv4(), date, start: '', end: '', isAllDay: true },
            ]);
        } else {
            alert('This date is already blocked.');
        }
    };
    
    // Remove a blocked date
    const handleRemoveBlockedDate = (id) => {
        setBlockedDates((prev) =>
        prev.filter((entry) => {
            const identifier = entry._id || entry.tempId;
            return identifier !== id;
        })
        );
        if (isValidObjectId(id)) {
        setBlockedDatesToDelete((prev) => [...prev, id]);
        }
    };

    // Handle "Available All Day" Checkbox Change
    const handleSpecificDateAllDayChange = (id, isChecked) => {
    setSpecificDates((prev) =>
        prev.map((entry) => {
        const identifier = entry._id || entry.tempId;
        if (identifier === id) {
            if (isChecked) {
            // Clear start and end times when available all day
            return { ...entry, isAllDay: true, start: '', end: '' };
            } else {
            // Keep start and end times as they are
            return { ...entry, isAllDay: false };
            }
        }
        return entry;
        })
    );
    };

  
    
    // Helper function to check if an ID is a valid MongoDB ObjectId
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  

                    
    return (
        <section className='snap-start min-h-screen flex pt-28 justify-center font-medium font-[Inter] bg-snow'>
            <div className='flex flex-col w-3/4 gap-8'>
                {/* Header Section */}
                <div className='header-container flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0'>
                    <div className='flex flex-col items-center md:items-start'>
                        <h1 className='text-4xl md:text-5xl font-bold text-lava_black text-center md:text-left'>
                            Hello {volunteerName}
                        </h1>
                        <button className='edit-profile-button mt-2 text-sm text-gray-500 hover:underline' onClick={() => navigate('/volunteermanagmentform', { state: { isEditing: true } })}>
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
                                            <TableCell sx={{ fontFamily: 'Inter', color: '#352F36', border: '1px solid #E7E7E7', padding: '12px' }}>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
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
                                        const events = scheduledEvents.filter(e => new Date(e.date).toDateString() === date.toDateString());
                                        return events.length > 0 ? (
                                            <div className='calendar-event-tile-container'>
                                                {events.map((event, index) => (
                                                    <Typography
                                                        key={index}
                                                        className='calendar-event-text calendar-event-tile'
                                                        title={event.name}
                                                        onClick={() => handleOpenModal(event, true)}  // Pass true for calendar view
                                                        style={{ cursor: 'pointer', color: 'white' }}
                                                    >
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
                                    key={event._id} // Use event._id
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
                                        src={event.image || '/default-image.jpg'} // Use a default image if none exists
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

                                        {/* Event Date */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <CalendarDateRangeIcon className="h-6 w-6 text-gray-500" />
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontSize: '0.9rem',
                                                    fontFamily: 'Inter',
                                                    color: '#352F36',
                                                }}
                                            >
                                                {new Date(event.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </Typography>
                                        </Box>

                                        {/* Event Location */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <MapPinIcon className="h-6 w-6 text-gray-500" />
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontSize: '0.9rem',
                                                    fontFamily: 'Inter',
                                                    color: '#352F36',
                                                }}
                                            >
                                                {event.location}
                                            </Typography>
                                        </Box>

                                        {/* Skills Required */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <ListBulletIcon className="h-6 w-6 text-gray-500" />
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontSize: '0.9rem',
                                                    fontFamily: 'Inter',
                                                    color: '#352F36',
                                                }}
                                            >
                                                <strong>Skills Required:</strong>
                                                <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 1, ml: 1 }}>
                                                    {(event.skills || '').split(',').map((skill, index) => (
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
                                    </CardContent>
                                </Card>
                            ))}
                            </Grid>
                        )}

                    </div>
                </div>

                {/* Manage Availability Section */}
                <div className="mb-16">
                    <div className="py-5 px-4 md:px-10 border-2 border-light_pink bg-light_pink rounded-t-2xl">
                        <h1 className="text-2xl md:text-3xl font-bold bg-light_pink text-lava_black">Manage Your Availability</h1>
                    </div>

                    <div className="py-5 px-4 md:px-10 border-2 border-light_pink rounded-b-2xl flex flex-col gap-12">
                        {/* Availability Container */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
                            {/* General Availability */}
                            <div className="w-full">
                                <h2 className="text-xl md:text-2xl font-bold text-lava_black mb-4">General Availability</h2>
                                <div className="flex flex-col gap-4">
                                    {Object.keys(generalAvailability).map((day) => (
                                        <div key={day} className="flex flex-wrap items-center justify-between gap-4">
                                        <span className="text-base md:text-lg font-medium">{day}</span>
                                            <div className="flex flex-wrap gap-2">
                                                <input
                                                type="time"
                                                value={generalAvailability[day]?.start || ""}
                                                onChange={(e) =>
                                                    handleGeneralAvailabilityChange(day, "start", e.target.value)
                                                }
                                                className="border border-gray-300 rounded px-2 py-1 w-24"
                                                />
                                                <span>to</span>
                                                <input
                                                type="time"
                                                value={generalAvailability[day]?.end || ""}
                                                onChange={(e) =>
                                                    handleGeneralAvailabilityChange(day, "end", e.target.value)
                                                }
                                                className="border border-gray-300 rounded px-2 py-1 w-24"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Specific Dates */}
                            <div className="w-full">
                                <div className="flex items-center justify-between mb-4">
                                    {/* Title */}
                                    <h2 className="text-xl md:text-2xl font-bold text-lava_black">
                                        {calendarMode === 'specific' ? 'Available Specific Dates' : 'Not Available Blocked Dates'}
                                    </h2>

                                    {/* Toggle Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCalendarMode('specific')}
                                            className={`px-2 py-1 border rounded-md text-sm ${
                                                calendarMode === 'specific' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'
                                            }`}
                                        >
                                            Specific Dates
                                        </button>
                                        <button
                                            onClick={() => setCalendarMode('blocked')}
                                            className={`px-2 py-1 border rounded-md text-sm ${
                                                calendarMode === 'blocked' ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
                                            }`}
                                        >
                                            Blocked Dates
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full overflow-auto">
                                    <Calendar
                                        tileDisabled={({ date }) => {
                                            // Get the day of the week for the current date
                                            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

                                            // Check if general availability is active for the current day
                                            const isGeneralAvailable =
                                                generalAvailability[dayOfWeek] &&
                                                generalAvailability[dayOfWeek].start &&
                                                generalAvailability[dayOfWeek].end;

                                            // Disable the tile if in "specific" mode and general availability is active
                                            return calendarMode === 'specific' && isGeneralAvailable;
                                        }}
                                        tileContent={({ date }) => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0); // Ensure time is set to midnight for comparison
                                            
                                            if (date < today) {
                                                // Return nothing for past dates
                                                return null;
                                            }
                                    
                                            const isSpecific = specificDates.some(
                                                (entry) => entry.date.toDateString() === date.toDateString()
                                            );
                                            const isBlocked = blockedDates.some(
                                                (entry) => entry.date.toDateString() === date.toDateString()
                                            );
                                    
                                            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                                    
                                            const isGeneralAvailable =
                                                generalAvailability[dayOfWeek]?.start &&
                                                generalAvailability[dayOfWeek]?.end;
                                    
                                            if (isSpecific) {
                                                return (
                                                    <div className="calendar-event-tile-container">
                                                        <Typography
                                                            className="calendar-event-text calendar-event-tile"
                                                            style={{ cursor: "pointer", color: "green" }}
                                                        >
                                                            ✔
                                                        </Typography>
                                                    </div>
                                                );
                                            }
                                    
                                            if (isBlocked) {
                                                const color = isGeneralAvailable ? "blue" : "red";
                                                return (
                                                    <div className="calendar-event-tile-container">
                                                        <Typography
                                                            className="calendar-event-text calendar-event-tile"
                                                            style={{ cursor: "pointer", color }}
                                                        >
                                                            ✖
                                                        </Typography>
                                                    </div>
                                                );
                                            }
                                    
                                            if (isGeneralAvailable) {
                                                return (
                                                    <div className="calendar-event-tile-container">
                                                        <Typography
                                                            className="calendar-event-text calendar-event-tile"
                                                            style={{ cursor: "not-allowed", color: "blue" }}
                                                        >
                                                            ✔
                                                        </Typography>
                                                    </div>
                                                );
                                            }
                                    
                                            return null;
                                        }}
                                        onClickDay={(date) => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0); // Ensure time is set to midnight for comparison
                                    
                                            if (date < today) {
                                                // Prevent clicks on past dates
                                                return;
                                            }
                                    
                                            const isSpecific = specificDates.some(
                                                (entry) => entry.date.toDateString() === date.toDateString()
                                            );
                                            const isBlocked = blockedDates.some(
                                                (entry) => entry.date.toDateString() === date.toDateString()
                                            );
                                    
                                            if (calendarMode === 'specific') {
                                                if (isSpecific) {
                                                    // Deselect specific date
                                                    setSpecificDates((prev) =>
                                                        prev.filter((entry) => entry.date.toDateString() !== date.toDateString())
                                                    );
                                                } else {
                                                    // Add specific date
                                                    handleAddSpecificDate(date);
                                                }
                                            } else if (calendarMode === 'blocked') {
                                                if (isBlocked) {
                                                    // Deselect blocked date
                                                    setBlockedDates((prev) =>
                                                        prev.filter((entry) => entry.date.toDateString() !== date.toDateString())
                                                    );
                                                } else {
                                                    // Add blocked date
                                                    handleBlockDate(date);
                                                }
                                            }
                                        }}
                                        className="custom-calendar w-full"
                                        minDate={new Date()} // Prevent selection of past dates entirely
                                    />
                                </div>
                                {calendarMode === 'specific' ? (
                                    specificDates.map((entry) => (
                                        <div
                                            key={entry._id || entry.tempId}
                                            className="bg-light_pink p-4 rounded-lg shadow-md flex flex-col relative"
                                        >
                                            <Button
                                                onClick={() => handleRemoveSpecificDate(entry._id || entry.tempId)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: '8px',
                                                    right: '8px',
                                                    minWidth: '28px',
                                                    height: '28px',
                                                    padding: 0,
                                                    color: '#fff',
                                                    backgroundColor: '#ff4c4c',
                                                    borderRadius: '50%',
                                                    '&:hover': {
                                                        backgroundColor: '#ff7a7a',
                                                    },
                                                }}
                                            >
                                                ×
                                            </Button>
                                            <Typography sx={{ fontFamily: 'Inter', fontSize: '1rem', color: '#352F36' }}>
                                                {entry.date.toDateString()}
                                            </Typography>
                                            <div className="flex items-center gap-2 mt-2">
                                                <label className="flex items-center gap-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={entry.isAllDay}
                                                        onChange={(e) =>
                                                            handleSpecificDateAllDayChange(entry._id || entry.tempId, e.target.checked)
                                                        }
                                                    />
                                                    <span>Available all day</span>
                                                </label>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                                                <input
                                                    type="time"
                                                    value={entry.start || ''}
                                                    onChange={(e) =>
                                                        handleSpecificDateTimeChange(entry._id || entry.tempId, 'start', e.target.value)
                                                    }
                                                    className="border border-gray-300 rounded px-2 py-1 w-full sm:w-24"
                                                    disabled={entry.isAllDay}
                                                />
                                                <span className="text-center sm:text-left">to</span>
                                                <input
                                                    type="time"
                                                    value={entry.end || ''}
                                                    onChange={(e) =>
                                                        handleSpecificDateTimeChange(entry._id || entry.tempId, 'end', e.target.value)
                                                    }
                                                    className="border border-gray-300 rounded px-2 py-1 w-full sm:w-24"
                                                    disabled={entry.isAllDay}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    blockedDates.map((entry) => (
                                        <div
                                            key={entry._id || entry.tempId}
                                            className="bg-light_pink p-4 rounded-lg shadow-md flex flex-col relative"
                                        >
                                            <Button
                                                onClick={() => handleRemoveBlockedDate(entry._id || entry.tempId)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: '8px',
                                                    right: '8px',
                                                    minWidth: '28px',
                                                    height: '28px',
                                                    padding: 0,
                                                    color: '#fff',
                                                    backgroundColor: '#ff4c4c',
                                                    borderRadius: '50%',
                                                    '&:hover': {
                                                        backgroundColor: '#ff7a7a',
                                                    },
                                                }}
                                            >
                                                ×
                                            </Button>
                                            <Typography sx={{ fontFamily: 'Inter', fontSize: '1rem', color: '#352F36' }}>
                                                {entry.date.toDateString()}
                                            </Typography>
                                            <div className="flex items-center gap-2 mt-2">
                                                <label className="flex items-center gap-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={entry.isAllDay}
                                                        onChange={(e) =>
                                                            handleBlockEntireDayChange(entry._id || entry.tempId, e.target.checked)
                                                        }
                                                    />
                                                    <span>Block entire day</span>
                                                </label>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                                                <input
                                                    type="time"
                                                    value={entry.start || ''}
                                                    onChange={(e) =>
                                                        handleBlockedDateTimeChange(entry._id || entry.tempId, 'start', e.target.value)
                                                    }
                                                    className="border border-gray-300 rounded px-2 py-1 w-full sm:w-24"
                                                    disabled={entry.isAllDay}
                                                />
                                                <span className="text-center sm:text-left">to</span>
                                                <input
                                                    type="time"
                                                    value={entry.end || ''}
                                                    onChange={(e) =>
                                                        handleBlockedDateTimeChange(entry._id || entry.tempId, 'end', e.target.value)
                                                    }
                                                    className="border border-gray-300 rounded px-2 py-1 w-full sm:w-24"
                                                    disabled={entry.isAllDay}
                                                />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>


                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <Button
                                onClick={handleSaveAvailability}
                                sx={{
                                backgroundColor: "#4caf50",
                                color: "#fff",
                                "&:hover": { backgroundColor: "#45a049" },
                                padding: "10px 20px",
                                fontSize: "16px",
                                }}
                            >
                                Save Availability
                            </Button>
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
                                {/* Event Image (optional) */}
                                <div style={{ borderRadius: '16px 16px 0 0', overflow: 'hidden' }}>
                                    <img
                                        src={selectedEvent.image}  // If your events have images
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

                                    {/* Date */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <CalendarDateRangeIcon className="h-6 w-6 text-gray-500" />
                                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, fontFamily: 'Inter', color: '#352F36' }}>
                                            <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </Typography>
                                    </Box>
                                    
                                    {/* Location */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <MapPinIcon className="h-6 w-6 text-gray-500" />
                                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, fontFamily: 'Inter', color: '#352F36' }}>
                                            <strong>Location:</strong> {selectedEvent.address?.address1}, {selectedEvent.address?.city}, {selectedEvent.address?.state} {selectedEvent.address?.zipcode}
                                        </Typography>
                                    </Box>


                                    {/* Skills Required */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <ListBulletIcon className="h-6 w-6 text-gray-500" />
                                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, fontFamily: 'Inter', color: '#352F36' }}>
                                            <strong>Skills Required:</strong> 
                                            <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 1, ml: 1 }}>
                                                {selectedEvent.skillsRequired?.map((skill, index) => (
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

                                    {/* Event Description */}
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

                                    {/* Conditionally Render Unregister Button */}
                                    {showUnregisterButton && (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleUnregister(selectedEvent._id)}
                                            sx={{
                                                marginTop: '20px',
                                                backgroundColor: '#f44336',
                                                '&:hover': {
                                                    backgroundColor: '#d32f2f',
                                                },
                                            }}
                                        >
                                            Unregister from Event
                                        </Button>
                                    )}
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
                                onClick={handleRejectAttendance}
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