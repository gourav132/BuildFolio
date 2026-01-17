import { useState, useCallback, useEffect } from 'react';
import { useFormValidation, VALIDATION_RULES } from '../utils/formValidation';

export const useEnhancedForm = (initialValues = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    errors,
    validateField,
    validateForm,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    hasErrors
  } = useFormValidation();

  // Real-time validation
  const validateFieldOnChange = useCallback((fieldName, value) => {
    if (validationSchema[fieldName]) {
      const fieldErrors = validateField(fieldName, value, validationSchema[fieldName]);
      if (fieldErrors.length > 0) {
        setFieldError(fieldName, fieldErrors[0]);
      } else {
        clearFieldError(fieldName);
      }
    }
  }, [validateField, validationSchema, setFieldError, clearFieldError]);

  // Handle input changes
  const handleChange = useCallback((fieldName, value) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }

    // Real-time validation for touched fields
    if (touched[fieldName]) {
      validateFieldOnChange(fieldName, value);
    }
  }, [touched, submitError, validateFieldOnChange]);

  // Handle input blur
  const handleBlur = useCallback((fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));

    // Validate field on blur
    if (validationSchema[fieldName]) {
      validateFieldOnChange(fieldName, values[fieldName]);
    }
  }, [values, validationSchema, validateFieldOnChange]);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    // Mark all fields as touched
    const allTouched = Object.keys(validationSchema).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate entire form
    const isValid = validateForm(values, validationSchema);

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(values);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error.message || 'An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validationSchema, validateForm]);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setTouched({});
    setSubmitError(null);
    setSubmitSuccess(false);
    clearAllErrors();
  }, [initialValues, clearAllErrors]);

  // Set field value programmatically
  const setValue = useCallback((fieldName, value) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    if (touched[fieldName]) {
      validateFieldOnChange(fieldName, value);
    }
  }, [touched, validateFieldOnChange]);

  // Get field props for form components
  const getFieldProps = useCallback((fieldName) => {
    return {
      value: values[fieldName] || '',
      error: touched[fieldName] ? errors[fieldName] : null,
      onChange: (e) => handleChange(fieldName, e.target.value),
      onBlur: () => handleBlur(fieldName),
      onFocus: () => {
        if (!touched[fieldName]) {
          setTouched(prev => ({ ...prev, [fieldName]: true }));
        }
      }
    };
  }, [values, errors, touched, handleChange, handleBlur]);

  // Check if form is valid
  const isFormValid = useCallback(() => {
    return !hasErrors() && Object.keys(validationSchema).every(fieldName => {
      const value = values[fieldName];
      const rules = validationSchema[fieldName];
      
      // Check required fields
      if (rules.required && (!value || value.toString().trim() === '')) {
        return false;
      }
      
      return true;
    });
  }, [hasErrors, validationSchema, values]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    submitSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValue,
    getFieldProps,
    isFormValid: isFormValid(),
    setSubmitError,
    setSubmitSuccess
  };
};

// Common validation schemas
export const COMMON_SCHEMAS = {
  email: {
    required: VALIDATION_RULES.REQUIRED('Email'),
    ...VALIDATION_RULES.EMAIL
  },
  
  password: {
    required: VALIDATION_RULES.REQUIRED('Password'),
    ...VALIDATION_RULES.PASSWORD
  },
  
  name: {
    required: VALIDATION_RULES.REQUIRED('Name'),
    ...VALIDATION_RULES.NAME,
    ...VALIDATION_RULES.MIN_LENGTH(2, 'Name'),
    ...VALIDATION_RULES.MAX_LENGTH(50, 'Name')
  },
  
  username: {
    required: VALIDATION_RULES.REQUIRED('Username'),
    ...VALIDATION_RULES.USERNAME,
    ...VALIDATION_RULES.MIN_LENGTH(3, 'Username'),
    ...VALIDATION_RULES.MAX_LENGTH(20, 'Username')
  },
  
  url: {
    required: VALIDATION_RULES.REQUIRED('URL'),
    ...VALIDATION_RULES.URL
  },
  
  phone: {
    required: VALIDATION_RULES.REQUIRED('Phone'),
    pattern: {
      value: VALIDATION_RULES.PHONE,
      message: "Please enter a valid phone number"
    }
  },
  
  description: {
    required: VALIDATION_RULES.REQUIRED('Description'),
    ...VALIDATION_RULES.MIN_LENGTH(10, 'Description'),
    ...VALIDATION_RULES.MAX_LENGTH(500, 'Description')
  }
};
