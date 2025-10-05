import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ ensures correct routing for production (Render)
  build: {
    outDir: 'dist',
  },
})
