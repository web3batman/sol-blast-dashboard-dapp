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
    <div className="flex items-center justify-between bg-transparent text-darkWhite gap-2">
      <div className="flex w-max items-center justify-start gap-6">
        <Image
          src={imageUrl}
          alt="icon"
          width={59}
          height={59}
          className="rounded-full"
        />
        <h3 className="text-style whitespace-nowrap overflow-hidden overflow-ellipsis">
          {title}
        </h3>
      </div>
      <div className="flex items-center justify-start gap-20 max-xl:gap-6">
        <h3 className="text-style whitespace-nowrap overflow-hidden overflow-ellipsis">
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
