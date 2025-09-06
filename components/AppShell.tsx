'use client';

import { ReactNode } from 'react';
import { Brain, Moon, Settings2, TrendingUp } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  currentView: 'home' | 'dreams' | 'patterns' | 'settings';
  onViewChange: (view: 'home' | 'dreams' | 'patterns' | 'settings') => void;
}

export function AppShell({ children, currentView, onViewChange }: AppShellProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Brain },
    { id: 'dreams', label: 'Dreams', icon: Moon },
    { id: 'patterns', label: 'Patterns', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings2 },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="glass-card m-4 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DreamWeaver</h1>
              <p className="text-sm text-gray-300">Unlock your dreams</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card m-4 rounded-lg">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
