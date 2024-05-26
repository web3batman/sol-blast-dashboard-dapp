import React from 'react';
import FooterLine from '../../../public/footer-line.svg';
import Image from 'next/image';
import { BsTwitterX } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      <Image src={FooterLine} alt="footer" className="m-auto" />
      <h4 className="rajdhani-petch absolute left-1/2 top-12 w-full max-w-[1000px] -translate-x-1/2 text-center text-[8px] uppercase text-[#f8ef00] max-2xl:max-w-[800px] max-lg:top-10 max-sm:top-6">
        L2 is a meme coin on the Solana blockchain. This token is for
        entertainment purposes only. All claims made on this website and twitter
        project are satire. This is not financial advice, invest at your own
        risk. Laws vary by jurisdiction; comply with local regulations. By
        “bridging” you acknowledge all risks involved.
      </h4>
      <div className="absolute bottom-2 right-0 flex items-center gap-10 max-lg:hidden">
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
