import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true,
        // 🚀 ADDED: Forces the Service Worker to bypass sitemap.xml
        navigateFallbackDenylist: [/^\/sitemap\.xml$/]
      }
    })
  ],
  build: {
    target: 'es2015',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return null

          if (id.includes('firebase')) {
            return 'firebase'
          }

          if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('react')) {
            return 'react-vendor'
          }

          if (id.includes('react-hook-form') || id.includes('react-hot-toast') || id.includes('react-helmet-async')) {
            return 'ui-vendor'
          }

          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor'
          }

          if (id.includes('zustand') || id.includes('idb') || id.includes('crypto-js')) {
            return 'state-vendor'
          }

          return 'vendor'
        }
      }
    }
  }
})