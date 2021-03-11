import {
  WALLET,
  WEB3,
  STATUS
} from './constants';

const INIT_STATE = {
  wallet: null,
  web3: null,
  status: 0
};

const Blockchain = (state = INIT_STATE, action) => {
  switch (action.type) {
    case WALLET:
      return { ...state, wallet: action.payload };
    case WEB3:
      return { ...state, web3: action.payload };
    case STATUS:
      return { ...state, status: action.payload };

    default: return { ...state };
  }
}

export default Blockchain;