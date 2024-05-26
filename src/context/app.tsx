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
import { useLocalStorage } from 'usehooks-ts';
import axios from 'axios';
import bs58 from 'bs58';

import { API_URL, VerifyMsg } from '@/config/const';
import { IUser, initUser } from '@/config/types';
import api from '@/service/api';
import { useOnceEffect } from '@/hook/useOnceEffect';
import { useIsFetching } from '@tanstack/react-query';

export interface IApp {
  token: string;
  userId: string;
  walletName: string;
  setWalletName: React.Dispatch<React.SetStateAction<string>>;
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
  handleMsgSign: Function;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  userRank: number;
  setUserRank: React.Dispatch<React.SetStateAction<number>>;
}

export const AppContext = createContext<IApp>({
  token: '',
  userId: '',
  walletName: '',
  setWalletName: () => {},
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
  handleMsgSign: () => {},
  user: initUser,
  setUser: () => {},
  userPoints: 0,
  setUserPoints: () => {},
  userRank: 0,
  setUserRank: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { publicKey: solanaAddress, signMessage } = useSolanaWallet();
  const { address: etherAddress } = useEtherAccount();
  const { signMessageAsync } = useSignMessage();
  const [token, setToken] = useLocalStorage<string>('token', '');
  const [userId, setUserId] = useLocalStorage<string>('userId', '');
  const [walletName, setWalletName] = useLocalStorage<string>(
    'walletName',
    'Phantom',
  );

  const [user, setUser] = useState<IUser>(initUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>(Array(6).fill(''));
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);
  const [solanaWalletModalOpen, setSolanaWalletModalOpen] =
    useState<boolean>(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [userRank, setUserRank] = useState<number>(0);

  const handleMsgSign = async (signedOn: string) => {
    try {
      if (signedOn === 'Eth') {
        const sign = await signMessageAsync({ message: VerifyMsg });
        return sign.toString();
      } else {
        if (signMessage) {
          const sign = await signMessage(new TextEncoder().encode(VerifyMsg));
          return bs58.encode(new Uint8Array(sign as unknown as ArrayBuffer));
        }
      }
    } catch (err) {
      console.error('===== msg sign error =====', err);
    }
  };

  const handleSessionLogin = async ({
    signedOn,
    walletAddress,
    invitCode,
  }: {
    signedOn: string;
    walletAddress: string;
    invitCode?: string;
  }) => {
    const msg = await handleMsgSign(signedOn);
    if (!msg) return;
    console.log('walletAddress', walletAddress, msg, signedOn, invitCode);
    const newToken = await axios
      .post(`${API_URL}/v1/sessions`, {
        public_address: walletAddress,
        signed_message: msg,
        signed_on: signedOn,
        invitation_code: 'OE14QA',
      })
      .then((res) => {
        console.log('sessionLogin res', res);
        return res.data;
      });
    setToken(newToken.token);
    setUserId(newToken.user_id);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (etherAddress && solanaAddress) return;
    else {
      if (etherAddress) {
        handleSessionLogin({
          signedOn: 'Eth',
          walletAddress: etherAddress,
          invitCode: inputs.join('').toUpperCase(),
        });
      } else if (solanaAddress) {
        handleSessionLogin({
          signedOn: 'Sol',
          walletAddress: solanaAddress.toBase58(),
          invitCode: inputs.join('').toUpperCase(),
        });
      }
    }
  }, [etherAddress, solanaAddress]);

  useLayoutEffect(() => {
    if (token) {
      api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    } else {
    }
  }, [token]);

  useOnceEffect(() => {
    // if (userId) handleGetUserProfile(userId);
  }, [userId]);

  return (
    <AppContext.Provider
      value={{
        token,
        userId,
        walletName,
        setWalletName,
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
        handleMsgSign,
        user,
        setUser,
        userPoints,
        setUserPoints,
        userRank,
        setUserRank,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): IApp => {
  return useContext(AppContext);
};
