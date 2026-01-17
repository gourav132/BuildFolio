import React, { Suspense } from 'react';
import PageLoader from './LoadingStates/PageLoader';

// Lazy load authentication pages
export const LazyLogin = React.lazy(() => import('../Pages/Login/Login'));
export const LazyRegister = React.lazy(() => import('../Pages/Register/Register'));
export const LazyReset = React.lazy(() => import('../Pages/Reset/Reset'));

// Lazy load main pages
export const LazyLanding = React.lazy(() => import('../Pages/Landing/Landing'));
export const LazyPortfolio = React.lazy(() => import('../Pages/Portfolio/Portfolio'));
export const LazyPreview = React.lazy(() => import('../Pages/Portfolio-Preview/Preview'));
export const LazyCustomize = React.lazy(() => import('../Pages/Customization/Customize'));
export const LazyControlCenter = React.lazy(() => import('../Pages/ControlCenter/ControlCenter'));
export const LazySettings = React.lazy(() => import('../Pages/Settings/Settings'));

// Lazy load customization components
export const LazyIntroduction = React.lazy(() => import('../Pages/Customization/Introduction/Introduction'));
export const LazyOverview = React.lazy(() => import('../Pages/Customization/Overview/Overview'));
export const LazySkills = React.lazy(() => import('../Pages/Customization/Skills/Skills'));
export const LazyExperience = React.lazy(() => import('../Pages/Customization/Experience Field/Experience'));
export const LazyProject = React.lazy(() => import('../Pages/Customization/Project/Project'));

// Lazy load portfolio components
export const LazyHero = React.lazy(() => import('./Hero'));
export const LazyAbout = React.lazy(() => import('./About'));
export const LazyExperienceComponent = React.lazy(() => import('./Experience'));
export const LazyTech = React.lazy(() => import('./Tech'));
export const LazyWorks = React.lazy(() => import('./Works'));
export const LazyContact = React.lazy(() => import('./Contact'));

// Higher-order component for lazy loading with fallback
export const withLazyLoading = (Component, fallback = <PageLoader />) => {
  return (props) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

// Wrapper components with lazy loading
export const Login = withLazyLoading(LazyLogin);
export const Register = withLazyLoading(LazyRegister);
export const Reset = withLazyLoading(LazyReset);
export const Landing = withLazyLoading(LazyLanding);
export const Portfolio = withLazyLoading(LazyPortfolio);
export const Preview = withLazyLoading(LazyPreview);
export const Customize = withLazyLoading(LazyCustomize);
export const ControlCenter = withLazyLoading(LazyControlCenter);
export const Settings = withLazyLoading(LazySettings);

// Customization components
export const Introduction = withLazyLoading(LazyIntroduction);
export const Overview = withLazyLoading(LazyOverview);
export const Skills = withLazyLoading(LazySkills);
export const Experience = withLazyLoading(LazyExperience);
export const Project = withLazyLoading(LazyProject);

// Portfolio components
export const Hero = withLazyLoading(LazyHero);
export const About = withLazyLoading(LazyAbout);
export const ExperienceComponent = withLazyLoading(LazyExperienceComponent);
export const Tech = withLazyLoading(LazyTech);
export const Works = withLazyLoading(LazyWorks);
export const Contact = withLazyLoading(LazyContact);
