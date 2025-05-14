import { defineChain } from 'viem';

export const MONAD_TESTNET = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.monad.xyz'],
    },
    public: {
      http: ['https://testnet-rpc.monad.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://testnet.monadexplorer.com',
    },
  },
});

// Farcaster API endpoints
export const FARCASTER_API = {
  BASE_URL: 'https://api.farcaster.xyz/v2',
  USERNAME_RESOLUTION: '/user-by-username'
};

// App metadata
export const APP_METADATA = {
  name: 'FarcasTip',
  description: 'Send MON test tokens as tips on Monad testnet',
  url: 'https://farcastip.vercel.app', // We'll update this after deployment
  icons: ['https://farcastip.vercel.app/icon.png']
}; 