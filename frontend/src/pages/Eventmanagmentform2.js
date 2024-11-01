import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const EventForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isChangingEvent = location.state?.isChangingEvent || false;
  const event = location.state?.event || {}; // Get event data from state if editing

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    date: '',
    timeStart: '',
    timeEnd: '',
    skillsRequired: [],
    urgency: ''
  });

  const [states, setStates] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token'); // Retrieve token for authentication

  // Populate formData if editing an existing event
  useEffect(() => {
    if (isChangingEvent) {
      setFormData({
        name: event.name || '',
        description: event.description || '',
        address1: event.address?.address1 || '',
        address2: event.address?.address2 || '',
        city: event.address?.city || '',
        state: event.address?.state || '',
        zipcode: event.address?.zipcode || '',
        date: event.date ? new Date(event.date) : '', // Convert date to Date object if available
        timeStart: event.timeStart || '',
        timeEnd: event.timeEnd || '',
        skillsRequired: event.skillsRequired || [],
        urgency: event.urgency || ''
      });
    }
  }, [isChangingEvent, event]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/states');
        setStates(response.data); // Store fetched states
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, []);

  // Skill options for the event
  const skillOptions = [
    { value: 'Communication', label: 'Communication' },
    { value: 'Writing', label: 'Writing' },
    { value: 'Public Speaking', label: 'Public Speaking' },
    { value: 'Programming', label: 'Programming' },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle skills select change
  const handleSkillChange = (selectedOptions) => {
    setFormData({
      ...formData,
      skillsRequired: selectedOptions.map(option => option.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDate = new Date(formData.date);
    if (isNaN(selectedDate.getTime())) {
      setError('Invalid date selected');
      return;
    }

    const formattedDate = selectedDate.toISOString();

    try {
      if (isChangingEvent) {
        // Update existing event
        await axios.put(
          `http://localhost:4000/api/events/${event._id}`, // Update URL to match your API
          {
            ...formData,
            date: formattedDate,
            timeStart: formData.timeStart,
            timeEnd: formData.timeEnd
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create a new event
        await axios.post(
          'http://localhost:4000/api/events/create',
          {
            ...formData,
            date: formattedDate,
            timeStart: formData.timeStart,
            timeEnd: formData.timeEnd
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      navigate('/admin-dashboard');
    } catch (err) {
      console.error("Error during event creation:", err.response?.data);
      setError('Failed to create event');
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#faa0a5] pt-20">
        <div className="w-full max-w-6xl p-6 bg-white border-2 border-red-200 rounded-2xl shadow-lg mt-7">
          <h2 className="mb-5 text-2xl xl:text-5xl font-extrabold text-center text-[#e21c34]">Event Management Form</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>

            <div className='flex flex-col items-center'>
              {/* Event Name */}
              <div className="mb-4 w-[50%]">
                <label htmlFor="name" className="block mb-2 font-bold">Event Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter event name here *"
                  maxLength={100}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
              </div>

              {/* Event Description */}
              <div className="mb-4 w-[50%]">
                <label htmlFor="description" className="block mb-2 font-bold">Event Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Enter event description here *"
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Event Location */}
            <div className="mb-4">
              <label className="block mb-2 font-bold">Event Location *</label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  placeholder="Address 1 *"
                  maxLength={100}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  placeholder="Address 2"
                  maxLength={100}
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City *"
                  maxLength={100}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                <select
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                >
                  <option value="">Select State *</option>
                  {states.map((state) => (
                    <option key={state._id} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
                
                <input
                  type="number"
                  id="zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  placeholder="Zipcode *"
                  minLength={5}
                  maxLength={9}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
              </div>
            </div>

            <div className='flex gap-4'>
              {/* Required Skills */}
              <div className="mb-4 w-[50%]">
                <label htmlFor="skillsRequired" className="block mb-2 font-bold">Select Required Skills *</label>
                <Select
                  options={skillOptions}
                  value={skillOptions.filter(option => formData.skillsRequired.includes(option.value))}
                  onChange={handleSkillChange}
                  isMulti
                />
              </div>

              {/* Urgency */}
              <div className="mb-4 w-[50%]">
                <label htmlFor="urgency" className="block mb-2 font-bold">Select Urgency *</label>
                <select
                  name="urgency"
                  id="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                >
                  <option value="">Select Urgency *</option>
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="mb-6">
              <label className="block mb-2 font-bold">Date of Event *</label>
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}  // Update date state on change
                dateFormat="yyyy/MM/dd"
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-bold">Time Start *</label>
              <input
                type="time"
                id="timeStart"
                name="timeStart"
                value={formData.timeStart}
                onChange={(e) => setFormData({ ...formData, timeStart: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-bold">Time End *</label>
              <input
                type="time"
                id="timeEnd"
                name="timeEnd"
                value={formData.timeEnd}
                onChange={(e) => setFormData({ ...formData, timeEnd: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-3 font-bold text-white bg-[#e21c34] rounded-md hover:bg-red-700"
              >
                Complete
              </button>
              {isChangingEvent && (
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-3 font-bold text-[#e21c34] bg-white border border-[#e21c34] rounded-md hover:bg-red-100"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  ); 
}

export default EventForm;
