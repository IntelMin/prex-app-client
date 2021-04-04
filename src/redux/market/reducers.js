import {
  SET_MARKETS,
  SET_PAIRS
} from './constants';

const INIT_STATE = {
  pairs: [],
  markets: []
};

const Market = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_PAIRS:
      return { ...state, pairs: action.payload };

    case SET_MARKETS:
      return { ...state, markets: action.payload };

    default: return { ...state };
  }
}

export default Market;