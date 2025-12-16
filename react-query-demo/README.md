npm create vite@latest react-query-demo -- --template react
cd react-query-demo
npm install tailwindcss @tailwindcss/vite
npm install react-query ------------- v3

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



src/components/PostsComponent.jsx