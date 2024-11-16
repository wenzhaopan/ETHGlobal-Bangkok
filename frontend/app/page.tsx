"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ChevronDown, Settings2, RefreshCw } from 'lucide-react';

const CryptoSwap = () => {
  const [slippage, setSlippage] = useState(0.5);
  const [sellValue, setSellValue] = useState("10"); // For the "You sell" input

  const routes = [
    {
      protocol: "KyberSwap",
      outputAmount: "94,167.535",
      token: "MATH",
      usdValue: "25,925.7",
      fee: "18.9055",
      isBest: true,
      difference: "BEST",
    },
    {
      protocol: "ParaSwap",
      outputAmount: "94,152.0263",
      token: "MATH",
      usdValue: "25,921.7",
      fee: "18.5634",
      difference: "-0.02%",
    },
    {
      protocol: "Matcha/0x",
      outputAmount: "67,567.1653",
      token: "MATH",
      usdValue: "18,609.6",
      fee: "6.1337",
      difference: "-28.22%",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full" />
            <span className="text-white text-xl font-bold">LlamaSwap</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white">
              Swap
            </Button>
            <Button variant="ghost" className="text-white">
              Earn
            </Button>
            <Button variant="ghost" className="text-white">
              Borrow
            </Button>
            <Button variant="outline" className="text-white">
              Connect Wallet
            </Button>
          </div>
        </div>

        {/* Main Swap Card */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-300">Chain</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">Hide IP</span>
                <Settings2 className="w-5 h-5 text-gray-300" />
              </div>
            </div>

            {/* Chain Selector */}
            <Button
              variant="outline"
              className="w-full justify-between mb-6 text-white"
            >
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-600 rounded-full mr-2" />
                Ethereum
              </div>
              <ChevronDown className="w-4 h-4" />
            </Button>

            {/* Swap Inputs */}
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-gray-400 text-sm mb-2">You sell</div>
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={sellValue}
                    onChange={(e) => setSellValue(e.target.value)} // Added onChange handler
                    className="bg-transparent text-2xl text-white outline-none w-1/2"
                  />
                  <Button variant="outline" className="text-white">
                    <div className="w-5 h-5 bg-gray-600 rounded-full mr-2" />
                    ETH
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="text-gray-500 text-sm mt-1">≈$31,463.3</div>
              </div>

              <div className="flex justify-center">
                <Button variant="ghost" className="rounded-full p-2">
                  <RefreshCw className="w-5 h-5 text-blue-400" />
                </Button>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-gray-400 text-sm mb-2">You buy</div>
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value="94167.53502..."
                    readOnly // Made read-only
                    className="bg-transparent text-2xl text-gray-500 outline-none w-1/2"
                  />
                  <Button variant="outline" className="text-white">
                    <div className="w-5 h-5 bg-gray-600 rounded-full mr-2" />
                    MATH
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Slippage Settings */}
            <div className="mt-4">
              <div className="text-gray-400 text-sm mb-2">
                Swap Slippage: {slippage}%
              </div>
              <div className="flex space-x-2">
                {[0.1, 0.5, 1].map((value, index) => (
                  // Use `index` as a fallback key
                  <Button
                    key={`slippage-${index}`} // Added unique key
                    variant={slippage === value ? "default" : "outline"}
                    className="text-sm"
                    onClick={() => setSlippage(value)}
                  >
                    {value}%
                  </Button>
                ))}
              </div>
            </div>

            <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600">
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoSwap;
