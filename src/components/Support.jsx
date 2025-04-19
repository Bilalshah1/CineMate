import React from 'react'
import support_svg from '../assets/support_svg.svg';
import maleprofile_svg from '../assets/maleprofile_svg.svg';


function Support() {
  return (
    <>
    <div className='bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 overflow-hidden'>
      <div className="flex items-center justify-center w-full">
        <div className="flex-1 h-0.5 bg-gray-700"></div>
        <div className="flex gap-2 items-center mx-4">
          <img className="w-8 h-8" src={support_svg} alt="" />
          <p className="text-2xl font-bold">Support</p>
        </div>
        <div className="flex-1 h-0.5 bg-gray-700"></div>
      </div>
        <div className='flex items-center justify-between gap-4 py-8 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-center gap-2 m-2 ml-5 md:ml-10'>
              <img className="md:w-18 md:h-18 w-15 h-15" src={maleprofile_svg} alt="" />
              <p className='font-semibold md:text-lg'>2022562</p>
          </div>
          <div className='flex flex-col items-center gap-2 m-2'>
              <img className="md:w-18 md:h-18 w-15 h-15" src={maleprofile_svg} alt="" />
              <p className='font-semibold md:text-lg'>2022211</p>
          </div>
          <div className='flex flex-col items-center gap-2 m-2'>
              <img className="md:w-18 md:h-18 w-15 h-15" src={maleprofile_svg} alt="" />
              <p className='font-semibold md:text-lg'>2022609</p>
          </div>
          <div className='flex flex-col items-center gap-2 m-2 mr-5 md:mr-10'>
              <img className="md:w-18 md:h-18 w-15 h-15" src={maleprofile_svg} alt="" />
              <p className='font-semibold md:text-lg'>2022138</p>
          </div>        
        </div>
      </div>
    </>
  )
}

export default Support