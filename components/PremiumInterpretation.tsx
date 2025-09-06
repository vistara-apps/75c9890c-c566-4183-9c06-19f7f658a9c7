'use client';

import { useState } from 'react';
import { PaymentButton } from './PaymentButton';
import { PAYMENT_AMOUNTS } from '@/lib/payments';
import { interpretDream } from '@/lib/openai';
import { Sparkles, Crown, Lock } from 'lucide-react';

interface PremiumInterpretationProps {
  dreamDescription: string;
  moodTags: string[];
  onInterpretationComplete?: (interpretation: string, transactionHash: string) => void;
}

export function PremiumInterpretation({
  dreamDescription,
  moodTags,
  onInterpretationComplete,
}: PremiumInterpretationProps) {
  const [interpretation, setInterpretation] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  const handlePaymentSuccess = async (transactionHash: string) => {
    setHasAccess(true);
    setIsGenerating(true);

    try {
      // Generate premium interpretation with enhanced prompts
      const premiumInterpretation = await interpretDream(
        dreamDescription, 
        moodTags, 
        true // Premium flag for enhanced analysis
      );
      
      setInterpretation(premiumInterpretation);
      onInterpretationComplete?.(premiumInterpretation, transactionHash);
    } catch (error) {
      console.error('Error generating premium interpretation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
  };

  if (hasAccess) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-800">Premium Interpretation</h3>
          <Sparkles className="w-4 h-4 text-purple-600" />
        </div>
        
        {isGenerating ? (
          <div className="flex items-center gap-3 text-purple-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
            <span>Generating your premium interpretation...</span>
          </div>
        ) : interpretation ? (
          <div className="prose prose-purple max-w-none">
            <div className="bg-white p-4 rounded-lg border border-purple-100">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {interpretation}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-purple-50 p-6 rounded-xl border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-800">Premium Interpretation</h3>
        <Crown className="w-4 h-4 text-purple-600" />
      </div>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-slate-100">
          <h4 className="font-medium text-slate-800 mb-2">Unlock Premium Features:</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Deeper psychological analysis</li>
            <li>• Symbolic meaning exploration</li>
            <li>• Personal growth insights</li>
            <li>• Connection to life patterns</li>
            <li>• Actionable recommendations</li>
          </ul>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <p>Get enhanced AI-powered dream analysis</p>
            <p className="font-medium">One-time payment • Instant access</p>
          </div>
          
          <PaymentButton
            amount={PAYMENT_AMOUNTS.PREMIUM_INTERPRETATION}
            description="Premium Dream Interpretation"
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            metadata={{
              dreamId: `dream_${Date.now()}`,
              feature: 'premium_interpretation',
              dreamLength: dreamDescription.length,
              moodTags: moodTags.join(','),
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Crown className="w-4 h-4" />
            Unlock Premium Analysis
          </PaymentButton>
        </div>
      </div>
    </div>
  );
}
