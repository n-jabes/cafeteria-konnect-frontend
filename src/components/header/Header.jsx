// src/components/Header.jsx
import React, { useState } from 'react';
import { FaBars, FaBell, FaRegEdit, FaTimes } from 'react-icons/fa';
import { ViewNotification } from '../buttons/Buttons';
import { MdEdit } from 'react-icons/md';

const Header = ({ toggleSidebar, headerTitle }) => {
  const [viewNotification, setViewNotificattion] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [viewEditForm, setViewEditForm] = useState(true);

  const handleHideProfile = () => {
    setViewProfile(!viewProfile)
    setViewEditForm(!viewEditForm)
  }
  return (
    <header className="bg-white shadow-md p-4 relative flex w-[100vw] md:w-full justify-between items-center">
      <div className="flex items-center">
        <button className="block lg:hidden" onClick={toggleSidebar}>
          <FaBars className="text-[#4069B0] mr-6" />
        </button>
        <h1 className="text-[#4069B0] text-xl sm:text-2xl font-bold select-none">
          {headerTitle}
        </h1>
      </div>

      {/* <div>
        react-icons/fa
      </div> */}
      <div className="flex items-center space-x-3 border-l-2 px-2">
        <div>
          <ViewNotification />
        </div>
        <div
          className="flex gap-4"
          onClick={handleHideProfile}
        >
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
      </div>
      {viewProfile && (
        <div className="w-[90vw] sm:w-[75vw] md:w-[55vw] lg:w-[25vw] h-max py-4 px-4 bg-white absolute right-[2.5rem] top-[12.5vh] flex flex-col items-center z-[5] shadow-xl rounded-md">
          <div className="w-full flex items-center justify-between mb-2">
            <button className="w-max flex items-start py-2 px-4 bg-transparent border-[1px] border-blue-200 rounded-[5px] text-xs text-blue-400 hover:bg-blue-500 hover:text-white"  onClick={() => setViewEditForm(!viewEditForm)}>
              <span className="">{viewEditForm? 'Back' : 'Edit'}</span>
            </button>
            <button
              className="p-2 bg-transparent border-[1px] border-red-200 rounded-[5px] text-red-500 bg-[#626262] hover:bg-red-600 hover:text-white hover:border-red-600"
              onClick={handleHideProfile}
            >
              <FaTimes size={12} />
            </button>
          </div>
          <img
            src="/profile.jpg"
            alt="Profile"
            className="h-[5rem] w-[5rem] rounded-md"
          />
          <div className="w-full">
            {viewEditForm ? (
              <form action="" className="w-full px-2 mt-4">
                <input
                  type="text"
                  className="w-full outline-none border-b-[1px] border-b-gray-300 py-2 px-2 text-sm mb-2"
                  placeholder="Name"
                />
                <input
                  type="email"
                  className="w-full outline-none border-b-[1px] border-b-gray-300 py-2 px-2 text-sm mb-2"
                  placeholder="Email"
                />
                <input
                  type="password"
                  className="w-full outline-none border-b-[1px] border-b-gray-300 py-2 px-2 text-sm mb-2"
                  placeholder="Password"
                />
                <input
                  type="password"
                  className="w-full outline-none border-b-[1px] border-b-gray-300 py-2 px-2 text-sm mb-2"
                  placeholder="Confirm password"
                />
                <button
                  type="submit"
                  className="w-full text-center py-2 bg-blue-500 border-[2px] border-blue-500 rounded-md text-white font-medium hover:text-blue-500 hover:bg-white mt-3 mb-2"
                >
                  Update
                </button>
              </form>
            ) : (
              <div className="w-[80%] mx-auto flex flex-col gap-2 mt-4 mb-2">
                <h2 className="text-gray-500 font-medium text-sm">
                  Name:
                  <span className="ml-4 text-gray-700 font-medium">
                    Nshuti Ruranga Jabes
                  </span>
                </h2>
                <h2 className="text-gray-500 font-medium text-sm">
                  Role:
                  <span className="ml-4 text-gray-400 font-medium">
                    Human Resource Manager
                  </span>
                </h2>
                <h2 className="text-gray-500 font-medium text-sm">
                  Email:
                  <span className="ml-4 text-gray-400 font-medium">
                    nshutij7@gmail.com
                  </span>
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
