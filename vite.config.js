import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
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
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          'ui-vendor': ['framer-motion', 'react-icons'],
          'form-vendor': ['react-hook-form'],

          // Feature chunks
          'auth': [
            './src/Pages/Login/Login.jsx',
            './src/Pages/Register/Register.jsx',
            './src/Pages/Reset/Reset.jsx'
          ],
          'customization': [
            './src/Pages/Customization/Customize.jsx',
            './src/Pages/Customization/Introduction/Introduction.jsx',
            './src/Pages/Customization/Overview/Overview.jsx',
            './src/Pages/Customization/Skills/Skills.jsx',
            './src/Pages/Customization/Experience Field/Experience.jsx',
            './src/Pages/Customization/Project/Project.jsx'
          ],
          'portfolio': [
            './src/Pages/Portfolio/Portfolio.jsx',
            './src/Pages/Portfolio-Preview/Preview.jsx'
          ],
          'components': [
            './src/components/portfolio/Hero.jsx',
            './src/components/portfolio/About.jsx',
            './src/components/portfolio/Experience.jsx',
            './src/components/portfolio/Tech.jsx',
            './src/components/portfolio/Works.jsx',
            './src/components/portfolio/Contact.jsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
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