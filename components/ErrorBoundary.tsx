'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorFallbackProps {
  error?: Error;
  resetError: () => void;
  errorInfo?: React.ErrorInfo;
}

// Default Error Fallback Component
function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-md w-full text-center animate-fade-in">
        <div className="w-16 h-16 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
        <p className="text-gray-300 mb-6">
          We encountered an unexpected error. Don't worry, your dreams are safe.
        </p>
        
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left">
            <summary className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
              Error Details (Development)
            </summary>
            <pre className="mt-2 p-3 bg-black bg-opacity-30 rounded text-xs text-red-300 overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={resetError}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </button>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white border-opacity-10">
          <p className="text-xs text-gray-400">
            If this problem persists, please contact support
          </p>
        </div>
      </div>
    </div>
  );
}

// Error Boundary Class Component
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to log this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          errorInfo={this.state.errorInfo}
        />
      );
    }

    return this.props.children;
  }
}

// Inline Error Display Component
export function InlineError({ 
  error, 
  onRetry, 
  className = '',
  showDetails = false 
}: { 
  error: string | Error; 
  onRetry?: () => void;
  className?: string;
  showDetails?: boolean;
}) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  return (
    <div className={`glass-card p-4 border-red-500 border-opacity-50 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-4 h-4 text-red-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-red-300 mb-1">Error</h4>
          <p className="text-sm text-gray-300">{errorMessage}</p>
          
          {showDetails && typeof error === 'object' && error.stack && (
            <details className="mt-2">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-white transition-colors">
                Show Details
              </summary>
              <pre className="mt-1 p-2 bg-black bg-opacity-30 rounded text-xs text-red-300 overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}
          
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 btn-sm btn-secondary flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Network Error Component
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="glass-card p-6 text-center">
      <div className="w-12 h-12 bg-orange-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-6 h-6 text-orange-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">Connection Error</h3>
      <p className="text-gray-300 mb-4">
        Unable to connect to our servers. Please check your internet connection.
      </p>
      
      {onRetry && (
        <button onClick={onRetry} className="btn-primary flex items-center space-x-2 mx-auto">
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}

// API Error Component
export function APIError({ 
  message = "Something went wrong with the request", 
  onRetry 
}: { 
  message?: string; 
  onRetry?: () => void;
}) {
  return (
    <div className="glass-card p-6 text-center">
      <div className="w-12 h-12 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Bug className="w-6 h-6 text-red-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">Service Error</h3>
      <p className="text-gray-300 mb-4">{message}</p>
      
      {onRetry && (
        <button onClick={onRetry} className="btn-primary flex items-center space-x-2 mx-auto">
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}

// Hook for handling async errors
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);
  
  const handleError = React.useCallback((error: Error) => {
    console.error('Handled error:', error);
    setError(error);
  }, []);
  
  const clearError = React.useCallback(() => {
    setError(null);
  }, []);
  
  return {
    error,
    handleError,
    clearError,
  };
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<ErrorFallbackProps>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}
