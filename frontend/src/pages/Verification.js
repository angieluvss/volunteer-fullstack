// src/pages/Verification.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

function Verification({ setAdminSetupCompleted }) {
  const navigate = useNavigate();

  const handleVerificationSuccess = () => {
      setAdminSetupCompleted(true); // Update admin setup status
      navigate('/admin-dashboard');
  };

  return (
    <section className='snap-start min-h-screen flex items-center justify-center font-medium font-[Inter] text-lava_black bg-gradient-to-br from-light_pink to-medium_pink'>
      <div className='flex shadow-2xl'>
        <div className='flex flex-col items-center justify-center text-center p-20 gap-8 bg-snow rounded-2xl'>
          <h1 className='text-4xl font-bold'>Please wait for verification</h1>
          <button onClick={handleVerificationSuccess} className='btn static font-medium md:text-base font-[Inter] text-snow py-2 px-4 rounded-xl bg-medium_pink border border-medium_pink hover:border-shasta_red'>
            continue to dashboard
          </button>
        </div>
      </div>
    </section>
  );
}

export default Verification;
