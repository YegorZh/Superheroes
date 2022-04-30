import React from 'react';

const GenericButton: React.FC<{
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}> = ({ children, className, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`mr-auto whitespace-nowrap rounded bg-red-700 py-2 px-3 font-bangers text-2xl text-stone-100 outline-red-700
                transition hover:bg-stone-200 hover:text-red-700 hover:outline
                active:bg-stone-400 active:text-red-900 active:outline-red-900 
                ${className} 
                ${disabled && 'pointer-events-none opacity-30'}`}
    >
      {children}
    </button>
  );
};

export default GenericButton;
