import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';
import create_room from '../assets/SVGs/hero_SVGs/create_room.svg';
import copy_svg from '../assets/SVGs/hero_SVGs/copy_svg.svg';
import join_room from '../assets/SVGs/hero_SVGs/join_room.svg';
import preview from '../assets/mixkit_clapperboard.mp4';

function Hero() {
  const navigate = useNavigate()

  const [isCreateModal, setCreateModal] = useState(false);
  const [isJoinModal, setJoinModal] = useState(false);

  // Handle scroll lock when modals are open
  useEffect(() => {
    if (isCreateModal || isJoinModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCreateModal, isJoinModal]);

  const toggleCreateModal = () => {
    setCreateModal(!isCreateModal);
  };

  const toggleJoinModal = () => {
    setJoinModal(!isJoinModal);
  };

  const handleCreateRoomSubmit = () => {
    setCreateModal(false);
    navigate('/room'); // Navigate to /room
  };

  const handleJoinRoomSubmit = () => {
    setJoinModal(false);
  };

  return (
    <>
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
            <button 
              onClick={toggleCreateModal} 
              className="flex items-center gap-2 m-2 border-2 border-black shadow-md hover:shadow-xl hover:scale-102 rounded-lg transition-all duration-300 active:scale-108 group w-50"
              aria-expanded={isCreateModal}
              aria-haspopup="dialog"
            >
              <img className="w-6 ml-1 h-6" src={create_room} alt="" />
              <p className="text-sm md:text-base flex-1 bg-red-800 group-hover:bg-blue-900 transition-colors duration-300 text-white px-3 py-1 rounded-r-md">
                Create New Room
              </p>
            </button>
            <button 
              onClick={toggleJoinModal} 
              className="flex items-center gap-2 m-2 border-2 border-black shadow-md hover:shadow-xl hover:scale-102 rounded-lg transition-all duration-300 active:scale-108 group w-50"
              aria-expanded={isJoinModal}
              aria-haspopup="dialog"
            >
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

      {/* Create Room Modal */}
      <AnimatePresence>
        {isCreateModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute inset-0 bg-red-700/20"
              style={{ pointerEvents: 'none' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.div 
              className="relative z-50 flex flex-col items-center w-80 p-6 bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
              role="dialog"
              aria-modal="true"
              aria-labelledby="create-room-heading"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span id="create-room-heading" className='text-xl font-semibold text-gray-900 mb-2'>Create Room</span>
              <span className='text-sm text-gray-800 mb-3'>Your Room has been created with Room ID:</span>
              <div className='flex items-center justify-between border border-gray-700 rounded-full w-full bg-gray-100 hover:bg-gray-300 transition-colors duration-300 px-4 py-2'>
                <span className='flex-1 text-center text-gray-800 font-medium'>52F96B7B</span>
                <div className='w-5 h-5 mx-1 relative before:content-[""] before:absolute before:left-[-10px] before:top-0 before:h-full before:border-l before:border-gray-700'>
                  <img src={copy_svg} className='w-full h-full hover:cursor-pointer hover:scale-115 transition-all duration-200' alt="Share" />
                </div>
              </div>
              <span className='text-sm text-gray-800 mt-3 text-center'>You can share this Room ID with your friends to join your room.</span>
              <button 
                onClick={handleCreateRoomSubmit}
                className="flex items-center gap-2 m-2 border-2 border-black shadow-md hover:shadow-xl hover:scale-102 rounded-lg transition-all duration-300 active:scale-108 group w-50"
              >
                <img className="w-6 ml-1 h-6" src={create_room} alt="" />
                <p className="text-sm md:text-base flex-1 bg-red-800 group-hover:bg-blue-900 transition-colors duration-300 text-white px-4 py-1 rounded-r-md">
                  Go to Room
                </p>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Join Room Modal */}
      <AnimatePresence>
        {isJoinModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setJoinModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute inset-0 bg-blue-700/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.div 
              className="relative z-50 flex flex-col items-center w-80 p-6 bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="join-room-heading"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span id="join-room-heading" className='text-xl font-semibold text-gray-900 mb-2'>Join Room</span>
              <span className='text-sm text-gray-800 mb-3'>Enter the Room ID to join the Room:</span>
              <div className='flex items-center justify-between border border-gray-700 rounded-full w-full bg-gray-100 transition-colors duration-300 px-4 py-2'>
                <input
                  type='text' 
                  maxLength='8' 
                  placeholder='e.g., 52F96B7B' 
                  className='flex-1 text-center text-gray-800 font-medium bg-transparent outline-none placeholder-gray-500' 
                  pattern='[0-9A-Fa-f]{8}'
                  title='Enter an 8-digit hexadecimal Room ID (e.g., 52F96B7B)'
                  onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                />
              </div>
              <span className='text-sm text-gray-800 mt-3 text-center'>Join your friends' room by clicking below. Have fun streaming!</span>
              <button 
                onClick={handleJoinRoomSubmit}
                className="flex items-center gap-2 m-2 border-2 border-black shadow-md hover:shadow-xl hover:scale-102 rounded-lg transition-all duration-300 active:scale-108 group w-50"
              >
                <img className="w-6 ml-1 h-6" src={join_room} alt="" />
                <p className="text-sm md:text-base flex-1 bg-blue-900 group-hover:bg-red-800 transition-colors duration-300 text-white px-4 py-1 rounded-r-md">
                  Go to Room
                </p>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Hero;