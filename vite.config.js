import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/Pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '@templates': path.resolve(__dirname, './src/features/portfolio/templates'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hoc': path.resolve(__dirname, './src/hoc'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles.js'),
      '@constants': path.resolve(__dirname, './src/constants'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor-only chunks — safe because they don't cross-import each other
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'ui-vendor': ['framer-motion', 'react-icons'],
          'form-vendor': ['react-hook-form'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-icons',
      'react-hook-form'
    ]
  }
})