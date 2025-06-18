/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // adjust this path to your files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // <--- CHANGE THIS LINE: Use require('daisyui')
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro", "cyberpunk", "valentine"], // 🌗 you can customize this list
  },
};

export default config;