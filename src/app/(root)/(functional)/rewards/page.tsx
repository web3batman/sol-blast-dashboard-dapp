'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAccount as useEtherAccount, useSignMessage } from 'wagmi';

import RectangleButton from '@/components/ui/RectangleButton';
import ReferralLinkRow from '@/components/ui/ReferralLinkRow';
import BridgeModal from '@/components/ui/bridge-modal';
import Loading from '@/components/ui/Loading';
import AirdropsMissionRow from '@/components/shared/AirdropsMissionRow';
import PasswordModal from '@/components/ui/PasswordModal';
import { useApp } from '@/context';
import { useOnceEffect } from '@/hook/useOnceEffect';
import api from '@/service/api';

import bridgeMoreButton from '../../../../../public/bridge-more-button.svg';
import tweetForPoints from '../../../../../public/tweet-for-points-button.png';

const RewardsPage = () => {
  const searchParams = useSearchParams();
  const {
    token,
    userId,
    walletName,
    setWalletName,
    loading,
    setLoading,
    hasAccess,
    setHasAccess,
    isLoggedIn,
    setIsLoggedIn,
    setWalletModalOpen,
    user,
    setUser,
    handleMsgSign,
    userPoints,
    setUserPoints,
    setUserRank,
  } = useApp();
  const { setVisible: setSolanaWalletVisible } = useWalletModal();
  const { buttonState, onConnect } = useWalletMultiButton({
    onSelectWallet() {
      setSolanaWalletVisible(true);
    },
  });
  const { publicKey: solanaAddress } = useWallet();
  const { address: etherAddress } = useEtherAccount();

  const [isBridgeModalOpen, setIsBridgeModalOpen] = useState<boolean>(false);
  const [isContinue, setIsContinue] = useState<boolean>(true);
  const [records, setRecords] = useState<any[]>([]);
  const [walletExist, setWalletExist] = useState<string>('');

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

    console.log({ authUrl });

    window.location.href = authUrl.url.toString();
  };

  const handleTwitterAuth = async (state: string, code: string) => {
    const result = await api
      .get(`/users/twitter-oauth2-callback?state=${state}&code=${code}`)
      .then((res) => res.data);
    if (result.ok) {
      setIsContinue(true);
    }
  };

  const handleGetUserProfile = useCallback(async () => {
    if (!userId) return;

    try {
      const [userData, pointsData, invitationCodes] = await Promise.all([
        api.get(`/users/${userId}`).then((res) => res.data),
        api.get(`/points/${userId}`).then((res) => res.data),
        api
          .get(`/invitation-codes`, {
            params: { page: 1, limit: 20 },
          })
          .then((res) => res.data.records),
      ]);

      console.log('invitationCodes', invitationCodes);

      setUser(userData);
      setUserPoints(pointsData.points);
      setUserRank(pointsData.rank);
      setRecords(invitationCodes);

      if (userData.twitter_handle) {
        setIsLoggedIn(false);
        setHasAccess(true);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Handle error, e.g., show error message to the user
    }
  }, [userId]);

  const handleContinue = async () => {
    if (user.ethereum_address && user.solana_address) {
      setIsLoggedIn(false);
      setHasAccess(true);
    } else if (user.ethereum_address) {
      setWalletExist('ethereum_address');
      if (!walletName) {
        setWalletName('Phantom');
      }
      if (onConnect) onConnect();
      // const newAddress = await api
      //   .post(`/users/${userId}/associate-address`)
      //   .then((res) => res.data);
      // console.log({ newAddress });
    }
  };

  const handleSetAssociateAddress = async () => {
    try {
      if (walletExist === 'ethereum_address' && solanaAddress) {
        const msg = await handleMsgSign('Sol');
        await api
          .post(`/users/${userId}/associate-address`, {
            public_address: solanaAddress,
            signed_message: msg,
            signed_on: 'Sol',
          })
          .then((res) => res.data);
        handleGetUserProfile();
      } else if (walletExist === 'solana_address' && etherAddress) {
        const msg = await handleMsgSign('Eth');
        await api
          .post(`/users/${userId}/associate-address`, {
            public_address: etherAddress,
            signed_message: msg,
            signed_on: 'Eth',
          })
          .then((res) => res.data);
        handleGetUserProfile();
      }
    } catch (err) {
      console.error(err);
    }
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

  useEffect(() => {
    handleGetUserProfile();
  }, [userId]);

  useEffect(() => {
    handleSetAssociateAddress();
  }, [solanaAddress, etherAddress]);

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

  if (isLoggedIn) {
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
          <Image src="/world-bg.png" alt="" width={500} height={500} />
        </div>
      </div>
    );
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
                {user.eth_deposited}
              </h5>
              <Image src="/icons/eth.svg" alt="bridge" width={20} height={32} />
            </div>
            <div className="flex items-center justify-center gap-2">
              <h5 className="text-left text-4xl font-medium leading-[54px] tracking-[0.08em]">
                {user.sol_deposited}
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
                {user.usdc_deposited}
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
            {userPoints}
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
                src={user.twitter_picture_url}
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
                      #{user.id}
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
                      {`${new Date(user.joined_at).getDate()} / ${new Date(user.joined_at).getMonth() + 1} / ${new Date(user.joined_at).getFullYear()}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-left text-lg font-normal leading-[20.95px] text-darkWhite">
                @{user.twitter_handle}
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
                    href="https://twitter.com/intent/tweet?text=Hello%20world"
                    className="transition-all hover:opacity-85">
                    <Image src={tweetForPoints} alt="button" />
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
      </div>
    </main>
  );
};

export default RewardsPage;
