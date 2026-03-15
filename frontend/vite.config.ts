import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://127.0.0.1:8000',
      '/users': 'http://127.0.0.1:8000',
      '/tracks': 'http://127.0.0.1:8000',
      '/modules': 'http://127.0.0.1:8000',
      // adicione outros endpoints se necessário
    },
  },
})
