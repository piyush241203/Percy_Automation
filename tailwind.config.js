/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#dbe3ff',
          300: '#bfcaff',
          400: '#99a7ff',
          500: '#6c77ff',
          600: '#5356ff',
          700: '#433eff',
          800: '#3732d4',
          900: '#302ca5',
          950: '#1d1964',
        }
      }
    },
  },
  plugins: [],
}
