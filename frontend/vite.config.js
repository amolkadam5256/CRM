import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    port: 5173, // React dev server port
    proxy: {
      '/api': {                   // any request starting with /api
        target: 'http://localhost:8080',  // redirect to Spring Boot backend
        changeOrigin: true,       // modify the request origin to match backend
        secure: false,            // allow self-signed HTTPS if needed
      },
    },
  },
})
