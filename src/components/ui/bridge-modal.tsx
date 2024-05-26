import Image from 'next/image';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useAccount as useEtherAccount, useSendTransaction } from 'wagmi';
import { useWeb3Modal as useEtherWalletModal } from '@web3modal/wagmi/react';
import { toast } from 'react-toastify';

import HistoryTab from './history-tab';
import api from '@/service/api';
import { Transaction } from '@solana/web3.js';
import { useApp } from '@/context';
import { useOnceEffect } from '@/hook/useOnceEffect';
import { IDepositTx } from '@/config/types';

const BridgeModal = ({ closeModal }: { closeModal: any }) => {
  const {
    setIsBridgeModalOpen,
    user,
    userId,
    handleMsgSign,
    handleGetUserProfile,
  } = useApp();
  const { publicKey: solanaAddress } = useWallet();
  const { setVisible } = useWalletModal();
  const { address: etherAddress } = useEtherAccount();
  const { open } = useEtherWalletModal();
  const { signTransaction } = useWallet();
  const { sendTransaction: sendEthTransaction } = useSendTransaction();
  const { connection } = useConnection();
  const [activeTab, setActiveTab] = useState('deposit');
  const [selectedCurrency, setSelectedCurrency] = useState('Eth');
  const [depsoitedAmount, setDepositedAmount] = useState<number>(0);
  const [pointAmount, setPointAmount] = useState<number>(0);
  const [txes, setTxes] = useState<IDepositTx[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);

  const isSolSelectedAndNoSolAddress = useMemo(() => {
    return selectedCurrency === 'Sol' && !user.solana_address;
  }, [selectedCurrency, user]);

  const isEthOrUsdcSelectedAndNoEthAddress = useMemo(() => {
    return (
      (selectedCurrency === 'Eth' || selectedCurrency === 'Usdc') &&
      !user.ethereum_address
    );
  }, [selectedCurrency, user]);

  const handleCurrencyChange = (e: any) => {
    setSelectedCurrency(e.target.value);
  };

  const handleChange = (e: any) => {
    setDepositedAmount(Number(e.target.value));
  };

  const handleSetAssociateAddress = async () => {
    try {
      if (user.ethereum_address && !solanaAddress) setVisible(true);
      else if (user.solana_address && !etherAddress) open();

      if (user.ethereum_address && user.solana_address) {
        return;
      } else {
        if (user.ethereum_address) {
          const msg = await handleMsgSign('Sol');
          await api
            .post(`/users/${userId}/associate-address`, {
              public_address: solanaAddress,
              signed_message: msg,
              signed_on: 'Sol',
            })
            .then((res) => res.data);
          handleGetUserProfile();
        } else if (user.solana_address && etherAddress) {
          console.log('2');
          const msg = await handleMsgSign('Eth');
          await api
            .post(`/users/${userId}/associate-address`, {
              public_address: etherAddress,
              signed_message: msg,
              signed_on: 'Eth',
            })
            .then((res) => res.data);
          handleGetUserProfile();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirm = async () => {
    if (selectedCurrency === 'Sol' && !solanaAddress) setVisible(true);
    else if (selectedCurrency !== 'Sol' && !etherAddress) open();

    try {
      if (depsoitedAmount <= 0) {
        return toast.error(`You must set the amount to deposit`);
      }
      if (selectedCurrency === 'Sol') {
        const encodedTx = await api
          .post(`/deposits/solana`, { amount: depsoitedAmount })
          .then((r) => r.data);
        console.log({ encodedTx });
        const transaction = Transaction.from(new Buffer(encodedTx, 'base64'));
        console.log(transaction, '=====>');
        console.log(await connection.simulateTransaction(transaction));

        if (signTransaction) {
          console.log(' ===> ');
          const sTx = await signTransaction(transaction!);

          const rawTx = await connection.sendRawTransaction(sTx.serialize());
          console.log(`https://explorer.solana.com/tx/${rawTx}?cluster=devnet`);

          const amount = await api
            .get(`/deposits/quote`, {
              params: {
                coin: selectedCurrency,
                amount: depsoitedAmount,
              },
            })
            .then((r) => r.data);

          setPointAmount(amount);
          setIsBridgeModalOpen(false);

          toast.success(`Deposit successful`);
        }
      } else {
        const encodedTx = await api
          .post(`/deposits/ethereum`, {
            amount: depsoitedAmount,
            coin: selectedCurrency,
          })
          .then((r) => r.data);
        console.log({ encodedTx });
        const tx = sendEthTransaction({
          to: encodedTx.to,
          value: encodedTx.value,
          data: encodedTx.data,
        });
        console.log({ tx });
        const amount = await api
          .get(`/deposits/quote`, {
            params: {
              coin: selectedCurrency,
              amount: depsoitedAmount,
            },
          })
          .then((r) => r.data);

        setPointAmount(amount);
        setIsBridgeModalOpen(false);
        toast.success(`Deposit successful`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      // setLoading(false);
    }
  };

  const handleFetchPoint = useCallback(async () => {
    const amount = await api
      .get(`/deposits/quote`, {
        params: {
          coin: selectedCurrency,
          amount: depsoitedAmount,
        },
      })
      .then((r) => r.data);

    setPointAmount(amount);
  }, [selectedCurrency, depsoitedAmount]);

  const handleFetchTxs = useCallback(async () => {
    const newTxes = await api
      .get(`/users/${userId}/deposits`, {
        params: {
          limit: 20,
          page: 1,
        },
      })
      .then((r) => r.data);

    console.log(newTxes);
    setTxes(newTxes.records);
  }, [selectedCurrency, depsoitedAmount]);

  useOnceEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  useOnceEffect(() => {
    handleFetchPoint();
  }, [selectedCurrency, depsoitedAmount]);

  useOnceEffect(() => {
    handleFetchTxs();
  }, []);

  return (
    <div className="fixed  inset-0 z-50  flex items-center justify-center bg-[#1a1906] bg-opacity-90 ">
      <div
        ref={modalRef}
        style={{
          clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 5%)',
          //   // WebkitBoxShadow: '0px 0px 28px 2px rgba(235, 230, 136, 0.9)',
          //   // MozBoxShadow: '0px 0px 28px 2px rgba(235, 230, 136, 0.9)',
          //   // boxShadow: '0px 0px 28px 2px rgba(235, 230, 136, 0.9)',
        }}
        className=" bg-[#201F07] ">
        <div className=" shadow-whiteyellow drop-shadow-xl">
          <div className="mb-5 flex w-full justify-between">
            <button
              className={`w-full px-6 py-5 ${activeTab === 'deposit' ? 'bg-black' : ''}`}
              onClick={() => setActiveTab('deposit')}>
              Deposit
            </button>
            <button
              className={`w-full px-6 py-5 ${activeTab === 'history' ? 'bg-black' : ' text-[#FFFDBF99]'}`}
              onClick={() => setActiveTab('history')}>
              History
            </button>
          </div>
          {activeTab === 'deposit' && (
            <div className="deposit-body p-4">
              <label
                htmlFor="currency-select"
                className="mb-2 block text-[15px] text-whiteyellow">
                Deposit From
              </label>
              <select
                id="currency-select"
                className="mb-4 block w-full  rounded border border-whiteyellow bg-[#363407] p-3 py-5 text-[15px] text-neutral-100"
                value={selectedCurrency}
                onChange={handleCurrencyChange}>
                <option value="Eth">Ethereum (ETH)</option>
                <option value="Usdc">Ethereum (USDC)</option>
                <option value="Sol">Solana</option>
                {/* Add other currencies here */}
              </select>

              <div className="mb-4  flex items-center justify-between rounded border border-whiteyellow bg-[#363407] p-3 text-[15px]">
                <input
                  className="w-[200px] rounded border-r bg-transparent p-1 text-center text-[48px]"
                  placeholder="0.0"
                  onChange={handleChange}
                />
                <div className="h-full w-full items-center gap-1  pl-2">
                  <span className="pl-3 pr-5 text-[24px] text-white">
                    1{' '}
                    {selectedCurrency === 'Eth'
                      ? 'ETH'
                      : selectedCurrency === 'Usdc'
                        ? 'USDC'
                        : 'SOL'}
                  </span>
                </div>
              </div>

              <Image
                src={'./bridge-modal-lines.svg'}
                width={530}
                height={44}
                alt="Bridge-Modal-Lines"
              />
              <select
                id="currency-send-select"
                className="my-4  block w-full rounded border border-whiteyellow bg-[#363407] p-3 py-5 text-[15px] text-white"
                value={selectedCurrency}
                onChange={handleCurrencyChange}>
                <option value="Layer2">Layer2</option>
              </select>
              <div className="mb-4 text-center text-[12px] text-whiteyellow">
                You will receive {pointAmount} Points
              </div>
              <button
                className="mx-auto flex w-full items-center justify-center"
                onClick={
                  isSolSelectedAndNoSolAddress ||
                  isEthOrUsdcSelectedAndNoEthAddress
                    ? handleSetAssociateAddress
                    : handleConfirm
                }>
                <Image
                  src={
                    isSolSelectedAndNoSolAddress ||
                    isEthOrUsdcSelectedAndNoEthAddress
                      ? '/associate-address-button.png'
                      : '/confirm-deposit.svg'
                  }
                  alt="deposit"
                  width={510}
                  height={64}
                />
              </button>
            </div>
          )}
          {activeTab === 'history' && <HistoryTab data={txes} />}
        </div>
      </div>
    </div>
  );
};

export default BridgeModal;
