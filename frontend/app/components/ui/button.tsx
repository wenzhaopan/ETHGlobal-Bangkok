import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, variant = "default", className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded transition-all duration-300";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-500 text-gray-300 hover:bg-gray-700",
    ghost: "bg-transparent text-gray-300 hover:bg-gray-700",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
