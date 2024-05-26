'use client';

import React from 'react';
import { Icon } from '../ui/icon';

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
    <div className="button-container" onClick={onClick}>
      <Icon
        name="LeftButton"
        color={colors.fillColor}
        width={132}
        height={64}
        viewBox="0 0 132 64"
      />
      <span
        className="absolute inset-0 flex items-center justify-center text-base font-bold uppercase leading-[20.06px] tracking-[0.04em]"
        style={{ color: colors.textColor }}>
        Home
      </span>
    </div>
  );
};

export default HomeButton;
