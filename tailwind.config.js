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
        // paleta atualizada (sem lightBlue/trueGray/blueGray)
        slate: colors.slate,
        gray: colors.gray,
        neutral: colors.neutral,
        stone: colors.stone,
        sky: colors.sky,
        emerald: colors.emerald,
        indigo: colors.indigo,
        weg: '#0A6CB2',
      },
      zIndex: {
        max: '2147483647',
        overlay: '99999',
        sidebar: '100000',
        search: '110000',
        header: '60',
      },
      boxShadow: {
        elev1: '0 6px 24px rgba(0,0,0,.06)',
        elev2: '0 12px 40px rgba(0,0,0,.12)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
};
