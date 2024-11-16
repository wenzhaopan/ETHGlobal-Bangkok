import React, { ReactNode } from "react";

type SelectProps = {
  children: ReactNode;
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = ({ children, className, ...props }) => {
  return (
    <select
      className={`border border-gray-500 rounded px-3 py-2 bg-gray-900 text-gray-300 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
