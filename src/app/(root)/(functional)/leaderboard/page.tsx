'use client';

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

import divider from '../../../../../public/divider.svg';
import LeaderboardTableRow from '@/components/ui/LeaderboardTableRow';
import { IUserPoint } from '@/config/types';
import { API_URL } from '@/config/const';
import { useOnceEffect } from '@/hook/useOnceEffect';

const LeaderboardPage = () => {
  const [users, setUsers] = useState<IUserPoint[]>([]);

  const getPoints = async () => {
    console.log('calling getPoints...');
    const res = await axios
      .get(`${API_URL}/v1/points?page=1&limit=20`)
      .then((r) => r.data);
    setUsers(res.records);
  };

  useOnceEffect(() => {
    getPoints();
  }, []);

  return (
    <main className="relative h-[inherit] w-full">
      <div className="flex h-full w-full flex-col px-[50px] max-md:px-0">
        <div className="flex w-full items-center justify-between gap-1 max-lg:mb-8 max-lg:flex-col max-lg:gap-9 2xl:gap-6">
          <h1 className="text-left text-[28px] font-bold uppercase leading-[81px] tracking-[0.04em] text-whiteyellow max-2xl:text-[40px] max-sm:text-2xl">
            LEADERBOARD
          </h1>
          <h5 className="text-[13px] uppercase text-whiteyellow">
            Bridge & Invite friends to rank up
          </h5>
        </div>

        <div className="h-full overflow-x-auto">
          <div className="custom-scrollbar flex h-[inherit] w-full flex-col gap-3 overflow-y-auto">
            <div className="grid grid-cols-[minmax(150px,20%)_minmax(300px,30%)_minmax(350px,35%)_minmax(200px,15%)]">
              <h3 className="text-style overflow-hidden overflow-ellipsis whitespace-nowrap border-y border-lightyellow border-opacity-30 py-4 pl-2 text-whiteyellow">
                RANK
              </h3>
              <h3 className="text-style overflow-hidden overflow-ellipsis whitespace-nowrap border-y border-lightyellow border-opacity-30 py-4 text-whiteyellow">
                NAME
              </h3>
              <h3 className="text-style overflow-hidden overflow-ellipsis whitespace-nowrap border-y border-lightyellow border-opacity-30 py-4 text-whiteyellow">
                INVITED BY
              </h3>
              <h3 className="text-style overflow-hidden overflow-ellipsis whitespace-nowrap border-y border-lightyellow border-opacity-30 py-4 pr-5 text-whiteyellow">
                POINTS
              </h3>
            </div>
            <div className="">
              {users.map((item, idx) => (
                <div key={idx}>
                  <LeaderboardTableRow
                    rank={item.rank}
                    userProfilePicture={item.user_twitter_picture_url}
                    name={item.user_twitter_handle}
                    invitedBy={item.invited_by}
                    points={item.points}
                    bgColor={
                      idx % 2 === 1 ? 'bg-whiteyellow bg-opacity-10' : ''
                    }
                  />
                </div>
              ))}
            </div>
            {/* 
            <div className="custom-scrollbar flex h-[440px] w-full flex-col gap-3 overflow-y-scroll pr-3 2xl:h-[680px]">
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
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className="col-span-3 mt-10 flex gap-6">
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
      </div> */}
    </main>
  );
};

export default LeaderboardPage;
