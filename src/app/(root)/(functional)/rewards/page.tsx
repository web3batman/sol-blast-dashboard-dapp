'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

import RectangleButton from '@/components/ui/RectangleButton';
import ReferralLinkRow from '@/components/ui/ReferralLinkRow';
import BridgeModal from '@/components/ui/bridge-modal';
import { API_URL } from '@/config/const';
import Loading from '@/components/ui/Loading';
import { useApp } from '@/context';

import bridgeMoreButton from '../../../../../public/bridge-more-button.svg';
import tweetForPoints from '../../../../../public/tweet-for-points-button.png';

const PasswordModal = ({ onPasswordSubmit }: { onPasswordSubmit: any }) => {
  const { setWalletModalOpen } = useApp();

  const [inputs, setInputs] = useState(Array(6).fill(''));

  const handleInput = (char: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = char;
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    onPasswordSubmit(inputs.join(''));
  };

  return (
    <div className="inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-75">
      <div className=" justify-center bg-black py-5 text-center 2xl:py-16">
        <h2 className=" text-center text-[28px] font-semibold text-whiteyellow">
          ENTER YOUR CODE
        </h2>
        <p className="mx-auto w-3/4 pt-8 text-center text-[20px] text-whiteyellow text-opacity-50">{`PROCEED WITH CAUTION, WE DON'T KNOW WHAT'S ON THE OTHER SIDE.`}</p>
        <Image
          className="absolute left-1/2  -translate-x-1/2 transform"
          src={'/upper-layout-line.svg'}
          alt=""
          width={1000}
          height={79}></Image>
        <div className="mb-6 mt-24 flex w-full justify-center">
          <div className="flex justify-center space-x-4">
            {inputs.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleInput(e.target.value, index)}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 31% 100%, 0 76%)',
                }}
                className="outline-ligthyellow h-20 w-16 rounded-md border border-lightyellow border-opacity-15 bg-lightyellow bg-opacity-10 text-center text-3xl font-bold uppercase text-lightyellow focus:border-lightyellow focus:border-opacity-50 focus:outline-none"
                onInput={(e) => {
                  const currentInput = e.currentTarget;
                  if (currentInput.value) {
                    const nextInput =
                      currentInput.nextElementSibling as HTMLInputElement;
                    if (nextInput) {
                      nextInput.focus();
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace') {
                    const currentInput = e.currentTarget;
                    if (!currentInput.value) {
                      const previousInput =
                        currentInput.previousElementSibling as HTMLInputElement;
                      if (previousInput) {
                        previousInput.focus();
                      }
                    }
                  } else if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />
            ))}
          </div>
        </div>
        <Image
          className="absolute left-1/2 -translate-x-1/2 transform"
          src={'/lower-layout-line.svg'}
          alt=""
          width={1000}
          height={79}
        />
        <div className="flex justify-center">
          <button
            className="mt-10 h-[120px] w-[360px] items-center border-none bg-none p-0"
            onClick={handleSubmit}>
            <Image
              src={'/home-page-button.svg'}
              alt="home-page-button"
              width={360}
              height={1000}
            />
          </button>
        </div>
        <div className="mt-4">
          <p className="text-[#fffdbf80]">Already registered?</p>
          <button
            className="text-[#fffdbf]"
            onClick={() => setWalletModalOpen(true)}>
            Log in with your wallet
          </button>
        </div>
      </div>
    </div>
  );
};

