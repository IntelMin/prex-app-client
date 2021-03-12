
import Contract from './Contract';
import market_abi from '../abis/market.json';
import address from '../address';
import functions from '../functions';

class Market extends Contract {
  constructor() {
    super();
    this.contract = new this.web3.eth.Contract(market_abi, address.market.kovan);
    this.infuraContract = new this.infuraWeb3.eth.Contract(market_abi, address.market.kovan);
  }

  getMarketData() {
    return new Promise((resolve, reject) => {
      this.contract.methods.marketData().call()
        .then(resolve)
        .catch(reject)
    });
  }
  
  getPredictionData() {
    return new Promise((resolve, reject) => {
      this.contract.methods.getPredictionData().call({from: this.web3.currentProvider.selectedAddress})
        .then(resolve)
        .catch(reject)
    });
  }

  getResultData() {
    return new Promise((resolve, reject) => {
      this.contract.methods.marketResult().call()
        .then(resolve)
        .catch(reject)
    });
  }

  placePrediction(stakeAmount, option) {
    return new Promise((resolve, reject) => {
      this.contract.methods.placePrediction(stakeAmount.toString(), option).send({from: this.web3.currentProvider.selectedAddress})
        .then(resolve)
        .catch(reject)
    });
  }

  onMarketCreated(callback) {
    this.infuraContract.events.MarketCreated((err, res) => {
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

  onPredictionUpdated(callback) {
    this.infuraContract.events.PredictionDataUpdated((err, res) => {
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
        .catch(reject)
    });
  }
}

export default Market;