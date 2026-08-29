import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api/ext': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },

      '/api/products': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },

      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
})
