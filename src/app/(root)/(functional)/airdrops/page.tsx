'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useSignMessage } from 'wagmi';
import { useLocalStorage } from 'usehooks-ts';

import AirdropsMissionRow from '@/components/shared/AirdropsMissionRow';
import SmallLabel from '@/components/ui/SmallLabel';
import axios from 'axios';
import { API_URL } from '@/config/const';

const Page = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [token, setToken] = useLocalStorage<string>('token', '');

  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setWalletModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    const verifyMsg = `The quick brown fox jumps over the lazy dog`;
    if (address) {
      signMessageAsync({ message: verifyMsg })
        .then(async (sign) => {
          const newToken = await axios
            .post(`${API_URL}/v1/sessions`, {
              public_address: address,
              signed_message: sign.toString(),
              signed_on: 'Eth',
              invitation_code: 'S3PUSL',
            })
            .then((res) => res.data);
          console.log({ newToken });
          setToken(newToken);
        })
        .catch((e) => {
          console.error('===== msg sign error =====', e);
        });
    }
  }, [address]);

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
        {walletModalOpen && (
          <div className="absolute flex h-full w-full items-center justify-center backdrop-blur-sm">
            <div
              ref={modalRef}
              className="flex h-[300px] w-[300px] flex-col items-center justify-center gap-4 bg-[#201F07] px-[40px]"
              style={{
                clipPath:
                  'polygon(0 5%, 5% 0, 100% 0, 100% 100%, 100% 100%, 0 100%)',
              }}>
              <SmallLabel onClick={() => open()}>Ethereum</SmallLabel>
              <SmallLabel>Solana</SmallLabel>
            </div>
          </div>
        )}
        <Image src="/world-bg.png" alt="" width={500} height={500} />
      </div>
    </div>
  );
};

export default Page;
