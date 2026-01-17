import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';

const EnhancedFormInput = forwardRef(({
  label,
  type = 'text',
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  className = '',
  showValidation = true,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  const hasError = error && error.length > 0;
  const hasSuccess = success && !hasError;

  const handleFocus = (e) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
    props.onBlur?.(e);
  };

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <motion.input
          ref={ref}
          type={inputType}
          disabled={disabled}
          className={`
            w-full px-3 py-2.5 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 transition-all duration-200 text-sm
            ${hasError 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
              : hasSuccess 
                ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${isFocused ? 'bg-gray-700/70' : ''}
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
          >
            {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        )}

        {/* Validation Icons */}
        {showValidation && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
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

EnhancedFormInput.displayName = 'EnhancedFormInput';

export default EnhancedFormInput;
