'use client';

import { Brain, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('Application error:', error);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="glass-card p-8 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong!</h2>
        <p className="text-gray-300 mb-6 text-sm">
          We encountered an error while loading DreamWeaver. Please try again.
        </p>
        <button
          onClick={reset}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
