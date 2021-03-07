import {
  WALLET,
  WEB3
} from './constants';

export const setWallet = (wallet) => ({
    type: WALLET,
    payload: wallet
});

export const setWeb3 = (web3) => ({
  type: WEB3,
  payload: web3
});
