import { Metadata } from 'next';
import './globals.css';
import Providers from './Providers';

// Define metadata for the app
export const metadata: Metadata = {
  title: 'FarcasTip - Send MON Tips on Monad',
  description: 'Easily tip Farcaster users with MON tokens on Monad testnet.',
  metadataBase: new URL('https://farcastipmini.vercel.app'),
  openGraph: {
    type: 'website',
    title: 'FarcasTip - Send MON Tips on Monad',
    description: 'Easily tip Farcaster users with MON tokens on Monad testnet.',
    url: 'https://farcastipmini.vercel.app',
    siteName: 'FarcasTip',
    images: [
      {
        url: 'https://farcastipmini.vercel.app/og-image.png', // Removed ?v=2
        width: 1200,
        height: 630,
        alt: 'FarcasTip Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FarcasTip - Send MON Tips on Monad',
    description: 'Easily tip Farcaster users with MON tokens on Monad testnet.',
    images: ['https://farcastipmini.vercel.app/og-image.png'], // Removed ?v=2
  },
  other: {
    'farcaster:app': 'true'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#4F46E5',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/icon.png', type: 'image/png' }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FarcasTip'
  },
  applicationName: 'FarcasTip',
  formatDetection: {
    telephone: false,
  }
};

const frameJson = {
  version: "next",
  imageUrl: "https://farcastipmini.vercel.app/og-image.png",
  button: {
    title: "Send MON Tip",
    action: {
      type: "launch_frame",
      name: "FarcasTip",
      url: "https://farcastipmini.vercel.app/",
      splashImageUrl: "https://farcastipmini.vercel.app/icon.png",
      splashBackgroundColor: "#4F46E5"
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gradient-to-br from-indigo-50 to-blue-50">
      <head>
        <meta
          name="fc:frame"
          content={JSON.stringify(frameJson)}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="manifest" href="/manifest.json" />
        {/* You can keep other meta tags here if needed */}
      </head>
      <body className="min-h-screen font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <Providers>
            <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
              {children}
            </main>
          </Providers>
        </div>
      </body>
    </html>
  );
}