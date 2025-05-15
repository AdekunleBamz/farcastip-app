"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useSendTransaction, useBalance, useNetwork, useSwitchNetwork } from 'wagmi';
import { MONAD_TESTNET } from '../config/constants';
import { resolveFarcasterUsername } from '../utils/farcaster';
import { parseEther, isAddress } from 'viem';

export function TipForm() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { data: balance } = useBalance({
    address,
    watch: true,
  });
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isResolvingUsername, setIsResolvingUsername] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Updated for wagmi v2
  const { sendTransaction, isPending } = useSendTransaction();

  const isCorrectNetwork = chain?.id === MONAD_TESTNET.id;

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
      const amountInWei = parseEther(amount);
      
      await sendTransaction({
        to: recipient as `0x${string}`,
        value: amountInWei
      });
    } catch (err) {
      console.error("Error sending tip:", err);
      setError(err instanceof Error ? err.message : "Failed to send tip");
    }
  };

  // Add wallet connection handler
  const handleConnect = () => {
    const connector = connectors[0]; // Using the first connector (Farcaster Frame)
    if (connector) {
      connect({ connector });
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center">
        <p className="mb-4">Connect your wallet to start sending MON tips</p>
        <button 
          onClick={handleConnect}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Network Warning Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              This app only works on Monad Testnet Network. MON tokens have no real value and are for testing purposes only.
            </p>
          </div>
        </div>
      </div>

      {/* Connection Status and Network Switch */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-sm text-gray-600">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
            {balance && (
              <span className="ml-4 text-sm text-gray-600">
                Balance: {Number(balance.formatted).toFixed(4)} {balance.symbol}
              </span>
            )}
          </div>
          <button 
            onClick={() => disconnect()}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Disconnect
          </button>
        </div>
        
        {!isCorrectNetwork && (
          <div className="mt-2">
            <button
              onClick={() => switchNetwork?.(MONAD_TESTNET.id)}
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors text-sm"
            >
              Switch to Monad Testnet
            </button>
          </div>
        )}
      </div>

      {/* Only show the form if on the correct network */}
      {isCorrectNetwork ? (
        <div className="space-y-4">
          {/* Rest of your existing form */}
          {/* Rest of the form */}
        </div>
      ) : (
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Please switch to Monad Testnet to continue</p>
        </div>
      )}
    </div>
  );
} 