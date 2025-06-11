import React from 'react';
import { X } from 'lucide-react';
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Modal = ({ isOpen, onClose, children, size = 'md' }: ModalProps) => {
  if (!isOpen) return null;

  const sizeClasses = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };
  return (
    <div
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div
        className={`bg-gray-800 rounded-xl shadow-2xl w-full ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='p-6 relative'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-500 hover:text-white transition-colors'
          >
            <X size={24} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
