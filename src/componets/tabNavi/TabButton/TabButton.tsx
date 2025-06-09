import React from 'react';

type TabButtonProps = {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const TabButton = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`flex-1 flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
    }`}
  >
    <Icon size={18} />
    <span className='hidden sm:inline'>{label}</span>
  </button>
);

export default TabButton;
