'use client';

import { Sparkles, Brain, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '@/lib/utils';

interface InterpretationCardProps {
  dream: {
    dreamId: string;
    description: string;
    timestamp: Date;
    interpretation: string;
    moodTags: string[];
  };
}

export function InterpretationCard({ dream }: InterpretationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dream.interpretation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Interpretation</h3>
            <p className="text-sm text-gray-300">{formatDate(dream.timestamp)}</p>
          </div>
        </div>
        
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200"
          title="Copy interpretation"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300" />
          )}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-accent mb-2 flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Your Dream</span>
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed bg-white bg-opacity-5 p-3 rounded-lg">
            {dream.description}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-accent mb-2 flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>Interpretation</span>
          </h4>
          <div className="text-white text-sm leading-relaxed space-y-3">
            {dream.interpretation.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="text-gray-100">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white border-opacity-10">
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Sparkles className="w-3 h-3" />
          <span>Powered by AI • Keep exploring your dreams</span>
        </div>
      </div>
    </div>
  );
}
