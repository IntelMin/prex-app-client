
import functions from '../functions';

class Contract {

  constructor() {
    this.web3 = functions.getWeb3();
  }
}

export default Contract;