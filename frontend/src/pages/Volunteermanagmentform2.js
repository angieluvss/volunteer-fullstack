//frontend\src\pages\Volunteermanagmentform2.js
import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import { jwtDecode } from 'jwt-decode'; // Correct named import

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

function Volunteermanagmentform() {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null; // Corrected usage of jwtDecode
  const userId = decodedToken ? decodedToken.userId : null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    preferences: "",
    skills: [],
    dates: [today, tomorrow],
    time: "",
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const skillOptions = [
    { value: "skill1", label: "Communication" },
    { value: "skill2", label: "Writing" },
    { value: "skill3", label: "Public Speaking" },
    { value: "skill4", label: "Programming" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "zipcode" && !/^\d*$/.test(value)) return;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillsChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
    setFormData({
      ...formData,
      skills: selectedOption,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      zipcode: formData.zipcode,
      preferences: formData.preferences,
      skills: formData.skills.map((skill) => skill.value),
      dates: formData.dates.map((date) => {
        return date instanceof Date && !isNaN(date)
          ? date.toISOString()
          : new Date(date).toISOString();
      }),
      time: formData.time,
    };

    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zipcode: "",
          preferences: "",
          skills: [],
          dates: [today, tomorrow],
          time: "",
        });
        setSelectedOptions([]);
      } 
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#faa0a5] pt-20">
      <div className="w-full max-w-6xl p-6 bg-white border-2 border-red-200 rounded-2xl shadow-lg mt-7">
        <h2 className="mb-5 text-2xl xl:text-5xl font-extrabold text-center text-[#e21c34]">
          Start Volunteering by Completing Your Profile
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex flex-col items-center mb-4 w-[50%]">
            <label htmlFor="first-name" className="block mb-2 font-bold">
              Enter your Name *
            </label>
            <input
              type="text"
              id="first-name"
              name="firstName"
              placeholder="Enter your first name here *"
              maxLength={50}
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 my-4 border rounded-md bg-gray-100"
            />

            <input
              type="text"
              id="last-name"
              name="lastName"
              placeholder="Enter your last name here *"
              maxLength={50}
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Enter Your Address</label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                id="address1"
                name="address1"
                placeholder="Address 1 *"
                maxLength={100}
                required
                value={formData.address1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
              <input
                type="text"
                id="address2"
                name="address2"
                placeholder="Address 2"
                maxLength={100}
                value={formData.address2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City *"
                maxLength={100}
                required
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
              <select
                name="state"
                id="state"
                required
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              >
                <option value="">Select State *</option>
                {/* Add options for each state */}
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
                type="text"
                id="zipcode"
                name="zipcode"
                placeholder="Zipcode *"
                maxLength={9}
                required
                value={formData.zipcode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Preferences and Skills */}
          <div className="flex gap-4">
            <div className="mb-4 w-[50%]">
              <label htmlFor="preferences" className="block mb-2 font-bold">
                Preferences
              </label>
              <textarea
                id="preferences"
                name="preferences"
                rows="5"
                placeholder="Enter Preferences here"
                value={formData.preferences}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md bg-gray-100 resize-none"
              ></textarea>
            </div>

            <div className="mb-4 w-[50%]">
              <label htmlFor="skills" className="block mb-2 font-bold">
                Select Your Skills *
              </label>
              <Select
                options={skillOptions}
                value={selectedOptions}
                onChange={handleSkillsChange}
                isMulti
                placeholder="Select your skills"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-3 font-bold text-white bg-[#e21c34] rounded-md hover:bg-red-700 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Complete"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Volunteermanagmentform;