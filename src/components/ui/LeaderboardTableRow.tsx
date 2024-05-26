'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface LeaderboardTableRowProps {
  rank: number;
  name: string;
  userProfilePicture: string;
  invitedBy: string;
  points: number;
  bgColor: string;
}

const LeaderboardTableRow = ({
  rank,
  name,
  userProfilePicture,
  invitedBy,
  points,
  bgColor,
}: LeaderboardTableRowProps) => {
  return (
    // <div className="flex cursor-pointer items-center justify-between bg-transparent text-darkWhite">
    <div className="grid w-full grid-cols-[minmax(150px,20%)_minmax(300px,30%)_minmax(350px,35%)_minmax(200px,15%)] items-center">
      <h3
        className={clsx(
          'flex h-full items-center py-6 pl-2 text-left text-lg font-medium uppercase tracking-[0.06em] text-lightyellow',
          bgColor,
        )}>
        {rank}
      </h3>
      <div
        className={clsx(
          'flex h-full items-center gap-2 overflow-hidden overflow-ellipsis whitespace-nowrap py-6',
          bgColor,
        )}>
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
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {name}
        </p>
      </div>
      <h3
        className={clsx(
          'flex h-full items-center overflow-hidden overflow-ellipsis whitespace-nowrap text-left text-lg font-medium uppercase tracking-[0.06em]',
          bgColor,
        )}>
        {invitedBy}
      </h3>
      <h3
        className={clsx(
          'flex h-full items-center text-left text-lg font-medium uppercase tracking-[0.06em]',
          bgColor,
        )}>
        {points!.toLocaleString()}
      </h3>
    </div>
    // </div>
  );
};

export default LeaderboardTableRow;
