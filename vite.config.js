import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Raise warning limit slightly — three.js/unicorn is inherently large
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js / WebGPU — only loaded on pages that use it
          if (id.includes('three') || id.includes('webgpu') || id.includes('unicornstudio')) {
            return 'vendor-three';
          }
          // MUI core — shared across every page, split from app logic
          if (id.includes('@mui/material') || id.includes('@mui/system') || id.includes('@emotion')) {
            return 'vendor-mui';
          }
          // GSAP + SplitType — animation library
          if (id.includes('gsap') || id.includes('split-type')) {
            return 'vendor-gsap';
          }
          // React core + router
          if (id.includes('react-dom') || id.includes('react-router')) {
            return 'vendor-react';
          }
        },
      },
    },
  },
})
