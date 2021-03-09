
import Contract from './Contract';
import market_abi from '../abis/market.json';
import address from '../address';

class Market extends Contract {
  constructor(addr) {
    super();
    this.contract = new this.web3.eth.Contract(market_abi, addr);
  }

  getMarketData() {
    return new Promise((resolve, reject) => {
      this.contract.methods.marketData().call()
        .then(resolve)
        .catch(console.log);
    });
  }
  
  getPredictionData() {
    return new Promise((resolve, reject) => {
      this.contract.methods.getPredictionData().call()
        .then(resolve)
        .catch(console.log);
    });
  }
}

export default Market;