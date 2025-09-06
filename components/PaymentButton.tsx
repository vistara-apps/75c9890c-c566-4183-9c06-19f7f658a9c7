'use client';

import { useState } from 'react';
import { useWalletClient } from 'wagmi';
import { CreditCard, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { 
  processPayment, 
  checkBalance, 
  formatUSDC, 
  getPaymentRecipient,
  type PaymentRequest 
} from '@/lib/payments';

interface PaymentButtonProps {
  amount: number;
  description: string;
  onSuccess?: (transactionHash: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  metadata?: Record<string, any>;
}

export function PaymentButton({
  amount,
  description,
  onSuccess,
  onError,
  disabled = false,
  className = '',
  children,
  metadata = {},
}: PaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const { data: walletClient } = useWalletClient();

  const handlePayment = async () => {
    if (!walletClient) {
      const error = 'Please connect your wallet first';
      setErrorMessage(error);
      setPaymentStatus('error');
      onError?.(error);
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('idle');
    setErrorMessage('');

    try {
      // Check balance first
      const { hasBalance, currentBalance } = await checkBalance(walletClient, amount);
      
      if (!hasBalance) {
        const error = `Insufficient USDC balance. Required: $${formatUSDC(amount)}, Available: $${formatUSDC(currentBalance)}`;
        setErrorMessage(error);
        setPaymentStatus('error');
        onError?.(error);
        return;
      }

      // Process payment
      const paymentRequest: PaymentRequest = {
        amount,
        recipient: getPaymentRecipient(),
        description,
        metadata: {
          timestamp: new Date().toISOString(),
          ...metadata,
        },
      };

      const result = await processPayment(walletClient, paymentRequest);

      if (result.success && result.transactionHash) {
        setPaymentStatus('success');
        onSuccess?.(result.transactionHash);
      } else {
        const error = result.error || 'Payment failed';
        setErrorMessage(error);
        setPaymentStatus('error');
        onError?.(error);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrorMessage(errorMsg);
      setPaymentStatus('error');
      onError?.(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const getButtonContent = () => {
    if (isProcessing) {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing...
        </>
      );
    }

    if (paymentStatus === 'success') {
      return (
        <>
          <CheckCircle className="w-4 h-4" />
          Payment Successful
        </>
      );
    }

    if (paymentStatus === 'error') {
      return (
        <>
          <XCircle className="w-4 h-4" />
          Payment Failed
        </>
      );
    }

    return (
      <>
        <CreditCard className="w-4 h-4" />
        {children || `Pay $${formatUSDC(amount)} USDC`}
      </>
    );
  };

  const getButtonStyles = () => {
    const baseStyles = `
      flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    if (paymentStatus === 'success') {
      return `${baseStyles} bg-green-600 text-white`;
    }

    if (paymentStatus === 'error') {
      return `${baseStyles} bg-red-600 text-white`;
    }

    return `${baseStyles} bg-blue-600 hover:bg-blue-700 text-white ${className}`;
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handlePayment}
        disabled={disabled || isProcessing || paymentStatus === 'success'}
        className={getButtonStyles()}
      >
        {getButtonContent()}
      </button>
      
      {errorMessage && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {errorMessage}
        </p>
      )}
      
      {paymentStatus === 'success' && (
        <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
          Payment completed successfully! 🎉
        </p>
      )}
    </div>
  );
}
