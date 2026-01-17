import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar, StaticBackground, ProtectedRoute, ErrorBoundary } from './components';
import { Login, Register, Reset, Customize, Preview, Landing, ControlCenter, Settings, Portfolio } from './components/LazyComponents';
import LazyPortfolio from './components/LazyPortfolio';
import { LoadingProvider } from './context/LoadingContext';
import { performanceUtils } from './utils/performance';

function App() {
  // Initialize performance monitoring
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      performanceUtils.monitorBundleSize();
      performanceUtils.monitorWebVitals();
    }
  }, []);

  return (
    <ErrorBoundary>
      <LoadingProvider>
        <BrowserRouter>
        <Routes>
          {/* Landing Page - Entry Point (Public) */}
          <Route path="/" element={<Landing />} />
          
          {/* Authentication Routes (Public - redirect if logged in) */}
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <div>
                <Login />
                <StaticBackground />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute requireAuth={false}>
              <div>
                <Register />
                <StaticBackground />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/reset" element={
            <ProtectedRoute requireAuth={false}>
              <div>
                <Reset />
                <StaticBackground />
              </div>
            </ProtectedRoute>
          } />

          {/* Main Portfolio Route (Public) */}
          <Route path="/portfolio" element={<LazyPortfolio />} />

          {/* Protected Routes (Require Authentication) */}
          <Route path="/control-center" element={
            <ProtectedRoute requireAuth={true}>
              <ControlCenter />
            </ProtectedRoute>
          } />
          <Route path="/customize" element={
            <ProtectedRoute requireAuth={true}>
              <Customize />
            </ProtectedRoute>
          } />
          <Route path="/preview" element={
            <ProtectedRoute requireAuth={true}>
              <Preview />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute requireAuth={true}>
              <Settings />
            </ProtectedRoute>
          } />

          {/* Dynamic Portfolio Route (Public) */}
          <Route path="/portfolio/:userId" element={<Portfolio />} />
        </Routes>
        </BrowserRouter>
      </LoadingProvider>
    </ErrorBoundary>
  );
}

export default App;
