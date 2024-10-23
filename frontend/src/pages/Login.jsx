import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      const { token, role } = res.data;

      // Store the token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Set the token and role in the app state
      setToken(token);
      setRole(role);

      // Redirect based on role (admin or volunteer)
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'volunteer') {
        navigate('/volunteer-dashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
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
              value={email} // Use email state directly
              onChange={(e) => setEmail(e.target.value)} // Handle email change directly
              className='m-2 bg-light_gray py-2 px-4 rounded-xl'
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password} // Use password state directly
              onChange={(e) => setPassword(e.target.value)} // Handle password change directly
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
