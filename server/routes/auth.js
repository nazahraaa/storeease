import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Mendaftarkan user baru
// @access  Public
router.post(
  '/register',
  [
    check('nama', 'Nama wajib diisi').not().isEmpty(),
    check('username', 'Username wajib diisi').not().isEmpty(),
    check('email', 'Email tidak valid').isEmail(),
    check('password', 'Password minimal 6 karakter').isLength({ min: 6 }),
    check('konfirmasiPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Konfirmasi password tidak cocok');
      }
      return true;
    }),
  ],
  registerUser
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    check('login', 'Username atau Email wajib diisi').not().isEmpty(),
    check('password', 'Password wajib diisi').exists(),
  ],
  loginUser
);

export default router;