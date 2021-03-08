
import Contract from './Contract';
import price_feed_abi from '../abis/price-feed-kovan.json';
import addr from '../address';

class PriceFeed extends Contract {
  constructor(web3) {
    super(web3);
    this.contract = new web3.eth.Contract(price_feed_abi, addr.price_feed.kovan);
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