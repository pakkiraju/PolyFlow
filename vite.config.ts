import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Force Rollup to not use native binaries
      experimentalLogSideEffects: false,
    },
  },
  // Ensure compatibility with different environments
  optimizeDeps: {
    exclude: ['@rollup/rollup-linux-x64-gnu'],
  },
})
