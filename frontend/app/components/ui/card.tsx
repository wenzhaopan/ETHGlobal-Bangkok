import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={`rounded-lg shadow-lg bg-gray-800 border border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

type CardContentProps = {
  children: ReactNode;
  className?: string;
};

export const CardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
