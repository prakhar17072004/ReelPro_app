/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

const config = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro", "cyberpunk", "valentine"],
  },
};

export default config;
