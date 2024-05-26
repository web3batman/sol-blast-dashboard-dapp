'use client';
import React from 'react';

interface LeaderboardButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const LeaderboardButton = ({ onClick, isActive }: LeaderboardButtonProps) => {
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
        width="234"
        height="64"
        viewBox="0 0 234 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M4 0H20L20 64H4V48L0 44V20L4 16V0Z" fill={colors.fillColor} />
        <rect
          width="194"
          height="64"
          transform="translate(20)"
          fill={colors.fillColor}
        />
        <path
          d="M230 0H214L214 64H230V48L234 44V20L230 16V0Z"
          fill={colors.fillColor}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-base font-bold uppercase leading-[20.06px] tracking-[0.04em]"
        style={{ color: colors.textColor }}>
        Leaderboard
      </span>
    </div>
  );
};

export default LeaderboardButton;
