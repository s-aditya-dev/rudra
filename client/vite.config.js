import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/user":"https://rudra-backend-4hzl.onrender.com/api"
    }
  },
  plugins: [react()],
})