const RewardsPage = () => {
  const router = useRouter();
  const { loading, setLoading, handleSign } = useApp();

  const [hasAccess, setHasAccess] = useState(false);
  const [isBridgeModalOpen, setIsBridgeModalOpen] = useState(false);
  const modalRef = useRef(null); // Ref for the modal element

  const handlePasswordSubmit = async (password: string) => {
    if (password) {
      try {
        setLoading(true);
        const res = await axios
          .get(`${API_URL}/v1/invitation-codes/${password.toUpperCase()}/valid`)
          .then((r) => r.data);
        console.log({ res });
        if (res) {
          router.push('/airdrops');
          setHasAccess(true);
        } else {
          toast.error('Invalid invite code. Try another.');
          setHasAccess(false);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const closeModal = () => {
    setIsBridgeModalOpen(false);
  };

  useEffect(() => {
    document.title = 'Rewards Page';
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsBridgeModalOpen(false);
      }
    };
    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Remove event listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openModal = () => {
    setIsBridgeModalOpen(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (!hasAccess) {
    return <PasswordModal onPasswordSubmit={handlePasswordSubmit} />;
  }

  return (
    <main className="grid h-full w-full grid-cols-9 items-start  px-5 py-0 2xl:py-5">
      <div className="relative col-span-3 flex h-full flex-col gap-12  pt-5 2xl:gap-36">
        <div className="relative flex flex-col items-center gap-5 text-whiteyellow">
          <h3 className="text-left text-[32px] font-bold uppercase leading-[48px] tracking-[0.08em]">
            Total bridged
          </h3>
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
              <h5 className="text-left text-4xl font-medium leading-[54px] tracking-[0.08em]">
                1.235
              </h5>
              <Image src="/icons/eth.svg" alt="bridge" width={20} height={32} />
            </div>
            <div className="flex items-center justify-center gap-2">
              <h5 className="text-left text-4xl font-medium leading-[54px] tracking-[0.08em]">
                40.625
              </h5>
              <Image
                alt="bridge"
                src="/icons/solana.svg"
                width={20}
                height={32}
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <h5 className="text-left text-4xl font-medium leading-[54px] tracking-[0.08em]">
                40,357.92
              </h5>
              <Image src="/icons/usd.svg" alt="bridge" width={20} height={32} />
            </div>
          </div>

          <>
            <button
              onClick={openModal}
              className="transition-all hover:opacity-85 2xl:pt-6">
              <Image
                src={bridgeMoreButton}
                alt="home-page-button"
                width={150}
                height={50}
                className="w-[130px] 2xl:w-[165px]"
              />
            </button>

            {isBridgeModalOpen && <BridgeModal closeModal={closeModal} />}
          </>

          <Image
            src="/dividers/rewards-page-left-divider.svg"
            height={8}
            width={200}
            alt="divider"
            className="absolute -bottom-8 w-full 2xl:-bottom-20"
          />
        </div>
        <div className="flex flex-col items-center gap-4 text-whiteyellow 2xl:gap-6">
          <Image
            src="/icons/calendar.svg"
            alt="calendar"
            width={80}
            height={76}
          />
          <h2 className="text-center text-3xl font-bold uppercase leading-[45px] tracking-[0.08em]">
            Accumulated points
          </h2>
          <span className="text-left text-[51px] font-bold leading-[76.5px] tracking-[0.08em] text-lightyellow">
            54,326
          </span>
        </div>
        <Image
          src="/dividers/rewards-page-middle-divider.svg"
          alt="divider"
          className="absolute -right-[7px] top-12 h-[90%] 2xl:top-0"
          width={8}
          height={200}
        />
      </div>
      <div className="col-span-6 pl-8">
        <div className="grid h-full w-full grid-cols-9">
          <div className="relative col-span-5 flex flex-col gap-3 py-9">
            <h3 className="text-left text-[32px] font-bold uppercase leading-[48px] tracking-[0.08em] text-whiteyellow">
              Your profile
            </h3>
            <div className="mt-2 flex items-center justify-between gap-7">
              <Image
                src="/profile-image-placeholder.png"
                alt="user"
                width={227}
                height={218}
              />
              <div className="flex h-full w-full flex-col justify-between py-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-left text-[21px] font-normal leading-[24.44px] text-whiteyellow">
                      Leaderboard
                    </h3>
                    <span className="text-left text-lg font-normal leading-[20.95px] text-darkWhite">
                      #1236
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-left text-[21px] font-normal leading-[24.44px] text-whiteyellow">
                      Total Invites
                    </h3>
                    <span className="text-left text-lg font-normal leading-[20.95px] text-darkWhite">
                      32
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex flex-col gap-3">
                    <h3 className="min-w-[140px] text-left text-[21px] font-normal leading-[24.44px] text-whiteyellow">
                      Join Date
                    </h3>
                    <span className="text-left text-lg font-normal leading-[20.95px] text-darkWhite">
                      03//17/24
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-left text-lg font-normal leading-[20.95px] text-darkWhite">
                @GhostyTheDev
              </span>
              <div className="flex items-center justify-start gap-4">
                <Link href="/rewards">
                  <Image
                    src="/icons/twitter.svg"
                    alt="edit"
                    width={21}
                    height={17}
                  />
                </Link>
                <Link href="/rewards">
                  <Image
                    src="/icons/telegram.svg"
                    alt="edit"
                    width={21}
                    height={17}
                  />
                </Link>
              </div>
            </div>
            <Image
              src="/dividers/rewards-page-right-middle-divider.svg"
              alt="divider"
              width={8}
              height={500}
              className="absolute -right-8 -top-0 h-[110%] 2xl:-top-10 2xl:h-[130%]"
            />
          </div>
          <div className="col-span-4 pl-14 pt-5 ">
            <div className="flex flex-col ">
              <RectangleButton
                text="Earn Extra Points"
                onClick={() => {}}
                buttonClassName="w-full gap-4"
              />
              <div className="flex flex-col">
                <Image
                  src="/icons/bright-twitter.svg"
                  alt="stack"
                  width={200}
                  height={110}
                  className="-ml-8 "
                />
                <div className="-mt-7 flex flex-col gap-5">
                  <span className="pl-3 text-left text-sm font-bold leading-[21px] tracking-[0.08em] text-[#FFFDBF8C]">
                    Earn points by sharing a tweet and spreading the word to
                    your followers!
                  </span>
                  <Link
                    href="/rewards"
                    className="transition-all hover:opacity-85">
                    <Image src={tweetForPoints} alt="button"></Image>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative col-span-6 mt-9 h-[8px] w-full 2xl:mt-[68px]">
          <Image
            src="/dividers/rewards-page-right-top-divider.svg"
            alt="divider"
            className="h-[8px] w-full"
            objectFit="cover"
            fill
          />
        </div>
        <div className="relative col-span-6 mt-4">
          <div className="flex h-full w-full flex-col gap-3">
            <h3 className="text-left text-[32px] font-bold uppercase leading-[48px] tracking-[0.08em] text-whiteyellow">
              referral Links
            </h3>
            <div className="custom-scrollbar flex h-[165px] flex-col gap-4 overflow-y-scroll pr-3 2xl:h-[380px]">
              <ReferralLinkRow
                imageUrl="/elipse-placeholder.png"
                title="Invite Available"
                link="l2.link.com/2321"
              />
              <ReferralLinkRow
                imageUrl="/elipse-placeholder.png"
                title="Invite Available"
                link="l2.link.com/2321"
              />
              <ReferralLinkRow
                imageUrl="/elipse-placeholder.png"
                title="Invite Available"
                link="l2.link.com/2321"
              />
              <ReferralLinkRow
                imageUrl="/elipse-placeholder.png"
                title="Invite Available"
                link="l2.link.com/2321"
              />
              <ReferralLinkRow
                imageUrl="/elipse-placeholder.png"
                title="Invite Available"
                link="l2.link.com/2321"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RewardsPage;
