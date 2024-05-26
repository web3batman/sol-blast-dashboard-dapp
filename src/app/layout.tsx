import type { Metadata } from 'next';
import { Orbitron, Tomorrow, Chakra_Petch } from 'next/font/google';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css';
import Sidelines from '@/components/ui/sidelines';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { config } from '@/config/wagmi';
import {
  AppProvider,
  EthereumWalletProvider,
  SolanaWalletProvider,
} from '@/context';

const orbitron = Orbitron({ subsets: ['latin'] });

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--chakra-petch',
});

const tomorrow = Tomorrow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--tomorrow',
});

export const metadata: Metadata = {
  title: 'L2',
  description: 'L2 solution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang="en" className="bg-black text-white">
      <body
        className={`${orbitron.className} ${chakraPetch.variable} ${tomorrow.variable} relative flex h-screen flex-col overflow-hidden`}>
        <SolanaWalletProvider>
          <EthereumWalletProvider initialState={initialState}>
            <AppProvider>
              <div className="m-[1vw] mb-0">
                <Sidelines />
                <Header />
                <ToastContainer />
              </div>
              <div className="custom-scrollbar mx-auto mb-[44px] h-full w-[95vw] flex-grow overflow-y-scroll">
                {children}
              </div>
              <div className="absolute -bottom-2 left-1/2 z-50 h-[83px] w-[95vw] -translate-x-1/2 transform max-sm:h-10">
                <Footer />
              </div>
            </AppProvider>
          </EthereumWalletProvider>
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
