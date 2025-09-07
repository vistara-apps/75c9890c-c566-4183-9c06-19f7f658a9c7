'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    const duration = toast.duration || 5000;
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const context = useContext(ToastContext);
  if (!context) return null;

  const { toasts, removeToast } = context;

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: 'border-green-500 bg-green-500',
    error: 'border-red-500 bg-red-500',
    warning: 'border-yellow-500 bg-yellow-500',
    info: 'border-blue-500 bg-blue-500',
  };

  const Icon = icons[toast.type];

  return (
    <div className={`glass-card p-4 max-w-sm border-l-4 ${colors[toast.type]} bg-opacity-10 animate-slide-up`}>
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
          toast.type === 'success' ? 'text-green-400' :
          toast.type === 'error' ? 'text-red-400' :
          toast.type === 'warning' ? 'text-yellow-400' :
          'text-blue-400'
        }`} />
        
        <div className="flex-1">
          <h4 className="text-sm font-medium text-white">{toast.title}</h4>
          {toast.message && (
            <p className="text-sm text-gray-300 mt-1">{toast.message}</p>
          )}
        </div>
        
        <button
          onClick={() => onRemove(toast.id)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Convenience hook for common toast actions
export function useToastActions() {
  const { addToast } = useToast();

  return {
    dreamInterpreted: () => addToast({
      type: 'success',
      title: 'Dream Interpreted!',
      message: 'Your dream has been successfully analyzed.',
    }),
    
    patternsAnalyzed: (count: number) => addToast({
      type: 'success',
      title: 'Patterns Discovered!',
      message: `Found ${count} recurring patterns in your dreams.`,
    }),
    
    analysisStarted: () => addToast({
      type: 'info',
      title: 'Analysis Started',
      message: 'Analyzing your dream patterns...',
      duration: 3000,
    }),
    
    apiError: (message: string) => addToast({
      type: 'error',
      title: 'API Error',
      message: message || 'Something went wrong. Please try again.',
      duration: 7000,
    }),
    
    success: (title: string, message?: string) => addToast({
      type: 'success',
      title,
      message,
    }),
    
    error: (title: string, message?: string) => addToast({
      type: 'error',
      title,
      message,
      duration: 7000,
    }),
    
    warning: (title: string, message?: string) => addToast({
      type: 'warning',
      title,
      message,
    }),
    
    info: (title: string, message?: string) => addToast({
      type: 'info',
      title,
      message,
    }),
  };
}
