import React from 'react';
import Navbar from '../components/navigations/Navbar';
import { Outlet } from 'react-router-dom';

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;