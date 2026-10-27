import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      // one HTML entry per page
      input: {
        main: resolve(__dirname, 'index.html'),
        maitryi: resolve(__dirname, 'solutions/maitryi-model/index.html'),
        ashwa: resolve(__dirname, 'solutions/ashwa-e-tractor/index.html'),
        swap: resolve(__dirname, 'solutions/swapping-and-charging/index.html'),
        ports: resolve(__dirname, 'industries/ports-and-terminals/index.html'),
        newsroom: resolve(__dirname, 'newsroom/index.html'),
        about: resolve(__dirname, 'about/index.html')
      }
    }
  }
})
