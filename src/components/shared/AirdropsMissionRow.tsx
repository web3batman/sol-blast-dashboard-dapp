'use client';
import React from 'react';
import Button from '@/components/ui/Button';
import SmallButton from '@/components/ui/SmallButton';

interface AirdropsMissionRowProps {
  number: number;
  completed: boolean;
  title: string;
  buttonText: string;
  onClick: () => void;
}

const AirdropsMissionRow = ({
  number,
  completed,
  title,
  buttonText,
  onClick,
}: AirdropsMissionRowProps) => {
  return (
    <div className="flex items-center justify-between border-b border-whiteyellow pb-4">
      <div className="flex items-center justify-start gap-4">
        <SmallButton>{number}</SmallButton>
        <h5 className="text-left text-[18px] font-bold tracking-[0.04em] text-whiteyellow max-2xl:text-[26px]">
          {title}
        </h5>
      </div>
      {completed ? (
        <Button>Completed</Button>
      ) : (
        <Button onClick={onClick}>{buttonText}</Button>
      )}
    </div>
  );
};

export default AirdropsMissionRow;
