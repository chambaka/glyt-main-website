import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5185,
    proxy: {
      '/api': 'http://localhost:8070',
      '/track': 'http://localhost:8070'
    }
  }
})
