"use client";

import React from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { ArrowRight, Check, Loader2, Clock, ExternalLink } from "lucide-react";
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
      fromAddress: "0xD4FF...7F48",
      toAddress: "0x810A0Ecc078FaBf81a0C09CA2F88c47728F3C99f",
      status: "finished",
      amount: "2.0 USDC",
      timestamp: "2024-03-16 14:30:00"
    },
    {
      fromAddress: "0x810A0Ecc078FaBf81a0C09CA2F88c47728F3C99f",
      toAddress: "0x810A0Ecc078FaBf81a0C09CA2F88c47728F3C99f",
      status: "working",
      amount: "1.9 USDC",
      timestamp: "2024-03-16 14:35:00"
    },
    {
      fromAddress: "0x810A0Ecc078FaBf81a0C09CA2F88c47728F3C99f",
      toAddress: "0xD4FF...7F48",
      status: "not_started",
      amount: "1.9 USDC"
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
{bridgeBlocks.map((block, index) => {
  let detailsLink = "";

  // Assign different links based on the index
  if (index === 0) {
    detailsLink = "https://base.blockscout.com/tx/0x5ca3f056e7bdc750bda505093e05cf8cae1c7f683dd0a5afc074a2169a3458d3";
  } else if (index === 1) {
    detailsLink = "https://explorer.linea.build/tx/0x0ff12b6bb5d3aa960a701021ae635f2b329bf2e6dba663c08d052805c93f255e";
  } else if (index === 2) {
    detailsLink = "https://explorer.zircuit.com/tx/0x9fe0c237d7d1f53217d14060fe420c3f1af41afc80e6f72b97b9ec3872167a8b";
  } else {
    detailsLink = "https://example.com/details/default";
  }

  return (
    <Card key={index} className="bg-gray-800 border-gray-700 shadow-xl rounded-lg">
      <CardContent className="p-6">
        {/* Main content wrapper */}
        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-4">
            {/* From Address */}
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-1">From</div>
              <div className="bg-gray-700 p-3 rounded-lg text-white">
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
              <div className="bg-gray-700 p-3 rounded-lg text-white">
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

          {/* Timestamp */}
          {block.timestamp && (
            <div className="text-sm text-gray-400">
              Last updated: {block.timestamp}
            </div>
          )}
        </div>

        {/* Buttons */}
        {block.status === "finished" && (
          <div className="mt-4 flex justify-between space-x-4">
            {/* Details Button */}
            <a
              href={detailsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-x-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
            </a>

            {/* Primary Action Button (only for index 0) */}
            {index === 0 && (
              <a
                href={`https://explorer.linea.build/tx/0x01af801dc4ffbb19deab741deb3f230f8507c129a1e8e8adabc8f2dad0f33182`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-lg"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
})}

</div>

          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default BridgeStatusPage;
