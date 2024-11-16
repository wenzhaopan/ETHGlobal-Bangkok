"use client";

import React from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { ArrowRight, Check, Loader2, Clock } from "lucide-react";
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { config } from '../config';
import { Wallet } from "../components/wallet";

const queryClient = new QueryClient();

type BridgeStatus = "finished" | "working" | "not_started";

interface BridgeBlock {
  fromAddress: string;
  toAddress: string;
  status: BridgeStatus;
  amount: string;
  timestamp?: string;
}

const StatusIcon = ({ status }: { status: BridgeStatus }) => {
  switch (status) {
    case "finished":
      return <Check className="w-6 h-6 text-green-400" />;
    case "working":
      return <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />;
    case "not_started":
      return <Clock className="w-6 h-6 text-gray-400" />;
  }
};

const StatusText = ({ status }: { status: BridgeStatus }) => {
  const textMap = {
    finished: "Finished",
    working: "Working on it",
    not_started: "Not Started"
  };
  
  const colorMap = {
    finished: "text-green-400",
    working: "text-yellow-400",
    not_started: "text-gray-400"
  };

  return <span className={`font-medium ${colorMap[status]}`}>{textMap[status]}</span>;
};

const BridgeStatusPage = () => {
  const bridgeBlocks: BridgeBlock[] = [
    {
      fromAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      toAddress: "0x123d35Cc6634C0532925a3b844Bc454e4438f123",
      status: "finished",
      amount: "1.5 ETH",
      timestamp: "2024-03-16 14:30:00"
    },
    {
      fromAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      toAddress: "0x456d35Cc6634C0532925a3b844Bc454e4438f456",
      status: "working",
      amount: "0.5 ETH",
      timestamp: "2024-03-16 14:35:00"
    },
    {
      fromAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      toAddress: "0x456d35Cc6634C0532925a3b844Bc454e4438f456",
      status: "working",
      amount: "0.5 ETH",
      timestamp: "2024-03-16 14:35:00"
    },
    {
      fromAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      toAddress: "0x456d35Cc6634C0532925a3b844Bc454e4438f456",
      status: "working",
      amount: "0.5 ETH",
      timestamp: "2024-03-16 14:35:00"
    },
    {
      fromAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      toAddress: "0x456d35Cc6634C0532925a3b844Bc454e4438f456",
      status: "working",
      amount: "0.5 ETH",
      timestamp: "2024-03-16 14:35:00"
    },
    {
      fromAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      toAddress: "0x789d35Cc6634C0532925a3b844Bc454e4438f789",
      status: "not_started",
      amount: "2.0 ETH"
    },
  ];

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-extrabold text-white">BF</span>
                </div>
                <h1 className="text-2xl font-bold">BridgeFlow Status</h1>
              </div>
              <Wallet />
            </header>

            {/* Status Cards */}
            <div className="space-y-6">
              {bridgeBlocks.map((block, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 shadow-xl">
                  <CardContent className="p-6">
                    {/* Main content wrapper with fixed height */}
                    <div className="min-h-[88px]">
                      <div className="flex items-center justify-between space-x-4">
                        {/* From Address */}
                        <div className="flex-1">
                          <div className="text-sm text-gray-400 mb-1">From</div>
                          <div className="bg-gray-700 p-3 rounded-lg">
                            {truncateAddress(block.fromAddress)}
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex flex-col items-center px-4">
                          <ArrowRight className="w-6 h-6 text-gray-400" />
                          <div className="text-sm text-gray-400 mt-1">{block.amount}</div>
                        </div>

                        {/* To Address */}
                        <div className="flex-1">
                          <div className="text-sm text-gray-400 mb-1">To</div>
                          <div className="bg-gray-700 p-3 rounded-lg">
                            {truncateAddress(block.toAddress)}
                          </div>
                        </div>

                        {/* Status */}
                        <div className="flex flex-col items-center justify-center ml-4">
                          <StatusIcon status={block.status} />
                          <div className="text-sm mt-1">
                            <StatusText status={block.status} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timestamp in separate section */}
                    <div className="h-6">
                      {block.timestamp && (
                        <div className="text-sm text-gray-400">
                          Last updated: {block.timestamp}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default BridgeStatusPage;