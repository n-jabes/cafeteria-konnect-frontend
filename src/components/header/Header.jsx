// src/components/Header.jsx
import React from 'react';
import { FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar, headerTitle }) => {
  return (
    <header className="bg-white shadow-md p-4 flex w-[100vw] md:w-full justify-between items-center">
      <div className="flex items-center">
        <button className="block lg:hidden" onClick={toggleSidebar}>
          <FaBars className="text-[#4069B0] mr-6" />
        </button>
        <h1 className="text-[#4069B0] text-xl sm:text-2xl font-bold select-none">
          {headerTitle}
        </h1>
      </div>
      <div className="flex items-center space-x-3 border-l-2 px-2">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
        <div className="text-left cursor-pointer hidden md:block">
          <p className="text-gray-600 text-sm sm:text-md font-medium">
            Nshuti Ruranga Jabes
          </p>
          <p className="text-xs text-gray-400">Human Resource Manager</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
