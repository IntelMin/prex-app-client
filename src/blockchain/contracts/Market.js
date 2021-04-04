
import Contract from './Contract';
import market_abi from '../abis/market.json';

class Market extends Contract {
  constructor(addr) {
    super(addr);
    this.contract = new this.web3.eth.Contract(market_abi, addr);
    this.infuraContract = new this.infuraWeb3.eth.Contract(market_abi, addr);
  }
}

export default Market;