import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiCheck, FiInfo, FiX } from 'react-icons/fi';

const FormValidationMessage = ({ 
  type = 'error', 
  message, 
  show = true,
  className = '' 
}) => {
  if (!show || !message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheck className="w-4 h-4" />;
      case 'warning':
        return <FiAlertCircle className="w-4 h-4" />;
      case 'info':
        return <FiInfo className="w-4 h-4" />;
      default:
        return <FiX className="w-4 h-4" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      default:
        return 'bg-red-500/10 border-red-500/20 text-red-400';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`
            flex items-center space-x-2 p-3 rounded-lg border text-sm font-medium
            ${getStyles()}
            ${className}
          `}
        >
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormValidationMessage;
