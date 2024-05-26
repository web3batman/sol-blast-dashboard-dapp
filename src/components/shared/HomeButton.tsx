'use client';
import React from 'react';

interface HomeButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const HomeButton = ({ isActive, onClick }: HomeButtonProps) => {
  let colors = {
    fillColor: '#201f06',
    textColor: '#9b996c',
  };

  if (isActive) {
    colors = {
      fillColor: '#f9ef00',
      textColor: '#010101',
    };
  }
  return (
    <div
      className="relative w-max cursor-pointer text-center transition-transform duration-200 ease-in-out hover:scale-[1.04]"
      onClick={onClick}>
      <svg
        width="132"
        height="64"
        viewBox="0 0 132 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M16 64L0 48.2462V0H16V64Z" fill={colors.fillColor} />
        <rect
          width="100"
          height="64"
          transform="translate(16)"
          fill={colors.fillColor}
        />
        <path
          d="M132 0H116L116 64H132V48L128 44V20L132 16V0Z"
          fill={colors.fillColor}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-base font-bold uppercase leading-[20.06px] tracking-[0.04em]"
        style={{ color: colors.textColor }}>
        Home
      </span>
    </div>
  );
};

export default HomeButton;
