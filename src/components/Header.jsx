import React, { useState } from 'react';
import logo from '../assets/CineMateLOGO.png';
import bx_user from '../assets/SVGs/header_SVGs/bx_user.svg';
import hamburger from '../assets/SVGs/header_SVGs/hamburger.svg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='flex items-center justify-between bg-gradient-to-r from-red-700 to-blue-950 text-white relative'>
      <div className='flex-none w-[25%]'>
        <a href="#" className='inline-block'>
          <img className='scale-200 w-14 h-12 md:w-20 md:h-15' src={logo} alt="Camera Icon" />
        </a>
      </div>

      {/* Desktop Navigation */}
      <ul className='w-[75%] hidden gap-10 mx-10 md:flex items-center justify-between text-lg'>
        <li><a href="#" className='inline-block transform transition-transform duration-200 hover:scale-110 hover:shadow-2xl p-1'>Features</a></li>
        <li><a href="#" className='inline-block transform transition-transform duration-200 hover:scale-110 hover:shadow-2xl p-1'>How it Works</a></li>
        <li><a href="#" className='inline-block transform transition-transform duration-200 hover:scale-110 hover:shadow-2xl p-1'>Support</a></li>
        <li>
          <a href="#">
            <img className='md:w-9 md:h-9 transform transition-transform duration-200 hover:scale-110' src={bx_user} alt="User Icon" />
          </a>
        </li>
      </ul>

      {/* Mobile Hamburger Button */}
      <button className='md:hidden p-2 mr-4 focus:outline-none' onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
        <img src={hamburger} alt="Menu" className='w-10 h-10' />
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className='fixed inset-0 bg-gradient-to-b from-red-700/50 to-blue-950/50  z-10 md:hidden' onClick={toggleMenu}>
        </div>
      )}

      {/* Mobile Slide-in Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-3/4 bg-gradient-to-r from-red-700 to-blue-950 text-white z-20 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className='flex flex-col items-start p-6 space-y-8 mt-16'>
          <div className='flex items-center justify-between w-full'>
            <a href="#" className='inline-block' onClick={toggleMenu}>
            <img className='scale-200 w-15 h-12 md:w-20 md:h-15' src={logo} alt="Camera Icon" />
            </a>
            <button className='p-2 focus:outline-none transform transition-transform duration-200 hover:scale-120' onClick={toggleMenu} aria-label="Close menu">
              ✕
            </button>
          </div>
          <a href="#" className='text-xl transform transition-transform duration-200 hover:scale-105 p-1' onClick={toggleMenu}>
            Features
          </a>
          <a href="#" className='text-xl transform transition-transform duration-200 hover:scale-105 p-1' onClick={toggleMenu}>
            How it Works
          </a>
          <a href="#" className='text-xl transform transition-transform duration-200 hover:scale-105 p-1' onClick={toggleMenu}>
            Support
          </a>
          <a href="#" className='text-xl transform transition-transform duration-200 hover:scale-105 p-1' onClick={toggleMenu}>
            <img className='w-8 h-8' src={bx_user} alt="User Icon" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;