
import Contract from './Contract';
import market_registry_abi from '../abis/market-registry.json';
import address from '../address';

class MarketRegistry extends Contract {
  constructor() {
    super();
    this.contract = new this.web3.eth.Contract(market_registry_abi, address.market_registry.kovan);
  }
}

export default MarketRegistry;