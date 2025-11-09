import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FaUserCircle, FaSignOutAlt, FaChevronUp } from 'react-icons/fa';

const ProfileDropDownAdmin = ({ isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { auth, logout } = useAuth();

  // Ambil nama dari context, berikan fallback
  const userName = auth.user?.nama || "Admin";

  // Fungsi untuk membuat inisial (cth: "Donny Indra" -> "DI")
  const getInitials = (name) => {
    try {
      const parts = name.split(' ');
      const first = parts[0]?.[0] || '';
      const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : '';
      return (first + last).toUpperCase();
    } catch (e) {
      return "A";
    }
  };

  const initials = getInitials(userName);

  // Fungsi untuk toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Fungsi untuk handle logout
  const handleLogout = () => {
    logout();
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Menu Dropdown (Muncul ke atas) */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-md shadow-lg z-50 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link
              to="/admin/profile" 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FaUserCircle className="mr-3" />
              Profile
            </Link>
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

      {/* Tombol Pemicu Dropdown (Avatar dan Nama) */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center w-full p-3 rounded-lg text-light hover:bg-pink-600 transition-all duration-300 ${
          isCollapsed ? 'justify-center' : ''
        }`}
      >
        {/* Avatar Inisial */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-700 flex items-center justify-center border-2 border-pink-400">
          <span className="text-sm font-bold">{initials}</span>
        </div>

        {/* Nama dan Chevron (hanya tampil jika sidebar tidak terlipat) */}
        {!isCollapsed && (
          <>
            <span className="ml-3 font-medium text-left flex-1">
              {userName}
            </span>
            <FaChevronUp
              className={`transition-transform duration-300 ${
                isOpen ? 'rotate-0' : 'rotate-180'
              }`}
            />
          </>
        )}
      </button>
    </div>
  );
};

export default ProfileDropDownAdmin;