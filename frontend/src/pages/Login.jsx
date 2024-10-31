import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
  
      const { token, role } = response.data;
  
      localStorage.setItem('token', token);
      setToken(token);
  
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/volunteer-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid email or password');
    }
  };
  

  return (
    <section className='min-h-screen pt-16 flex items-center justify-center font-[Inter] text-lava_black bg-gradient-to-br from-light_pink to-medium_pink'>
      <div className='flex w-5/6 min-h-[60vh] items-stretch text-center bg-snow rounded-2xl shadow-2xl'>
        {/* Login */}
        <div className='w-full md:w-1/2 py-10 flex flex-col items-center justify-center'>
          <h1 className='mt-4 font-bold text-5xl text-shasta_red'>Sign In</h1>

          {/* Error message */}
          {error && <p className="text-red-600 mt-2">{error}</p>}

          {/* email/password */}
          <form onSubmit={handleSubmit} className='my-8 flex flex-col w-2/3 min-w-60 md:min-w-72 max-w-96 text-lg'> 
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
            <div className="flex justify-center">
              <button type="submit" className='text-2xl font-bold bg-shasta_red text-snow rounded-2xl py-2 px-8 hover:bg-gradient-to-r from-shasta_red to-persian_plum'>
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Sign Up */}
        <div className='hidden md:flex flex-col justify-center items-center w-1/2 h-fill bg-shasta_red rounded-e-2xl gap-2'>
          <h1 className='text-snow font-bold text-4xl lg:text-5xl mb-4'>Register Here</h1>
          <p className='text-snow mb-6 lg:text-xl px-6'>Become Part of the Cougar Family Committed to Change</p>
          <button onClick={() => navigate('/register')} className='text-snow border border-snow text-2xl font-bold py-2 px-8 rounded-2xl hover:bg-snow hover:text-shasta_red'>Sign Up</button>
        </div>
      </div>
    </section>
  );
};

export default Login;