"use client";

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { farcasterFrame } from '@farcaster/frame-wagmi-connector';
import { sdk } from '@farcaster/frame-sdk';
import { MONAD_TESTNET } from '../config/constants';
import { useEffect } from 'react';

// Create a client
const queryClient = new QueryClient();

// Configure wagmi with Farcaster Frame connector
const config = createConfig({
  chains: [MONAD_TESTNET],
  connectors: [
    farcasterFrame({
      appName: 'FarcasTip',
      appIcon: 'https://farcastip.vercel.app/icon.png',
      appUrl: 'https://farcastip.vercel.app',
    })
  ],
  transports: {
    [MONAD_TESTNET.id]: http()
  }
});

// Frame metadata for sharing
const frameMetadata = {
  version: "next",
  imageUrl: "/og-image.png",
  button: {
    title: "Send MON Tip",
    action: {
      type: "launch_frame",
      url: 'https://farcastip.vercel.app',
      name: "FarcasTip",
      splashImageUrl: "/splash.png",
      splashBackgroundColor: "#4F46E5"
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Initialize Farcaster SDK and hide splash screen when ready
  useEffect(() => {
    sdk.actions.ready({ disableNativeGestures: true });
  }, []);

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
