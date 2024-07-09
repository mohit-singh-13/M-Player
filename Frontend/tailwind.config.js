/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'max-xs': { 'max': '450px' },
        'max-sm': { 'max': '639px' },
        'max-md': { 'max': '767px' },
        'max-lg': { 'max': '1023px' },
        'max-xl': { 'max': '1279px' },
      },
      fontFamily: {
        customFont: ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.all-unset': {
          all: 'unset',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

