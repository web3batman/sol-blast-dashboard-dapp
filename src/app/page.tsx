'use client';
import Image from 'next/image';
import bg from '../../public/bg.png';
import circle from '../../public/yellow-circle.png';
import shortBreakLine from '../../public/short-breakline.svg';
import homePageButton from '../../public/home-page-button.svg';
import divider from '../../public/divider.svg';
import Link from 'next/link';
import RectangleButton from '@/components/ui/RectangleButton';
import User from '@/components/ui/User';

export default function Home() {
  return (
    <>
      <div className="absolute left-0 top-0 -z-10 overflow-hidden">
        <Image
          src={bg}
          alt="bg"
          className="h-screen w-screen overflow-hidden"
        />
      </div>
      <main className="no-scrollbar relative grid h-full w-full grid-cols-[minmax(400px,auto)_minmax(500px,300px)] gap-8 px-10 max-lg:grid-cols-1">
        <div className="flex max-w-[937px] flex-col gap-7 max-2xl:max-w-[650px]">
          <div className="flex items-center justify-start gap-6">
            <Image src={circle} alt="circle" className="max-2xl:w-[50px]" />
            <Image src={shortBreakLine} alt="short-breakline"></Image>
          </div>
          <div className="flex flex-col gap-1 2xl:gap-10">
            <h1 className="text-left text-[54px] font-bold uppercase leading-[81px] tracking-[0.04em] text-whiteyellow max-2xl:text-[40px] max-md:text-2xl">
              L2 is the fastest, most decentralized, and advanced{' '}
              <span className="text-lightyellow">ETH scaling solution</span>
            </h1>
            <h5 className="max-w-[628px] text-left text-2xl font-medium uppercase leading-[48px] tracking-[-0.011em] text-whiteyellow max-2xl:text-[18px]">
              The all new innovative L2. Because there aren’t already enough.
              Airdrop <span className="text-lightyellow">now live.</span>
            </h5>
          </div>
          <Link
            href="/rewards"
            className="mt-0 transition-all hover:opacity-85 2xl:mt-12">
            <Image src={homePageButton} alt="home-page-button"></Image>
          </Link>
        </div>
        <div className="relative flex pt-28 max-lg:justify-self-center max-lg:pb-10">
          <Image
            src={divider}
            alt="divider"
            className="relative -top-24 mr-16 scale-[0.86] max-xl:mr-10 max-lg:hidden 2xl:scale-100"
          />
          <div>
            <div className="flex flex-col gap-16">
              <RectangleButton
                text="STAY UP TO DATE"
                onClick={() => {}}
                textClassName="w-[230px] "
              />
              <div className="flex flex-col gap-7 text-whiteyellow text-opacity-60">
                <h3 className="text-left text-[40px] font-medium leading-[50.16px] tracking-[0.08em] max-sm:text-3xl">
                  BACKED BY
                </h3>
                <div className="flex items-center justify-start gap-5">
                  <h5 className="text-left text-2xl font-medium leading-[30.1px] tracking-[0.08em] max-sm:text-xl">
                    Paradigm
                  </h5>
                  <h5 className="text-left text-2xl font-medium leading-[30.1px] tracking-[0.08em] max-sm:text-xl">
                    Paradigm
                  </h5>
                </div>
                <div className="flex items-center justify-start gap-5">
                  <h5 className="text-left text-2xl font-medium leading-[30.1px] tracking-[0.08em] text-lightyellow max-sm:text-xl">
                    Normal Crypto
                  </h5>
                  <h5 className="text-left text-2xl font-medium leading-[30.1px] tracking-[0.08em] max-sm:text-xl">
                    Ethereum
                  </h5>
                </div>
                <h5 className="text-left text-2xl font-medium leading-[30.1px] tracking-[0.08em] max-sm:text-xl">
                  @eBoyCapital
                </h5>
                <div className="grid grid-cols-3 gap-x-5 gap-y-7">
                  <User text="@eBoyCapital" />
                  <User text="@eBoyCapital" />
                  <User text="@eBoyCapital" />
                  <User text="@eBoyCapital" />
                  <User text="@eBoyCapital" />
                  <User text="@eBoyCapital" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
