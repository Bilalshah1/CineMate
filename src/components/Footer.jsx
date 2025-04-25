import React from 'react';
import logo from '../assets/CineMateLOGO.png';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-700 to-blue-950 text-white px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="flex items-center space-y-1">
          <img src={logo} alt="Camera Icon" className="w-14 h-12 scale-150" />
          <p className="text-lg font-semibold">CineMate</p>
        </div>

        <ul className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          <li>
            <a href="https://github.com/faiqhaider25/CineMate" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-gray-300">
              GitHub Repo
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline hover:text-gray-300">
              Terms
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline hover:text-gray-300">
              Privacy
            </a>
          </li>
        </ul>

        <div className="text-sm text-center">
          © {new Date().getFullYear()} CineMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;