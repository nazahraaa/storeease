// src/components/CustomSelect.jsx

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

/**
 * Komponen Dropdown Kustom
 * @param {Object} props
 * @param {Array<Object>} props.options - Array objek, cth: [{ value: '1', label: 'Opsi 1' }]
 * @param {*} props.value - Nilai (value) yang sedang terpilih
 * @param {Function} props.onChange - Fungsi yang dipanggil saat opsi dipilih (mengembalikan 'value'-nya)
 * @param {string} props.placeholder - Teks yang tampil saat tidak ada nilai terpilih
 */
const CustomSelect = ({ options, value, onChange, placeholder = "-- Pilih --" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Varian animasi untuk dropdown
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // Menemukan label dari nilai yang terpilih
  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  // Menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handler saat memilih opsi
  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Tombol Pemicu Dropdown */}
      <button
        type="button" // Penting agar tidak men-submit form
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-left flex items-center justify-between focus:outline-none focus:ring-2 ${isOpen ? 'ring-primary' : 'focus:ring-primary'}`}
      >
        <span className={`truncate ${selectedOption ? 'text-gray-800' : 'text-gray-500'}`}>
          {displayLabel}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-gray-400" />
        </motion.div>
      </button>

      {/* Konten Dropdown yang Animate */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  option.value === value ? 'bg-primary text-white' : 'text-gray-800'
                }`}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;