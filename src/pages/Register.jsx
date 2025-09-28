import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Register = () => {
  return (
    <AuthLayout title="Buat Akun Baru Anda">
      <form>
        <InputField
          icon={<FaUser />}
          type="text"
          placeholder="Nama Lengkap"
        />
        <InputField
          icon={<FaUser />}
          type="text"
          placeholder="Username"
        />
        <InputField
          icon={<FaEnvelope />}
          type="email"
          placeholder="Email"
        />
        <InputField
          icon={<FaLock />}
          type="password"
          placeholder="Password"
        />
        <InputField
          icon={<FaLock />}
          type="password"
          placeholder="Konfirmasi Password"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 mt-4 bg-primary text-light font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-300 transform"
        >
          Register
        </motion.button>
      </form>
      <p className="text-center text-gray-500 mt-6">
        Sudah punya akun?{' '}
        <Link to="/" className="text-primary font-semibold hover:underline">
          Login di sini
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;