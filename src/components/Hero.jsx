import { div } from 'framer-motion/client';
import React from 'react';
import create_room from '../assets/create_room.svg';
import join_room from '../assets/join_room.svg';
import preview from '../assets/mixkit_clapperboard.mp4';


function Hero() {
  return (
    <div className="relative flex items-center justify-center bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/30 to-transparent animate-shimmer"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <p className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
            Sync Stream and share videos with friends, no matter where they are.
          </p>
          <p className="text-xl font-semibold text-white/90 mt-2 drop-shadow-md">
            Without the need to download anything!
          </p>
          <button className="flex items-center gap-2 m-2 border-2 border-black shadow-md hover:shadow-xl hover:scale-102 rounded-lg transition-all duration-300 active:scale-108 group w-50">
            <img className="w-6 ml-1 h-6" src={create_room} alt="" />
            <p className="text-sm md:text-base flex-1 bg-red-800 group-hover:bg-blue-900 transition-colors duration-300 text-white px-4 py-1 rounded-r-md">
                Create New Room
            </p>
          </button>
          <button className="flex items-center gap-2 m-2 border-2 border-black shadow-md hover:shadow-xl hover:scale-102 rounded-lg transition-all duration-300 active:scale-108 group w-50">
            <img className="w-6 ml-1 h-6" src={join_room} alt="" />
            <p className="text-sm md:text-base flex-1 bg-blue-900 group-hover:bg-red-800 transition-colors duration-300 text-white px-4 py-1 rounded-r-md">
                Join Room
            </p>
          </button>
        </div>
        <div className="md:flex-shrink-0 mt-10 w-90 md:w-100" style={{ perspective: '1000px' }}>
          <video src={preview} className='h-50 md:h-60 object-cover rounded-lg transition-all duration-300 shadow-md shadow-blue-500 hover:shadow-lg hover:shadow-blue-700 transform md:rotate-x-[-6deg] md:rotate-y-[-12deg] hover:rotate-x-0 hover:rotate-y-0 md:scale-110 hover:scale-100' controls autoPlay loop muted playsInline></video>
        </div>
      </div>

      {/* Custom CSS for Shimmer Animation */}
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 3s infinite linear;
          }
        `}
      </style>
    </div>
  );
}

export default Hero;