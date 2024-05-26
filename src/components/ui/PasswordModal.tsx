'use client';

import Image from 'next/image';
import { useApp } from '@/context';

const PasswordModal = ({ onPasswordSubmit }: { onPasswordSubmit: any }) => {
  const { setWalletModalOpen, inputs, setInputs } = useApp();

  const handleInput = (char: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = char;
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    onPasswordSubmit(inputs.join('').toUpperCase());
  };

  return (
    <div className="h-full w-full bg-black bg-opacity-75 flex items-center justify-center">
      <div className="justify-center bg-black py-5 text-center">
        <h2 className="text-center text-[28px] font-semibold text-whiteyellow">
          ENTER YOUR CODE
        </h2>
        <p className="mx-auto w-3/4 pt-8 text-center text-[20px] text-whiteyellow text-opacity-50">{`PROCEED WITH CAUTION, WE DON'T KNOW WHAT'S ON THE OTHER SIDE.`}</p>
        <Image
          className="absolute left-1/2 -translate-x-1/2 transform"
          src="/upper-layout-line.svg"
          alt="upper-layout-line"
          width={1000}
          height={79}
        />
        <div className="mb-6 mt-24 flex w-full justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            {inputs.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleInput(e.target.value, index)}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 31% 100%, 0 76%)',
                }}
                className="outline-ligthyellow h-20 w-16 rounded-md border border-lightyellow border-opacity-15 bg-lightyellow bg-opacity-10 text-center text-3xl font-bold uppercase text-lightyellow focus:border-lightyellow focus:border-opacity-50 focus:outline-none"
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
          className="absolute left-1/2 -translate-x-1/2 transform"
          src={'/lower-layout-line.svg'}
          alt=""
          width={1000}
          height={79}
        />
        <div className="flex justify-center">
          <button
            className="mt-10 h-[120px] max-w-[360px] items-center border-none bg-none p-0"
            onClick={handleSubmit}>
            <Image
              src={'/home-page-button.svg'}
              alt="home-page-button"
              width={360}
              height={1000}
            />
          </button>
        </div>
        <div className="mt-4">
          <p className="text-[#fffdbf80]">Already registered?</p>
          <button
            className="text-[#fffdbf]"
            onClick={() => setWalletModalOpen(true)}>
            Log in with your wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
