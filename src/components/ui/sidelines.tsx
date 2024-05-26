import React from 'react';
import leftSideline from '../../../public/left-sideline.svg';
import rightSideline from '../../../public/right-sideline.svg';
import Image from 'next/image';

const Sidelines = () => {
  return (
    <div className="absolute left-2 right-2 -z-[9] flex justify-between overflow-hidden">
      <Image
        src={leftSideline}
        alt=""
        className="scale-[0.8] 2xl:scale-100"></Image>
      <Image
        src={rightSideline}
        alt=""
        className="scale-[0.8] 2xl:scale-100"></Image>
    </div>
  );
};

export default Sidelines;
