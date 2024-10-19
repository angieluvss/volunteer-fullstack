//frontend\src\pages\Login.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Named import for jwtDecode

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend with the login form data
      const response = await axios.post('http://localhost:4000/api/auth/login', formData);
  
      // Extract the token from the response
      const token = response.data.token;
  
      // Decode the token to get the role and other information
      const decodedToken = jwtDecode(token); // Correct usage
      const role = decodedToken.role;  // Extract the role from the decoded token
  
      // Store the token in localStorage and pass it to the app-level state
      setToken(token);
      localStorage.setItem('token', token);
  
      // Redirect based on the user's role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/volunteer-dashboard');
      }
  
    } catch (error) {
      // Handle login errors (e.g., wrong credentials)
      setErrorMessage('Invalid email or password');
      console.error('Error logging in:', error);
    }
  };

  

  return (
    <section className='min-h-screen pt-16 flex items-center justify-center font-[Inter] text-lava_black bg-gradient-to-br from-light_pink to-medium_pink'>
      <div className='flex w-5/6 min-h-[60vh] items-stretch text-center bg-snow rounded-2xl shadow-2xl'>
        {/* Login */}
        <div className='w-full md:w-1/2 py-10 flex flex-col items-center justify-center'>
          <h1 className='mt-4 font-bold text-5xl text-shasta_red'>Sign In</h1>

          {/* email/password */}
          <form className='my-8 flex flex-col w-2/3 min-w-60 md:min-w-72 max-w-96 text-lg' onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              className='m-2 bg-light_gray py-2 px-4 rounded-xl'
              required
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className='m-2 bg-light_gray py-2 px-4 rounded-xl'
              required
            />
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <div className='flex justify-center'>
              <button type="submit" className='btn text-2xl font-[Inter] font-bold bg-shasta_red text-snow rounded-2xl py-2 px-8 hover:bg-gradient-to-r from-shasta_red to-persian_plum'>
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Sign Up */}
        <div className='hidden md:flex flex-col justify-center items-center w-1/2 h-fill bg-shasta_red rounded-e-2xl gap-2'>
          <h1 className='text-snow font-bold text-4xl lg:text-5xl mb-4'>Register Here</h1>
          <p className='text-snow mb-6 lg:text-xl px-6'>Become Part of the Cougar Family Committed to Change</p>
          <button onClick={() => navigate('/register')} className='text-snow border border-snow text-2xl font-bold py-2 px-8 rounded-2xl hover:bg-snow hover:text-shasta_red'>
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;