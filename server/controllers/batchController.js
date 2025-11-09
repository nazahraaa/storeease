// server/controllers/batchController.js
import { validationResult } from 'express-validator';
import Batch from '../models/Batch.js';

/**
 * @desc    Buat batch baru
 * @route   POST /api/batch
 * @access  Private (Admin)
 */
export const createBatch = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Ambil SEMUA field baru dari body
  const { 
    productName, productSKU, category, unit, // Info Produk
    quantity, productionDate, entryDate, expiryDate, // Info Stok
    location, supplier, notes, manualStatus // Info Lain-lain
  } = req.body;

  try {
    const generatedBatchId = `B-${Date.now().toString(36).toUpperCase()}`;

    const newBatch = new Batch({
      batchId: generatedBatchId,
      productName, productSKU, category, unit,
      quantity, productionDate, entryDate, expiryDate,
      location, supplier, notes, manualStatus,
      createdBy: req.user.id // <-- Menyimpan siapa yang membuat
    });

    const batch = await newBatch.save();
    res.status(201).json(batch);

  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Gagal membuat ID Batch unik, coba lagi' });
    }
    res.status(500).send('Server Error');
  }
};

/**
 * @desc    Dapatkan semua data batch (dengan filter)
 * @route   GET /api/batch
 * @access  Private (Admin)
 */
export const getAllBatches = async (req, res) => {
  const { search, status } = req.query;

  try {
    let query = {};

    if (search) {
      query.$or = [
        { batchId: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } },
        { productSKU: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }, // <-- Tambah pencarian
        { location: { $regex: search, $options: 'i' } }, // <-- Tambah pencarian
      ];
    }

    if (status && status !== 'Semua') {
      // Cek apakah status ada di enum systemStatus atau manualStatus
      const systemEnums = Batch.schema.path('systemStatus').enumValues;
      const manualEnums = Batch.schema.path('manualStatus').enumValues;

      let statusQuery = [];
      if (systemEnums.includes(status)) {
        statusQuery.push({ systemStatus: status });
      }
      if (manualEnums.includes(status)) {
        statusQuery.push({ manualStatus: status });
      }
      
      if (statusQuery.length > 0) {
        query.$or = query.$or ? [...query.$or, ...statusQuery] : statusQuery;
      }
    }
    
    // Populate createdBy untuk mendapatkan nama user
    const batches = await Batch.find(query)
      .populate('createdBy', 'nama username') // <-- Mengambil data user
      .sort({ expiryDate: 1 }); 
      
    res.json(batches);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * @desc    Dapatkan detail satu batch
 * @route   GET /api/batch/:id
 * @access  Private (Admin)
 */
export const getBatchById = async (req, res) => {
  // (Tidak ada perubahan, biarkan seperti semula)
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) {
      return res.status(404).json({ msg: 'Batch tidak ditemukan' });
    }
    res.json(batch);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Batch tidak ditemukan' });
    }
    res.status(500).send('Server Error');
  }
};

/**
 * @desc    Update data batch
 * @route   PUT /api/batch/:id
 * @access  Private (Admin)
 */
export const updateBatch = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Ambil semua field baru
  const {
    batchId, productName, productSKU, category, unit,
    quantity, productionDate, entryDate, expiryDate,
    location, supplier, notes, manualStatus
  } = req.body;

  try {
    let batch = await Batch.findById(req.params.id);
    if (!batch) {
      return res.status(404).json({ msg: 'Batch tidak ditemukan' });
    }

    // Update semua field yang mungkin berubah
    if (batchId) batch.batchId = batchId;
    if (productName) batch.productName = productName;
    if (productSKU) batch.productSKU = productSKU;
    if (category) batch.category = category;
    if (unit) batch.unit = unit;
    if (quantity !== undefined) batch.quantity = quantity;
    if (productionDate) batch.productionDate = productionDate;
    if (entryDate) batch.entryDate = entryDate;
    if (expiryDate) batch.expiryDate = expiryDate;
    if (location) batch.location = location;
    if (supplier) batch.supplier = supplier;
    if (notes) batch.notes = notes;
    if (manualStatus) batch.manualStatus = manualStatus;
    
    // systemStatus akan otomatis di-update oleh pre-save hook
    const updatedBatch = await batch.save();
    res.json(updatedBatch);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * @desc    Hapus data batch
 * @route   DELETE /api/batch/:id
 * @access  Private (Admin)
 */
export const deleteBatch = async (req, res) => {
  // (Tidak ada perubahan, biarkan seperti semula)
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) {
      return res.status(404).json({ msg: 'Batch tidak ditemukan' });
    }

    await batch.deleteOne();
    res.json({ msg: 'Batch berhasil dihapus' });

  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Batch tidak ditemukan' });
    }
    res.status(500).send('Server Error');
  }
};