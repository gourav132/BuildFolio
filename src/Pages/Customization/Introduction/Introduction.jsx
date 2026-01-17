import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PreviewContext } from "../../../context/PreviewContext";
import { motion } from "framer-motion";
import { FiUser, FiMessageSquare, FiZap, FiArrowRight, FiAlertCircle } from "react-icons/fi";

export default function Introduction({ step, setStep }) {
  const [previewData, setPreviewData] = useContext(PreviewContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
    trigger
  } = useForm({
    mode: "onChange",
    defaultValues: {
      displayName: previewData.displayName || "",
      tagline: previewData.tagline || ""
    }
  });

  // Watch form values to update preview data in real-time
  const watchedValues = watch();

  useEffect(() => {
    // Update preview data when form values change
    setPreviewData(prev => ({
      ...prev,
      displayName: watchedValues.displayName,
      tagline: watchedValues.tagline
    }));
  }, [watchedValues.displayName, watchedValues.tagline, setPreviewData]);

  // Set initial values when component mounts
  useEffect(() => {
    setValue("displayName", previewData.displayName || "");
    setValue("tagline", previewData.tagline || "");
  }, []); // Only run once on mount

  const onSubmit = async (data) => {
    try {
      // Validate form before proceeding
      const isValid = await trigger();
      if (isValid) {
        setStep("overview");
      }
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };

  const handleContinue = async () => {
    const isValid = await trigger();
    if (isValid) {
      setStep("overview");
    }
  };

  const input = (label, name, helperText = "", icon = null, placeholder = "", validationRules = {}) => {
    const Icon = icon;
    const hasError = errors[name];
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-7"
      >
        <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-2">
          {label}
          {validationRules.required && <span className="text-red-400 ml-1">*</span>}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className={`h-4 w-4 ${hasError ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
          )}
          <input
            type="text"
            id={name}
            placeholder={placeholder}
            className={`w-full px-3 py-2.5 bg-gray-800/50 border rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 hover:border-gray-600 ${
              Icon ? 'pl-10' : ''
            } ${
              hasError 
                ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                : 'border-gray-700 focus:ring-purple-500/50 focus:border-purple-500/50'
            }`}
            {...register(name, validationRules)}
            disabled={isSubmitting}
          />
        </div>
        {hasError ? (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs text-red-400 flex items-center"
          >
            <FiAlertCircle className="w-3 h-3 mr-1" />
            {hasError.message}
          </motion.p>
        ) : helperText && (
          <p className="mt-2 text-xs text-gray-400 leading-relaxed">{helperText}</p>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
          <FiUser className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Introduction</h3>
        <p className="text-gray-400 text-sm">Tell us about yourself</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Form Fields */}
        <div className="space-y-5">
          {input(
            "Display Name",
            "displayName",
            "This is the name that will appear as your main heading on your portfolio",
            FiUser,
            "Enter your full name",
            {
              required: "Display name is required",
              minLength: {
                value: 2,
                message: "Display name must be at least 2 characters"
              },
              maxLength: {
                value: 50,
                message: "Display name must be less than 50 characters"
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Display name can only contain letters and spaces"
              }
            }
          )}
          
          {input(
            "Tagline",
            "tagline",
            "A catchy phrase that describes what you do and your expertise",
            FiMessageSquare,
            "e.g., Full Stack Developer | Creative Problem Solver",
            {
              required: "Tagline is required",
              minLength: {
                value: 10,
                message: "Tagline must be at least 10 characters"
              },
              maxLength: {
                value: 100,
                message: "Tagline must be less than 100 characters"
              }
            }
          )}
        </div>

        {/* Quick Tips */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <FiZap className="w-3 h-3 text-white" />
            </div>
            <h4 className="text-sm font-semibold text-white">Quick Tips</h4>
          </div>
          <ul className="text-xs text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              <span>Keep your display name professional and recognizable</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              <span>Your tagline should highlight your key strengths and expertise</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              <span>Use action words and be specific about your skills</span>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            disabled={isSubmitting || !isValid}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm ${
              isSubmitting || !isValid
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Validating...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <FiArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
