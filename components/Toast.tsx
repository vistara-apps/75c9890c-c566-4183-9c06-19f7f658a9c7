'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  success: (title: string, message?: string, options?: Partial<Toast>) => void;
  error: (title: string, message?: string, options?: Partial<Toast>) => void;
  warning: (title: string, message?: string, options?: Partial<Toast>) => void;
  info: (title: string, message?: string, options?: Partial<Toast>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after duration
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const success = useCallback((title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ type: 'success', title, message, ...options });
  }, [addToast]);

  const error = useCallback((title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ type: 'error', title, message, duration: 7000, ...options });
  }, [addToast]);

  const warning = useCallback((title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ type: 'warning', title, message, ...options });
  }, [addToast]);

  const info = useCallback((title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ type: 'info', title, message, ...options });
  }, [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Individual Toast Component
function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = useCallback(() => {
    setIsRemoving(true);
    setTimeout(() => onRemove(toast.id), 300);
  }, [toast.id, onRemove]);

  const getToastStyles = () => {
    const baseStyles = "glass-card p-4 shadow-lg border-l-4 transition-all duration-300 ease-in-out";
    
    const typeStyles = {
      success: "border-l-green-400 bg-green-500 bg-opacity-10",
      error: "border-l-red-400 bg-red-500 bg-opacity-10",
      warning: "border-l-yellow-400 bg-yellow-500 bg-opacity-10",
      info: "border-l-blue-400 bg-blue-500 bg-opacity-10",
    };

    const animationStyles = isRemoving 
      ? "transform translate-x-full opacity-0" 
      : isVisible 
        ? "transform translate-x-0 opacity-100" 
        : "transform translate-x-full opacity-0";

    return `${baseStyles} ${typeStyles[toast.type]} ${animationStyles}`;
  };

  const getIcon = () => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };
    
    switch (toast.type) {
      case 'success':
        return <CheckCircle {...iconProps} className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle {...iconProps} className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle {...iconProps} className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <Info {...iconProps} className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-start space-x-3">
        {getIcon()}
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white">{toast.title}</h4>
          {toast.message && (
            <p className="text-sm text-gray-300 mt-1">{toast.message}</p>
          )}
          
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-sm text-accent hover:text-white transition-colors duration-200 font-medium"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={handleRemove}
          className="p-1 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
          aria-label="Close notification"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

// Toast Container Component
function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
}

// Utility functions for common toast patterns
export const toast = {
  success: (title: string, message?: string) => {
    // This will be replaced by the actual toast context when used
    console.log('Success:', title, message);
  },
  error: (title: string, message?: string) => {
    console.log('Error:', title, message);
  },
  warning: (title: string, message?: string) => {
    console.log('Warning:', title, message);
  },
  info: (title: string, message?: string) => {
    console.log('Info:', title, message);
  },
};

// Hook for common toast patterns
export function useToastActions() {
  const { success, error, warning, info } = useToast();

  return {
    // Dream-specific toasts
    dreamSaved: () => success('Dream Saved', 'Your dream has been recorded successfully'),
    dreamInterpreted: () => success('Dream Interpreted', 'AI analysis is complete'),
    dreamDeleted: () => info('Dream Deleted', 'Your dream has been removed'),
    
    // Pattern analysis toasts
    patternsAnalyzed: (count: number) => success('Patterns Found', `Discovered ${count} recurring themes`),
    analysisStarted: () => info('Analysis Started', 'Discovering patterns in your dreams...'),
    
    // Error toasts
    networkError: () => error('Connection Error', 'Please check your internet connection'),
    apiError: (message?: string) => error('Service Error', message || 'Something went wrong'),
    validationError: (message: string) => warning('Validation Error', message),
    
    // Wallet toasts
    walletConnected: (address: string) => success('Wallet Connected', `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`),
    walletDisconnected: () => info('Wallet Disconnected', 'You have been signed out'),
    
    // General actions
    copied: () => success('Copied', 'Content copied to clipboard'),
    exported: () => success('Exported', 'Your data has been exported successfully'),
  };
}

// Higher-order component to provide toast context
export function withToast<P extends object>(Component: React.ComponentType<P>) {
  const WrappedComponent = (props: P) => (
    <ToastProvider>
      <Component {...props} />
    </ToastProvider>
  );
  
  WrappedComponent.displayName = `withToast(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}
