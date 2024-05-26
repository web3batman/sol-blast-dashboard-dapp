'use client';

import React from 'react';
import { Icon } from '../ui/icon';
import { MobileSVGButton } from '../ui/icon/icons/TopMobileButton';

interface HomeButtonProps {
  isActive: boolean;
  title: string;
  onClick: () => void;
}

const MobileButton = ({ title, isActive, onClick }: HomeButtonProps) => {
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
      <MobileSVGButton
        width={280}
        height={48}
        viewBox="0 0 280 48"
        color={colors.fillColor}
      />
      <span
        className="absolute inset-0 flex items-center justify-center text-base font-bold uppercase leading-[20.06px] tracking-[0.04em]"
        style={{ color: colors.textColor }}>
        {title}
      </span>
    </div>
  );
};

export default MobileButton;
