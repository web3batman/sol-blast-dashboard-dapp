'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

import divider from '../../../../../public/divider.svg';
import LeaderboardTableRow from '@/components/ui/LeaderboardTableRow';
import { IUserPoint } from '@/config/types';
import { API_URL } from '@/config/const';
import { useApp } from '@/context';

const LeaderboardPage = () => {
  const { setUserPoints, setUserRank } = useApp();
  const [users, setUsers] = useState<IUserPoint[]>([]);

  const data = [
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
    {
      rank: '01',
      profilePicture: '/user.png',
      name: '@ghostythedev',
      invitedBy: '@mustang',
      points: '2,137,367,124',
      gold: '0.00',
    },
  ];
  const exit_liquidity = [
    {
      profile_image: '/user.png',
      name: '@GhostyTheDev',
      amount: 'Paperhanded 10 SOL at $70',
      time: '10 MINS AGO',
    },
    {
      profile_image: '/user.png',
      name: '@GhostyTheDev',
      amount: 'Paperhanded 10 SOL at $70',
      time: '10 MINS AGO',
    },
    {
      profile_image: '/user.png',
      name: '@GhostyTheDev',
      amount: 'Paperhanded 10 SOL at $70',
      time: '10 MINS AGO',
    },
    {
      profile_image: '/user.png',
      name: '@GhostyTheDev',
      amount: 'Paperhanded 10 SOL at $70',
      time: '10 MINS AGO',
    },
  ];
  const user = {
    rank: '01',
    profilePicture: '/user.png',
    name: '@ghostythedev',
    invitedBy: '@mustang',
    points: '2,137,367,124',
    gold: '0.00',
  };

  const getPoints = async () => {
    const res = await axios
      .get(`${API_URL}/v1/points?page=1&limit=20`)
      .then((r) => r.data);

    const newPoints = await axios
      .get(`${API_URL}/v1/points/66211bb111ece1a5649017d6`)
      .then((r) => r.data);
    console.log({ newPoints });
    // res.metadata.documents_count > res.metadata.limit

    setUsers(res.records);
  };

  useEffect(() => {
    getPoints();
  }, []);

  return (
    <main className="relative grid h-full w-full grid-cols-12 justify-between gap-8 ">
      <div className="col-span-9 flex gap-2">
        <div className="w-full">
          <div className="flex w-full items-center justify-between gap-1 2xl:gap-10">
            <h1 className="text-left text-[28px] font-bold uppercase leading-[81px] tracking-[0.04em] text-whiteyellow max-2xl:text-[40px]">
              LEADERBOARD
            </h1>
            <h5 className="text-[13px] uppercase text-whiteyellow">
              Bridge & Invite friends to{' '}
              <span className=" text-lightyellow">rank up</span>
            </h5>
          </div>

          <div className="flex h-full w-full flex-col gap-3">
            <div className="grid w-full grid-cols-4 items-center justify-between gap-6 border-y border-lightyellow border-opacity-30 p-3 py-7 pr-10">
              <h3 className="text-left text-lg font-medium uppercase leading-[8px] tracking-[0.06em] text-whiteyellow">
                RANK
              </h3>
              <h3 className="text-left text-lg font-medium uppercase leading-[8px] tracking-[0.06em] text-whiteyellow">
                NAME
              </h3>

              <h3 className="text-left text-lg font-medium uppercase leading-[8px] tracking-[0.06em] text-whiteyellow">
                INVITED BY
              </h3>
              <h3 className="text-left text-lg font-medium uppercase leading-[8px] tracking-[0.06em] text-whiteyellow">
                POINTS
              </h3>
            </div>
            <div className="custom-scrollbar flex h-[440px] w-full flex-col gap-3 overflow-y-scroll pr-3 2xl:h-[680px]">
              {/* <div className="bg-lightyellow bg-opacity-30">
                <LeaderboardTableRow
                  rank={user.rank}
                  userProfilePicture={user.profilePicture}
                  name={user.name}
                  invitedBy={user.invitedBy}
                  points={user.points}
                  gold={user.gold}
                />
              </div> */}
              {users.map((item, idx) => (
                <div
                  key={idx}
                  className={
                    idx % 2 === 1 ? 'bg-whiteyellow bg-opacity-10' : ''
                  }>
                  <LeaderboardTableRow
                    rank={item.rank}
                    userProfilePicture={item.user_twitter_picture_url}
                    name={item.user_twitter_handle}
                    invitedBy={item.invited_by}
                    points={item.points}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 mt-10 flex gap-6">
        <Image className="h-[80%]" src={divider} alt="divider" />

        <div>
          <h2 className="pb-6 text-[32px] text-whiteyellow">
            Recent Exit Liquidity
          </h2>
          <div className=" gap-12">
            {exit_liquidity.map((entry, index) => (
              <div
                key={index}
                className={
                  index % 2 === 1
                    ? 'mb-5 ml-3 mr-3 gap-4 bg-whiteyellow bg-opacity-20'
                    : 'mb-5 mr-3 gap-4 bg-whiteyellow bg-opacity-10'
                }
                style={{
                  contain: 'content',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 82%)',
                }}>
                <div className="top-0 flex items-center p-4  2xl:p-6">
                  <Image
                    className="mr-2"
                    width={40}
                    height={40}
                    src={entry.profile_image}
                    alt=""
                  />
                  <div className="">
                    <div className="flex justify-between gap-6">
                      <h4 className="text-[9px]  2xl:text-[13px]">
                        {entry.name}
                      </h4>
                      <p className="text-[9px] text-whiteyellow opacity-50  2xl:text-[13px]">
                        {entry.time}
                      </p>
                    </div>
                    <p className="text-[10px] text-whiteyellow opacity-50  2xl:text-[13px]">
                      {entry.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LeaderboardPage;
