import { X402Client } from 'x402-axios';
import { useWalletClient } from 'wagmi';
import { base } from 'wagmi/chains';

// USDC contract address on Base
export const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// Payment amounts in USDC (6 decimals)
export const PAYMENT_AMOUNTS = {
  PREMIUM_INTERPRETATION: 100000, // 0.1 USDC
  PATTERN_ANALYSIS: 250000, // 0.25 USDC
  DREAM_EXPORT: 50000, // 0.05 USDC
} as const;

export interface PaymentRequest {
  amount: number;
  recipient: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

/**
 * Initialize X402 client with wallet client
 */
export function createX402Client(walletClient: any) {
  return new X402Client({
    walletClient,
    chain: base,
    tokenAddress: USDC_CONTRACT_ADDRESS,
  });
}

/**
 * Process a payment using X402
 */
export async function processPayment(
  walletClient: any,
  paymentRequest: PaymentRequest
): Promise<PaymentResult> {
  try {
    if (!walletClient) {
      throw new Error('Wallet not connected');
    }

    const x402Client = createX402Client(walletClient);
    
    const transaction = await x402Client.pay({
      to: paymentRequest.recipient,
      amount: paymentRequest.amount,
      metadata: {
        description: paymentRequest.description,
        ...paymentRequest.metadata,
      },
    });

    // Wait for transaction confirmation
    const receipt = await x402Client.waitForTransaction(transaction.hash);
    
    if (receipt.status === 'success') {
      return {
        success: true,
        transactionHash: transaction.hash,
      };
    } else {
      return {
        success: false,
        error: 'Transaction failed',
      };
    }
  } catch (error) {
    console.error('Payment error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown payment error',
    };
  }
}

/**
 * Check if user has sufficient USDC balance
 */
export async function checkBalance(
  walletClient: any,
  requiredAmount: number
): Promise<{ hasBalance: boolean; currentBalance: number }> {
  try {
    if (!walletClient) {
      return { hasBalance: false, currentBalance: 0 };
    }

    const x402Client = createX402Client(walletClient);
    const balance = await x402Client.getBalance();
    
    return {
      hasBalance: balance >= requiredAmount,
      currentBalance: balance,
    };
  } catch (error) {
    console.error('Balance check error:', error);
    return { hasBalance: false, currentBalance: 0 };
  }
}

/**
 * Format USDC amount for display (convert from 6 decimals)
 */
export function formatUSDC(amount: number): string {
  return (amount / 1000000).toFixed(2);
}

/**
 * Get payment recipient address (in a real app, this would be configurable)
 */
export function getPaymentRecipient(): string {
  return process.env.NEXT_PUBLIC_PAYMENT_RECIPIENT || '0x742d35Cc6634C0532925a3b8D0C9e3e0C0e0e0e0';
}
