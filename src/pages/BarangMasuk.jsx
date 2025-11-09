import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave } from 'react-icons/fa';
import CustomSelect from '../components/CustomSelect';

const BarangMasuk = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Dummy data untuk dropdown, diubah menjadi format { value, label }
  const productOptions = [
    { value: 'SKU-001', label: 'Somethinc Niacinamide Serum' },
    { value: 'SKU-002', label: 'Whitelab Brightening Day Cream' },
    { value: 'SKU-003', label: 'Azarine Hydrasoothe Sunscreen Gel' },
    { value: 'SKU-004', label: 'Avoskin Miraculous Refining Toner' },
    { value: 'SKU-005', label: 'Scarlett Whitening Acne Serum' },
  ];
  
  // Tambahkan state untuk menyimpan nilai terpilih
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produk Terpilih:", selectedProduct);
    alert('Logika penyimpanan data akan diimplementasikan di sini.');
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Catat Barang Masuk</h1>

      <motion.div
        className="bg-white p-8 rounded-lg shadow-md"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kolom Kiri */}
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Pilih Produk</label>
                <CustomSelect
                  options={productOptions}
                  value={selectedProduct}
                  onChange={setSelectedProduct}
                  placeholder="Pilih Produk"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Nomor Batch / Lot Baru</label>
                <input
                  type="text"
                  placeholder="Contoh: B006 atau L202310"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Jumlah Masuk</label>
                <input
                  type="number"
                  placeholder="Masukkan jumlah stok"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Kolom Kanan */}
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Tanggal Masuk</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]} // Default tanggal hari ini
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Tanggal Kadaluarsa</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Supplier (Opsional)</label>
                <input
                  type="text"
                  placeholder="Nama supplier"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6 text-right">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center justify-center bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300"
            >
              <FaSave className="mr-2" />
              Simpan Data
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BarangMasuk;