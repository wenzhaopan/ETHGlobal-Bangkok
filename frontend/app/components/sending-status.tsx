import React, { useState, useEffect } from "react";

interface TxPendingProps {
  isPending: boolean;
  pendingText: string;
  completeText: string;
}

export function TxPendingStatus({
  isPending,
  pendingText,
  completeText,
}: TxPendingProps) {
  return (
    <>
      {isPending ? (
        <div
          key="pending"
          className="flex items-center space-x-2 animate-fadeIn"
        >
          <LoadingSpinner />
          <span className="text-primary">{pendingText}</span>
        </div>
      ) : (
        <div
          key="complete"
          className="flex items-center space-x-2 animate-fadeIn"
        >
          <Checkmark />
          <span className="text-green-500">{completeText}</span>
        </div>
      )}
    </>
  );
}

function Checkmark() {
  return (
    <svg
      className="w-5 h-5 text-green-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12L11 15L16 9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  );
}
