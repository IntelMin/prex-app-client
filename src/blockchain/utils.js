
import Web3 from 'web3';
import Dai from './contracts/Dai';
import MarketRegistry from './contracts/MarketRegistry';
import Market from './contracts/Market';

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
  const dai = new Dai();
  return dai.getBalance();
}


const getAccount = () => {
  const web3 = getWeb3();
  if (!web3) return null;
  return web3.currentProvider.selectedAddress;
}

const getAccountInfo = async () => {
  const eth_balance = await getEthBalance();
  const dai_balance = await getDaiBalance();
  return {eth_balance, dai_balance};
}

const getCurrentMarketData = async () => {
  const market_registry = new MarketRegistry();
  var current_market_addr = await market_registry.getCurrentMarket();
  const market = new Market(current_market_addr);
  const marketData = await market.getMarketData();
  const predictionData = await market.getPredictionData();
  return {marketData, predictionData};
}

const utils = {
  getWeb3,
  getAccount,
  getEthBalance,
  getDaiBalance,
  getAccountInfo,
  getCurrentMarketData
};

export default utils;