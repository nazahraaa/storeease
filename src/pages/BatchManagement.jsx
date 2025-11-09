// src/pages/BatchManagement.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaBoxOpen, FaSpinner, FaUser } from 'react-icons/fa';

import BatchServices from '../services/BatchServices';
import BatchModal from '../components/modals/BatchModal';


const BatchManagement = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
  };

  const [batches, setBatches] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const fetchBatches = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await BatchServices.getAll(searchTerm, statusFilter);
      setBatches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  // --- Fungsi Helper Baru ---
  const getStatusClass = (status) => {
    switch (status) {
      case 'Aktif': case 'Tersedia':
        return 'bg-green-100 text-green-800';
      case 'Segera Kadaluarsa': case 'Stok Menipis':
        return 'bg-yellow-100 text-yellow-800';
      case 'Karantina': case 'Ditarik':
        return 'bg-blue-100 text-blue-800';
      case 'Kadaluarsa': case 'Habis': case 'Rusak':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Menghitung Sisa Umur Produk (poin Anda)
  const calculateRemainingDays = (expiryDate) => {
    const today = new Date();
    const expDate = new Date(expiryDate);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return { text: 'Lewat', class: 'text-red-600 font-bold' };
    if (diffDays <= 180) return { text: `${diffDays} hari`, class: 'text-yellow-600 font-bold' };
    return { text: `${diffDays} hari`, class: 'text-green-600' };
  };

  // --- Handler Modal & CRUD ---
  const handleOpenAddModal = () => {
    setSelectedBatch(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (batch) => {
    setSelectedBatch(batch);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBatch(null);
  };

  const handleFormSubmit = async (formData) => {
    setIsModalLoading(true);
    setError(null);
    try {
      if (selectedBatch) {
        await BatchServices.update(selectedBatch._id, formData);
      } else {
        await BatchServices.create(formData);
      }
      handleCloseModal();
      fetchBatches();
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleDeleteBatch = async (batchId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus batch ini?')) {
      try {
        await BatchServices.remove(batchId);
        fetchBatches();
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manajemen Batch/Lot</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300"
          onClick={handleOpenAddModal}
        >
          <FaPlus className="mr-2" />
          Tambah Batch Baru
        </motion.button>
      </div>

      {/* Panel Kontrol (Filter + Search) */}
      <motion.div 
        className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row items-center gap-4"
        variants={pageVariants}
      >
        <div className="relative flex-grow w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari ID, Nama, SKU, Kategori, Lokasi..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-gray-600 font-medium whitespace-nowrap">Filter Status:</label>
          <select 
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Semua">Semua Status</option>
            <optgroup label="Status Sistem">
              <option value="Aktif">Aktif</option>
              <option value="Stok Menipis">Stok Menipis</option>
              <option value="Segera Kadaluarsa">Segera Kadaluarsa</option>
              <option value="Kadaluarsa">Kadaluarsa</option>
              <option value="Habis">Habis</option>
            </optgroup>
            <optgroup label="Status Manual">
              <option value="Tersedia">Tersedia</option>
              <option value="Karantina">Karantina</option>
              <option value="Rusak">Rusak</option>
              <option value="Ditarik">Ditarik</option>
            </optgroup>
          </select>
        </div>
      </motion.div>

      {/* Alert Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabel Data */}
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden"
        variants={pageVariants}
      >
        <div className="overflow-x-auto">
          {/* Tambah min-w agar responsif */}
          <table className="w-full table-auto min-w-[1200px]"> 
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Info Produk</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kategori</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Jumlah</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lokasi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sisa Hari (Umur)</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status Sistem</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status Manual</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dibuat Oleh</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.tr key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <td colSpan="9" className="text-center py-16">
                      <FaSpinner className="animate-spin text-4xl text-primary mx-auto" />
                      <p className="mt-2 text-gray-500">Memuat data...</p>
                    </td>
                  </motion.tr>
                )}

                {!isLoading && batches.length > 0 && batches.map((batch) => {
                  const remaining = calculateRemainingDays(batch.expiryDate);
                  return (
                    <motion.tr
                      key={batch._id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="hover:bg-gray-50"
                    >
                      {/* Info Produk (Digabung) */}
                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium text-gray-800">{batch.productName}</div>
                        <div className="text-gray-500">{batch.productSKU} | <span className="font-semibold text-gray-700">{batch.batchId}</span></div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{batch.category}</td>
                      <td className={`px-4 py-3 text-sm text-center font-bold ${batch.quantity < 20 ? 'text-orange-500' : 'text-gray-800'}`}>
                        {batch.quantity} <span className="text-xs font-normal text-gray-500">{batch.unit}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{batch.location || '-'}</td>
                      <td className={`px-4 py-3 text-sm ${remaining.class}`}>
                        {remaining.text}
                        <div className="text-xs text-gray-500 font-normal">({new Date(batch.expiryDate).toLocaleDateString('id-ID')})</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(batch.systemStatus)}`}>
                          {batch.systemStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(batch.manualStatus)}`}>
                          {batch.manualStatus}
                        </span>
                      </td>
                      {/* User Input (Dibuat Oleh) */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center">
                          <FaUser className="w-3 h-3 mr-1.5 text-gray-400"/>
                          {batch.createdBy ? batch.createdBy.username : 'Sistem'}
                        </div>
                        <div className="text-xs text-gray-500">{new Date(batch.createdAt).toLocaleDateString('id-ID')}</div>
                      </td>
                      {/* Tombol Aksi */}
                      <td className="px-4 py-3">
                        <div className="flex justify-center space-x-2">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-blue-500 rounded-full hover:bg-blue-100" onClick={() => handleOpenEditModal(batch)}>
                            <FaEdit size={16} />
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-red-500 rounded-full hover:bg-red-100" onClick={() => handleDeleteBatch(batch._id)}>
                            <FaTrash size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        <AnimatePresence>
          {!isLoading && batches.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} exit={{ opacity: 0 }} className="text-center py-16 text-gray-500">
              <FaBoxOpen className="mx-auto text-5xl mb-4 text-gray-400" />
              <p className="text-lg font-semibold">Data tidak ditemukan</p>
              <p className="text-sm">Coba ubah kata kunci pencarian atau filter status Anda.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Render Modal */}
      <BatchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={selectedBatch}
        isLoading={isModalLoading}
      />
    </motion.div>
  );
};

export default BatchManagement;