import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setToken }) => {
    const navigate = useNavigate();

    // toggle
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSwitch = () => {
        setIsAdmin(!isAdmin);
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

                    {/* SWITCH */}
                    <div>
                        <label className='relative inline-flex cursor-pointer select-none items-center justify-center rounded-2xl bg-snow border border-light_pink'>
                            <input type='checkbox' className='sr-only' checked={isAdmin} onChange={handleSwitch}/>
                            <span className={`flex items-center rounded-2xl py-2 px-6 font-medium transition-all duration-300 ease-in-out ${!isAdmin ? 'text-primary bg-light_pink' : 'text-body-color'}`}>Volunteer</span>
                            <span className={`flex items-center rounded-2xl py-2 px-6 font-medium transition-all duration-300 ease-in-out ${isAdmin ? 'text-primary bg-light_pink' : 'text-body-color'}`}>Admin</span>
                        </label>
                    </div>

                    {/* email/password */}
                    <form action="#" className='m-4 flex flex-col w-2/3 min-w-60 md:min-w-72 max-w-96 text-lg'> 
                        <input type="text" placeholder="email" className='m-2 bg-light_gray py-2 px-4 rounded-xl'/>
                        <input type="password" placeholder="password" className='m-2 bg-light_gray py-2 px-4 rounded-xl'/>
                        <input type="password" placeholder="re-enter password" className='m-2 bg-light_gray py-2 px-4 rounded-xl'/>
                    </form>

                    <div className='mb-6 mx-6 md:m-0'>
                        <button onClick={() => { setToken(true); navigate('/volunteer-dashboard'); }} className='btn static text-2xl font-bold bg-shasta_red text-snow rounded-2xl py-2 px-8 ml-auto hover:bg-gradient-to-r from-shasta_red to-persian_plum'>Sign Up</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
