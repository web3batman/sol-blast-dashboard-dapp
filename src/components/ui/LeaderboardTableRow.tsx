'use client';

import React from 'react';
import Image from 'next/image';

interface LeaderboardTableRowProps {
  rank: number;
  name: string;
  userProfilePicture: string;
  invitedBy: string;
  points: number;
}

const LeaderboardTableRow = ({
  rank,
  name,
  userProfilePicture,
  invitedBy,
  points,
}: LeaderboardTableRowProps) => {
  return (
    <div className="flex cursor-pointer items-center justify-between bg-transparent text-darkWhite">
      <div className=" grid w-full grid-cols-4 items-center justify-between gap-6 p-3 py-6">
        <h3 className="text-left text-lg font-medium uppercase leading-[8px] tracking-[0.06em] text-lightyellow">
          {rank}
        </h3>
        <div className=" flex items-center gap-2">
          {userProfilePicture && (
            <Image
              unoptimized
              alt="icon"
              width={59}
              height={59}
              className="rounded-full"
              src={userProfilePicture}
            />
          )}
          {name}
        </div>
        <h3 className="text-left text-lg font-medium uppercase leading-[8px] tracking-[0.06em]">
          {invitedBy}
        </h3>
        <h3 className="text-left text-lg font-medium uppercase leading-[8px] tracking-[0.06em]">
          {points!.toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

export default LeaderboardTableRow;
