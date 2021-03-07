import {
  WALLET,
  WEB3
} from './constants';

const INIT_STATE = {
  wallet: null,
  web3: null
};

const Blockchain = (state = INIT_STATE, action) => {
  switch (action.type) {
    case WALLET:
      return { ...state, wallet: action.payload };
    case WEB3:
      return { ...state, web3: action.payload };

    default: return { ...state };
  }
}

export default Blockchain;