import {
  SET_PAIRS,
  SET_MARKETS
} from './constants';

export const setPairs = (pairs) => ({
    type: SET_PAIRS,
    payload: pairs
});

export const setMarkets = (markets) => ({
  type: SET_MARKETS,
  payload: markets
});
