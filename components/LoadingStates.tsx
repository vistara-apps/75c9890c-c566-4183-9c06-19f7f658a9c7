'use client';

import { Brain, Moon, Sparkles, TrendingUp } from 'lucide-react';

// Skeleton Card Component
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`glass-card p-6 animate-pulse ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-white bg-opacity-20 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-white bg-opacity-10 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-white bg-opacity-20 rounded"></div>
        <div className="h-3 bg-white bg-opacity-20 rounded w-5/6"></div>
        <div className="h-3 bg-white bg-opacity-20 rounded w-4/6"></div>
      </div>
    </div>
  );
}

// Dream Interpretation Loading
export function DreamInterpretationLoading() {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce-in">
          <Brain className="w-8 h-8 text-white animate-pulse" />
        </div>
      </div>
      
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Analyzing Your Dream</h3>
        <p className="text-gray-300 text-sm">AI is interpreting the symbols and meanings...</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <div className="h-3 bg-white bg-opacity-20 rounded flex-1 animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-3 bg-white bg-opacity-20 rounded flex-1 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          <div className="h-3 bg-white bg-opacity-20 rounded flex-1 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white border-opacity-10">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>This may take a few moments...</span>
        </div>
      </div>
    </div>
  );
}

// Pattern Analysis Loading
export function PatternAnalysisLoading() {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center animate-bounce-in">
          <TrendingUp className="w-8 h-8 text-white animate-pulse" />
        </div>
      </div>
      
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Discovering Patterns</h3>
        <p className="text-gray-300 text-sm">Analyzing recurring themes in your dreams...</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-2 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
            <div className="h-2 bg-white bg-opacity-20 rounded animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="h-2 bg-white bg-opacity-20 rounded animate-pulse"></div>
        <div className="h-2 bg-white bg-opacity-20 rounded w-4/5 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
        <div className="h-2 bg-white bg-opacity-20 rounded w-3/5 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}

// Dream List Loading
export function DreamListLoading({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card p-4 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 bg-white bg-opacity-20 rounded w-1/3"></div>
                <div className="h-3 bg-white bg-opacity-10 rounded w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-white bg-opacity-20 rounded"></div>
                <div className="h-3 bg-white bg-opacity-20 rounded w-4/5"></div>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <div className="h-5 bg-white bg-opacity-10 rounded-full w-12"></div>
                <div className="h-5 bg-white bg-opacity-10 rounded-full w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Inline Loading Spinner
export function LoadingSpinner({ size = 'base', className = '' }: { size?: 'sm' | 'base' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-3 h-3 border',
    base: 'w-4 h-4 border-2',
    lg: 'w-6 h-6 border-2',
  };
  
  return (
    <div className={`${sizeClasses[size]} border-white border-t-transparent rounded-full animate-spin ${className}`} />
  );
}

// Button Loading State
export function ButtonLoading({ children, isLoading, loadingText, ...props }: {
  children: React.ReactNode;
  isLoading: boolean;
  loadingText?: string;
  [key: string]: any;
}) {
  return (
    <button {...props} disabled={isLoading || props.disabled}>
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" className="mr-2" />
          <span>{loadingText || 'Loading...'}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

// Empty State with Loading Option
export function EmptyStateWithLoading({ 
  isLoading, 
  icon: Icon = Moon, 
  title, 
  description, 
  action,
  loadingTitle = "Loading...",
  loadingDescription = "Please wait while we fetch your data"
}: {
  isLoading: boolean;
  icon?: React.ComponentType<any>;
  title: string;
  description: string;
  action?: React.ReactNode;
  loadingTitle?: string;
  loadingDescription?: string;
}) {
  if (isLoading) {
    return (
      <div className="glass-card p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{loadingTitle}</h3>
        <p className="text-gray-300">{loadingDescription}</p>
      </div>
    );
  }
  
  return (
    <div className="glass-card p-8 text-center animate-fade-in">
      <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      {action}
    </div>
  );
}

// Page Loading Overlay
export function PageLoadingOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="glass-card p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
          <Brain className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">DreamWeaver</h3>
        <p className="text-gray-300 text-sm">Loading your dream experience...</p>
      </div>
    </div>
  );
}
