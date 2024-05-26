'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useWeb3Modal as useEtherWalletModal } from '@web3modal/wagmi/react';
import { useAccount as useEtherAccount, useSignMessage } from 'wagmi';
import {
  useWalletModal as useSolanaWalletModal,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useLocalStorage } from 'usehooks-ts';
import axios from 'axios';
import { API_URL } from '@/config/const';

export interface IApp {
  walletModalOpen: boolean;
  setWalletModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  solanaWalletModalOpen: boolean;
  setSolanaWalletModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<IApp>({
  walletModalOpen: false,
  setWalletModalOpen: () => {},
  solanaWalletModalOpen: false,
  setSolanaWalletModalOpen: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { setVisible } = useSolanaWalletModal();
  const { open } = useEtherWalletModal();
  const { publicKey: solanaAddress, signMessage } = useSolanaWallet();
  const { address: etherAddress } = useEtherAccount();
  const { signMessageAsync } = useSignMessage();
  const [token, setToken] = useLocalStorage<string>('token', '');

  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);
  const [solanaWalletModalOpen, setSolanaWalletModalOpen] =
    useState<boolean>(false);

  const handleSign = useCallback(async () => {
    const verifyMsg = `The quick brown fox jumps over the lazy dog`;
    if (etherAddress) {
      signMessageAsync({ message: verifyMsg })
        .then(async (sign) => {
          const newToken = await axios
            .post(`${API_URL}/v1/sessions`, {
              public_address: etherAddress,
              signed_message: sign.toString(),
              signed_on: 'Eth',
              invitation_code: 'S3PUSL',
            })
            .then((res) => res.data);
          console.log({ newToken });
          setToken(newToken);
        })
        .catch((e) => {
          console.error('===== msg sign error =====', e);
        });
    }
    if (solanaAddress && signMessage) {
      const sign = await signMessage(new TextEncoder().encode(verifyMsg));
      const newToken = await axios
        .post(`${API_URL}/v1/sessions`, {
          public_address: etherAddress,
          signed_message: sign.toString(),
          signed_on: 'Eth',
          invitation_code: 'S3PUSL',
        })
        .then((res) => res.data);
      console.log({ newToken });
      setToken(newToken);
    }
  }, [etherAddress, solanaAddress]);

  useEffect(() => {
    handleSign();
  }, [etherAddress, solanaAddress]);

  return (
    <AppContext.Provider
      value={{
        walletModalOpen,
        setWalletModalOpen,
        solanaWalletModalOpen,
        setSolanaWalletModalOpen,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): IApp => {
  return useContext(AppContext);
};

const message = 'Connecting with Risking';
