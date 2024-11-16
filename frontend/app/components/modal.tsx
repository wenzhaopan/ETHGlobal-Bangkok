import { useEffect, useState } from "react";
import { CloseIcon } from "./close-icon";

interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ onClose, title, children }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Used to animate the darkening of the background
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-bg-opacity duration-300 ${
        isVisible ? "bg-opacity-60" : "bg-opacity-0"
      }`}
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg w-96">
        <div className="flex items-center justify-between px-4 py-4">
          <h4 className="text-gray-500">{title}</h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-text duration-300"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
