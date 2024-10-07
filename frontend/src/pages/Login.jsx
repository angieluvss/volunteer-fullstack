import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setToken }) => {
  const navigate = useNavigate();

    return (
        <section className='min-h-screen pt-16 flex items-center justify-center font-[Inter] text-lava_black bg-gradient-to-br from-light_pink to-medium_pink'>
            <div className='flex w-5/6 min-h-[60vh] items-stretch text-center bg-snow rounded-2xl shadow-2xl'>
                {/* Login */}
                <div className='w-full md:w-1/2 py-10 flex flex-col items-center justify-center'>
                    <h1 className='mt-4 font-bold text-5xl text-shasta_red'>Sign In</h1>

                    {/* email/password */}
                    <form action="#" className='my-8 flex flex-col w-2/3 min-w-60 md:min-w-72 max-w-96 text-lg'> 
                        <input type="text" placeholder="email" className='m-2 bg-light_gray py-2 px-4 rounded-xl'/>
                        <input type="password" placeholder="password" className='m-2 bg-light_gray py-2 px-4 rounded-xl'/>
                    </form>

                    <div className='mb-6 mx-6 md:m-0'>
                        <button onClick={() => { setToken(true); navigate('/volunteer-dashboard'); }} className='btn static text-2xl font-[Inter] font-bold bg-shasta_red text-snow rounded-2xl py-2 px-8 ml-auto hover:bg-gradient-to-r from-shasta_red to-persian_plum'>Login</button>
                    </div>
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