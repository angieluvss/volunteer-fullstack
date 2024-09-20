import React from 'react'
import { Element } from 'react-scroll';

const Events = () => {
  return (
    <Element name="events">
        <section className='snap-start min-h-screen flex items-center justify-center font-medium font-[Inter] text-lava_black bg-gradient-to-r from-emerald-500 to-emerald-900'>
          <div className='flex shadow-2xl'>
            <div className='flex flex-col items-center justify-center text-center p-20 gap-8 bg-snow rounded-2xl'>
              <h1 className='text-4xl font-bold'>Events</h1>
              <p>work in progress</p>
            </div>
          </div>
        </section>
    </Element>
  )
}

export default Events
