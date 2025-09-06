'use client';

import React from 'react';
import { Brain, TrendingUp } from 'lucide-react';

// Loading Spinner Component
export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} border-2 border-white border-t-transparent rounded-full animate-spin ${className}`} />
  );
}

// Dream Interpretation Loading
export function DreamInterpretationLoading() {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center">
          <Brain className="w-5 h-5 text-purple-400 animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Interpreting Your Dream</h3>
          <p className="text-gray-300 text-sm">AI is analyzing the symbols and meanings...</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <LoadingSpinner size="sm" />
          <span className="text-gray-300 text-sm">Analyzing dream symbols</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-600 rounded-full animate-pulse" />
          <span className="text-gray-400 text-sm">Identifying emotional themes</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-600 rounded-full animate-pulse" />
          <span className="text-gray-400 text-sm">Generating interpretation</span>
        </div>
      </div>
    </div>
  );
}

// Pattern Analysis Loading
export function PatternAnalysisLoading() {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-teal-500 bg-opacity-20 rounded-full flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-teal-400 animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Analyzing Dream Patterns</h3>
          <p className="text-gray-300 text-sm">Discovering recurring themes and symbols...</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <LoadingSpinner size="sm" />
          <span className="text-gray-300 text-sm">Scanning for recurring symbols</span>
        </div>
        <div className="flex items-center space-x-2">
          <LoadingSpinner size="sm" />
          <span className="text-gray-300 text-sm">Identifying emotional patterns</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-600 rounded-full animate-pulse" />
          <span className="text-gray-400 text-sm">Generating insights</span>
        </div>
      </div>
    </div>
  );
}

// Dream List Loading Skeleton
export function DreamListLoading({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="glass-card p-4 animate-pulse">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-600 rounded w-3/4" />
              <div className="h-3 bg-gray-700 rounded w-1/2" />
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-600 rounded-full w-16" />
                <div className="h-6 bg-gray-600 rounded-full w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Empty State with Loading
interface EmptyStateWithLoadingProps {
  isLoading: boolean;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyStateWithLoading({ 
  isLoading, 
  icon: Icon, 
  title, 
  description, 
  action 
}: EmptyStateWithLoadingProps) {
  if (isLoading) {
    return (
      <div className="glass-card p-8 text-center animate-pulse">
        <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4" />
        <div className="h-6 bg-gray-600 rounded w-48 mx-auto mb-2" />
        <div className="h-4 bg-gray-700 rounded w-64 mx-auto mb-4" />
        <div className="h-10 bg-gray-600 rounded w-32 mx-auto" />
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

// Card Loading Skeleton
export function CardLoading() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gray-600 rounded" />
        <div className="h-6 bg-gray-600 rounded w-32" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
}

// Button Loading State
interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function LoadingButton({ 
  isLoading, 
  children, 
  className = '', 
  onClick, 
  disabled 
}: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${className} ${isLoading ? 'cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <LoadingSpinner size="sm" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
