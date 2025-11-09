import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import 'dotenv/config';

// Fungsi untuk membuat token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

/**
 * @desc    Mendaftarkan user baru
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nama, username, email, password } = req.body;

  try {
    // Cek jika user sudah ada (berdasarkan email atau username)
    let userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({ msg: 'Email atau Username sudah terdaftar' });
    }

    // Buat user baru (password akan di-hash oleh 'pre-save' hook di model)
    const user = new User({
      nama,
      username,
      email,
      password,
    });

    // Simpan user ke database
    await user.save();

    // Buat token dan kirim ke client
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        nama: user.nama,
        username: user.username,
        email: user.email,
        role: user.role, 
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Frontend akan mengirim field 'login' (bisa username atau email)
  const { login, password } = req.body;

  try {
    // Cari user berdasarkan email atau username
    const user = await User.findOne({ $or: [{ email: login }, { username: login }] });

    if (!user) {
      return res.status(400).json({ msg: 'Kredensial tidak valid' });
    }

    // Bandingkan password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Kredensial tidak valid' }); // Pesan error yang sama demi keamanan
    }

    // Buat token dan kirim ke client
    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        nama: user.nama,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};