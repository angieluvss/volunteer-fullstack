//frontend\src\pages\Eventmanagmentform2.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    time: '',
    skillsRequired: [],
    urgency: ''
  });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token'); // Assuming the admin is authenticated with JWT

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
                  {/* Add state options here */}
                  <option value="">Select State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
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
              <label className="block mb-2 font-bold">Date and Time of Event</label>
              <div className="flex flex-col gap-4">
              <DatePicker
                selected={formData.date} 
                onChange={(date) => setFormData({ ...formData, date })}  // Update date state on change
                dateFormat="yyyy/MM/dd"
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />

                <input
                  type="time"
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-[50%] px-5 py-2 border rounded-md text-gray-900 bg-gray-100"
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