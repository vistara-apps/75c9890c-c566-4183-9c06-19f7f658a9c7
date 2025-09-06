'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
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
  clearAll: () => void;
}

interface ToastActions {
  dreamInterpreted: () => void;
  patternsAnalyzed: (count: number) => void;
  analysisStarted: () => void;
  apiError: (message: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

// Hook to use toast context
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Hook for predefined toast actions
export function useToastActions(): ToastActions {
  const { addToast } = useToast();

  return {
    dreamInterpreted: () => {
      addToast({
        type: 'success',
        title: 'Dream Interpreted!',
        message: 'Your dream has been successfully analyzed',
        duration: 4000
      });
    },
    
    patternsAnalyzed: (count: number) => {
      addToast({
        type: 'success',
        title: 'Patterns Discovered!',
        message: `Found ${count} recurring themes in your dreams`,
        duration: 5000
      });
    },
    
    analysisStarted: () => {
      addToast({
        type: 'info',
        title: 'Analysis Started',
        message: 'Analyzing patterns in your dreams...',
        duration: 3000
      });
    },
    
    apiError: (message: string) => {
      addToast({
        type: 'error',
        title: 'API Error',
        message: message || 'Something went wrong with the request',
        duration: 6000
      });
    },
    
    success: (title: string, message?: string) => {
      addToast({
        type: 'success',
        title,
        message,
        duration: 4000
      });
    },
    
    error: (title: string, message?: string) => {
      addToast({
        type: 'error',
        title,
        message,
        duration: 6000
      });
    },
    
    info: (title: string, message?: string) => {
      addToast({
        type: 'info',
        title,
        message,
        duration: 4000
      });
    },
    
    warning: (title: string, message?: string) => {
      addToast({
        type: 'warning',
        title,
        message,
        duration: 5000
      });
    }
  };
}

// Toast Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, toast.duration || 4000);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value = {
    toasts,
    addToast,
    removeToast,
    clearAll
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
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

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(toast.id), 200);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getColorClasses = () => {
    switch (toast.type) {
      case 'success':
        return 'border-green-400 border-opacity-30 bg-green-500 bg-opacity-10';
      case 'error':
        return 'border-red-400 border-opacity-30 bg-red-500 bg-opacity-10';
      case 'warning':
        return 'border-yellow-400 border-opacity-30 bg-yellow-500 bg-opacity-10';
      case 'info':
      default:
        return 'border-blue-400 border-opacity-30 bg-blue-500 bg-opacity-10';
    }
  };

  return (
    <div
      className={`
        glass-card p-4 border ${getColorClasses()}
        transform transition-all duration-300 ease-out
        ${isVisible && !isRemoving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isRemoving ? 'scale-95' : 'scale-100'}
      `}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white mb-1">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-sm text-gray-300 mb-2">
              {toast.message}
            </p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="text-xs text-accent hover:text-white transition-colors font-medium"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={handleRemove}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
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
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
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

// Utility functions for quick toast creation
export const toast = {
  success: (title: string, message?: string, _options?: Partial<Toast>) => {
    // This would need to be called within a component that has access to the context
    console.log('Toast success:', title, message);
  },
  
  error: (title: string, message?: string, _options?: Partial<Toast>) => {
    console.log('Toast error:', title, message);
  },
  
  info: (title: string, message?: string, _options?: Partial<Toast>) => {
    console.log('Toast info:', title, message);
  },
  
  warning: (title: string, message?: string, _options?: Partial<Toast>) => {
    console.log('Toast warning:', title, message);
  }
};

// Toast notification for dream-specific actions
export function useDreamToasts() {
  const toastActions = useToastActions();
  
  return {
    dreamSaved: (dreamTitle?: string) => {
      toastActions.success(
        'Dream Saved',
        dreamTitle ? `"${dreamTitle}" has been saved to your journal` : 'Your dream has been saved'
      );
    },
    
    interpretationComplete: () => {
      toastActions.success(
        'Interpretation Complete',
        'Your dream has been analyzed and insights are ready'
      );
    },
    
    patternDiscovered: (patternName: string) => {
      toastActions.info(
        'New Pattern Discovered',
        `Found recurring theme: ${patternName}`
      );
    },
    
    analysisError: (operation: string) => {
      toastActions.error(
        'Analysis Failed',
        `Unable to complete ${operation}. Please try again.`
      );
    }
  };
}
