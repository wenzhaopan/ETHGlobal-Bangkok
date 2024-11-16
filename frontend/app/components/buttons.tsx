export interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
  }
  
  export function PrimaryButton({ children, onClick, disabled }: ButtonProps) {
    return (
      <button
        className={`w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
          disabled ? "opacity-70" : "hover:bg-blue-600 cursor-pointer"
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  
  export function SecondaryButton({ children, onClick }: ButtonProps) {
    return (
      <button
        className="w-full px-3 py-2 border rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  