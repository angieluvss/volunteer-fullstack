import React from 'react'
import { useNavigate } from 'react-router-dom';

const VolunteerDashboard = () => {
    const navigate = useNavigate();

    return (
        <section className='snap-start min-h-screen flex items-center justify-center font-medium font-[Inter] text-lava_black bg-gradient-to-r from-cyan-500 to-blue-500'>
            <div className='flex shadow-2xl'>
            <div className='flex flex-col items-center justify-center text-center p-20 gap-8 bg-snow rounded-2xl'>
                <h1 className='text-4xl font-bold'>Signed In</h1>
                <p>work in progress</p>
            </div>
            </div>
        </section>
    )
}

export default VolunteerDashboard