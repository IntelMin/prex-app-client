
import Web3 from 'web3';
import Dai from './contracts/Dai';
import MarketRegistry from './contracts/MarketRegistry';
import Market from './contracts/Market';

var eventset = false;
var market = null;
var current_market_addr = null;
var infura_web3 = null;

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

const getInfuraWeb3 = () => {
  const infura_web3 = new Web3("wss://kovan.infura.io/ws/v3/2377373e9cc84228a6cea33645b511ea");
  return infura_web3;  
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
  current_market_addr = await market_registry.getCurrentMarket();
  market = new Market(current_market_addr);
  const marketData = await market.getMarketData();
  const predictionData = await market.getPredictionData();
  const resultData = await market.getResultData();
  //const currentTime = await market.getCurrentTime();
  return {marketData, predictionData, resultData};
}

const onPredictionUpdated = (callback) => {
  if (eventset || !market) return;
  eventset = true;
  market.onPredictionUpdated(callback);
}

const placePrediction = async (stakeAmount, option) => {
  if (!market) return;
  const dai = new Dai();
  await dai.approve(current_market_addr, stakeAmount);
  await market.placePrediction(stakeAmount, option);
}

const functions = {
  getWeb3,
  getAccount,
  getEthBalance,
  getDaiBalance,
  getAccountInfo,
  getCurrentMarketData,
  onPredictionUpdated,
  placePrediction,
};

export default functions;