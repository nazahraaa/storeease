/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF69B4', 
        'secondary': '#FFC0CB', 
        'light': '#FFFFFF',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
      // --- TAMBAHAN ANIMASI & EFEK ---
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },
      boxShadow: {
        'glow-primary': '0 4px 14px 0 rgba(255, 105, 180, 0.39)',
        'glow-primary-hover': '0 6px 20px 0 rgba(255, 105, 180, 0.5)',
      }
    },
  },
  plugins: [],
}