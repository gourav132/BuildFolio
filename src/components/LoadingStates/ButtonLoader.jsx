import React from 'react';
import { motion } from 'framer-motion';

const ButtonLoader = ({ size = "w-4 h-4", color = "border-white" }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
      className={`${size} border-2 ${color} border-t-transparent rounded-full`}
    />
  );
};

export default ButtonLoader;
