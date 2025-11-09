import nodemailer from 'nodemailer';
import 'dotenv/config';

const sendVerificationEmail = async (to, code) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"StoreEase" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Kode Verifikasi Akun StoreEase Anda',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Selamat Datang di StoreEase!</h2>
          <p>Terima kasih telah mendaftar. Gunakan kode di bawah ini untuk memverifikasi akun Anda:</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #FF69B4;">${code}</p>
          <p>Kode ini akan kedaluwarsa dalam 10 menit.</p>
          <p>Jika Anda tidak merasa mendaftar, abaikan email ini.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email verifikasi dikirim ke ${to}`);
    return true;
  } catch (error) {
    console.error('Error saat mengirim email:', error);
    throw new Error('Gagal mengirim email verifikasi');
  }
};

export default sendVerificationEmail;