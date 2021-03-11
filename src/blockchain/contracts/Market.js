
import Contract from './Contract';
import market_abi from '../abis/market.json';
import address from '../address';
import functions from '../functions';

class Market extends Contract {
  constructor(addr) {
    super();
    this.contract = new this.web3.eth.Contract(market_abi, addr);
    this.infuraContract = new this.infuraWeb3.eth.Contract(market_abi, addr);
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
      this.contract.methods.getPredictionData().call({from: this.web3.currentProvider.selectedAddress})
        .then(resolve)
        .catch(console.log);
    });
  }

  getResultData() {
    return new Promise((resolve, reject) => {
      this.contract.methods.marketResult().call()
        .then(resolve)
        .catch(console.log);
    });
  }

  placePrediction(stakeAmount, option) {
    return new Promise((resolve, reject) => {
      this.contract.methods.placePrediction(stakeAmount, option).send({from: this.web3.currentProvider.selectedAddress})
        .then(resolve)
        .catch(console.log);
    });
  }

  onPredictionUpdated(callback) {
    this.infuraContract.events.PredictionDataUpdated((err, res) => {
      if (err === null) {
        callback(res.returnValues);
      } else {
        console.error(err);
      }
    });
  }

  onMarketStarted(callback) {
    this.infuraContract.events.MarketStarted((err, res) => {
      if (err === null) {
        callback(res.returnValues);
      } else {
        console.error(err);
      }
    });
  }

  onMarketEnded(callback) {
    this.infuraContract.events.MarketEnded((err, res) => {
      if (err === null) {
        callback(res.returnValues);
      } else {
        console.error(err);
      }
    });
  }

  getCurrentTime() {
    return new Promise((resolve, reject) => {
      this.contract.methods.getCurrentTime().call()
        .then(resolve)
        .catch(console.log);
    });
  }
}

export default Market;