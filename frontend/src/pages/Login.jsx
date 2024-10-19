//frontend\src\pages\Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Store the token from the backend in both state and localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);

      // Navigate to Volunteer Dashboard after login
      navigate('/volunteer-dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className='min-h-screen pt-16 flex items-center justify-center font-[Inter] text-lava_black bg-gradient-to-br from-light_pink to-medium_pink'>
      <div className='flex w-5/6 min-h-[60vh] items-stretch text-center bg-snow rounded-2xl shadow-2xl'>
        <div className='hidden md:flex flex-col justify-center items-center w-1/2 h-fill bg-shasta_red rounded-s-2xl gap-2'>
          <h1 className='text-snow font-bold text-4xl lg:text-5xl mb-4'>Hello Again!</h1>
          <p className='text-snow mb-6 lg:text-xl px-6'>Welcome back! Please login to continue</p>
          <button onClick={() => navigate('/register')} className='text-snow border text-2xl border-snow font-bold py-2 px-8 rounded-2xl hover:bg-snow hover:text-shasta_red'>Sign Up</button>
        </div>

        <div className='w-full md:w-1/2 py-10 flex flex-col items-center justify-center'>
          <h1 className='mt-4 mb-2 font-bold text-4xl lg:text-5xl text-shasta_red'>Login</h1>
          <p className='mb-4 lg:text-xl text-dark_gray'>Welcome back! Please login to continue</p>

          <form onSubmit={handleSubmit} className='m-4 flex flex-col w-2/3 min-w-60 md:min-w-72 max-w-96 text-lg'>
            <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} required className='m-2 bg-light_gray py-2 px-4 rounded-xl' />
            <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} required className='m-2 bg-light_gray py-2 px-4 rounded-xl' />
            <button type="submit" className='btn static text-2xl font-bold bg-shasta_red text-snow rounded-2xl py-2 px-8 hover:bg-gradient-to-r from-shasta_red to-persian_plum'>Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
