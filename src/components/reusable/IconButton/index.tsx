import React from 'react';

const IconButton: React.FC<{
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
}> = ({ className, onClick, children, disabled }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`font-bangers text-2xl text-stone-800 hover:text-red-700 active:text-red-900 ${className} ${
      disabled && 'pointer-events-none opacity-10'
    }`}
  >
    {children}
  </button>
);

export default IconButton;
