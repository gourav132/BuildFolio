import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiCheck, FiAlertCircle } from 'react-icons/fi';

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

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  const hasError = error && error.length > 0;
  const hasSuccess = success && !hasError;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-xs font-medium text-gray-400 ml-1">
          {label}
          {required && <span className="text-purple-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative group">
        <motion.input
          ref={ref}
          type={inputType}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-3.5 py-2 bg-white/5 border rounded-xl text-white placeholder-gray-600 
            focus:outline-none transition-all duration-300 text-[13px]
            ${hasError
              ? 'border-red-500/50 focus:border-red-500 focus:bg-red-500/5'
              : isFocused
                ? 'border-purple-500/50 bg-white/10 ring-2 ring-purple-500/10'
                : 'border-white/5 hover:border-white/10'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          {...props}
        />

        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-white transition-colors duration-200"
          >
            {showPassword ? <FiEyeOff className="w-3.5 h-3.5" /> : <FiEye className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* Validation Icons */}
        {showValidation && !hasError && hasSuccess && (
          <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-green-500">
            <FiCheck className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center space-x-1.5 text-red-500 text-[10px] font-medium ml-1"
          >
            <FiAlertCircle className="w-3 h-3" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper Text */}
      {helperText && !hasError && (
        <p className="text-[10px] text-gray-600 ml-1">{helperText}</p>
      )}
    </div>
  );
});

EnhancedFormInput.displayName = 'EnhancedFormInput';

export default EnhancedFormInput;
