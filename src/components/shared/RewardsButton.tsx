import React from 'react';
import { Icon } from '../ui/icon';

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
    <div className="button-container" onClick={onClick}>
      <Icon
        name="RightButton"
        width={177}
        height={64}
        viewBox="0 0 177 64"
        color={colors.fillColor}
      />

      <span
        className="absolute inset-0 flex items-center justify-center text-base font-bold uppercase leading-[20.06px] tracking-[0.04em]"
        style={{ color: colors.textColor }}>
        Rewards
      </span>
    </div>
  );
};

export default RewardsButton;
