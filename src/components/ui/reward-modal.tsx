import Image from 'next/image';
import React, { useRef } from 'react';
import { useOnceEffect } from '@/hook/useOnceEffect';

const RewardModal = ({ closeModal }: { closeModal: any }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnceEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#1a190681] backdrop-blur-[5px]">
      <div className="drop-shadow-[0_0_2px_#F8EF00]">
        <div ref={modalRef} className="bg-[#201F07]">
          <div className="max-w-[600px] shadow-whiteyellow drop-shadow-xl max-md:max-w-[400px] max-sm:max-w-[300px]">
            <h4 className="relative pb-5 pt-3 text-center text-3xl font-bold uppercase leading-9 tracking-[0.08em] text-whiteyellow after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:bg-[url('/dividers/rewards-page-right-top-divider.svg')] after:content-[''] max-2xl:text-2xl max-lg:text-xl">
              Invite your Exit Liquidity
            </h4>
            <div className="rounded-md bg-[#151910] p-3 backdrop-blur-[2px]">
              <h4 className="relative mt-8 pb-5 text-left text-2xl font-bold capitalize leading-9 tracking-[0.08em] text-whiteyellow max-2xl:text-xl max-lg:text-lg">
                We Make Farming your friends fun
              </h4>
              <h4>
                You get points when your invites earn points and when their
                invites earn points. You get +5% bonus points when your invites
                earn points. and +1% when their invites earn points. This is
                complex and rewarding rewards program. It is NOT a pyramid
                scheme.
              </h4>
              <Image
                src="/piramid.png"
                alt=""
                width={350}
                height={500}
                className="m-auto mt-4 max-sm:w-[250px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardModal;
