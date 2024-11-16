import { useState } from "react";
import { Address, Chain, formatEther, formatUnits } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  useChains,
  useDisconnect,
  useEnsName,
  useEnsAvatar,
} from "wagmi";
import { ChevronDown } from "lucide-react";

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function Account() {
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  
  if (!address) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors duration-300"
      >
        {ensAvatar && (
          <img
            src={ensAvatar}
            alt="ENS Avatar"
            className="w-6 h-6 rounded-full"
          />
        )}
        <span className="text-white">
          {ensName || truncateAddress(address)}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg bg-slate-800 shadow-xl border border-slate-700">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              {ensAvatar && (
                <img
                  src={ensAvatar}
                  alt="ENS Avatar"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div className="flex flex-col">
                {ensName && (
                  <span className="text-white font-medium">{ensName}</span>
                )}
                <span className="text-gray-400 text-sm">
                  {truncateAddress(address)}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => {
                disconnect();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors duration-300"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
