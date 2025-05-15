"use client";

import { useState, useEffect } from "react";
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useSendTransaction, 
  useBalance,
  useChainId,
  useSwitchChain,
  useWaitForTransactionReceipt
} from 'wagmi';
import { MONAD_TESTNET } from '../config/constants';
import { resolveFarcasterUsername } from '../utils/farcaster';
import { parseEther, isAddress } from 'viem';

export function TipForm() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { data: balance } = useBalance({
    address,
    query: {
      refetchInterval: 5000, // Refetch every 5 seconds
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isResolvingUsername, setIsResolvingUsername] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Updated for wagmi v2
  const { sendTransaction, isPending, data: hash } = useSendTransaction();
  
  // Add transaction receipt watcher
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const isCorrectNetwork = chainId === MONAD_TESTNET.id;

  const handleRecipientChange = async (value: string) => {
    setRecipient(value);
    setError(null);

    if (value.startsWith('@')) {
      setIsResolvingUsername(true);
      try {
        const resolvedAddress = await resolveFarcasterUsername(value.slice(1));
        if (resolvedAddress && isAddress(resolvedAddress)) {
          setRecipient(resolvedAddress);
        } else {
          setError("Could not resolve Farcaster username to a valid address");
        }
      } catch (err) {
        console.error("Error resolving username:", err);
        setError("Error resolving Farcaster username");
      } finally {
        setIsResolvingUsername(false);
      }
    } else if (value && !isAddress(value)) {
      setError("Please enter a valid Ethereum address");
    }
  };

  // Reset form and show success message
  const resetForm = () => {
    setRecipient("");
    setAmount("");
    setError(null);
    setTransactionStatus('idle');
    setTransactionHash(null);
    setSuccessMessage(null);
  };

  // Handle transaction status changes
  useEffect(() => {
    if (hash) {
      setTransactionHash(hash);
      setTransactionStatus('pending');
    }
  }, [hash]);

  useEffect(() => {
    if (isConfirmed) {
      setTransactionStatus('success');
      setSuccessMessage(`Tip sent successfully! Transaction hash: ${transactionHash?.slice(0, 6)}...${transactionHash?.slice(-4)}`);
      // Reset form after 3 seconds
      setTimeout(() => {
        resetForm();
        setIsModalOpen(false);
      }, 3000);
    }
  }, [isConfirmed, transactionHash]);

  const handleSendTip = async () => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return;
    }

    if (!recipient || !amount) {
      setError("Please fill in all fields");
      return;
    }

    if (!isAddress(recipient)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    try {
      setTransactionStatus('pending');
      setError(null);
      const amountInWei = parseEther(amount);
      
      await sendTransaction({
        to: recipient as `0x${string}`,
        value: amountInWei
      });
    } catch (err) {
      console.error("Error sending tip:", err);
      setError(err instanceof Error ? err.message : "Failed to send tip");
      setTransactionStatus('error');
      // Reset form after 3 seconds on error
      setTimeout(resetForm, 3000);
    }
  };

  // Add wallet connection handler
  const handleConnect = () => {
    const connector = connectors[0]; // Using the first connector (Farcaster Frame)
    if (connector) {
      connect({ connector });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setError(null);
    setRecipient("");
    setAmount("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null);
    setRecipient("");
    setAmount("");
  };

  if (!isConnected) {
    return (
      <div className="space-y-6">
        {/* App Description */}
        <div className="card text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to FarcasTip</h1>
          <p className="text-lg text-gray-600 mb-6">
            FarcasTip is a simple way to send MON tokens on Monad Testnet. Connect your wallet, enter a Farcaster username or address, and send tips instantly. MON tokens are for testing purposes only.
          </p>
          <button 
            onClick={handleConnect}
            className="btn-primary text-lg px-8 py-3"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Network Info Banner */}
      <div className="glass rounded-xl p-4 border-l-4 border-blue-400">
        <div className="flex items-start">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Monad Testnet</h3>
            <p className="text-sm text-blue-700 mt-1">
              You're connected to Monad Testnet. Ready to send MON tips!
            </p>
          </div>
        </div>
      </div>

      {/* Connection Status and Network Switch */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">Connected:</span>
              <span className="text-sm text-gray-600 font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
            </div>
            {balance && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">Balance:</span>
                <span className="text-sm text-gray-600 font-mono">
                  {Number(balance.formatted).toFixed(4)} {balance.symbol}
                </span>
              </div>
            )}
          </div>
          <button 
            onClick={() => disconnect()}
            className="btn-secondary text-sm"
          >
            Disconnect
          </button>
        </div>
        
        {!isCorrectNetwork && (
          <div className="mt-4">
            <button
              onClick={() => switchChain({ chainId: MONAD_TESTNET.id })}
              className="btn-primary w-full"
            >
              Switch to Monad Testnet
            </button>
          </div>
        )}
      </div>

      {/* Tip Button */}
      {isCorrectNetwork && (
        <div className="text-center">
          <button
            onClick={handleOpenModal}
            className="btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            Send MON Tip
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Send MON Tip</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500 transition-colors"
                disabled={transactionStatus === 'pending'}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => handleRecipientChange(e.target.value)}
                  placeholder="@username or 0x..."
                  className="input-primary"
                  disabled={transactionStatus === 'pending'}
                />
                {isResolvingUsername && (
                  <p className="mt-2 text-sm text-gray-500 flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Resolving username...
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (MON)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  step="0.0001"
                  min="0"
                  className="input-primary"
                  disabled={transactionStatus === 'pending'}
                />
              </div>

              {/* Transaction Status Messages */}
              {transactionStatus === 'pending' && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-600 flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {isConfirming ? 'Confirming transaction...' : 'Sending transaction...'}
                  </p>
                </div>
              )}

              {transactionStatus === 'success' && successMessage && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600">{successMessage}</p>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="btn-secondary"
                  disabled={transactionStatus === 'pending'}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendTip}
                  disabled={isPending || !recipient || !amount || transactionStatus === 'pending'}
                  className="btn-primary"
                >
                  {transactionStatus === 'pending' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {isConfirming ? 'Confirming...' : 'Sending...'}
                    </span>
                  ) : (
                    'Send Tip'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 