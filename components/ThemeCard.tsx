'use client';

import { TrendingUp, Eye, Calendar } from 'lucide-react';

interface ThemeCardProps {
  theme: {
    name: string;
    frequency: number;
    description: string;
    lastSeen: Date;
    color: string;
  };
}

export function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <div className="glass-card p-5 hover:bg-opacity-15 transition-all duration-200 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${theme.color} rounded-lg flex items-center justify-center`}>
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{theme.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <TrendingUp className="w-3 h-3" />
              <span>{theme.frequency} times</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>Last seen</span>
          </div>
          <p className="text-xs text-gray-300 mt-1">
            {theme.lastSeen.toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed">
        {theme.description}
      </p>

      <div className="mt-4 pt-3 border-t border-white border-opacity-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-xs text-gray-400">Recurring Pattern</span>
          </div>
          <div className="text-xs text-accent font-medium">
            {theme.frequency > 5 ? 'High' : theme.frequency > 2 ? 'Medium' : 'Low'} Frequency
          </div>
        </div>
      </div>
    </div>
  );
}
