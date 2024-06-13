// src/components/Sidebar.jsx
import { React, useEffect, useState } from 'react';
import { IoIosLogOut, IoIosCloseCircleOutline } from 'react-icons/io';
import { RiCloseLargeLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, sidebarFields }) => {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Find the default active item based on current location
    const defaultItem = sidebarFields.find((field) =>
      location.pathname.includes(field.destination)
    );
    if (defaultItem) {
      setActiveItem(defaultItem.id);
    }
  }, [location.pathname, sidebarFields]);

  const handleLogout = () => {
    // Implement your logout logic here
    // Example: clear authentication tokens, redirect, etc.
    console.log('Logged out');
  };

  // Function to handle click on sidebar item
  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#4069B0] text-white w-64 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
    >
      <div className="p-4 flex items-center justify-evenly">
        <Link to="/hr/statistics" className="flex items-center justify-center">
          <img src="/Logo.png" />
        </Link>
        <button
          className="block md:hidden absolute right-4 top-4"
          onClick={toggleSidebar}
        >
          <RiCloseLargeLine />
        </button>
      </div>
      <ul className="mt-4 flex flex-col items-end">
        {sidebarFields.map((field) => (
          <li
            key={field.id}
            className={`p-2 w-[87.5%] mb-3 rounded-l-full font-semibold ${
              activeItem === field.id
                ? 'bg-white text-[#4069B0]'
                : 'hover:bg-white hover:text-[#4069B0]'
            }`}
            onClick={() => handleItemClick(field.id)}
          >
            <Link to={field.destination} className="ml-6 flex items-center">
              {field.icon}
              {field.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-4 left-4 right-4">
        <button
          className="flex items-center justify-center gap-2 w-full py-2 px-4 hover:bg-white border border-2 font-semibold hover:text-[#4069B0] rounded-md shadow-md bg-[#4069B0] text-white"
          onClick={handleLogout}
        >
          Logout
          <IoIosLogOut />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
