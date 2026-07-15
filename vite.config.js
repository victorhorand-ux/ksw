import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group Firebase dependencies into their own file
            if (id.includes('firebase')) {
              return 'firebase';
            }
            // Group React core dependencies into their own file
            if (id.includes('react')) {
              return 'vendor';
            }
            // Put other packages (like react-router-dom, zustand, crypto-js) here
            return 'dependencies';
          }
        }
      }
    }
  }
})