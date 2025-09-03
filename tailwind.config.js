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
        // paletas atuais (sem renomes antigos)
        slate: colors.slate,
        gray: colors.gray,
        neutral: colors.neutral,
        stone: colors.stone,
        sky: colors.sky,
        indigo: colors.indigo,
        emerald: colors.emerald,
      },
      borderRadius: { xl: '16px' },
      boxShadow: {
        elev1: '0 6px 24px rgba(0,0,0,.06)',
        elev2: '0 12px 40px rgba(0,0,0,.12)',
      },
    },
  },
  plugins: [],
};
