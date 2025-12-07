# React + Vite

npm create vite@latest capstone-quizapp -- -- template react
npm install tailwindcss @tailwindcss/vite




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






### api used

https://opentdb.com/api_category.php


### Better alternatives:

https://quizapi.io

https://the-trivia-api.com

https://trivia.willfry.co.uk/api/questions





