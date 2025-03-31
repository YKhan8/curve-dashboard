/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        }
      }
    },
  },
  plugins: [],
} 