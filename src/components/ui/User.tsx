import React from 'react';
import Image from 'next/image';

interface UserProps {
  text: string;
}

const User = ({ text }: UserProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <Image
        src="/user.png"
        width={77}
        height={77}
        alt="user"
        className="cursor-pointer rounded-full opacity-70 transition-all hover:opacity-100"
      />
      <span className="text-[10px] font-medium leading-[12.54px] tracking-[0.08em]">
        {text}
      </span>
    </div>
  );
};

export default User;
