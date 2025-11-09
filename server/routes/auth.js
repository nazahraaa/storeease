import express from 'express';
import { check } from 'express-validator';
import { 
  registerUser, 
  loginUser,
  verifyUser,     
  resendCode,
  verifyLogin
} from '../controllers/authController.js';

const router = express.Router();

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

router.post(
  '/verify',
  [
    check('email', 'Email tidak valid').isEmail(),
    check('code', 'Kode verifikasi wajib diisi').not().isEmpty().isLength({ min: 6, max: 6 }),
  ],
  verifyUser
);

router.post(
  '/resend-code',
  [
    check('email', 'Email tidak valid').isEmail(),
  ],
  resendCode
);

router.post(
  '/login',
  [
    check('login', 'Username atau Email wajib diisi').not().isEmpty(),
    check('password', 'Password wajib diisi').exists(),
  ],
  loginUser
);

// @route   POST /api/auth/verify-login
// @desc    Verifikasi user (langkah 2 Login)
// @access  Public
router.post(
  '/verify-login',
  [
    check('email', 'Email tidak valid').isEmail(),
    check('code', 'Kode verifikasi wajib diisi').not().isEmpty().isLength({ min: 6, max: 6 }),
  ],
  verifyLogin
);

export default router;