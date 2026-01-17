import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
            './src/components/Hero.jsx',
            './src/components/About.jsx',
            './src/components/Experience.jsx',
            './src/components/Tech.jsx',
            './src/components/Works.jsx',
            './src/components/Contact.jsx'
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