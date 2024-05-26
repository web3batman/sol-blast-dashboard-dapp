'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { useWeb3Modal as useEtherWalletModal } from '@web3modal/wagmi/react';

import { useApp } from '@/context';
import SmallLabel from '@/components/ui/SmallLabel';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    walletModalOpen,
    setWalletModalOpen,
    solanaWalletModalOpen,
    setSolanaWalletModalOpen,
  } = useApp();
  const { open } = useEtherWalletModal();

  const modalRef = useRef<HTMLDivElement>(null);
  const solanaModalRef = useRef<HTMLDivElement>(null);

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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        solanaModalRef.current &&
        !solanaModalRef.current.contains(event.target as Node)
      ) {
        setSolanaWalletModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [solanaModalRef]);

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 -z-20 h-full w-full">
        <Image
          src="/grid-layer.svg"
          fill
          objectFit="cover"
          quality={100}
          alt="bg"
        />
      </div>
      {walletModalOpen && (
        <div className="absolute z-20 flex h-full w-full items-center justify-center backdrop-blur-sm">
          <div
            ref={modalRef}
            className="flex h-[300px] w-[300px] flex-col items-center justify-center gap-4 bg-[#201F07] px-[40px]"
            style={{
              clipPath:
                'polygon(0 5%, 5% 0, 100% 0, 100% 100%, 100% 100%, 0 100%)',
            }}>
            <SmallLabel onClick={() => open()}>Ethereum</SmallLabel>
            <SmallLabel onClick={() => setSolanaWalletModalOpen(true)}>
              Solana
            </SmallLabel>
          </div>
        </div>
      )}
      {solanaWalletModalOpen && (
        <div className="absolute z-20 flex h-full w-full items-center justify-center backdrop-blur-sm">
          <div
            ref={solanaModalRef}
            className="relative flex h-[400px] w-full max-w-[300px] flex-col items-center justify-center gap-4 bg-[#141414cc] px-[40px] outline-0"
            style={{
              clipPath:
                'polygon(0 5%, 5% 0, 100% 0, 100% 100%, 100% 100%, 0 100%)',
              animationDuration: '0.2s',
              animationName: 'zoom-in',
              animationFillMode: 'backwards',
              animationTimingFunction: 'var(--wui-ease-out-power-2)',
              borderRadius: 'clamp(0px, 36px, 44px)',
              boxShadow: '0 0 0 1px #ffffff0d',
            }}>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
        </div>
      )}
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
