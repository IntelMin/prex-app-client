import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Container, Row, Image } from 'react-bootstrap';
import functions from "../blockchain/functions";
import MarketDataDisplay from "../components/detail/MarketDataDisplay";
import PredDataDisplay from "../components/detail/PredDataDisplay";
import * as utils from '../helpers/utils';
import Loader from "../components/common/Loader";
import Market from '../blockchain/contracts/Market';
import { Link } from "react-router-dom";
import Dai from "../blockchain/contracts/Dai";
import { getBrowserWeb3 } from "../blockchain/web3";

var tData = null;
var tPredData = null;
var tAccountInfo = null;

const MarketDetail = (props) => {
  
  const [accountInfo, setAccountInfo] = useState({eth_balance: 0, dai_balance: 0});
  const [data, setData] = useState(null);
  const [predData, setPredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const account = functions.getAccount(); 
  const market_addr = props.match.params.addr;

  useEffect(() => {
    fetchMarketData();
  }, [])

  async function fetchMarketData() {
    setLoading(true);
    try {

      let _info = await functions.getAccountInfo();
      setAccountInfo(_info);
      tAccountInfo = _info;

      let market = new Market(market_addr);
      let _marketData = await market.call("getMarketData");
      console.log("Market", _marketData);
      let _predData = await market.call("getPredictionData");
      console.log("Prediction", _predData);
      setData(_marketData);
      setPredData(_predData);
      tData = _marketData;
      tPredData = _predData;

      market.on("MarketStarted", (res, tag) => {
        if (tag !== market_addr) return;
        console.log("start", res);
        tData._startPrice = res.startPrice;
        setData({...tData});
      });
      market.on("MarketEnded", (res, tag) => {
        if (tag !== market_addr) return;
        console.log("end", res);
        tData._endPrice = res.endPrice;
        tData._winningOption = res.winningOption;
        setData({...tData});
      });
      market.on("PredictionDataUpdated", (res, tag) => {
        if (tag !== market_addr) return;
        console.log("update", res);
        tPredData._totalUsers = res.totalUsers;
        tPredData._totalStaked = res.optionStaked;
        setPredData({...tPredData});
      });
    }
    catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <Loader/>
    )
  }

  const updateStaked = (option, amount_user, amount_total) => {
    let arr_user = [], arr_total = [];
    let i;
    for (i = 0; i < predData._userStaked.length; i++)
      arr_user.push(predData._userStaked[i]);
    arr_user[option] = amount_user;
    for (i = 0; i < predData._totalStaked.length; i++)
      arr_total.push(predData._totalStaked[i]);
    arr_total[option] = amount_total;
    tPredData._userStaked = arr_user;
    tPredData._totalStaked = arr_total;
    setPredData({...tPredData});
    let dai_amount = getBrowserWeb3().utils.fromWei(amount_user, 'ether');
    tAccountInfo.dai_balance = tAccountInfo.dai_balance - dai_amount;
    setAccountInfo({...tAccountInfo});
  }

  const placePrediction = async (stakeAmount, option) => {
    let dai = new Dai();
    await dai.approve(market_addr, stakeAmount);
    let market = new Market(market_addr);
    await market.send("placePrediction", stakeAmount, option);
  }
  
  return (
    <Container fluid className="main-container">
      <Row>
        <div>
          <Link className="back-link" to="/">Go back</Link>
        </div>
        <div className="wallet-desc">
          <span className="wallet-address">{account}</span>
          <span className="wallet-asset">{utils.cut(accountInfo.eth_balance)} ETH</span>
          <span className="wallet-asset">{utils.cut(accountInfo.dai_balance)} DAI</span>
        </div>
      </Row>
      {
        data &&
          <Row>
            <MarketDataDisplay data={data}/>
          </Row>
      }
      {
        predData && 
          <Row>
            <PredDataDisplay 
              data={data}
              predData={predData}
              maxAsset={Number(accountInfo.dai_balance)}
              updateStaked={updateStaked}
              placePrediction={placePrediction}
            />
          </Row>
      }
      
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { wallet } = state.Blockchain;
  const { pairs } = state.Market;

  return { wallet, pairs };
};

export default connect(mapStateToProps, { })(MarketDetail);