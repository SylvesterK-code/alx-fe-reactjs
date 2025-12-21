// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // important for toggling via class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan all relevant files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

