import React from 'react';
import { Element, scroller } from 'react-scroll';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'
import { assets } from '../assets/assets';

const Hero = () => {

    // Scroll to a specific section
    const scrollToSection = (section) => {
        scroller.scrollTo(section, {
            containerId: 'scroll-container',
            smooth: true,
            duration: 500
        });
    };

    return (
        <Element name="home">
            <section className='snap-start min-h-screen flex flex-col justify-between mx-6 md:mx-8 lg:mx-24 pt-20 md:pt-24 lg:pt-28'>
                <div className='flex flex-col justify-center items-center flex-grow'>
                    {/* HEADING */}
                    <h1 className='text-center font-black font-[Inter] text-3xl md:text-5xl lg:text-7xl text-lava_black mb-5 lg:mb-8'>
                        MAKE CHANGE AT COOGS' HOUSE!
                    </h1>
                    {/* PHOTOS + ABOUT US BUTTON (Centered) */}
                    <div className='relative grid grid-cols-2 lg:grid-cols-4 lg:pl-12 gap-4'>
                        <img className='h-auto w-auto lg:mt-8 z-40 lg:rotate-[-1.94deg]' src={assets.hero1} alt="Eco Volunteer Brochure 1"/>
                        <img className='h-auto w-auto lg:-ml-6 lg:mt-20 z-30 lg:rotate-[1.55deg]' src={assets.hero2} alt="Blue Volunteer"/>
                        <img className='h-auto w-auto lg:-ml-8 z-20 lg:rotate-[-1.35deg]' src={assets.hero3} alt="Eco Volunteer Brochure 2"/>
                        <img className='h-auto w-auto lg:-ml-12 lg:mt-14 z-10 lg:rotate-[1.78deg]' src={assets.hero4} alt="Art Volunteer Brochure"/>
                    </div>
                    {/* ABOUT US BUTTON */}
                    <div onClick={() => scrollToSection('aboutus')} className='hidden lg:flex flex-col items-center cursor-pointer text-center p-4 font-medium text-2xl text-shasta_red mt-auto mb-0 lg:mb-4'>
                        Learn More!
                        <ChevronDoubleDownIcon className='w-7 h-7'/>
                    </div>
                </div>
            </section>
        </Element>
    );
};

export default Hero;