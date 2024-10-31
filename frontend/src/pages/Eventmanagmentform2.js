//frontend\src\pages\Eventmanagmentform2.js
//frontend\src\pages\Eventmanagmentform2.js
//frontend\src\pages\Eventmanagmentform2.js
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
//import DatePicker from "react-multi-date-picker";
import DatePicker from 'react-datepicker';  // Import the new DatePicker
import 'react-datepicker/dist/react-datepicker.css';  // Import the DatePicker styles
import Select from 'react-select';

const EventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    date: '',
    skillsRequired: [],
    urgency: ''
  });
  const [states, setStates] = useState([]); 
  const [error, setError] = useState('');
  const token = localStorage.getItem('token'); // Assuming the admin is authenticated with JWT
  

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the date for debugging
    console.log("Selected Date:", formData.date);

    // Try to convert the date into a valid Date object
    const selectedDate = new Date(formData.date);

    if (isNaN(selectedDate.getTime())) {
      setError('Invalid date selected');
      return;
    }

    // Format the date to ISO string
    const formattedDate = selectedDate.toISOString();

    try {
      await axios.post(
        'http://localhost:4000/api/events/create',
        {
          ...formData,
          date: formData.date ? formData.date.toISOString() : '',  // Format date before submission
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/admin-dashboard');  // Redirect to admin dashboard after event creation
    } catch (err) {
      console.error("Error during event creation:", err.response?.data);  // Log detailed error message
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
              <label className="block mb-2 font-bold">Availability</label>
              <div className="flex flex-col gap-4">
                <DatePicker
                  selected={formData.date}
                  onChange={(date) => setFormData({ ...formData, date })}  // Update date state on change
                  dateFormat="yyyy/MM/dd"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-[#e21c34] rounded-md hover:bg-red-700"
            >
              Complete
            </button>

          </form>
        </div>
      </div>
    </>
  ); 
}
export default EventForm;