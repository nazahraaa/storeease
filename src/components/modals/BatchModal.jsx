// src/components/modals/BatchModal.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave } from 'react-icons/fa';
import CustomSelect from '../CustomSelect'; // Kita akan gunakan ini

// Data dummy untuk simulasi auto-fill SKU
// (Diambil dari src/pages/BarangMasuk.jsx)
const productOptions = [
  { value: 'SKU-001', label: 'Somethinc Niacinamide Serum', category: 'Serum', unit: 'botol' },
  { value: 'SKU-002', label: 'Whitelab Brightening Day Cream', category: 'Pelembab', unit: 'tube' },
  { value: 'SKU-003', label: 'Azarine Hydrasoothe Sunscreen Gel', category: 'Sunscreen', unit: 'tube' },
  { value: 'SKU-004', label: 'Avoskin Miraculous Refining Toner', category: 'Toner', unit: 'botol' },
  { value: 'SKU-005', label: 'Scarlett Whitening Acne Serum', category: 'Serum', unit: 'botol' },
];

const BatchModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const isEditMode = Boolean(initialData);
  const title = isEditMode ? 'Edit Batch' : 'Tambah Batch Baru';

  // Fungsi untuk format tanggal YYYY-MM-DD
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };
  
  // Set form data saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        setFormData({
          batchId: initialData.batchId || '',
          productName: initialData.productName || '',
          productSKU: initialData.productSKU || '',
          category: initialData.category || '',
          unit: initialData.unit || 'pcs',
          quantity: initialData.quantity || 0,
          productionDate: formatDate(initialData.productionDate),
          entryDate: formatDate(initialData.entryDate) || new Date().toISOString().split('T')[0],
          expiryDate: formatDate(initialData.expiryDate),
          location: initialData.location || '',
          supplier: initialData.supplier || '',
          notes: initialData.notes || '',
          manualStatus: initialData.manualStatus || 'Tersedia',
        });
        // Set selectedProduct untuk CustomSelect
        const product = productOptions.find(p => p.value === initialData.productSKU);
        setSelectedProduct(product ? product.value : null);
      } else {
        // Reset form untuk mode Tambah
        setFormData({
          productName: '', productSKU: '', category: '', unit: 'pcs',
          quantity: 0, productionDate: '',
          entryDate: new Date().toISOString().split('T')[0],
          expiryDate: '', location: '', supplier: '', notes: '',
          manualStatus: 'Tersedia',
        });
        setSelectedProduct(null);
      }
    }
  }, [initialData, isEditMode, isOpen]);

  // Handle perubahan input biasa
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle perubahan dari CustomSelect (Nama Produk)
  // Ini adalah fitur "SKU Otomatis" yang Anda minta
  const handleProductChange = (selectedValue) => {
    const product = productOptions.find(p => p.value === selectedValue);
    setSelectedProduct(selectedValue);
    
    if (product) {
      setFormData(prev => ({
        ...prev,
        productSKU: product.value,
        productName: product.label,
        category: product.category,
        unit: product.unit,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Varian animasi
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 50, scale: 0.95 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            className="relative z-50 w-full max-w-3xl bg-white rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              <button onClick={onClose} className="p-2 text-gray-500 rounded-full hover:bg-gray-100"><FaTimes /></button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Layout 3 Kolom untuk Form Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 max-h-[70vh] overflow-y-auto">
                
                {/* --- Kolom 1: Info Produk --- */}
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1">Info Produk</h3>
                  {isEditMode && (
                    <FormInput label="ID Batch (Otomatis)" name="batchId" value={formData.batchId} disabled readOnly />
                  )}
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                    <CustomSelect
                      options={productOptions}
                      value={selectedProduct}
                      onChange={handleProductChange}
                      placeholder="Pilih Produk..."
                    />
                  </div>
                  
                  <FormInput label="SKU Produk" name="productSKU" value={formData.productSKU} onChange={handleChange} required readOnly={!isEditMode && selectedProduct} />
                  <FormInput label="Kategori Produk" name="category" value={formData.category} onChange={handleChange} readOnly={!isEditMode && selectedProduct} />
                </div>

                {/* --- Kolom 2: Info Stok --- */}
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1">Info Stok & Tanggal</h3>
                  <div className="flex gap-4">
                    <FormInput label="Jumlah" name="quantity" type="number" min="0" value={formData.quantity} onChange={handleChange} required />
                    <FormInput label="Satuan (Unit)" name="unit" value={formData.unit} onChange={handleChange} readOnly={!isEditMode && selectedProduct} />
                  </div>
                  <FormInput label="Tanggal Produksi" name="productionDate" type="date" value={formData.productionDate} onChange={handleChange} />
                  <FormInput label="Tanggal Masuk" name="entryDate" type="date" value={formData.entryDate} onChange={handleChange} />
                  <FormInput label="Tanggal Kadaluarsa" name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} required />
                </div>

                {/* --- Kolom 3: Info Gudang & Status --- */}
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1">Info Lainnya</h3>
                  <FormInput label="Lokasi Penyimpanan" name="location" value={formData.location} onChange={handleChange} placeholder="Cth: Rak A1" />
                  <FormInput label="Supplier (Opsional)" name="supplier" value={formData.supplier} onChange={handleChange} />
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status Manual (Opsi Admin)</label>
                    <select
                      name="manualStatus"
                      value={formData.manualStatus}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Tersedia">Tersedia</option>
                      <option value="Karantina">Karantina</option>
                      <option value="Rusak">Rusak</option>
                      <option value="Ditarik">Ditarik</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catatan (Opsional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Cth: Kemasan promosi"
                    ></textarea>
                  </div>
                </div>

              </div>
              
              <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">
                <motion.button type="button" onClick={onClose} disabled={isLoading} className="px-4 py-2 mr-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Batal
                </motion.button>
                <motion.button type="submit" disabled={isLoading} className="flex items-center px-4 py-2 text-white bg-primary rounded-lg hover:bg-pink-600 disabled:opacity-50" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <FaSave className="mr-2" />
                  {isLoading ? 'Menyimpan...' : 'Simpan'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Komponen helper input
const FormInput = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={props.type || 'text'}
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
    />
  </div>
);

export default BatchModal;