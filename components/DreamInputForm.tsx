'use client';

import { useState } from 'react';
import { Moon, Sparkles, Tag } from 'lucide-react';
import { MOOD_TAGS } from '@/lib/types';

interface DreamInputFormProps {
  onSubmit: (description: string, moodTags: string[]) => void;
  isLoading?: boolean;
}

export function DreamInputForm({ onSubmit, isLoading = false }: DreamInputFormProps) {
  const [description, setDescription] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [showMoodTags, setShowMoodTags] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description.trim(), selectedMoods);
      setDescription('');
      setSelectedMoods([]);
      setShowMoodTags(false);
    }
  };

  const toggleMoodTag = (moodId: string) => {
    setSelectedMoods(prev => 
      prev.includes(moodId) 
        ? prev.filter(id => id !== moodId)
        : [...prev, moodId]
    );
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Moon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Record Your Dream</h2>
          <p className="text-gray-300">Describe what you remember</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="dream-description" className="block text-sm font-medium text-gray-300 mb-2">
            Dream Description
          </label>
          <textarea
            id="dream-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="I dreamed that I was flying over a vast ocean..."
            className="input-field h-32 resize-none"
            required
            disabled={isLoading}
          />
          <p className="text-xs text-gray-400 mt-1">
            {description.length}/500 characters
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowMoodTags(!showMoodTags)}
            className="flex items-center space-x-2 text-accent hover:text-white transition-colors duration-200"
          >
            <Tag className="w-4 h-4" />
            <span className="text-sm font-medium">
              Add Mood Tags {selectedMoods.length > 0 && `(${selectedMoods.length})`}
            </span>
          </button>

          {showMoodTags && (
            <div className="mt-3 animate-slide-up">
              <div className="flex flex-wrap gap-2">
                {MOOD_TAGS.map((mood) => (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => toggleMoodTag(mood.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedMoods.includes(mood.id)
                        ? `${mood.color} text-white shadow-lg`
                        : 'bg-white bg-opacity-20 text-gray-300 hover:bg-opacity-30'
                    }`}
                    disabled={isLoading}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!description.trim() || isLoading}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Interpreting Dream...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Interpret Dream</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
