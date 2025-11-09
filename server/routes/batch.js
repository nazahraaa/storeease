// server/routes/batch.js
import express from 'express';
import { check } from 'express-validator';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { 
  createBatch, 
  getAllBatches, 
  getBatchById, 
  updateBatch, 
  deleteBatch 
} from '../controllers/batchController.js';

const router = express.Router();

// @route   POST /api/batch
// @desc    Buat batch baru
router.post(
  '/', 
  [
    protect, 
    adminOnly,
    check('productName', 'Nama Produk wajib diisi').not().isEmpty(),
    check('productSKU', 'SKU Produk wajib diisi').not().isEmpty(),
    check('quantity', 'Jumlah wajib diisi').isNumeric(),
    check('expiryDate', 'Tanggal kadaluarsa wajib diisi').isISO8601().toDate(),
    // Validasi opsional
    check('category').optional().isString(),
    check('unit').optional().isString(),
    check('location').optional().isString(),
    check('productionDate').optional().isISO8601().toDate(),
  ], 
  createBatch
);

// @route   GET /api/batch
// @desc    Dapatkan semua data batch (dengan filter)
router.get('/', protect, adminOnly, getAllBatches);

// @route   GET /api/batch/:id
// @desc    Dapatkan detail satu batch
router.get('/:id', protect, adminOnly, getBatchById);

// @route   PUT /api/batch/:id
// @desc    Update data batch
router.put(
  '/:id', 
  [
    protect, 
    adminOnly,
    // Validasi opsional untuk update
    check('quantity').optional().isNumeric(),
    check('expiryDate').optional().isISO8601().toDate(),
    check('manualStatus').optional().isIn(['Tersedia', 'Karantina', 'Rusak', 'Ditarik']),
    check('category').optional().isString(),
    check('unit').optional().isString(),
    check('location').optional().isString(),
    check('productionDate').optional().isISO8601().toDate(),
  ], 
  updateBatch
);

// @route   DELETE /api/batch/:id
// @desc    Hapus data batch
router.delete('/:id', protect, adminOnly, deleteBatch);


export default router;