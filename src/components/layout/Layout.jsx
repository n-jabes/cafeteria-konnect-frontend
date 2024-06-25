// src/components/Layout.jsx
import React, { useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';


const Layout = ({ children, sidebarFields, headerTitle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        sidebarFields={sidebarFields}
      />
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 transition-all duration-300">
        <Header toggleSidebar={toggleSidebar} headerTitle={headerTitle} />
        <main className="flex-1 p-4 overflow-y-auto w-[100vw] md:w-full ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
