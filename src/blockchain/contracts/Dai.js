
import Contract from './Contract';
import dai_abi from '../abis/dai.json';
import address from '../address';

class Dai extends Contract {
  constructor() {
    super();
    this.contract = new this.web3.eth.Contract(dai_abi, address.dai.kovan);
  }

  getBalance() {
    return new Promise((resolve, reject) => {
      const DaiContractInstance = new this.web3.eth.Contract(dai_abi, address.dai.kovan);
      DaiContractInstance.methods.balanceOf(this.web3.currentProvider.selectedAddress).call()
        .then(res => {
          let balance = this.web3.utils.fromWei(res, 'ether');
          resolve(balance);
        })
        .catch(reject)
    });
  }

  approve(spender, amount) {
    return new Promise((resolve, reject) => {
      const DaiContractInstance = new this.web3.eth.Contract(dai_abi, address.dai.kovan);
      DaiContractInstance.methods.approve(spender, amount.toString()).send({from: this.web3.currentProvider.selectedAddress})
        .then(resolve)
        .catch(reject)
    });
  }
}

export default Dai;