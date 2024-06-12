/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        newRocker: ['"New Rocker"', 'cursive'],
      },
    },
  },
  plugins: [],
};
