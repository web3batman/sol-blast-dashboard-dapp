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
      <div className="grid w-full [grid-template-areas:'rank_name_invite_point'] items-center 
      grid-cols-[minmax(50px,250px)_minmax(250px,auto)_minmax(300px,1fr)_minmax(150px,250px)]
      max-xl:grid-cols-[minmax(50px,150px)_minmax(250px,auto)_minmax(300px,1fr)_minmax(100px,150px)]
      max-lg:grid-cols-[minmax(50px,70px)_minmax(220px,auto)_minmax(auto,220px)_minmax(100px,150px)]
      max-sm:grid-cols-[30px_minmax(auto,170px)_minmax(auto,170px)_minmax(10px,70px)] gap-6 max-md:gap-2 p-3 py-6">
        <h3 className="text-left text-lg font-medium uppercase tracking-[0.06em] text-lightyellow [grid-area:rank]">
          {rank}
        </h3>
        <div className="flex items-center gap-2 [grid-area:name] whitespace-nowrap overflow-hidden overflow-ellipsis">
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
          <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>

            {name}
          </p>
        </div>
        <h3 className="text-left text-lg font-medium uppercase tracking-[0.06em] [grid-area:invite] whitespace-nowrap overflow-hidden overflow-ellipsis">
          {invitedBy}
        </h3>
        <h3 className="text-left text-lg font-medium uppercase tracking-[0.06em] [grid-area:point]">
          {points!.toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

export default LeaderboardTableRow;
