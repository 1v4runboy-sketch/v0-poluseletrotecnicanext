/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
        "*.{js,ts,jsx,tsx,mdx}"
    ],
  theme: {
    extend: {
      colors: {
        weg: '#0A6CB2',
        slate: colors.slate,
        gray: colors.gray,
        neutral: colors.neutral,
        stone: colors.stone,
        sky: colors.sky,
        indigo: colors.indigo,
        emerald: colors.emerald,
      },
    },
  },
  plugins: [],
};
