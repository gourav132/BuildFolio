import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const FormLoader = ({ message = "Saving..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center space-x-3 p-4 bg-gray-800/30 border border-gray-700 rounded-lg"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-5 h-5 border-2 border-gray-400 border-t-purple-500 rounded-full"
      />
      <span className="text-sm text-gray-300 font-medium">{message}</span>
    </motion.div>
  );
};

export default FormLoader;
