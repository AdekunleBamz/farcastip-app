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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Send MON test tokens as tips on Monad testnet" />
        
        {/* Essential OpenGraph tags for Warpcast embed */}
        <meta property="og:url" content="https://farcastipmini.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FarcasTip - Send MON Tips on Monad" />
        <meta property="og:description" content="Send MON test tokens as tips on Monad testnet. Connect your wallet and start tipping!" />
        <meta property="og:image" content="https://farcastipmini.vercel.app/splash.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="FarcasTip" />
        
        {/* Twitter Card tags for better social sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FarcasTip - Send MON Tips on Monad" />
        <meta name="twitter:description" content="Send MON test tokens as tips on Monad testnet. Connect your wallet and start tipping!" />
        <meta name="twitter:image" content="https://farcastipmini.vercel.app/splash.png" />
        
        {/* Farcaster Frame tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://farcastipmini.vercel.app/og-image.png" />
        <meta property="fc:frame:button:1" content="Send MON Tip" />
        <meta property="fc:frame:post_url" content="https://farcastipmini.vercel.app/api/frame" />
        
        <link rel="icon" href="/icon.png" />
        <link rel="canonical" href="https://farcastipmini.vercel.app" />
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
