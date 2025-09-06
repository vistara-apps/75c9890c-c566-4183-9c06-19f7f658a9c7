'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { DreamInputForm } from '@/components/DreamInputForm';
import { DreamListItem } from '@/components/DreamListItem';
import { InterpretationCard } from '@/components/InterpretationCard';
import { ThemeCard } from '@/components/ThemeCard';
import { WalletConnect } from '@/components/WalletConnect';
import { 
  DreamInterpretationLoading, 
  PatternAnalysisLoading, 
  DreamListLoading,
  EmptyStateWithLoading 
} from '@/components/LoadingStates';
import { ErrorBoundary, InlineError, useErrorHandler } from '@/components/ErrorBoundary';
import { ToastProvider, useToastActions } from '@/components/Toast';
import { interpretDream, analyzePatterns } from '@/lib/openai';
import { saveDream, getDreams, generateId } from '@/lib/utils';
import { Moon, Brain, TrendingUp, Sparkles, Plus } from 'lucide-react';

type ViewType = 'home' | 'dreams' | 'patterns' | 'settings';

function DreamWeaverAppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [dreams, setDreams] = useState<any[]>([]);
  const [selectedDream, setSelectedDream] = useState<any>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [patterns, setPatterns] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { error, handleError, clearError } = useErrorHandler();
  const toastActions = useToastActions();

  useEffect(() => {
    // Load dreams from localStorage on component mount
    const loadDreams = async () => {
      try {
        setIsLoading(true);
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        const storedDreams = getDreams();
        setDreams(storedDreams);
      } catch (err) {
        handleError(err instanceof Error ? err : new Error('Failed to load dreams'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDreams();
  }, [handleError]);

  const handleDreamSubmit = async (description: string, moodTags: string[]) => {
    setIsInterpreting(true);
    clearError();
    
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
      
      toastActions.dreamInterpreted();
    } catch (error) {
      console.error('Error interpreting dream:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to interpret dream';
      handleError(new Error(errorMessage));
      toastActions.apiError(errorMessage);
    } finally {
      setIsInterpreting(false);
    }
  };

  const handleAnalyzePatterns = async () => {
    if (dreams.length < 2) return;
    
    setIsAnalyzing(true);
    clearError();
    toastActions.analysisStarted();
    
    try {
      await analyzePatterns(dreams);
      
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
      toastActions.patternsAnalyzed(mockPatterns.length);
    } catch (error) {
      console.error('Error analyzing patterns:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze patterns';
      handleError(new Error(errorMessage));
      toastActions.apiError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderHomeView = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
              <Brain className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to DreamWeaver</h1>
            <p className="text-gray-300 max-w-md mx-auto">
              Loading your dream experience...
            </p>
          </div>
          <DreamListLoading count={2} />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {error && (
          <InlineError 
            error={error} 
            onRetry={() => {
              clearError();
              window.location.reload();
            }}
          />
        )}
        
        <div className="text-center py-8 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-display gradient-text mb-2">Welcome to DreamWeaver</h1>
          <p className="text-body text-gray-300 max-w-md mx-auto">
            Unlock the meaning of your dreams with AI-powered interpretation and discover patterns in your subconscious mind.
          </p>
        </div>

        <WalletConnect />

        {isInterpreting ? (
          <DreamInterpretationLoading />
        ) : (
          <DreamInputForm onSubmit={handleDreamSubmit} isLoading={isInterpreting} />
        )}

        {dreams.length > 0 && (
          <div className="glass-card p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-subheading text-white">Recent Dreams</h2>
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

        <div className="grid grid-cols-2 gap-4 animate-slide-up">
          <div className="glass-card-interactive p-4 text-center">
            <Moon className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{dreams.length}</p>
            <p className="text-caption">Dreams Recorded</p>
          </div>
          <div className="glass-card-interactive p-4 text-center">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{dreams.filter(d => d.interpretation).length}</p>
            <p className="text-caption">Interpretations</p>
          </div>
        </div>
      </div>
    );
  };

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
      {error && (
        <InlineError 
          error={error} 
          onRetry={() => {
            clearError();
            handleAnalyzePatterns();
          }}
        />
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading text-white">Dream Patterns</h1>
          <p className="text-body text-gray-300">Discover recurring themes</p>
        </div>
        {dreams.length >= 2 && !isAnalyzing && (
          <button
            onClick={handleAnalyzePatterns}
            disabled={isAnalyzing}
            className="btn-primary flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Analyze</span>
          </button>
        )}
      </div>

      {isAnalyzing ? (
        <PatternAnalysisLoading />
      ) : dreams.length < 2 ? (
        <EmptyStateWithLoading
          isLoading={false}
          icon={TrendingUp}
          title="Not Enough Data"
          description="Record at least 2 dreams to discover patterns"
          action={
            <button
              onClick={() => setCurrentView('home')}
              className="btn-primary"
            >
              Record More Dreams
            </button>
          }
        />
      ) : patterns.length === 0 ? (
        <EmptyStateWithLoading
          isLoading={false}
          icon={Brain}
          title="Ready to Analyze"
          description="Click 'Analyze' to discover patterns in your dreams"
        />
      ) : (
        <div className="space-y-4 animate-fade-in">
          {patterns.map((pattern, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ThemeCard theme={pattern} />
            </div>
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

// Main App Component with Providers
export default function DreamWeaverApp() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <DreamWeaverAppContent />
      </ToastProvider>
    </ErrorBoundary>
  );
}
