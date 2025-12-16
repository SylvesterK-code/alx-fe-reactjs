npm create vite@latest react-router-advanced -- --template react
cd react-router-advanced
npm install tailwindcss @tailwindcss/vite
npm install react-router-dom


npm install @tanstack/react-query ------------ support react v4+



// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ✅ Add this

// https://vite.dev/config/
export default defineConfig({
    plugins: [
    react(),
    tailwindcss(),     // ✅ Add this
  ],
})




// inde.css

@import "tailwindcss"; 