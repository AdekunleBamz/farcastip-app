import { TipForm } from '../components/TipForm';
import { Metadata } from 'next';

// Define metadata for the page
export const metadata: Metadata = {
  title: 'FarcasTip - Send MON Tips on Monad',
  description: 'A simple and secure way to tip your favorite Farcaster users with MON tokens on Monad testnet.',
  openGraph: {
    title: 'FarcasTip - Send MON Tips on Monad',
    description: 'A simple and secure way to tip your favorite Farcaster users with MON tokens on Monad testnet.',
    images: [
      {
        url: 'https://farcastipmini.vercel.app/og-image.png',
        width: 3750,
        height: 1969,
        alt: 'FarcasTip Preview',
      },
    ],
    url: 'https://farcastipmini.vercel.app',
    type: 'website',
    siteName: 'FarcasTip',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FarcasTip - Send MON Tips on Monad',
    description: 'A simple and secure way to tip your favorite Farcaster users with MON tokens on Monad testnet.',
    images: ['https://farcastipmini.vercel.app/og-image.png'],
  },
  metadataBase: new URL('https://farcastipmini.vercel.app'),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Send <span className="text-blue-600">MON</span> Tips on Monad
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A simple and secure way to tip your favorite Farcaster users with MON tokens on Monad testnet.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Tip Form Card */}
          <div className="glass rounded-2xl shadow-xl p-6 md:p-8 transform transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send a Tip</h2>
            <TipForm />
          </div>

          {/* Info Card */}
          <div className="glass rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">How it Works</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Connect Your Wallet</h3>
                  <p className="mt-1 text-gray-600">Connect your Monad wallet to get started with sending tips.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Enter Recipient</h3>
                  <p className="mt-1 text-gray-600">Enter the Farcaster username or address of the person you want to tip.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Send MON</h3>
                  <p className="mt-1 text-gray-600">Enter the amount of MON tokens you want to send and confirm the transaction.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Built with ❤️ for the Farcaster community</p>
            <p className="mt-2 text-sm">Powered by Monad Testnet</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
