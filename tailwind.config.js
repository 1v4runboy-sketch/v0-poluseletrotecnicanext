/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', "*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { weg: '#0A6CB2' } } },
  plugins: []
};
