import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3200,
    proxy: {
      // This will forward requests from /api to your Azure backend
      '/api': {
        target: 'https://impactoverseapp.azurewebsites.net/api/RegisterWithEmail?code=nsQh3GMLRv7fT2KXc5TkJ15FkIsM7yPWrcQLNJbldlusAzFu1MnI7A%3D%3D', // Replace with your actual Azure API URL
        changeOrigin: true,
        secure: false,
        // Optional: You can rewrite the path if your backend URL doesn't include `/api`
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})
