import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import bg_party from '../assets/bg_party.jpg';
import google_svg from '../assets/google_svg.svg';

console.log('SVG URL:', bg_party);

function SignIn() {
  const [isSignInView, setIsSignInView] = useState(true);
  const toggleView = () => setIsSignInView((prev) => !prev);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-200'>
      <div className='flex flex-col md:flex-row flex-wrap items-center justify-center px-10 py-6 gap-20 max-w-5xl mx-auto bg-white rounded-2xl shadow-lg'>
        <AnimatePresence mode="wait">
          {isSignInView ? (
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className="flex flex-row flex-wrap items-center justify-center gap-20"
            >
              <div className='flex flex-col '>
                <h2 className='text-2xl md:text-3xl font-semibold mb-6 text-gray-800'>Sign In</h2>
                <form className='space-y-'>
                  <div>
                    <div>
                      <label htmlFor="username">Username</label>
                    </div>
                    <div>
                      <input className='bg-gray-200 w-full focus:outline-1 focus:outline-red-500 px-2 py-1 rounded-xl p-0.5 mb-3' type="text" id="username" name="username" required placeholder="Enter username"/>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="password">Password</label>
                    </div>
                    <div>
                      <input className='bg-gray-200 w-full focus:outline-1 focus:outline-red-500 px-2 py-1 rounded-xl p-0.5 mb-3' type="password" id="password" name="password" required placeholder="Enter password"/>
                    </div>
                  </div>
                  <button className='w-full bg-red-800 text-white my-4 px-2 py-1 rounded-xl hover:bg-blue-950 shadow-md hover:shadow-lg transition-all duration-300 active:scale-115 focus:outline-none focus:ring-2 focus:ring-red-500' type="submit">Sign In</button>
                  <label className='flex items-center justify-between space-x-1.5 text-sm text-gray-700'>
                    <input type="checkbox" name="rememberMe" id="rememberMe" className='form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out'/>
                    <span className='hover:text-black'>Remember Me</span>
                    <a className='ml-5 hover:text-black' href="#">Forgot Password</a>
                  </label>
                </form>
              </div>
              <div
                className="signUp flex flex-col items-center justify-end bg-cover bg-center min-h-[400px] min-w-[350px] bg-no-repeat rounded-2xl gap-4 pb-4"
                style={{ backgroundImage: `url(${bg_party})` }}
              >
                <h1 className='text-xl md:text-2xl font-semibold drop-shadow-md text-gray-200'>Welcome to CineMate.</h1>
                <h2 className='text-sm md:text-base font-medium drop-shadow-md text-gray-200'>Don't have an account?</h2>
                <button onClick={toggleView} className='px-5 py-1.5 mb-4 text-white block hover:bg-red-800 rounded-xl bg-blue-900 shadow-md hover:shadow-lg transition-all duration-300 active:scale-115' type="button">Sign Up</button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="flex flex-row flex-wrap items-center justify-center gap-20"
            >
              <div
                className="signUp flex flex-col items-center justify-end bg-cover bg-center min-h-[400px] min-w-[350px] bg-no-repeat rounded-2xl gap-4 pb-4"
                style={{ backgroundImage: `url(${bg_party})` }}
              >
                <h1 className='text-xl md:text-2xl font-semibold drop-shadow-md text-gray-200'>Welcome to CineMate.</h1>
                <h2 className='text-sm md:text-base font-medium drop-shadow-md text-gray-200'>Already have an account?</h2>
                <button onClick={toggleView} className='px-5 py-1.5 mb-4 text-white block hover:bg-red-800 rounded-xl bg-blue-900 shadow-md hover:shadow-lg transition-all duration-300 active:scale-115' type="button">Sign In</button>
              </div>
              <div className='flex flex-col '>
                <h2 className='text-2xl md:text-3xl font-semibold mb-6 text-gray-800'>Sign Up</h2>
                <form className='space-y-'>
                  <div>
                    <div>
                      <label htmlFor="username">Username</label>
                    </div>
                    <div>
                      <input className='bg-gray-200 w-full focus:outline-1 focus:outline-red-500 px-2 py-1 rounded-xl p-0.5 mb-3' type="text" id="username" name="username" required placeholder="Enter username"/>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="email">Email</label>
                    </div>
                    <div>
                      <input className='bg-gray-200 w-full focus:outline-1 focus:outline-red-500 px-2 py-1 rounded-xl p-0.5 mb-3' type="text" id="email" name="email" required placeholder="Enter Email"/>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="password">Password</label>
                    </div>
                    <div>
                      <input className='bg-gray-200 w-full focus:outline-1 focus:outline-red-500 px-2 py-1 rounded-xl p-0.5 mb-3' type="password" id="password" name="password" required placeholder="Enter password"/>
                    </div>
                  </div>
                  <button className='w-full bg-red-800 text-white mt-2 px-2 py-1 rounded-xl hover:bg-blue-950 shadow-md hover:shadow-lg transition-all duration-300 active:scale-115 focus:outline-none' type="submit">Register</button>
                </form>
                <button className='flex items-center justify-center mt-2 gap-2 bg-gray-200 border border-gray-400 rounded-xl px-2 py-1 text-gray-700 font-medium shadow-md hover:shadow-lg hover:bg-gray-300 transition-all duration-300 active:scale-115 focus:outline-none'>
                  <img src={google_svg} alt="Google" className="w-6 h-6" />
                  Sign in with Google
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SignIn;