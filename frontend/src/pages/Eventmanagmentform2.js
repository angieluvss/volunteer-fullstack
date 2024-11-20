import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

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
    urgency: '',
    addressMode: 'autocomplete', // Add this
  });
  
  const [mode, setMode] = useState('autocomplete'); // Track mode
  const [addressSuggestions, setAddressSuggestions] = useState([]); // Suggestions for autocomplete
  const [states, setStates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [newSkills, setNewSkills] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token'); // Retrieve token for authentication

  const handleAddressAutocomplete = async (e) => {
    const query = e.target.value;
    if (query.length < 3) return;
  
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: process.env.REACT_APP_LOCATIONIQ_API_KEY,
          q: query,
          limit: 5,
          countrycodes: 'us',
          format: 'json',
        },
      });
  
      const suggestions = response.data.map((location) => ({
        fullAddress: location.display_name,
        address1: location.address.name || '',
        city: location.address.city || location.address.town || location.address.village || '',
        state: location.address.state || '',
        zipcode: location.address.postcode || '',
      }));
  
      setAddressSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    }
  };
  
  const handleAddressSelect = (suggestion) => {
    if (!suggestion.zipcode) {
      setError("Selected address does not include a zip code. Please select another or enter manually.");
      return;
    }
    setFormData({
      ...formData,
      address1: suggestion.address1,
      city: suggestion.city,
      state: suggestion.state,
      zipcode: suggestion.zipcode,
    });
    setAddressSuggestions([]);
    setError(''); // Clear previous error
  };
  
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
        urgency: event.urgency || '',
        addressMode: event.addressMode || 'autocomplete', // Default to 'autocomplete'
      });
      setMode(event.addressMode || 'autocomplete'); // Set initial mode
    }
  }, [isChangingEvent, event]);
  

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/skills');
        const sortedSkills = response.data
          .map(skill => ({ value: skill.name, label: skill.name }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically
        setSkills(sortedSkills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    const fetchStates = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/states');
        setStates(response.data); // Store fetched states
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchSkills();
    fetchStates();
  }, []);

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
    const addedSkills = selectedOptions.map(option => option.value);
  
    // Separate new and existing skills
    const existing = addedSkills.filter(skill => skills.some(s => s.value === skill));
    const newOnes = addedSkills.filter(skill => !skills.some(s => s.value === skill));
  
    // Immediately add new skills to the `skills` state for visual feedback
    const newSkillOptions = newOnes.map(skill => ({ value: skill, label: skill }));
    setSkills(prevSkills => [...prevSkills, ...newSkillOptions]);
  
    // Track new skills for later database submission
    setNewSkills(prevNewSkills => [...prevNewSkills, ...newOnes]);
  
    // Update form data
    setFormData({
      ...formData,
      skillsRequired: addedSkills, // Update skills in form data
    });
  };

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
  
    if (selectedMode === 'autocomplete') {
      // Clear address fields when switching to autocomplete
      setFormData({
        ...formData,
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        addressMode: selectedMode,
      });
    } else {
      // Retain current address fields when switching to manual
      setFormData({
        ...formData,
        addressMode: selectedMode,
      });
    }
  
    // Update the mode
    setMode(selectedMode);
  
    // Clear suggestions if switching away from autocomplete
    if (selectedMode === 'manual') {
      setAddressSuggestions([]);
    }
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
      // Save new skills to the database
      if (newSkills.length > 0) {
        const savedSkills = await Promise.all(
          newSkills.map(skill =>
            axios.post('http://localhost:4000/api/skills', { name: skill }, {
              headers: { Authorization: `Bearer ${token}` },
            })
          )
        );

        const savedSkillOptions = savedSkills.map(response => ({
          value: response.data.name,
          label: response.data.name,
        }));

        setSkills(prevSkills => [...prevSkills, ...savedSkillOptions]);
      }

      // Submit the event form
      const payload = {
        ...formData,
        addressMode: mode,
        date: formattedDate,
      };

      if (isChangingEvent) {
        await axios.put(`http://localhost:4000/api/events/${event._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:4000/api/events/create', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate('/admin-dashboard');
    } catch (err) {
      console.error('Error during event creation:', err.response?.data);
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
            <div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Address Input Mode</label>
                <div className="flex items-center gap-4">
                  <label>
                    <input
                      type="radio"
                      name="mode"
                      value="autocomplete"
                      checked={mode === 'autocomplete'}
                      onChange={handleModeChange}
                    />
                    Autocomplete
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="mode"
                      value="manual"
                      checked={mode === 'manual'}
                      onChange={handleModeChange}
                    />
                    Manual
                  </label>
                </div>
              </div>

              {/* Autocomplete Input */}
              {mode === 'autocomplete' && (
                <div className="mb-4">
                  <label className="block mb-2 font-bold">Search Address</label>
                  <input
                    type="text"
                    placeholder="Start typing your address..."
                    onChange={handleAddressAutocomplete}
                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  />
                  <ul className="border border-gray-300 bg-white rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {addressSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleAddressSelect(suggestion)}
                      >
                        {suggestion.fullAddress}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Address Form */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  placeholder="Address 1 *"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  required
                  disabled={mode === 'autocomplete'} // Disable in autocomplete mode
                />
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  placeholder="Address 2"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  disabled={mode === 'autocomplete'} // Disable in autocomplete mode
                />
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City *"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  required
                  disabled={mode === 'autocomplete'} // Disable in autocomplete mode
                />
                <select
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  required
                  disabled={mode === 'autocomplete'} // Disable in autocomplete mode
                >
                  <option value="">Select State *</option>
                  {states.map((state) => (
                    <option key={state._id} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  placeholder="Zipcode *"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  required
                  disabled={mode === 'autocomplete'} // Disable in autocomplete mode
                />
              </div>
          </div>

            <div className='flex gap-4'>
              {/* Required Skills */}
              <div className="mb-4 w-[50%]">
                
                <label htmlFor="skillsRequired" className="block mb-2 font-bold">Select Required Skills *</label>
                <CreatableSelect
                  options={skills}
                  value={skills.filter(option => formData.skillsRequired.includes(option.value))}
                  onChange={handleSkillChange}
                  isMulti
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // Prevent form submission when pressing Enter
                    }
                  }}
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
