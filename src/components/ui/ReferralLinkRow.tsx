'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import CopyLinkButton from '../../../public/copy-link-button.svg';
import * as clipboard from 'clipboard-polyfill';
import { toast } from 'react-toastify';
import { BridgeButton } from './icon/icons/BridgeButton';
interface ReferralLinkRowProps {
  imageUrl: string;
  title: string;
  link: string;
}

const ReferralLinkRow = ({ imageUrl, title, link }: ReferralLinkRowProps) => {
  const [active, setActive] = useState<boolean>(false);

  const handleCopyToClipboard = (address: string) => {
    clipboard.writeText(address);
    toast.success('Copied');
    setActive(true);
    // triggerToast('clipboardCopied', 'success', 1200);
  };

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
        <button
          onClick={() => {
            handleCopyToClipboard(link);
          }}
          className="relative max-h-[clamp(0.5vw,20vh,3.5vw)] drop-shadow-[3.5px_3.5px_0_#F8EF00] transition-all hover:opacity-85 max-md:max-h-[40px]">
          <BridgeButton width={150} height={40} />
          <h5 className="chakra-petch text- absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap text-[clamp(0.5vw,1.6vh,1.5vw)] font-semibold uppercase tracking-[3.2px] text-[#010101] max-md:text-base">
            {active ? 'copied' : 'copy code'}
          </h5>
        </button>
      </div>
    </div>
  );
};

export default ReferralLinkRow;
