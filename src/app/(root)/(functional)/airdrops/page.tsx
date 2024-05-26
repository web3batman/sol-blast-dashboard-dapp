'use client';

import Image from 'next/image';
import { useLocalStorage } from 'usehooks-ts';

import AirdropsMissionRow from '@/components/shared/AirdropsMissionRow';
import { useApp } from '@/context';

const Page = () => {
  const { setWalletModalOpen } = useApp();

  const [token] = useLocalStorage<string>('token', '');

  return (
    <div className="flex flex-col gap-6 px-10 pt-7">
      <div className="flex flex-col">
        <h5 className="text-left text-[12px] font-bold tracking-[0.04em] text-whiteyellow max-2xl:text-[18px]">
          YOU ARE ALMOST THERE
        </h5>
        <h1 className="text-left text-[28px] font-bold tracking-[0.04em] text-whiteyellow max-2xl:text-[40px]">
          To join early access:
        </h1>
      </div>
      <div className="flex items-center justify-between gap-10">
        <div className="flex flex-grow flex-col gap-7">
          <AirdropsMissionRow
            number={1}
            completed={!!token}
            title="Connect your wallet"
            buttonText="Connect Wallet"
            onClick={() => {
              setWalletModalOpen(true);
            }}
          />
          <AirdropsMissionRow
            number={2}
            completed={false}
            title="Follow us on Twitter"
            buttonText="Follow Twitter"
            onClick={() => {}}
          />
        </div>
        <Image src="/world-bg.png" alt="" width={500} height={500} />
      </div>
    </div>
  );
};

export default Page;
