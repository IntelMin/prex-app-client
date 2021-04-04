
import Dai from './contracts/Dai';
import address from './address';
import {getBrowserWeb3} from './web3';

const getEthBalance = async () => {
  return new Promise((resolve, reject) => {
    const web3 = getBrowserWeb3();
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
  const web3 = getBrowserWeb3();
  if (!web3) return null;
  return web3.currentProvider.selectedAddress;
}

const getAccountInfo = async () => {
  const eth_balance = await getEthBalance();
  const dai_balance = await getDaiBalance();
  return {eth_balance, dai_balance};
}

const functions = {
  getAccount,
  getEthBalance,
  getDaiBalance,
  getAccountInfo,
};

export default functions;