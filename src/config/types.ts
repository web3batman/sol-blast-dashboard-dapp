export interface IUser {
  id: string;
  twitter_handle: string;
  twitter_picture_url: string;
  solana_address: string | null;
  ethereum_address: string | null;
  sol_deposited: number;
  eth_deposited: number;
  usdc_deposited: number;
  joined_at: string;
  amount_invited: number;
  amount_of_swaps: number;
}

export const initUser = {
  id: '',
  twitter_handle: '',
  twitter_picture_url: '',
  solana_address: null,
  ethereum_address: null,
  sol_deposited: 0,
  eth_deposited: 0,
  usdc_deposited: 0,
  joined_at: '',
  amount_invited: 0,
  amount_of_swaps: 0,
};

export interface IUserPoint {
  id: string;
  invited_by: string;
  user_id: string;
  user_twitter_handle: string;
  user_twitter_picture_url: string;
  rank: number;
  points: number;
}

export interface IDepositTx {
  id: string;
  created_at: string;
  user_id: string;
  points_change: number;
  type: string;
  state: string;
  tx: string;
  from: string;
  amount_deposited_in_coin: number;
  amount_deposited_in_usd: number;
}
