import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; // <-- Impor motion
import {
  FaTachometerAlt,
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaFileAlt,
  FaUsers,
  FaHistory,
  FaQuestionCircle,
  FaChevronLeft,
  FaChevronRight,
  FaTags,
} from 'react-icons/fa';
import ProfileDropDownAdmin from '../ux/ProfileDropDownAdmin';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navLinks = [
    { to: '/admin/dashboard', icon: <FaTachometerAlt />, text: 'Dashboard' },
    { to: '/admin/batch-management', icon: <FaTags />, text: 'Manajemen Batch/Lot Number' },
    { to: '/admin/barang-masuk', icon: <FaArrowCircleDown />, text: 'Barang Masuk' },
    { to: '/admin/barang-keluar', icon: <FaArrowCircleUp />, text: 'Barang Keluar' },
    { to: '/admin/laporan', icon: <FaFileAlt />, text: 'Laporan Stok' },
    { to: '/admin/pengguna', icon: <FaUsers />, text: 'Manajemen Pengguna' },
    { to: '/admin/riwayat', icon: <FaHistory />, text: 'Riwayat Aktivitas' },
    { to: '/admin/bantuan', icon: <FaQuestionCircle />, text: 'Bantuan' },
  ];

  return (
    <div
      className={`bg-primary text-light h-screen p-4 flex flex-col justify-between transition-all duration-300 shadow-lg ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Bagian Atas: Logo dan Navigasi */}
      <div>
        {/* --- PERBAIKAN LOGO & JUDUL --- */}
        <div className="flex items-center justify-between mb-10">
          {/* Logo dan Judul saat expand */}
          {!isCollapsed && (
            <div className="flex items-center">
              <img 
                src="/logo-thumbnail.png" 
                alt="StoreEase Logo" 
                className="w-10 h-10 object-contain" 
              />
              <h1 className="text-2xl font-bold ml-2">
                Store<span className="text-secondary">Ease</span>
              </h1>
            </div>
          )}
          
          {/* Tampilkan logo saja saat collapsed */}
          {isCollapsed && (
             <img 
                src="/logo-thumbnail.png" 
                alt="StoreEase Logo" 
                className="w-10 h-10 object-contain mx-auto" // Posisikan di tengah
              />
          )}
          
          {/* Tombol Toggle */}
          <button onClick={toggleSidebar} className="text-light focus:outline-none">
            {isCollapsed ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
          </button>
        </div>

        {/* --- PERBAIKAN ANIMASI LINK --- */}
        <ul>
          {navLinks.map((link, index) => (
            <motion.li 
              key={link.to} 
              className="mb-4"
              // Animasi stagger untuk setiap link
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
            >
              <Link
                to={link.to}
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                  location.pathname === link.to
                    ? 'bg-pink-600 shadow-md' // Beri shadow saat aktif
                    : 'hover:bg-pink-600 hover:translate-x-1' // Efek hover
                } ${isCollapsed ? 'justify-center' : ''}`} // Center icon saat collapsed
              >
                <span className={`text-xl ${isCollapsed ? '' : 'mr-4'}`}>{link.icon}</span>
                {!isCollapsed && <span className="font-medium">{link.text}</span>}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Bagian Bawah: Profile Dropdown */}
      <ProfileDropDownAdmin isCollapsed={isCollapsed} />
    </div>
  );
};

export default Sidebar;