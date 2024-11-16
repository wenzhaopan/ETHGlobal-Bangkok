import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useConnect, Connector } from 'wagmi';

export function ConnectWalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <ConnectWalletModal onClose={() => setIsModalOpen(false)} />
      )}

      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity duration-300"
      >
        Connect Wallet
      </button>
    </>
  );
}

export function ConnectWalletModal({ onClose }: { onClose: () => void }) {
  const { connectors, connect } = useConnect();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Choose a Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <ul className="space-y-2">
          {connectors.map((connector, index) => (
            <li key={index}>
              <WalletOption
                connector={connector}
                onClick={() => {
                  connect({ connector });
                  onClose();
                }}
                isLast={index === connectors.length - 1}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WalletOption({
  connector,
  onClick,
  isLast,
}: {
  connector: Connector;
  onClick: () => void;
  isLast: boolean;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      disabled={!ready}
      onClick={onClick}
      className={`w-full text-left py-3 px-4 bg-slate-800 hover:bg-slate-700 transition-colors duration-300 rounded-lg
        ${!ready && 'opacity-50 cursor-not-allowed'}
        ${isLast ? 'mb-0' : 'mb-2'}
      `}
    >
      <div className="flex items-center gap-3">
        {connector.icon && (
          <Image
            src={connector.icon}
            alt={`${connector.name} logo`}
            width={24}
            height={24}
            className="mr-2"
          />
        )}
        <span className="text-white">{connector.name}</span>
      </div>
    </button>
  );
}

export default ConnectWalletButton;