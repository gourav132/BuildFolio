import React from 'react';
import { motion } from 'framer-motion';
import { FiWifi, FiWifiOff, FiRefreshCw } from 'react-icons/fi';

class NetworkErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      isOnline: navigator.onLine
    };
  }

  static getDerivedStateFromError(error) {
    // Check if it's a network-related error
    if (error.message.includes('fetch') || 
        error.message.includes('network') || 
        error.message.includes('timeout')) {
      return { hasError: true };
    }
    return null;
  }

  componentDidCatch(error, errorInfo) {
    console.error('Network Error Boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  componentDidMount() {
    // Listen for online/offline events
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  handleOnline = () => {
    this.setState({ isOnline: true });
  };

  handleOffline = () => {
    this.setState({ isOnline: false });
  };

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
          className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-4"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {this.state.isOnline ? (
                <FiWifiOff className="w-5 h-5 text-orange-400" />
              ) : (
                <FiWifi className="w-5 h-5 text-orange-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-orange-400 mb-1">
                {this.state.isOnline ? 'Connection Error' : 'You\'re Offline'}
              </h3>
              <p className="text-sm text-orange-300 mb-3">
                {this.state.isOnline 
                  ? 'There was a problem connecting to our servers. Please try again.'
                  : 'Please check your internet connection and try again.'
                }
              </p>
              <button
                onClick={this.handleRetry}
                disabled={!this.state.isOnline}
                className="inline-flex items-center space-x-1 text-xs text-orange-400 hover:text-orange-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default NetworkErrorBoundary;
