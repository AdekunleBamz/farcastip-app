"use client";

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { farcasterFrame } from '@farcaster/frame-wagmi-connector';
import { sdk } from '@farcaster/frame-sdk';
import { MONAD_TESTNET } from '../config/constants';
import { useEffect, useState } from 'react';
import { createStorage } from 'wagmi';

// Create a client with persistence
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
    },
  },
});

// Configure wagmi with Farcaster Frame connector and persistence
const config = createConfig({
  chains: [MONAD_TESTNET],
  connectors: [
    farcasterFrame()
  ],
  transports: {
    [MONAD_TESTNET.id]: http()
  },
  // Add storage for persistence using wagmi's createStorage
  storage: createStorage({ storage: typeof window !== 'undefined' ? window.localStorage : undefined })
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Initialize Farcaster SDK and hide splash screen when ready
  useEffect(() => {
    // Call ready as soon as possible while avoiding jitter
    sdk.actions.ready({ disableNativeGestures: true });
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <html lang="en">
      <head>
        <title>FarcasTip App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Send MON test tokens as tips on Monad testnet" />
        
        {/* Essential OpenGraph tags */}
        <meta property="og:title" content="FarcasTip" />
        <meta property="og:description" content="Send MON test tokens as tips on Monad testnet" />
        <meta property="og:image" content="https://farcastipmini.vercel.app/og-image.png" />
        <meta property="og:type" content="website" />
        
        {/* Essential Farcaster Frame tags - using minimal required set */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://farcastipmini.vercel.app/og-image.png" />
        <meta property="fc:frame:button:1" content="Send MON Tip" />
        <meta property="fc:frame:post_url" content="https://farcastipmini.vercel.app/api/frame" />
        
        <link rel="icon" href="/icon.png" />
      </head>
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
