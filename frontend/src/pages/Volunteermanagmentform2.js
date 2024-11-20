import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-multi-date-picker";
import Select from 'react-select';
import { jwtDecode } from 'jwt-decode';

function Volunteermanagementform({ setVolunteerFormCompleted }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.state?.isEditing || false;
  const [states, setStates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [values, setValues] = useState([new Date(), new Date(new Date().setDate(new Date().getDate() + 1))]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [mode, setMode] = useState('autocomplete');
  const [error, setError] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);

  const apiKey = process.env.REACT_APP_LOCATIONIQ_API_KEY;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    preferences: '',
    skills: [],
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    addressMode: 'autocomplete'
  });

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
        addressMode: selectedMode, // Update the address mode
      });
    } else {
      // Retain address fields when switching to manual
      setFormData({
        ...formData,
        addressMode: selectedMode, // Update the address mode
      });
    }
  
    // Update the mode
    setMode(selectedMode);
  
    // Clear suggestions if switching away from autocomplete
    if (selectedMode === 'manual') {
      setAddressSuggestions([]);
    }
  };  

  const handleAddressAutocomplete = async (e) => {
    const query = e.target.value;
    if (query.length < 3) return;

    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: apiKey,
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
    const selectedState = states.find(
      (state) =>
        state.name.toLowerCase() === suggestion.state.toLowerCase() ||
        state.code.toLowerCase() === suggestion.state.toLowerCase()
    );

    setFormData({
      ...formData,
      address1: suggestion.address1,
      city: suggestion.city,
      state: selectedState ? selectedState.code : '',
      zipcode: suggestion.zipcode,
    });

    setAddressSuggestions([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetch the list of states
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
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    
    fetchSkills();
    fetchStates();
  }, []);

  // Fetch volunteer profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found, redirecting to login.');
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:4000/api/volunteers/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          preferences: response.data.preferences || '',
          skills: response.data.skills || [],
          address1: response.data.address?.address1 || '',
          address2: response.data.address?.address2 || '',
          city: response.data.address?.city || '',
          state: response.data.address?.state || '',
          zipcode: response.data.address?.zipcode || '',
        });

        setMode(response.data.addressMode || 'autocomplete');
        setSelectedOptions(response.data.skills.map(skill => ({ value: skill, label: skill })));
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile');
      }
    };

    fetchProfile();
  }, [navigate]);
  

  // Handle skill selection
  const handleSkillChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
    setFormData({
      ...formData,
      skills: selectedOption.map(option => option.value),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, redirecting to login.');
        navigate('/login');
        return;
      }

      await axios.put(
        'http://localhost:4000/api/volunteers/profile',
        {
          ...formData,
          addressMode: mode,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setVolunteerFormCompleted('completed');
      localStorage.setItem('volunteerFormCompleted', 'completed');
      navigate('/volunteer-dashboard');
    } catch (err) {
      console.error('Failed to update profile:', err.response?.data || err.message);
      setError('Failed to update profile');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#faa0a5] pt-20">
      <div className="w-full max-w-6xl p-6 bg-white border-2 border-red-200 rounded-2xl shadow-lg mt-7">
        <h2 className="mb-5 text-2xl xl:text-5xl font-extrabold text-center text-[#e21c34]">
          {isEditing ? 'Editing Profile' : 'Start Volunteering by Completing Your Profile'}
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>

          <div className='flex flex-col items-center'>
            {/* Full Name */}
            <div className="mb-4 w-[50%]">
              <label htmlFor="firstName" className="block mb-2 font-bold">Enter your Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                placeholder="Enter your first name here *"
                maxLength={50}
                required
                className="w-full px-3 py-2 my-4 border rounded-md bg-gray-100"
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                placeholder="Enter your last name here *"
                maxLength={50}
                required
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Address */}
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

          {/* Preferences */}
          <div className='flex gap-4'>
            <div className="mb-4 w-[50%]">
              <label htmlFor="preferences" className="block mb-2 font-bold">Preferences</label>
              <textarea
                id="preferences"
                name="preferences"
                value={formData.preferences || ''}
                onChange={handleChange}
                rows="5"
                placeholder="Enter Preferences here"
                className="w-full px-3 py-2 border rounded-md bg-gray-100 resize-none"
              ></textarea>
            </div>

            {/* Select your Skills */}
            <div className="mb-4 w-[50%]">
              <label htmlFor="skills" className="block mb-2 font-bold">Select Your Skills *</label>
              <Select
                options={skills}
                value={selectedOptions}
                onChange={handleSkillChange}
                isMulti
              />
            </div>
          </div>

          {/* Availability */}
          {/* {!isEditing && (
            <div className="mb-6">
              <label className="block mb-2 font-bold">Select Your Availability *</label>
              <DatePicker multiple value={values} onChange={setValues} />
            </div>
          )} */}

          {/* Submit Button */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-3 font-bold text-white bg-[#e21c34] rounded-md hover:bg-red-700"
            >
              Complete
            </button>
            {isEditing && (
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
  );
}

export default Volunteermanagementform;
