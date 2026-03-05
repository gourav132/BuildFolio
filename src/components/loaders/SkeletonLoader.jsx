import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ 
  width = "100%", 
  height = "20px", 
  className = "",
  lines = 1 
}) => {
  const skeletonVariants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (lines === 1) {
    return (
      <motion.div
        variants={skeletonVariants}
        initial="initial"
        animate="animate"
        className={`bg-gray-700 rounded ${className}`}
        style={{ width, height }}
      />
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          className={`bg-gray-700 rounded ${className}`}
          style={{ 
            width: index === lines - 1 ? "75%" : width, 
            height 
          }}
        />
      ))}
    </div>
  );
};

// Specific skeleton components
export const CardSkeleton = () => (
  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
    <div className="flex items-center space-x-3 mb-3">
      <SkeletonLoader width="40px" height="40px" className="rounded-lg" />
      <div className="flex-1">
        <SkeletonLoader width="60%" height="16px" className="mb-2" />
        <SkeletonLoader width="40%" height="12px" />
      </div>
    </div>
    <SkeletonLoader lines={2} height="12px" />
  </div>
);

export const FormSkeleton = () => (
  <div className="space-y-4">
    <div>
      <SkeletonLoader width="80px" height="14px" className="mb-2" />
      <SkeletonLoader width="100%" height="40px" className="rounded-lg" />
    </div>
    <div>
      <SkeletonLoader width="60px" height="14px" className="mb-2" />
      <SkeletonLoader width="100%" height="40px" className="rounded-lg" />
    </div>
    <div>
      <SkeletonLoader width="70px" height="14px" className="mb-2" />
      <SkeletonLoader width="100%" height="80px" className="rounded-lg" />
    </div>
  </div>
);

export const ListSkeleton = ({ count = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);

export default SkeletonLoader;
