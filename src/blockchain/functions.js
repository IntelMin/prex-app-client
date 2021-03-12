
import Web3 from 'web3';
import Dai from './contracts/Dai';
import Market from './contracts/Market';
import address from './address';

var market = null;

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

const setMarket = () => {
  market = new Market();
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
  const marketData = await market.getMarketData();
  const predictionData = await market.getPredictionData();
  const resultData = await market.getResultData();
  const time = await market.getCurrentTime();
  const timeOffset = Math.floor(Date.now()/1000) - Number(time);
  console.log("Time offset is " + timeOffset + "s.");
  return {marketData, predictionData, resultData, timeOffset};
}

const placePrediction = async (stakeAmount, option) => {
  if (!market) return;
  const dai = new Dai();
  await dai.approve(address.market.kovan, stakeAmount);
  await market.placePrediction(stakeAmount, option);
}

var createSet = false;
const onMarketCreated = (callback) => {
  if (createSet || !market) return;
  createSet = true;
  market.onMarketCreated(callback);
}

var startSet = false;
const onMarketStarted = (callback) => {
  if (startSet || !market) return;
  startSet = true;
  market.onMarketStarted(callback);
}

var predictionSet = false;
const onPredictionUpdated = (callback) => {
  if (predictionSet || !market) return;
  predictionSet = true;
  market.onPredictionUpdated(callback);
}

var endSet = false;
const onMarketEnded = (callback) => {
  if (endSet || !market) return;
  endSet = true;
  market.onMarketEnded(callback);
}

const functions = {
  getWeb3,
  getInfuraWeb3,
  getAccount,
  getEthBalance,
  getDaiBalance,
  getAccountInfo,
  getCurrentMarketData,
  placePrediction,
  onMarketCreated,
  onMarketStarted,
  onPredictionUpdated,
  onMarketEnded,
  setMarket
};

export default functions;