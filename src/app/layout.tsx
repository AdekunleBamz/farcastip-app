"use client";

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { farcasterFrame } from '@farcaster/frame-wagmi-connector';
import { sdk } from '@farcaster/frame-sdk';
import { MONAD_TESTNET } from '../config/constants';
import { useEffect, useState } from 'react';
import { createStorage } from 'wagmi';

// Create a client with longer persistence
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: 3,
      retryDelay: 1000,
    },
  },
});

// Configure wagmi with Farcaster Frame connector and enhanced persistence
const config = createConfig({
  chains: [MONAD_TESTNET],
  connectors: [
    farcasterFrame()
  ],
  transports: {
    [MONAD_TESTNET.id]: http()
  },
  storage: createStorage({ 
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    key: 'farcastip-wagmi-cache'
  })
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Initialize Farcaster SDK and handle connection persistence
  useEffect(() => {
    const init = async () => {
      try {
        // Initialize SDK with persistence options
        await sdk.actions.ready({ 
          disableNativeGestures: true,
          onError: (error) => {
            console.error('Farcaster SDK error:', error);
          }
        });

        // Attempt to restore any existing connection
        if (typeof window !== 'undefined') {
          const storedConnection = localStorage.getItem('farcastip-wagmi-cache');
          if (storedConnection) {
            try {
              // Trigger a reconnection if we have stored data
              await sdk.actions.connect();
            } catch (error) {
              console.error('Failed to restore connection:', error);
            }
          }
        }

        setMounted(true);
      } catch (error) {
        console.error('Failed to initialize Farcaster SDK:', error);
        setMounted(true); // Still set mounted to true to show the app
      }
    };
    init();
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
        
        {/* Simplified meta tags for better embed detection */}
        <meta property="og:title" content="FarcasTip" />
        <meta property="og:description" content="Send MON tips on Monad testnet" />
        <meta property="og:image" content="https://farcastipmini.vercel.app/splash.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://farcastipmini.vercel.app" />
        
        {/* Frame tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://farcastipmini.vercel.app/splash.png" />
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
