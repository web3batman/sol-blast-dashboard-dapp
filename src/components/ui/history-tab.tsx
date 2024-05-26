import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsDownload } from 'react-icons/bs';
import { TbArrowsExchange2 } from 'react-icons/tb';
import ViewTx from '../../../public/view-tx-button.svg';
import { IDepositTx } from '@/config/types';
import { getMonthLabel, shortenAddress } from '@/util';

const HistoryTab = ({ data }: { data: IDepositTx[] }) => {
  return (
    <div className="flex h-[508px] w-[562px] flex-col space-y-4">
      {data.length > 0 &&
        data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b  border-whiteyellow  p-4 pb-6">
            <div className="flex items-center space-x-3">
              {item.type == 'swap' ? (
                <TbArrowsExchange2 size={46} />
              ) : (
                <BsDownload size={46} />
              )}
              <div className="flex items-end">
                <div className="flex flex-col uppercase text-white">
                  <span>deposit</span>
                  <span className="text-lightyellow">
                    {getMonthLabel(new Date(item.created_at).getMonth()) +
                      ' ' +
                      new Date(item.created_at).getUTCDate()}
                  </span>
                </div>
                <div className="uppercase text-whiteyellow">
                  <span className=" opacity-30">
                    FROM: {shortenAddress(item.from)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg text-white">
                {item.amount_deposited_in_coin.toFixed(3)}
              </div>
              <div className="text-gray-400">
                {item.amount_deposited_in_usd.toFixed(3)}
              </div>
            </div>
            <Link
              href={
                item.type === 'Sol'
                  ? `https://explorer.solana.com/tx/${item.tx}?cluster=devnet`
                  : `https://app.debridge.finance/order?orderId=${item.tx}`
              }
              target="_blank"
              className='"transition-all 2xl:pt-6" hover:opacity-85'>
              <Image src={ViewTx} alt="view tx" width={106} height={38} />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default HistoryTab;
