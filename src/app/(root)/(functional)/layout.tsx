'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { SessionProvider } from 'next-auth/react';
import {
  WalletMultiButton,
  useWalletModal as useSolWalletModal,
} from '@solana/wallet-adapter-react-ui';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWeb3Modal as useEthWalletModal } from '@web3modal/wagmi/react';
import { useDisconnect, useAccount as useEtherAccount } from 'wagmi';

import { useApp } from '@/context';
import SmallLabel from '@/components/ui/SmallLabel';
import Loading from '@/components/ui/Loading';
import { shortenAddress } from '@/util';
import { useOnceEffect } from '@/hook/useOnceEffect';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading, walletModalOpen, setWalletModalOpen, isContinue } = useApp();
  const { open } = useEthWalletModal();
  const { setVisible } = useSolWalletModal();
  const { address: etherAddress } = useEtherAccount();
  const { disconnect: ethDisconnect } = useDisconnect();
  const { publicKey: solAddress, disconnect: solDisconnect } =
    useSolanaWallet();

  const modalRef = useRef<HTMLDivElement>(null);

  useOnceEffect(() => {
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

  return (
    <SessionProvider>
      {/* <div className="relative h-full before:absolute before:inset-0 before:bg-[url('/grid-layer.svg')] before:content-[''] max-lg:before:h-[inherit]"> */}
      <div className={`relative h-full ${isContinue ? 'z-[500]' : 'z-20'}`}>
        {walletModalOpen && (
          <div className="absolute z-50 flex h-full w-full items-center justify-center backdrop-blur-sm">
            <div
              ref={modalRef}
              className="flex h-[300px] w-[300px] flex-col items-center justify-center gap-4 bg-[#201F07] px-[40px]"
              style={{
                clipPath:
                  'polygon(0 5%, 5% 0, 100% 0, 100% 100%, 100% 100%, 0 100%)',
              }}>
              <div className="flex gap-2">
                <span className="text-[#5f5f5f]">Ethereum</span>
                {etherAddress && shortenAddress(etherAddress)}
              </div>
              {etherAddress ? (
                <SmallLabel onClick={() => ethDisconnect()}>
                  {'Disconnect'}
                </SmallLabel>
              ) : (
                <SmallLabel onClick={() => open()}>{'Connect'}</SmallLabel>
              )}
              <div className="flex gap-2">
                <span className="text-[#5f5f5f]">Solana</span>
                {solAddress && shortenAddress(solAddress.toBase58())}
              </div>
              {solAddress ? (
                <SmallLabel onClick={() => solDisconnect()}>
                  {'Disconnect'}
                </SmallLabel>
              ) : (
                <SmallLabel onClick={() => setVisible(true)}>
                  {'Connect'}
                </SmallLabel>
              )}
            </div>
          </div>
        )}
        {loading && <Loading />}
        <div className="relative h-full w-full max-lg:h-[inherit]">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
