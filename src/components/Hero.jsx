import { div } from 'framer-motion/client';
import React from 'react';
import create_room from '../assets/create_room.svg';
import join_room from '../assets/join_room.svg';
import johnsnow_got from '../assets/johnsnow_got.jpg';
import breakingbad from '../assets/breakingbad.jpg';


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
          <button className="flex items-center gap-2 m-2 border-2 border-black shadow-md hover:shadow-xl hover:scale-102 rounded-lg transition-all duration-300 active:scale-105 group w-50">
            <img className="w-6 ml-1 h-6" src={create_room} alt="" />
            <p className="text-sm md:text-base flex-1 bg-red-800 group-hover:bg-blue-900 transition-colors duration-300 text-white px-4 py-1 rounded-r-md">
                Create New Room
            </p>
          </button>
          <button className="flex items-center gap-2 m-2 border-2 border-black shadow-md hover:shadow-xl hover:scale-102 rounded-lg transition-all duration-300 active:scale-105 group w-50">
            <img className="w-6 ml-1 h-6" src={join_room} alt="" />
            <p className="text-sm md:text-base flex-1 bg-blue-900 group-hover:bg-red-800 transition-colors duration-300 text-white px-4 py-1 rounded-r-md">
                Join Room
            </p>
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-2 justify-center md:flex-shrink-0 my-5">
            <img className="w-32 h-40 min-[423px]:w-45 min-[423px]:h-60 md:w-65 md:h-80 ml-3 rounded-2xl shadow-xl hover:shadow-black transition-all duration-300" src={johnsnow_got} alt=""/>
            <img className="w-32 h-40 min-[423px]:w-45 min-[423px]:h-60 md:w-65 md:h-80 ml-3 rounded-2xl shadow-xl hover:shadow-black transition-all duration-300" src={breakingbad} alt=""/>
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