import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/aquilini-leasehold-dashboard/',
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /\.[jt]sx?$/,
  },
  optimizeDeps: {
    esbuild: {
      loader: { '.js': 'jsx' }
    }
  }
})
