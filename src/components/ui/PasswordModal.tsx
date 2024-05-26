'use client';

import Image from 'next/image';
import { useApp } from '@/context';
import { Orbitron, Barlow } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'] });
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--chakra-petch',
});

const PasswordModal = ({ onPasswordSubmit }: { onPasswordSubmit: any }) => {
  const { setWalletModalOpen, inputs, setInputs } = useApp();

  const handleInput = (char: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = char;
    setInputs(newInputs);
  };

  const handlePaste = (e: any) => {
    const text: string = e.clipboardData.getData('Text');
    const newInputs = [...inputs];
    newInputs[0] = text.charAt(0);
    newInputs[1] = text.charAt(1);
    newInputs[2] = text.charAt(2);
    newInputs[3] = text.charAt(3);
    newInputs[4] = text.charAt(4);
    newInputs[5] = text.charAt(5);
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    onPasswordSubmit(inputs.join('').toUpperCase());
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-black bg-opacity-75">
      <div className="justify-center bg-black py-5 text-center max-sm:p-0">
        <h2 className="text-center text-[28px] font-semibold text-whiteyellow">
          ENTER YOUR CODE
        </h2>
        <p className="mx-auto w-3/4 pt-[clamp(1vw,3vh,1.7vw)] text-center text-[clamp(1vw,3vh,2vw)] uppercase text-whiteyellow text-opacity-50 max-sm:w-full max-sm:px-6">
          to start claiming rewards.
        </p>
        <Image
          className="absolute left-1/2 -translate-x-1/2 transform max-md:hidden max-md:max-h-12"
          src="/upper-layout-line.svg"
          alt="upper-layout-line"
          width={1000}
          height={79}
        />
        <div className="mb-6 mt-24 flex w-full justify-center max-md:mt-10">
          <div className="flex flex-wrap justify-center gap-4">
            {inputs.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleInput(e.target.value, index)}
                onPaste={(e) => handlePaste(e)}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 31% 100%, 0 76%)',
                }}
                className="outline-ligthyellow h-20 w-16 rounded-md border border-lightyellow border-opacity-15 bg-lightyellow bg-opacity-10 text-center text-3xl font-bold uppercase text-lightyellow focus:border-lightyellow focus:border-opacity-50 focus:outline-none max-sm:h-14 max-sm:w-10"
                onInput={(e) => {
                  const currentInput = e.currentTarget;
                  if (currentInput.value) {
                    const nextInput =
                      currentInput.nextElementSibling as HTMLInputElement;
                    if (nextInput) {
                      nextInput.focus();
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace') {
                    const currentInput = e.currentTarget;
                    if (!currentInput.value) {
                      const previousInput =
                        currentInput.previousElementSibling as HTMLInputElement;
                      if (previousInput) {
                        previousInput.focus();
                      }
                    }
                  } else if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />
            ))}
          </div>
        </div>
        <Image
          className="absolute left-1/2 -translate-x-1/2 transform max-md:hidden max-md:max-h-12"
          src={'/lower-layout-line.svg'}
          alt=""
          width={1000}
          height={79}
        />
        <div className="flex justify-center">
          <button
            className="mt-[clamp(1.6vw,6vh,3vw)] h-[64px] max-w-[340px] items-center border-none bg-none p-0 max-md:max-w-[300px]"
            onClick={handleSubmit}>
            <svg width={270} height={48} viewBox="0 0 270 48">
              <path d="M0 0H270V48H16l-16 -16Z" fill="hsla(58, 100%, 49%, 1)" />
              <text
                x="30"
                y="30"
                fill="black"
                fontSize="14px"
                fontWeight="600"
                letterSpacing="3.2px"
                className={`${orbitron.className}`}>
                ENTER NOW
              </text>
              <path d="M238 17l10 10Z" strokeWidth={2} stroke="black" />
              <path d="M248 27l-10 10Z" strokeWidth={2} stroke="black" />
              <path d="M228 27h20Z" strokeWidth={2} stroke="black" />
              <path d="M210 52h2Z" strokeWidth={8} stroke="white" />
              <path d="M212 52h38Z" strokeWidth={8} stroke="black" />
              <text
                x="220"
                y="56"
                fill="hsla(58, 100%, 49%, 1)"
                fontSize="6px"
                fontWeight="400"
                letterSpacing="3.2px"
                className={`${barlow.variable}`}>
                R25
              </text>
              <line
                x1="340"
                y1="0"
                x2="340"
                y2="64"
                stroke="white"
                strokeWidth="4"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <p className="text-[#fffdbf80]">Already registered?</p>
          <button
            className="mt-3 text-[#fffdbf]"
            onClick={() => setWalletModalOpen(true)}>
            Log in with your wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
