'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useEffect } from 'react';

export function WalletConnect() {
  const { setFrameReady } = useMiniKit();
  
  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  return (
    <div className="glass-card p-4">
      <Wallet>
        <ConnectWallet className="btn-primary">
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
      </Wallet>
    </div>
  );
}
