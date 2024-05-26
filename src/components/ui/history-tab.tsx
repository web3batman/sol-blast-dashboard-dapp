import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsDownload } from 'react-icons/bs';
import { TbArrowsExchange2 } from 'react-icons/tb';
import ViewTx from '../../../public/view-tx-button.svg';

const data = [
  {
    type: 'swap',
    date: 'jul 6',
    from: '0X9FD...E34D',
    price: '2.4326',
    price_bottom: '2.4326',
    tx: 'link',
  },
  {
    type: 'deposit',
    date: 'jul 6',
    from: '0X9FD...E34D',
    price: '2.4326',
    price_bottom: '2.4326',
    tx: 'link',
  },
];

const HistoryTab = () => {
  return (
    <div className="flex h-[508px] w-[562px] flex-col space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b  border-whiteyellow  p-4 pb-6">
          <div className="flex items-center space-x-3">
            {item.type == 'swap' ? (
              <TbArrowsExchange2 size={46} />
            ) : (
              <BsDownload size={46} />
            )}
            <div>
              <div className="uppercase text-white">{item.type}</div>
              <div className="uppercase text-whiteyellow">
                <span className=" text-lightyellow">{item.date}</span>{' '}
                <span className=" opacity-30">FROM: {item.from}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg text-white">{item.price}</div>
            <div className="text-gray-400">{item.price_bottom}</div>
          </div>
          <Link
            href={item.tx}
            className='"transition-all 2xl:pt-6" hover:opacity-85'>
            <Image src={ViewTx} alt="" width={106} height={38}></Image>{' '}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HistoryTab;
