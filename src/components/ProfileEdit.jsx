import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import bx_user from '../assets/SVGs/profile.svg';

import { useAuth } from '../auth/AuthContext'; 
import { updateUserProfile, deleteUserAccount } from '../utils/profiling';
import { useNavigate } from 'react-router-dom';


function ProfileEdit() {
  const { user, logout } = useAuth();
  
  const navigate = useNavigate();
  
  const [username, setUsername] = useState(user?.displayName || '');
  const [mobile, setMobile] = useState('+923269718360');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || '');
    }
  }, [user]);

  if (!user) return <p className='text-4xl text-center font-bold'>Loading...</p>;

  const handleChangePasswordClick = () => {
    if (!isPasswordChanged) {
      setShowPasswordFields(true);
      setIsPasswordChanged(true);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      // Password check logic
      let finalPassword = '';
      if (showPasswordFields) {
        if (newPassword !== confirmPassword) {
          return alert('Passwords do not match.');
        }
        finalPassword = newPassword;
      }

      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!phoneRegex.test(mobile)) {
        return alert('Please enter a valid mobile number (e.g., +12345678900).');
      }
      
      await updateUserProfile(user.uid, username, mobile, finalPassword);
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert(error.message); // For clear feedback
    }
  };  

  const handleDeleteAccountClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleDeleteAccountConfirm = async () => {
    try {
      await deleteUserAccount(user.uid);
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  
  return (
    <div className='w-full md:w-[90%] lg:w-[70%] xl:w-[50%] mx-4 md:mx-auto my-4 md:m-8 p-4 shadow-2xl bg-opacity-10 bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 backdrop-blur-lg rounded-lg'>
      <div className='flex flex-col md:flex-row items-center justify-between px-4 border-b-1 border-black'>
        <div className='text-2xl md:text-3xl lg:text-4xl font-bold font-mono mb-4 md:mb-0'>Welcome!</div>
        <div className='flex items-center gap-2 md:gap-4 my-4'>
          <img src={bx_user} className='w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-lg p-2' alt="Profile" />
          <div className='text-sm md:text-base'>
            {user?.displayName || 'User'} <br />
            {user?.email || 'email@domain.com'}
          </div>
        </div>
      </div>
      <form className="space-y-1 my-4" onSubmit={handleSaveChanges}>
        <div className='w-full md:w-[80%] lg:w-[60%] flex flex-col md:flex-row gap-1 md:gap-2 items-start md:items-center'>
          <label htmlFor="username" className="w-full md:w-1/4 text-left block text-xs font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            placeholder="Enter your username"
            className="mt-1 block w-full px-2 py-1 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className='w-full md:w-[80%] lg:w-[60%] flex flex-col md:flex-row gap-1 md:gap-2 items-start md:items-center'>
          <label htmlFor="email" className="w-full md:w-1/4 text-left block text-xs font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-2 py-1 md:py-2 border border-gray-300 rounded-md cursor-not-allowed"
            disabled
            value={user?.email || ''}
          />
        </div>

        <div className='w-full md:w-[80%] lg:w-[60%] flex flex-col md:flex-row gap-1 md:gap-2 items-start md:items-center'>
          <label htmlFor="mobile" className="w-full md:w-1/4 text-left block text-xs font-medium text-gray-700">Mobile</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            id="mobile"
            placeholder="Enter your mobile number"
            className="mt-1 block w-full px-2 py-1 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {showPasswordFields && (
          <>
            <div className='w-full md:w-[80%] lg:w-[60%] flex flex-col md:flex-row gap-1 md:gap-2 items-start md:items-center'>
              <label htmlFor="newPassword" className="w-full md:w-1/4 text-left block text-xs font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="newPassword"
                placeholder="Enter new password"
                className="mt-1 block w-full px-2 py-1 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className='w-full md:w-[80%] lg:w-[60%] flex flex-col md:flex-row gap-1 md:gap-2 items-start md:items-center'>
              <label htmlFor="confirmPassword" className="w-full md:w-1/4 text-left block text-xs font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                placeholder="Confirm new password"
                className="mt-1 block w-full px-2 py-1 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </>
        )}

        {!isPasswordChanged && (
          <div className='w-full md:w-[80%] lg:w-[60%]'>
            <button
              type="button"
              onClick={handleChangePasswordClick}
              className="w-full md:w-40 my-4 px-4 py-1 md:py-2 bg-red-800 hover:bg-blue-900 transition-all duration-300 text-white rounded-md active:scale-104"
            >
              Change Password
            </button>
          </div>
        )}

        <div className="mt-4 flex flex-col md:flex-row gap-2 md:gap-4">
          <button
            type="submit"
            className="w-full md:w-1/2 px-4 py-1 md:py-2 text-white rounded-md bg-blue-900 hover:bg-red-800 transition-all duration-300 active:scale-104"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDeleteAccountClick}
            className="w-full md:w-1/2 px-4 py-1 md:py-2 bg-red-900 text-white rounded-md hover:bg-red-700 active:scale-104"
          >
            Delete Account
          </button>
        </div>
      </form>

      <AnimatePresence>
        {isModalVisible && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/50"
              style={{ pointerEvents: 'none' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.div 
              className="relative z-50 flex flex-col items-center w-[90%] sm:w-80 p-4 sm:p-6 bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-account-heading"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span id="delete-account-heading" className='text-lg sm:text-xl font-semibold text-gray-900 mb-2'>Are you sure?</span>
              <span className='text-xs sm:text-sm text-gray-800 mb-3 text-center'>Do you really want to delete your account? This action cannot be undone.</span>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center">
                <button
                  onClick={handleDeleteAccountConfirm}
                  className="w-full sm:w-auto px-4 py-1 bg-red-900 text-white rounded-md hover:bg-red-700 active:scale-104"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={handleModalClose}
                  className="w-full sm:w-auto px-4 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 active:scale-104"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileEdit;