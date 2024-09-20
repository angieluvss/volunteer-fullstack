// src/EventForm.js
import React from 'react';
import { useState } from "react";
// import NavBar from '../components/NavigationBar';
import { createTheme } from '@mui/material/styles';
import DatePicker from "react-multi-date-picker";
import Select from 'react-select';

function EventForm() {

  const today = new Date()
  const tomorrow = new Date()

  tomorrow.setDate(tomorrow.getDate() + 1)

  const [values, setValues] = useState([today, tomorrow])
  const [selectedOptions, setSelectedOptions] = useState([])
  const handleChange = (selectedOption) => {
    setSelectedOptions(selectedOption)
  }


  const skillOptions = [
    { value: 'skill1', label: 'Communication' },
    { value: 'skill2', label: 'Wriitng' },
    { value: 'skill3', label: 'Public Speaking' },
    { value: 'skill4', label: 'Programming' },

  ]
  return (
    <>
      {/* <navbar> */}
     
      

      <div className="flex items-center justify-center min-h-screen bg-[#faa0a5] pt-20">
        <div className="w-full max-w-6xl p-6 bg-white border-2 border-red-200 rounded-2xl shadow-lg mt-7">
          <h2 className="mb-5 text-2xl xl:text-5xl font-extrabold text-center text-[#e21c34]">Event Management Form</h2>
          <form>

            <div className='flex flex-col items-center'>

              {/* Event Name */}
              <div className="mb-4 w-[50%]">
                <label htmlFor="event-name" className="block mb-2 font-bold">Event Name *</label>
                <input
                  type="text"
                  id="event-name"
                  name="event-name"
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
                  name="event-description"
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
                  placeholder="Address 1 *"
                  maxLength={100}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  placeholder="Address 2 "
                  maxLength={100}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City *"
                  maxLength={100}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                <select
                  name="state"
                  id="state"
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                >
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
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                >
                  <option value="urgency1">Low Priority</option>
                  <option value="urgency2">Medium Priority</option>
                  <option value="urgency3">High Priority</option>
                </select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="mb-6">
              <label className="block mb-2 font-bold">Date and Time of Event</label>
              <div className="flex flex-col gap-4">
                {/* <input
                  type="date"
                  name="event-date"
                  id="event-date"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                /> */}

                <DatePicker
                  multiple
                  value={values}
                  onChange={setValues}
                  className='p-5'
                  // inputClass='w-[50%] bg-white boder-2 border-black-700'
                />
                <input
                  type="time"
                  name="event-time"
                  id="event-time"
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