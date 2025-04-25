import React from 'react'
import create_room from '../assets/SVGs/hero_SVGs/create_room.svg';
import working_svg from '../assets/SVGs/working_SVGs/working_svg.svg';
import movie_svg from '../assets/SVGs/working_SVGs/movie_svg.svg';
import group_svg from '../assets/SVGs/working_SVGs/group_svg.svg';
import thumbsup_svg from '../assets/SVGs/working_SVGs/thumbsup_svg.svg';

function Working() {
  return (
      <>
      <div className='bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 overflow-hidden'>
        <div className="flex items-center justify-center w-full">
          <div className="flex-1 h-0.5 bg-gray-700"></div>
          <div className="flex gap-2 items-center mx-4">
            <img className="w-8 h-8" src={working_svg} alt="" />
            <p className="text-2xl font-bold">How it Works</p>
          </div>
          <div className="flex-1 h-0.5 bg-gray-700"></div>
        </div>
        <div className='flex items-center justify-between gap-4 py-8 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-center gap-2 m-2'>
              <img className="md:w-18 md:h-18 w-15 h-15" src={create_room} alt="" />
              <p className='font-semibold md:text-lg'>1. Make a room</p>
          </div>
          <div className='flex flex-col items-center gap-2 m-2'>
              <img className="md:w-18 md:h-18 w-15 h-15" src={group_svg} alt="" />
              <p className='font-semibold md:text-lg'>2. Share link with friends</p>
          </div>
          <div className='flex flex-col items-center gap-2 m-2'>
              <img className="md:w-18 md:h-18 w-15 h-15" src={movie_svg} alt="" />
              <p className='font-semibold md:text-lg'>3. Pick something to watch</p>
          </div>
          <div className='flex flex-col items-center gap-2 m-2'>
              <img className="md:w-18 md:h-18 w-15 h-15" src={thumbsup_svg} alt="" />
              <p className='font-semibold md:text-lg'>4. Success. Enjoy now!</p>
          </div>        
        </div>
      </div>
      </>
    )
}

export default Working