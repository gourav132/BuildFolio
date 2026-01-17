import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  {PreviewProvider}  from './context/PreviewContext.jsx'
import { ProjectProvider } from './context/ProjectContext.jsx'

// Register service worker for better performance
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <PreviewProvider>
      <ProjectProvider>
        <App /> 
      </ProjectProvider>
    </PreviewProvider>
)
