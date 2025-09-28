import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaFileAlt,
  FaUsers,
  FaHistory,
  FaQuestionCircle,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navLinks = [
    { to: '/admin/dashboard', icon: <FaTachometerAlt />, text: 'Dashboard' },
    { to: '/admin/produk', icon: <FaBoxOpen />, text: 'Manajemen Produk' },
    { to: '/admin/barang-masuk', icon: <FaArrowCircleDown />, text: 'Barang Masuk' },
    { to: '/admin/barang-keluar', icon: <FaArrowCircleUp />, text: 'Barang Keluar' },
    { to: '/admin/laporan', icon: <FaFileAlt />, text: 'Laporan Stok' },
    { to: '/admin/pengguna', icon: <FaUsers />, text: 'Manajemen Pengguna' },
    { to: '/admin/riwayat', icon: <FaHistory />, text: 'Riwayat Aktivitas' },
    { to: '/admin/bantuan', icon: <FaQuestionCircle />, text: 'Bantuan' },
  ];

  return (
    <div
      className={`bg-primary text-light h-screen p-4 flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-10">
          {!isCollapsed && (
            <h1 className="text-2xl font-bold">
              Store<span className="text-secondary">Ease</span>
            </h1>
          )}
          <button onClick={toggleSidebar} className="text-light focus:outline-none">
            {isCollapsed ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
          </button>
        </div>
        <ul>
          {navLinks.map((link) => (
            <li key={link.to} className="mb-4">
              <Link
                to={link.to}
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                  location.pathname === link.to
                    ? 'bg-pink-600'
                    : 'hover:bg-pink-600'
                }`}
              >
                <span className="mr-4 text-xl">{link.icon}</span>
                {!isCollapsed && <span className="font-medium">{link.text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;