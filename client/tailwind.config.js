/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        newRocker: ['"New Rocker"', 'cursive'],
        specialElite: ['Special Elite', 'cursive'],
        bungee: ['Bungee', 'cursive']
      },
    },
  },
  plugins: [],
};
