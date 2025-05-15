"use client";

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { farcasterFrame } from '@farcaster/frame-wagmi-connector';
import { sdk } from '@farcaster/frame-sdk';
import { MONAD_TESTNET } from '../config/constants';
import { useEffect, useState } from 'react';
import { createStorage } from 'wagmi';
import './globals.css';

// Create a client with longer persistence
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: 3,
      retryDelay: 1000,
      refetchOnWindowFocus: true, // Refetch when window regains focus
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
        // Initialize SDK with basic options
        await sdk.actions.ready({ 
          disableNativeGestures: true
        });

        // Check for stored connection data
        if (typeof window !== 'undefined') {
          try {
            const storedConnection = localStorage.getItem('farcastip-wagmi-cache');
            if (storedConnection) {
              console.log('Found stored connection data');
            }
          } catch (storageError) {
            console.error('Storage access failed:', storageError);
            localStorage.removeItem('farcastip-wagmi-cache');
          }
        }

        setMounted(true);
      } catch (error) {
        console.error('Farcaster SDK initialization failed:', error);
        setMounted(true);
      }
    };

    init().catch(error => {
      console.error('Unexpected error during initialization:', error);
      setMounted(true);
    });
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <html lang="en" className="h-full bg-gradient-to-br from-indigo-50 to-blue-50">
      <head>
        <title>FarcasTip - Send MON Tips on Monad Testnet</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Enhanced meta tags for better embed detection */}
        <meta name="description" content="Send MON tips on Monad testnet. A simple and secure way to tip your favorite Farcaster users with MON tokens." />
        
        {/* Updated OpenGraph tags */}
        <meta property="og:url" content="https://farcastipmini.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FarcasTip - Send MON Tips" />
        <meta property="og:description" content="Send MON tips on Monad testnet. A simple and secure way to tip your favorite Farcaster users with MON tokens." />
        <meta property="og:image" content="https://farcastipmini.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="FarcasTip" />
        
        {/* Updated Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@farcastip" />
        <meta name="twitter:title" content="FarcasTip - Send MON Tips" />
        <meta name="twitter:description" content="Send MON tips on Monad testnet. A simple and secure way to tip your favorite Farcaster users with MON tokens." />
        <meta name="twitter:image" content="https://farcastipmini.vercel.app/og-image.png" />
        
        {/* Updated Farcaster Frame tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FarcasTip - Send MON Tips" />
        <meta property="og:description" content="Send MON tips on Monad testnet. A simple and secure way to tip your favorite Farcaster users with MON tokens." />
        <meta property="og:image" content="https://farcastipmini.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="FarcasTip" />
        <meta property="og:url" content="https://farcastipmini.vercel.app" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@farcastip" />
        <meta name="twitter:title" content="FarcasTip - Send MON Tips" />
        <meta name="twitter:description" content="Send MON tips on Monad testnet. A simple and secure way to tip your favorite Farcaster users with MON tokens." />
        <meta name="twitter:image" content="https://farcastipmini.vercel.app/og-image.png" />
        
        {/* Farcaster Frame tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://farcastipmini.vercel.app/og-image.png" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="Send MON Tip" />
        <meta property="fc:frame:button:1:action" content="post_redirect" />
        <meta property="fc:frame:post_url" content="https://farcastipmini.vercel.app/api/frame" />
        <meta property="fc:frame:input:text" content="Enter Farcaster username or address" />
        <meta property="fc:frame:state" content="{}" />
        
        {/* Additional meta tags */}
        <meta name="theme-color" content="#4F46E5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        <link rel="icon" href="/icon.png" />
        <link rel="canonical" href="https://farcastipmini.vercel.app" />
        
        {/* Add Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
                {children}
              </main>
            </QueryClientProvider>
          </WagmiProvider>
        </div>
      </body>
    </html>
  );
}
