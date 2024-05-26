'use client';
import Image from 'next/image';
import bg from '../../public/bg.png';
import circle from '../../public/yellow-circle.png';
import shortBreakLine from '../../public/short-breakline.svg';
import homePageButton from '../../public/home-page-button.svg';
import Link from 'next/link';
import RectangleButton from '@/components/ui/RectangleButton';
import User from '@/components/ui/User';

export default function Home() {
  return (
    <>
      <div className="absolute left-0 top-0 -z-10 overflow-hidden after:absolute after:inset-0 after:bg-[rgba(0,0,0,0.1)] after:backdrop-blur-[2px] after:content-['']">
        <Image
          src={bg}
          alt="bg"
          className="h-screen w-screen overflow-hidden"
        />
      </div>
      <main className="no-scrollbar relative z-10 grid h-full w-full grid-cols-[minmax(400px,auto)_minmax(300px,500px)] gap-8 px-10 max-lg:grid-cols-1 max-sm:px-6">
        <div className="flex flex-col">
          <div className="absolute top-0 flex items-center justify-start gap-6">
            <Image src={circle} alt="circle" className="max-2xl:w-[50px]" />
            <Image
              src={shortBreakLine}
              alt="short-breakline"
              className="max-sm:max-w-[240px]"
            />
          </div>
          <div className="mt-16 flex flex-col max-lg:mt-0 max-lg:h-full max-lg:items-center max-lg:justify-center max-lg:gap-10">
            <h1 className="mt-[clamp(0.5vw,2.5vh,1.5vw)] text-left text-[clamp(1.6vw,7vh,3.5vw)] font-bold uppercase leading-[clamp(2.5vw,7.5vh,5vw)] tracking-[0.04em] text-whiteyellow max-md:text-2xl">
              L2 is the fastest, most decentralized, and advanced{' '}
              <span className="text-lightyellow">scaling solution</span>
            </h1>
            <h5 className="mt-[clamp(0.5vw,3vh,2vw)] max-w-[628px] text-left text-[clamp(1.5vw,3vh,3vw)] font-medium uppercase leading-[clamp(2vw,4vh,4vw)] tracking-[-0.011em] text-whiteyellow max-sm:text-[14px]">
              The all new innovative L2. Because there aren’t already enough.
              Bridge <span className="text-lightyellow">now live.</span>
            </h5>
            <Link
              href="/rewards"
              className="pt-[clamp(1vw,3vh,2vw)] transition-all hover:opacity-85">
              <Image
                src={homePageButton}
                alt="home-page-button"
                className="max-sm:max-w-[280px]"
              />
            </Link>
          </div>
        </div>
        <div className="relative flex pl-8 pt-[clamp(2vw,10vh,4vw)] before:absolute before:inset-0 before:bg-[url('/divider.svg')] before:bg-no-repeat before:content-[''] max-lg:hidden max-lg:justify-self-center max-lg:pb-10 max-lg:before:bg-none max-lg:before:pl-0 max-md:pt-0">
          <div>
            <div className="flex flex-col gap-[clamp(0.5vw,4.5vh,1.5vw)]">
              <RectangleButton
                text="STAY UP TO DATE"
                onClick={() => {}}
                textClassName="w-[230px] "
              />
              <div className="flex flex-col gap-[clamp(0.5vw,2.5vh,1.5vw)] text-whiteyellow text-opacity-60">
                <h3 className="text-left text-[clamp(1vw,5vh,4vw)] font-medium leading-[clamp(1vw,5vh,4vw)] tracking-[0.08em] max-sm:text-3xl">
                  BACKED BY
                </h3>
                <div className="flex items-center justify-start gap-5">
                  <h5 className="text-left text-[clamp(0.4vw,3vh,4vw)] font-medium leading-[clamp(0.4vw,3vh,4vw)] tracking-[0.08em] max-sm:text-xl">
                    Paradigm
                  </h5>
                  <h5 className="text-left text-[clamp(0.4vw,3vh,4vw)] font-medium leading-[clamp(0.4vw,3vh,4vw)] tracking-[0.08em] max-sm:text-xl">
                    Paradigm
                  </h5>
                </div>
                <div className="flex items-center justify-start gap-5">
                  <h5 className="text-left text-[clamp(0.4vw,3vh,4vw)] font-medium leading-[clamp(0.4vw,3vh,4vw)] tracking-[0.08em] text-lightyellow max-sm:text-xl">
                    Normal Crypto
                  </h5>
                  <h5 className="text-left text-[clamp(0.4vw,3vh,4vw)] font-medium leading-[clamp(0.4vw,3vh,4vw)] tracking-[0.08em] max-sm:text-xl">
                    Ethereum
                  </h5>
                </div>
                <h5 className="text-left text-[clamp(0.4vw,3vh,4vw)] font-medium leading-[clamp(0.4vw,3vh,4vw)] tracking-[0.08em] max-sm:text-xl">
                  @eBoyCapital
                </h5>
                <div className="grid grid-cols-3 gap-x-5 gap-y-7 max-sm:gap-3">
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
