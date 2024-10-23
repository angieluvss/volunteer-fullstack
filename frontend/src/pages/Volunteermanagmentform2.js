import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-multi-date-picker";
import Select from 'react-select';

function Volunteermanagmentform({ setVolunteerFormCompleted }) {
  const navigate = useNavigate();
  const [values, setValues] = useState([new Date(), new Date(new Date().setDate(new Date().getDate() + 1))]);
  const [selectedOptions, setSelectedOptions] = useState([]);
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
    availability: []
  });
  const [error, setError] = useState('');

  const skillOptions = [
    { value: 'Communication', label: 'Communication' },
    { value: 'Writing', label: 'Writing' },
    { value: 'Public Speaking', label: 'Public Speaking' },
    { value: 'Programming', label: 'Programming' },
  ];

  // Fetch volunteer profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/volunteers/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData(response.data);
        setSelectedOptions(response.data.skills.map(skill => ({ value: skill, label: skill })));
        setValues(response.data.availability.map(date => new Date(date)));
      } catch (err) {
        setError('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle skill selection
  const handleSkillChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
    setFormData({
      ...formData,
      skills: selectedOption.map(option => option.value)
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:4000/api/volunteers/profile', {
        ...formData,
        availability: values.map(date => date.toISOString())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVolunteerFormCompleted(true);
      navigate('/volunteer-dashboard');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#faa0a5] pt-20">
      <div className="w-full max-w-6xl p-6 bg-white border-2 border-red-200 rounded-2xl shadow-lg mt-7">
        <h2 className="mb-5 text-2xl xl:text-5xl font-extrabold text-center text-[#e21c34]">
          Start Volunteering by Completing Your Profile
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
                value={formData.firstName}
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
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name here *"
                maxLength={50}
                required
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Enter Your Address</label>
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

          {/* Preferences */}
          <div className='flex gap-4'>
            <div className="mb-4 w-[50%]">
              <label htmlFor="preferences" className="block mb-2 font-bold">Preferences</label>
              <textarea
                id="preferences"
                name="preferences"
                value={formData.preferences}
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
                options={skillOptions}
                value={selectedOptions}
                onChange={handleSkillChange}
                isMulti
              />
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <label className="block mb-2 font-bold">Select Your Availability *</label>
            <DatePicker
              multiple
              value={values}
              onChange={setValues}
            />
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
  );
}

export default Volunteermanagmentform;