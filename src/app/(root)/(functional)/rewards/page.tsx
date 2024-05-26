'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { FaXTwitter } from 'react-icons/fa6';
import { useDisconnect, useAccount as useEtherAccount } from 'wagmi';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';

import RectangleButton from '@/components/ui/RectangleButton';
import ReferralLinkRow from '@/components/ui/ReferralLinkRow';
import BridgeModal from '@/components/ui/bridge-modal';
import AirdropsMissionRow from '@/components/shared/AirdropsMissionRow';
import PasswordModal from '@/components/ui/PasswordModal';
import { useApp } from '@/context';
import { useOnceEffect } from '@/hook/useOnceEffect';
import api from '@/service/api';
import { BridgeButton } from '@/components/ui/icon/icons/BridgeButton';

import { Tooltip } from 'react-tooltip';
import RewardModal from '@/components/ui/reward-modal';

const RewardsPage = () => {
  const searchParams = useSearchParams();
  const {
    token,
    userId,
    setLoading,
    txLoading,
    hasAccess,
    isLoggedIn,
    setIsLoggedIn,
    setWalletModalOpen,
    user,
    userPoints,
    records,
    userRank,
    isBridgeModalOpen,
    setIsBridgeModalOpen,
    handleGetUserProfile,
    isContinue,
    setIsContinue,
  } = useApp();

  const { address: etherAddress } = useEtherAccount();
  const { disconnect: ethDisconnect } = useDisconnect();
  const { publicKey: solAddress, disconnect: solDisconnect } =
    useSolanaWallet();

  const modalRef = useRef(null); // Ref for the modal element

  const handlePasswordSubmit = async (password: string) => {
    if (password) {
      try {
        setLoading(true);
        const res = await api
          .get(`/invitation-codes/${password}/valid`)
          .then((r) => r.data);
        console.log({ res });
        if (res) {
          setIsLoggedIn(true);
          // setHasAccess(true);
        } else {
          toast.error('Invalid invite code. Try another.');
          // setHasAccess(false);
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

  const handleTwitterSign = async () => {
    const authUrl = await api
      .get('/users/twitter-oauth2-link')
      .then((res) => res.data);

    window.location.href = authUrl.url.toString();
  };

  const handleTwitterAuth = async (state: string, code: string) => {
    const result = await api
      .get(`/users/twitter-oauth2-callback?state=${state}&code=${code}`)
      .then((res) => res.data);
    if (result.ok) {
      // setIsContinue(true);
      handleGetUserProfile();
    }
  };

  const handleContinue = async () => {
    setIsLoggedIn(false);
    setIsContinue(true);
  };

  const handleLogout = async () => {
    if (etherAddress && solAddress) {
      ethDisconnect();
      solDisconnect();
    } else {
      if (etherAddress) ethDisconnect();
      else if (solAddress) solDisconnect();
    }

    setIsContinue(false);
  };

  useOnceEffect(() => {
    const state = searchParams.get('state');
    const code = searchParams.get('code');
    if (state && code) {
      handleTwitterAuth(state, code);
      const urlWithoutParams = window.location.pathname;
      history.replaceState(null, '', urlWithoutParams);
    }
  }, [searchParams]);

  useOnceEffect(() => {
    handleGetUserProfile();
  }, [userId, isContinue]);

  useOnceEffect(() => {
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

  const [active, setActive] = useState<boolean>(isLoggedIn);

  const closeViewModal = () => {
    setActive(false);
  };

  useEffect(() => {
    setActive(isLoggedIn);
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return (
      <>
        <div className="flex h-[inherit] flex-col gap-6 overflow-hidden px-10 pt-7 max-sm:px-7">
          <div className="flex flex-col">
            <h5 className="text-left text-[12px] font-bold tracking-[0.04em] text-whiteyellow max-2xl:text-[18px] max-xl:text-base max-sm:text-xs">
              YOU ARE ALMOST THERE
            </h5>
            <h1 className="text-left text-[28px] font-bold tracking-[0.04em] text-whiteyellow max-2xl:text-[40px] max-xl:text-3xl max-md:text-2xl max-sm:text-lg">
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
                completed={!!hasAccess}
                title="Follow us on Twitter"
                buttonText={'Follow Twitter'}
                onClick={handleTwitterSign}
              />
              {hasAccess && (
                <AirdropsMissionRow
                  completed={false}
                  buttonText={'Continue'}
                  onClick={handleContinue}
                />
              )}
            </div>
            <Image
              src="/world-bg.png"
              alt=""
              width={500}
              height={500}
              className="max-lg:hidden"
            />
          </div>
        </div>
        {active && <RewardModal closeModal={closeViewModal} />}
      </>
    );
  } else if (!isContinue) {
    return <PasswordModal onPasswordSubmit={handlePasswordSubmit} />;
  } else
    return (
      <main className="grid h-[inherit] w-full grid-cols-[3fr_6fr_4fr] gap-x-3 [grid-template-areas:'total_profile_tweet''points_link_link'] max-xl:grid-cols-[3fr_5fr_3fr] max-lg:grid-cols-2 max-lg:[grid-template-areas:'profile_total''points_tweet''link_link'] max-md:grid-cols-1 max-md:[grid-template-areas:'profile''total''points''tweet''link']">
        <div className="relative flex flex-col items-center gap-[clamp(0.5vw,3.3vh,2vw)] py-6 pr-6 text-whiteyellow [grid-area:total] after:absolute after:right-0 after:top-0 after:h-full after:w-2 after:bg-[url('/dividers/rewards-page-middle-divider.svg')] after:bg-top after:content-[''] max-lg:h-full max-lg:justify-between max-lg:gap-4 max-lg:after:bg-none max-md:before:absolute max-md:before:bottom-0 max-md:before:left-0 max-md:before:h-2 max-md:before:w-full max-md:before:bg-[url('/dividers/rewards-page-right-top-divider.svg')] max-md:before:bg-left max-md:before:content-['']">
          <h3 className="text-center text-3xl font-bold uppercase leading-9 tracking-[0.08em] max-2xl:text-2xl max-lg:text-xl">
            Total bridged
          </h3>
          <div className="flex w-full flex-col gap-4 max-lg:flex-row max-lg:justify-center">
            <div className="flex items-center justify-center gap-2">
              <h5 className="text-left text-[clamp(0.5vw,3.5vh,1.5vw)] font-medium leading-[clamp(0.5vw,3.5vh,1.5vw)] tracking-[0.08em] max-md:text-base">
                {user.eth_deposited.toString().includes('.')
                  ? user.eth_deposited.toFixed(3)
                  : user.eth_deposited}
              </h5>
              <Image src="/icons/eth.svg" alt="bridge" width={20} height={32} />
            </div>
            <div className="flex items-center justify-center gap-2">
              <h5 className="text-left text-[clamp(0.5vw,3.5vh,1.5vw)] font-medium leading-[clamp(0.5vw,3.5vh,1.5vw)] tracking-[0.08em] max-md:text-base">
                {user.sol_deposited.toString().includes('.')
                  ? user.sol_deposited.toFixed(3)
                  : user.sol_deposited}
              </h5>
              <Image
                alt="bridge"
                src="/icons/solana.svg"
                width={20}
                height={32}
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <h5 className="text-left text-[clamp(0.5vw,3.5vh,1.5vw)] font-medium leading-[clamp(0.5vw,3.5vh,1.5vw)] tracking-[0.08em] max-md:text-base">
                {user.usdc_deposited.toString().includes('.')
                  ? user.usdc_deposited.toFixed(3)
                  : user.usdc_deposited}
              </h5>
              <Image src="/icons/usd.svg" alt="bridge" width={20} height={32} />
            </div>
          </div>
          <>
            <button
              onClick={openModal}
              className="bridge-tooltip relative drop-shadow-[3.5px_3.5px_0_#F8EF00] transition-all hover:opacity-85">
              <BridgeButton width={160} height={45} />
              <h5 className="chakra-petch absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap text-[clamp(0.5vw,1.6vh,1.5vw)] font-semibold tracking-[3.2px] text-[#010101] max-md:text-base">
                BRIDGE MORE
              </h5>
            </button>
            <Tooltip
              anchorSelect=".bridge-tooltip"
              place="top"
              className="relative z-50 max-w-80">
              <h4 className="text-base text-whiteyellow">
                NOTE: DEPOSITS ARE IRREVERSIBLE AND ETH, SOL, USDC WILL NOT BE
                RETURNED. RECEIPT TOKEN WILL BE ISSUED AS $L2 TOKEN
              </h4>
            </Tooltip>
            {isBridgeModalOpen && <BridgeModal closeModal={closeModal} />}
          </>
        </div>
        <div className="relative flex flex-col gap-5 py-6 pr-6 [grid-area:profile] after:absolute after:right-0 after:top-0 after:h-full after:w-2 after:bg-[url('/dividers/rewards-page-right-middle-divider.svg')] after:bg-no-repeat after:content-[''] max-lg:py-6 max-md:py-6 max-md:before:absolute max-md:before:bottom-0 max-md:before:left-0 max-md:before:h-2 max-md:before:w-full max-md:before:bg-[url('/dividers/rewards-page-right-top-divider.svg')] max-md:before:bg-no-repeat max-md:before:content-[''] max-md:after:hidden">
          <h3 className="text-left text-3xl font-bold uppercase leading-9 tracking-[0.08em] text-whiteyellow max-2xl:text-2xl max-lg:text-xl">
            Your profile
          </h3>
          <div className="mt-2 flex items-center justify-between gap-7 max-lg:gap-2">
            <Image
              src={user.twitter_picture_url ? user.twitter_picture_url : ''}
              alt="user"
              width={227}
              height={218}
              className="max-lg:max-w-20"
            />
            <div className="flex h-full w-full flex-col justify-between py-1.5">
              <div className="grid grid-cols-2 gap-4 max-xl:grid-cols-1 max-xl:grid-rows-1 max-xl:gap-2">
                <div className="grid-row-2 grid gap-3 max-xl:grid-cols-[1fr_auto]">
                  <h3 className="text-left text-[21px] font-normal leading-[24.44px] text-whiteyellow max-xl:text-lg">
                    Rank
                  </h3>
                  <span className="text-nowrap text-left text-lg font-normal leading-[20.95px] text-darkWhite max-xl:text-sm">
                    #{userRank}
                  </span>
                </div>
                <div className="grid-row-2 grid gap-3 max-xl:grid-cols-[1fr_auto]">
                  <h3 className="min-w-[110px] text-left text-[21px] font-normal leading-[24.44px] text-whiteyellow max-xl:text-lg">
                    Join Date
                  </h3>
                  <span className="text-nowrap text-left text-lg font-normal leading-[20.95px] text-darkWhite max-xl:text-sm">
                    {`${new Date(user.joined_at).getDate()} / ${new Date(user.joined_at).getMonth() + 1} / ${new Date(user.joined_at).getFullYear()}`}
                  </span>
                </div>
                <div className="grid-row-2 grid gap-3 max-xl:grid-cols-[1fr_auto]">
                  <h3 className="min-w-[140px] text-left text-[21px] font-normal leading-[24.44px] text-whiteyellow max-xl:text-lg">
                    Amount of swaps
                  </h3>
                  <span className="text-nowrap text-left text-lg font-normal leading-[20.95px] text-darkWhite max-xl:text-sm">
                    {user.amount_of_swaps}
                  </span>
                </div>
                <div className="grid-row-2 grid gap-3 max-xl:grid-cols-[1fr_auto]">
                  <h3 className="min-w-[140px] text-left text-[21px] font-normal leading-[24.44px] text-whiteyellow max-xl:text-lg">
                    Amount invited
                  </h3>
                  <span className="text-nowrap text-left text-lg font-normal leading-[20.95px] text-darkWhite max-xl:text-sm">
                    {user.amount_invited}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-row-2 grid gap-3 max-xl:grid-cols-[1fr_auto]">
            <span className="text-nowrap text-left text-lg font-normal leading-[20.95px] text-darkWhite max-xl:text-sm">
              @{user.twitter_handle}
            </span>
          </div>
          <div className="absolute bottom-5 right-5">
            <button
              className="relative drop-shadow-[3.5px_3.5px_0_#F8EF00] transition-all hover:opacity-85"
              onClick={handleLogout}>
              <BridgeButton width={120} height={40} />
              <h5 className="chakra-petch absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap text-[clamp(0.5vw,1.6vh,1.5vw)] font-semibold tracking-[3.2px] text-[#010101] max-md:text-base">
                LOGOUT
              </h5>
            </button>
          </div>
        </div>
        <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-5 p-6 [grid-area:tweet] max-lg:before:absolute max-lg:before:top-0 max-lg:before:h-2 max-lg:before:w-full max-lg:before:bg-[url('/dividers/rewards-page-left-divider.svg')] max-lg:before:bg-cover max-lg:before:bg-no-repeat max-lg:before:content-['']">
          <RectangleButton
            text="Earn Extra Points"
            onClick={() => {}}
            buttonClassName="w-full gap-4"
          />
          <div>
            <p className="pl-3 text-left text-sm font-bold leading-[21px] tracking-[0.08em] text-[#FFFDBF8C]">
              Earn a points bonus by posting on X and spreading the word
            </p>
            <p className="pl-3 pt-8 text-left text-sm font-bold leading-[21px] tracking-[0.08em] text-[#FFFDBF8C] max-md:pt-5">
              This is only valid once
            </p>
          </div>
          <Link
            href="https://twitter.com/intent/tweet?text=Hello%20world"
            className="flex items-center justify-center transition-all hover:opacity-85">
            <button className="relative drop-shadow-[3.5px_3.5px_0_#F8EF00] transition-all hover:opacity-85">
              <BridgeButton width={130} height={40} />
              <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-around">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
                  <FaXTwitter size={20} color="white" />
                </div>
                <h5 className="chakra-petch text-nowrap text-[clamp(0.5vw,1.6vh,1.5vw)] font-semibold uppercase tracking-[3.2px] text-[#010101] max-lg:text-base">
                  Post
                </h5>
              </div>
            </button>
          </Link>
        </div>
        <div className="relative flex flex-col items-center justify-center gap-[clamp(0.2vw,2.5vh,1.5vw)] py-6 pr-6 text-whiteyellow [grid-area:points] before:absolute before:top-0 before:h-2 before:w-full before:bg-[url('/dividers/rewards-page-left-divider.svg')] before:bg-cover before:bg-no-repeat before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-2 after:bg-[url('/dividers/rewards-page-middle-divider.svg')] after:bg-bottom after:content-[''] max-lg:before:left-0 max-lg:after:bg-[url('/dividers/rewards-page-right-middle-divider.svg')] max-md:before:bg-none">
          <Image
            src="/icons/calendar.svg"
            alt="calendar"
            width={80}
            height={76}
            className="h-full max-h-[clamp(0.7vw,8vh,3vw)] max-lg:max-h-12"
          />
          <h2 className="text-center text-3xl font-bold uppercase leading-9 tracking-[0.08em] max-2xl:text-2xl">
            Accumulated points
          </h2>
          <span className="text-left text-[clamp(0.7vw,3.5vh,2vw)] font-bold leading-[clamp(0.7vw,3.5vh,2vw)] tracking-[0.08em] text-lightyellow max-md:text-xl">
            {userPoints}
          </span>
        </div>
        <div className="relative h-full overflow-x-auto py-6 [grid-area:link] before:absolute before:top-0 before:h-2 before:w-full before:bg-[url('/dividers/rewards-page-right-top-divider.svg')] before:bg-cover before:bg-no-repeat before:content-[''] max-lg:overflow-x-clip">
          <div className="flex h-full w-full flex-col gap-3">
            <h3 className="text-left text-3xl font-bold uppercase leading-9 tracking-[0.08em] text-whiteyellow max-2xl:text-2xl max-lg:text-xl">
              Invite your exit liquidity
            </h3>
            <div className="custom-scrollbar flex flex-col gap-4 overflow-y-scroll pr-3 max-lg:max-h-56">
              {records.length > 0 &&
                records.map((r, i) => (
                  <ReferralLinkRow
                    key={i}
                    imageUrl="/elipse-placeholder.png"
                    title="Invite Available"
                    link={r.code}
                  />
                ))}
            </div>
          </div>
        </div>
        {txLoading && (
          <div className="absolute flex h-full w-full items-center justify-center backdrop-blur-[3px]">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] text-[#f9ef00] motion-reduce:animate-[spin_1.5s_linear_infinite]">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
      </main>
    );
};

export default RewardsPage;
