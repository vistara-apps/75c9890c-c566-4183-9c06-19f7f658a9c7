'use client';

import { Moon, Calendar, Tag } from 'lucide-react';
import { formatDate, truncateText } from '@/lib/utils';
import { MOOD_TAGS } from '@/lib/types';

interface DreamListItemProps {
  dream: {
    dreamId: string;
    description: string;
    timestamp: Date;
    moodTags: string[];
    interpretation?: string;
  };
  onClick: () => void;
}

export function DreamListItem({ dream, onClick }: DreamListItemProps) {

  return (
    <div 
      onClick={onClick}
      className="glass-card p-4 cursor-pointer hover:bg-opacity-15 transition-all duration-200 animate-fade-in"
    >
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Moon className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">
              {formatDate(dream.timestamp)}
            </span>
          </div>
          
          <p className="text-white text-sm leading-relaxed mb-3">
            {truncateText(dream.description, 120)}
          </p>
          
          {dream.moodTags.length > 0 && (
            <div className="flex items-center space-x-2 mb-2">
              <Tag className="w-3 h-3 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {dream.moodTags.slice(0, 3).map((moodId) => {
                  const mood = MOOD_TAGS.find(m => m.id === moodId);
                  return mood ? (
                    <span
                      key={moodId}
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white ${mood.color}`}
                    >
                      {mood.label}
                    </span>
                  ) : null;
                })}
                {dream.moodTags.length > 3 && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-300 bg-gray-600">
                    +{dream.moodTags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {dream.interpretation && (
            <div className="flex items-center space-x-2 text-accent">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-xs font-medium">Interpreted</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
