import { useAccount } from "wagmi";

import { Account } from "./account";
import { ConnectWalletButton } from "./wallet-options";

export function Wallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <ConnectWalletButton />;
}
