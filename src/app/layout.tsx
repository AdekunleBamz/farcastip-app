"use client";

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { farcasterFrame } from '@farcaster/frame-wagmi-connector';
import { sdk } from '@farcaster/frame-sdk';
import { MONAD_TESTNET } from '../config/constants';
import { useEffect, useState } from 'react';

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
  // Add storage for persistence
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
});

// Frame metadata for sharing
const frameMetadata = {
  version: "next",
  imageUrl: "https://farcastipmini.vercel.app/og-image.png",
  button: {
    title: "Send MON Tip",
    action: {
      type: "launch_frame",
      url: 'https://farcastipmini.vercel.app',
      name: "FarcasTip",
      splashImageUrl: "https://farcastipmini.vercel.app/splash.png",
      splashBackgroundColor: "#4F46E5"
    }
  }
};

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
        <meta name="fc:frame" content={JSON.stringify(frameMetadata)} />
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
