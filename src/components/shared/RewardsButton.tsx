import React from 'react';

interface RewardsButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const RewardsButton = ({ isActive, onClick }: RewardsButtonProps) => {
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
        width="177"
        height="64"
        viewBox="0 0 177 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H16L16 64H0V48L4 44V20L0 16V0Z" fill={colors.fillColor} />
        <rect
          width="145"
          height="64"
          transform="translate(16)"
          fill={colors.fillColor}
        />
        <path d="M161 0L177 15.7538V64H161V0Z" fill={colors.fillColor} />
      </svg>

      <span
        className="absolute inset-0 flex items-center justify-center text-base font-bold uppercase leading-[20.06px] tracking-[0.04em]"
        style={{ color: colors.textColor }}>
        Rewards
      </span>
    </div>
  );
};

export default RewardsButton;
