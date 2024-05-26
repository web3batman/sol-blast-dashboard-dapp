import React from 'react';
import FooterLine from '../../../public/footer-line.svg';
import Image from 'next/image';
import { BsTwitterX } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      <Image src={FooterLine} alt="footer" className="m-auto" />
      <h4 className="rajdhani-petch absolute left-1/2 top-14 w-full max-w-[1000px] -translate-x-1/2 text-center text-[8px] uppercase text-[#f8ef00] max-2xl:max-w-[1200px] max-sm:top-6">
        L2 is a meme coin on the Solana blockchain. This token is for
        entertainment purposes only. This is not financial advice, invest at
        your own risk. The founders are not liable for any losses, nor obligated
        to update information. Please do your own research before investing.
        Laws vary by jurisdiction; comply with local regulations. By buying you
        acknowledge all risks involved. Disclaimer subject to change without
        notice.
      </h4>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-16">
        <BsTwitterX size={16} color="white" />
        <Image
          src="/icons/telegram_hamburger.svg"
          width={34}
          height={30}
          alt="side52 bar"
        />
      </div>
    </>
  );
};

export default Footer;
