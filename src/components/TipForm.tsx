"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useSendTransaction } from 'wagmi';
import { MONAD_TESTNET } from '../config/constants';
import { resolveFarcasterUsername } from '../utils/farcaster';
import { parseEther, isAddress } from 'viem';

export function TipForm() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isResolvingUsername, setIsResolvingUsername] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Updated for wagmi v2
  const { sendTransaction, isPending } = useSendTransaction();

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
    <div>
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
        <button 
          onClick={() => disconnect()}
          className="text-sm text-red-500 hover:text-red-600"
        >
          Disconnect
        </button>
      </div>
      {/* Rest of the form */}
    </div>
  );
} 