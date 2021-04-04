
import Web3 from 'web3';

export const getBrowserWeb3 = () => {
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

export const getInfuraWeb3 = () => {
  const infura_web3 = new Web3("wss://kovan.infura.io/ws/v3/63ffb1bb29a147b892071b946f46d71d");
  return infura_web3;  
}