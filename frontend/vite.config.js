import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // This redirects any frontend request starting with '/api' 
      // to your local backend running on port 5000
      '/api': 'http://localhost:5000',
    },
  },
})