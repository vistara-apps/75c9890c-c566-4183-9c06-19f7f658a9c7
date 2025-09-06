'use client';

import { useState } from 'react';
import { PaymentButton } from './PaymentButton';
import { PAYMENT_AMOUNTS } from '@/lib/payments';
import { analyzePatterns } from '@/lib/openai';
import { TrendingUp, Crown, Lock, BarChart3 } from 'lucide-react';

interface PremiumPatternAnalysisProps {
  dreams: any[];
  onAnalysisComplete?: (analysis: string, transactionHash: string) => void;
}

export function PremiumPatternAnalysis({
  dreams,
  onAnalysisComplete,
}: PremiumPatternAnalysisProps) {
  const [analysis, setAnalysis] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  const handlePaymentSuccess = async (transactionHash: string) => {
    setHasAccess(true);
    setIsGenerating(true);

    try {
      // Generate premium pattern analysis
      const premiumAnalysis = await analyzePatterns(dreams);
      
      setAnalysis(premiumAnalysis);
      onAnalysisComplete?.(premiumAnalysis, transactionHash);
    } catch (error) {
      console.error('Error generating premium pattern analysis:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
  };

  if (dreams.length < 2) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-800">Premium Pattern Analysis</h3>
          <BarChart3 className="w-4 h-4 text-blue-600" />
        </div>
        
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">Record at least 2 dreams to unlock pattern analysis</p>
          <p className="text-sm text-slate-500">Discover recurring themes and insights across your dreams</p>
        </div>
      </div>
    );
  }

  if (hasAccess) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800">Premium Pattern Analysis</h3>
          <BarChart3 className="w-4 h-4 text-blue-600" />
        </div>
        
        {isGenerating ? (
          <div className="flex items-center gap-3 text-blue-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span>Analyzing patterns across your {dreams.length} dreams...</span>
          </div>
        ) : analysis ? (
          <div className="prose prose-blue max-w-none">
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {analysis}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-800">Premium Pattern Analysis</h3>
        <Crown className="w-4 h-4 text-blue-600" />
      </div>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-slate-100">
          <h4 className="font-medium text-slate-800 mb-2">Discover Hidden Patterns:</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Recurring symbols and themes</li>
            <li>• Emotional pattern recognition</li>
            <li>• Subconscious trend analysis</li>
            <li>• Personal growth indicators</li>
            <li>• Life cycle connections</li>
          </ul>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <p>Analyze patterns across {dreams.length} dreams</p>
            <p className="font-medium">Unlock deep insights • One-time payment</p>
          </div>
          
          <PaymentButton
            amount={PAYMENT_AMOUNTS.PATTERN_ANALYSIS}
            description="Premium Pattern Analysis"
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            metadata={{
              feature: 'pattern_analysis',
              dreamCount: dreams.length,
              analysisDate: new Date().toISOString(),
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <BarChart3 className="w-4 h-4" />
            Analyze Patterns
          </PaymentButton>
        </div>
      </div>
    </div>
  );
}
