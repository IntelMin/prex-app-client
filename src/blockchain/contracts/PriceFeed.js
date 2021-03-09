
import Contract from './Contract';
import price_feed_abi from '../abis/price-feed.json';
import address from '../address';

class PriceFeed extends Contract {
  constructor() {
    super();
    this.contract = new this.web3.eth.Contract(price_feed_abi, address.price_feed.kovan);
  }

  getLastPrice() {
    this.contract.methods.latestRoundData().call()
    .then((roundData) => {
      // Do something with roundData
      console.log("Latest Round Data", roundData)
    });
  }
}

export default PriceFeed;