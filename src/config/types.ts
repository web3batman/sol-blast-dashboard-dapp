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
