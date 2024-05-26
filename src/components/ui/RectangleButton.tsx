'use client';

import React from 'react';
import Image from 'next/image';

interface RectangleButtonProps {
  text: string;
  onClick: () => void;
  textClassName?: string;
  buttonClassName?: string;
}

const RectangleButton = ({
  text,
  onClick,
  buttonClassName,
  textClassName,
}: RectangleButtonProps) => {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between border-[1.5px] border-lightyellow bg-lightyellow bg-opacity-10 px-2 py-3 ${buttonClassName}`}
      onClick={() => {
        onClick();
      }}>
      <span
        className={`text-left text-xs font-normal uppercase leading-[18px] tracking-[0.2em] text-lightyellow 2xl:w-[307.5px] ${textClassName}`}>
        {text}
      </span>
      <div className="flex items-center justify-start gap-1.5">
        <Image src="/icons/stack.svg" width={18} height={18} alt="stack" />
        <Image src="/icons/recycle.svg" width={18} height={18} alt="recycle" />
      </div>
    </div>
  );
};

export default RectangleButton;
