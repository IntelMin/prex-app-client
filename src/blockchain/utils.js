
import Web3 from 'web3';
import address from './address';
import dai_kovan_abi from './abis/dai-kovan.json';

const getWeb3 = () => {
  let web3 = null;
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  }
  // Legacy DApp Browsers
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  }
  // Non-DApp Browsers
  else {
    console.log('You have a problem with web3!');
    return null;
  }
  return web3;
}

const getEthBalance = async () => {
  return new Promise((resolve, reject) => {
    const web3 = getWeb3();
    if (!web3) return 0;
    web3.eth.getBalance(web3.currentProvider.selectedAddress)
      .then(res => {
        let balance = web3.utils.fromWei(res, 'ether');
        resolve(balance);
      })
  });
}

const getDaiBalance = async () => {
  return new Promise((resolve, reject) => {
    const web3 = getWeb3();
    if (!web3) return 0;
    const DaiContractInstance = new web3.eth.Contract(dai_kovan_abi, address.dai.kovan);
    DaiContractInstance.methods.balanceOf(web3.currentProvider.selectedAddress).call()
      .then(res => {
        let balance = web3.utils.fromWei(res, 'ether');
        resolve(balance);
      })
  });
}

const getAccount = () => {
  const web3 = getWeb3();
  if (!web3) return null;
  return web3.currentProvider.selectedAddress;
}

const utils = {
  getWeb3,
  getAccount,
  getEthBalance,
  getDaiBalance
};

export default utils;