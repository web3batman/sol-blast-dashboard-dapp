'use client';
import React from 'react';
import Image from 'next/image';
import CopyLinkButton from '../../../public/copy-link-button.svg';
import * as clipboard from 'clipboard-polyfill';
import { toast } from 'react-toastify';
interface ReferralLinkRowProps {
  imageUrl: string;
  title: string;
  link: string;
}

const handleCopyToClipboard = (address: string) => {
  clipboard.writeText(address);
  toast.success('Copied');
  // triggerToast('clipboardCopied', 'success', 1200);
};

const ReferralLinkRow = ({ imageUrl, title, link }: ReferralLinkRowProps) => {
  return (
    <div className="grid grid-cols-[minmax(200px,auto)_1fr] items-center gap-2 bg-transparent text-darkWhite max-md:grid-cols-1 max-md:grid-rows-2">
      <div className="flex w-max items-center justify-start gap-6">
        <Image
          src={imageUrl}
          alt="icon"
          width={59}
          height={59}
          className="rounded-full"
        />
        <h3 className="text-style overflow-hidden overflow-ellipsis whitespace-nowrap">
          {title}
        </h3>
      </div>
      <div className="flex items-center gap-20 justify-self-end max-xl:gap-6 max-md:w-full max-md:justify-between">
        <h3 className="text-style overflow-hidden overflow-ellipsis whitespace-nowrap">
          {link}
        </h3>
        <Image
          src={CopyLinkButton}
          alt="copy-link-button"
          className="cursor-pointer transition-all hover:opacity-80"
          onClick={() => {
            handleCopyToClipboard(link);
          }}
        />
      </div>
    </div>
  );
};

export default ReferralLinkRow;
