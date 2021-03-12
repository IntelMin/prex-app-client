import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import functions from "../blockchain/functions";
import MarketDataDisplay from "../components/home/MarketDataDisplay";
import PredictionDataDisplay from "../components/home/PredictionDataDisplay";
import * as utils from '../helpers/utils';

var initialData = {
  marketData: {
    neutralMaxValue: "0",
    neutralMinValue: "0",
    neutralRange: "0",
    startTime: "0",
    predictionTime: "0",
    endTime: "0",
  },
  predictionData: {
    totalParticipants: "0",
    totalStaked: ["0", "0", "0"],
    userStaked: ["0", "0", "0"]
  },
  resultData: {
    startPrice: "0",
    endPrice: "0",
    totalReward: "0",
    winningOption: "3"
  }
}
var mData = {...initialData};

const Home = (props) => {
  
  const {wallet} = props;
  const [accountInfo, setAccountInfo] = useState({eth_balance: 0, dai_balance: 0});
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    if (wallet) {
      functions.setMarket();
      functions.getAccountInfo()
        .then(info => {
          setAccountInfo(info);
        });
      functions.getCurrentMarketData()
        .then(res => {
          setMarketData(res);
          mData = res;
        })
        .catch(console.log);
      functions.onMarketCreated(res => {
        console.log("Created", res)
        let newData = {...initialData};
        newData.marketData = {...newData.marketData, ...res};
        setMarketData(newData);
        mData = newData;
      });
      functions.onMarketStarted(res => {
        console.log("Started", res);
        let newData = {...mData};
        newData.marketData = {...newData.marketData, ...res};
        newData.resultData = {...newData.resultData, ...res};
        setMarketData(newData);
        mData = newData;
      });
      functions.onPredictionUpdated(res => {
        console.log("Updated", res);
        let newData = {...mData};
        newData.predictionData = {...newData.predictionData, ...res};
        setMarketData(newData);
        mData = newData;
        functions.getAccountInfo()
          .then(info => {
            setAccountInfo(info);
          });
      });
      functions.onMarketEnded(res => {
        console.log("Ended", res);
        let newData = {...mData};
        newData.resultData = {...newData.resultData, ...res};
        setMarketData(newData);
        mData = newData;
        functions.getAccountInfo()
          .then(info => {
            setAccountInfo(info);
          });
      });
    }    
  }, [wallet])

  console.log(marketData);

  const updateStaked = (option, amount_user, amount_total) => {
    let newData = {...mData};
    let arr_user = [], arr_total = [];
    let i;
    for (i = 0; i < newData.predictionData.userStaked.length; i++)
      arr_user.push(newData.predictionData.userStaked[i]);
    arr_user[option] = amount_user;
    for (i = 0; i < newData.predictionData.totalStaked.length; i++)
      arr_total.push(newData.predictionData.totalStaked[i]);
    arr_total[option] = amount_total;
    newData.predictionData.userStaked = arr_user;
    newData.predictionData.totalStaked = arr_total;
    setMarketData(newData);
    mData = newData;
  }

  if (!wallet) {
    return (
      <React.Fragment>
        <p style={{marginTop: 20}}>Please connect your wallet first.</p>
      </React.Fragment>
    )
  }

  const account = functions.getAccount(); 

  return (
    <Container fluid className="main-container">
      <Row>
        <div className="wallet-desc">
          <span className="wallet-address">{account}</span>
          <span className="wallet-asset">{utils.cut(accountInfo.eth_balance)} ETH</span>
          {/* <span className="wallet-asset">{utils.cut(accountInfo.dai_balance)} DAI</span> */}
        </div>
      </Row>
      {
        marketData &&
          <Row>
            <MarketDataDisplay data={marketData}/>
          </Row>
      }
      {
        marketData && 
          <Row>
            <PredictionDataDisplay data={marketData} maxAsset={Number(accountInfo.dai_balance)} updateStaked={updateStaked} />
          </Row>
      }
      
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { wallet } = state.Blockchain;

  return { wallet };
};

export default connect(mapStateToProps, { })(Home);