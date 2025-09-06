'use client';

import React from 'react';
import { Brain, TrendingUp } from 'lucide-react';

interface LoadingStateProps {
  className?: string;
}

interface EmptyStateWithLoadingProps {
  isLoading: boolean;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function DreamInterpretationLoading({ className = '' }: LoadingStateProps) {
  return (
    <div className={`glass-card p-6 animate-fade-in ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center">
          <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Interpreting Your Dream</h3>
          <p className="text-gray-300 text-sm">AI is analyzing your dream...</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="h-4 bg-white bg-opacity-10 rounded animate-pulse"></div>
        <div className="h-4 bg-white bg-opacity-10 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-white bg-opacity-10 rounded animate-pulse w-1/2"></div>
      </div>
      
      <div className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
        <div className="loading-spinner"></div>
        <span>This may take a few moments...</span>
      </div>
    </div>
  );
}

export function PatternAnalysisLoading({ className = '' }: LoadingStateProps) {
  return (
    <div className={`glass-card p-6 animate-fade-in ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-blue-400 animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Analyzing Dream Patterns</h3>
          <p className="text-gray-300 text-sm">Discovering recurring themes...</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-white bg-opacity-10 rounded animate-pulse"></div>
            <div className="h-3 bg-white bg-opacity-10 rounded animate-pulse w-2/3"></div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
        <div className="loading-spinner"></div>
        <span>Analyzing patterns across your dreams...</span>
      </div>
    </div>
  );
}

export function DreamListLoading({ count = 3, className = '' }: LoadingStateProps & { count?: number }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card p-4 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white bg-opacity-10 rounded animate-pulse"></div>
              <div className="h-3 bg-white bg-opacity-10 rounded animate-pulse w-3/4"></div>
              <div className="flex space-x-2">
                <div className="h-2 w-12 bg-white bg-opacity-10 rounded animate-pulse"></div>
                <div className="h-2 w-16 bg-white bg-opacity-10 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyStateWithLoading({ 
  isLoading, 
  icon: Icon, 
  title, 
  description, 
  action,
  className = '' 
}: EmptyStateWithLoadingProps & { className?: string }) {
  if (isLoading) {
    return (
      <div className={`glass-card p-8 text-center animate-fade-in ${className}`}>
        <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="loading-spinner w-6 h-6"></div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Loading...</h3>
        <p className="text-gray-300">Please wait while we prepare your data</p>
      </div>
    );
  }

  return (
    <div className={`glass-card p-8 text-center animate-fade-in ${className}`}>
      <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      {action}
    </div>
  );
}

// Generic loading spinner component
export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`loading-spinner ${sizeClasses[size]} ${className}`}></div>
  );
}

// Skeleton loader for text content
export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-white bg-opacity-10 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        ></div>
      ))}
    </div>
  );
}
