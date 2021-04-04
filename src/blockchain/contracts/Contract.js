
import {getBrowserWeb3, getInfuraWeb3} from '../web3';

var events = {};

class Contract {

  constructor(tag = null) {
    this.web3 = getBrowserWeb3();
    this.infuraWeb3 = getInfuraWeb3();
    if (tag) this.tag = tag;
    else this.tag = "" + Date.now();
    events[this.tag] = {};
  }
  
  call(method, ...params) {
    return new Promise((resolve, reject) => {
      this.contract.methods[method](...params).call({from: this.web3.currentProvider.selectedAddress})
        .then(resolve)
        .catch(reject)
    });
  }

  send(method, ...params) {
    return new Promise((resolve, reject) => {
      this.contract.methods[method](...params).send({from: this.web3.currentProvider.selectedAddress})
        .then(resolve)
        .catch(reject)
    });
  }

  on(event, callback, onerr) {
    if (events[this.tag][event])
      return;
    this.contract.events[event]((err, res) => {
      if (err === null) {
        callback(res.returnValues, this.tag);
      } else {
        if (onerr) onerr(err);
        else console.log(err);
      }
    });
    events[this.tag][event] = true;
  }
}

export default Contract;