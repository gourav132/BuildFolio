// UI Components
import LoadingSpinner from "./ui/LoadingSpinner";
import LoadingButton from "./ui/LoadingButton";
import PageLoader from "./loaders/PageLoader";
import FormLoader from "./loaders/FormLoader";
import ButtonLoader from "./loaders/ButtonLoader";
import SkeletonLoader, { CardSkeleton, FormSkeleton, ListSkeleton } from "./loaders/SkeletonLoader";

// Forms
import FormInput from "./ui/forms/FormInput";
import FormTextarea from "./ui/forms/FormTextarea";
import EnhancedFormInput from "./ui/forms/EnhancedFormInput";
import EnhancedFormTextarea from "./ui/forms/EnhancedFormTextarea";
import EnhancedFormSelect from "./ui/forms/EnhancedFormSelect";
import FormValidationMessage from "./ui/forms/FormValidationMessage";

// Layout
import Navbar from "./layout/Navbar";
import StaticBackground from "./layout/StaticBackground";

// Portfolio Components (Legacy)
import Hero from "./portfolio/Hero";
import About from "./portfolio/About";
import Tech from "./portfolio/Tech";
import Experience from "./portfolio/Experience";
import Works from "./portfolio/Works";
import Feedbacks from "./portfolio/Feedbacks";
import Contact from "./portfolio/Contact";
import StaticTechDisplay from "./portfolio/StaticTechDisplay";
import ContactIllustration from "./portfolio/ContactIllustration";
import HeroIllustration from "./portfolio/HeroIllustration";

// Shared
import ProtectedRoute from "./shared/ProtectedRoute";
import ErrorBoundary from "./shared/ErrorBoundary";
import FormErrorBoundary from "./shared/FormErrorBoundary";
import NetworkErrorBoundary from "./shared/NetworkErrorBoundary";
import AuthLayout from "./shared/AuthLayout";

export {
  // UI
  LoadingSpinner,
  LoadingButton,
  PageLoader,
  FormLoader,
  ButtonLoader,
  SkeletonLoader,
  CardSkeleton,
  FormSkeleton,
  ListSkeleton,

  // Forms
  FormInput,
  FormTextarea,
  EnhancedFormInput,
  EnhancedFormTextarea,
  EnhancedFormSelect,
  FormValidationMessage,

  // Layout
  Navbar,
  StaticBackground,

  // Portfolio
  Hero,
  About,
  Tech,
  Experience,
  Works,
  Feedbacks,
  Contact,
  StaticTechDisplay,
  ContactIllustration,
  HeroIllustration,

  // Shared
  ProtectedRoute,
  ErrorBoundary,
  FormErrorBoundary,
  NetworkErrorBoundary,
  AuthLayout,
};