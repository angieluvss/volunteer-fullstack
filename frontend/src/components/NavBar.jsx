//frontend\src\components\NavBar.jsx
import React, { useState, useEffect } from 'react';
import { scroller, scrollSpy } from 'react-scroll';
import { Bars3BottomRightIcon, DocumentChartBarIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { assets } from '../assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = ({ token, setToken, role }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeSection, setActiveSection] = useState('home');
    const [isScrolling, setIsScrolling] = useState(false);
    const [pendingScroll, setPendingScroll] = useState(null); // To handle scroll after navigation
    const [isOpen, setIsOpen] = useState(false);

    const sectionNames = ['home', 'aboutus', 'events'];

    // Scroll to a specific section
    const scrollToSection = (section) => {
        setIsScrolling(true);
        scroller.scrollTo(section, {
            containerId: 'scroll-container',
        });
        setTimeout(() => {
            setIsScrolling(false);
            setActiveSection(section);
        }, 800); // Duration of the scroll
    };

    // Handle navigation and scroll logic
    const handleLinkClick = (section) => {
        if (location.pathname === '/') {
            scrollToSection(section);
        } else {
            setPendingScroll(section); // Set the section to scroll after navigation
            navigate('/'); // Navigate to home
        }
    };

    // Effect to handle scrolling after navigation
    useEffect(() => {
        if (pendingScroll && location.pathname === '/') {
            // Add a slight delay to ensure DOM has rendered
            setTimeout(() => {
                scrollToSection(pendingScroll);
                setPendingScroll(null); // Reset pending scroll
            }, 200);
        }
    }, [location, pendingScroll]);

    // Reset active section when navigating away from the home page
    useEffect(() => {
        if (location.pathname !== '/') {
            setActiveSection(null); // Clear the active section when not on the home page
        }
    }, [location.pathname]);

    // Handle manual scroll events and update active section
    const handleScroll = () => {
        if (isScrolling) return;

        const sections = document.querySelectorAll('.snap-start');
        let foundActiveSection = false;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2 && !foundActiveSection) {
                const sectionName = sectionNames[index];
                setActiveSection(sectionName);
                foundActiveSection = true;
            }
        });
    };

    // Ensure scrollSpy updates on load and during scroll events
    useEffect(() => {
        scrollSpy.update();
        const scrollContainer = document.getElementById('scroll-container');
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isScrolling]);

    return (
        <nav className='bg-snow border border-light_gray fixed w-full z-50'>
            <div className='px-6 md:px-8 lg:px-24 py-2 md:flex justify-between items-center'>
                {/* Logo */}
                <div onClick={() => navigate('/') || scrollToSection('home')} className={'cursor-pointer flex items-center gap-2'}>
                    <img className='w-12 h-14 origin-top-left' src={assets.shasta_logo} alt='Logo' />
                    <span className='hidden md:flex text-xl lg:text-2xl font-medium font-[Inter] text-dark_gray'>Shasta's Coogmunity Service</span>
                </div>

                {/* Menu Icon */}
                <div onClick={() => setIsOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden text-shasta_red'>
                    {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
                </div>

                {/* Navigation */}
                <ul className={`md:flex md:items-center md:gap-3 md:static left-0 w-full bg-snow md:w-auto p-9 md:p-0 absolute ${isOpen ? 'top-[72px] z-40' : 'top-[-490px]'}`}>
                    {/* Links */}
                    <li onClick={() => handleLinkClick('aboutus')} className={`cursor-pointer mx-6 md:m-0 font-medium text-2xl md:text-base font-[Inter] text-lava_black hover:text-shasta_red hover:underline ${activeSection === 'aboutus' ? 'text-shasta_red underline' : ''}`}>About Us</li>
                    <li onClick={() => handleLinkClick('events')} className={`cursor-pointer m-6 md:m-0 font-medium text-2xl md:text-base font-[Inter] text-lava_black hover:text-shasta_red hover:underline ${activeSection === 'events' ? 'text-shasta_red underline' : ''}`}>Events</li>

                    {/* Buttons */}
                    <div className='flex flex-col md:flex-row md:gap-3'>
                        {token ? (
                            <>
                                {/* Dashboard Button */}
                                {role === 'admin' && (
                                    <button onClick={() => navigate('/admin-dashboard')} className={`mb-6 mx-6 md:m-0 mr-auto font-medium text-2xl md:text-base font-[Inter] ${location.pathname === '/admin-dashboard' ? 'text-shasta_red underline' : 'text-lava_black hover:text-shasta_red hover:underline'}`}>
                                        Admin Dashboard
                                    </button>
                                )}
                                {role === 'volunteer' && (
                                    <button onClick={() => navigate('/volunteer-dashboard')} className={`mb-6 mx-6 md:m-0 mr-auto font-medium text-2xl md:text-base font-[Inter] ${location.pathname === '/volunteer-dashboard' ? 'text-shasta_red underline' : 'text-lava_black hover:text-shasta_red hover:underline'}`}>
                                        Volunteer Dashboard
                                    </button>
                                )}

                                <div className='mb-6 mx-6 md:m-0'>
                                    <button
                                        onClick={() => {
                                            setToken(null); // Set token to null to log out
                                            localStorage.removeItem('token'); // Clear token from localStorage
                                            navigate('/'); // Redirect to home page
                                        }}
                                        className='btn static font-medium text-2xl md:text-base font-[Inter] bg-shasta_red text-snow rounded-2xl p-2 ml-auto hover:bg-gradient-to-r from-shasta_red to-persian_plum'
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='mt-0 mb-6 mx-6 md:m-0'>
                                    <button onClick={() => navigate('/login')} className='btn static font-medium text-2xl md:text-base font-[Inter] text-lava_black bg-transparent border border-shasta_red py-2 px-4 rounded-2xl hover:bg-light_pink'>Login</button>
                                </div>
                                <div className='mb-6 mx-6 md:m-0'>
                                    <button onClick={() => navigate('/register')} className='btn static font-medium text-2xl md:text-base font-[Inter] bg-shasta_red text-snow rounded-2xl p-2 ml-auto hover:bg-gradient-to-r from-shasta_red to-persian_plum'>Get Started</button>
                                </div>
                            </>
                        )}
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
