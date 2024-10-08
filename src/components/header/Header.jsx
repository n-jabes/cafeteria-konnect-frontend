// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { FaBars, FaBell, FaRegEdit, FaTimes } from 'react-icons/fa';
import { ViewNotification } from '../buttons/Buttons';
import { MdEdit } from 'react-icons/md';
import { API_BASE_URL } from '../../utils/api';
import axios from 'axios';

const Header = ({ toggleSidebar, headerTitle }) => {
  const [viewNotification, setViewNotificattion] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [viewEditForm, setViewEditForm] = useState(false);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(sessionStorage.getItem('role'));
  const token = sessionStorage.getItem('token');

  const handleHideProfile = () => {
    setViewProfile(!viewProfile);
    setViewEditForm(!viewEditForm);
  };

  const getUserProfile = async () => {
    // console.log('token: ',token)
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log('Fetched Succesfully: ', response);
      setUser(response.data.data);
      sessionStorage.setItem('User', JSON.stringify(response.data.data));
    } catch (error) {
      console.log(error);
      console.log(
        'Failed to get user details: ',
        error?.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [token]);

  useEffect(() => {
    setRole(sessionStorage.getItem('role'));
  }, []);

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
        <div className="flex items-center gap-4" onClick={handleHideProfile}>
          <img
            src={
              role === 'HR' ? '/Coat_of_arms.png' : '/Bourbon_Coffee_Logo.png'
            }
            alt="Profile"
            className={`h-10 w-10 rounded-full ${
              role === 'RESTAURANT' && 'border-[1px] border-gray-300 p-[2px]'
            }`}
          />
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-mainBlue"></div>
            </div>
          ) : (
            <div className="text-left cursor-pointer hidden md:block">
              <p className="text-gray-600 text-sm sm:text-md font-medium">
                {user?.names || ''}
              </p>
              <p className="text-xs text-gray-400">{role}</p>
            </div>
          )}
        </div>
      </div>
      {viewProfile && (
        <div className="w-[90vw] sm:w-[75vw] md:w-[55vw] lg:w-[25vw] h-max py-4 px-4 bg-white absolute right-[2.5rem] top-[12.5vh] flex flex-col items-center z-[5] shadow-xl rounded-md">
          <div className="w-full flex items-center justify-between mb-2">
            <button
              className="w-max flex items-start py-2 px-4 bg-transparent border-[1px] border-mainBlue rounded-[5px] text-xs text-mainBlue hover:bg-mainBlue hover:text-white"
              onClick={() => setViewEditForm(!viewEditForm)}
            >
              <span className="">{viewEditForm ? 'Back' : 'Edit'}</span>
            </button>
            <button
              className="p-2 bg-transparent border-[1px] border-red-200 rounded-[5px] text-red-500 bg-[#626262] hover:bg-red-600 hover:text-white hover:border-red-600"
              onClick={handleHideProfile}
            >
              <FaTimes size={12} />
            </button>
          </div>
          <img
            src={
              role === 'HR' ? '/Coat_of_arms.png' : '/Bourbon_Coffee_Logo.png'
            }
            alt="Profile"
            className="h-[5rem] w-[5rem] rounded-md"
          />
          <div className="w-full">
            {viewEditForm ? (
              <form action="" className="w-full px-2 mt-4">
                <input
                  type="text"
                  className="w-full outline-none border-b-[1px] border-b-gray-300 py-2 px-2 text-sm mb-2"
                  placeholder={`${user.names}`}
                />
                <input
                  type="email"
                  className="w-full outline-none border-b-[1px] border-b-gray-300 py-2 px-2 text-sm mb-2"
                  placeholder={`${user.email}`}
                />
                <input
                  type="text"
                  className="w-full outline-none border-b-[1px] border-b-gray-300 py-2 px-2 text-sm mb-2"
                  placeholder={`${user.nationalId}`}
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
                  className="w-full text-center py-2 bg-mainBlue border-[1px] border-mainBlue rounded-md text-white font-medium hover:text-mainBlue hover:bg-white mt-3 mb-2"
                >
                  Update
                </button>
              </form>
            ) : (
              <div className="w-[80%] mx-auto flex flex-col gap-2 mt-4 mb-2">
                <h2 className="text-gray-500 font-medium text-sm">
                  Name:
                  <span className="ml-4 text-gray-700 font-medium">
                    {user.names}
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
                    {user.email}
                  </span>
                </h2>
                <h2 className="text-gray-500 font-medium text-sm">
                  National ID:
                  <span className="ml-4 text-gray-400 font-medium">
                    {user.nationalId}
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
