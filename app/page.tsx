'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { DreamInputForm } from '@/components/DreamInputForm';
import { DreamListItem } from '@/components/DreamListItem';
import { InterpretationCard } from '@/components/InterpretationCard';
import { ThemeCard } from '@/components/ThemeCard';
import { WalletConnect } from '@/components/WalletConnect';
import { interpretDream, analyzePatterns } from '@/lib/openai';
import { saveDream, getDreams, generateId } from '@/lib/utils';
import { Moon, Brain, TrendingUp, Sparkles, Plus, History } from 'lucide-react';

type ViewType = 'home' | 'dreams' | 'patterns' | 'settings';

export default function DreamWeaverApp() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [dreams, setDreams] = useState<any[]>([]);
  const [selectedDream, setSelectedDream] = useState<any>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [patterns, setPatterns] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Load dreams from localStorage on component mount
    const storedDreams = getDreams();
    setDreams(storedDreams);
  }, []);

  const handleDreamSubmit = async (description: string, moodTags: string[]) => {
    setIsInterpreting(true);
    
    try {
      const interpretation = await interpretDream(description, moodTags);
      
      const newDream = {
        dreamId: generateId(),
        userId: 'demo-user', // In real app, this would be the wallet address
        timestamp: new Date(),
        description,
        moodTags,
        interpretation,
      };

      saveDream(newDream);
      setDreams(prev => [newDream, ...prev]);
      setSelectedDream(newDream);
      setCurrentView('dreams');
    } catch (error) {
      console.error('Error interpreting dream:', error);
      // In production, you might want to show a user-friendly error message
      // For now, we'll just log the error and continue
    } finally {
      setIsInterpreting(false);
    }
  };

  const handleAnalyzePatterns = async () => {
    if (dreams.length < 2) return;
    
    setIsAnalyzing(true);
    
    try {
      const analysis = await analyzePatterns(dreams);
      
      // Generate mock patterns based on dreams
      const mockPatterns = [
        {
          name: 'Flying Dreams',
          frequency: Math.floor(Math.random() * 5) + 1,
          description: 'Dreams involving flight often represent a desire for freedom or escape from limitations.',
          lastSeen: new Date(),
          color: 'bg-blue-500',
        },
        {
          name: 'Water Themes',
          frequency: Math.floor(Math.random() * 4) + 1,
          description: 'Water in dreams typically symbolizes emotions, the unconscious mind, or life changes.',
          lastSeen: new Date(Date.now() - 86400000),
          color: 'bg-teal-500',
        },
        {
          name: 'Chase Scenarios',
          frequency: Math.floor(Math.random() * 3) + 1,
          description: 'Being chased in dreams often reflects avoidance of something in waking life.',
          lastSeen: new Date(Date.now() - 172800000),
          color: 'bg-red-500',
        },
      ];
      
      setPatterns(mockPatterns);
    } catch (error) {
      console.error('Error analyzing patterns:', error);
      // In production, you might want to show a user-friendly error message
      // For now, we'll just log the error and continue
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderHomeView = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to DreamWeaver</h1>
        <p className="text-gray-300 max-w-md mx-auto">
          Unlock the meaning of your dreams with AI-powered interpretation and discover patterns in your subconscious mind.
        </p>
      </div>

      <WalletConnect />

      <DreamInputForm onSubmit={handleDreamSubmit} isLoading={isInterpreting} />

      {dreams.length > 0 && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Dreams</h2>
            <button
              onClick={() => setCurrentView('dreams')}
              className="text-accent hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {dreams.slice(0, 2).map((dream) => (
              <DreamListItem
                key={dream.dreamId}
                dream={dream}
                onClick={() => {
                  setSelectedDream(dream);
                  setCurrentView('dreams');
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 text-center">
          <Moon className="w-8 h-8 text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{dreams.length}</p>
          <p className="text-sm text-gray-300">Dreams Recorded</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Sparkles className="w-8 h-8 text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{dreams.filter(d => d.interpretation).length}</p>
          <p className="text-sm text-gray-300">Interpretations</p>
        </div>
      </div>
    </div>
  );

  const renderDreamsView = () => (
    <div className="space-y-6">
      {selectedDream ? (
        <div>
          <button
            onClick={() => setSelectedDream(null)}
            className="mb-4 text-accent hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            ← Back to Dreams
          </button>
          <InterpretationCard dream={selectedDream} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Your Dreams</h1>
              <p className="text-gray-300">Explore your dream journal</p>
            </div>
            <button
              onClick={() => setCurrentView('home')}
              className="btn-secondary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Dream</span>
            </button>
          </div>

          {dreams.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Moon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Dreams Yet</h3>
              <p className="text-gray-300 mb-4">Start by recording your first dream</p>
              <button
                onClick={() => setCurrentView('home')}
                className="btn-primary"
              >
                Record Dream
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {dreams.map((dream) => (
                <DreamListItem
                  key={dream.dreamId}
                  dream={dream}
                  onClick={() => setSelectedDream(dream)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderPatternsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dream Patterns</h1>
          <p className="text-gray-300">Discover recurring themes</p>
        </div>
        {dreams.length >= 2 && (
          <button
            onClick={handleAnalyzePatterns}
            disabled={isAnalyzing}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4" />
                <span>Analyze</span>
              </>
            )}
          </button>
        )}
      </div>

      {dreams.length < 2 ? (
        <div className="glass-card p-8 text-center">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Not Enough Data</h3>
          <p className="text-gray-300 mb-4">Record at least 2 dreams to discover patterns</p>
          <button
            onClick={() => setCurrentView('home')}
            className="btn-primary"
          >
            Record More Dreams
          </button>
        </div>
      ) : patterns.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Ready to Analyze</h3>
          <p className="text-gray-300 mb-4">Click &quot;Analyze&quot; to discover patterns in your dreams</p>
        </div>
      ) : (
        <div className="space-y-4">
          {patterns.map((pattern, index) => (
            <ThemeCard key={index} theme={pattern} />
          ))}
        </div>
      )}
    </div>
  );

  const renderSettingsView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-300">Manage your preferences</p>
      </div>

      <div className="space-y-4">
        <div className="glass-card p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Privacy Controls</h3>
          <p className="text-gray-300 text-sm mb-4">Your dreams are stored locally and encrypted</p>
          <div className="flex items-center justify-between">
            <span className="text-white">Local Storage</span>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>

        <div className="glass-card p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Data Export</h3>
          <p className="text-gray-300 text-sm mb-4">Export your dream journal</p>
          <button className="btn-secondary text-sm">
            Export Dreams
          </button>
        </div>

        <div className="glass-card p-4">
          <h3 className="text-lg font-semibold text-white mb-2">About</h3>
          <p className="text-gray-300 text-sm">
            DreamWeaver v1.0.0 - Built for Base MiniApps
          </p>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return renderHomeView();
      case 'dreams':
        return renderDreamsView();
      case 'patterns':
        return renderPatternsView();
      case 'settings':
        return renderSettingsView();
      default:
        return renderHomeView();
    }
  };

  return (
    <AppShell currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </AppShell>
  );
}
