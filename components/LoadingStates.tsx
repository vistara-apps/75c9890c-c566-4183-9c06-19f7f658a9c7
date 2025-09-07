import React from 'react';
import { Moon, Brain, TrendingUp, Loader2 } from 'lucide-react';

export function DreamInterpretationLoading() {
  return (
    <div className="glass-card p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <Moon className="w-12 h-12 text-purple-400 animate-pulse" />
          <div className="absolute inset-0 animate-spin">
            <Loader2 className="w-12 h-12 text-purple-300 opacity-50" />
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Interpreting Your Dream</h3>
      <p className="text-gray-300 mb-4">AI is analyzing the symbols and meanings...</p>
      <div className="flex justify-center space-x-1">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}

export function PatternAnalysisLoading() {
  return (
    <div className="glass-card p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <Brain className="w-12 h-12 text-blue-400 animate-pulse" />
          <div className="absolute inset-0 animate-spin">
            <TrendingUp className="w-8 h-8 text-blue-300 opacity-50" />
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Analyzing Patterns</h3>
      <p className="text-gray-300 mb-4">Discovering recurring themes in your dreams...</p>
      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
      </div>
    </div>
  );
}

export function DreamListLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card p-4">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="h-4 bg-gray-600 rounded w-24"></div>
              <div className="h-3 bg-gray-600 rounded w-16"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-600 rounded w-full"></div>
              <div className="h-3 bg-gray-600 rounded w-3/4"></div>
            </div>
            <div className="flex space-x-2 mt-3">
              <div className="h-6 bg-gray-600 rounded-full w-16"></div>
              <div className="h-6 bg-gray-600 rounded-full w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GeneralLoading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  );
}

export function ButtonLoading({ children, isLoading, ...props }: { 
  children: React.ReactNode; 
  isLoading: boolean; 
  [key: string]: any; 
}) {
  return (
    <button 
      {...props} 
      disabled={isLoading || props.disabled}
      className={`${props.className} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
