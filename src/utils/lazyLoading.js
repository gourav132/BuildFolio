import { lazy } from 'react';

// Utility function to create lazy components with retry logic
export const createLazyComponent = (importFunc, retries = 3) => {
  return lazy(() => {
    return new Promise((resolve, reject) => {
      const attemptImport = (attemptNumber) => {
        importFunc()
          .then(resolve)
          .catch((error) => {
            if (attemptNumber < retries) {
              console.warn(`Failed to load component, retrying... (${attemptNumber + 1}/${retries})`);
              setTimeout(() => attemptImport(attemptNumber + 1), 1000 * attemptNumber);
            } else {
              console.error('Failed to load component after all retries:', error);
              reject(error);
            }
          });
      };
      attemptImport(1);
    });
  });
};

// Preload components for better UX
export const preloadComponent = (importFunc) => {
  return () => {
    importFunc();
  };
};

// Lazy load with preloading
export const createLazyComponentWithPreload = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  const preload = preloadComponent(importFunc);
  
  LazyComponent.preload = preload;
  return LazyComponent;
};

// Route-based code splitting
export const createRouteLazyComponent = (routeName, importFunc) => {
  const LazyComponent = createLazyComponent(importFunc);
  
  // Add route metadata
  LazyComponent.routeName = routeName;
  LazyComponent.preload = preloadComponent(importFunc);
  
  return LazyComponent;
};

// Batch preload multiple components
export const preloadComponents = (components) => {
  return Promise.all(components.map(component => {
    if (component.preload) {
      return component.preload();
    }
    return Promise.resolve();
  }));
};

// Smart preloading based on user behavior
export const createSmartPreloader = () => {
  const preloadedComponents = new Set();
  
  const preloadOnHover = (component) => {
    return () => {
      if (!preloadedComponents.has(component)) {
        if (component.preload) {
          component.preload();
          preloadedComponents.add(component);
        }
      }
    };
  };
  
  const preloadOnFocus = (component) => {
    return () => {
      if (!preloadedComponents.has(component)) {
        if (component.preload) {
          component.preload();
          preloadedComponents.add(component);
        }
      }
    };
  };
  
  return {
    preloadOnHover,
    preloadOnFocus,
    preloadedComponents
  };
};
