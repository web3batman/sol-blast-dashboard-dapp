'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useAccount as useEtherAccount, useSignMessage } from 'wagmi';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'usehooks-ts';
import axios from 'axios';
import { API_URL } from '@/config/const';
import api from '@/service/api';
import bs58 from 'bs58';

export interface IApp {
  token: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  walletModalOpen: boolean;
  setWalletModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  solanaWalletModalOpen: boolean;
  setSolanaWalletModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasAccess: boolean;
  setHasAccess: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleSign: Function;
}

export const AppContext = createContext<IApp>({
  token: '',
  loading: false,
  setLoading: () => {},
  inputs: [''],
  setInputs: () => {},
  walletModalOpen: false,
  setWalletModalOpen: () => {},
  solanaWalletModalOpen: false,
  setSolanaWalletModalOpen: () => {},
  hasAccess: false,
  setHasAccess: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  handleSign: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { publicKey: solanaAddress, signMessage } = useSolanaWallet();
  const { address: etherAddress } = useEtherAccount();
  const { signMessageAsync } = useSignMessage();
  const [token, setToken] = useLocalStorage<string>('token', '');

  const [loading, setLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>(Array(6).fill(''));
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);
  const [solanaWalletModalOpen, setSolanaWalletModalOpen] =
    useState<boolean>(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleSign = useCallback(
    async (invitCode: string) => {
      const verifyMsg = `The quick brown fox jumps over the lazy dog`;
      if (etherAddress) {
        signMessageAsync({ message: verifyMsg })
          .then(async (sign) => {
            const newToken = await axios
              .post(`${API_URL}/v1/sessions`, {
                public_address: etherAddress,
                signed_message: sign.toString(),
                signed_on: 'Eth',
                invitation_code: invitCode,
              })
              .then((res) => res.data);
            setToken(newToken.token);
            setIsLoggedIn(true);
          })
          .catch((e) => {
            console.error('===== msg sign error =====', e);
          });
      }
      if (solanaAddress && signMessage) {
        const sign = await signMessage(new TextEncoder().encode(verifyMsg));
        const newToken = await axios
          .post(`${API_URL}/v1/sessions`, {
            public_address: solanaAddress,
            signed_message: bs58.encode(
              new Uint8Array(sign as unknown as ArrayBuffer),
            ),
            signed_on: 'Sol',
            invitation_code: invitCode,
          })
          .then((res) => res.data);
        setToken(newToken);
        setIsLoggedIn(true);
      }
    },
    [etherAddress, solanaAddress],
  );

  useEffect(() => {
    handleSign(inputs.join('').toUpperCase());
  }, [etherAddress, solanaAddress]);

  useLayoutEffect(() => {
    if (token) {
      api.defaults.headers.common['authorization'] = `Bearer ${token}`;
      // handleGetUser();
    } else {
      // handleSignUp(account.address);
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        token,
        loading,
        setLoading,
        inputs,
        setInputs,
        walletModalOpen,
        setWalletModalOpen,
        solanaWalletModalOpen,
        setSolanaWalletModalOpen,
        hasAccess,
        setHasAccess,
        isLoggedIn,
        setIsLoggedIn,
        handleSign,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): IApp => {
  return useContext(AppContext);
};
