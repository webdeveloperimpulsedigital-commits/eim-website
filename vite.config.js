import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { existsSync } from 'fs'

// Dev only: like Apache in production, send /page to /page/ when page/index.html exists,
// so folder pages (e.g. contact-us/) answer with or without the trailing slash.
const dirSlash = {
  name: 'dir-slash',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const [path, query] = req.url.split('?');
      if (path !== '/' && !path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path) && existsSync(resolve(__dirname, '.' + path, 'index.html'))) {
        res.statusCode = 301; res.setHeader('Location', path + '/' + (query ? '?' + query : '')); return res.end();
      }
      next();
    });
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dirSlash],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'next/dynamic': fileURLToPath(new URL('./src/lib/next-dynamic-shim.js', import.meta.url)),
    },
  },
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
        about: resolve(__dirname, 'about/index.html'),
        contact: resolve(__dirname, 'contact-us/index.html'),
        leadership: resolve(__dirname, 'leadership/index.html')
      }
    }
  }
})

