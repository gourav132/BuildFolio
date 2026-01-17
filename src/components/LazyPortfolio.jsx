import React, { Suspense } from 'react';
import PageLoader from './LoadingStates/PageLoader';
import Navbar from './Navbar';
import StaticBackground from './StaticBackground';

// Lazy load portfolio components
const LazyHero = React.lazy(() => import('./Hero'));
const LazyAbout = React.lazy(() => import('./About'));
const LazyExperience = React.lazy(() => import('./Experience'));
const LazyTech = React.lazy(() => import('./Tech'));
const LazyWorks = React.lazy(() => import('./Works'));
const LazyContact = React.lazy(() => import('./Contact'));

const LazyPortfolio = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Suspense fallback={<PageLoader message="Loading Hero Section..." />}>
          <LazyHero />
        </Suspense>
      </div>
      <div className="relative z-0">
        <Suspense fallback={<PageLoader message="Loading About Section..." />}>
          <LazyAbout />
        </Suspense>
        <Suspense fallback={<PageLoader message="Loading Experience Section..." />}>
          <LazyExperience />
        </Suspense>
        <Suspense fallback={<PageLoader message="Loading Tech Section..." />}>
          <LazyTech />
        </Suspense>
        <Suspense fallback={<PageLoader message="Loading Works Section..." />}>
          <LazyWorks />
        </Suspense>
        <div className="relative z-0">
          <Suspense fallback={<PageLoader message="Loading Contact Section..." />}>
            <LazyContact />
          </Suspense>
          <StaticBackground />
        </div>
      </div>
    </div>
  );
};

export default LazyPortfolio;
