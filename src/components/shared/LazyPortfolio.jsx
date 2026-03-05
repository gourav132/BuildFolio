import React, { Suspense } from 'react';
import PageLoader from '@/components/loaders/PageLoader';
import Navbar from '@/components/layout/Navbar';
import StaticBackground from '@/components/layout/StaticBackground';

// Lazy load portfolio components
const LazyHero = React.lazy(() => import('@components/portfolio/Hero'));
const LazyAbout = React.lazy(() => import('@components/portfolio/About'));
const LazyExperience = React.lazy(() => import('@components/portfolio/Experience'));
const LazyTech = React.lazy(() => import('@components/portfolio/Tech'));
const LazyWorks = React.lazy(() => import('@components/portfolio/Works'));
const LazyContact = React.lazy(() => import('@components/portfolio/Contact'));

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
