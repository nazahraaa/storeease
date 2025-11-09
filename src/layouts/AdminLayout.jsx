import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/navigations/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
      <Sidebar />
      <main className="flex-1 w-full p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminLayout;