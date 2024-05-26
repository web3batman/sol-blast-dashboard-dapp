'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeButton from '../shared/HomeButton';
import LeaderboardButton from '../shared/LeaderboardButton';
import RewardsButton from '../shared/RewardsButton';
import { usePathname } from 'next/navigation';
import AboutButton from '../shared/AboutButton';
import { useOnceEffect } from '@/hook/useOnceEffect';

export const HeaderButtons = () => {
  const [activePath, setActivePath] = useState<string>();
  const router = useRouter();
  const pathname = usePathname();

  useOnceEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <div className="button-set flex gap-[3px] text-sm text-black">
      <HomeButton
        isActive={activePath === '/'}
        onClick={() => router.push('/')}
      />

      <LeaderboardButton
        isActive={activePath === '/leaderboard'}
        onClick={() => router.push('/leaderboard')}
      />

      {/* <AirdropsButton
        isActive={activePath === '/airdrops'}
        onClick={() => router.push('/airdrops')}
      /> */}

      <AboutButton
        isActive={activePath === '/about'}
        onClick={() => router.push('/about')}
      />

      <RewardsButton
        isActive={activePath === '/rewards'}
        onClick={() => router.push('/rewards')}
      />
    </div>
  );
};
