export interface BalanceDisplayProps {
  balance: string;
  setAmount: (amount: string) => void;
}

export function BalanceDisplay({ balance, setAmount }: BalanceDisplayProps) {
  const handleMaxClick = () => {
    setAmount(balance);
  };

  return (
    <>
      <div className="text-sm text-gray-500">Balance: {balance}</div>
      <button
        type="button"
        onClick={handleMaxClick}
        className="py-1 px-2 text-xs bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors duration-300 focus:outline-none"
      >
        MAX
      </button>
    </>
  );
}
