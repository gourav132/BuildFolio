// Performance monitoring utilities
export const performanceUtils = {
  // Measure component render time
  measureRenderTime: (componentName) => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      return renderTime;
    };
  },

  // Measure async operation time
  measureAsyncTime: async (operationName, asyncFunction) => {
    const startTime = performance.now();
    try {
      const result = await asyncFunction();
      const endTime = performance.now();
      const operationTime = endTime - startTime;
      console.log(`${operationName} completed in: ${operationTime.toFixed(2)}ms`);
      return { result, time: operationTime };
    } catch (error) {
      const endTime = performance.now();
      const operationTime = endTime - startTime;
      console.error(`${operationName} failed after: ${operationTime.toFixed(2)}ms`, error);
      throw error;
    }
  },

  // Monitor bundle size
  monitorBundleSize: () => {
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            console.log('Bundle size info:', {
              transferSize: entry.transferSize,
              encodedBodySize: entry.encodedBodySize,
              decodedBodySize: entry.decodedBodySize
            });
          }
        });
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
  },

  // Monitor Core Web Vitals
  monitorWebVitals: () => {
    if (process.env.NODE_ENV === 'development') {
      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log('LCP:', entry.startTime);
        });
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log('CLS:', entry.value);
        });
      }).observe({ entryTypes: ['layout-shift'] });
    }
  },

  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for performance
  throttle: (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Memoize expensive calculations
  memoize: (fn) => {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  },

  // Image lazy loading
  lazyLoadImages: () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  },

  // Preload critical resources
  preloadCriticalResources: (resources) => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as || 'script';
      if (resource.crossOrigin) {
        link.crossOrigin = resource.crossOrigin;
      }
      document.head.appendChild(link);
    });
  }
};

// React performance hooks (requires React import)
// export const usePerformanceMonitor = (componentName) => {
//   const startTime = React.useRef(performance.now());
//   
//   React.useEffect(() => {
//     const endTime = performance.now();
//     const renderTime = endTime - startTime.current;
//     console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
//   });
// };

// Bundle analyzer (development only)
export const analyzeBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analyzer would be available with webpack-bundle-analyzer package');
    // To use bundle analyzer, install: npm install --save-dev webpack-bundle-analyzer
    // Then uncomment the import below:
    // import('webpack-bundle-analyzer').then(({ BundleAnalyzerPlugin }) => {
    //   console.log('Bundle analyzer available');
    // });
  }
};
