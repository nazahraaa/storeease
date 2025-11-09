// src/layouts/AuthLayout.jsx

import React from 'react';
import BackgroundAnimated from '../components/BackgroundAnimated';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans relative overflow-hidden">
      <BackgroundAnimated />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="relative z-10 w-full max-w-md p-8 bg-light/80 backdrop-blur-md rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-6">
          <img
            src="/logo_storeease.png" // Path diperbarui dari 'public'
            alt="StoreEase Logo"
            className="w-24 h-24 mx-auto mb-4 object-contain"
          />
          <h1 className="text-4xl font-bold text-gray-800">
            Store<span className="text-primary">Ease</span>
          </h1>
          <p className="text-gray-500 mt-2">{title}</p>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;