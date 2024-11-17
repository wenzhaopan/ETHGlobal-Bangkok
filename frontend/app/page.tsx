"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ChevronDown } from "lucide-react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount } from 'wagmi';
import { config } from './config';
import { Account } from './components/account';
// import { WalletOptions } from './components/wallet-options';
import { ExternalLink } from "./components/links";
import { Wallet } from "./components/wallet";

const queryClient = new QueryClient();
const CryptoBridge = () => {
  // Default to "Select Chain" initially
  const [fromChain, setFromChain] = useState("Select Chain");
  const [toChain, setToChain] = useState("Select Chain");
  const [bridgeAmount, setBridgeAmount] = useState("");

  const chains = ["Select Chain", "Ethereum", "Polygon", "Zircuit", "Base", "Linea", "Scroll"];

  const handleBridge = () => {
    if (!bridgeAmount) {
      alert("Please enter an amount to bridge");
      return;
    }

    if (fromChain === "Select Chain" || toChain === "Select Chain") {
      alert("Please select valid chains for bridging");
      return;
    }

    alert(
      `Bridging from ${fromChain} to ${toChain} with amount ${bridgeAmount}`
    );
    window.location.href = '/bridge-status';
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
              <div className="flex items-center space-x-4">
                {/* Logo */}
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-extrabold text-white">BF</span>
                </div>
                <h1 className="text-2xl font-bold">BridgeFlow</h1>
              </div>
              <Wallet />
            </header>

            {/* Main Card */}
            <Card className="bg-gray-800 border-gray-700 shadow-xl rounded-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-center mb-6">
                  Seamless Blockchain Bridging
                </h2>
                <div className="space-y-6">
                  {/* From Chain */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Bridge From
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none"
                        value={fromChain}
                        onChange={(e) => setFromChain(e.target.value)}
                      >
                        {chains.map((chain, index) => (
                          <option key={`from-chain-${index}`} value={chain}>
                            {chain}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* To Chain */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Bridge To
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none"
                        value={toChain}
                        onChange={(e) => setToChain(e.target.value)}
                      >
                        {chains.map((chain, index) => (
                          <option key={`to-chain-${index}`} value={chain}>
                            {chain}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Amount</label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter amount"
                      value={bridgeAmount}
                      onChange={(e) => setBridgeAmount(e.target.value)}
                    />
                  </div>

                  {/* Bridge Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-lg py-3 rounded-lg shadow-lg hover:opacity-90"
                    onClick={handleBridge}
                  >
                    Start Bridging
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </QueryClientProvider> 
    </WagmiProvider>
  );
};

export default CryptoBridge;
