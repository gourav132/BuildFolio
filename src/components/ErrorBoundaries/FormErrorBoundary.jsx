import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

class FormErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Form Error Boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <FiAlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-400 mb-1">
                Form Error
              </h3>
              <p className="text-sm text-red-300 mb-3">
                There was an error loading this form. Your data is safe.
              </p>
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center space-x-1 text-xs text-red-400 hover:text-red-300 transition-colors duration-200"
              >
                <FiRefreshCw className="w-3 h-3" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default FormErrorBoundary;
