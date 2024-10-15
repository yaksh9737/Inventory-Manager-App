/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          'neon-cyan': '#0FF',
          'neon-green': '#39FF14',
          'neon-red': '#FF073A',
      },
  },
  },
  plugins: [],
};
