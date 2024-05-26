import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`w-max rounded-bl-sm rounded-tr-sm bg-lightyellow px-6 py-1 text-black ${className}`}
      style={{
        clipPath: 'polygon(0 50%, 10% 0, 100% 0, 100% 50%, 90% 100%, 0 100%)',
      }}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
