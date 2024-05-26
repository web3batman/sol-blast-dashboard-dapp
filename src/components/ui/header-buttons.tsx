'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeButton from '../shared/HomeButton';
import LeaderboardButton from '../shared/LeaderboardButton';
import RewardsButton from '../shared/RewardsButton';
import { usePathname } from 'next/navigation';
import AboutButton from '../shared/AboutButton';
import { useOnceEffect } from '@/hook/useOnceEffect';
import { Icon } from './icon';
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';
import { clsx } from 'clsx';
import MobileButton from '../shared/MobileButton';
import { MobileSVGButton } from './icon/icons/TopMobileButton';
import { BsTelegram, BsTwitterX } from 'react-icons/bs';

export const HeaderButtons = () => {
  const [activePath, setActivePath] = useState<string>();
  const [activeToggle, setActiveToggle] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useOnceEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <>
      <div className="button-set flex gap-[3px] text-sm text-black max-lg:hidden">
        <HomeButton
          isActive={activePath === '/'}
          onClick={() => router.push('/')}
        />

        <LeaderboardButton
          isActive={activePath === '/leaderboard'}
          onClick={() => router.push('/leaderboard')}
        />

        <AboutButton
          isActive={activePath === '/about'}
          onClick={() => router.push('/about')}
        />

        <RewardsButton
          isActive={activePath === '/rewards'}
          onClick={() => router.push('/rewards')}
        />
      </div>
      <div className="flex lg:hidden">
        <div
          className="relative z-[999] cursor-pointer"
          onClick={() => setActiveToggle(!activeToggle)}>
          <MobileSVGButton
            width={50}
            height={48}
            color="#f9ef00"
            viewBox="0 0 50 48"
          />
          <RxHamburgerMenu
            size={36}
            color="black"
            className={clsx(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold',
              activeToggle ? 'hidden' : 'block',
            )}
          />
          <RxCross1
            size={36}
            color="black"
            className={clsx(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold',
              activeToggle ? 'block' : 'hidden',
            )}
          />
        </div>
        <div
          className={clsx(
            'absolute -right-full top-0 z-[998] h-full max-h-screen w-screen overflow-hidden bg-[rgba(0,0,0,0.2)] backdrop-blur-[5px] transition-all',
            activeToggle ? '-translate-x-full' : 'hidden translate-x-0',
          )}>
          <div className="absolute right-0 top-0 h-screen w-80 bg-black">
            <div className="flex flex-col items-center gap-2 pt-20 text-sm text-black">
              <MobileButton
                title="Home"
                isActive={activePath === '/'}
                onClick={() => {
                  router.push('/');
                  setActiveToggle(false);
                }}
              />

              <MobileButton
                title="Leaderboard"
                isActive={activePath === '/leaderboard'}
                onClick={() => {
                  router.push('/leaderboard');
                  setActiveToggle(false);
                }}
              />

              <MobileButton
                title="About"
                isActive={activePath === '/about'}
                onClick={() => {
                  router.push('/about');
                  setActiveToggle(false);
                }}
              />

              <MobileButton
                title="Rewards"
                isActive={activePath === '/rewards'}
                onClick={() => {
                  router.push('/rewards');
                  setActiveToggle(false);
                }}
              />

              <div className="mt-7 flex w-full items-center justify-around">
                <BsTwitterX size={32} color="white" />
                <BsTelegram size={32} color="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
