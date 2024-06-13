import React from 'react';
import { FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <button className="block md:hidden" onClick={toggleSidebar}>
        <FaBars className="text-white" />
      </button>
      <h1 className="text-white text-2xl">Dashboard</h1>
    </nav>
  );
};

export default Header;
