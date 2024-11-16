export function AmountInput({
  amount,
  setAmount,
}: {
  amount: string;
  setAmount: (amount: string) => void;
}) {
  return (
    <div className={`flex items-center justify-end text-lg relative group`}>
      <input
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full text-right focus:outline-none"
        placeholder="0.0"
        required
      />
      <div className="pl-3">USDC</div>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300 transition-colors duration-300"></span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-left scale-x-0 group-focus-within:scale-x-100"></span>
    </div>
  );
}

export function OutAmountDisplay({ amount }: { amount: string }) {
  return (
    <div className={`flex items-center justify-end text-lg`}>
      <input
        value={amount}
        readOnly
        className="w-full text-right focus:outline-none"
        style={{ pointerEvents: "none" }}
        placeholder="0.0"
      />
      <div className="pl-3">USDC</div>
    </div>
  );
}
