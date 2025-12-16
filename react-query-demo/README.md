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



# src/components/PostsComponent.jsx

Second Code (Advanced / Explicit Configuration)
useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
  keepPreviousData: true,
});

What this adds
🔹 cacheTime
cacheTime: 1000 * 60 * 10


Keeps data in memory even after component unmounts

Faster navigation back to the page

Fewer API calls

🔹 refetchOnWindowFocus
refetchOnWindowFocus: false


Prevents automatic refetch when switching tabs

Improves perceived performance

Avoids unnecessary network traffic

🔹 keepPreviousData
keepPreviousData: true


Old data stays visible during refetch

Prevents UI flicker

Especially useful for pagination or filtering