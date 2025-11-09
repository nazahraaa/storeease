// src/components/auth/ProfileDropDownUser.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa'; // Menggunakan ikon panah ke bawah

const ProfileDropDownUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { auth, logout } = useAuth(); // Mengambil data auth dan fungsi logout

  // Ambil nama dari context, berikan fallback
  const userName = auth.user?.nama || "User";

  // Fungsi untuk membuat inisial (cth: "Budi Setiawan" -> "BS")
  const getInitials = (name) => {
    try {
      const parts = name.split(' ');
      const first = parts[0]?.[0] || '';
      const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : '';
      return (first + last).toUpperCase();
    } catch (e) {
      return "U"; // Fallback jika nama tidak valid
    }
  };

  const initials = getInitials(userName);

  // Fungsi untuk toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Fungsi untuk handle logout
  const handleLogout = () => {
    logout(); // Fungsi logout dari AuthContext akan menangani navigasi
  };

  // Efek untuk menutup dropdown saat klik di luar area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    // Tambahkan event listener
    document.addEventListener('mousedown', handleClickOutside);
    // Bersihkan saat komponen unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Tombol Pemicu Dropdown (Avatar dan Nama) */}
      <button
        onClick={toggleDropdown}
        className="flex items-center p-2 rounded-lg text-light hover:bg-pink-600 transition-all duration-300"
      >
        {/* Avatar Inisial */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-700 flex items-center justify-center border-2 border-pink-400">
          <span className="text-xs font-bold">{initials}</span>
        </div>

        {/* Nama (tampil di desktop) */}
        <span className="ml-2 font-medium text-sm hidden md:block">
          {userName}
        </span>
        {/* Chevron (tampil di desktop) */}
        <FaChevronDown
          className={`ml-1 transition-transform duration-300 hidden md:block ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Menu Dropdown (Muncul ke bawah) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {/* Info User (hanya tampil di mobile, sebagai header dropdown) */}
            <div className="px-4 py-2 border-b md:hidden">
                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{auth.user?.email || 'email'}</p>
            </div>

            {/* Link Profile */}
            <Link
              to="/user/profile" // Asumsi rute profile user
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)} // Tutup setelah di-klik
            >
              <FaUserCircle className="mr-3" />
              Profile
            </Link>

            {/* Tombol Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDownUser;