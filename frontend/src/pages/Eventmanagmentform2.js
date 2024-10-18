import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DatePicker from 'react-multi-date-picker';
import Select from 'react-select';
import axios from 'axios';

function EventForm() {
  const navigate = useNavigate(); // Initialize useNavigate
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [values, setValues] = useState([today, tomorrow]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDescription: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    urgency: '',
    date: '',
    time: '',
  });

  const skillOptions = [
    { value: 'Communication', label: 'Communication' },
    { value: 'Writing', label: 'Writing' },
    { value: 'Public Speaking', label: 'Public Speaking' },
    { value: 'Programming', label: 'Programming' },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDates = values.map((date) => new Date(date).toISOString());

    const eventDetails = {
      name: eventData.eventName,
      description: eventData.eventDescription,
      location: `${eventData.address1}, ${eventData.city}, ${eventData.state} ${eventData.zipcode}`,
      requiredSkills: selectedOptions.map((option) => option.label),
      urgency: eventData.urgency,
      date: formattedDates,
      time: eventData.time,
    };

    try {
      await axios.post('http://localhost:4000/api/events', eventDetails);
      // After successful submission, navigate to admin dashboard
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error creating event', error.response.data);
    }
  };   

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#faa0a5] pt-20">
        <div className="w-full max-w-6xl p-6 bg-white border-2 border-red-200 rounded-2xl shadow-lg mt-7">
          <h2 className="mb-5 text-2xl xl:text-5xl font-extrabold text-center text-[#e21c34]">Event Management Form</h2>
          <form onSubmit={handleSubmit}>

            <div className='flex flex-col items-center'>

              {/* Event Name */}
              <div className="mb-4 w-[50%]">
                <label htmlFor="event-name" className="block mb-2 font-bold">Event Name *</label>
                <input
                  type="text"
                  id="event-name"
                  name="eventName"
                  value={eventData.eventName}
                  onChange={handleInputChange}
                  placeholder="Enter event name here *"
                  maxLength={100}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
              </div>

              {/* Event Description */}
              <div className="mb-4 w-[50%]">
                <label htmlFor="event-description" className="block mb-2 font-bold">Event Description *</label>
                <textarea
                  id="event-description"
                  name="eventDescription"
                  value={eventData.eventDescription}
                  onChange={handleInputChange}
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
                  value={eventData.address1}
                  onChange={handleInputChange}
                  placeholder="Address 1 *"
                  maxLength={100}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={eventData.address2}
                  onChange={handleInputChange}
                  placeholder="Address 2 "
                  maxLength={100}
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={eventData.city}
                  onChange={handleInputChange}
                  placeholder="City *"
                  maxLength={100}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                <select
                  name="state"
                  id="state"
                  value={eventData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                >
                  <option value="">Select State</option>
                  {/* State options here */}
                  <option value="TX">Texas</option>
                  {/* Add other state options */}
                </select>
                <input
                  type="number"
                  id="zipcode"
                  name="zipcode"
                  value={eventData.zipcode}
                  onChange={handleInputChange}
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
                <label htmlFor="skills" className="block mb-2 font-bold">Select Required Skills *</label>
                <Select
                  options={skillOptions}
                  value={selectedOptions}
                  onChange={handleChange}
                  isMulti
                />
              </div>

              {/* Urgency */}
              <div className="mb-4 w-[50%]">
                <label htmlFor="urgency" className="block mb-2 font-bold">Select Urgency *</label>
                <select
                  name="urgency"
                  id="urgency"
                  value={eventData.urgency}
                  onChange={handleInputChange} // Ensure this updates eventData correctly
                  required // Mark it as required if it's a mandatory field
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

            </div>

            {/* Date and Time */}
            <div className="mb-6">
              <label className="block mb-2 font-bold">Date and Time of Event</label>
              <div className="flex flex-col gap-4">
                <DatePicker
                  multiple
                  value={values}
                  onChange={setValues}
                  className='p-5'
                />
                <input
                  type="time"
                  name="time"
                  id="event-time"
                  value={eventData.time}
                  onChange={handleInputChange}
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
