import React from 'react';
import Image from 'next/image';
import bg from '../../../../public/bg.png';
import divider from '../../../../public/dividers/about-page-divider.svg';
import worldBg from '../../../../public/world-bg.png';

const Page = () => {
  return (
    <div className="relative mb-10 flex flex-col overflow-auto">
      <div className="relative flex h-[calc(100vh-180px)] w-full items-center max-md:h-[calc(100vh-140px)]">
        <Image
          fill
          className="object-cover object-center"
          src={bg}
          alt="background image"
        />
        <div className="relative z-[1] flex w-full flex-col justify-center gap-16 px-6 max-md:gap-4">
          <div className="flex items-center justify-center gap-24 max-2xl:gap-16 max-xl:flex-col-reverse max-xl:gap-10 max-sm:gap-4">
            <Image
              src="/chart.svg"
              alt="chart"
              width={897}
              height={314}
              className="max-w-[670px] max-md:max-w-[500px] max-sm:max-w-[350px] 2xl:max-w-full"
            />
            <div className="flex flex-col gap-5">
              <h3 className="chakra-petch text-left text-[64px] font-semibold uppercase leading-[96px] tracking-[0.04em] text-whiteyellow max-xl:text-5xl max-md:text-3xl max-sm:text-2xl">
                l2 is the blast we <span className="text-lightyellow">all</span>{' '}
                Wanted
              </h3>
              <p className="tomorrow uppercase text-whiteyellow">
                The only L2 that is actually fast, cheap, decentralized and{' '}
                <br /> doesn’t farm it’s users.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="chakra-petch text-gradient text-5xl font-semibold uppercase leading-[72px] tracking-[0.04em] max-md:text-3xl max-sm:text-2xl">
              It’s time to ditch the other l2s
            </h3>
            <p className="tomorrow text-left text-base font-medium leading-6 tracking-[0.08em] text-grey">
              L2 has the same features you love on other L2s while providing 10x
              more value
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 px-6">
        <div className="flex flex-col gap-5">
          <Image
            alt="l2-table"
            src="/l2-table.png"
            height={1080}
            width={1920}
            objectFit="contain"
            className="h-auto w-full"
          />
          <h2 className="chakra-petch mb-8 text-[48px] font-semibold uppercase text-whiteyellow max-md:text-3xl max-sm:text-2xl">
            How L2 Works
          </h2>
        </div>
      </div>
      <div className="relative -mt-8 flex h-[21px] w-full">
        <Image src={divider} alt="l2-works" fill />
      </div>
      <div className="relative mt-12 flex h-full w-full items-center">
        <Image
          className="mx-auto my-auto max-h-[841px]  max-w-[841px] object-center"
          src={worldBg}
          alt="background image"
          fill
        />
        <div className="relative z-[1] flex h-full w-full flex-col gap-8 px-16 2xl:px-28">
          <div className="flex items-center justify-between gap-4 max-lg:flex-col">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/panel.svg"
                  alt="panel"
                  width={115}
                  height={110}
                  className="max-xl:max-w-[90px] max-sm:max-w-[60px]"
                />
                <h3 className="chakra-petch text-left  text-[41.2px] font-bold uppercase leading-[61.8px] tracking-[0.08em] text-whiteyellow max-md:text-3xl max-sm:text-2xl">
                  innovation
                </h3>
              </div>
              <p className="tomorrow max-w-[600px] text-left text-[18.02px] font-semibold uppercase leading-[31.54px]  tracking-[0.08em] max-sm:text-sm">
                we built a brand new, innovative blockchain with never before
                seen tech. By innovative we mean we forked optimisms code,
                changed the license and added a typo.
              </p>
            </div>
            <Image src="/tweet-1.svg" alt="arrow" width={603} height={537} />
          </div>
          <div className="flex items-center justify-between gap-4 max-lg:flex-col-reverse">
            <Image src="/tweet-2.svg" alt="arrow" width={603} height={537} />
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/panel.svg"
                  alt="panel"
                  width={115}
                  height={110}
                  className="max-sm:max-w-[60px]"
                />
                <h3 className="chakra-petch text-left  text-[41.2px] font-bold uppercase leading-[61.8px] tracking-[0.08em] text-whiteyellow max-md:text-3xl max-sm:text-2xl">
                  SECURITY
                </h3>
              </div>
              <p className="tomorrow max-w-[600px] text-left text-[18.02px] font-semibold uppercase leading-[31.54px]  tracking-[0.08em] max-sm:text-sm">
                We value security of deposited assets. That’s why our entire
                blockchain is secured by a white label 3/5 man multisig with
                undoxxed signers.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-10 px-6 text-grey max-sm:px-2">
        <div className="flex flex-col gap-5">
          <h2 className="chakra-petch text-left text-5xl font-semibold uppercase leading-[72px] tracking-[0.04em] text-whiteyellow max-md:text-3xl max-sm:text-xl">
            WHY A nEw l2
          </h2>
          <p className="tomorrow text-left text-base font-medium uppercase leading-7 tracking-[0.08em]">
            There isn’t enough L2s. Efereum needs a scaling solution to reach
            the masses. It’s time to change that.
          </p>
        </div>
        <div className="flex flex-row items-start justify-between max-lg:flex-col max-lg:items-center max-lg:gap-8">
          <div className="flex w-[47%] flex-col gap-16 max-lg:w-[65%] max-md:w-[80%] max-sm:w-[95%]">
            <p className="tomorrow text-left text-[16px] font-medium uppercase">
              L2 emerges as an innovative solution, ingeniously incorporating
              characteristics that have long been the hallmark of some of the
              most efficient blockchains in the space. At its core, L2 deploys a
              unique consensus mechanism called proof-of-history, ensuring
              transactions are not just secure, but processed with unprecedented
              speed. This approach allows for the handling of tens of thousands
              of transactions per second, a feat that dramatically elevates
              Ethereum’s throughput to new heights, addressing one of its most
              critical bottlenecks.
            </p>
            <div className="flex w-full flex-col items-center justify-center gap-5 max-lg:hidden">
              <div className="flex w-full items-center justify-center gap-5">
                <Image
                  src="/icons/facebook.svg"
                  alt="panel"
                  width={248}
                  height={48}
                  className="w-full max-w-[248px] max-2xl:max-w-[200px] max-xl:max-w-[170px]"
                />
              </div>
              <div className="flex items-center gap-5 max-2xl:flex-col max-2xl:gap-8">
                <Image
                  src="/icons/luna.png"
                  alt="panel"
                  width={160}
                  height={61}
                />
                <Image
                  src="/icons/eth.png"
                  alt="panel"
                  width={220}
                  height={80}
                  className="h-full w-full max-2xl:max-h-[110px] max-2xl:max-w-[300px]"
                />
                <Image
                  src="/icons/ftx.png"
                  alt="panel"
                  width={180}
                  height={80}
                  className="h-full w-full max-2xl:max-h-[110px] max-2xl:max-w-[300px]"
                />
              </div>
              <div className="flex items-center gap-5 max-xl:flex-col">
                <Image
                  src="/icons/tesla.svg"
                  alt="panel"
                  width={198}
                  height={61}
                />
                <Image
                  src="/icons/google.svg"
                  alt="panel"
                  width={299}
                  height={98}
                />
              </div>
              <div className="flex items-center gap-5 max-xl:flex-col">
                <Image
                  src="/icons/waterloo.png"
                  alt="panel"
                  width={200}
                  height={194}
                />
                <Image
                  src="/icons/trophy.svg"
                  alt="panel"
                  width={200}
                  height={194}
                />
                <Image
                  src="/icons/hongkong.png"
                  alt="panel"
                  width={200}
                  height={194}
                />
              </div>
            </div>
          </div>
          <div className="relative h-screen w-[34px] max-lg:hidden 2xl:h-[85vh]">
            <Image src="/progress.svg" alt="l2-table" fill />
          </div>
          <div className="flex w-[47%] flex-col gap-16 max-lg:w-[65%] max-md:w-[80%] max-sm:w-[95%]">
            <p className="tomorrow text-left text-[16px] font-medium uppercase ">
              Furthermore, L2 introduces a low-latency transaction environment
              that drastically reduces confirmation times, making it an
              attractive platform for developers and users alike who demand
              efficiency without sacrificing Ethereum&apos;s decentralized
              principles. By embedding these features into Ethereum&apos;s
              ecosystem, L2 subtly showcases that the path to true scalability
              and usability might have already been paved by other blockchains,
              emphasizing a need for Ethereum to evolve beyond its current
              limitations.
            </p>
            <p className="tomorrow text-left text-[16px] font-medium uppercase">
              Our team members come from top faang, blockchain research groups
              at prestigious universities, and have worked on some of the
              largest protocols on the blockchain
            </p>
            <div className="">
              <h4 className="relative pb-5 text-left text-3xl font-bold uppercase leading-9 tracking-[0.08em] text-whiteyellow after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:bg-[url('/dividers/rewards-page-right-top-divider.svg')] after:content-[''] max-2xl:text-2xl max-lg:text-xl">
                Invite your Exit Liquidity
              </h4>
              <div className="ml-8 mt-6 rounded-md bg-[#151910] px-3 py-2 backdrop-blur-[2px] max-md:ml-0">
                <h4 className="relative mt-8 pb-5 text-left text-2xl font-bold capitalize leading-9 tracking-[0.08em] text-whiteyellow max-2xl:text-xl max-lg:text-lg">
                  We Make Farming your friends fun
                </h4>

                <h4>
                  You get points when your invites earn points and when their
                  invites earn points. You get +6% bonus points when your
                  invites earn points. and +1% when their invites earn points.
                  This is complex and rewarding rewards program.
                </h4>
                <Image
                  src="/piramid.png"
                  alt=""
                  width={600}
                  height={300}
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
