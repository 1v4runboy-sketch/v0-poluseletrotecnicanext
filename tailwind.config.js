/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // use apenas cores modernas; se precisar do palette oficial:
      // colors: require('tailwindcss/colors'),
    },
  },
  plugins: [],
};
