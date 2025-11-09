import React from 'react';
import { motion } from 'framer-motion';

const InputField = ({ icon, type, placeholder, value, onChange }) => {
  return (
    <div className="relative flex items-center mb-4">
      <span className="absolute left-4 text-gray-400">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
        required
      />
    </div>
  );
};

export default InputField;