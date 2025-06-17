// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
      ],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2",
        secondary: "#14171A"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  
  plugins: [require("daisyui")], // ✅ This is the only place you should register it
};
