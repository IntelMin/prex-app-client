
import functions from '../functions';

class Contract {

  constructor() {
    this.web3 = functions.getWeb3();
    this.infuraWeb3 = functions.getInfuraWeb3();
  }
}

export default Contract;