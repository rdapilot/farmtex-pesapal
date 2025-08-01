/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#00FF00', // Bright green from the logo
        },
      },
    },
  },
  plugins: [],
};