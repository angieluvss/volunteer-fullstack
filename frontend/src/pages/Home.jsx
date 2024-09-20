import React from 'react'
import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
import Events from '../components/Events'

const Home = () => {
  return (
    <div id="scroll-container" className='snap-y snap-mandatory bg-snow w-full h-screen overflow-auto' style={{ scrollBehavior: 'smooth' }} >
      <Hero />
      <AboutUs />
      <Events />
    </div>
  )
}

export default Home
