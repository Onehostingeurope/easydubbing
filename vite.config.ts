import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/gradio': {
        target: 'http://127.0.0.1:7860',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gradio/, '')
      },
      '/queue': {
        target: 'http://127.0.0.1:7860',
        changeOrigin: true,
        ws: true
      },
      '/theme.css': {
        target: 'http://127.0.0.1:7860',
        changeOrigin: true
      },
      '/info': {
        target: 'http://127.0.0.1:7860',
        changeOrigin: true
      },
      '/config': {
        target: 'http://127.0.0.1:7860',
        changeOrigin: true
      },
      '/api': {
        target: 'http://127.0.0.1:7860',
        changeOrigin: true
      },
      '/run': {
        target: 'http://127.0.0.1:7860',
        changeOrigin: true,
        ws: true
      }
    }
  }
})
