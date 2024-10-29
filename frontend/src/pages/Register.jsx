import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [isAdmin, setIsAdmin] = useState(false);  // Track if the user is registering as an admin
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle switch between admin and volunteer
  const handleSwitch = () => setIsAdmin(!isAdmin);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password matching validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const role = isAdmin ? 'admin' : 'volunteer';
      
      // Use the correct backend URL (http://localhost:4000)
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        email: formData.email,
        password: formData.password,
        role
      });
  
      const { token } = response.data; // Extract the token from the response
  
      // Store token in localStorage (or sessionStorage)
      localStorage.setItem('token', token); // Save token for future requests
  
      setError('');  // Clear any errors
  
      // Navigate based on role
      if (role === 'admin') {
        navigate('/verify');  // Navigate to the verification page for admins
      } else {
        navigate('/volunteermanagmentform');  // Navigate to volunteer management form
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred during registration');
    }
  };

  return (
    <section className='min-h-screen pt-16 flex items-center justify-center font-[Inter] text-lava_black bg-gradient-to-br from-light_pink to-medium_pink'>
      <div className='flex w-5/6 min-h-[60vh] items-stretch text-center bg-snow rounded-2xl shadow-2xl'>
        
        {/* Sign In */}
        <div className='hidden md:flex flex-col justify-center items-center w-1/2 h-fill bg-shasta_red rounded-s-2xl gap-2'>
          <h1 className='text-snow font-bold text-4xl lg:text-5xl mb-4'>Welcome Back!</h1>
          <p className='text-snow mb-6 lg:text-xl px-6'>Your Next Volunteer Opportunity Awaits</p>
          <button onClick={() => navigate('/login')} className='text-snow border text-2xl border-snow font-bold py-2 px-8 rounded-2xl hover:bg-snow hover:text-shasta_red'>Login</button>
        </div>

        {/* Register */}
        <div className='w-full md:w-1/2 py-10 flex flex-col items-center justify-center'>
          <h1 className='mt-4 mb-2 font-bold text-4xl lg:text-5xl text-shasta_red'>Sign Up</h1>
          <p className='mb-4 lg:text-xl text-dark_gray'>Create your account</p>

          {/* Role Switch */}
          <div>
            <label className='relative inline-flex cursor-pointer select-none items-center justify-center rounded-2xl bg-snow border border-light_pink'>
              <input type='checkbox' className='sr-only' checked={isAdmin} onChange={handleSwitch} />
              <span className={`flex items-center rounded-2xl py-2 px-6 font-medium transition-all duration-300 ease-in-out ${!isAdmin ? 'text-primary bg-light_pink' : 'text-body-color'}`}>Volunteer</span>
              <span className={`flex items-center rounded-2xl py-2 px-6 font-medium transition-all duration-300 ease-in-out ${isAdmin ? 'text-primary bg-light_pink' : 'text-body-color'}`}>Admin</span>
            </label>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 mt-2">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit} className='m-4 flex flex-col w-2/3 min-w-60 md:min-w-72 max-w-96 text-lg'>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='m-2 bg-light_gray py-2 px-4 rounded-xl'
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className='m-2 bg-light_gray py-2 px-4 rounded-xl'
              required
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className='m-2 bg-light_gray py-2 px-4 rounded-xl'
              required
            />
            <button type="submit" className='btn static text-2xl font-bold bg-shasta_red text-snow rounded-2xl py-2 px-8 mx-auto hover:bg-gradient-to-r from-shasta_red to-persian_plum'>Sign Up</button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Register;

