import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';

const EnhancedFormSelect = forwardRef(({
  label,
  options = [],
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  className = '',
  showValidation = true,
  placeholder = "Select an option",
  ...props
}, ref) => {
  const hasError = error && error.length > 0;
  const hasSuccess = success && !hasError;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      {/* Select Container */}
      <div className="relative">
        <motion.select
          ref={ref}
          disabled={disabled}
          className={`
            w-full px-3 py-2.5 bg-gray-700/50 border rounded-lg text-white 
            focus:outline-none focus:ring-2 transition-all duration-200 text-sm appearance-none cursor-pointer
            ${hasError 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
              : hasSuccess 
                ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          {...props}
        >
          <option value="" disabled className="text-gray-400">
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-gray-800 text-white"
            >
              {option.label}
            </option>
          ))}
        </motion.select>

        {/* Custom Dropdown Arrow */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <FiChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Validation Icons */}
        {showValidation && (
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <AnimatePresence>
              {hasError && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="text-red-400"
                >
                  <FiX className="w-4 h-4" />
                </motion.div>
              )}
              {hasSuccess && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="text-green-400"
                >
                  <FiCheck className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helperText && !hasError && (
        <p className="text-xs text-gray-400">{helperText}</p>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 text-red-400 text-xs"
          >
            <FiAlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {hasSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 text-green-400 text-xs"
          >
            <FiCheck className="w-3 h-3 flex-shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

EnhancedFormSelect.displayName = 'EnhancedFormSelect';

export default EnhancedFormSelect;
