'use client';

import Image from 'next/image';
import headerLine from '../../../public/headerline.svg';
import headerSmallText from '../../../public/header-small-text.svg';
import { HeaderButtons } from '../ui/header-buttons';

const Header = () => {
  return (
    <main className="mx-auto w-[95vw] pb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[54px] font-bold tracking-wider text-lightyellow max-md:text-4xl">
          L<span className="text-whiteyellow">2</span>
        </h3>
        <HeaderButtons />
      </div>
      <div className="relative flex justify-center pt-3 md:px-0">
        <Image src={headerLine} alt="" className="w-full" />
        <Image
          src={headerSmallText}
          alt=""
          className="absolute right-0 top-7 max-2xl:scale-95"
        />
      </div>
    </main>
  );
};

export default Header;
