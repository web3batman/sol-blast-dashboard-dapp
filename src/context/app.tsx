'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
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

export interface IApp {
  token: string;
  userId: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  txLoading: boolean;
  setTxLoading: React.Dispatch<React.SetStateAction<boolean>>;
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  walletModalOpen: boolean;
  setWalletModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  isBridgeModalOpen: boolean;
  setIsBridgeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  records: any[];
  setRecords: React.Dispatch<React.SetStateAction<any[]>>;
  handleGetUserProfile: Function;
  isContinue: boolean;
  setIsContinue: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<IApp>({
  token: '',
  userId: '',
  loading: false,
  setLoading: () => {},
  txLoading: false,
  setTxLoading: () => {},
  inputs: [''],
  setInputs: () => {},
  walletModalOpen: false,
  setWalletModalOpen: () => {},
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
  isBridgeModalOpen: false,
  setIsBridgeModalOpen: () => {},
  records: [],
  setRecords: () => {},
  handleGetUserProfile: () => {},
  isContinue: false,
  setIsContinue: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { publicKey: solanaAddress, signMessage } = useSolanaWallet();
  const { address: etherAddress } = useEtherAccount();
  const { signMessageAsync } = useSignMessage();
  const [token, setToken] = useLocalStorage<string>('token', '');
  const [userId, setUserId] = useLocalStorage<string>('userId', '');

  const [user, setUser] = useState<IUser>(initUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [txLoading, setTxLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>(Array(6).fill(''));
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);
  const [solanaWalletModalOpen, setSolanaWalletModalOpen] =
    useState<boolean>(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [userRank, setUserRank] = useState<number>(0);
  const [isBridgeModalOpen, setIsBridgeModalOpen] = useState<boolean>(false);
  const [records, setRecords] = useState<any[]>([]);
  const [isContinue, setIsContinue] = useState<boolean>(false);

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
    const newToken = await axios
      .post(`${API_URL}/v1/sessions`, {
        public_address: walletAddress,
        signed_message: msg,
        signed_on: signedOn,
        invitation_code: invitCode || 'OE14QA', //'OE14QA',
      })
      .then((res) => {
        console.log('sessionLogin res', res);
        return res.data;
      });
    setToken(newToken.token);
    setUserId(newToken.user_id);
    setSolanaWalletModalOpen(false);
    if (!isContinue) setIsLoggedIn(true);
  };

  const handleGetUserProfile = useCallback(async () => {
    console.log('called');
    if (!userId) {
      console.log('No userId');
      return;
    }

    try {
      const [userData, pointsData, invitationCodes] = await Promise.all([
        api.get(`/users/${userId}`).then((res) => res.data),
        api.get(`/points/${userId}`).then((res) => res.data),
        api
          .get(`/invitation-codes`, {
            params: { page: 1, limit: 20 },
          })
          .then((res) => res.data.records),
      ]);

      console.log('invitationCodes', invitationCodes);

      setUser(userData);
      setUserPoints(pointsData.points);
      setUserRank(pointsData.rank);
      setRecords(invitationCodes);

      if (userData.twitter_handle) {
        setHasAccess(true);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [userId]);

  useOnceEffect(() => {
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

  useOnceEffect(() => {
    if (token) {
      api.defaults.headers.common['authorization'] = `Bearer ${token}`;
      handleGetUserProfile();
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        token,
        userId,
        loading,
        setLoading,
        txLoading,
        setTxLoading,
        inputs,
        setInputs,
        walletModalOpen,
        setWalletModalOpen,
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
        isBridgeModalOpen,
        setIsBridgeModalOpen,
        records,
        setRecords,
        handleGetUserProfile,
        isContinue,
        setIsContinue,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): IApp => {
  return useContext(AppContext);
};
