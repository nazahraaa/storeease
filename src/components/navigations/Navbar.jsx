import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import ProfileDropDownUser from '../ux/ProfileDropDownUser';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fungsi logout khusus untuk mobile menu
  const handleLogoutMobile = () => {
    setIsOpen(false);
    logout();
  };

  const navLinks = [
    { to: '/user/beranda', text: 'Beranda' },
    { to: '/user/stok', text: 'Lihat Stok Produk' },
    { to: '/user/barang-masuk', text: 'Barang Masuk' },
    { to: '/user/barang-keluar', text: 'Barang Keluar' },
    { to: '/user/riwayat', text: 'Riwayat Aktivitas' },
    { to: '/user/bantuan', text: 'Bantuan' },
  ];

  return (
    <nav className="bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/user/beranda" className="text-light text-2xl font-bold">
              Store<span className="text-secondary">Ease</span>
            </Link>
          </div>
          
          {/* Navigasi Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Link Navigasi */}
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-light hover:bg-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
              >
                {link.text}
              </Link>
            ))}
            
            {/* Garis Pemisah (Opsional) */}
            <div className="border-l border-pink-400 h-6 mx-2"></div>

            {/* Dropdown Profile Desktop */}
            <ProfileDropDownUser />
          </div>

          {/* Tombol Hamburger (Mobile) */}
          <div className="md:hidden flex items-center">
            <ProfileDropDownUser />

            <button
              onClick={toggleMenu}
              className="text-light hover:text-white focus:outline-none ml-3" // Tambah margin
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu (Dropdown dari hamburger) */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Link Navigasi Mobile */}
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-light hover:bg-pink-600 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;