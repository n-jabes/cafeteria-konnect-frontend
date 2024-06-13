// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, sidebarFields }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button className="block md:hidden" onClick={toggleSidebar}>
          Close
        </button>
      </div>
      <ul className="mt-4">
        {sidebarFields.map((field) => (
          <li className="p-4 w-[80] hover:bg-gray-700">
            <Link to={field.destination} className="flex items-center">
              
              {field.icon}
              {field.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
