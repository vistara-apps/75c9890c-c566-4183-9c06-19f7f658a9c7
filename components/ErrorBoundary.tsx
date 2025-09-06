'use client';

import React, { useState, useCallback, useContext, createContext } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

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

interface ErrorContextType {
  error: Error | null;
  handleError: (error: Error) => void;
  clearError: () => void;
}

// Error Context
const ErrorContext = createContext<ErrorContextType | null>(null);

// Hook to use error handling
export function useErrorHandler() {
  const context = useContext(ErrorContext);
  const [fallbackError, setFallbackError] = useState<Error | null>(null);
  
  if (!context) {
    // Fallback error handler if used outside of context
    return {
      error: fallbackError,
      handleError: (err: Error) => {
        console.error('Error occurred:', err);
        setFallbackError(err);
      },
      clearError: () => setFallbackError(null)
    };
  }
  return context;
}

// Error Provider Component
function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((err: Error) => {
    console.error('Error handled by ErrorProvider:', err);
    setError(err);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    error,
    handleError,
    clearError
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
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
          We encountered an unexpected error. Don&apos;t worry, your dreams are safe.
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
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call the onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      
      return (
        <ErrorProvider>
          <FallbackComponent
            error={this.state.error}
            resetError={this.resetError}
            errorInfo={this.state.errorInfo}
          />
        </ErrorProvider>
      );
    }

    return (
      <ErrorProvider>
        {this.props.children}
      </ErrorProvider>
    );
  }
}

// Inline Error Component for non-critical errors
export function InlineError({ 
  error, 
  onRetry, 
  className = '' 
}: { 
  error: Error; 
  onRetry?: () => void; 
  className?: string; 
}) {
  return (
    <div className={`glass-card p-4 border-l-4 border-red-400 animate-fade-in ${className}`}>
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-sm font-medium text-white mb-1">Error</h4>
          <p className="text-sm text-gray-300 mb-3">{error.message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn-sm btn-secondary flex items-center space-x-1"
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

// Error Alert Component
export function ErrorAlert({ 
  title = 'Error', 
  message, 
  onDismiss,
  className = '' 
}: { 
  title?: string; 
  message: string; 
  onDismiss?: () => void;
  className?: string;
}) {
  return (
    <div className={`glass-card p-4 bg-red-500 bg-opacity-10 border border-red-400 border-opacity-30 animate-fade-in ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-white mb-1">{title}</h4>
            <p className="text-sm text-gray-300">{message}</p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Dismiss error"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// Hook for async error handling
export function useAsyncError() {
  const { handleError } = useErrorHandler();
  
  return useCallback((error: Error) => {
    handleError(error);
  }, [handleError]);
}

// Wrapper for async operations with error handling
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  asyncFn: T,
  onError?: (error: Error) => void
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error occurred');
      if (onError) {
        onError(err);
      } else {
        console.error('Async operation failed:', err);
      }
      throw err;
    }
  }) as T;
}
