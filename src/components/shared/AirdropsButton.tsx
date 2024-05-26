'use client';
import React from 'react';

interface AirdropsButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const AirdropsButton = ({ onClick, isActive }: AirdropsButtonProps) => {
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
    <div className="button-container" onClick={onClick}>
      <svg
        width="163"
        height="64"
        viewBox="0 0 163 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H16L16 64H0V48L4 44V20L0 16V0Z" fill={colors.fillColor} />
        <rect
          width="127"
          height="64"
          transform="translate(16)"
          fill={colors.fillColor}
        />
        <path
          d="M159 0H143L143 64H159V48L163 44V20L159 16V0Z"
          fill={colors.fillColor}
        />
      </svg>

      <span
        className="absolute inset-0 flex items-center justify-center text-base font-bold uppercase leading-[20.06px] tracking-[0.04em]"
        style={{ color: colors.textColor }}>
        Airdrops
      </span>
    </div>
  );
};

export default AirdropsButton;
