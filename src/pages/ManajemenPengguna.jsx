// src/pages/ManajemenPengguna.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaUserShield, FaUserCog } from 'react-icons/fa';

// Data dummy untuk pengguna. Nantinya, ini akan diambil dari database.
const userData = [
  { id: 1, name: 'Andrina Zahra', username: 'nana', email: 'nazahra@example.com', role: 'Admin', status: 'Aktif' },
  { id: 2, name: 'Abelya Octaviani', username: 'abel', email: 'abelov@example.com', role: 'User', status: 'Aktif' },
  { id: 3, name: 'Aisyah Aeni', username: 'aisyah', email: 'aisyah@example.com', role: 'User', status: 'Tidak Aktif' },
  { id: 4, name: 'Farah Monica', username: 'farah', email: 'farahmnc@example.com', role: 'User', status: 'Aktif' },
  { id: 5, name: 'Fidela', username: 'fidel', email: 'dela@example.com', role: 'Admin', status: 'Aktif' },
  { id: 4, name: 'Nabilah Rachmawati', username: 'nabilah', email: 'bila@example.com', role: 'User', status: 'Aktif' },
  { id: 5, name: 'Sarah Cyntia', username: 'sarah', email: 'sarahcyn@example.com', role: 'Admin', status: 'Aktif' },
];
 
const ManajemenPengguna = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getRoleClass = (role) => {
    return role === 'Admin' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const getStatusClass = (status) => {
    return status === 'Aktif'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manajemen Pengguna</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300"
        >
          <FaPlus className="mr-2" />
          Tambah Pengguna
        </motion.button>
      </div>

      {/* Filter dan Pencarian */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Cari pengguna berdasarkan nama, username, atau email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">Semua Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>

      {/* Tabel Pengguna */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Nama Lengkap</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Username</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Email</th>
              <th className="px-4 py-2 text-center text-gray-600 font-semibold">Role</th>
              <th className="px-4 py-2 text-center text-gray-600 font-semibold">Status</th>
              <th className="px-4 py-2 text-center text-gray-600 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-gray-700">{user.username}</td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full ${getRoleClass(user.role)}`}>
                    {user.role === 'Admin' ? <FaUserShield className="mr-1" /> : <FaUserCog className="mr-1" />}
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700 transition-colors">
                    <FaEdit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition-colors">
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManajemenPengguna; 