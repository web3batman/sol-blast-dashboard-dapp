import React from 'react';
import logo from '../../../public/logo.png';
import headerLine from '../../../public/headerline.svg';
import headerSmallText from '../../../public/header-small-text.svg';
import Image from 'next/image';
import { HeaderButtons } from '../ui/header-buttons';

const Header = () => {
  return (
    <main className="mx-auto w-[95vw]">
      <div className="flex items-center justify-between">
        <Image src={logo} alt=""></Image>
        <HeaderButtons />
      </div>
      <div className="relative flex justify-center pt-3 md:px-0">
        <Image src={headerLine} alt="" className="w-full"></Image>
        <Image
          src={headerSmallText}
          alt=""
          className="absolute right-0 top-7 max-2xl:scale-95"></Image>
      </div>
    </main>
  );
};

export default Header;
