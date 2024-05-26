'use client';
import React from 'react';
import Image from 'next/image';
import CopyLinkButton from '../../../public/copy-link-button.svg';

interface ReferralLinkRowProps {
  imageUrl: string;
  title: string;
  link: string;
}

const ReferralLinkRow = ({ imageUrl, title, link }: ReferralLinkRowProps) => {
  return (
    <div className="text-darkWhite flex items-center justify-between bg-transparent">
      <div className="flex w-max items-center justify-start gap-6">
        <Image
          src={imageUrl}
          alt="icon"
          width={59}
          height={59}
          className="rounded-full"
        />
        <h3 className="text-left text-lg font-medium uppercase leading-[8px] tracking-[0.06em]">
          {title}
        </h3>
      </div>
      <div className="flex items-center justify-start gap-20">
        <h3 className="text-left text-lg font-medium uppercase leading-[8px] tracking-[0.06em]">
          {link}
        </h3>
        <Image
          src={CopyLinkButton}
          alt="copy-link-button"
          className="cursor-pointer transition-all hover:opacity-80"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ReferralLinkRow;
