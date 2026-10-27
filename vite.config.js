import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'next/dynamic': fileURLToPath(new URL('./src/lib/next-dynamic-shim.js', import.meta.url)),
    },
  },
  base: '/',
  server: {
    port: 3000,
    open: true
  }
})

